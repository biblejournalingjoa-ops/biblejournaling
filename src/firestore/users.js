// users 컬렉션: 로그인/회원가입 성공 시 유저 정보를 자동 저장 및 업데이트합니다.
// 문서 경로: users/{uid}
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
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

  await setDoc(ref, payload, { merge: true });
}

export async function getUser(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}
