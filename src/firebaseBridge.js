  // ---- Firebase setup ----
  // 실제 설정값은 firebase.js가 .env.local(VITE_FIREBASE_*)에서 읽어 초기화합니다.
  // Authentication > Sign-in method에서 이메일/비밀번호, Google을 사용 설정하세요.
  // Firestore Database를 만드세요 (users 컬렉션에 회원 프로필을 저장합니다).
  import {
    OAuthProvider, signInWithPopup, getAdditionalUserInfo,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    updateProfile, onAuthStateChanged, signOut
  } from "firebase/auth";
  import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
  import { auth, db, storage, googleProvider } from "./firebase.js";
  import * as firestoreApi from "./firestore/index.js";
  const { upsertUser, getUser } = firestoreApi;

  function toProfile(u){
    return { uid:u.uid, name:u.displayName, email:u.email, photoUrl:u.photoURL };
  }

  // 로그인 방식(구글/카카오/이메일)과 관계없이 로그인/회원가입에 성공하면
  // users/{uid} 문서를 자동으로 생성/갱신합니다. 실패해도 로그인 흐름은 막지 않습니다.
  //
  // name/photoUrl은 "최초 가입 시 기본값"으로만 채웁니다. 이미 Firestore에 값이 있다면
  // (=사용자가 프로필 화면에서 직접 닉네임/사진을 바꾼 적이 있거나 이전에 로그인한 적이
  // 있다면) 로그인할 때마다 구글/카카오 프로필 값으로 덮어쓰지 않습니다. 그렇지 않으면
  // 사용자가 바꾼 값이 다음 로그인에서 구글/카카오 기본값으로 되돌아가 버립니다.
  async function saveUserOnAuth(profile, provider, extra = {}){
    if(!db) return;
    try{
      const existing = await getUser(profile.uid);
      const payload = { email: profile.email, provider, ...extra };
      if(!existing || !existing.name) payload.name = profile.name;
      if(!existing || !existing.photoUrl) payload.photoUrl = profile.photoUrl;
      await upsertUser(profile.uid, payload);
    }catch(err){
      console.error('Firestore user save failed:', err);
    }
  }

  // Expose a small bridge so the app's plain <script> below (non-module) can call these.
  window.__firebaseAuth = {
    ready: !!auth,
    signInWithGoogle: async ()=>{
      if(!auth) throw new Error('firebase-not-configured');
      const result = await signInWithPopup(auth, googleProvider);
      const profile = toProfile(result.user);
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
      // displayName/photoURL. Fall back to the raw claims via getAdditionalUserInfo.
      if(!profile.name || !profile.photoUrl){
        const info = getAdditionalUserInfo(result);
        const kakaoProfile = info && info.profile;
        if(kakaoProfile){
          if(!profile.name && kakaoProfile.nickname) profile.name = kakaoProfile.nickname;
          if(!profile.photoUrl && kakaoProfile.picture) profile.photoUrl = kakaoProfile.picture;
        }
        if(profile.name || profile.photoUrl){
          updateProfile(result.user, {
            displayName: profile.name || null,
            photoURL: profile.photoUrl || null,
          }).catch(()=>{});
        }
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
    }
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

  // 프로필 이미지는 Firebase Storage의 profile-images/{uid}/ 아래에 저장하고,
  // 다운로드 URL만 users/{uid}.photoUrl에 기록합니다. storage.rules에서
  // 본인 uid 경로에만 쓰기가 가능하도록 제한합니다.
  window.__firebaseStorage = {
    ready: !!storage,
    uploadProfileImage: async (uid, blob)=>{
      if(!storage) throw new Error('firebase-not-configured');
      if(!uid || !blob) throw new Error('uploadProfileImage: uid and blob are required');
      // storage.rules only allows writes to profile-images/{uid}/... when
      // request.auth.uid === uid. If the caller's uid (from app state) is stale
      // or the user's session dropped, the upload would be silently rejected by
      // the rules, so check the live auth state up front instead of relying on
      // app state matching Firebase Auth.
      if(!auth.currentUser){
        console.error('[Profile] 업로드 중단: 로그인된 사용자(auth.currentUser)가 없습니다.');
        throw new Error('auth/no-current-user');
      }
      if(auth.currentUser.uid !== uid){
        console.error('[Profile] 업로드 중단: 전달된 uid가 현재 로그인 UID와 다릅니다.', { uid, currentUid: auth.currentUser.uid });
        throw new Error('auth/uid-mismatch');
      }

      const path = `profile-images/${uid}/${Date.now()}.jpg`;
      const ref = storageRef(storage, path);

      console.log('[Profile] 이미지 업로드 시작', { path, size: blob.size, type: blob.type });
      try{
        await uploadBytes(ref, blob, { contentType: blob.type || 'image/jpeg' });
      }catch(err){
        console.error('[Profile] 이미지 업로드 실패', err && err.code, err);
        throw err;
      }
      console.log('[Profile] 이미지 업로드 완료');

      let url;
      try{
        url = await getDownloadURL(ref);
      }catch(err){
        console.error('[Profile] 다운로드 URL 가져오기 실패', err && err.code, err);
        throw err;
      }
      console.log('[Profile] 다운로드 URL 가져오기 완료', url);
      return url;
    }
  };

  window.dispatchEvent(new Event('firebase-bridge-ready'));
