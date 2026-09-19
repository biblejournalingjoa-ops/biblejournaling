// groups 컬렉션: 그룹 생성, 멤버 추가/조회, 내가 속한 그룹 목록 조회
// 문서 경로: groups/{groupId}
import {
  collection, doc, addDoc, setDoc, getDoc, getDocs, onSnapshot,
  updateDoc, arrayUnion, arrayRemove, query, where, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.js";

const groupsCol = collection(db, "groups");
const inviteCodesCol = collection(db, "inviteCodes");

/**
 * code -> groupId 매핑을 inviteCodes 컬렉션에 남겨 둡니다. groups/{groupId}는 멤버만
 * read할 수 있도록 제한돼 있어, 아직 멤버가 아닌 사람이 초대 코드만으로 그룹을 찾으려면
 * (findGroupByCode) 이 별도의 얕은 매핑이 필요합니다.
 */
async function upsertInviteCode(code, groupId) {
  if (!code || !groupId) return;
  await setDoc(doc(inviteCodesCol, code), { groupId }, { merge: true });
}

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
  await upsertInviteCode(code, ref.id);
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
  await upsertInviteCode(code, groupId);
  return groupId;
}

export async function addGroupMember(groupId, uid) {
  await updateDoc(doc(db, "groups", groupId), { members: arrayUnion(uid) });
}

/** 그룹 나가기: 내 uid만 members 배열에서 제거합니다. 메시지나 다른 멤버는 건드리지 않습니다. */
export async function removeGroupMember(groupId, uid) {
  if (!groupId || !uid) throw new Error("removeGroupMember: groupId and uid are required");
  await updateDoc(doc(db, "groups", groupId), { members: arrayRemove(uid) });
}

export async function getGroup(groupId) {
  const snap = await getDoc(doc(db, "groups", groupId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/**
 * 초대 코드로 그룹 id를 찾습니다. groups/{groupId}는 멤버만 read할 수 있어 code로
 * groups 컬렉션을 직접 쿼리하면(아직 멤버가 아니므로) permission-denied가 나기 때문에,
 * 먼저 공개적으로 read 가능한 inviteCodes/{code} 매핑에서 groupId만 가져옵니다.
 * 그룹 이름/사진 등 나머지 정보는 addGroupMember로 실제 멤버가 된 뒤 getGroup으로 읽으세요.
 * @returns {Promise<{id:string}|null>}
 */
export async function findGroupByCode(code) {
  if (!code) return null;
  const snap = await getDoc(doc(inviteCodesCol, code));
  if (!snap.exists()) return null;
  const groupId = snap.data().groupId;
  return groupId ? { id: groupId } : null;
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

/** 채팅방 이름을 변경합니다 (Security Rules 상 방장만 허용). */
export async function updateGroupName(groupId, name) {
  if (!groupId || !name) throw new Error("updateGroupName: groupId and name are required");
  await updateDoc(doc(db, "groups", groupId), { name });
}

/** 채팅방 프로필 이미지 URL을 변경합니다 (Security Rules 상 방장만 허용). */
export async function updateGroupPhoto(groupId, photoUrl) {
  if (!groupId) throw new Error("updateGroupPhoto: groupId is required");
  await updateDoc(doc(db, "groups", groupId), { photoUrl: photoUrl || null });
}

/**
 * 그룹 문서 실시간 구독. 채팅방 이름/프로필 사진/폭파 여부가 바뀌면 즉시 콜백을 호출합니다.
 * onError를 넘기면 permission-denied 등으로 구독이 끊겼을 때 알 수 있습니다.
 * @returns {() => void} unsubscribe
 */
export function subscribeToGroup(groupId, onChange, onError) {
  return onSnapshot(doc(db, "groups", groupId), (snap) => {
    onChange(snap.exists() ? { id: snap.id, ...snap.data() } : null);
  }, (err) => {
    console.error(`Firestore group subscription failed (group ${groupId}):`, err);
    if (typeof onError === "function") onError(err);
  });
}
