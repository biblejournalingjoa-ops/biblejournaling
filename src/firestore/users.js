// users 컬렉션: 로그인/회원가입 성공 시 유저 정보를 자동 저장 및 업데이트합니다.
// 문서 경로: users/{uid}
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js";

/**
 * 로그인 방식(구글/카카오/이메일)과 관계없이 호출하면 됩니다.
 * 최초 로그인이면 createdAt(가입일)을 기록하고, 이후에는 lastLoginAt/updatedAt과
 * 전달된 필드만 갱신합니다 (기존 필드는 merge로 보존).
 *
 * @param {string} uid
 * @param {object} data - { email, name, provider, photoUrl, ...추가 필드 }
 */
export async function upsertUser(uid, data = {}) {
  if (!uid) throw new Error("upsertUser: uid is required");
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  const payload = {
    uid,
    ...data,
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  };
  if (!snap.exists()) {
    payload.createdAt = serverTimestamp();
  }

  try {
    await setDoc(ref, payload, { merge: true });
  } catch (err) {
    console.error('[Profile] Firestore users/{uid} 저장 실패', err && err.code, err);
    throw err;
  }
}

export async function getUser(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

/**
 * 묵상 기록이 있는 장(chapter) 개수(=기존 홈 화면 연속 기록 배지가 쓰는 카운트)를
 * users/{uid}.journalEntryCount에 그대로 저장해 둡니다. 같은 채팅방 멤버가 내 프로필
 * 카드를 볼 때, 개인 묵상 내용(journals 서브컬렉션)은 그대로 본인만 읽을 수 있게 두고
 * 이 숫자만 공유하기 위한 용도입니다. 새로운 연속 기록 체계가 아니라 기존
 * computeStreak() 계산을 그대로 영속화한 것입니다.
 */
export async function updateUserStreak(uid, journalEntryCount) {
  if (!uid) throw new Error("updateUserStreak: uid is required");
  await setDoc(
    doc(db, "users", uid),
    { journalEntryCount, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/**
 * 유저 프로필 실시간 구독. 같은 채팅방 멤버의 닉네임/프로필 사진/연속 기록이 바뀌면
 * 채팅방 관리 화면과 참여자 프로필 카드에 즉시 반영하기 위해 사용합니다.
 * @returns {() => void} unsubscribe
 */
export function subscribeToUser(uid, onChange) {
  return onSnapshot(doc(db, "users", uid), (snap) => {
    onChange(snap.exists() ? snap.data() : null);
  });
}
