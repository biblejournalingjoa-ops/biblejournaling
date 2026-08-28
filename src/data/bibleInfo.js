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
  },
  2: { // Exodus / 출애굽기
    ko: {
      titleNative: '출애굽기',
      titleEn: 'Exodus',
      origin:
        "모세오경의 둘째 책으로 창세기에서 이어지는 내용을 담고 있습니다. 이집트에서 노예 생활을 하던 이스라엘 민족의 구원과, 하나님의 언약과 율법에 따라 다스려지는 이스라엘 국가의 성립 과정을 기록합니다. 히브리어 제목은 1장 1절의 첫 두 단어인 '베엘레 쉐모트'(그리고 이것들이 그 이름들이다)이며, 헬라어 제목은 '엑소도스'(탈출·출발·밖으로 나감)에서 유래했습니다.",
      author: '모세',
      era: '약 B.C 1406년경 (모압 평야에서 기록 추정)',
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
        {
          label: '출애굽과 광야시대',
          items: [
            { num: 1, label: '출애굽', range: '1-18장' },
            { num: 2, label: '시내산훈련', range: '19-40장, 레위기, 민수기1-9장' },
            { num: 3, label: '불신앙', range: '민10-14장' },
            { num: 4, label: '40년의 재훈련', range: '민20-36장, 신명기' },
          ],
        },
      ],
    },
    en: {
      titleNative: 'Exodus',
      titleEn: 'Exodus',
      origin:
        "The second book of the Pentateuch, continuing directly from Genesis. It records the deliverance of the Israelites from slavery in Egypt and the founding of the nation of Israel, governed by God's covenant and law. Its Hebrew title, taken from the first two words of 1:1, is 'Ve'eleh Shemot' (\"And these are the names\"); its Greek title, 'Exodus,' means departure or going out.",
      author: 'Moses',
      era: 'c. 1406 BC (traditionally written on the plains of Moab)',
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
        {
          label: 'Exodus and the Wilderness',
          items: [
            { num: 1, label: 'The Exodus', range: 'Ch. 1-18' },
            { num: 2, label: 'Training at Sinai', range: 'Ch. 19-40, Leviticus, Numbers 1-9' },
            { num: 3, label: 'Unbelief', range: 'Numbers 10-14' },
            { num: 4, label: '40 Years of Retraining', range: 'Numbers 20-36, Deuteronomy' },
          ],
        },
      ],
    },
    th: {
      titleNative: 'อพยพ',
      titleEn: 'Exodus',
      origin:
        "หนังสือเล่มที่สองของโทราห์ ต่อเนื่องจากปฐมกาล บันทึกการช่วยกู้ชนชาติอิสราเอลจากความเป็นทาสในอียิปต์ และการสถาปนาประชาชาติอิสราเอลภายใต้พันธสัญญาและธรรมบัญญัติของพระเจ้า ชื่อภาษาฮีบรูมาจากสองคำแรกของข้อ 1:1 คือ 'เวเอเลห์ เชโมท' (และนี่คือชื่อทั้งหลาย) ส่วนชื่อภาษากรีก 'เอ็กโซโดส' หมายถึงการออกไป",
      author: 'โมเสส',
      era: 'ประมาณ 1406 ปีก่อนคริสตกาล (สันนิษฐานว่าเขียนที่ที่ราบโมอับ)',
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
        {
          label: 'ยุคอพยพและถิ่นทุรกันดาร',
          items: [
            { num: 1, label: 'การอพยพ', range: 'บทที่ 1-18' },
            { num: 2, label: 'การฝึกที่ซีนาย', range: 'บทที่ 19-40, เลวีนิติ, กันดารวิถี 1-9' },
            { num: 3, label: 'ความไม่เชื่อ', range: 'กันดารวิถี 10-14' },
            { num: 4, label: 'การฝึกใหม่ 40 ปี', range: 'กันดารวิถี 20-36, เฉลยธรรมบัญญัติ' },
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
