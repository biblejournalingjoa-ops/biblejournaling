// ---- 회원 탈퇴 ----
// Auth 계정을 지우고 나면(onAuthStateChanged가 즉시 로그아웃 처리) 더 이상 본인 인증으로
// Firestore를 쓸 수 없으므로, 반드시 Auth 계정 삭제보다 먼저 Firestore/Storage 데이터를
// 지워야 합니다. 순서: 재인증 → 채팅방 멤버 나가기 → 묵상 기록 → 프로필 문서 → Storage →
// Auth 계정 삭제. 모든 단계는 멱등(idempotent)하게 작성되어 있어 중간에 실패해도 처음부터
// 통째로 다시 시도하면 안전하게 이어서 지워집니다.
//
// 무한 로딩 방지:
// - Firestore 쓰기(deleteDoc/updateDoc/batch.commit)는 서버가 응답(ack)할 때까지 promise가
//   끝나지 않습니다. 네트워크가 끊기면 로컬 큐에 쌓인 채 영원히 대기하므로 단계마다 타임아웃을
//   겁니다.
// - getDocs()는 오프라인이면 로컬 캐시 결과(비어 있거나 불완전할 수 있음)를 "성공"으로
//   돌려주므로, 지울 대상 목록은 반드시 getDocsFromServer()로 서버에서 가져옵니다. 그래야
//   일부만 지우고 성공한 것처럼 넘어가는 일이 없습니다.
// - 재인증 팝업은 카카오톡 등 인앱 브라우저에서 창이 닫혀도 감지되지 않아 끝나지 않을 수
//   있으므로 역시 타임아웃을 겁니다.
import {
  OAuthProvider, EmailAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup,
  deleteUser,
} from "firebase/auth";
import {
  collection, doc, query, where, getDocsFromServer, updateDoc, deleteDoc, writeBatch, arrayRemove,
} from "firebase/firestore";
import { ref as storageRef, listAll, deleteObject } from "firebase/storage";

const TIMEOUT = {
  reauthPassword: 20000,
  reauthPopup: 120000,   // 사용자가 팝업에서 직접 로그인하는 시간까지 포함
  firestore: 20000,
  storage: 10000,
  deleteAuth: 20000,
};
// Firebase가 deleteUser()에 요구하는 "최근 로그인" 기준(약 5분)보다 여유 있게 잡습니다.
const RECENT_LOGIN_MS = 4 * 60 * 1000;
const BATCH_LIMIT = 450; // writeBatch 한도(500)보다 여유 있게

function accountError(code, message){
  const err = new Error(message || code);
  err.code = code;
  return err;
}

function withTimeout(promise, ms, stage){
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject)=>{
      timer = setTimeout(()=> reject(accountError('delete-account/timeout', `${stage} timed out after ${ms}ms`)), ms);
    }),
  ]).finally(()=> clearTimeout(timer));
}

/** 각 단계 실패에 어느 단계였는지(stage)와, 이미 데이터 삭제가 시작됐는지(dataDeletionStarted)를
 *  붙여서 던집니다. 호출부(UI)는 이 정보로 "일부만 삭제됨" 상황을 안내합니다. */
async function runStage(stage, ms, fn, ctx){
  try{
    return await withTimeout(Promise.resolve().then(fn), ms, stage);
  }catch(err){
    const e = err instanceof Error ? err : accountError('unknown', String(err));
    if(!e.stage) e.stage = stage;
    e.dataDeletionStarted = ctx.dataDeletionStarted;
    throw e;
  }
}

function reauthenticate(user, password, googleProvider){
  const providerId = (user.providerData[0] && user.providerData[0].providerId) || '';
  if(providerId === 'password'){
    if(!password) return Promise.reject(accountError('delete-account/password-required'));
    const credential = EmailAuthProvider.credential(user.email, password);
    return withTimeout(reauthenticateWithCredential(user, credential), TIMEOUT.reauthPassword, 'reauth');
  }
  if(providerId === 'google.com'){
    return withTimeout(reauthenticateWithPopup(user, googleProvider), TIMEOUT.reauthPopup, 'reauth');
  }
  if(providerId === 'oidc.kakao'){
    const provider = new OAuthProvider('oidc.kakao');
    provider.addScope('profile_nickname');
    provider.addScope('profile_image');
    return withTimeout(reauthenticateWithPopup(user, provider), TIMEOUT.reauthPopup, 'reauth');
  }
  // 재인증 방법을 모르는 제공업체: 최근에 로그인한 경우에만 진행합니다. 그렇지 않으면
  // 데이터만 지워지고 deleteUser()가 auth/requires-recent-login으로 실패해 계정만 남는
  // 불완전한 상태가 되므로, 아무것도 지우기 전에 미리 중단합니다.
  const lastSignIn = Date.parse(user.metadata && user.metadata.lastSignInTime);
  if(!(lastSignIn && Date.now() - lastSignIn < RECENT_LOGIN_MS)){
    return Promise.reject(accountError('auth/requires-recent-login'));
  }
  return Promise.resolve();
}

