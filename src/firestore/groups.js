// groups 컬렉션: 그룹 생성, 멤버 추가/조회, 내가 속한 그룹 목록 조회
// 문서 경로: groups/{groupId}
import {
  collection, doc, addDoc, setDoc, getDoc, getDocs,
  updateDoc, arrayUnion, query, where, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.js";

const groupsCol = collection(db, "groups");

/**
 * @param {object} params - { name, ownerUid, color, code }
 * @returns {Promise<string>} 생성된 그룹 id
 */
export async function createGroup({ name, ownerUid, color = null, code = null }) {
  if (!name || !ownerUid) throw new Error("createGroup: name and ownerUid are required");
  const ref = await addDoc(groupsCol, {
    name,
    color,
    code,
    ownerUid,
    members: [ownerUid],
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/**
 * 이미 존재하는 로컬 그룹(id 고정)을 Firestore에도 그대로 만들어 둡니다.
 * 문서가 이미 있으면 아무 것도 하지 않습니다 (클라이언트에서 만든 로컬 그룹을
 * 최초로 메시지를 보낼 때 Firestore 쪽에도 동일한 id로 미러링하기 위한 용도).
 *
 * @param {string} groupId
 * @param {object} params - { name, ownerUid, color, code }
 */
export async function ensureGroup(groupId, { name, ownerUid, color = null, code = null }) {
  if (!groupId || !ownerUid) throw new Error("ensureGroup: groupId and ownerUid are required");
  const ref = doc(db, "groups", groupId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      name,
      color,
      code,
      ownerUid,
      members: [ownerUid],
      createdAt: serverTimestamp(),
    });
  }
  return groupId;
}

export async function addGroupMember(groupId, uid) {
  await updateDoc(doc(db, "groups", groupId), { members: arrayUnion(uid) });
}

export async function getGroup(groupId) {
  const snap = await getDoc(doc(db, "groups", groupId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** 내가 멤버로 속한 그룹 목록을 최신순으로 반환합니다. */
export async function listMyGroups(uid) {
  const q = query(
    groupsCol,
    where("members", "array-contains", uid),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
