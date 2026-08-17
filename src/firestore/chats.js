// chats: 특정 그룹 내 실시간 메시지
// 문서 경로: groups/{groupId}/messages/{messageId}
import {
  collection, addDoc, getDocs, onSnapshot,
  query, orderBy, limit as fsLimit, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.js";

const messagesCol = (groupId) => collection(db, "groups", groupId, "messages");

/**
 * @param {string} groupId
 * @param {object} message - { uid, name, text, type }
 */
export async function sendMessage(groupId, { uid, name = null, text, type = "text" }) {
  if (!groupId || !uid || !text) {
    throw new Error("sendMessage: groupId, uid and text are required");
  }
  await addDoc(messagesCol(groupId), {
    uid,
    name,
    text,
    type,
    createdAt: serverTimestamp(),
  });
}

/** 채팅 내역을 한 번만 불러올 때 사용합니다. */
export async function getMessages(groupId, max = 50) {
  const q = query(messagesCol(groupId), orderBy("createdAt", "asc"), fsLimit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * 실시간 구독. UI 컴포넌트의 useEffect 등에서 호출하고,
 * 반환된 unsubscribe 함수를 cleanup에서 호출하세요.
 *
 * @returns {() => void} unsubscribe
 */
export function subscribeToMessages(groupId, onChange, max = 50) {
  const q = query(messagesCol(groupId), orderBy("createdAt", "asc"), fsLimit(max));
  return onSnapshot(q, (snap) => {
    onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}
