import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// Firebase Storage retries transient upload/network failures for up to 2 minutes
// (each) by default. That makes a real failure (bad rules, no network, wrong
// bucket) look like an infinite/stuck loading spinner to the user for up to
// ~4 minutes before it finally rejects. Fail fast instead so errors surface
// quickly and the loading state can clear promptly.
storage.maxUploadRetryTime = 15000;
storage.maxOperationRetryTime = 15000;
export const googleProvider = new GoogleAuthProvider();
