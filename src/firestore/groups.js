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
 * 문서가 없으면 새로 만들고, 이미 있으면 현재 로그인한 유저(ownerUid로 전달된 값)를
 * members 배열에 포함시켜 둡니다. 로컬 데모 그룹은 기기/유저마다 독립적으로 동기화되므로
 * 그룹 문서를 먼저 만든 사람 외의 유저가 메시지를 보낼 때도 members에 포함되어 있어야
 * 보안 규칙(멤버만 read/write) 상 permission-denied가 나지 않습니다.
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
  } else if (!(snap.data().members || []).includes(ownerUid)) {
    await updateDoc(ref, { members: arrayUnion(ownerUid) });
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
