// 채팅방 프로필 이미지: Firebase Storage 업로드.
// 경로: chatRooms/{chatRoomId}/profileImage (storage.rules에서 방장만 write 허용)
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";

/**
 * @param {string} groupId
 * @param {Blob} blob - 업로드할 이미지 (리사이즈된 JPEG 등)
 * @returns {Promise<string>} download URL
 */
export async function uploadGroupPhoto(groupId, blob) {
  if (!groupId || !blob) throw new Error("uploadGroupPhoto: groupId and blob are required");
  const fileRef = ref(storage, `chatRooms/${groupId}/profileImage`);
  await uploadBytes(fileRef, blob, { contentType: blob.type || "image/jpeg" });
  return getDownloadURL(fileRef);
}
