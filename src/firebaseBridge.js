  // ---- Firebase setup ----
  // 실제 설정값은 firebase.js가 .env.local(VITE_FIREBASE_*)에서 읽어 초기화합니다.
  // Authentication > Sign-in method에서 이메일/비밀번호, Google을 사용 설정하세요.
  // Firestore Database를 만드세요 (users 컬렉션에 회원 프로필을 저장합니다).
  import {
    OAuthProvider, signInWithPopup, getAdditionalUserInfo,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    updateProfile, onAuthStateChanged, signOut,
    EmailAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup,
    deleteUser as deleteAuthUser,
  } from "firebase/auth";
  import { ref as storageRef, listAll, deleteObject } from "firebase/storage";
  import { auth, db, storage, googleProvider } from "./firebase.js";
  import * as firestoreApi from "./firestore/index.js";
  const { upsertUser, getUser, listMyGroups, removeGroupMember, deleteAllJournalEntries, deleteUserDoc } = firestoreApi;

  function toProfile(u){
    return { uid:u.uid, name:u.displayName, email:u.email, photoUrl:u.photoURL };
  }

  // 로그인 방식(구글/카카오/이메일)과 관계없이 로그인/회원가입에 성공하면
  // users/{uid} 문서를 자동으로 생성/갱신합니다. 실패해도 로그인 흐름은 막지 않습니다.
  //
  // name은 "최초 가입 시 기본값"으로만 채웁니다. 이미 Firestore에 값이 있다면(=사용자가
  // 프로필 화면에서 직접 닉네임을 바꾼 적이 있거나 이전에 로그인한 적이 있다면) 로그인할
  // 때마다 구글/카카오 이름으로 덮어쓰지 않습니다.
  //
  // photoUrl은 구글/카카오 로그인일 때는 매번 프로바이더가 돌려준 최신 사진으로 덮어써
  // 항상 최신 상태를 유지합니다(사용자가 소셜 계정 프로필 사진을 바꾸면 앱에도 반영되어야
  // 하므로). 이메일/비밀번호 로그인은 프로바이더 사진 개념이 없으므로 기존 값을 보존합니다.
  async function saveUserOnAuth(profile, provider, extra = {}){
    if(!db) return;
    try{
      const existing = await getUser(profile.uid);
      const payload = { email: profile.email, provider, ...extra };
      if(!existing || !existing.name) payload.name = profile.name;
      const isSocial = provider === 'google' || provider === 'kakao';
      if(isSocial){
        if(profile.photoUrl) payload.photoUrl = profile.photoUrl;
      } else if(!existing || !existing.photoUrl){
        payload.photoUrl = profile.photoUrl;
      }
      await upsertUser(profile.uid, payload);
    }catch(err){
      // Auth 계정 생성/로그인 자체는 이미 끝난 상태라 여기서 던지지 않고 로그만
      // 남깁니다(회원가입/로그인 흐름을 막지 않기 위함). err.code가
      // 'permission-denied'이면 firestore.rules의 users/{uid} allow create/update
      // 조건(uid 일치, createdAt 불변 등)을 확인하세요.
      console.error('[Firestore] users/{uid} 저장 실패. code:', err && err.code, 'message:', err && err.message, err);
    }
  }

  // ---- 회원 탈퇴 ----
  // Auth 계정을 지우고 나면(onAuthStateChanged가 즉시 로그아웃 처리) 더 이상 본인
  // 인증으로 Firestore를 쓸 수 없으므로, 반드시 Auth 계정 삭제보다 먼저 Firestore/
  // Storage 쪽 데이터를 전부 지워야 합니다. 아래 두 함수는 모두 멱등(idempotent)하게
  // 작성되어 있어 — 이미 지워진 문서를 다시 지우거나, 비어 있는 컬렉션/폴더를 다시
  // 조회해도 에러 없이 조용히 넘어갑니다 — deleteAccount()가 auth/requires-recent-login로
  // 중간에 실패해 재인증 후 통째로 재시도되더라도 안전합니다.

  /** 내가 속한 모든 채팅방에서 나갑니다. 메시지 자체는 다른 멤버와 공유된 대화 기록이라
   *  보존하고, members 배열에서 내 uid만 제거합니다(기존 "채팅방 나가기"와 동일 동작). */
  async function leaveAllGroups(uid){
    let myGroups = [];
    try{
      myGroups = await listMyGroups(uid);
    }catch(err){
      console.error('[탈퇴] 가입된 채팅방 목록 조회 실패. code:', err && err.code, err);
      return;
    }
    await Promise.all(myGroups.map(g =>
      removeGroupMember(g.id, uid).catch(err=>{
        console.error(`[탈퇴] 채팅방(${g.id}) 멤버 제거 실패. code:`, err && err.code, err);
      })
    ));
  }

  /** profile-images/{uid}/ 아래에 남아있을 수 있는 프로필 사진을 best-effort로 지웁니다.
   *  현재 프로필 사진은 Storage를 거치지 않고 Firestore에 Base64로 저장되므로(위 주석
   *  참고) 보통은 지울 파일이 없지만, storage.rules가 이 경로를 유저 소유로 정의하고
   *  있어 혹시 과거/다른 경로로 올라간 파일이 있다면 함께 정리합니다. 실패해도 탈퇴
   *  흐름 자체는 막지 않습니다.
   */
  async function cleanupProfileStorage(uid){
    if(!storage) return;
    try{
      const folder = storageRef(storage, `profile-images/${uid}`);
      const list = await listAll(folder);
      await Promise.all(list.items.map(item => deleteObject(item).catch(()=>{})));
    }catch(err){
      // 폴더가 없는 경우(storage/object-not-found)를 포함해 전부 무시합니다.
    }
  }

  async function deleteAllUserData(uid){
    await leaveAllGroups(uid);
    await deleteAllJournalEntries(uid);
    await deleteUserDoc(uid);
    await cleanupProfileStorage(uid);
  }

  /** 가입 수단에 맞는 방식으로 Firebase Auth 세션을 재인증합니다. deleteAccount()가
   *  Firestore/Storage 데이터를 지우기 전에 매번 먼저 호출해, 세션이 오래돼
   *  deleteUser()가 auth/requires-recent-login으로 실패하는 상황 자체를 피합니다.
   *  @param {string} [password] - 이메일/비밀번호 계정일 때만 필요합니다.
   */
  async function reauthenticateCurrentUser(password){
    if(!auth || !auth.currentUser) throw new Error('firebase-not-configured');
    const user = auth.currentUser;
    const providerId = (user.providerData[0] && user.providerData[0].providerId) || '';
    if(providerId === 'password'){
      if(!password) throw new Error('reauthenticate-password-required');
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
    } else if(providerId === 'google.com'){
      await reauthenticateWithPopup(user, googleProvider);
    } else if(providerId === 'oidc.kakao'){
      const provider = new OAuthProvider('oidc.kakao');
      provider.addScope('profile_nickname');
      provider.addScope('profile_image');
      await reauthenticateWithPopup(user, provider);
    } else {
      // 알 수 없는 제공업체면 재인증 없이 바로 재시도해 본 뒤, 그래도 실패하면
      // 호출부에서 일반 에러로 처리합니다.
    }
  }

  // Expose a small bridge so the app's plain <script> below (non-module) can call these.
  window.__firebaseAuth = {
    ready: !!auth,
    signInWithGoogle: async ()=>{
      if(!auth) throw new Error('firebase-not-configured');
      const result = await signInWithPopup(auth, googleProvider);
      const profile = toProfile(result.user);
      // Firebase Auth's top-level currentUser.photoURL is only auto-filled at first
      // account creation and does not refresh on later logins, so if the user's Google
      // avatar changed since then we'd keep showing the stale one. Pull the live photo
      // from the OAuth response and push it back into Auth explicitly on every login.
      const info = getAdditionalUserInfo(result);
      const googlePicture = info && info.profile && info.profile.picture;
      if(googlePicture){
        profile.photoUrl = googlePicture;
        if(result.user.photoURL !== googlePicture){
          updateProfile(result.user, { photoURL: googlePicture }).catch(()=>{});
        }
      }
      saveUserOnAuth(profile, 'google');
      return profile;
    },
    signInWithKakao: async ()=>{
      if(!auth) throw new Error('firebase-not-configured');
      // Kakao isn't a built-in Firebase provider. This uses Firebase's generic OIDC
      // provider support, since Kakao Login supports OpenID Connect. You must:
      //  1) In Firebase Console > Authentication > Sign-in method, add a provider of
      //     type "OpenID Connect" and name it "oidc.kakao".
      //  2) Client ID = Kakao REST API key (see VITE_KAKAO_REST_API_KEY in .env),
      //     Issuer URL = https://kauth.kakao.com. Client secret only if enabled in
      //     Kakao Developers > 카카오 로그인 > 보안 (Client Secret 활성화).
      //  3) In Kakao Developers, the registered Redirect URI must point to Firebase's
      //     own auth handler: https://<authDomain>/__/auth/handler.
      const provider = new OAuthProvider('oidc.kakao');
      // Only request scopes that are actually turned on as consent items in Kakao
      // Developers > 카카오 로그인 > 동의항목. Requesting account_email (or anything
      // else not enabled there) makes Kakao's auth server reject the request outright
      // with KOE205 "Invalid Request / Unset consent item(s)" instead of just omitting
      // the claim, so don't add scopes here without enabling the matching consent item
      // in Kakao Developers first. Email intentionally isn't requested; the profile
      // screen already falls back to uid when email is unavailable.
      provider.addScope('profile_nickname');
      provider.addScope('profile_image');
      const result = await signInWithPopup(auth, provider);
      const profile = toProfile(result.user);
      // Kakao's OIDC id_token reports the display name as "nickname" and the photo as
      // "picture", not the standard "name" claim, so Firebase can't auto-fill
      // displayName/photoURL. Read the raw claims via getAdditionalUserInfo every login
      // (not just when Firebase's own fields are empty) so a changed Kakao profile
      // photo is always picked up, and push it into Auth explicitly.
      const info = getAdditionalUserInfo(result);
      const kakaoProfile = info && info.profile;
      if(kakaoProfile){
        if(!profile.name && kakaoProfile.nickname) profile.name = kakaoProfile.nickname;
        if(kakaoProfile.picture) profile.photoUrl = kakaoProfile.picture;
      }
      if(profile.name !== result.user.displayName || profile.photoUrl !== result.user.photoURL){
        updateProfile(result.user, {
          displayName: profile.name || null,
          photoURL: profile.photoUrl || null,
        }).catch(()=>{});
      }
      saveUserOnAuth(profile, 'kakao');
      return profile;
    },
    signUpWithEmail: async (email, password, displayName, extraProfile = {})=>{
      if(!auth) throw new Error('firebase-not-configured');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if(displayName){
        try{ await updateProfile(result.user, { displayName }); }catch(e){}
      }
      const profile = toProfile(result.user);
      saveUserOnAuth(profile, 'password', extraProfile);
      return profile;
    },
    signInWithEmail: async (email, password)=>{
      if(!auth) throw new Error('firebase-not-configured');
      const result = await signInWithEmailAndPassword(auth, email, password);
      const profile = toProfile(result.user);
      saveUserOnAuth(profile, 'password');
      return profile;
    },
    signOutOfGoogle: async ()=>{
      if(auth) await signOut(auth);
    },
    onChange: (cb)=>{
      if(!auth) return;
      onAuthStateChanged(auth, (u)=>{
        if(u) cb(toProfile(u));
        else cb(null);
      });
    },
    // 닉네임/프로필 사진을 사용자가 직접 변경할 때 사용합니다. Firebase Auth의
    // displayName/photoURL도 함께 갱신해, 다른 기기·세션에서도 최신값이 보이게 합니다.
    updateUserProfile: async ({ displayName, photoURL } = {})=>{
      if(!auth || !auth.currentUser) throw new Error('firebase-not-configured');
      const patch = {};
      if(displayName !== undefined) patch.displayName = displayName;
      if(photoURL !== undefined) patch.photoURL = photoURL;
      await updateProfile(auth.currentUser, patch);
    },
    // 회원 탈퇴. 삭제는 보안상 "최근 로그인"을 요구하므로(auth/requires-recent-login)
    // 매번 먼저 재인증부터 한 뒤 — 이메일/비밀번호 계정은 password 인자가 필요하고,
    // Google/Kakao 계정은 팝업으로 재인증하므로 password는 무시됩니다 — Firestore(묵상
    // 기록/프로필/채팅방 멤버십) + Storage 데이터를 전부 지우고, 마지막에 Auth 계정을
    // 삭제합니다. 재인증을 취소하거나 비밀번호가 틀리면 아무 데이터도 건드리지 않고
    // 그대로 실패하므로 안전하게 재시도할 수 있습니다.
    deleteAccount: async (password)=>{
      if(!auth || !auth.currentUser) throw new Error('firebase-not-configured');
      await reauthenticateCurrentUser(password);
      const uid = auth.currentUser.uid;
      await deleteAllUserData(uid);
      await deleteAuthUser(auth.currentUser);
    },
  };

  // Firestore 전체 API를 window에도 노출합니다 (레거시 스크립트에서 사용).
  // 새로 작성하는 React 컴포넌트는 "./firestore/index.js"를 직접 import하세요.
  window.__firebaseDB = {
    ready: !!db,
    // 하위 호환: 기존 코드에서 쓰던 이름
    saveUserProfile: (uid, data)=> upsertUser(uid, data),
    getUserProfile: (uid)=> getUser(uid),
    ...firestoreApi,
  };

  // 프로필 사진은 Firebase Storage를 거치지 않고, 클라이언트에서 200px/JPEG 0.7로 압축한
  // Base64 data URL을 users/{uid}.photoUrl(Firestore)과 Auth의 photoURL에 바로 저장합니다.
  // Storage 버킷/CORS 설정 문제나 storage/retry-limit-exceeded 같은 실패를 아예 피하기 위함입니다.

  window.dispatchEvent(new Event('firebase-bridge-ready'));
