// journals: 유저별 성경 장에 대한 기록 (내용 질문 / 생각 질문 / 개인 묵상 메모)
// 문서 경로: users/{uid}/journals/{book}_{chapter}
import {
  doc, setDoc, getDoc, collection, getDocs,
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
