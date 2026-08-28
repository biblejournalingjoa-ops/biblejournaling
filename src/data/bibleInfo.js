/* ---------------- bible book overview data ----------------
 * Keyed by book id (matches BOOKS[].m in legacyApp.js).
 * Each book entry holds one variant per language code (ko/en/th, …).
 * getBibleInfo() falls back en -> ko -> first available when the
 * active language has no translation yet, so a book only needs one
 * language filled in to start showing content.
 * Books without an entry here fall back to the "coming soon" sheet.
 */

export const BIBLE_INFO = {
  1: { // Genesis / 창세기
    ko: {
      titleNative: '창세기',
      titleEn: 'Genesis',
      origin:
        "'창세기'라는 단어는 기원, 근원, 탄생, 시작을 의미하는 헬라어에서 유래했습니다. 히브리어 성경의 첫 번째 책이자 모세오경(토라)의 시작으로, 세상과 인류의 기원, 죄의 시작, 그리고 하나님이 선택하신 백성인 이스라엘 조상들을 통해 구원의 역사를 시작하는 과정을 담고 있습니다.",
      author: '모세',
      era: '약 B.C 1450년경',
      sections: [
        {
          label: '창조시대',
          items: [
            { num: 1, label: '창조', range: '1-2장' },
            { num: 2, label: '타락', range: '3-5장' },
            { num: 3, label: '홍수', range: '6-9장' },
            { num: 4, label: '바벨탑', range: '10-11장' },
          ],
        },
        {
          label: '족장시대',
          items: [
            { num: 1, label: '아브라함', range: '11-25장' },
            { num: 2, label: '이삭', range: '24-27장' },
            { num: 3, label: '야곱', range: '27-36장' },
            { num: 4, label: '요셉', range: '37-50장' },
          ],
        },
      ],
    },
    en: {
      titleNative: 'Genesis',
      titleEn: 'Genesis',
      origin:
        "The word 'Genesis' comes from a Greek word meaning origin, source, birth, and beginning. It is the first book of the Hebrew Bible and opens the Pentateuch (Torah), tracing the origin of the world and humanity, the beginning of sin, and the start of the history of salvation through the ancestors of Israel, the people God chose.",
      author: 'Moses',
      era: 'c. 1450 BC',
      sections: [
        {
          label: 'Age of Creation',
          items: [
            { num: 1, label: 'Creation', range: 'Ch. 1-2' },
            { num: 2, label: 'The Fall', range: 'Ch. 3-5' },
            { num: 3, label: 'The Flood', range: 'Ch. 6-9' },
            { num: 4, label: 'Tower of Babel', range: 'Ch. 10-11' },
          ],
        },
        {
          label: 'Age of the Patriarchs',
          items: [
            { num: 1, label: 'Abraham', range: 'Ch. 11-25' },
            { num: 2, label: 'Isaac', range: 'Ch. 24-27' },
            { num: 3, label: 'Jacob', range: 'Ch. 27-36' },
            { num: 4, label: 'Joseph', range: 'Ch. 37-50' },
          ],
        },
      ],
    },
    th: {
      titleNative: 'ปฐมกาล',
      titleEn: 'Genesis',
      origin:
        "คำว่า 'ปฐมกาล' มาจากคำภาษากรีกที่หมายถึงจุดกำเนิด แหล่งที่มา การเกิด และจุดเริ่มต้น เป็นหนังสือเล่มแรกของพระคัมภีร์ฮีบรูและเป็นเล่มแรกของโทราห์ (เบญจบรรณ) บันทึกจุดกำเนิดของโลกและมนุษยชาติ จุดเริ่มต้นของบาป และจุดเริ่มต้นของประวัติศาสตร์แห่งความรอดผ่านทางบรรพบุรุษของอิสราเอล ชนชาติที่พระเจ้าทรงเลือกไว้",
      author: 'โมเสส',
      era: 'ประมาณ 1450 ปีก่อนคริสตกาล',
      sections: [
        {
          label: 'ยุคแห่งการทรงสร้าง',
          items: [
            { num: 1, label: 'การทรงสร้าง', range: 'บทที่ 1-2' },
            { num: 2, label: 'การตกในบาป', range: 'บทที่ 3-5' },
            { num: 3, label: 'น้ำท่วมโลก', range: 'บทที่ 6-9' },
            { num: 4, label: 'หอบาเบล', range: 'บทที่ 10-11' },
          ],
        },
        {
          label: 'ยุคบรรพบุรุษ',
          items: [
            { num: 1, label: 'อับราฮัม', range: 'บทที่ 11-25' },
            { num: 2, label: 'อิสอัค', range: 'บทที่ 24-27' },
            { num: 3, label: 'ยาโคบ', range: 'บทที่ 27-36' },
            { num: 4, label: 'โยเซฟ', range: 'บทที่ 37-50' },
          ],
        },
      ],
    },
    zh: {
      titleNative: '创世记',
      titleEn: 'Genesis',
      origin:
        '“创世记”一词源自希腊语，意为起源、根源、诞生与开端。它是希伯来圣经的第一卷，也是摩西五经(妥拉)的开篇，记载了世界与人类的起源、罪的开端，以及神藉着祂所拣选的百姓——以色列的列祖，开启救恩历史的过程。',
      author: '摩西',
      era: '约公元前 1450 年',
      sections: [
        {
          label: '创造时代',
          items: [
            { num: 1, label: '创造', range: '1-2章' },
            { num: 2, label: '堕落', range: '3-5章' },
            { num: 3, label: '洪水', range: '6-9章' },
            { num: 4, label: '巴别塔', range: '10-11章' },
          ],
        },
        {
          label: '族长时代',
          items: [
            { num: 1, label: '亚伯拉罕', range: '11-25章' },
            { num: 2, label: '以撒', range: '24-27章' },
            { num: 3, label: '雅各', range: '27-36章' },
            { num: 4, label: '约瑟', range: '37-50章' },
          ],
        },
      ],
    },
  },
};

export function getBibleInfo(bookId, lang) {
  const entry = BIBLE_INFO[bookId];
  if (!entry) return null;
  return entry[lang] || entry.en || entry.ko || Object.values(entry)[0] || null;
}
