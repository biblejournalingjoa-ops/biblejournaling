  // ---- Firebase setup ----
  // 실제 설정값은 firebase.js가 .env.local(VITE_FIREBASE_*)에서 읽어 초기화합니다.
  // Authentication > Sign-in method에서 이메일/비밀번호, Google을 사용 설정하세요.
  // Firestore Database를 만드세요 (users 컬렉션에 회원 프로필을 저장합니다).
  import {
    GoogleAuthProvider, OAuthProvider, signInWithPopup,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    updateProfile, onAuthStateChanged, signOut
  } from "firebase/auth";
  import {
    doc, setDoc, getDoc, serverTimestamp
  } from "firebase/firestore";
  import { auth, db } from "./firebase.js";

  function toProfile(u){
    return { uid:u.uid, name:u.displayName, email:u.email, photoUrl:u.photoURL };
  }

  // Expose a small bridge so the app's plain <script> below (non-module) can call these.
  window.__firebaseAuth = {
    ready: !!auth,
    signInWithGoogle: async ()=>{
      if(!auth) throw new Error('firebase-not-configured');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return toProfile(result.user);
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
      return toProfile(result.user);
    },
    signUpWithEmail: async (email, password, displayName)=>{
      if(!auth) throw new Error('firebase-not-configured');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if(displayName){
        try{ await updateProfile(result.user, { displayName }); }catch(e){}
      }
      return toProfile(result.user);
    },
    signInWithEmail: async (email, password)=>{
      if(!auth) throw new Error('firebase-not-configured');
      const result = await signInWithEmailAndPassword(auth, email, password);
      return toProfile(result.user);
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

  window.__firebaseDB = {
    ready: !!db,
    saveUserProfile: async (uid, data)=>{
      if(!db) throw new Error('firebase-not-configured');
      await setDoc(doc(db, 'users', uid), { ...data, updatedAt: serverTimestamp() }, { merge:true });
    },
    getUserProfile: async (uid)=>{
      if(!db) throw new Error('firebase-not-configured');
      const snap = await getDoc(doc(db, 'users', uid));
      return snap.exists() ? snap.data() : null;
    }
  };

  window.dispatchEvent(new Event('firebase-bridge-ready'));
