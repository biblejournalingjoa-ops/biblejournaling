// journals: 유저별 성경 장에 대한 기록 (내용 질문 / 생각 질문 / 개인 묵상 메모)
// 문서 경로: users/{uid}/journals/{book}_{chapter}
import {
  doc, setDoc, getDoc, deleteDoc, collection, getDocs,
  query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.js";

const journalsCol = (uid) => collection(db, "users", uid, "journals");
const journalDocId = (book, chapter) => `${book}_${chapter}`;

/**
 * @param {string} uid
 * @param {object} entry - { book, chapter, contentAnswers, thoughtAnswers, memo }
 *   contentAnswers: { [questionId]: string }  내용 질문 기록
 *   thoughtAnswers: { [questionId]: string }  생각 질문 기록
 *   memo: string                              개인 묵상 메모
 */
export async function saveJournalEntry(uid, { book, chapter, contentAnswers = {}, thoughtAnswers = {}, memo = "" }) {
  if (!uid || !book || !chapter) {
    throw new Error("saveJournalEntry: uid, book and chapter are required");
  }
  await setDoc(
    doc(journalsCol(uid), journalDocId(book, chapter)),
    { book, chapter, contentAnswers, thoughtAnswers, memo, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function getJournalEntry(uid, book, chapter) {
  const snap = await getDoc(doc(journalsCol(uid), journalDocId(book, chapter)));
  return snap.exists() ? snap.data() : null;
}

/** 해당 유저의 모든 묵상 기록을 최근 수정순으로 반환합니다. */
export async function listJournalEntries(uid) {
  const q = query(journalsCol(uid), orderBy("updatedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * 회원 탈퇴 시 해당 유저가 작성한 묵상 기록 전체를 삭제합니다.
 * orderBy 없이 전체 문서를 가져와 지우므로(색인 불필요) listJournalEntries보다
 * 가볍고, 이미 기록이 하나도 없어도 안전하게 아무 일도 하지 않습니다.
 */
export async function deleteAllJournalEntries(uid) {
  if (!uid) throw new Error("deleteAllJournalEntries: uid is required");
  const snap = await getDocs(journalsCol(uid));
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
}
