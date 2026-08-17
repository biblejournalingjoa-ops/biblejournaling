  // ---- Firebase setup ----
  // 실제 설정값은 firebase.js가 .env.local(VITE_FIREBASE_*)에서 읽어 초기화합니다.
  // Authentication > Sign-in method에서 이메일/비밀번호, Google을 사용 설정하세요.
  // Firestore Database를 만드세요 (users 컬렉션에 회원 프로필을 저장합니다).
  import {
    OAuthProvider, signInWithPopup, getAdditionalUserInfo,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    updateProfile, onAuthStateChanged, signOut
  } from "firebase/auth";
  import { auth, db, googleProvider } from "./firebase.js";
  import * as firestoreApi from "./firestore/index.js";
  const { upsertUser, getUser } = firestoreApi;

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

  // 프로필 사진은 Firebase Storage를 거치지 않고, 클라이언트에서 200px/JPEG 0.7로 압축한
  // Base64 data URL을 users/{uid}.photoUrl(Firestore)과 Auth의 photoURL에 바로 저장합니다.
  // Storage 버킷/CORS 설정 문제나 storage/retry-limit-exceeded 같은 실패를 아예 피하기 위함입니다.

  window.dispatchEvent(new Event('firebase-bridge-ready'));
