  // ---- Firebase setup ----
  // 실제 설정값은 firebase.js가 .env.local(VITE_FIREBASE_*)에서 읽어 초기화합니다.
  // Authentication > Sign-in method에서 이메일/비밀번호, Google을 사용 설정하세요.
  // Firestore Database를 만드세요 (users 컬렉션에 회원 프로필을 저장합니다).
  import {
    OAuthProvider, signInWithPopup,
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
  function saveUserOnAuth(profile, provider, extra = {}){
    if(!db) return;
    upsertUser(profile.uid, {
      email: profile.email,
      name: profile.name,
      photoUrl: profile.photoUrl,
      provider,
      ...extra,
    }).catch(err=>console.error('Firestore user save failed:', err));
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
      //  1) Enable "OpenID Connect" as a custom provider in Firebase Console > Authentication
      //     > Sign-in method, and name it "oidc.kakao".
      //  2) Register a Kakao Login (OIDC) app in Kakao Developers and fill in the
      //     client ID/secret and issuer URL Firebase asks for.
      const provider = new OAuthProvider('oidc.kakao');
      const result = await signInWithPopup(auth, provider);
      const profile = toProfile(result.user);
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

  window.dispatchEvent(new Event('firebase-bridge-ready'));