/** 내가 속한 채팅방에서 members 배열의 내 uid만 제거합니다(기존 "채팅방 나가기"와 동일).
 *  메시지는 다른 멤버와 공유된 대화 기록이라 보존합니다. 폭파(closed)된 방은 규칙상 더
 *  이상 수정할 수 없는 보관용 기록이라 건너뜁니다. 한 방이라도 실패하면 탈퇴를 중단합니다. */
async function leaveAllGroups(db, uid, ctx){
  const snap = await getDocsFromServer(query(collection(db, "groups"), where("members", "array-contains", uid)));
  const openGroups = snap.docs.filter(d => d.data().closed !== true);
  if(openGroups.length) ctx.dataDeletionStarted = true;
  const results = await Promise.allSettled(openGroups.map(d =>
    updateDoc(d.ref, { members: arrayRemove(uid) })
  ));
  const failed = results.find(r => r.status === 'rejected');
  if(failed) throw failed.reason;
}

async function deleteAllJournals(db, uid, ctx){
  const snap = await getDocsFromServer(collection(db, "users", uid, "journals"));
  for(let i = 0; i < snap.docs.length; i += BATCH_LIMIT){
    const batch = writeBatch(db);
    ctx.dataDeletionStarted = true;
    snap.docs.slice(i, i + BATCH_LIMIT).forEach(d => batch.delete(d.ref));
    await batch.commit();
  }
}

/** profile-images/{uid}/ 아래 남아있을 수 있는 파일을 best-effort로 정리합니다. 현재 프로필
 *  사진은 Storage가 아닌 Firestore에 Base64로 저장되어 보통 지울 파일이 없고, Storage 버킷이
 *  없거나 설정되지 않은 경우도 있어 실패해도 탈퇴를 막지 않습니다. 다만 Storage SDK는 네트워크
 *  오류 시 최대 2분간 재시도하므로 짧은 타임아웃을 겁니다. */
async function cleanupProfileStorage(storage, uid){
  if(!storage) return;
  try{
    const list = await withTimeout(listAll(storageRef(storage, `profile-images/${uid}`)), TIMEOUT.storage, 'storage');
    await withTimeout(Promise.all(list.items.map(item => deleteObject(item).catch(()=>{}))), TIMEOUT.storage, 'storage');
  }catch(err){
    console.warn('[탈퇴] Storage 정리 건너뜀(best-effort). code:', err && err.code);
  }
}

let inFlight = null;

/**
 * 현재 로그인한 계정을 탈퇴 처리합니다. 이미 진행 중이면 같은 promise를 돌려줘 중복 실행을
 * 막습니다. 실패 시 err.code(Firebase 코드 또는 delete-account/*), err.stage, err.dataDeletionStarted를
 * 담아 던집니다.
 *
 * 주의: 팝업 재인증은 사용자 클릭 이벤트 안에서 동기적으로 열려야 팝업 차단에 걸리지 않으므로,
 * 재인증 호출 전에는 await를 두지 않습니다.
 */
export function deleteCurrentAccount({ auth, db, storage, googleProvider, password }){
  if(inFlight) return inFlight;
  inFlight = run({ auth, db, storage, googleProvider, password }).finally(()=>{ inFlight = null; });
  return inFlight;
}

async function run({ auth, db, storage, googleProvider, password }){
  if(!auth) throw accountError('firebase-not-configured');
  const user = auth.currentUser;
  if(!user) throw accountError('delete-account/no-current-user');
  if(typeof navigator !== 'undefined' && navigator.onLine === false){
    throw accountError('auth/network-request-failed');
  }
  const uid = user.uid;
  const ctx = { dataDeletionStarted: false };

  // 1) 재인증 — 실패/취소 시 아무 데이터도 건드리지 않고 중단(안전하게 재시도 가능)
  await runStage('reauth', TIMEOUT.reauthPopup + 1000, ()=> reauthenticate(user, password, googleProvider), ctx);
  // 재인증 팝업에서 다른 계정으로 로그인했거나 그 사이 세션이 바뀌었으면 중단합니다.
  if(!auth.currentUser || auth.currentUser.uid !== uid) throw accountError('auth/user-mismatch');

  // 2~4) Firestore 데이터 삭제. dataDeletionStarted는 실제 첫 쓰기 직전에 켜집니다(목록
  // 조회 단계에서 실패하면 아무것도 지워지지 않은 것이므로).
  await runStage('groups', TIMEOUT.firestore, ()=> leaveAllGroups(db, uid, ctx), ctx);
  await runStage('journals', TIMEOUT.firestore, ()=> deleteAllJournals(db, uid, ctx), ctx);
  await runStage('profile', TIMEOUT.firestore, ()=>{ ctx.dataDeletionStarted = true; return deleteDoc(doc(db, "users", uid)); }, ctx);

  // 5) Storage (best-effort)
  await cleanupProfileStorage(storage, uid);

  // 6) Auth 계정 삭제 — 마지막에
  await runStage('auth', TIMEOUT.deleteAuth, ()=> deleteUser(auth.currentUser), ctx);
}
