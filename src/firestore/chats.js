// chats: 특정 그룹 내 실시간 메시지
// 문서 경로: groups/{groupId}/messages/{messageId}
import {
  collection, addDoc, getDocs, onSnapshot, doc, getDoc, deleteDoc,
  query, orderBy, limit as fsLimit, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.js";

const messagesCol = (groupId) => collection(db, "groups", groupId, "messages");

/**
 * @param {string} groupId
 * @param {object} message - { uid, name, text, type, clientId }
 *   clientId: 보낸 쪽이 미리 만든 로컬 메시지 id를 실어 보내면, 실시간 구독으로 이 메시지가
 *   다시 내려올 때 그걸로 "내가 방금 낙관적으로 그린 말풍선"과 매칭해 중복 표시를 막을 수 있습니다.
 */
export async function sendMessage(groupId, { uid, name = null, text, type = "text", clientId = null }) {
  if (!groupId || !uid || !text) {
    throw new Error("sendMessage: groupId, uid and text are required");
  }
  const payload = { uid, name, text, type, createdAt: serverTimestamp() };
  if (clientId) payload.clientId = clientId;
  await addDoc(messagesCol(groupId), payload);
}

/**
 * 메시지 한 건을 삭제합니다. 작성자 본인만 지울 수 있는지는 firestore.rules에서 최종
 * 확인하므로(아니면 permission-denied), 호출하는 쪽에서도 본인 메시지인지 먼저 확인하세요.
 */
export async function deleteMessage(groupId, messageId) {
  if (!groupId || !messageId) {
    throw new Error("deleteMessage: groupId and messageId are required");
  }
  await deleteDoc(doc(db, "groups", groupId, "messages", messageId));
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
 * onError를 넘기면 permission-denied나 인덱스 누락 등으로 구독 자체가 끊겼을 때 알 수 있습니다.
 * onRemoved를 넘기면 누군가 메시지를 삭제했을 때 그 메시지 id를 받습니다. limit이 걸린
 * 쿼리에서는 문서가 단지 조회 범위 밖으로 밀려나도 'removed'가 오므로, 실제로 문서가
 * 없어졌는지 한 번 더 확인한 것만 넘깁니다.
 *
 * @returns {() => void} unsubscribe
 */
export function subscribeToMessages(groupId, onChange, max = 50, onError, onRemoved) {
  const q = query(messagesCol(groupId), orderBy("createdAt", "asc"), fsLimit(max));
  return onSnapshot(q, (snap) => {
    onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    if (typeof onRemoved !== "function") return;
    snap.docChanges().forEach((change) => {
      if (change.type !== "removed") return;
      getDoc(change.doc.ref)
        .then((s) => { if (!s.exists()) onRemoved(change.doc.id); })
        .catch(() => {});
    });
  }, (err) => {
    console.error(`Firestore messages subscription failed (group ${groupId}):`, err);
    if (typeof onError === "function") onError(err);
  });
}
