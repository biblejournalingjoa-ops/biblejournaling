// bibles 컬렉션: 성경 책 이름/장 단위 묵상 본문 데이터
// 문서 경로: bibles/{book}_{chapter}
import {
  doc, setDoc, getDoc, collection, getDocs,
  query, where, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.js";

const biblesCol = collection(db, "bibles");
const chapterDocId = (book, chapter) => `${book}_${chapter}`;

/**
 * @param {object} params - { book, chapter, text, verses }
 * verses: 절 단위 배열/객체 등 자유 형식 (예: [{verse:1, text:'...'}, ...])
 */
export async function saveBibleChapter({ book, chapter, text = null, verses = null }) {
  if (!book || !chapter) throw new Error("saveBibleChapter: book and chapter are required");
  await setDoc(
    doc(db, "bibles", chapterDocId(book, chapter)),
    { book, chapter, text, verses, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function getBibleChapter(book, chapter) {
  const snap = await getDoc(doc(db, "bibles", chapterDocId(book, chapter)));
  return snap.exists() ? snap.data() : null;
}

/** 특정 책의 모든 장을 순서대로 반환합니다. */
export async function listBibleChapters(book) {
  const q = query(biblesCol, where("book", "==", book), orderBy("chapter", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
}
