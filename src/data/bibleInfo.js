/* ---------------- bible book overview data ----------------
 * Keyed by book id (matches BOOKS[].m in legacyApp.js).
 * Each book entry holds one variant per language code (ko/en/ja/th/zh, …).
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
    ja: {
      titleNative: '創世記',
      titleEn: 'Genesis',
      origin:
        "「創世記」という言葉は、起源、根源、誕生、始まりを意味するギリシャ語に由来します。ヘブライ語聖書の最初の書であり、モーセ五書(トーラー)の始まりとして、世界と人類の起源、罪の始まり、そして神が選ばれた民であるイスラエルの祖先たちを通して救いの歴史が始まる過程を記しています。",
      author: 'モーセ',
      era: '紀元前1450年頃',
      sections: [
        {
          label: '創造の時代',
          items: [
            { num: 1, label: '創造', range: '1-2章' },
            { num: 2, label: '堕落', range: '3-5章' },
            { num: 3, label: '洪水', range: '6-9章' },
            { num: 4, label: 'バベルの塔', range: '10-11章' },
          ],
        },
        {
          label: '族長の時代',
          items: [
            { num: 1, label: 'アブラハム', range: '11-25章' },
            { num: 2, label: 'イサク', range: '24-27章' },
            { num: 3, label: 'ヤコブ', range: '27-36章' },
            { num: 4, label: 'ヨセフ', range: '37-50章' },
          ],
        },
      ],
    },
    zh: {
      titleNative: '创世记',
      titleEn: 'Genesis',
      origin:
        "'创世记'一词源自希腊语，意为起源、根源、诞生和开端。它是希伯来圣经的第一卷书，也是摩西五经(妥拉)的开篇，记载了世界与人类的起源、罪的开始，以及神藉着祂所拣选的百姓——以色列的列祖，开始救赎历史的过程。",
      author: '摩西',
      era: '约主前1450年',
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
    ja: {
      titleNative: '出エジプト記',
      titleEn: 'Exodus',
      origin:
        "モーセ五書の第二の書であり、創世記に続く内容を記しています。エジプトで奴隷生活を送っていたイスラエル民族の救い、そして神の契約と律法によって治められるイスラエル国家の成立過程を記録しています。ヘブライ語の題名は1章1節の最初の二語「ヴェエレ・シェモト」(そしてこれらが名前である)であり、ギリシャ語の題名は「エクソドス」(脱出・出発・外へ出ること)に由来します。",
      author: 'モーセ',
      era: '紀元前1406年頃(モアブの平野で記されたと推定される)',
      sections: [
        {
          label: '創造の時代',
          items: [
            { num: 1, label: '創造', range: '1-2章' },
            { num: 2, label: '堕落', range: '3-5章' },
            { num: 3, label: '洪水', range: '6-9章' },
            { num: 4, label: 'バベルの塔', range: '10-11章' },
          ],
        },
        {
          label: '族長の時代',
          items: [
            { num: 1, label: 'アブラハム', range: '11-25章' },
            { num: 2, label: 'イサク', range: '24-27章' },
            { num: 3, label: 'ヤコブ', range: '27-36章' },
            { num: 4, label: 'ヨセフ', range: '37-50章' },
          ],
        },
        {
          label: '出エジプトと荒野の時代',
          items: [
            { num: 1, label: '出エジプト', range: '1-18章' },
            { num: 2, label: 'シナイ山での訓練', range: '19-40章, レビ記, 民数記1-9章' },
            { num: 3, label: '不信仰', range: '民数記10-14章' },
            { num: 4, label: '40年間の再訓練', range: '民数記20-36章, 申命記' },
          ],
        },
      ],
    },
    zh: {
      titleNative: '出埃及记',
      titleEn: 'Exodus',
      origin:
        "摩西五经的第二卷书，承接创世记的内容。记载了在埃及为奴的以色列民族蒙拯救，以及按神的约与律法治理的以色列国家建立的过程。希伯来语书名取自1章1节开头的两个词'这些是名字'(Ve'eleh Shemot)，希腊语书名'出埃及记'(Exodus)则意为离开、出去。",
      author: '摩西',
      era: '约主前1406年(相传写于摩押平原)',
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
        {
          label: '出埃及与旷野时代',
          items: [
            { num: 1, label: '出埃及', range: '1-18章' },
            { num: 2, label: '西奈山训练', range: '19-40章、利未记、民数记1-9章' },
            { num: 3, label: '不信', range: '民数记10-14章' },
            { num: 4, label: '40年的再训练', range: '民数记20-36章、申命记' },
          ],
        },
      ],
    },
  },
  3: { // Leviticus / 레위기
    ko: {
      titleNative: '레위기',
      titleEn: 'Leviticus',
      origin:
        "히브리어로는 '와이이크라'(주께서 부르셨다)라는 의미이며, 헬라어로는 '레위티콘'(레위 사람들에 관한 책)을 의미합니다.",
      author: '모세 (시내산 기슭에 머물렀던 약 1개월간)',
      era: '주전 1450년경',
      theme: '하나님께 나아가는 방법(제사, 제물, 제사법 등)과 동행하는 삶',
      character: '하나님과 바른 관계를 맺으며 살아가는 성도들',
      keyContent: '여러 종류의 의식과 절기(예수 그리스도를 예표함), 히브리서(레위기의 주석서로 볼 수 있음)',
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
        {
          label: '레위기 구조',
          items: [
            { num: 1, label: '거룩하신 하나님께 나아가는 방법', range: '1-16장' },
            { num: 2, label: '거룩하신 하나님과 동행하는 길', range: '17-27장' },
          ],
        },
      ],
    },
    en: {
      titleNative: 'Leviticus',
      titleEn: 'Leviticus',
      origin:
        "In Hebrew the title 'Vayikra' means 'And He called'; the Greek title 'Leuitikon' means 'concerning the Levites.'",
      author: 'Moses (during about a month spent at the foot of Mount Sinai)',
      era: 'c. 1450 BC',
      theme: 'How to approach God — through sacrifice, offerings, and the law of worship — and walk with Him',
      character: 'For believers living in right relationship with God',
      keyContent: 'Various rites and feasts (foreshadowing Jesus Christ); Hebrews can be read as a commentary on Leviticus',
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
        {
          label: 'Structure of Leviticus',
          items: [
            { num: 1, label: 'Approaching the Holy God', range: 'Ch. 1-16' },
            { num: 2, label: 'Walking with the Holy God', range: 'Ch. 17-27' },
          ],
        },
      ],
    },
    th: {
      titleNative: 'เลวีนิติ',
      titleEn: 'Leviticus',
      origin:
        "ในภาษาฮีบรู 'วายิกรา' หมายถึง 'และพระองค์ทรงเรียก' ส่วนชื่อภาษากรีก 'เลวีติคอน' หมายถึง 'หนังสือเกี่ยวกับคนเลวี'",
      author: 'โมเสส (ในช่วงประมาณ 1 เดือนที่พักอยู่เชิงภูเขาซีนาย)',
      era: 'ประมาณ 1450 ปีก่อนคริสตกาล',
      theme: 'วิธีเข้าเฝ้าพระเจ้า (การถวายเครื่องบูชา เครื่องถวาย และธรรมบัญญัติแห่งการนมัสการ) และการดำเนินชีวิตร่วมกับพระองค์',
      character: 'สำหรับผู้เชื่อที่ดำเนินชีวิตในความสัมพันธ์ที่ถูกต้องกับพระเจ้า',
      keyContent: 'พิธีกรรมและเทศกาลต่างๆ (ที่เป็นภาพล่วงหน้าถึงพระเยซูคริสต์) หนังสือฮีบรูอาจถือได้ว่าเป็นอรรถาธิบายของเลวีนิติ',
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
        {
          label: 'โครงสร้างของเลวีนิติ',
          items: [
            { num: 1, label: 'หนทางเข้าเฝ้าพระเจ้าผู้บริสุทธิ์', range: 'บทที่ 1-16' },
            { num: 2, label: 'การดำเนินชีวิตร่วมกับพระเจ้าผู้บริสุทธิ์', range: 'บทที่ 17-27' },
          ],
        },
      ],
    },
    ja: {
      titleNative: 'レビ記',
      titleEn: 'Leviticus',
      origin:
        "ヘブライ語では「ワイイクラー」(主が呼ばれた)を意味し、ギリシャ語では「レウィティコン」(レビ人に関する書)を意味します。",
      author: 'モーセ(シナイ山のふもとに留まっていた約1か月間)',
      era: '紀元前1450年頃',
      theme: '神に近づく方法(いけにえ、供え物、祭儀の律法など)と共に歩む生活',
      character: '神と正しい関係を築いて生きる聖徒たち',
      keyContent: '様々な儀式と祭り(イエス・キリストを予表する)、ヘブル人への手紙(レビ記の注解書と見ることができる)',
      sections: [
        {
          label: '創造の時代',
          items: [
            { num: 1, label: '創造', range: '1-2章' },
            { num: 2, label: '堕落', range: '3-5章' },
            { num: 3, label: '洪水', range: '6-9章' },
            { num: 4, label: 'バベルの塔', range: '10-11章' },
          ],
        },
        {
          label: '族長の時代',
          items: [
            { num: 1, label: 'アブラハム', range: '11-25章' },
            { num: 2, label: 'イサク', range: '24-27章' },
            { num: 3, label: 'ヤコブ', range: '27-36章' },
            { num: 4, label: 'ヨセフ', range: '37-50章' },
          ],
        },
        {
          label: '出エジプトと荒野の時代',
          items: [
            { num: 1, label: '出エジプト', range: '1-18章' },
            { num: 2, label: 'シナイ山での訓練', range: '19-40章, レビ記, 民数記1-9章' },
            { num: 3, label: '不信仰', range: '民数記10-14章' },
            { num: 4, label: '40年間の再訓練', range: '民数記20-36章, 申命記' },
          ],
        },
        {
          label: 'レビ記の構造',
          items: [
            { num: 1, label: '聖なる神に近づく方法', range: '1-16章' },
            { num: 2, label: '聖なる神と共に歩む道', range: '17-27章' },
          ],
        },
      ],
    },
    zh: {
      titleNative: '利未记',
      titleEn: 'Leviticus',
      origin:
        "希伯来语'瓦耶克拉'(Vayikra)意为'祂呼叫说'，希腊语'利未提康'(Leuitikon)意为'关于利未人的书'。",
      author: '摩西(在西奈山脚下停留约一个月期间)',
      era: '约主前1450年',
      theme: '亲近神的方法(祭祀、供物、敬拜的律法等)以及与神同行的生活',
      character: '与神保持正确关系而生活的圣徒们',
      keyContent: '各种仪式与节期(预表耶稣基督)；希伯来书可视为利未记的注释书',
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
        {
          label: '出埃及与旷野时代',
          items: [
            { num: 1, label: '出埃及', range: '1-18章' },
            { num: 2, label: '西奈山训练', range: '19-40章、利未记、民数记1-9章' },
            { num: 3, label: '不信', range: '民数记10-14章' },
            { num: 4, label: '40年的再训练', range: '民数记20-36章、申命记' },
          ],
        },
        {
          label: '利未记的结构',
          items: [
            { num: 1, label: '亲近圣洁之神的方法', range: '1-16章' },
            { num: 2, label: '与圣洁之神同行的道路', range: '17-27章' },
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
