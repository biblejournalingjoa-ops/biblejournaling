import kjvData from './data/kjv.json';
import thKjvData from './data/th_kjv.json';
import jaKougoData from './data/ja_kougo.json';
import zhCuvData from './data/zh_cuv.json';
import koGenesisData from './data/ko_genesis.json';
import koExodusData from './data/ko_exodus.json';
import koLeviticusData from './data/ko_leviticus.json';
import koNumbersData from './data/ko_numbers.json';
import koDeuteronomyData from './data/ko_deuteronomy.json';
import { getBibleInfo } from './data/bibleInfo.js';
import { getContentQuestions } from './data/contentQuestions.js';
import { ensurePushRegistration, sendLanguageToServiceWorker } from './push.js';
import { STRINGS } from './i18n/strings.js';

/* ---------------- data ---------------- */
const BOOKS = [
  { m:1, id:'genesis', ko:'창세기', en:'Genesis', ja:'創世記', th:'ปฐมกาล', zh:'创世记' },
  { m:2, id:'exodus', ko:'출애굽기', en:'Exodus', ja:'出エジプト記', th:'อพยพ', zh:'出埃及记' },
  { m:3, id:'leviticus', ko:'레위기', en:'Leviticus', ja:'レビ記', th:'เลวีนิติ', zh:'利未记' },
  { m:4, id:'numbers', ko:'민수기', en:'Numbers', ja:'民数記', th:'กันดารวิถี', zh:'民数记' },
  { m:5, id:'deuteronomy', ko:'신명기', en:'Deuteronomy', ja:'申命記', th:'เฉลยธรรมบัญญัติ', zh:'申命记' },
];
function bookDisplayName(b){
  return b[state.lang] || b.en || b.ko;
}
function bookName(m){
  const b = BOOKS.find(x=>x.m===m);
  if(!b) return '';
  return bookDisplayName(b);
}
function bookDataId(m){
  const b = BOOKS.find(x=>x.m===m);
  return b && b.id;
}
function chapterLabel(name, c){
  if(state.lang==='en') return `${name} ${c}`;
  if(state.lang==='ja') return `${name} ${c}章`;
  if(state.lang==='th') return `${name} บทที่ ${c}`;
  if(state.lang==='zh') return `${name} 第${c}章`;
  return `${name} ${c}장`;
}
const CHAPTER_COUNTS = { 1:50, 2:40, 3:27, 4:36, 5:34 }; // Genesis, Exodus, Leviticus, Numbers, Deuteronomy
function ckey(m, c){ return `${m}-${c}`; }

const KJV_BY_BOOK = {};
kjvData.forEach(b=>{ KJV_BY_BOOK[b.book] = b.chapters; });
function cleanKjvText(text){
  return text
    .replace(/\s*\{[^}]*:[^}]*\}/g, '') // drop translator margin notes, e.g. {...: Heb. ...}
    .replace(/\{([^}]*)\}/g, '$1')      // unwrap supplied-word markers, e.g. {was} -> was
    .trim();
}
function kjvVerses(m, c){
  const b = BOOKS.find(x=>x.m===m);
  const chapters = b && KJV_BY_BOOK[b.en];
  const verses = (chapters && chapters[c-1]) || [];
  return verses.map(cleanKjvText);
}

const TH_BY_BOOK = {};
thKjvData.forEach(b=>{ TH_BY_BOOK[b.book] = b.chapters; });
function thVerses(m, c){
  const b = BOOKS.find(x=>x.m===m);
  const chapters = b && TH_BY_BOOK[b.en];
  return (chapters && chapters[c-1]) || [];
}

const JA_BY_BOOK = {};
jaKougoData.forEach(b=>{ JA_BY_BOOK[b.book] = b.chapters; });
function jaVerses(m, c){
  const b = BOOKS.find(x=>x.m===m);
  const chapters = b && JA_BY_BOOK[b.en];
  return (chapters && chapters[c-1]) || [];
}

const ZH_BY_BOOK = {};
zhCuvData.forEach(b=>{ ZH_BY_BOOK[b.book] = b.chapters; });
function zhVerses(m, c){
  const b = BOOKS.find(x=>x.m===m);
  const chapters = b && ZH_BY_BOOK[b.en];
  return (chapters && chapters[c-1]) || [];
}

// 한글 성경 본문: 현재는 창세기(1~50장), 출애굽기(1~40장), 레위기(1~27장),
// 민수기(1~36장), 신명기(1~34장)를 보유. 그 외 책은 데이터 준비 전까지
// CHAPTER(데모 본문)로 대체된다.
const KO_GENESIS_CHAPTERS = koGenesisData[0].chapters;
function koGenesisVerses(c){
  return KO_GENESIS_CHAPTERS[c-1] || [];
}
const KO_EXODUS_CHAPTERS = koExodusData[0].chapters;
function koExodusVerses(c){
  return KO_EXODUS_CHAPTERS[c-1] || [];
}
const KO_LEVITICUS_CHAPTERS = koLeviticusData[0].chapters;
function koLeviticusVerses(c){
  return KO_LEVITICUS_CHAPTERS[c-1] || [];
}
const KO_NUMBERS_CHAPTERS = koNumbersData[0].chapters;
function koNumbersVerses(c){
  return KO_NUMBERS_CHAPTERS[c-1] || [];
}
const KO_DEUTERONOMY_CHAPTERS = koDeuteronomyData[0].chapters;
function koDeuteronomyVerses(c){
  return KO_DEUTERONOMY_CHAPTERS[c-1] || [];
}

const PALETTE = [
  {top:'#E7B7B9', bottom:'#3F5670'},
  {top:'#A9C2A2', bottom:'#8A6A2F'},
  {top:'#C9AFCB', bottom:'#4F6B8F'},
  {top:'#E7C98B', bottom:'#3B4F68'},
];

const CHAPTER = {
  book:'출애굽기', chapter:8,
  verses:[
    '여호와께서 모세에게 바로에게 가서 백성을 보내라고 전하라 말씀하신다.',
    '만일 보내기를 거절하면 개구리로 온 지경을 치겠다고 하신다.',
    '개구리가 나일강에서 올라와 궁과 침실과 집안 가득할 것이라 하신다.',
    '개구리가 바로와 신하들과 백성에게까지 오를 것이라 하신다.',
    '여호와께서 모세에게 아론이 지팡이를 강과 운하와 못 위에 펴게 하라 이르신다.',
    '아론이 손을 내밀자 개구리가 올라와 애굽 온 땅을 뒤덮는다.',
    '요술사들도 자기 술법으로 개구리를 애굽 땅에 오르게 한다.',
    '바로가 모세와 아론을 불러 여호와께 개구리를 물러가게 해 달라 구하며 백성을 보내겠다 약속한다.',
    '모세가 바로에게 개구리를 없앨 시각을 정하라고 한다.',
    '바로가 내일이라 답하니 모세가 여호와와 같은 이 없음을 알게 되리라 말한다.',
    '개구리가 바로와 집과 신하와 백성에게서 떠나 강에만 남으리라 한다.',
    '모세와 아론이 바로 앞을 떠나 여호와께 개구리에 대해 부르짖는다.',
    '여호와께서 모세의 말대로 하시니 집과 마당과 밭의 개구리가 죽는다.',
    '사람들이 개구리를 모아 무더기로 쌓으니 땅에서 악취가 난다.',
    '그러나 바로는 숨 돌릴 틈이 생기자 마음을 완악하게 하고 듣지 않는다.',
    '여호와께서 모세에게 아론이 지팡이로 땅의 티끌을 치게 하라 이르신다.',
    '아론이 그대로 행하니 애굽 온 땅의 티끌이 이가 되어 사람과 짐승에게 오른다.',
    '요술사들도 이를 나오게 하려 하나 능히 하지 못한다.',
    '요술사들이 바로에게 이는 하나님의 권능이라 말하나 바로의 마음은 완악해진다.',
    '여호와께서 모세에게 아침에 바로 앞에 서서 백성을 보내라 전하라 이르신다.',
    '만일 보내지 않으면 파리떼를 보내어 신하와 백성과 집에 가득하게 하리라 하신다.',
    '그 날에는 백성이 사는 고센 땅을 구별하여 그곳에는 파리가 없게 하리라 하신다.',
    '여호와께서 자기 백성과 애굽 백성 사이를 구별하시겠다 하신다.',
    '여호와께서 이르신 대로 심한 파리떼가 궁과 집에 가득하고 온 땅이 파리로 황폐해진다.',
    '바로가 모세와 아론을 불러 이 땅에서 하나님께 제사하라 이른다.',
    '모세가 애굽 사람이 가증히 여기는 것으로 제사할 수 없다고 답한다.',
    '광야로 사흘 길쯤 가서 여호와께 제사하겠다고 말한다.',
    '바로가 너무 멀리 가지는 말라 하며 자신을 위해 구하라 청한다.',
  ]
};

const ASK_QUESTIONS = [
  '주님, 오늘 제게 주시는 마음의 감동은 무엇입니까?',
  '제가 놓치고 있는 죄, 교만, 두려움이 있습니까?',
  '주님이 오늘 제게 알려주고 싶은 진리는 무엇입니까?',
  '제가 오늘 사랑해야 할 사람은 누구입니까?',
  '제가 멈춰야 할 것은 무엇입니까?',
  '제가 오늘 행동해야 할 작은 한 걸음은 무엇입니까?',
  '저의 가정, 사역, 사업(일, 공부) 가운데 정리해 주시는 방향성이 있습니까?',
  '제가 걱정하는 문제를 주님은 어떻게 보십니까?',
  '제가 오늘 내려놓아야 할 짐은 무엇입니까?',
  '주님이 제게 말씀하시는 위로는 무엇입니까?',
  '주님, 지금 제게 무엇을 말씀하십니까?',
];

const ASK_QUESTIONS_EN = [
  'Lord, what is on Your heart for me today?',
  'Is there sin, pride, or fear that I am overlooking?',
  'What truth do You want to show me today?',
  'Who is someone You want me to love today?',
  'What is something I need to stop doing?',
  'What is one small step You want me to take today?',
  'Is there direction You are giving me for my family, ministry, or work/study?',
  'How do You see the problem that worries me?',
  'What burden do You want me to lay down today?',
  'What comfort do You want to speak to me?',
  'Lord, what are You saying to me right now?',
];

const ASK_QUESTIONS_JA = [
  '主よ、今日私に与えてくださる心の感動は何ですか?',
  '私が見落としている罪、高ぶり、恐れはありますか?',
  '主が今日私に知らせたい真理は何ですか?',
  '私が今日愛すべき人は誰ですか?',
  '私がやめるべきことは何ですか?',
  '私が今日踏み出すべき小さな一歩は何ですか?',
  '私の家庭、奉仕、仕事(学び)の中で示してくださる方向はありますか?',
  '私が心配している問題を主はどのようにご覧になっていますか?',
  '私が今日手放すべき荷物は何ですか?',
  '主が私に語りたい慰めは何ですか?',
  '主よ、今、私に何を語っておられますか?',
];

const ASK_QUESTIONS_TH = [
  'พระเจ้าข้า วันนี้พระองค์ทรงสัมผัสใจข้าพระองค์เรื่องอะไร?',
  'มีบาป ความหยิ่ง หรือความกลัวใดที่ข้าพระองค์มองข้ามไปหรือไม่?',
  'ความจริงใดที่พระองค์ทรงอยากสำแดงแก่ข้าพระองค์ในวันนี้?',
  'มีใครบ้างที่พระองค์อยากให้ข้าพระองค์รักในวันนี้?',
  'มีสิ่งใดที่ข้าพระองค์ควรหยุดทำ?',
  'ก้าวเล็กๆ ก้าวหนึ่งที่พระองค์อยากให้ข้าพระองค์ทำวันนี้คืออะไร?',
  'มีทิศทางที่พระองค์กำลังทรงนำในเรื่องครอบครัว การรับใช้ หรือการงาน/การเรียนของข้าพระองค์หรือไม่?',
  'พระองค์ทรงมองปัญหาที่ข้าพระองค์กังวลอยู่อย่างไร?',
  'ภาระใดที่พระองค์อยากให้ข้าพระองค์วางลงในวันนี้?',
  'คำปลอบประโลมใดที่พระองค์อยากตรัสกับข้าพระองค์?',
  'พระเจ้าข้า ขณะนี้พระองค์กำลังตรัสอะไรกับข้าพระองค์?',
];

const ASK_QUESTIONS_ZH = [
  '主啊，今天祢放在我心里的感动是什么?',
  '我是否忽略了某些罪、骄傲或惧怕?',
  '祢今天想让我明白的真理是什么?',
  '今天祢要我去爱的人是谁?',
  '有什么是我该停下来的?',
  '今天祢要我迈出的一小步是什么?',
  '在我的家庭、事奉、工作(学习)当中，祢给我怎样的方向?',
  '对于我所担忧的问题，主如何看待?',
  '今天祢要我放下的重担是什么?',
  '祢想对我说的安慰是什么?',
  '主啊，此刻祢正对我说什么?',
];

function getAskQuestions(){
  if(state.lang==='en') return ASK_QUESTIONS_EN;
  if(state.lang==='ja') return ASK_QUESTIONS_JA;
  if(state.lang==='th') return ASK_QUESTIONS_TH;
  if(state.lang==='zh') return ASK_QUESTIONS_ZH;
  return ASK_QUESTIONS;
}

/* ---------------- i18n ---------------- */

// Missing keys never throw: they fall back to Korean (then to the key itself),
// but each one is reported once on the console so gaps are visible during
// development. `npm run i18n:check` reports them statically.
const reportedMissingKeys = new Set();
function reportMissingKey(lang, key){
  const id = lang+':'+key;
  if(reportedMissingKeys.has(id)) return;
  reportedMissingKeys.add(id);
  console.warn(`[i18n] missing translation "${key}" for "${lang}"`);
}
function T(key, ...args){
  const lang = STRINGS[state.lang] ? state.lang : 'ko';
  let v = STRINGS[lang][key];
  if(v===undefined){
    reportMissingKey(lang, key);
    v = STRINGS.ko[key];
    if(v===undefined) return key;
  }
  return typeof v==='function' ? v(...args) : v;
}
const LANG_CODES = ['ko','en','ja','th','zh'];
const LANG_LABEL_KEYS = { ko:'langKo', en:'langEn', ja:'langJa', th:'langTh', zh:'langZh' };

/* ---------------- icons ---------------- */
const ICON = {
  gear:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"/><path d="M19.4 13.5a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1.03 1.56V19.9a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.11-1.56 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.56-1.03H2.1a2 2 0 110-4h.1a1.7 1.7 0 001.56-1.11 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34H8.2A1.7 1.7 0 009.23 3.6V3.5a2 2 0 114 0v.1a1.7 1.7 0 001.03 1.56 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87v.09a1.7 1.7 0 001.56 1.03h.1a2 2 0 110 4h-.1a1.7 1.7 0 00-1.56 1.03z"/></svg>`,
  person:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 19.5c1.6-3.4 4.4-5 7.5-5s5.9 1.6 7.5 5"/></svg>`,
  personCheck:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 19.5c1.6-3.4 4.4-5 7.5-5s5.9 1.6 7.5 5"/><path d="M9 8l1.7 1.7L15 6" stroke="#C08A2E"/></svg>`,
  lock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V7.5a4 4 0 018 0v3"/></svg>`,
  back:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M15 19l-7-7 7-7"/></svg>`,
  close:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  book:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5.2c2-1 5-1.2 8 0v14c-3-1.2-6-1-8 0v-14z"/><path d="M20 5.2c-2-1-5-1.2-8 0v14c3-1.2 6-1 8 0v-14z"/></svg>`,
  chat:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5h16v11H8l-4 4V5z"/><path d="M8 9h8M8 12h5"/></svg>`,
  heart:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 20s-7.5-4.6-9.8-9.2C.7 7.3 2.4 4 5.9 4c2 0 3.4 1 6.1 4 2.7-3 4.1-4 6.1-4 3.5 0 5.2 3.3 3.7 6.8C19.5 15.4 12 20 12 20z"/></svg>`,
  pencil:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 20l.9-3.9L15.6 5.4a1.5 1.5 0 012.1 0l1.9 1.9a1.5 1.5 0 010 2.1L9 20.1 4 20z"/><path d="M13.5 7.5l3 3"/></svg>`,
  camera:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 8.5A1.5 1.5 0 015.5 7H8l1-2h6l1 2h2.5A1.5 1.5 0 0120 8.5v9A1.5 1.5 0 0118.5 19h-13A1.5 1.5 0 014 17.5v-9z"/><circle cx="12" cy="13" r="3.2"/></svg>`,
  flame:`<svg viewBox="0 0 24 24" fill="#F2660F"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.176 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"/></svg>`,
  linkArrow:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 16l8-8M9 7h6v6"/></svg>`,
  chevDown:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`,
  chevRight:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>`,
  plus:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>`,
  check:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12.5l4.5 4.5L19 7"/></svg>`,
  info:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5" stroke-linecap="round"/><circle cx="12" cy="7.8" r="1" fill="currentColor" stroke="none"/></svg>`,
  share:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.7l7.4-4.4M8.3 13.3l7.4 4.4"/></svg>`,
  download:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 3v12M7 10l5 5 5-5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 19.5h16" stroke-linecap="round"/></svg>`,
  bubbleChat:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 5h16v11H8l-4 4V5z"/></svg>`,
  groups:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8.5" cy="8" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M2.8 19c1.1-3.4 3.3-5 5.7-5s4.6 1.6 5.7 5"/><path d="M14.5 14.3c2 .1 3.7 1.5 4.7 4.7"/></svg>`,
  send:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 20l16-8L4 4l0 6.5L15 12 4 13.5 4 20z"/></svg>`,
  link:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9.5 14.5l5-5"/><path d="M8 16.5l-1.5 1.5a3.2 3.2 0 01-4.5-4.5l3-3a3.2 3.2 0 014.5 0"/><path d="M16 7.5l1.5-1.5a3.2 3.2 0 014.5 4.5l-3 3a3.2 3.2 0 01-4.5 0"/></svg>`,
  message:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="13" rx="3"/><path d="M3 7l9 6 9-6"/></svg>`,
  chatBubble:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 12a7.5 7.5 0 01-11 6.6L4 20l1.4-4.5A7.5 7.5 0 1120 12z"/></svg>`,
  copy:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M5 15.5H4a1 1 0 01-1-1V4a1 1 0 011-1h10.5a1 1 0 011 1v1"/></svg>`,
  menu:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
};

/* ---------------- state ---------------- */
let state = {
  screen:'loading',         // loading | main | login | signup | chapters | daily | groups | group-room | group-manage | settings
  purchased:[1,2,3,4,5], // all 5 Pentateuch books are free/unlocked
  loggedIn:false,
  user:null,                // { name, email, photoUrl } of the signed-in user
  activeMonth:null,         // month whose calendar is open
  activeChapter:null,       // chapter number selected within the current book
  activeTab:'bible',        // bible | content | thought
  highlightVerse:null,
  purchaseModal:null,       // month number
  selectedPlan:'year',      // year | month  (chosen inside purchase modal)
  askOpen:false,
  activeGroupId:null,       // group room currently open
  groupInfoMembers:null,    // [{uid,name,photoUrl,streak}] for the open group-manage screen; null while loading
  groupInfoError:false,     // true if the participant list failed to load from Firestore
  leaveConfirmOpen:false,   // whether the "leave chat room" confirm dialog is open
  leaveBusy:false,          // true while a leave-room request is in flight
  groupManageDoc:null,      // { id, name, photoUrl, ownerUid, closed, ... } the live Firestore doc for the open group-manage/group-room screen
  groupNameEditOpen:false,  // whether the room-name edit field is showing on the manage screen
  groupNameSaving:false,    // true while a room-name save is in flight
  roomPhotoModal:null,      // { blob, previewUrl, saving } while a newly picked room photo awaits confirmation
  memberProfileUid:null,    // uid whose profile card is open (from the group-manage participant list)
  createGroupOpen:false,
  inviteGroupId:null,       // group id whose invite sheet is open
  shareGroupId:null,        // group id whose share-picker sheet is open
  sharePickMonth:null,      // book (BOOKS[].m) chosen in the share picker's book/chapter selector
  sharePickChapter:null,    // chapter chosen in the share picker's book/chapter selector
  shareBusy:false,          // true while generating the snapshot image
  imageViewer:null,         // { groupId, msgId, index } when the full-screen image viewer is open
  chapterInfoOpen:false,    // whether the chapter background info sheet is open
  verseActionMenu:null,     // { n } verse number whose long-press copy sheet is open
  notifDayOpen:null,        // which weekday's time-set sheet is open ('mon'..'sun')
  pageShare:null,           // { kind:'content'|'thought', step:'menu'|'pickGroup' } when the page share menu is open
  fontSize:'default',       // small | default | large
  lang:'ko',                // ko | en
  theme:'light',            // light | dark
  signupTermsConsent:false, // terms-of-service checkbox on the signup screen
  signupTermsConsentOpen:false,
  signupConsent:false,      // privacy consent checkbox on the signup screen
  signupConsentOpen:false,  // whether the consent detail text is expanded
  // 가입 입력 필드 값. 체크박스를 누르면 render()가 전체 화면을 다시 그리는데,
  // 입력값이 여기 state에 없으면 DOM의 input이 통째로 새로 만들어지면서
  // 그동안 입력한 내용이 사라집니다. 그래서 keystroke마다 여기로 동기화해 둡니다.
  signupForm:{ name:'', email:'', birth:'', username:'', password:'', nickname:'' },
  prevScreen:'main',        // where to return to when leaving settings
  loadingCount:0,           // >0 while any global async op (auth/Firestore/etc) is in flight
  nicknameModal:false,      // whether the nickname-edit modal (on the profile screen) is open
  avatarModal:null,         // { previewUrl, blob } while a newly picked profile photo awaits confirmation
  donateModal:false,        // whether the donation/support-us modal is open
  donateCopied:false,       // true briefly after the account number was copied, to flip the button label
  languageModal:false,      // whether the language-picker modal is open
  // 회원 탈퇴 확인 모달. null이면 닫힌 상태. 열리면 { password, busy }:
  // - password: 이메일/비밀번호 계정일 때만 쓰는 재인증용 입력값(구글/카카오는 팝업 재인증이라 안 씀)
  // - busy: 삭제 요청이 진행 중이라 버튼을 막아야 하는지
  deleteAccountModal:null,
  streakCount:0,            // consecutive days (including today) with a completed journal entry
  streakLastDate:null,      // 'YYYY-MM-DD' (local) of the last day the streak was credited
  lastActiveMonth:null,     // book (m) of the most recently opened chapter, for the "continue reading" button
  lastActiveChapter:null,   // chapter number paired with lastActiveMonth
};

const YEAR = 2026;

// journalData: { 'YYYY-MM-DD': { content:{qid:text}, thought:{...} } }
let journalData = {};

// notifSettings: { mon: '07:00'|null, tue: ..., wed: ..., thu: ..., fri: ..., sat: ..., sun: ... }  (null = off)
let notifSettings = { mon:null, tue:null, wed:null, thu:null, fri:null, sat:null, sun:null };
const NOTIF_DAYS = ['mon','tue','wed','thu','fri','sat','sun'];

// groups: [{ id, name, color, code, memberCount, messages:[{id, from, isMe, type:'text'|'journal'|'image'|'system', text, unread, ...}] }]
let groups = [];
let groupsLoaded = false;
let groupDocUnsub = null; // unsubscribe fn for the live groups/{id} listener behind group-room/group-manage
let groupDocUnsubId = null; // which group id groupDocUnsub currently listens to
let messagesUnsub = null; // unsubscribe fn for the live groups/{id}/messages listener behind group-room
let messagesUnsubId = null; // which group id messagesUnsub currently listens to

const GROUP_COLORS = ['#3F5670','#8A6A2F','#4F6B8F','#7E9A6D','#B25C6B'];

function makeCode(){
  return Math.random().toString(36).slice(2,8).toUpperCase();
}

/* 초대 링크(/invite/CODE 경로, ?invite=CODE 쿼리, #invite=CODE 해시)에서 초대 코드를 뽑아냅니다.
   배포 환경(Vercel/Netlify/Firebase Hosting 등)에 따라 경로 방식 라우팅이 404로 막힐 수도 있어
   세 가지 형태를 모두 지원합니다. */
function getInviteCodeFromLocation(){
  try{
    const { pathname, search, hash } = window.location;
    const pathMatch = pathname.match(/\/invite\/([A-Za-z0-9]+)/);
    if(pathMatch) return pathMatch[1].toUpperCase();
    const params = new URLSearchParams(search);
    if(params.get('invite')) return params.get('invite').toUpperCase();
    const hashMatch = hash.match(/invite=([A-Za-z0-9]+)/);
    if(hashMatch) return hashMatch[1].toUpperCase();
  }catch(e){}
  return null;
}
// 앱이 뜨자마자(로그인 화면이 뜨기 전) 한 번만 URL을 읽어 두고, 주소창은 바로 정리합니다.
// 실제 참여 처리는 로그인 상태가 확정된 뒤(resolvePostLoginScreen)에 합니다.
let pendingInviteCode = getInviteCodeFromLocation();
if(pendingInviteCode){
  try{ window.history.replaceState(null, '', window.location.origin + '/'); }catch(e){}
}
function seedGroups(){
  return [{
    id:'g-'+Date.now(),
    name:'가족 묵상방',
    color:GROUP_COLORS[0],
    code:makeCode(),
    memberCount:3,
    messages:[
      {id:'m1', from:'시스템', isMe:false, type:'system', textKey:'sysGroupCreated'},
      {id:'m2', from:'엄마', isMe:false, type:'text', text:'오늘 본문 너무 은혜로웠어요 🙏'},
    ]
  }];
}
function getGroup(id){ return groups.find(g=>g.id===id); }
/* Chat room avatar: uses the uploaded room photo when set, otherwise falls back to the
   existing colored-initial avatar. `cls` supplies the existing size/shape CSS class
   (group-avatar | group-avatar-lg | r-avatar) so this slots into any of the three spots
   the room avatar already appears in without new CSS. */
function groupAvatarHtml(g, cls){
  if(g && g.photoUrl){
    return `<img class="${cls}" src="${escapeHtml(g.photoUrl)}" alt="" style="object-fit:cover;object-position:center;">`;
  }
  const initial = g ? escapeHtml((g.name||'').slice(0,1)) : '';
  return `<div class="${cls}" style="background:${(g && g.color) || 'var(--surface-strong)'}">${initial}</div>`;
}

/* simulate group members reading a message I sent, ticking the unread count down to 0 */
function scheduleReadTicks(g, msg){
  if(!g || !msg || !msg.isMe || !(msg.unread>0)) return;
  const delay = 1200 + Math.random()*2600;
  setTimeout(()=>{
    if(msg.unread>0){
      msg.unread -= 1;
      saveGroups();
      if(state.screen==='group-room' && state.activeGroupId===g.id) render();
      scheduleReadTicks(g, msg);
    }
  }, delay);
}
function resumeAllReadTicks(){
  groups.forEach(g=>{
    (g.messages||[]).forEach(msg=>{
      if(msg.isMe && msg.unread>0) scheduleReadTicks(g, msg);
    });
  });
}
function pushMyMessage(g, msg){
  msg.unread = Math.max(0, (g.memberCount||1) - 1);
  g.messages.push(msg);
  saveGroups();
  scheduleReadTicks(g, msg);
  syncMessageToFirestore(g, msg);
}
function syncMessageToFirestore(g, msg){
  if(msg.type!=='text' || !msg.text) return; // 이미지/시스템 메시지는 Firestore 규칙상 본인 계정으로만 기록할 수 있는 텍스트만 미러링합니다
  if(!(state.user && state.user.uid)) return;
  const fdb = window.__firebaseDB;
  if(!fdb || !fdb.ready || typeof fdb.sendMessage !== 'function') return;
  const ensure = typeof fdb.ensureGroup === 'function'
    ? fdb.ensureGroup(g.id, { name:g.name, ownerUid:state.user.uid, color:g.color, code:g.code })
    : Promise.resolve();
  ensure
    .then(()=> fdb.sendMessage(g.id, { uid: state.user.uid, name: state.user.nickname || state.user.name || null, text: msg.text, clientId: msg.id }))
    .catch(err=>console.error('Firestore chat save failed:', err));
}

/* Loads the group-manage screen's participant list from Firestore (groups/{id}.members,
   with each member's users/{uid} profile for nickname + photo + journalEntryCount, shown
   to other members as their "streak"). Also makes sure the group document exists and
   includes the current user, so a group that was only ever created locally still has real
   member data to show and to leave later. */
function loadGroupMembers(groupId){
  state.groupInfoMembers = null;
  state.groupInfoError = false;
  const fdb = window.__firebaseDB;
  if(!fdb || !fdb.ready || !(state.user && state.user.uid)){
    state.groupInfoError = true;
    state.groupInfoMembers = [];
    render();
    return;
  }
  const g = getGroup(groupId);
  const ensure = typeof fdb.ensureGroup === 'function'
    ? fdb.ensureGroup(groupId, { name: g ? g.name : '', ownerUid: state.user.uid, color: g ? g.color : null, code: g ? g.code : null })
    : Promise.resolve();

  withLoading(
    ensure
      .then(()=> fdb.getGroup(groupId))
      .then(async (doc)=>{
        if(state.activeGroupId===groupId && !state.groupManageDoc) state.groupManageDoc = doc;
        const uids = (doc && doc.members && doc.members.length) ? doc.members : [state.user.uid];
        const members = await Promise.all(uids.map(async (uid)=>{
          try{
            const u = await fdb.getUserProfile(uid);
            return {
              uid,
              name: (u && (u.nickname || u.name)) || T('memberFallbackName'),
              photoUrl: (u && u.photoUrl) || null,
              streak: (u && typeof u.journalEntryCount === 'number') ? u.journalEntryCount : 0,
            };
          }catch(err){
            console.error('Failed to load member profile:', uid, err);
            return { uid, name: T('memberFallbackName'), photoUrl: null, streak: 0 };
          }
        }));
        if(state.activeGroupId===groupId) state.groupInfoMembers = members;
      })
  ).catch(err=>{
    console.error('Failed to load group members:', err);
    if(state.activeGroupId===groupId){
      state.groupInfoError = true;
      state.groupInfoMembers = [];
    }
  }).finally(()=>{
    if(state.activeGroupId===groupId && state.screen==='group-manage'){
      subscribeGroupMembersLive(groupId);
      render();
    }
  });
}

/* Keeps each participant's nickname/photo/streak live-synced while the group-manage
   screen is open, so if someone changes their nickname or profile photo, other members
   in the same chat room see the update without a reload. */
let memberProfileUnsubs = {};
function subscribeGroupMembersLive(groupId){
  unsubscribeGroupMembersLive();
  const fdb = window.__firebaseDB;
  const members = state.groupInfoMembers;
  if(!fdb || !fdb.ready || typeof fdb.subscribeToUser !== 'function' || !members) return;
  members.forEach(m=>{
    memberProfileUnsubs[m.uid] = fdb.subscribeToUser(m.uid, (u)=>{
      if(state.activeGroupId !== groupId) return;
      const list = state.groupInfoMembers;
      if(!list) return;
      const idx = list.findIndex(x=>x.uid===m.uid);
      if(idx===-1) return;
      list[idx] = {
        uid: m.uid,
        name: (u && (u.nickname || u.name)) || T('memberFallbackName'),
        photoUrl: (u && u.photoUrl) || null,
        streak: (u && typeof u.journalEntryCount === 'number') ? u.journalEntryCount : 0,
      };
      render();
    });
  });
}
function unsubscribeGroupMembersLive(){
  Object.values(memberProfileUnsubs).forEach(unsub=>{ try{ unsub(); }catch(e){} });
  memberProfileUnsubs = {};
}

/* Keeps the room's Firestore doc (name/photoUrl/ownerUid/closed) live-synced while the
   user is inside the group-room or group-manage screen: local `groups` cache is patched
   immediately so the room header / manage screen / groups list all reflect the latest
   name & photo without a reload. The `closed` check is a defensive fallback only (no UI
   can set it anymore since chat-room "destroy" was removed in favor of "leave") - it just
   bounces someone back to the groups list if a room is ever closed by other means. */
function ensureGroupDocSub(groupId){
  if(groupDocUnsubId === groupId && groupDocUnsub) return;
  subscribeToGroupDoc(groupId);
}
function subscribeToGroupDoc(groupId){
  unsubscribeGroupDoc();
  state.groupManageDoc = null;
  const fdb = window.__firebaseDB;
  if(!fdb || !fdb.ready || typeof fdb.subscribeToGroup !== 'function' || !groupId) return;
  groupDocUnsubId = groupId;
  groupDocUnsub = fdb.subscribeToGroup(groupId, (doc)=>{
    if(state.activeGroupId !== groupId) return;
    if(doc && doc.closed){
      groups = groups.filter(gr=>gr.id!==groupId);
      saveGroups();
      state.activeGroupId = null;
      state.groupManageDoc = null;
      state.groupInfoMembers = null;
      if(state.screen==='group-room' || state.screen==='group-manage'){
        state.screen = 'groups';
        showToast(T('toastRoomGone'));
      }
      render();
      return;
    }
    state.groupManageDoc = doc;
    const local = getGroup(groupId);
    if(doc && local){
      let changed = false;
      if(doc.name && local.name !== doc.name){ local.name = doc.name; changed = true; }
      if(local.photoUrl !== (doc.photoUrl || null)){ local.photoUrl = doc.photoUrl || null; changed = true; }
      if(local.ownerUid !== doc.ownerUid){ local.ownerUid = doc.ownerUid; changed = true; }
      if(changed) saveGroups();
    }
    render();
  });
}
function unsubscribeGroupDoc(){
  if(groupDocUnsub){ groupDocUnsub(); groupDocUnsub = null; }
  groupDocUnsubId = null;
}

/* group-room 화면에 있는 동안 groups/{id}/messages를 실시간 구독해, 다른 멤버가 보낸
   메시지가 내 화면에도 곧바로 나타나게 합니다. (이 구독이 없으면 각자 기기의 로컬 캐시만
   보게 되어 서로의 메시지가 실시간으로 보이지 않습니다.) */
function ensureMessagesSub(groupId){
  if(messagesUnsubId === groupId && messagesUnsub) return;
  subscribeToMessagesFeed(groupId);
}
function subscribeToMessagesFeed(groupId){
  unsubscribeMessagesFeed();
  const fdb = window.__firebaseDB;
  if(!fdb || !fdb.ready || typeof fdb.subscribeToMessages !== 'function' || !groupId) return;
  if(!(state.user && state.user.uid)) return;
  // 메시지 read/create는 firestore.rules상 members에 포함된 사람만 가능한데, 아직 한 번도
  // Firestore에 동기화된 적 없는(로컬 시드 데이터 등) 그룹은 groups/{groupId} 문서 자체가
  // 없어서 isGroupMember()의 get()이 실패해 곧바로 permission-denied가 납니다. 그래서
  // ensureGroup으로 문서를 먼저 만들고(+ 나를 members에 넣고) 나서 구독을 붙입니다.
  const pendingId = groupId;
  messagesUnsubId = pendingId; // 이 groupId에 대한 구독 시도가 진행 중임을 표시해 중복 호출을 막음
  const g = getGroup(groupId);
  const ensure = typeof fdb.ensureGroup === 'function'
    ? fdb.ensureGroup(groupId, { name: g ? g.name : '', ownerUid: state.user.uid, color: g ? g.color : null, code: g ? g.code : null })
    : Promise.resolve();
  ensure.then(()=>{
    if(messagesUnsubId !== pendingId) return; // 그 사이 다른 방으로 이동/나감
    messagesUnsub = fdb.subscribeToMessages(groupId, (remoteMsgs)=>{
      applyRemoteMessages(groupId, remoteMsgs);
    }, 50, (err)=>{
      console.error('Message subscription failed:', err);
      showToast(T('toastMessagesLoadFailed'));
    });
  }).catch(err=>{
    console.error('ensureGroup before message subscription failed:', err);
    if(messagesUnsubId === pendingId) messagesUnsubId = null;
  });
}
function unsubscribeMessagesFeed(){
  if(messagesUnsub){ messagesUnsub(); messagesUnsub = null; }
  messagesUnsubId = null;
}
/* Firestore의 실시간 메시지 목록을 로컬 g.messages에 병합합니다. 이미지/묵상 공유 카드처럼
   로컬에만 있는 메시지 타입은 건드리지 않고, 텍스트 메시지만 다룹니다. 내가 보낸 메시지는
   clientId로 매칭해 이미 낙관적으로 그려둔 말풍선에 원격 id만 붙이고(중복 추가 안 함),
   그 외(다른 멤버가 보낸, 또는 다른 기기에서 내가 보낸) 메시지만 새로 추가합니다. */
function applyRemoteMessages(groupId, remoteMsgs){
  const g = getGroup(groupId);
  if(!g || !Array.isArray(remoteMsgs)) return;
  const myUid = state.user && state.user.uid;
  const seenRemoteIds = new Set((g.messages||[]).filter(m=>m._remoteId).map(m=>m._remoteId));
  const localByClientId = new Map((g.messages||[]).map(m=>[m.id, m]));
  // clientId 필드가 생기기 전(이번 수정 이전)에 내가 보낸, 아직 원격 id가 안 붙은 텍스트
  // 메시지들은 clientId로 못 찾으므로, 내용이 같은 것끼리 순서대로 1:1 매칭해 처음 켤 때
  // 내 과거 메시지가 중복으로 나타나지 않게 합니다.
  const unmatchedMine = (g.messages||[]).filter(m=>m.isMe && m.type==='text' && !m._remoteId);
  let changed = false;
  remoteMsgs.forEach(rm=>{
    if(seenRemoteIds.has(rm.id)) return;
    const clientMatch = rm.clientId && localByClientId.get(rm.clientId);
    if(clientMatch && !clientMatch._remoteId){
      clientMatch._remoteId = rm.id;
      changed = true;
      return;
    }
    if(rm.uid===myUid){
      const idx = unmatchedMine.findIndex(m=>m.text===rm.text);
      if(idx!==-1){
        unmatchedMine[idx]._remoteId = rm.id;
        unmatchedMine.splice(idx, 1);
        changed = true;
        return;
      }
    }
    g.messages.push({
      id: 'r-'+rm.id,
      _remoteId: rm.id,
      from: rm.uid===myUid ? (state.user.nickname || state.user.name || T('memberFallbackName')) : (rm.name || T('memberFallbackName')),
      isMe: rm.uid===myUid,
      type: rm.type || 'text',
      text: rm.text,
    });
    changed = true;
  });
  if(changed){
    saveGroups();
    if(state.screen==='group-room' && state.activeGroupId===groupId) render();
  }
}
function isRoomOwner(){
  const uid = state.user && state.user.uid;
  if(!uid) return false;
  if(state.groupManageDoc) return state.groupManageDoc.ownerUid === uid;
  const g = getGroup(state.activeGroupId);
  return !!(g && g.ownerUid === uid);
}

function blankEntry(){
  return { content:{}, thought:{ verse:'', passage:'', godIs:'', askIndex:null, heard:'', appMe:'', appServe:'', prayerReq:'', prayerFor:'', thanks:['','',''] } };
}
/* Back-compat: entries saved before "삶으로의 적용"/"기도제목" were split into two fields
 * each still carry the old flat `application`/`prayer` strings. Fold them into the new
 * appMe/prayerReq fields once, in place, so past entries stay visible. */
function migrateThoughtEntry(entry){
  if(!entry || !entry.thought) return;
  const t = entry.thought;
  if(t.appMe===undefined) t.appMe = t.application || '';
  if(t.appServe===undefined) t.appServe = '';
  if(t.prayerReq===undefined) t.prayerReq = t.prayer || '';
  if(t.prayerFor===undefined) t.prayerFor = '';
}
function getEntry(dateStr){
  if(!journalData[dateStr]) journalData[dateStr] = blankEntry();
  else migrateThoughtEntry(journalData[dateStr]);
  return journalData[dateStr];
}
function hasEntryContent(dStr){
  return entryHasContent(journalData[dStr]);
}
function entryHasContent(e){
  return entryHasContentAnswers(e) || entryHasThoughtAnswers(e);
}
// Split out of entryHasContent() so the share picker can check "is there anything
// to share" per kind (content-question vs thought-question) instead of only "is
// there anything at all", so e.g. picking "내용 질문 기록" on a chapter that only
// has thought answers correctly reports no record rather than sharing a blank card.
function entryHasContentAnswers(e){
  return !!(e && Object.values(e.content||{}).some(v=>v && v.trim()));
}
function entryHasThoughtAnswers(e){
  if(!e) return false;
  const t = e.thought||{};
  return ['verse','passage','godIs','heard','appMe','appServe','prayerReq','prayerFor','application','prayer'].some(k=>t[k] && t[k].trim())
    || (t.askIndex!==null && t.askIndex!==undefined)
    || (t.thanks||[]).some(v=>v && v.trim());
}
function isBookComplete(m){
  const prefix = `${YEAR}-${pad(m)}-`;
  return Object.keys(journalData).some(k=>k.startsWith(prefix) && hasEntryContent(k));
}
function pad(n){ return n<10 ? '0'+n : ''+n; }
function dstr(y,m,d){ return `${y}-${pad(m)}-${pad(d)}`; }

/* ---------------- streak (연속 학습 일수) ----------------
 * A day counts as "완료" when the content-question tab or the thought-question
 * tab for the chapter being edited has at least one text box with trim().length > 0.
 * streakCount/streakLastDate persist to localStorage (via window.storage) so the
 * flame badge survives closing and reopening the app. */
function entryHasAnyText(e){
  if(!e) return false;
  const c = Object.values(e.content||{}).some(v=>v && v.trim().length>0);
  const t = e.thought||{};
  const th = ['verse','passage','godIs','heard','appMe','appServe','prayerReq','prayerFor','application','prayer'].some(k=>t[k] && t[k].trim().length>0)
    || (t.thanks||[]).some(v=>v && v.trim().length>0);
  return c || th;
}
function localDateStr(d){ return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
function todayStr(){ return localDateStr(new Date()); }
function yesterdayStr(){ const d=new Date(); d.setDate(d.getDate()-1); return localDateStr(d); }
function saveStreak(){
  window.storage.set('streak-data', JSON.stringify({ streakCount: state.streakCount, lastCompletedDate: state.streakLastDate }), false).catch(()=>{});
}
/* Called once at startup (after loading streak-data from storage) and whenever the app
 * detects the date may have rolled over: if the last completed day is neither today nor
 * yesterday, the streak was broken by a skipped day, so it resets to 0. */
function resetStreakIfBroken(){
  if(!state.streakLastDate) return;
  const today = todayStr();
  if(state.streakLastDate === today || state.streakLastDate === yesterdayStr()) return;
  state.streakCount = 0;
  saveStreak();
}
/* Called from the journal-entry input handler on every keystroke. Increments the streak
 * exactly once per calendar day, the first time that day's entry gains any text. */
function markStreakProgress(entry){
  if(!entryHasAnyText(entry)) return;
  const today = todayStr();
  if(state.streakLastDate === today) return; // already credited today
  state.streakCount = (state.streakCount||0) + 1;
  state.streakLastDate = today;
  saveStreak();
}
function computeStreak(){
  resetStreakIfBroken();
  return state.streakCount || 0;
}

/* ---------------- smart "continue reading" navigation ----------------
 * Drives the topbar book-icon button: resume the last chapter the user had open
 * if it isn't finished yet (same "any text box filled" rule as the streak), or
 * jump to the next chapter once it is. lastActiveMonth/lastActiveChapter persist
 * to localStorage (via window.storage) so this works across app restarts. */
function saveLastActiveChapter(m, c){
  state.lastActiveMonth = m;
  state.lastActiveChapter = c;
  window.storage.set('last-active-chapter', JSON.stringify({ month:m, chapter:c }), false).catch(()=>{});
}
/* Enters a chapter's daily screen and remembers it as the "continue reading" target. */
function enterChapter(m, c){
  state.activeMonth = m;
  state.activeChapter = c;
  state.screen = 'daily';
  state.activeTab = 'bible';
  state.highlightVerse = null;
  state.askOpen = false;
  saveLastActiveChapter(m, c);
  render();
}
function nextChapterOf(m, c){
  const count = CHAPTER_COUNTS[m] || 1;
  if(c < count) return { m, c: c+1 };
  const nextM = m+1;
  if(CHAPTER_COUNTS[nextM]) return { m: nextM, c: 1 };
  return { m, c }; // already at the last chapter of the last book - nothing further to advance to
}
/* Bible-tab prev/next chapter buttons: stays within the current book (dir=-1/1),
 * returns null at that book's first/last chapter so the caller can disable the button. */
function chapterNavTarget(m, c, dir){
  const count = CHAPTER_COUNTS[m] || 1;
  const target = c + dir;
  if(target < 1 || target > count) return null;
  return { m, c: target };
}
/* Fallback for users who already have journal entries from before lastActiveMonth/
 * lastActiveChapter existed as a tracked field: picks the furthest-progressed chapter
 * that has any recorded content, so their history isn't ignored on first upgrade. */
function findFurthestChapterWithContent(){
  let best = null;
  Object.keys(journalData).forEach(k=>{
    if(!entryHasAnyText(journalData[k])) return;
    const [mStr, cStr] = k.split('-');
    const m = Number(mStr), c = Number(cStr);
    if(!best || m>best.m || (m===best.m && c>best.c)) best = { m, c };
  });
  return best;
}
/* Default book/chapter the share picker opens to: whichever chapter the user
 * was last actively viewing (if it actually has a written record), otherwise
 * the furthest chapter anywhere that has one, otherwise wherever they're
 * currently browsing, otherwise Genesis 1 — this always returns a real
 * {m,c} pair and is the fix for the "창세기 null장" bug, which happened
 * because the share flow used to read state.activeMonth/activeChapter
 * directly and those default to null until a chapter is opened. */
function findMostRecentEntryForShare(){
  if(state.lastActiveMonth && state.lastActiveChapter &&
     entryHasAnyText(journalData[ckey(state.lastActiveMonth, state.lastActiveChapter)])){
    return { m: state.lastActiveMonth, c: state.lastActiveChapter };
  }
  const furthest = findFurthestChapterWithContent();
  if(furthest) return furthest;
  if(state.activeMonth && state.activeChapter) return { m: state.activeMonth, c: state.activeChapter };
  return { m: 1, c: 1 };
}
function computeSmartStartChapter(){
  const last = (state.lastActiveMonth && state.lastActiveChapter)
    ? { m: state.lastActiveMonth, c: state.lastActiveChapter }
    : findFurthestChapterWithContent();
  if(!last) return { m: 1, c: 1 }; // no history anywhere -> Genesis 1
  const entry = journalData[ckey(last.m, last.c)];
  if(!entryHasAnyText(entry)) return last; // last chapter isn't finished yet -> resume it
  return nextChapterOf(last.m, last.c); // last chapter is done -> move on
}
// Shared by the "go-today" nav action and by push-notification clicks
// (see the service-worker message listener below), both of which land the
// user on today's devotion/journaling screen the same way.
function goToTodayJournal(){
  const target = computeSmartStartChapter();
  const m = target.m;
  if(state.purchased.includes(m)){
    enterChapter(m, target.c);
  } else {
    state.purchaseModal = m;
    state.selectedPlan = 'year';
    render();
    showToast(T('toastNeedPurchase', bookName(m)));
  }
}

/* ---------------- share snapshot (screenshot-style image) ---------------- */
function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function nl2br(s){
  return String(s||'').replace(/\n/g, '<br>');
}
const WEEKDAY_LABELS = {
  ko: ['일','월','화','수','목','금','토'],
  en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  ja: ['日','月','火','水','木','金','土'],
  th: ['อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.'],
  zh: ['日','一','二','三','四','五','六'],
};
const EN_MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const TH_MONTH_LABELS = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
function todayDateLabel(){
  const now = new Date();
  const lang = state.lang;
  const wd = (WEEKDAY_LABELS[lang] || WEEKDAY_LABELS.ko)[now.getDay()];
  if(lang==='en') return `${EN_MONTH_LABELS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} (${wd})`;
  if(lang==='ja') return `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 (${wd})`;
  if(lang==='th') return `${now.getDate()} ${TH_MONTH_LABELS[now.getMonth()]} ${now.getFullYear()} (${wd})`;
  if(lang==='zh') return `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 (${wd})`;
  return `${now.getFullYear()}년 ${now.getMonth()+1}월 ${now.getDate()}일 (${wd})`;
}
// Both snapshot builders take a ckey(m,c) string and derive the book/chapter
// label and question set from THAT key — never from state.activeMonth/
// activeChapter — so sharing a chapter other than whichever one happens to be
// open in the daily screen (e.g. from the share picker's own book/chapter
// selector) always shows the right title instead of a stale or null one.
function buildContentSnapshotHTML(key){
  const [m, c] = key.split('-').map(Number);
  const entry = getEntry(key);
  const noAnswer = T('snapNoAnswerContent');
  const data = getContentQuestions(bookDataId(m), c, state.lang);
  const questions = data ? data.questions : [];
  const cards = questions.map(q=>{
    const qid = 'q'+q.questionNumber;
    const val = (entry.content[qid]||'').trim();
    return `
      <div class="snap-qcard">
        <div class="snap-qtext">${nl2br(escapeHtml(`${q.questionNumber}. ${q.question}`))}</div>
        <div class="snap-answer ${val?'':'empty'}">${val?escapeHtml(val):noAnswer}</div>
      </div>`;
  }).join('');
  return `
    <div class="snap-card" id="snap-render-target">
      <div class="snap-header">
        <div class="snap-eyebrow">${escapeHtml(chapterLabel(bookName(m), c))} · ${T('navContent')}</div>
        <div class="snap-date">${todayDateLabel()}</div>
      </div>
      ${cards}
      <div class="snap-footer">Bible Journal · ${T('loginTitle')}</div>
    </div>`;
}
function buildThoughtSnapshotHTML(key){
  const [m, c] = key.split('-').map(Number);
  const entry = getEntry(key);
  const t = entry.thought;
  const noAnswer = T('snapNoAnswerThought');
  const val = (v)=> (v && v.trim()) ? `<div class="snap-value">${escapeHtml(v)}</div>` : `<div class="snap-value empty">${noAnswer}</div>`;
  const askQ = t.askIndex!==null ? getAskQuestions()[t.askIndex] : T('snapNoQuestionSelected');
  const thanksRows = (t.thanks||[]).filter(v=>v && v.trim()).map((v,i)=>`
    <div class="snap-thanks-row"><div class="num">${i+1}</div><div style="font-size:calc(13px * var(--fs-scale))">${escapeHtml(v)}</div></div>
  `).join('') || `<div class="snap-value empty">${noAnswer}</div>`;

  return `
    <div class="snap-card" id="snap-render-target">
      <div class="snap-header">
        <div class="snap-eyebrow">${escapeHtml(chapterLabel(bookName(m), c))} · ${T('navThought')}</div>
        <div class="snap-date">${todayDateLabel()}</div>
      </div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('verseLabel')}</div>${val(t.verse)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('passageLabel')}</div>${val(t.passage)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('godIsLabel')}</div>${val(t.godIs)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('askLabel')}</div><div class="snap-value">${escapeHtml(askQ)}</div></div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('heardLabel')}</div>${val(t.heard)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('appMeLabel')}</div>${val(t.appMe)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('appServeLabel')}</div>${val(t.appServe)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('prayerReqLabel')}</div>${val(t.prayerReq)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('prayerForLabel')}</div>${val(t.prayerFor)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('thanksLabel')}</div>${thanksRows}</div>
      <div class="snap-footer">Bible Journal · ${T('loginTitle')}</div>
    </div>`;
}
function ensureHtml2Canvas(){
  return new Promise((resolve, reject)=>{
    if(window.html2canvas) return resolve();
    let tries = 0;
    const iv = setInterval(()=>{
      tries++;
      if(window.html2canvas){ clearInterval(iv); resolve(); }
      else if(tries>60){ clearInterval(iv); reject(new Error('html2canvas failed to load')); }
    }, 100);
  });
}
async function captureSnapshotImage(innerHTML){
  await ensureHtml2Canvas();
  const holder = document.createElement('div');
  holder.innerHTML = innerHTML;
  document.body.appendChild(holder);
  const target = holder.querySelector('#snap-render-target');
  try{
    if(document.fonts && document.fonts.ready){ await document.fonts.ready; }
  }catch(e){}
  const canvas = await window.html2canvas(target, {backgroundColor:'#FBF6EF', scale:2, useCORS:true});
  const dataUrl = canvas.toDataURL('image/png');
  document.body.removeChild(holder);
  return dataUrl;
}

function triggerImageDownload(dataUrl, filename){
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* Opens the device's mail app via mailto:. If nothing responds within ~1.5s
   (no app switch / tab hide happened), assume no mail client is installed and
   fall back to the Play Store / App Store listing for Gmail (or Gmail's web
   compose page on desktop, where there's no app store to fall back to). */
function openEmailContact(email, subject, body){
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  let handled = false;
  const markHandled = ()=>{ handled = true; };
  window.addEventListener('blur', markHandled, { once:true });
  document.addEventListener('visibilitychange', function onVis(){
    if(document.hidden){ markHandled(); document.removeEventListener('visibilitychange', onVis); }
  });

  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  try{ iframe.contentWindow.location.href = mailto; }catch(e){ window.location.href = mailto; }

  setTimeout(()=>{
    if(iframe.parentNode) document.body.removeChild(iframe);
    if(handled) return;
    const ua = navigator.userAgent || '';
    if(/android/i.test(ua)){
      window.location.href = 'https://play.google.com/store/apps/details?id=com.google.android.gm';
    } else if(/iphone|ipad|ipod/i.test(ua)){
      window.location.href = 'https://apps.apple.com/app/gmail-email-by-google/id422689480';
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }
  }, 1500);
}

/* Tries the native share sheet (where KakaoTalk shows up as an option on mobile).
   Returns true if the native sheet was shown, false if unsupported so callers can fall back. */
async function shareImageNative(dataUrl, filename, title){
  try{
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], filename, { type:'image/png' });
    if(navigator.canShare && navigator.canShare({ files:[file] })){
      await navigator.share({ files:[file], title });
      return true;
    }
  }catch(e){
    if(e && e.name==='AbortError') return true; // user cancelled the native sheet themselves
    console.error('Native share failed:', e);
  }
  return false;
}

let toastTimer=null, saveTimer=null, donateCopyTimer=null;

/* ---------------- persistence ---------------- */
async function loadAll(){
  showLoading();
  try{
    const p = await window.storage.get('purchased-months');
    if(p) state.purchased = JSON.parse(p.value);
  }catch(e){}
  let migrated = null;
  try{
    migrated = await window.storage.get('lock-9-12-v1');
  }catch(e){
    migrated = null; // key doesn't exist yet -> not migrated
  }
  if(!migrated){
    state.purchased = state.purchased.filter(m=>m<=8);
    if(state.purchased.length===0) state.purchased = [1,2,3,4,5,6,7,8];
    savePurchased();
    try{ await window.storage.set('lock-9-12-v1', '1', false); }catch(e){}
  }
  let booksMigrated = null;
  try{
    booksMigrated = await window.storage.get('books-v1-migration');
  }catch(e){
    booksMigrated = null;
  }
  if(!booksMigrated){
    state.purchased = [1,2,3];
    savePurchased();
    try{ await window.storage.set('books-v1-migration', '1', false); }catch(e){}
  }
  let freeMigrated = null;
  try{
    freeMigrated = await window.storage.get('free-v1-migration');
  }catch(e){
    freeMigrated = null;
  }
  if(!freeMigrated){
    state.purchased = [1,2,3,4,5];
    savePurchased();
    try{ await window.storage.set('free-v1-migration', '1', false); }catch(e){}
  }
  try{
    const a = await window.storage.get('journal-entries');
    if(a) journalData = JSON.parse(a.value);
  }catch(e){}
  Object.values(journalData).forEach(migrateThoughtEntry);
  try{
    const s = await window.storage.get('streak-data');
    if(s){
      const parsed = JSON.parse(s.value);
      state.streakCount = parsed.streakCount || 0;
      state.streakLastDate = parsed.lastCompletedDate || null;
    }
  }catch(e){}
  resetStreakIfBroken();
  try{
    const la = await window.storage.get('last-active-chapter');
    if(la){
      const parsed = JSON.parse(la.value);
      state.lastActiveMonth = parsed.month || null;
      state.lastActiveChapter = parsed.chapter || null;
    }
  }catch(e){}
  try{
    // Firebase Authentication (via initAuthGate/onAuthStateChanged) is the source of truth
    // for state.loggedIn/state.user. Here we only merge in extra cached profile fields
    // (username/nickname/birth from signup) that Firebase itself doesn't store.
    const up = await window.storage.get('user-profile');
    if(up && up.value) state.user = Object.assign({}, JSON.parse(up.value), state.user);
  }catch(e){}
  // Loaded before subscribing to auth so the login-time reconcile with the
  // Firestore notificationSettings never gets overwritten by this cached copy.
  try{
    const nf = await window.storage.get('notif-settings');
    if(nf) notifSettings = Object.assign(notifSettings, JSON.parse(nf.value));
  }catch(e){}
  subscribeToAuthUser();
  try{
    const g = await window.storage.get('groups-data');
    groups = g ? JSON.parse(g.value) : seedGroups();
  }catch(e){
    groups = seedGroups();
  }
  groups.forEach(g=>{ if(!g.memberCount) g.memberCount = 3; });
  resumeAllReadTicks();
  try{
    const pr = await window.storage.get('app-prefs');
    if(pr){
      const parsed = JSON.parse(pr.value);
      if(parsed.fontSize) state.fontSize = parsed.fontSize;
      if(parsed.lang) state.lang = parsed.lang;
      if(parsed.theme) state.theme = parsed.theme;
    }
  }catch(e){}
  groupsLoaded = true;
  hideLoading();
  openTodayJournalIfRequested();
  sendLanguageToServiceWorker(state.lang);
}
// A push notification click (see public/sw.js) opens a fresh tab at
// /?openToday=1 when no existing tab was found to focus+postMessage instead.
// On first load, that query flag lands the user on today's journal the same
// way "go-today" does, then the URL is cleaned up so a later refresh doesn't
// re-trigger it.
function openTodayJournalIfRequested(){
  try{
    const params = new URLSearchParams(window.location.search);
    if(params.get('openToday') === '1'){
      goToTodayJournal();
      params.delete('openToday');
      const rest = params.toString();
      const url = window.location.pathname + (rest ? `?${rest}` : '') + window.location.hash;
      window.history.replaceState(null, '', url);
    }
  }catch(e){}
}
// A notification click while a tab is already open focuses it and posts this
// message instead of reloading, so the running app just navigates in place.
if('serviceWorker' in navigator){
  navigator.serviceWorker.addEventListener('message', (event)=>{
    if(event.data && event.data.type === 'open-today-journal'){
      goToTodayJournal();
    }
  });
}
function savePrefs(){
  window.storage.set('app-prefs', JSON.stringify({fontSize:state.fontSize, lang:state.lang, theme:state.theme}), false).catch(()=>{});
}
function saveNotifSettings(){
  window.storage.set('notif-settings', JSON.stringify(notifSettings), false).catch(()=>{});
}
// Converts the local flat { mon:'07:00'|null, ... } shape into the
// { mon:{active,time}, ... } shape the Firestore users/{uid}.notificationSettings
// schema uses, so the local UI state stays simple while the synced doc matches spec.
function notifSettingsForFirestore(){
  const out = {};
  NOTIF_DAYS.forEach(d=>{
    const time = notifSettings[d];
    out[d] = { active: !!time, time: time || '07:00' };
  });
  return out;
}
function syncNotificationSettingsToFirestore(){
  const uid = state.user && state.user.uid;
  if(!uid || !(window.__firebaseDB && window.__firebaseDB.ready)) return;
  window.__firebaseDB.updateNotificationSettings(uid, notifSettingsForFirestore())
    .catch(err=>console.error('[notif] Firestore notificationSettings save failed:', err));
}
// Runs at login with the Firestore users/{uid} doc. The doc's
// notificationSettings win over this browser's cached copy, so a change made on
// another device (or before a reinstall) shows up here; if the doc has none
// yet, the local settings are uploaded instead. When permission was already
// granted and a day is on, the FCM token is refreshed without prompting.
function reconcileNotificationSettings(remote){
  const hasRemote = !!remote && NOTIF_DAYS.some(d=>remote[d] && typeof remote[d]==='object');
  if(hasRemote){
    NOTIF_DAYS.forEach(d=>{
      const r = remote[d];
      notifSettings[d] = r && r.active ? (r.time || '07:00') : null;
    });
    saveNotifSettings();
  } else if(NOTIF_DAYS.some(d=>notifSettings[d])){
    syncNotificationSettingsToFirestore();
  }
  if(typeof Notification!=='undefined' && Notification.permission==='granted' && NOTIF_DAYS.some(d=>notifSettings[d])){
    registerPushForCurrentUser();
  }
}
// Requests notification permission + an FCM token for this browser and, if a
// user is logged in, saves the token to their Firestore profile. Safe to call
// repeatedly (Notification.requestPermission() no-ops once answered, and a
// missing VAPID key or unsupported browser just resolves token:null).
function registerPushForCurrentUser(){
  ensurePushRegistration().then(({ token })=>{
    const uid = state.user && state.user.uid;
    if(token && uid && window.__firebaseDB && window.__firebaseDB.ready){
      window.__firebaseDB.updateFcmToken(uid, token)
        .catch(err=>console.error('[notif] Firestore fcmToken save failed:', err));
    }
  }).catch(err=>console.error('[push] registration failed:', err));
}
function savePurchased(){
  window.storage.set('purchased-months', JSON.stringify(state.purchased), false).catch(()=>{});
}
function saveAuth(){
  window.storage.set('auth-state', JSON.stringify({loggedIn:state.loggedIn}), false).catch(()=>{});
}
/* ---------------- Firebase auth gate ---------------- */
function googleErrorToast(err){
  const code = err && err.code;
  if(code==='auth/popup-closed-by-user' || code==='auth/cancelled-popup-request') return T('toastGoogleCancelled');
  if(code==='auth/popup-blocked') return T('toastPopupBlocked');
  if(code==='auth/network-request-failed') return T('toastNetworkError');
  return T('toastGoogleFailed');
}

/* Profile photo saves go through Firestore (permission-denied if firestore.rules rejects
   the write) and Auth's updateProfile (network/session errors) - no Storage calls, so the
   error surface is just these two SDKs' own codes. */
function avatarErrorToast(err){
  const code = err && err.code;
  if(code==='permission-denied') return T('toastAvatarPermissionDenied');
  if(code==='unavailable' || code==='auth/network-request-failed') return T('toastNetworkError');
  if(code==='auth/user-token-expired' || code==='auth/user-signed-out') return T('toastAvatarLoginRequired');
  return T('toastAvatarSaveFailed');
}

function applyAuthProfile(profile){
  if(profile){
    // Merge onto any cached fields (e.g. username/nickname/birth) instead of replacing outright.
    state.user = Object.assign({}, state.user, { name:profile.name, email:profile.email, photoUrl:profile.photoUrl });
    state.loggedIn = true;
  } else {
    state.user = null;
    state.loggedIn = false;
  }
  saveAuth();
}

/* Runs once at startup: shows the loading screen until Firebase reports the current
   auth session, then routes straight to home (logged in) or login (logged out) with
   no login-screen flash. Also keeps listening so a lost/expired session sends the
   user back to the login screen from wherever they are. */
function initAuthGate(){
  render(); // paint the loading screen immediately, before Firebase's async check resolves
  const bridge = window.__firebaseAuth;
  if(!bridge || !bridge.ready){
    state.screen = 'login';
    render();
    showToast(T('toastFirebaseNotSet'));
    return;
  }
  let firstCheck = true;
  bridge.onChange(profile=>{
    applyAuthProfile(profile);
    if(firstCheck){
      firstCheck = false;
      if(profile) resolvePostLoginScreen();
      else state.screen = 'login';
    } else if(!profile && state.screen!=='login' && state.screen!=='signup'){
      state.screen = 'login';
    }
    render();
  });
}
/* Firebase Auth의 실제 로그인 상태(onAuthStateChanged)를 구독해, 로컬 캐시(user-profile)가
   비어있거나 오래된 경우(예: 카카오 로그인 후 아이디/닉네임이 빈칸으로 저장된 과거 세션)에도
   currentUser와 Firestore users/{uid} 문서 값으로 프로필 화면을 다시 채워줍니다. */
function subscribeToAuthUser(){
  if(!(window.__firebaseAuth && window.__firebaseAuth.ready)) return;
  window.__firebaseAuth.onChange(async (profile)=>{
    if(!profile) return;
    let merged = { ...state.user, ...profile };
    let remoteDoc = null;
    if(window.__firebaseDB && window.__firebaseDB.ready){
      try{
        const doc = await withLoading(window.__firebaseDB.getUserProfile(profile.uid));
        remoteDoc = doc;
        if(doc){
          merged = { ...merged, ...doc };
          merged.uid = profile.uid;
          merged.name = doc.name || profile.name || merged.name;
          merged.email = doc.email || profile.email || merged.email;
          merged.photoUrl = doc.photoUrl || profile.photoUrl || merged.photoUrl;
        }
      }catch(e){}
    }
    state.user = merged;
    state.loggedIn = true;
    window.storage.set('user-profile', JSON.stringify(state.user), false).catch(()=>{});
    saveAuth();
    syncStreakToFirestore();
    reconcileNotificationSettings(remoteDoc && remoteDoc.notificationSettings);
    if(groupsLoaded) render();
  });
}
function saveGroups(){
  window.storage.set('groups-data', JSON.stringify(groups), false).catch(()=>{});
}

/* 초대 링크로 들어온 코드를 실제 그룹 참여로 이어줍니다. groups/{groupId}는 멤버만 read할
   수 있게 막혀 있어(firestore.rules), 아직 멤버가 아닌 상태로는 code로 그룹 문서를 바로
   조회할 수 없습니다. 그래서 (1) inviteCodes/{code}에서 groupId만 얕게 조회 →
   (2) members에 내 uid를 먼저 추가(update는 read 권한과 무관하게 허용됨) →
   (3) 멤버가 된 뒤에야 그룹 문서를 온전히 읽어오는 순서로 진행합니다. */
function joinGroupByInviteCode(code){
  const fdb = window.__firebaseDB;
  if(!fdb || !fdb.ready || typeof fdb.findGroupByCode !== 'function' || typeof fdb.addGroupMember !== 'function' || !(state.user && state.user.uid)){
    showToast(T('toastInviteFailed'));
    return;
  }
  const uid = state.user.uid;
  withLoading(
    fdb.findGroupByCode(code).then(async (invite)=>{
      if(!invite || !invite.id) throw new Error('invite-code-not-found');
      await fdb.addGroupMember(invite.id, uid);
      const doc = await fdb.getGroup(invite.id);
      if(!doc) throw new Error('invite-group-not-found');
      let g = getGroup(doc.id);
      if(!g){
        g = {
          id: doc.id,
          name: doc.name || '',
          color: doc.color || GROUP_COLORS[0],
          code: doc.code || code,
          photoUrl: doc.photoUrl || null,
          memberCount: (doc.members||[]).length || 1,
          messages: [],
        };
        groups.push(g);
      } else {
        g.name = doc.name || g.name;
        g.color = doc.color || g.color;
        g.photoUrl = doc.photoUrl || g.photoUrl;
        g.memberCount = (doc.members||[]).length || g.memberCount;
      }
      // 대화 내역은 여기서 한 번만 불러오지 않고, group-room 화면에 들어가는 즉시 붙는
      // 실시간 구독(ensureMessagesSub)이 최초 스냅샷으로 채워줍니다.
      saveGroups();
      return g;
    })
  ).then((g)=>{
    state.activeGroupId = g.id;
    state.screen = 'group-room';
    render();
    showToast(T('toastInviteJoined'));
  }).catch(err=>{
    console.error('Invite join failed:', err);
    render();
    showToast(T('toastInviteFailed'));
  });
}

/* 로그인 직후 화면 전환: 초대 링크를 타고 들어온 상태라면 그룹 참여 처리로 이어가고,
   그렇지 않으면 평소처럼 메인 화면으로 보냅니다. */
function resolvePostLoginScreen(){
  const code = pendingInviteCode;
  pendingInviteCode = null;
  state.screen = 'main';
  if(code) joinGroupByInviteCode(code);
}
function saveAnswersDebounced(){
  clearTimeout(saveTimer);
  const book = state.activeMonth ? bookName(state.activeMonth) : null;
  const chapter = state.activeChapter;
  const entry = (state.activeMonth && state.activeChapter) ? getEntry(ckey(state.activeMonth, state.activeChapter)) : null;
  saveTimer = setTimeout(()=>{
    window.storage.set('journal-entries', JSON.stringify(journalData), false).catch(()=>{});
    syncJournalToFirestore(book, chapter, entry);
  }, 450);
}
function syncJournalToFirestore(book, chapter, entry){
  if(!entry || !book || !chapter) return;
  if(!(state.user && state.user.uid)) return;
  const fdb = window.__firebaseDB;
  if(!fdb || !fdb.ready || typeof fdb.saveJournalEntry !== 'function') return;
  fdb.saveJournalEntry(state.user.uid, {
    book, chapter,
    contentAnswers: entry.content,
    thoughtAnswers: entry.thought,
  }).then(()=> syncStreakToFirestore())
    .catch(err=>console.error('Firestore journal save failed:', err));
}
/* Persists the same count computeStreak() already shows on the home screen badge into
   users/{uid}.journalEntryCount, so other members of a shared chat room can see this
   user's streak on their profile card without ever reading their private journal
   entries (see firestore.rules: journals subcollection stays owner-only). */
let lastPushedStreak = null;
function syncStreakToFirestore(){
  if(!(state.user && state.user.uid)) return;
  const fdb = window.__firebaseDB;
  if(!fdb || !fdb.ready || typeof fdb.updateUserStreak !== 'function') return;
  const streak = computeStreak();
  if(streak === lastPushedStreak) return;
  lastPushedStreak = streak;
  fdb.updateUserStreak(state.user.uid, streak).catch(err=>console.error('Failed to sync streak count:', err));
}

/* ---------------- helpers ---------------- */
function showToast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 1800);
}
/* Resizes/re-encodes a picked image client-side into a small Base64 JPEG data URL, which is
   written directly to the user's photoURL (Auth + Firestore) instead of Firebase Storage.
   Profile photos don't need to go through Storage at all, and skipping it sidesteps
   Storage-specific failure modes (bucket/CORS misconfiguration, storage/retry-limit-exceeded)
   entirely. Capping at 200px/quality 0.7 keeps the resulting data URL to roughly 10-20KB,
   comfortably under Firestore's 1MB field limit. */
function resizeImageToDataURL(file, maxSize=200, quality=0.7){
  return new Promise((resolve, reject)=>{
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = ()=>{
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if(width > maxSize || height > maxSize){
        if(width >= height){ height = Math.round(height * maxSize / width); width = maxSize; }
        else { width = Math.round(width * maxSize / height); height = maxSize; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      try{
        resolve(canvas.toDataURL('image/jpeg', quality));
      }catch(err){
        reject(err);
      }
    };
    img.onerror = ()=>{ URL.revokeObjectURL(url); reject(new Error('image-load-failed')); };
    img.src = url;
  });
}

/* Same resize as resizeImageToDataURL, but resolves a JPEG Blob instead of a data URL -
   used for the chat room photo, which (unlike the personal profile photo) is uploaded to
   Firebase Storage rather than embedded as Base64 in a Firestore field. */
function resizeImageToBlob(file, maxSize=480, quality=0.85){
  return new Promise((resolve, reject)=>{
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = ()=>{
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if(width > maxSize || height > maxSize){
        if(width >= height){ height = Math.round(height * maxSize / width); width = maxSize; }
        else { width = Math.round(width * maxSize / height); height = maxSize; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob)=>{
        if(blob) resolve(blob); else reject(new Error('blob-failed'));
      }, 'image/jpeg', quality);
    };
    img.onerror = ()=>{ URL.revokeObjectURL(url); reject(new Error('image-load-failed')); };
    img.src = url;
  });
}

/* Hidden file input used by the profile screen's "change photo" button. It lives outside
   #app (a sibling of it inside #shell) so it survives the innerHTML re-renders in render(). */
function setupAvatarFileInput(){
  if(document.getElementById('avatar-file-input')) return;
  const input = document.createElement('input');
  input.type = 'file';
  input.id = 'avatar-file-input';
  input.accept = 'image/*';
  input.style.display = 'none';
  input.addEventListener('change', async ()=>{
    const file = input.files && input.files[0];
    input.value = '';
    if(!file) return;
    if(!file.type || !file.type.startsWith('image/')){
      showToast(T('toastAvatarInvalidType'));
      return;
    }
    try{
      const dataUrl = await resizeImageToDataURL(file);
      // Firestore document fields cap out at 1MB; a 200px/quality-0.7 JPEG data URL is
      // nowhere near that in practice, but guard anyway so an unusual image (e.g. a huge
      // flat-color PNG that JPEG can't compress well) fails fast with a clear reason.
      const MAX_DATA_URL_LENGTH = 300 * 1024;
      if(dataUrl.length > MAX_DATA_URL_LENGTH){
        console.error('[Profile] 선택한 이미지가 너무 큽니다:', { length: dataUrl.length, max: MAX_DATA_URL_LENGTH });
        showToast(T('toastAvatarTooLarge'));
        return;
      }
      state.avatarModal = { dataUrl };
      render();
    }catch(e){
      console.error('[Profile] 이미지 리사이즈 실패:', {
        code: e && e.code,
        message: e && e.message,
        error: e,
      });
      showToast(T('toastAvatarSaveFailed'));
    }
  });
  document.getElementById('shell').appendChild(input);
}
setupAvatarFileInput();

/* Hidden file input used by the chat room management screen's "change room photo"
   button. Unlike the personal profile photo (Base64 in Firestore), this one is uploaded
   to Firebase Storage, so we keep both the resized Blob (to upload) and an object URL
   (to preview) on state.roomPhotoModal until the user confirms. */
function setupRoomPhotoFileInput(){
  if(document.getElementById('room-photo-file-input')) return;
  const input = document.createElement('input');
  input.type = 'file';
  input.id = 'room-photo-file-input';
  input.accept = 'image/*';
  input.style.display = 'none';
  input.addEventListener('change', async ()=>{
    const file = input.files && input.files[0];
    input.value = '';
    if(!file) return;
    if(!file.type || !file.type.startsWith('image/')){
      showToast(T('toastAvatarInvalidType'));
      return;
    }
    try{
      const blob = await resizeImageToBlob(file);
      const previewUrl = URL.createObjectURL(blob);
      state.roomPhotoModal = { blob, previewUrl };
      render();
    }catch(e){
      console.error('[GroupManage] 채팅방 사진 리사이즈 실패:', e);
      showToast(T('toastRoomPhotoSaveFailed'));
    }
  });
  document.getElementById('shell').appendChild(input);
}
setupRoomPhotoFileInput();

function todayLabel(){
  const d = new Date();
  const days=['일','월','화','수','목','금','토'];
  return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
}

/* ---------------- render root ---------------- */
/* ---------------- global loading overlay ----------------
   앱 어디서든(Firebase Auth, Firestore 조회/저장, 기타 비동기 통신) showLoading()/hideLoading()을
   호출해 같은 오버레이를 켜고 끌 수 있습니다. 중첩 호출을 고려해 카운터로 관리하므로,
   동시에 여러 요청이 걸려 있어도 모두 끝나야 사라집니다. withLoading(promise)는 이 두 호출을
   promise 앞뒤로 자동 연결해 주는 헬퍼입니다. */
function showLoading(){
  state.loadingCount++;
  render();
}
function hideLoading(){
  state.loadingCount = Math.max(0, state.loadingCount - 1);
  render();
}
function withLoading(promise){
  showLoading();
  return promise.finally(()=> hideLoading());
}
function renderLoadingOverlay(){
  if(state.loadingCount<=0) return '';
  return `
    <div class="loading-overlay">
      <div class="loading-card"><div class="loading-ring"></div></div>
    </div>
  `;
}
function render(){
  const shell = document.getElementById('shell');
  shell.className = 'fs-' + state.fontSize + ' theme-' + state.theme;

  const app = document.getElementById('app');
  let html = '';
  if(state.screen==='loading') html = renderLoading();
  else if(state.screen==='main') html = renderMain();
  else if(state.screen==='login') html = renderLogin();
  else if(state.screen==='signup') html = renderSignupScreen();
  else if(state.screen==='chapters') html = renderChapterGrid();
  else if(state.screen==='daily') html = renderDaily();
  else if(state.screen==='groups') html = renderGroupsList();
  else if(state.screen==='group-room') html = renderGroupRoom();
  else if(state.screen==='group-manage') html = renderGroupManage();
  else if(state.screen==='settings') html = renderSettingsScreen();
  else if(state.screen==='contact') html = renderContactScreen();
  else if(state.screen==='guide') html = renderGuideScreen();
  else if(state.screen==='notifications') html = renderNotificationsScreen();

  let overlays = '';
  if(state.nicknameModal) overlays += renderNicknameModal();
  if(state.avatarModal) overlays += renderAvatarModal();
  if(state.purchaseModal) overlays += renderPurchaseModal();
  if(state.createGroupOpen) overlays += renderCreateGroupSheet();
  if(state.inviteGroupId) overlays += renderInviteSheet();
  if(state.shareGroupId) overlays += renderSharePicker();
  if(state.imageViewer) overlays += renderImageViewer();
  if(state.chapterInfoOpen) overlays += renderChapterInfoSheet();
  if(state.verseActionMenu) overlays += renderVerseActionSheet();
  if(state.notifDayOpen) overlays += renderNotifDaySheet();
  if(state.pageShare) overlays += renderPageShareSheet();
  if(state.donateModal) overlays += renderDonateModal();
  if(state.deleteAccountModal) overlays += renderDeleteAccountModal();
  if(state.languageModal) overlays += renderLanguageModal();
  if(state.leaveConfirmOpen) overlays += renderLeaveConfirmModal();
  if(state.roomPhotoModal) overlays += renderRoomPhotoModal();
  if(state.memberProfileUid) overlays += renderMemberProfileSheet();

  app.innerHTML = html + overlays + renderLoadingOverlay() + `<div class="toast" id="toast"></div>`;

  if(state.screen==='daily' && state.activeTab==='bible' && state.highlightVerse){
    requestAnimationFrame(()=>{
      const el = document.getElementById('verse-'+state.highlightVerse);
      if(el){
        el.scrollIntoView({block:'center', behavior:'smooth'});
        el.classList.add('highlight');
      }
    });
  }
  if(state.screen==='group-room'){
    const cs = document.getElementById('chat-scroll');
    if(cs) cs.scrollTop = cs.scrollHeight;
  }
  if((state.screen==='group-room' || state.screen==='group-manage') && state.activeGroupId){
    ensureGroupDocSub(state.activeGroupId);
  } else if(state.screen!=='group-room' && state.screen!=='group-manage'){
    unsubscribeGroupDoc();
  }
  if(state.screen==='group-room' && state.activeGroupId){
    ensureMessagesSub(state.activeGroupId);
  } else {
    unsubscribeMessagesFeed();
  }
  if(state.screen!=='group-manage'){
    unsubscribeGroupMembersLive();
  }
  if(state.screen==='group-manage' && state.groupNameEditOpen){
    requestAnimationFrame(()=>{
      const inp = document.getElementById('room-name-input');
      if(inp) inp.focus();
    });
  }
}

/* keep the "오늘" marker on the calendar accurate in real time */
setInterval(()=>{ if(state.screen==='chapters') render(); }, 30000);

/* ---------------- loading screen (Firebase auth check) ---------------- */
function renderLoading(){
  return `
    <div class="screen-center loading-screen">
      <div class="loading-spinner"></div>
    </div>
  `;
}

/* ---------------- main screen ---------------- */
function renderMain(){
  const streak = computeStreak();
  const BOOK_ROW_COLORS = ['#FFFFFF'];
  const rows = BOOKS.map((b,i)=>{
    const m = b.m;
    const locked = !state.purchased.includes(m);
    const bg = locked ? '' : `style="background:${BOOK_ROW_COLORS[i%BOOK_ROW_COLORS.length]}"`;
    return `
    <button class="book-row ${locked?'locked':'colored'}" ${bg} data-action="${locked?'open-purchase':'open-chapters'}" data-month="${m}">
      <span class="book-row-name">${state.lang==='ko' ? `${b.ko} <span class="book-row-en">${b.en}</span>` : bookDisplayName(b)}</span>
      ${locked ? ICON.lock : ICON.chevRight}
    </button>`;
  }).join('');

  return `
    <div class="topbar">
      <div class="left-group">
        <button class="icon-btn" data-action="open-settings">${ICON.gear}</button>
        <button class="icon-btn icon-btn-accent" data-action="go-today" title="${T('todayNavTitle')}">${ICON.book}</button>
        <div class="streak-badge">${ICON.flame}<span class="streak-num">${streak}${T('dayUnit')}</span></div>
      </div>
      <div class="right-group">
        <button class="icon-btn" data-action="go-groups" title="${T('groupsNavTitle')}">${ICON.groups}</button>
        <button class="icon-btn ${state.loggedIn?'active':''}" data-action="go-login">${state.loggedIn && state.user && state.user.photoUrl ? `<img src="${escapeHtml(state.user.photoUrl)}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;object-position:center;display:block;">` : (state.loggedIn?ICON.personCheck:ICON.person)}</button>
      </div>
    </div>
    <div class="year-block">
      <div class="eyebrow">${T('yearTag')}</div>
      <h1>2026</h1>
      <div class="year-sub">${T('yearSub')}</div>
    </div>
    <div class="books-list">${rows}</div>
  `;
}

/* ---------------- login screen ---------------- */
function renderLogin(){
  if(state.loggedIn && state.user){
    // 카카오 등 일부 로그인은 동의 항목에 따라 닉네임이 비어올 수 있으므로,
    // 값이 없을 때는 uid까지 순서대로 대체해 화면이 완전히 빈칸으로 보이지 않게 합니다.
    const nickname = escapeHtml(state.user.nickname || state.user.name || state.user.uid || '');
    const email = escapeHtml(state.user.email || '');
    const isKakaoUser = state.user.provider === 'kakao';
    const photoUrl = state.user.photoUrl ? escapeHtml(state.user.photoUrl) : '';
    const avatar = photoUrl
      ? `<img src="${photoUrl}" alt="" style="width:64px;height:64px;border-radius:50%;object-fit:cover;object-position:center;display:block;">`
      : `<div style="width:64px;height:64px;border-radius:50%;background:var(--paper);box-shadow:var(--shadow-sm);display:flex;align-items:center;justify-content:center;color:var(--ink-soft);">${ICON.personCheck}</div>`;
    return `
      <button class="back-fab" data-action="go-main">${ICON.back}</button>
      <div class="screen-center">
        <div class="login-mark">
          <div style="display:flex;justify-content:center;margin-bottom:10px;">
            <button class="avatar-btn" data-action="pick-avatar" title="${T('avatarModalTitle')}">
              ${avatar}
              <span class="avatar-edit-badge">${ICON.camera}</span>
            </button>
          </div>
          <div class="eyebrow">${T('loginWelcome')}</div>
          <h2>${nickname}</h2>
        </div>
        <div class="field">
          <label>${T('nicknameLabel')}</label>
          <div class="profile-nickname-row">
            <div style="padding:13px 14px;border-radius:12px;border:1px solid var(--line);background:var(--paper);font-size:calc(14px * var(--fs-scale));color:var(--ink);">${nickname}</div>
            <button class="nickname-edit-btn" data-action="open-nickname-edit" title="${T('nicknameModalTitle')}">${ICON.pencil}</button>
          </div>
        </div>
        ${isKakaoUser ? '' : `
        <div class="field">
          <label>${T('emailLabel')}</label>
          <div style="padding:13px 14px;border-radius:12px;border:1px solid var(--line);background:var(--paper);font-size:calc(14px * var(--fs-scale));color:var(--ink-soft);">${email}</div>
        </div>`}
        <button class="btn btn-primary" data-action="do-logout">${T('logout')}</button>
      </div>
    `;
  }
  return `
    <div class="screen-center">
      <div class="login-mark">
        <div class="eyebrow">${T('loginWelcome')}</div>
        <h2>${T('loginTitle')}</h2>
      </div>
      <div class="field">
        <label>${T('emailLabel')}</label>
        <input type="text" id="login-email" placeholder="${T('emailPh')}">
      </div>
      <div class="field">
        <label>${T('pwLabel')}</label>
        <input type="password" id="login-password" placeholder="${T('pwPh')}">
      </div>
      <button class="btn btn-primary" data-action="do-email-login">${T('loginBtn')}</button>
      <div class="divider">${T('or')}</div>
      <button class="btn btn-google" data-action="do-google-login">
        <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6 29.5 4 24 4c-7.4 0-13.8 4.1-17.1 10.1z"/><path fill="#4CAF50" d="M24 44c5.4 0 10.3-1.9 14-5.2l-6.5-5.5C29.4 35 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.9 39.7 16.4 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.5 5.5C39.9 36.9 44 31 44 24c0-1.2-.1-2.3-.4-3.5z"/></svg>
        ${T('googleLogin')}
      </button>
      <button class="btn btn-kakao" data-action="do-kakao-login">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.5C6.75 3.5 2.5 6.9 2.5 11.1c0 2.68 1.77 5.03 4.44 6.38-.2.72-.71 2.58-.82 2.98-.13.5.18.49.38.36.16-.1 2.5-1.7 3.52-2.4.63.09 1.28.14 1.98.14 5.25 0 9.5-3.4 9.5-7.6S17.25 3.5 12 3.5z"/></svg>
        ${T('kakaoLogin')}
      </button>
      <button class="btn btn-ghost" data-action="go-signup">${T('signup')}</button>
    </div>
  `;
}

/* ---------------- signup screen ---------------- */
function renderSignupScreen(){
  return `
    <button type="button" class="back-fab" data-action="go-login">${ICON.back}</button>
    <div class="screen-center">
      <div class="login-mark">
        <div class="eyebrow">${T('loginTitle')}</div>
        <h2>${T('signupTitle')}</h2>
      </div>
      <p class="terms-sub" style="text-align:center;margin-bottom:18px;font-size:calc(12.5px * var(--fs-scale));color:var(--ink-soft);">${T('signupSub')}</p>

      <div class="field">
        <label>${T('nameLabel')}</label>
        <input type="text" id="signup-name" data-signup-field="name" placeholder="${T('namePh')}" value="${escapeHtml(state.signupForm.name)}">
      </div>
      <div class="field">
        <label>${T('emailLabel')}</label>
        <input type="email" id="signup-email" data-signup-field="email" placeholder="${T('emailPh')}" value="${escapeHtml(state.signupForm.email)}">
      </div>
      <div class="field">
        <label>${T('birthLabel')}</label>
        <input type="date" id="signup-birth" data-signup-field="birth" placeholder="${T('birthPh')}" value="${escapeHtml(state.signupForm.birth)}">
      </div>
      <div class="field">
        <label>${T('usernameLabel')}</label>
        <input type="text" id="signup-username" data-signup-field="username" placeholder="${T('usernamePh')}" value="${escapeHtml(state.signupForm.username)}">
      </div>
      <div class="field">
        <label>${T('pwLabel')}</label>
        <input type="password" id="signup-password" data-signup-field="password" placeholder="${T('pwPh')}" value="${escapeHtml(state.signupForm.password)}">
      </div>
      <div class="field">
        <label>${T('nicknameLabel')}</label>
        <input type="text" id="signup-nickname" data-signup-field="nickname" placeholder="${T('nicknamePh')}" value="${escapeHtml(state.signupForm.nickname)}">
      </div>

      <div class="consent-box">
        <div class="consent-row">
          <button type="button" class="consent-check ${state.signupTermsConsent?'checked':''}" data-action="toggle-signup-terms-consent">${ICON.check}</button>
          <div class="consent-label" data-action="toggle-signup-terms-consent">${T('signupTermsLabel')}</div>
          <button type="button" class="consent-view-btn" data-action="toggle-signup-terms-consent-detail">${state.signupTermsConsentOpen?T('hideDetail'):T('viewDetail')}</button>
        </div>
        ${state.signupTermsConsentOpen ? `<div class="consent-detail">${T('signupTermsBody')}</div>` : ''}
      </div>

      <div class="consent-box" style="margin-top:8px;">
        <div class="consent-row">
          <button type="button" class="consent-check ${state.signupConsent?'checked':''}" data-action="toggle-signup-consent">${ICON.check}</button>
          <div class="consent-label" data-action="toggle-signup-consent">${T('signupConsentLabel')}</div>
          <button type="button" class="consent-view-btn" data-action="toggle-signup-consent-detail">${state.signupConsentOpen?T('hideDetail'):T('viewDetail')}</button>
        </div>
        ${state.signupConsentOpen ? `<div class="consent-detail">${T('signupConsentBody')}</div>` : ''}
        <div class="consent-policy-link">
          <a href="/privacy.html?lang=${state.lang === 'ko' ? 'ko' : 'en'}" target="_blank" rel="noopener noreferrer">${T('privacyPolicyFull')}</a>
        </div>
      </div>

      <button type="button" class="btn btn-primary" style="margin-top:16px;" data-action="confirm-signup">${T('submitSignup')}</button>
    </div>
  `;
}

/* ---------------- profile: nickname edit modal ---------------- */
function renderNicknameModal(){
  if(!state.nicknameModal || !state.user) return '';
  const current = escapeHtml(state.user.nickname || state.user.name || '');
  return `
  <div class="overlay center" data-action="close-nickname-modal">
    <div class="modal-card" data-action="noop">
      <div class="modal-title">${T('nicknameModalTitle')}</div>
      <div class="field">
        <label>${T('nicknameLabel')}</label>
        <input type="text" id="nickname-input" value="${current}" placeholder="${T('nicknamePh')}" maxlength="20">
      </div>
      <div class="modal-actions">
        <button class="btn btn-cancel" data-action="close-nickname-modal">${T('cancel')}</button>
        <button class="btn btn-primary" data-action="save-nickname">${T('saveBtn')}</button>
      </div>
    </div>
  </div>`;
}

/* ---------------- profile: avatar preview modal ---------------- */
function renderAvatarModal(){
  const m = state.avatarModal;
  if(!m) return '';
  const saving = !!m.saving;
  return `
  <div class="overlay center" data-action="close-avatar-modal">
    <div class="modal-card" data-action="noop">
      <div class="modal-title">${T('avatarModalTitle')}</div>
      <p class="modal-sub">${T('avatarModalSub')}</p>
      <div style="display:flex;justify-content:center;margin-bottom:18px;">
        <img src="${m.dataUrl}" alt="" style="width:120px;height:120px;border-radius:50%;object-fit:cover;box-shadow:var(--shadow-sm);">
      </div>
      <div class="modal-actions">
        <button class="btn btn-cancel" data-action="close-avatar-modal" ${saving?'disabled':''}>${T('cancel')}</button>
        <button class="btn btn-primary" data-action="confirm-avatar" ${saving?'disabled':''}>${T('saveBtn')}</button>
      </div>
    </div>
  </div>`;
}

/* ---------------- purchase modal ---------------- */
function renderPurchaseModal(){
  const m = state.purchaseModal;
  const plan = state.selectedPlan;
  const name = bookName(m);
  return `
  <div class="overlay center" data-action="close-purchase">
    <div class="modal-card" data-action="noop">
      <div class="modal-title">${T('purchaseTitle', name)}</div>
      <p class="modal-sub">${T('purchaseSub')}</p>
      <div class="plan-options">
        <button class="plan-option ${plan==='year'?'selected':''}" data-action="select-plan" data-plan="year">
          <span class="radio"></span>
          <span class="plan-info">
            <span class="plan-name">${T('yearPlanName')}<span class="plan-badge">${T('yearPlanBadge')}</span></span>
            <span class="plan-desc">${T('yearPlanDesc')}</span>
          </span>
          <span class="plan-price">${T('yearPlanPrice')}</span>
        </button>
        <button class="plan-option ${plan==='month'?'selected':''}" data-action="select-plan" data-plan="month">
          <span class="radio"></span>
          <span class="plan-info">
            <span class="plan-name">${T('monthPlanName')}</span>
            <span class="plan-desc">${T('monthPlanDesc', name)}</span>
          </span>
          <span class="plan-price">${T('monthPlanPrice')}</span>
        </button>
      </div>
      <div class="modal-actions">
        <button class="btn btn-cancel" data-action="close-purchase">${T('cancel')}</button>
        <button class="btn btn-primary" data-action="confirm-purchase" data-month="${m}">${T('buyBtn')}</button>
      </div>
    </div>
  </div>`;
}

/* ---------------- settings screen (full page) ---------- */
function renderSettingsScreen(){
  return `
    <div class="settings-header">
      <button class="icon-btn" data-action="go-main">${ICON.back}</button>
      <h2>${T('settingsTitle')}</h2>
    </div>
    <div class="settings-body">
      <div class="settings-group">
        <div class="settings-list">
          <div class="setting-item" data-action="open-language">
            <span>${T('languageMenu')}</span>
            <span class="setting-item-right">
              <span class="setting-item-value">${T(LANG_LABEL_KEYS[state.lang])}</span>
              <span class="arrow">${ICON.chevRight}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="settings-group">
        <div class="g-title">${T('fontSizeLabel')}</div>
        <div class="pill-toggle">
          <button class="${state.fontSize==='small'?'selected':''}" data-action="set-fontsize" data-size="small">${T('fontSmall')}</button>
          <button class="${state.fontSize==='default'?'selected':''}" data-action="set-fontsize" data-size="default">${T('fontDefault')}</button>
          <button class="${state.fontSize==='large'?'selected':''}" data-action="set-fontsize" data-size="large">${T('fontLarge')}</button>
        </div>
      </div>

      <div class="settings-group">
        <div class="g-title">${T('themeLabel')}</div>
        <div class="pill-toggle">
          <button class="${state.theme==='light'?'selected':''}" data-action="set-theme" data-theme="light">${T('themeLight')}</button>
          <button class="${state.theme==='dark'?'selected':''}" data-action="set-theme" data-theme="dark">${T('themeDark')}</button>
        </div>
      </div>

      <div class="settings-group">
        <div class="settings-list">
          <div class="setting-item" data-action="go-notifications">${T('notif')} <span class="arrow">${ICON.chevRight}</span></div>
          <div class="setting-item" data-action="go-guide">${T('guideMenu')} <span class="arrow">${ICON.chevRight}</span></div>
          <div class="setting-item" data-action="go-contact">${T('contact')} <span class="arrow">${ICON.chevRight}</span></div>
          <div class="setting-item" data-action="open-donate">${T('donate')} 💖 <span class="arrow">${ICON.chevRight}</span></div>
          <div class="setting-item" data-action="open-privacy-policy">${T('privacyPolicy')} <span class="arrow">${ICON.chevRight}</span></div>
        </div>
      </div>

      ${state.loggedIn && state.user ? `
      <div class="settings-group">
        <div class="settings-list">
          <div class="setting-item danger" data-action="open-delete-account">${T('deleteAccount')} <span class="arrow">${ICON.chevRight}</span></div>
        </div>
      </div>` : ''}
    </div>
  `;
}

/* ---------------- 회원 탈퇴 확인 모달 ---------------- */
function renderDeleteAccountModal(){
  const m = state.deleteAccountModal;
  if(!m || !state.user) return '';
  // 이메일/비밀번호 계정만 비밀번호 입력으로 재인증합니다. 구글/카카오 계정은
  // "탈퇴하기"를 누르면 firebaseBridge.js가 알아서 팝업으로 재인증을 띄웁니다.
  const isPasswordProvider = state.user.provider === 'password';
  return `
  <div class="overlay center" data-action="close-delete-account">
    <div class="modal-card" data-action="noop">
      <div class="modal-title">${T('deleteAccountConfirmTitle')}</div>
      <p class="modal-sub">${T('deleteAccountConfirmBody')}</p>
      ${isPasswordProvider ? `
      <div class="field" style="margin-bottom:16px;">
        <label>${T('deleteAccountPasswordLabel')}</label>
        <input type="password" id="delete-account-password" data-delete-account-field="password" placeholder="${T('deleteAccountPasswordPh')}" value="${escapeHtml(m.password)}" ${m.busy?'disabled':''}>
      </div>` : ''}
      <div class="modal-actions">
        <button type="button" class="btn btn-cancel" data-action="close-delete-account" ${m.busy?'disabled':''}>${T('cancel')}</button>
        <button type="button" class="btn btn-danger" data-action="confirm-delete-account" ${m.busy?'disabled':''}>${m.busy?T('deleteAccountInProgress'):T('deleteAccountConfirmBtn')}</button>
      </div>
    </div>
  </div>`;
}

/* ---------------- language picker modal ---------------- */
function renderLanguageModal(){
  if(!state.languageModal) return '';
  const items = LANG_CODES.map(code=>{
    const selected = state.lang===code;
    return `
    <button class="language-item ${selected?'selected':''}" data-action="set-lang" data-lang="${code}">
      <span class="lang-name">${T(LANG_LABEL_KEYS[code])}</span>
      ${selected ? `<span class="lang-check">${ICON.check}</span>` : ''}
    </button>`;
  }).join('');
  return `
  <div class="overlay center" data-action="close-language">
    <div class="modal-card language-modal-card" data-action="noop">
      <div class="language-modal-header">
        <div class="modal-title">${T('languageModalTitle')}</div>
        <button class="icon-btn" data-action="close-language">${ICON.close}</button>
      </div>
      <div class="language-list">${items}</div>
    </div>
  </div>`;
}

/* ---------------- donation modal ---------------- */
function renderDonateModal(){
  if(!state.donateModal) return '';
  return `
  <div class="overlay center" data-action="close-donate">
    <div class="modal-card donate-card" data-action="noop">
      <div class="donate-icon">💖</div>
      <div class="modal-title">${T('donateModalTitle')}</div>
      <p class="modal-sub">${T('donateDesc')}</p>
      <div class="donate-account-card">
        <div class="donate-row"><span class="donate-label">${T('donateBankLabel')}</span><span class="donate-value">${T('donateBankName')}</span></div>
        <div class="donate-row"><span class="donate-label">${T('donateHolderLabel')}</span><span class="donate-value">${T('donateHolderName')}</span></div>
        <div class="donate-row"><span class="donate-label">${T('donateAccountLabel')}</span><span class="donate-value">${T('donateAccountNumber')}</span></div>
      </div>
      <button class="btn donate-copy-btn ${state.donateCopied?'copied':''}" data-action="copy-donate-account">${state.donateCopied ? T('copyAccountDone') : T('copyAccountBtn')}</button>
      <button class="btn btn-cancel" data-action="close-donate" style="margin-top:10px;">${T('cancel')}</button>
    </div>
  </div>`;
}

/* ---------------- contact screen ---------------- */
function renderContactScreen(){
  const email = 'biblejournalingjoa@gmail.com';
  return `
    <div class="settings-header">
      <button class="icon-btn" data-action="open-settings">${ICON.back}</button>
      <h2>${T('contactTitle')}</h2>
    </div>
    <div class="settings-body">
      <div class="contact-card">
        <div class="contact-icon">${ICON.chat}</div>
        <p class="contact-body">${T('contactBody')}</p>
        <button class="btn btn-primary contact-mail-btn" data-action="do-email-contact">
          ${ICON.chat} ${T('contactEmailBtn')}
        </button>
        <p class="contact-note">${T('contactEmailNote')}</p>
        <div class="contact-email-chip">${email}</div>
      </div>
    </div>
  `;
}

/* ---------------- usage guide screen ----------------
   "저널링 노트 사용하는 방법" 가이드.
   실제 기록 화면(renderThoughtTab / renderBibleTab)에서 쓰는 것과 동일한 마크업/클래스
   (.section-block, .s-label, .ask-box, .chapter-card, .thanks-row ...)로 각 입력 영역을
   비대화형(readonly) 미리보기로 보여주고, 번호 배지·강조 링·말풍선으로 "여기에 기록하세요"를
   설명한다. 새 입력 UI를 만들지 않으며 기록 데이터/Firebase에 접근하지 않는다. */
function guideField(labelKey, { tag='textarea', phKey, num }={}){
  const ph = phKey ? T(phKey) : '';
  const field = tag==='input'
    ? `<input type="text" placeholder="${ph}" tabindex="-1" readonly>`
    : `<textarea placeholder="${ph}" tabindex="-1" readonly></textarea>`;
  return `
    <div class="section-block gs-hl"${num ? ` data-gnum="${num}"` : ''}>
      <div class="s-label"><span class="dot"></span>${T(labelKey)}</div>
      ${field}
    </div>`;
}
function guideCallouts(rows){
  return `<ol class="guide-callouts">${rows.map(([n,label,desc])=>`
    <li><span class="gc-num">${n}</span><div class="gc-body"><b>${label}</b><p>${desc}</p></div></li>`).join('')}</ol>`;
}
function guideShot1(){
  return `
  <div class="guide-shot">
    <div class="chapter-card gs-hl">
      <div class="chapter-card-head">
        <div>
          <div class="cap">${T('todayReading')}</div>
          <h3>${T('guideS1Ref')}</h3>
        </div>
      </div>
      <div class="verse-list">
        <div class="verse"><span class="vnum">1</span><span>${T('guideS1Verse1')}</span></div>
        <div class="verse"><span class="vnum">10</span><span>${T('guideS1Verse2')}</span></div>
      </div>
    </div>
  </div>`;
}
function guideShot3(){
  const q = T('guideAsk');
  return `
  <div class="guide-shot">
    <div class="section-block gs-hl" data-gnum="1">
      <div class="s-label"><span class="dot"></span>${T('askLabel')}</div>
      <div class="ask-box">
        <div class="ask-row">
          <div class="ask-q">${q[0]}</div>
          <button class="ask-arrow open" tabindex="-1">${ICON.chevDown}</button>
        </div>
        <div class="ask-list">
          <div class="ask-item selected">${q[0]}</div>
          <div class="ask-item">${q[1]}</div>
          <div class="ask-item">${q[2]}</div>
        </div>
      </div>
    </div>
  </div>`;
}
function guideQuestionList(){
  const q = T('guideAsk');
  return `
  <details class="guide-q-all">
    <summary><span>${T('guideS3ListTitle')}</span><span class="gq-count">12</span></summary>
    <ol class="guide-q-cards">
      ${q.map((text,i)=>`<li><span class="gq-n">${i+1}</span><span>${text}</span></li>`).join('')}
    </ol>
  </details>`;
}
function guideShot6(){
  return `
  <div class="guide-shot">
    ${guideField('prayerLabel', { phKey:'prayerPh', num:1 })}
    <div class="section-block gs-hl" data-gnum="2">
      <div class="s-label"><span class="dot"></span>${T('thanksLabel')}</div>
      <div class="thanks-row"><div class="num">1</div><input type="text" style="flex:1" placeholder="${T('thanksPh',1)}" tabindex="-1" readonly></div>
      <div class="thanks-row"><div class="num">2</div><input type="text" style="flex:1" placeholder="${T('thanksPh',2)}" tabindex="-1" readonly></div>
    </div>
  </div>`;
}
function guideStep(n, { title, en, desc, shot, callouts, extra }){
  return `
    <section class="guide-step" id="guide-step-${n}">
      <div class="guide-step-head">
        <span class="guide-step-num">${n}</span>
        <div class="guide-step-heading">
          <h3 class="guide-step-title">${title}</h3>
          ${en ? `<div class="guide-step-en">${en}</div>` : ''}
        </div>
      </div>
      ${desc ? `<p class="guide-step-desc">${desc}</p>` : ''}
      <div class="guide-shot-label">${T('guideShotLabel')}</div>
      ${shot}
      ${callouts || ''}
      ${extra || ''}
    </section>`;
}
function guideVerseIntro(){
  const title = T('guideVersesTitle');
  if(!title) return '';
  const verses = [1,2,3].map(i=>`
    <p class="guide-verse-text">${T('guideVerse'+i)}<span class="guide-verse-ref">${T('guideVerse'+i+'Ref')}</span></p>
  `).join('');
  return `
    <div class="guide-verses-card">
      <h3 class="guide-section-title">${title}</h3>
      ${verses}
    </div>
  `;
}

function guideNumberedList(items, noteIndex, note){
  return `<ol class="guide-num-list">${(items||[]).map((text,i)=>`
    <li>
      <span class="gnl-num">${i+1}</span>
      <div class="gnl-body">
        <p>${text}</p>
        ${i===noteIndex && note ? `<p class="guide-note">${note}</p>` : ''}
      </div>
    </li>`).join('')}</ol>`;
}

function guideReadingLists(){
  const rulesTitle = T('guideRulesTitle');
  if(!rulesTitle) return '';
  return `
    <div class="guide-list-section">
      <h3 class="guide-section-title">${rulesTitle}</h3>
      ${guideNumberedList(T('guideRules'))}
      <p class="guide-note">${T('guideRulesNote')}</p>
    </div>
    <div class="guide-list-section">
      <h3 class="guide-section-title">${T('guideBasicsTitle')}</h3>
      ${guideNumberedList(T('guideBasics'), 2, T('guideBasicsNote'))}
    </div>
    <div class="guide-list-section">
      <h3 class="guide-section-title">${T('guideMuellerTitle')}</h3>
      ${guideNumberedList(T('guideMueller'))}
    </div>
    <blockquote class="guide-quote">
      <p>${T('guideWesleyQuote')}</p>
      <cite>${T('guideWesleyAttr')}</cite>
    </blockquote>
  `;
}

function renderGuideScreen(){
  const flow = T('guideFlow');
  const chips = flow.map((label,i)=>`
    <button class="guide-flow-chip" data-action="guide-jump" data-step="${i+1}">
      <span class="gfc-num">${i+1}</span><span class="gfc-label">${label}</span>
    </button>`).join(`<span class="guide-flow-arrow">${ICON.chevDown}</span>`);

  return `
    <div class="settings-header">
      <button class="icon-btn" data-action="open-settings">${ICON.back}</button>
      <h2>${T('guideTitle')}</h2>
    </div>
    <div class="settings-body guide-body">
      ${guideVerseIntro()}
      ${guideReadingLists()}

      <div class="guide-intro">
        <h2 class="guide-hero-title">${T('guideHowToTitle')}</h2>
        <p class="guide-lead">${T('guideHowToLead')}</p>
      </div>

      <div class="guide-flow">${chips}</div>
      <p class="guide-flow-hint">${T('guideTapHint')}</p>

      ${guideStep(1, {
        title:T('guideS1Title'), en:T('guideS1En'), desc:T('guideS1Desc'),
        shot:guideShot1(),
        callouts:`<p class="guide-tip">${T('guideS1Callout')}</p>`,
      })}

      ${guideStep(2, {
        title:T('guideS2Title'), en:T('guideS2En'), desc:T('guideS2Desc'),
        shot:`<div class="guide-shot">
          ${guideField('verseLabel', { tag:'input', phKey:'versePh', num:1 })}
          ${guideField('passageLabel', { phKey:'passagePh', num:2 })}
          ${guideField('godIsLabel', { phKey:'godIsPh', num:3 })}
        </div>`,
        callouts:guideCallouts([
          [1, T('verseLabel'), T('guideS2VerseDesc')],
          [2, T('passageLabel'), T('guideS2PassageDesc')],
          [3, T('godIsLabel'), T('guideS2GodDesc')],
        ]),
      })}

      ${guideStep(3, {
        title:T('guideS3Title'), en:T('guideS3En'), desc:T('guideS3Desc'),
        shot:guideShot3(),
        callouts:`<p class="guide-tip">${T('guideS3Callout')}</p>`,
        extra:guideQuestionList(),
      })}

      ${guideStep(4, {
        title:T('guideS4Title'), en:T('guideS4En'), desc:T('guideS4Desc'),
        shot:`<div class="guide-shot">${guideField('heardLabel', { phKey:'heardPh', num:1 })}</div>`,
        callouts:`<p class="guide-tip">${T('guideS4Note')}</p>`,
      })}

      ${guideStep(5, {
        title:T('guideS5Title'), desc:T('guideS5Desc'),
        shot:`<div class="guide-shot">${guideField('appLabel', { phKey:'appPh', num:1 })}</div>`,
      })}

      ${guideStep(6, {
        title:T('guideS6Title'), desc:T('guideS6Desc'),
        shot:guideShot6(),
        callouts:guideCallouts([
          [1, T('prayerLabel'), T('guideS6PrayerDesc')],
          [2, T('thanksLabel'), T('guideS6ThanksDesc')],
        ]),
      })}
    </div>
  `;
}

/* ---------------- notification settings screen ---------------- */
function renderNotificationsScreen(){
  const dayKeys = { mon:'dayMon', tue:'dayTue', wed:'dayWed', thu:'dayThu', fri:'dayFri', sat:'daySat', sun:'daySun' };
  const rows = NOTIF_DAYS.map(d=>{
    const time = notifSettings[d];
    return `
    <div class="notif-day-row" data-action="open-notif-day" data-day="${d}">
      <div>
        <div class="day-name">${T(dayKeys[d])}</div>
        <div class="day-status ${time?'on':''}">${time ? time : T('notifOff')}</div>
      </div>
      <div class="toggle-switch ${time?'on':''}"></div>
    </div>`;
  }).join('');

  return `
    <div class="settings-header">
      <button class="icon-btn" data-action="open-settings">${ICON.back}</button>
      <h2>${T('notifTitle')}</h2>
    </div>
    <div class="settings-body">
      <p class="terms-sub" style="margin-bottom:14px;">${T('notifSub')}</p>
      <div class="settings-list">${rows}</div>
    </div>
  `;
}

/* ---------------- per-day time-set sheet ---------------- */
function renderNotifDaySheet(){
  const d = state.notifDayOpen;
  const dayKeys = { mon:'dayMon', tue:'dayTue', wed:'dayWed', thu:'dayThu', fri:'dayFri', sat:'daySat', sun:'daySun' };
  const time = notifSettings[d] || '07:00';
  const isOn = !!notifSettings[d];
  return `
  <div class="overlay" data-action="close-notif-day">
    <div class="sheet" data-action="noop">
      <div class="sheet-handle"></div>
      <div class="modal-title">${T(dayKeys[d])}</div>
      <div class="notif-sheet-time">
        <label>${T('notifTimeLabel')}</label>
        <input type="time" id="notif-time-input" value="${time}">
      </div>
      <div class="notif-sheet-actions">
        ${isOn ? `<button class="btn btn-cancel" data-action="turn-off-notif-day" data-day="${d}">${T('notifDelete')}</button>` : ''}
        <button class="btn btn-primary" data-action="save-notif-day" data-day="${d}">${T('notifSave')}</button>
      </div>
    </div>
  </div>`;
}

/* ---------------- groups list ---------------- */
function renderGroupsList(){
  const cards = groups.map(g=>{
    const last = g.messages[g.messages.length-1];
    const lastText = last ? (last.type==='image' ? `📷 ${last.jTitle}` : last.type==='journal' ? `📖 ${last.jTitle}` : last.text) : T('noConversationYet');
    return `
    <button class="group-card" data-action="open-group" data-id="${g.id}">
      ${groupAvatarHtml(g, 'group-avatar')}
      <div class="group-info">
        <div class="g-name">${escapeHtml(g.name)}</div>
        <div class="g-sub">${lastText}</div>
      </div>
      <div class="group-meta">${T('conversationCount', g.messages.length)}</div>
    </button>`;
  }).join('');

  return `
    <div class="groups-header">
      <button class="icon-btn" data-action="go-main">${ICON.back}</button>
      <div class="titles">
        <div class="cap">Together</div>
        <h2>${T('groupsNavTitle')}</h2>
      </div>
    </div>
    <div class="groups-body">
      <button class="new-group-btn" data-action="open-create-group">${ICON.plus} ${T('newGroupBtn')}</button>
      ${groups.length ? cards : `
        <div class="empty-groups">
          <div class="emoji">👥</div>
          <p>${T('noGroupsBody')}</p>
        </div>
      `}
    </div>
  `;
}

/* ---------------- chat room management (rename / photo / leave) ---------------- */
function renderGroupManage(){
  const g = getGroup(state.activeGroupId);
  if(!g){
    return `<div class="groups-header"><button class="icon-btn" data-action="go-groups">${ICON.back}</button></div>`;
  }
  const owner = isRoomOwner();
  const ownerUid = state.groupManageDoc ? state.groupManageDoc.ownerUid : g.ownerUid;
  const members = state.groupInfoMembers;
  const count = members ? members.length : (g.memberCount || 1);

  let membersHtml;
  if(members === null){
    membersHtml = `<div class="member-list-status">${T('loadingLabel')}</div>`;
  } else if(members.length === 0){
    membersHtml = state.groupInfoError
      ? `<div class="member-list-status error">${T('toastMembersLoadFailed')}</div>`
      : '';
  } else {
    // each participant is a button: tapping their photo/nickname opens their profile
    // card (photo + nickname + streak only - see renderMemberProfileSheet).
    membersHtml = members.map(m=>`
      <button type="button" class="member-row member-row-btn" data-action="open-member-profile" data-uid="${escapeHtml(m.uid)}">
        <div class="member-avatar">${m.photoUrl ? `<img src="${escapeHtml(m.photoUrl)}" alt="">` : ICON.person}</div>
        <div class="member-name">${escapeHtml(m.name)}
          ${ownerUid && m.uid===ownerUid ? ` <span class="member-you">${T('ownerTag')}</span>` : ''}
          ${state.user && state.user.uid===m.uid ? ` <span class="member-you">${T('youTag')}</span>` : ''}
        </div>
      </button>
    `).join('');
  }

  const avatarInner = groupAvatarHtml(g, 'group-avatar-xl');
  const avatarBlock = owner
    ? `<button class="avatar-btn" data-action="pick-room-photo" title="${T('changeRoomPhotoTitle')}">${avatarInner}<span class="avatar-edit-badge">${ICON.camera}</span></button>`
    : avatarInner;

  const nameBlock = (owner && state.groupNameEditOpen)
    ? `
      <div class="field room-name-field">
        <label>${T('roomNameLabel')}</label>
        <input type="text" id="room-name-input" value="${escapeHtml(g.name)}" maxlength="30" ${state.groupNameSaving?'disabled':''}>
        <div class="modal-actions" style="margin-top:10px;">
          <button class="btn btn-cancel" data-action="close-room-name-edit" ${state.groupNameSaving?'disabled':''}>${T('cancel')}</button>
          <button class="btn btn-primary" data-action="save-room-name" ${state.groupNameSaving?'disabled':''}>${T('saveBtn')}</button>
        </div>
      </div>`
    : `
      <div class="profile-nickname-row room-name-row">
        <div class="gi-name">${escapeHtml(g.name)}</div>
        ${owner ? `<button class="nickname-edit-btn" data-action="open-room-name-edit" title="${T('renameRoomTitle')}">${ICON.pencil}</button>` : ''}
      </div>`;

  return `
    <div class="groups-header">
      <button class="icon-btn" data-action="go-group-room">${ICON.back}</button>
      <div class="titles">
        <div class="cap">Together</div>
        <h2>${T('groupManageTitle')}</h2>
      </div>
    </div>
    <div class="group-info-body">
      <div class="group-info-summary">
        <div class="room-manage-avatar-wrap">${avatarBlock}</div>
        ${nameBlock}
        <div class="gi-count">${T('groupInfoParticipants', count)}</div>
      </div>
      <div class="member-list">${membersHtml}</div>
      <div class="group-info-actions">
        <button class="btn btn-danger" data-action="open-leave-confirm">${T('leaveGroupBtn')}</button>
      </div>
    </div>
  `;
}
function renderRoomPhotoModal(){
  const m = state.roomPhotoModal;
  if(!m) return '';
  const saving = !!m.saving;
  return `
  <div class="overlay center" data-action="${saving?'noop':'close-room-photo-modal'}">
    <div class="modal-card" data-action="noop">
      <div class="modal-title">${T('changeRoomPhotoTitle')}</div>
      <p class="modal-sub">${T('avatarModalSub')}</p>
      <div style="display:flex;justify-content:center;margin-bottom:18px;">
        <img src="${m.previewUrl}" alt="" style="width:120px;height:120px;border-radius:50%;object-fit:cover;object-position:center;box-shadow:var(--shadow-sm);">
      </div>
      <div class="modal-actions">
        <button class="btn btn-cancel" data-action="close-room-photo-modal" ${saving?'disabled':''}>${T('cancel')}</button>
        <button class="btn btn-primary" data-action="confirm-room-photo" ${saving?'disabled':''}>${T('saveBtn')}</button>
      </div>
    </div>
  </div>`;
}
/* Small bottom-sheet profile card for a fellow chat room member: photo + nickname +
   streak only (no email/uid/phone/other personal or account info). Data comes straight
   from state.groupInfoMembers, which is only ever populated for members of a group the
   current user is themselves a member of (see loadGroupMembers / firestore.rules). */
function renderMemberProfileSheet(){
  const uid = state.memberProfileUid;
  if(!uid) return '';
  const members = state.groupInfoMembers || [];
  const m = members.find(x=>x.uid===uid);
  const name = m ? m.name : T('memberFallbackName');
  const photoUrl = m ? m.photoUrl : null;
  const streak = (m && typeof m.streak === 'number') ? m.streak : 0;
  return `
  <div class="overlay center" data-action="close-member-profile">
    <div class="modal-card member-profile-card" data-action="noop">
      <div class="member-profile-avatar">${photoUrl ? `<img src="${escapeHtml(photoUrl)}" alt="">` : ICON.person}</div>
      <div class="member-profile-name">${escapeHtml(name)}</div>
      <div class="member-profile-streak">${ICON.flame}<span>${T('streakDaysSuffix', streak)}</span></div>
      <button class="btn btn-cancel" data-action="close-member-profile" style="margin-top:20px;">${T('cancel')}</button>
    </div>
  </div>`;
}

function renderLeaveConfirmModal(){
  return `
  <div class="overlay center" data-action="close-leave-confirm">
    <div class="modal-card" data-action="noop">
      <div class="modal-title">${T('leaveConfirmTitle')}</div>
      <p class="modal-sub">${T('leaveConfirmBody')}</p>
      <div class="modal-actions">
        <button class="btn btn-cancel" data-action="close-leave-confirm" ${state.leaveBusy?'disabled':''}>${T('cancel')}</button>
        <button class="btn btn-danger" data-action="confirm-leave-group" ${state.leaveBusy?'disabled':''}>${T('leaveConfirmBtn')}</button>
      </div>
    </div>
  </div>`;
}

/* ---------------- group chat room ---------------- */
function renderGroupRoom(){
  const g = getGroup(state.activeGroupId);
  if(!g){
    return `<div class="groups-header"><button class="icon-btn" data-action="go-groups">${ICON.back}</button></div>`;
  }
  const bubbles = g.messages.map(m=>{
    const badge = (m.isMe && m.unread>0) ? `<span class="msg-unread">${m.unread}</span>` : '';
    if(m.type==='system'){
      return `<div class="msg-row system"><div class="msg-bubble">${m.textKey ? T(m.textKey) : m.text}</div></div>`;
    }
    if(m.type==='journal'){
      return `
      <div class="msg-row ${m.isMe?'me':'them'}">
        ${!m.isMe ? `<div class="msg-sender">${escapeHtml(m.from)}</div>` : ''}
        <div class="msg-line">
          ${badge}
          <div class="journal-card">
            <div class="jc-cap">${T('sharedMeditationCap')} · ${m.dateLabel}</div>
            <div class="jc-title">${m.jTitle}</div>
            <div class="jc-text">${m.jText}</div>
          </div>
        </div>
      </div>`;
    }
    if(m.type==='image'){
      return `
      <div class="msg-row ${m.isMe?'me':'them'}">
        ${!m.isMe ? `<div class="msg-sender">${escapeHtml(m.from)}</div>` : ''}
        <div class="msg-line">
          ${badge}
          <div class="snap-img-wrap">
            <img class="shared-snap-img" src="${m.imageData}" alt="${m.jTitle||''}" data-action="open-image-viewer" data-msgid="${m.id}" data-index="0">
            <div class="snap-img-cap">${m.jTitle||''}</div>
          </div>
        </div>
      </div>`;
    }
    if(m.type==='image-pair'){
      return `
      <div class="msg-row ${m.isMe?'me':'them'}">
        ${!m.isMe ? `<div class="msg-sender">${escapeHtml(m.from)}</div>` : ''}
        <div class="msg-line">
          ${badge}
          <div class="snap-img-pair-wrap">
            <div class="snap-img-pair">
              ${m.images.map((img,i)=>`
                <img class="shared-snap-img-half" src="${img.dataUrl}" alt="${img.cap||''}" data-action="open-image-viewer" data-msgid="${m.id}" data-index="${i}">
              `).join('')}
            </div>
            <div class="snap-img-cap">${m.jTitle||''}</div>
          </div>
        </div>
      </div>`;
    }
    return `
      <div class="msg-row ${m.isMe?'me':'them'}">
        ${!m.isMe ? `<div class="msg-sender">${escapeHtml(m.from)}</div>` : ''}
        <div class="msg-line">
          ${badge}
          <div class="msg-bubble">${nl2br(escapeHtml(m.text))}</div>
        </div>
      </div>`;
  }).join('');

  return `
    <div class="room-header">
      <button class="icon-btn" data-action="go-groups">${ICON.back}</button>
      ${groupAvatarHtml(g, 'r-avatar')}
      <div class="titles">
        <h2>${escapeHtml(g.name)}</h2>
        <div class="cap">${T('conversationCount', g.messages.length)}</div>
      </div>
      <button class="invite-btn" data-action="open-invite" data-id="${g.id}">${ICON.link}</button>
      <button class="icon-btn" data-action="open-group-manage" data-id="${g.id}" title="${T('groupManageTitle')}">${ICON.menu}</button>
    </div>
    <div class="chat-scroll" id="chat-scroll">${bubbles}</div>
    <div class="compose-bar">
      <button class="share-journal-btn" data-action="open-share-picker" data-id="${g.id}" title="${T('todayNavTitle')}">${ICON.book}</button>
      <input type="text" id="chat-input" placeholder="${T('chatInputPlaceholder')}" data-action-enter="send-message" data-id="${g.id}">
      <button class="send-btn" data-action="send-message" data-id="${g.id}">${ICON.send}</button>
    </div>
  `;
}

/* ---------------- create group sheet ---------------- */
function renderCreateGroupSheet(){
  return `
  <div class="overlay" data-action="close-create-group">
    <div class="sheet" data-action="noop">
      <div class="sheet-handle"></div>
      <div class="modal-title">${T('newGroupBtn')}</div>
      <p class="modal-sub">${T('createGroupSub')}</p>
      <div class="create-group-field">
        <label>${T('roomNameLabel')}</label>
        <input type="text" id="new-group-name" placeholder="${T('groupNamePlaceholder')}">
      </div>
      <button class="btn btn-primary" data-action="confirm-create-group">${T('createBtn')}</button>
    </div>
  </div>`;
}

/* ---------------- invite sheet ---------------- */
function renderInviteSheet(){
  const g = getGroup(state.inviteGroupId);
  if(!g) return '';
  const link = `${window.location.origin}/invite/${g.code}`;
  return `
  <div class="overlay" data-action="close-invite">
    <div class="sheet" data-action="noop">
      <div class="sheet-handle"></div>
      <div class="modal-title">${T('inviteToTitle', escapeHtml(g.name))}</div>
      <p class="modal-sub">${T('inviteSub')}</p>
      <div class="invite-link-box">
        <span>${link}</span>
        <button data-action="copy-invite" data-link="${link}">${ICON.copy} ${T('copyBtn')}</button>
      </div>
      <div class="share-channels">
        <button class="share-channel" data-action="share-invite" data-channel="${T('kakaoChannelLabel')}" data-link="${link}">
          <div class="ch-icon" style="background:#F2C230">${ICON.chatBubble}</div>
          <div>
            <div class="ch-name">${T('kakaoShareName')}</div>
            <div class="ch-desc">${T('kakaoShareDesc')}</div>
          </div>
        </button>
        <button class="share-channel" data-action="share-invite" data-channel="${T('smsChannelLabel')}" data-link="${link}">
          <div class="ch-icon" style="background:var(--sage)">${ICON.message}</div>
          <div>
            <div class="ch-name">${T('smsShareName')}</div>
            <div class="ch-desc">${T('smsShareDesc')}</div>
          </div>
        </button>
      </div>
    </div>
  </div>`;
}

/* ---------------- share picker sheet ---------------- */
function renderSharePicker(){
  const gid = state.shareGroupId;
  const m = state.sharePickMonth;
  const c = state.sharePickChapter;
  const count = CHAPTER_COUNTS[m] || 1;
  const bookChips = BOOKS.map(b=>`
    <button class="share-book-chip ${b.m===m?'active':''}" data-action="select-share-book" data-month="${b.m}">${escapeHtml(bookDisplayName(b))}</button>
  `).join('');
  let chapterCells = '';
  for(let cc=1; cc<=count; cc++){
    const has = hasEntryContent(ckey(m, cc));
    chapterCells += `
      <button class="chap-cell small ${cc===c?'selected':''} ${has?'complete':''}" data-action="select-share-chapter" data-chapter="${cc}">
        <span class="chap-num">${cc}</span>
      </button>`;
  }
  return `
  <div class="overlay" data-action="close-share-picker">
    <div class="sheet" data-action="noop">
      <div class="sheet-handle"></div>
      <div class="modal-title">${T('sharePickTitle')}</div>
      <p class="modal-sub">${T('sharePickSub')}</p>
      <div class="share-book-row">${bookChips}</div>
      <div class="share-chapter-label">${chapterLabel(bookName(m), c)}</div>
      <div class="share-chapter-grid chap-grid">${chapterCells}</div>
      <button class="share-pick-option" data-action="do-share" data-kind="content" data-id="${gid}" ${state.shareBusy?'disabled':''}>
        <div class="sp-icon">${ICON.chat}</div>
        <div>
          <div class="sp-name">${T('shareContentName')}</div>
          <div class="sp-desc">${T('shareContentDesc')}</div>
        </div>
      </button>
      <button class="share-pick-option" data-action="do-share" data-kind="thought" data-id="${gid}" ${state.shareBusy?'disabled':''}>
        <div class="sp-icon">${ICON.pencil}</div>
        <div>
          <div class="sp-name">${T('shareThoughtName')}</div>
          <div class="sp-desc">${T('shareThoughtDesc')}</div>
        </div>
      </button>
      <button class="share-pick-option" data-action="do-share" data-kind="both" data-id="${gid}" ${state.shareBusy?'disabled':''}>
        <div class="sp-icon">${ICON.plus}</div>
        <div>
          <div class="sp-name">${T('shareBothName')}</div>
          <div class="sp-desc">${T('shareBothDesc')}</div>
        </div>
      </button>
    </div>
  </div>`;
}

/* ---------------- page-level share menu (content/thought tab share button) ---------------- */
function renderPageShareSheet(){
  const ps = state.pageShare;
  if(ps.step==='pickGroup'){
    const rows = groups.length ? groups.map(g=>`
      <button class="pick-group-row" data-action="page-share-pick-group" data-id="${g.id}">
        <div class="g-dot" style="background:${g.color}"></div>
        <div class="g-name">${g.name}</div>
      </button>
    `).join('') : `<p class="modal-sub">${T('noGroupsYet')}</p>`;
    return `
    <div class="overlay" data-action="close-page-share">
      <div class="sheet" data-action="noop">
        <div class="sheet-handle"></div>
        <div class="share-back-row" data-action="page-share-back">${ICON.chevRight} ${T('pageShareTitle')}</div>
        <div class="modal-title">${T('pickGroupTitle')}</div>
        ${rows}
      </div>
    </div>`;
  }
  return `
  <div class="overlay" data-action="close-page-share">
    <div class="sheet" data-action="noop">
      <div class="sheet-handle"></div>
      <div class="modal-title">${T('pageShareTitle')}</div>
      <button class="share-pick-option" data-action="page-share-to-chat" ${state.shareBusy?'disabled':''}>
        <div class="sp-icon">${ICON.bubbleChat}</div>
        <div>
          <div class="sp-name">${T('shareToChatName')}</div>
          <div class="sp-desc">${T('shareToChatDesc')}</div>
        </div>
      </button>
      <button class="share-pick-option" data-action="page-share-kakao" ${state.shareBusy?'disabled':''}>
        <div class="sp-icon">${ICON.share}</div>
        <div>
          <div class="sp-name">${T('shareToKakaoName')}</div>
          <div class="sp-desc">${T('shareToKakaoDesc')}</div>
        </div>
      </button>
      <button class="share-pick-option" data-action="page-share-download" ${state.shareBusy?'disabled':''}>
        <div class="sp-icon">${ICON.download}</div>
        <div>
          <div class="sp-name">${T('shareDownloadName')}</div>
          <div class="sp-desc">${T('shareDownloadDesc')}</div>
        </div>
      </button>
    </div>
  </div>`;
}

/* ---------------- full-screen image viewer ---------------- */
function findMessageById(msgId){
  for(const g of groups){
    const m = (g.messages||[]).find(x=>x.id===msgId);
    if(m) return { g, m };
  }
  return null;
}
function renderImageViewer(){
  const { msgId, index } = state.imageViewer;
  const found = findMessageById(msgId);
  if(!found) return '';
  const { m } = found;
  const images = m.type==='image-pair' ? m.images : [{ dataUrl:m.imageData, cap:m.jTitle }];
  const i = Math.max(0, Math.min(index, images.length-1));
  const cur = images[i];

  return `
  <div class="image-viewer">
    <div class="viewer-topbar">
      <div class="cap">${cur.cap||''}</div>
      <button class="viewer-close" data-action="close-image-viewer">${ICON.close}</button>
    </div>
    <div class="viewer-body">
      <img src="${cur.dataUrl}" alt="${cur.cap||''}">
      ${images.length>1 && i>0 ? `<button class="viewer-nav prev" data-action="viewer-prev">${ICON.chevRight}</button>` : ''}
      ${images.length>1 && i<images.length-1 ? `<button class="viewer-nav next" data-action="viewer-next">${ICON.chevRight}</button>` : ''}
    </div>
    ${images.length>1 ? `<div class="viewer-dots">${images.map((_,idx)=>`<span class="dot ${idx===i?'active':''}"></span>`).join('')}</div>` : ''}
  </div>`;
}

/* ---------------- month calendar screen ---------------- */
function renderChapterGrid(){
  const m = state.activeMonth;
  const count = CHAPTER_COUNTS[m] || 1;

  let cells = '';
  for(let c=1; c<=count; c++){
    const key = ckey(m, c);
    const hasEntry = hasEntryContent(key);
    cells += `
      <button class="chap-cell ${hasEntry?'complete':''}" data-action="open-chapter" data-month="${m}" data-chapter="${c}">
        <span class="chap-num">${c}</span>
        ${hasEntry ? ICON.check : ''}
      </button>`;
  }

  return `
    <div class="cal-header">
      <button class="icon-btn" data-action="go-main">${ICON.back}</button>
      <div class="titles">
        <div class="cap">${T('calCap')}</div>
        <h2>${bookName(m)}</h2>
      </div>
      <button class="icon-btn" data-action="open-chapter-info" title="${T('chapterInfoBtn')}">${ICON.info}</button>
    </div>
    <div class="settings-body" style="padding-top:6px;">
      <p class="terms-sub" style="margin-bottom:14px;">${T('chapterGridSub')}</p>
      <div class="chap-grid">${cells}</div>
    </div>
  `;
}

/* ---------------- daily screen ---------------- */
function renderDaily(){
  const m = state.activeMonth;
  const c = state.activeChapter;
  const key = ckey(m, c);
  return `
    <div class="daily-header">
      <button class="icon-btn" data-action="go-chapters">${ICON.back}</button>
      <div class="titles">
        <div class="cap">${T('dailyCap', bookName(m))}</div>
        <h2>${chapterLabel(bookName(m), c)}</h2>
      </div>
      ${state.activeTab!=='bible' ? `<button class="icon-btn" data-action="open-page-share" data-kind="${state.activeTab}" title="${T('pageShareBtn')}">${ICON.share}</button>` : ''}
    </div>
    <div class="tab-content">
      ${state.activeTab==='bible' ? renderBibleTab() : ''}
      ${state.activeTab==='content' ? renderContentTab(key) : ''}
      ${state.activeTab==='thought' ? renderThoughtTab(key) : ''}
    </div>
    <div class="bottom-nav">
      <button class="nav-btn ${state.activeTab==='bible'?'active':''}" data-action="set-tab" data-tab="bible">
        ${ICON.book}<span>${T('navBible')}</span>
      </button>
      <button class="nav-btn ${state.activeTab==='content'?'active':''}" data-action="set-tab" data-tab="content">
        ${ICON.chat}<span>${T('navContent')}</span>
      </button>
      <button class="nav-btn ${state.activeTab==='thought'?'active':''}" data-action="set-tab" data-tab="thought">
        ${ICON.pencil}<span>${T('navThought')}</span>
      </button>
    </div>
  `;
}

function chapterVerseTexts(m, c){
  if(state.lang==='en') return kjvVerses(m, c);
  if(state.lang==='th') return thVerses(m, c);
  if(state.lang==='ja') return jaVerses(m, c);
  if(state.lang==='zh') return zhVerses(m, c);
  if(m===1) return koGenesisVerses(c); // 창세기: 실제 본문 데이터 사용
  if(m===2) return koExodusVerses(c); // 출애굽기: 실제 본문 데이터 사용
  if(m===3) return koLeviticusVerses(c); // 레위기: 실제 본문 데이터 사용
  if(m===4) return koNumbersVerses(c); // 민수기: 실제 본문 데이터 사용
  if(m===5) return koDeuteronomyVerses(c); // 신명기: 실제 본문 데이터 사용
  return CHAPTER.verses; // 그 외: 데이터 준비 전까지 기존 데모 본문 유지
}
function verseRef(m, c, n){
  return `${bookName(m)} ${c}:${n}`;
}
function renderBibleTab(){
  const verseTexts = chapterVerseTexts(state.activeMonth, state.activeChapter);
  const verses = verseTexts.map((text,idx)=>{
    const n = idx+1;
    return `<div class="verse" id="verse-${n}" data-verse-num="${n}"><span class="vnum">${n}</span><span>${text}</span></div>`;
  }).join('');
  const prev = chapterNavTarget(state.activeMonth, state.activeChapter, -1);
  const next = chapterNavTarget(state.activeMonth, state.activeChapter, 1);
  return `
    <div class="chapter-card">
      <div class="chapter-card-head">
        <div>
          <div class="cap">${T('todayReading')}</div>
          <h3>${chapterLabel(bookName(state.activeMonth), state.activeChapter)}</h3>
        </div>
      </div>
      <div class="verse-list">${verses}</div>
    </div>
    <div class="chapter-nav">
      <button class="chapter-nav-btn prev" data-action="go-prev-chapter" ${prev?'':'disabled'}>
        ${ICON.chevRight}<span>${prev ? chapterLabel(bookName(prev.m), prev.c) : ''}</span>
      </button>
      <button class="chapter-nav-btn next" data-action="go-next-chapter" ${next?'':'disabled'}>
        <span>${next ? chapterLabel(bookName(next.m), next.c) : ''}</span>${ICON.chevRight}
      </button>
    </div>
  `;
}

/* ---------------- verse long-press copy sheet ---------------- */
function renderVerseActionSheet(){
  const { n } = state.verseActionMenu;
  const ref = verseRef(state.activeMonth, state.activeChapter, n);
  return `
  <div class="overlay" data-action="close-verse-menu">
    <div class="sheet verse-action-sheet" data-action="noop">
      <div class="sheet-handle"></div>
      <div class="verse-action-ref">${escapeHtml(ref)}</div>
      <button class="verse-action-btn" data-action="copy-verse">
        <span class="va-icon">${ICON.copy}</span>
        <span>${T('copyVerseBtn')}</span>
      </button>
    </div>
  </div>`;
}

/* ---------------- chapter background info sheet ---------------- */
function renderChapterInfoSheet(){
  const info = getBibleInfo(state.activeMonth, state.lang);

  const titleHtml = info
    ? `${info.titleNative}${info.titleNative!==info.titleEn ? ` <span class="bible-info-title-en">(${info.titleEn})</span>` : ''}`
    : T('chapterInfoTitle', bookName(state.activeMonth));

  const metaItems = info ? [
    { key:'bibleInfoAuthorLabel', value: info.author },
    { key:'bibleInfoEraLabel', value: info.era },
    info.theme ? { key:'bibleInfoThemeLabel', value: info.theme } : null,
    info.character ? { key:'bibleInfoCharacterLabel', value: info.character } : null,
  ].filter(Boolean) : [];

  const bodyHtml = info ? `
    <div class="bi-card">
      <span class="bi-card-label">${T('bibleInfoOriginLabel')}</span>
      <p class="bi-origin-text">${info.origin}</p>
    </div>
    <div class="bi-meta-row">
      ${metaItems.map(m=>`
        <div class="bi-meta-badge">
          <span class="bi-meta-label">${T(m.key)}</span>
          <span class="bi-meta-value">${m.value}</span>
        </div>`).join('')}
    </div>
    ${info.keyContent ? `
      <div class="bi-card">
        <span class="bi-card-label">${T('bibleInfoKeyContentLabel')}</span>
        <p class="bi-origin-text">${info.keyContent}</p>
      </div>
    ` : ''}
    <div class="bi-outline">
      <div class="bi-outline-label">${T('bibleInfoOutlineLabel')}</div>
      ${info.sections.map(sec=>`
        <div class="bi-section">
          <div class="bi-section-title"><span class="mark">✦</span>${sec.label}</div>
          <div class="bi-chips">
            ${sec.items.map(it=>`
              <div class="bi-chip">
                <span class="bi-chip-num">${it.num}</span>
                <span class="bi-chip-name">${it.label}</span>
                <span class="bi-chip-range">${it.range}</span>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>
  ` : `
    <div class="guide-empty" style="padding:30px 4px 10px;">
      <div class="guide-empty-icon">${ICON.info}</div>
      <div class="guide-empty-title">${T('chapterInfoEmptyTitle')}</div>
      <p class="guide-empty-body">${T('chapterInfoEmptyBody')}</p>
    </div>
  `;

  return `
  <div class="overlay" data-action="close-chapter-info">
    <div class="sheet bible-info-sheet" data-action="noop">
      <div class="sheet-handle"></div>
      <div class="bible-info-header">
        <div class="modal-title">${titleHtml}</div>
        <button class="icon-btn" data-action="close-chapter-info">${ICON.close}</button>
      </div>
      ${bodyHtml}
    </div>
  </div>`;
}

function renderContentTab(ds){
  const entry = getEntry(ds);
  const data = getContentQuestions(bookDataId(state.activeMonth), state.activeChapter, state.lang);
  if(!data){
    return `
    <div class="guide-empty" style="padding:60px 20px 20px;">
      <div class="guide-empty-icon">${ICON.chat}</div>
      <div class="guide-empty-title">${T('contentQuestionsEmptyTitle')}</div>
      <p class="guide-empty-body">${T('contentQuestionsEmptyBody')}</p>
    </div>`;
  }
  const cards = data.questions.map(q=>{
    const qid = 'q'+q.questionNumber;
    const val = entry.content[qid] || '';
    return `
    <div class="q-card">
      <div class="q-text">${nl2br(escapeHtml(`${q.questionNumber}. ${q.question}`))}</div>
      <textarea class="q-answer" data-kind="content" data-qid="${qid}" placeholder="${T('qPlaceholder')}">${escapeHtml(val)}</textarea>
    </div>`;
  }).join('');
  return cards;
}

function renderThoughtTab(ds){
  const entry = getEntry(ds);
  const t = entry.thought;
  const askQuestions = getAskQuestions();
  const askQ = t.askIndex!==null ? askQuestions[t.askIndex] : T('askPlaceholderQ');
  const askList = askQuestions.map((q,i)=>`
    <div class="ask-item ${t.askIndex===i?'selected':''}" data-action="pick-ask" data-index="${i}">${q}</div>
  `).join('');

  return `
    <div class="section-block">
      <div class="s-label"><span class="dot"></span>${T('verseLabel')}</div>
      <input type="text" data-kind="thought" data-field="verse" value="${t.verse}" placeholder="${T('versePh')}">
    </div>

    <div class="section-block">
      <div class="s-label"><span class="dot"></span>${T('passageLabel')}</div>
      <textarea data-kind="thought" data-field="passage" placeholder="${T('passagePh')}">${t.passage}</textarea>
    </div>

    <div class="section-block">
      <div class="s-label"><span class="dot"></span>${T('godIsLabel')}</div>
      <textarea data-kind="thought" data-field="godIs" placeholder="${T('godIsPh')}">${t.godIs}</textarea>
    </div>

    <div class="section-block">
      <div class="s-label"><span class="dot"></span>${T('askLabel')}</div>
      <div class="ask-box">
        <div class="ask-row">
          <div class="ask-q">${askQ}</div>
          <button class="ask-arrow ${state.askOpen?'open':''}" data-action="toggle-ask">${ICON.chevDown}</button>
        </div>
        ${state.askOpen ? `<div class="ask-list">${askList}</div>` : ''}
      </div>
    </div>

    <div class="section-block">
      <div class="s-label"><span class="dot"></span>${T('heardLabel')}</div>
      <textarea data-kind="thought" data-field="heard" placeholder="${T('heardPh')}">${t.heard}</textarea>
    </div>

    <div class="section-block">
      <div class="s-label"><span class="dot"></span>${T('appLabel')}</div>
      <div class="sub-label">${T('appMeLabel')}</div>
      <textarea data-kind="thought" data-field="appMe" placeholder="${T('appMePh')}">${t.appMe}</textarea>
      <div class="sub-label second">${T('appServeLabel')}</div>
      <textarea data-kind="thought" data-field="appServe" placeholder="${T('appServePh')}">${t.appServe}</textarea>
    </div>

    <div class="section-block">
      <div class="s-label"><span class="dot"></span>${T('prayerLabel')}</div>
      <div class="sub-label">${T('prayerReqLabel')}</div>
      <textarea data-kind="thought" data-field="prayerReq" placeholder="${T('prayerReqPh')}">${t.prayerReq}</textarea>
      <div class="sub-label second">${T('prayerForLabel')}</div>
      <textarea data-kind="thought" data-field="prayerFor" placeholder="${T('prayerForPh')}">${t.prayerFor}</textarea>
    </div>

    <div class="section-block">
      <div class="s-label"><span class="dot"></span>${T('thanksLabel')}</div>
      ${t.thanks.map((val,i)=>`
        <div class="thanks-row">
          <div class="num">${i+1}</div>
          <input type="text" style="flex:1" data-kind="thanks" data-index="${i}" value="${val}" placeholder="${T('thanksPh', i+1)}">
        </div>
      `).join('')}
      <button class="add-thanks-btn" data-action="add-thanks">${ICON.plus} ${T('addThanks')}</button>
    </div>
  `;
}

/* ---------------- events ---------------- */
document.getElementById('shell').addEventListener('click', (e)=>{
  const el = e.target.closest('[data-action]');
  if(!el) return;
  const action = el.dataset.action;

  if(action==='go-main'){ state.screen = state.loggedIn ? 'main' : 'login'; state.purchaseModal=null; render(); }
  else if(action==='go-login'){ state.screen='login'; render(); }
  else if(action==='do-email-login'){
    const val = (id)=> { const e = document.getElementById(id); return e ? e.value.trim() : ''; };
    const email = val('login-email');
    const password = val('login-password');
    if(!email || !password){ showToast(T('toastFillAll')); return; }
    if(!(window.__firebaseAuth && window.__firebaseAuth.ready)){ showToast(T('toastFirebaseNotSet')); return; }
    withLoading(window.__firebaseAuth.signInWithEmail(email, password)).then(profile=>{
      window.storage.set('user-profile', JSON.stringify(profile), false).catch(()=>{});
      state.user = { uid:profile.uid, name:profile.name, email:profile.email, photoUrl:profile.photoUrl };
      state.loggedIn = true;
      saveAuth();
      resolvePostLoginScreen();
      render();
      showToast(T('toastLogin'));
    }).catch(err=>{
      console.error('Email sign-in failed:', err);
      showToast(T('toastEmailLoginFailed'));
    });
  }
  else if(action==='do-google-login'){
    if(window.__firebaseAuth && window.__firebaseAuth.ready){
      withLoading(window.__firebaseAuth.signInWithGoogle()).then(profile=>{
        // users/{uid} 저장은 firebaseBridge.js가 로그인 성공 시 자동으로 처리합니다.
        window.storage.set('user-profile', JSON.stringify(profile), false).catch(()=>{});
        state.user = { uid:profile.uid, name:profile.name, email:profile.email, photoUrl:profile.photoUrl };
        state.loggedIn = true;
        saveAuth();
        resolvePostLoginScreen();
        render();
        showToast(T('toastLogin'));
      }).catch(err=>{
        console.error('Google sign-in failed:', err);
        showToast(googleErrorToast(err));
      });
    } else {
      showToast(T('toastFirebaseNotSet'));
    }
  }
  else if(action==='do-kakao-login'){
    if(window.__firebaseAuth && window.__firebaseAuth.ready){
      withLoading(window.__firebaseAuth.signInWithKakao()).then(profile=>{
        // users/{uid} 저장은 firebaseBridge.js가 로그인 성공 시 자동으로 처리합니다.
        window.storage.set('user-profile', JSON.stringify(profile), false).catch(()=>{});
        state.user = { uid:profile.uid, name:profile.name, email:profile.email, photoUrl:profile.photoUrl };
        state.loggedIn = true;
        saveAuth();
        resolvePostLoginScreen();
        render();
        showToast(T('toastLogin'));
      }).catch(err=>{
        console.error('Kakao sign-in failed:', err);
        showToast(T('toastKakaoFailed'));
      });
    } else {
      showToast(T('toastFirebaseNotSet'));
    }
  }
  else if(action==='go-signup'){
    state.signupTermsConsent = false;
    state.signupTermsConsentOpen = false;
    state.signupConsent = false;
    state.signupConsentOpen = false;
    state.signupForm = { name:'', email:'', birth:'', username:'', password:'', nickname:'' };
    state.screen = 'signup';
    render();
  }
  else if(action==='toggle-signup-terms-consent'){
    state.signupTermsConsent = !state.signupTermsConsent;
    render();
  }
  else if(action==='toggle-signup-terms-consent-detail'){
    state.signupTermsConsentOpen = !state.signupTermsConsentOpen;
    render();
  }
  else if(action==='toggle-signup-consent'){
    state.signupConsent = !state.signupConsent;
    render();
  }
  else if(action==='toggle-signup-consent-detail'){
    state.signupConsentOpen = !state.signupConsentOpen;
    render();
  }
  else if(action==='confirm-signup'){
    // DOM에서 직접 읽지 않고 state.signupForm을 사용합니다 — 체크박스 토글로
    // 화면이 다시 그려진 뒤에도 이 값이 input의 value로 복원되어 있으므로
    // 항상 최신 입력값과 일치합니다.
    const name = state.signupForm.name.trim();
    const email = state.signupForm.email.trim();
    const birth = state.signupForm.birth.trim();
    const username = state.signupForm.username.trim();
    const pw = state.signupForm.password.trim();
    const nickname = state.signupForm.nickname.trim();

    if(!name || !email || !birth || !username || !pw || !nickname){
      showToast(T('toastFillAll'));
      return;
    }
    if(!state.signupTermsConsent || !state.signupConsent){
      showToast(T('toastNeedConsent'));
      return;
    }
    if(!(window.__firebaseAuth && window.__firebaseAuth.ready)){
      showToast(T('toastFirebaseNotSet'));
      return;
    }
    // birth/username/nickname/약관 동의 정보는 signUpWithEmail의 extraProfile로 전달하면
    // firebaseBridge.js가 users/{uid} 문서를 만들 때 함께 저장합니다.
    withLoading(window.__firebaseAuth.signUpWithEmail(email, pw, name, {
      birth, username, nickname,
      termsConsent:true, privacyConsent:true, consentAgreedAt:new Date().toISOString(),
    })).then(profile=>{
      const fullProfile = { ...profile, name, birth, username, nickname };
      window.storage.set('user-profile', JSON.stringify(fullProfile), false).catch(()=>{});
      state.user = { uid:fullProfile.uid, name:fullProfile.name, email:fullProfile.email, photoUrl:fullProfile.photoUrl, username:fullProfile.username, nickname:fullProfile.nickname };
      state.loggedIn = true;
      state.signupForm = { name:'', email:'', birth:'', username:'', password:'', nickname:'' };
      saveAuth();
      resolvePostLoginScreen();
      render();
      showToast(T('toastSignupDone'));
    }).catch(err=>{
      // Firestore(users/{uid}) 쓰기 실패는 firebaseBridge.js의 saveUserOnAuth가 자체
      // try/catch로 삼키고 로그만 남기므로(가입 자체를 막지 않도록), 여기 catch로
      // 들어온다는 건 거의 항상 createUserWithEmailAndPassword 자체가 실패했다는
      // 뜻입니다. code/message를 그대로 남겨서 Firebase 콘솔의 Authentication
      // 설정(이메일/비밀번호 로그인 활성화 여부, 승인된 도메인 등)이나 .env의
      // VITE_FIREBASE_* 값을 바로 점검할 수 있게 합니다.
      const code = err && err.code;
      const message = err && err.message;
      console.error('[Signup] Email sign-up failed. code:', code, 'message:', message, err);
      if(code==='auth/email-already-in-use') showToast(T('toastEmailInUse'));
      else if(code==='auth/weak-password') showToast(T('toastWeakPassword'));
      else if(code==='auth/invalid-email') showToast(T('toastInvalidEmail'));
      // 그 외(예: auth/operation-not-allowed, auth/network-request-failed,
      // auth/invalid-api-key 등)는 안내 문구로 뭉개지 않고 실제 에러 메시지를
      // 그대로 보여줘서 원인을 바로 알 수 있게 합니다.
      else showToast(message || T('toastSignupFailed'));
    });
  }
  else if(action==='do-logout'){
    const finishLogout = ()=>{
      state.loggedIn=false; state.user=null; lastPushedStreak=null; saveAuth(); state.screen='login'; render(); showToast(T('toastLogout'));
    };
    if(window.__firebaseAuth && window.__firebaseAuth.ready){
      window.__firebaseAuth.signOutOfGoogle().then(finishLogout).catch(err=>{
        console.error('Sign-out failed:', err);
        showToast(T('toastLogoutFailed'));
      });
    } else {
      finishLogout();
    }
  }
  else if(action==='open-delete-account'){
    if(!(state.loggedIn && state.user)) return;
    state.deleteAccountModal = { password:'', busy:false };
    render();
  }
  else if(action==='close-delete-account'){
    if(state.deleteAccountModal && state.deleteAccountModal.busy) return;
    state.deleteAccountModal = null;
    render();
  }
  else if(action==='confirm-delete-account'){
    const m = state.deleteAccountModal;
    if(!m || m.busy) return;
    if(!(window.__firebaseAuth && window.__firebaseAuth.ready)){
      showToast(T('toastFirebaseNotSet'));
      return;
    }
    // 이메일/비밀번호 계정만 비밀번호로 재인증합니다. 구글/카카오 계정은
    // firebaseBridge.js의 deleteAccount()가 알아서 팝업으로 재인증을 띄우므로
    // password는 그냥 무시됩니다.
    const isPasswordProvider = state.user && state.user.provider === 'password';
    const password = m.password.trim();
    if(isPasswordProvider && !password){
      showToast(T('toastDeleteAccountNeedPassword'));
      return;
    }
    m.busy = true;
    render();
    withLoading(window.__firebaseAuth.deleteAccount(password)).then(()=>{
      // 삭제 자체는 재인증 → Firestore/Storage 데이터 삭제 → Auth 계정 삭제 순서로
      // firebaseBridge.js가 전부 처리합니다. 여기서는 로컬에 남아있던 이 계정의
      // 묵상/채팅방 캐시를 비우고(모든 데이터가 삭제된다는 안내와 일치시키기 위해)
      // 로그인 화면으로 이동합니다. (initAuthGate의 onAuthStateChanged 구독도 곧
      // 같은 로그아웃 상태를 반영하지만, 토스트와 화면 전환은 여기서 바로 처리합니다.)
      journalData = {};
      groups = [];
      saveGroups();
      window.storage.set('journal-entries', JSON.stringify(journalData), false).catch(()=>{});
      state.deleteAccountModal = null;
      state.loggedIn = false;
      state.user = null;
      lastPushedStreak = null;
      saveAuth();
      state.screen = 'login';
      render();
      showToast(T('toastDeleteAccountDone'));
    }).catch(err=>{
      const code = err && err.code;
      const message = err && err.message;
      console.error('[탈퇴] 계정 삭제 실패. code:', code, 'message:', message, err);
      if(state.deleteAccountModal) state.deleteAccountModal.busy = false;
      if(code==='auth/wrong-password' || code==='auth/invalid-credential') showToast(T('toastDeleteAccountWrongPassword'));
      else if(code==='auth/popup-closed-by-user' || code==='auth/cancelled-popup-request') showToast(T('toastReauthCancelled'));
      else if(code==='auth/network-request-failed') showToast(T('toastNetworkError'));
      else showToast(message || T('toastDeleteAccountFailed'));
      render();
    });
  }
  else if(action==='pick-avatar'){
    const input = document.getElementById('avatar-file-input');
    if(input) input.click();
  }
  else if(action==='open-nickname-edit'){ state.nicknameModal = true; render(); }
  else if(action==='close-nickname-modal'){ state.nicknameModal = false; render(); }
  else if(action==='save-nickname'){
    const input = document.getElementById('nickname-input');
    const value = input ? input.value.trim() : '';
    if(!value){ showToast(T('toastNicknameEmpty')); return; }
    if(!state.user || !state.user.uid){ return; }
    const uid = state.user.uid;
    const tasks = [];
    if(window.__firebaseDB && window.__firebaseDB.ready){
      tasks.push(window.__firebaseDB.saveUserProfile(uid, { name: value, nickname: value }));
    }
    if(window.__firebaseAuth && window.__firebaseAuth.ready){
      tasks.push(window.__firebaseAuth.updateUserProfile({ displayName: value }).catch(()=>{}));
    }
    withLoading(Promise.all(tasks)).then(()=>{
      state.user = Object.assign({}, state.user, { name: value, nickname: value });
      window.storage.set('user-profile', JSON.stringify(state.user), false).catch(()=>{});
      state.nicknameModal = false;
      render();
      showToast(T('toastNicknameSaved'));
    }).catch(err=>{
      console.error('Nickname save failed:', err);
      showToast(T('toastNicknameSaveFailed'));
    });
  }
  else if(action==='close-avatar-modal'){
    if(state.avatarModal && state.avatarModal.saving) return; // ignore while a save is in flight
    state.avatarModal = null;
    render();
  }
  else if(action==='confirm-avatar'){
    if(!state.avatarModal || !state.user || !state.user.uid) return;
    if(state.avatarModal.saving) return; // 중복 클릭으로 저장이 두 번 실행되는 것을 방지
    const uid = state.user.uid;
    const { dataUrl } = state.avatarModal;
    console.log('[Profile] 프로필 저장 시작 (아바타, Base64)', { uid, length: dataUrl.length });
    state.avatarModal.saving = true;
    render();

    // Profile photos are stored as a small Base64 data URL directly on the Firestore user
    // doc and the Auth profile, bypassing Firebase Storage entirely - this sidesteps
    // Storage-specific failures (bucket/CORS misconfiguration, storage/retry-limit-exceeded,
    // net::ERR_FAILED) that a resize-then-upload flow is otherwise exposed to.
    const tasks = [];
    if(window.__firebaseDB && window.__firebaseDB.ready){
      console.log('[Profile] 사용자 정보 저장 시작 (Firestore)');
      tasks.push(
        window.__firebaseDB.saveUserProfile(uid, { photoUrl: dataUrl })
          .then(()=> console.log('[Profile] 사용자 정보 저장 완료 (Firestore)'))
      );
    }
    if(window.__firebaseAuth && window.__firebaseAuth.ready){
      tasks.push(
        window.__firebaseAuth.updateUserProfile({ photoURL: dataUrl })
          .catch(err=> console.error('[Profile] Firebase Auth photoURL 갱신 실패 (무시하고 계속 진행)', {
            code: err && err.code,
            message: err && err.message,
            error: err,
          }))
      );
    }

    withLoading(Promise.all(tasks)).then(()=>{
      state.user = Object.assign({}, state.user, { photoUrl: dataUrl });
      window.storage.set('user-profile', JSON.stringify(state.user), false).catch(()=>{});
      state.avatarModal = null;
      render();
      console.log('[Profile] 프로필 저장 성공 (아바타)');
      showToast(T('toastAvatarSaved'));
    }).catch(err=>{
      console.error('[Profile] 프로필 저장 실패 (아바타):', {
        code: err && err.code,
        message: err && err.message,
        error: err,
      });
      if(state.avatarModal) state.avatarModal.saving = false;
      render();
      showToast(avatarErrorToast(err));
    });
  }
  else if(action==='open-settings'){ state.screen='settings'; render(); }
  else if(action==='go-contact'){ state.screen='contact'; render(); }
  else if(action==='do-email-contact'){
    openEmailContact('biblejournalingjoa@gmail.com', T('contactMailSubject'), T('contactMailBody'));
  }
  else if(action==='go-guide'){ state.screen='guide'; render(); }
  else if(action==='guide-jump'){
    const target = document.getElementById('guide-step-' + el.dataset.step);
    if(target) target.scrollIntoView({ behavior:'smooth', block:'start' });
  }
  else if(action==='open-donate'){ state.donateModal=true; state.donateCopied=false; render(); }
  else if(action==='open-privacy-policy'){
    // public/privacy.html 로 배포되는 정적 개인정보처리방침 페이지. 앱 화면이 아니라
    // 새 탭으로 열어 작성 중인 묵상 기록 상태를 잃지 않게 합니다. ?lang= 으로
    // 현재 선택한 언어(한국어 외에는 영문)에 맞는 본문이 먼저 보이게 합니다.
    const lang = state.lang === 'ko' ? 'ko' : 'en';
    window.open(`/privacy.html?lang=${lang}`, '_blank', 'noopener');
  }
  else if(action==='close-donate'){ state.donateModal=false; state.donateCopied=false; render(); }
  else if(action==='copy-donate-account'){
    const num = T('donateAccountNumber');
    try{
      navigator.clipboard && navigator.clipboard.writeText(num);
    }catch(err){}
    state.donateCopied = true;
    render();
    showToast(T('toastAccountCopied'));
    clearTimeout(donateCopyTimer);
    donateCopyTimer = setTimeout(()=>{ state.donateCopied=false; render(); }, 2000);
  }
  else if(action==='go-notifications'){ state.screen='notifications'; render(); }
  else if(action==='open-notif-day'){
    state.notifDayOpen = el.dataset.day;
    render();
  }
  else if(action==='close-notif-day'){
    state.notifDayOpen = null;
    render();
  }
  else if(action==='save-notif-day'){
    const d = el.dataset.day;
    const inp = document.getElementById('notif-time-input');
    notifSettings[d] = inp && inp.value ? inp.value : '07:00';
    saveNotifSettings();
    state.notifDayOpen = null;
    render();
    // Turning a day on is the moment we ask for notification permission, per
    // spec — not proactively on app load, so the prompt has clear context.
    registerPushForCurrentUser();
    syncNotificationSettingsToFirestore();
  }
  else if(action==='turn-off-notif-day'){
    const d = el.dataset.day;
    notifSettings[d] = null;
    saveNotifSettings();
    state.notifDayOpen = null;
    render();
    syncNotificationSettingsToFirestore();
  }
  else if(action==='set-fontsize'){ state.fontSize = el.dataset.size; savePrefs(); render(); }
  else if(action==='open-language'){ state.languageModal=true; render(); }
  else if(action==='close-language'){ state.languageModal=false; render(); }
  else if(action==='set-lang'){ state.lang = el.dataset.lang; savePrefs(); state.languageModal=false; render(); sendLanguageToServiceWorker(state.lang); }
  else if(action==='set-theme'){ state.theme = el.dataset.theme; savePrefs(); render(); }
  else if(action==='go-today'){ goToTodayJournal(); }
  else if(action==='open-purchase'){ state.purchaseModal = Number(el.dataset.month); state.selectedPlan='year'; render(); }
  else if(action==='close-purchase'){ state.purchaseModal=null; render(); }
  else if(action==='select-plan'){ state.selectedPlan = el.dataset.plan; render(); }
  else if(action==='confirm-purchase'){
    const m = Number(el.dataset.month);
    if(state.selectedPlan==='year'){
      BOOKS.forEach(b=>{ if(!state.purchased.includes(b.m)) state.purchased.push(b.m); });
    } else {
      if(!state.purchased.includes(m)) state.purchased.push(m);
    }
    savePurchased();
    state.purchaseModal=null;
    state.activeMonth=m;
    state.screen='chapters';
    render();
    showToast(state.selectedPlan==='year' ? T('toastPurchaseYear') : T('toastPurchaseMonth', bookName(m)));
  }
  else if(action==='open-chapters'){
    state.activeMonth = Number(el.dataset.month);
    state.screen='chapters';
    render();
  }
  else if(action==='go-chapters'){
    state.screen='chapters';
    render();
  }
  else if(action==='open-chapter'){
    enterChapter(Number(el.dataset.month), Number(el.dataset.chapter));
  }
  else if(action==='go-prev-chapter'){
    const target = chapterNavTarget(state.activeMonth, state.activeChapter, -1);
    if(target) enterChapter(target.m, target.c);
  }
  else if(action==='go-next-chapter'){
    const target = chapterNavTarget(state.activeMonth, state.activeChapter, 1);
    if(target) enterChapter(target.m, target.c);
  }
  else if(action==='set-tab'){
    state.activeTab = el.dataset.tab;
    if(state.activeTab!=='bible') state.highlightVerse=null;
    render();
  }
  else if(action==='goto-verse'){
    state.activeTab='bible';
    state.highlightVerse = Number(el.dataset.verse);
    render();
  }
  else if(action==='toggle-ask'){
    state.askOpen = !state.askOpen;
    render();
  }
  else if(action==='pick-ask'){
    getEntry(ckey(state.activeMonth, state.activeChapter)).thought.askIndex = Number(el.dataset.index);
    state.askOpen = false;
    saveAnswersDebounced();
    render();
  }
  else if(action==='add-thanks'){
    getEntry(ckey(state.activeMonth, state.activeChapter)).thought.thanks.push('');
    saveAnswersDebounced();
    render();
  }
  else if(action==='go-groups'){
    state.screen='groups';
    render();
  }
  else if(action==='open-group'){
    state.activeGroupId = el.dataset.id;
    state.screen='group-room';
    render();
  }
  else if(action==='open-group-manage'){
    state.activeGroupId = el.dataset.id || state.activeGroupId;
    state.screen = 'group-manage';
    state.groupInfoMembers = null;
    state.groupInfoError = false;
    state.groupNameEditOpen = false;
    render();
    loadGroupMembers(state.activeGroupId);
  }
  else if(action==='go-group-room'){
    state.groupNameEditOpen = false;
    state.screen = 'group-room';
    render();
  }
  else if(action==='pick-room-photo'){
    if(!isRoomOwner()) return;
    const input = document.getElementById('room-photo-file-input');
    if(input) input.click();
  }
  else if(action==='close-room-photo-modal'){
    if(state.roomPhotoModal && state.roomPhotoModal.saving) return;
    if(state.roomPhotoModal && state.roomPhotoModal.previewUrl) URL.revokeObjectURL(state.roomPhotoModal.previewUrl);
    state.roomPhotoModal = null;
    render();
  }
  else if(action==='confirm-room-photo'){
    const m = state.roomPhotoModal;
    const groupId = state.activeGroupId;
    if(!m || m.saving || !groupId) return;
    const fdb = window.__firebaseDB;
    if(!fdb || !fdb.ready || typeof fdb.uploadGroupPhoto !== 'function' || typeof fdb.updateGroupPhoto !== 'function'){
      showToast(T('toastRoomPhotoSaveFailed'));
      return;
    }
    m.saving = true;
    render();
    withLoading(
      fdb.uploadGroupPhoto(groupId, m.blob).then((url)=> fdb.updateGroupPhoto(groupId, url).then(()=>url))
    ).then((url)=>{
      const g = getGroup(groupId);
      if(g){ g.photoUrl = url; saveGroups(); }
      if(state.roomPhotoModal && state.roomPhotoModal.previewUrl) URL.revokeObjectURL(state.roomPhotoModal.previewUrl);
      state.roomPhotoModal = null;
      render();
      showToast(T('toastRoomPhotoSaved'));
    }).catch(err=>{
      console.error('Room photo upload failed:', err);
      if(state.roomPhotoModal) state.roomPhotoModal.saving = false;
      render();
      showToast(T('toastRoomPhotoSaveFailed'));
    });
  }
  else if(action==='open-room-name-edit'){
    if(!isRoomOwner()) return;
    state.groupNameEditOpen = true;
    render();
  }
  else if(action==='close-room-name-edit'){
    if(state.groupNameSaving) return;
    state.groupNameEditOpen = false;
    render();
  }
  else if(action==='save-room-name'){
    if(state.groupNameSaving) return;
    const groupId = state.activeGroupId;
    const input = document.getElementById('room-name-input');
    const name = input ? input.value.trim() : '';
    if(!name){ showToast(T('toastRoomNameEmpty')); return; }
    if(name.length > 30){ showToast(T('toastRoomNameTooLong')); return; }
    const fdb = window.__firebaseDB;
    if(!groupId || !fdb || !fdb.ready || typeof fdb.updateGroupName !== 'function'){
      showToast(T('toastRoomNameSaveFailed'));
      return;
    }
    state.groupNameSaving = true;
    render();
    withLoading(fdb.updateGroupName(groupId, name)).then(()=>{
      const g = getGroup(groupId);
      if(g){ g.name = name; saveGroups(); }
      state.groupNameSaving = false;
      state.groupNameEditOpen = false;
      render();
      showToast(T('toastRoomNameSaved'));
    }).catch(err=>{
      console.error('Room name save failed:', err);
      state.groupNameSaving = false;
      render();
      showToast(T('toastRoomNameSaveFailed'));
    });
  }
  else if(action==='open-member-profile'){
    if(!el.dataset.uid) return;
    state.memberProfileUid = el.dataset.uid;
    render();
  }
  else if(action==='close-member-profile'){
    state.memberProfileUid = null;
    render();
  }
  else if(action==='open-leave-confirm'){
    state.leaveConfirmOpen = true;
    render();
  }
  else if(action==='close-leave-confirm'){
    if(state.leaveBusy) return;
    state.leaveConfirmOpen = false;
    render();
  }
  else if(action==='confirm-leave-group'){
    if(state.leaveBusy) return;
    const groupId = state.activeGroupId;
    const fdb = window.__firebaseDB;
    if(!groupId || !fdb || !fdb.ready || !(state.user && state.user.uid) || typeof fdb.removeGroupMember !== 'function'){
      state.leaveConfirmOpen = false;
      render();
      showToast(T('toastLeaveFailed'));
      return;
    }
    state.leaveBusy = true;
    render();
    withLoading(fdb.removeGroupMember(groupId, state.user.uid)).then(()=>{
      groups = groups.filter(gr=>gr.id!==groupId);
      saveGroups();
      state.leaveBusy = false;
      state.leaveConfirmOpen = false;
      state.activeGroupId = null;
      state.groupInfoMembers = null;
      state.groupInfoError = false;
      state.groupManageDoc = null;
      state.groupNameEditOpen = false;
      state.memberProfileUid = null;
      state.screen = 'groups';
      render();
      showToast(T('toastLeftGroup'));
    }).catch(err=>{
      console.error('Failed to leave group:', err);
      state.leaveBusy = false;
      render();
      showToast(T('toastLeaveFailed'));
    });
  }
  else if(action==='open-create-group'){
    state.createGroupOpen = true;
    render();
    requestAnimationFrame(()=>{
      const inp = document.getElementById('new-group-name');
      if(inp) inp.focus();
    });
  }
  else if(action==='close-create-group'){
    state.createGroupOpen = false;
    render();
  }
  else if(action==='confirm-create-group'){
    const inp = document.getElementById('new-group-name');
    const name = (inp && inp.value.trim()) || T('defaultGroupName');
    const g = {
      id:'g-'+Date.now(),
      name,
      color:GROUP_COLORS[groups.length % GROUP_COLORS.length],
      code:makeCode(),
      ownerUid: state.user && state.user.uid,
      photoUrl:null,
      memberCount:2,
      messages:[{id:'m-'+Date.now(), from:'시스템', isMe:false, type:'system', textKey:'sysGroupCreated'}]
    };
    groups.push(g);
    saveGroups();
    state.createGroupOpen = false;
    state.activeGroupId = g.id;
    state.screen = 'group-room';
    render();
    showToast(T('toastGroupCreated'));
  }
  else if(action==='open-invite'){
    state.inviteGroupId = el.dataset.id;
    render();
  }
  else if(action==='close-invite'){
    state.inviteGroupId = null;
    render();
  }
  else if(action==='copy-invite' || action==='share-invite'){
    const link = el.dataset.link;
    try{
      navigator.clipboard && navigator.clipboard.writeText(link);
    }catch(err){}
    const channel = el.dataset.channel;
    showToast(channel ? T('toastInviteChannelCopied', channel) : T('toastInviteCopied'));
  }
  else if(action==='open-share-picker'){
    state.shareGroupId = el.dataset.id;
    const target = findMostRecentEntryForShare();
    state.sharePickMonth = target.m;
    state.sharePickChapter = target.c;
    render();
  }
  else if(action==='close-share-picker'){
    state.shareGroupId = null;
    render();
  }
  else if(action==='select-share-book'){
    const m = Number(el.dataset.month);
    state.sharePickMonth = m;
    const count = CHAPTER_COUNTS[m] || 1;
    if(state.sharePickChapter > count) state.sharePickChapter = count;
    render();
  }
  else if(action==='select-share-chapter'){
    state.sharePickChapter = Number(el.dataset.chapter);
    render();
  }
  else if(action==='open-image-viewer'){
    state.imageViewer = { msgId: el.dataset.msgid, index: Number(el.dataset.index) };
    render();
  }
  else if(action==='close-image-viewer'){
    state.imageViewer = null;
    render();
  }
  else if(action==='viewer-prev'){
    if(state.imageViewer) state.imageViewer.index = Math.max(0, state.imageViewer.index-1);
    render();
  }
  else if(action==='viewer-next'){
    if(state.imageViewer) state.imageViewer.index = state.imageViewer.index+1;
    render();
  }
  else if(action==='open-chapter-info'){
    state.chapterInfoOpen = true;
    render();
  }
  else if(action==='close-chapter-info'){
    state.chapterInfoOpen = false;
    render();
  }
  else if(action==='close-verse-menu'){
    state.verseActionMenu = null;
    render();
  }
  else if(action==='copy-verse'){
    const vm = state.verseActionMenu;
    if(!vm) return;
    const m = state.activeMonth, c = state.activeChapter;
    const verseTexts = chapterVerseTexts(m, c);
    const text = verseTexts[vm.n-1] || '';
    const ref = verseRef(m, c, vm.n);
    const copyText = text ? `${ref}\n${text}` : ref;
    try{
      navigator.clipboard && navigator.clipboard.writeText(copyText);
    }catch(err){}
    state.verseActionMenu = null;
    render();
    showToast(T('toastVerseCopied'));
  }
  else if(action==='open-page-share'){
    state.pageShare = { kind: el.dataset.kind, step:'menu' };
    render();
  }
  else if(action==='close-page-share'){
    state.pageShare = null;
    render();
  }
  else if(action==='page-share-back'){
    state.pageShare.step = 'menu';
    render();
  }
  else if(action==='page-share-to-chat'){
    state.pageShare.step = 'pickGroup';
    render();
  }
  else if(action==='page-share-pick-group'){
    const gid = el.dataset.id;
    const g = getGroup(gid);
    const kind = state.pageShare.kind;
    if(!g || state.shareBusy) return;
    state.pageShare = null;
    state.shareBusy = true;
    render();
    showToast(T('shareGenerating'));
    const key = ckey(state.activeMonth, state.activeChapter);
    const label = chapterLabel(bookName(state.activeMonth), state.activeChapter);
    const html = kind==='content' ? buildContentSnapshotHTML(key) : buildThoughtSnapshotHTML(key);
    const cap = T('sharedImageCap', kind, label);
    captureSnapshotImage(html).then(dataUrl=>{
      pushMyMessage(g, { id:'m-'+Date.now(), from:'나', isMe:true, type:'image', imageData:dataUrl, jTitle:cap });
      state.shareBusy = false;
      render();
      showToast(T('shareDone'));
    }).catch(()=>{
      state.shareBusy = false;
      render();
      showToast(T('shareFailed'));
    });
  }
  else if(action==='page-share-kakao'){
    const kind = state.pageShare.kind;
    if(state.shareBusy) return;
    state.pageShare = null;
    state.shareBusy = true;
    render();
    showToast(T('shareGenerating'));
    const key = ckey(state.activeMonth, state.activeChapter);
    const label = chapterLabel(bookName(state.activeMonth), state.activeChapter);
    const html = kind==='content' ? buildContentSnapshotHTML(key) : buildThoughtSnapshotHTML(key);
    const filename = `${kind}-${key}.png`;
    captureSnapshotImage(html).then(async dataUrl=>{
      const shared = await shareImageNative(dataUrl, filename, T('sharedImageCap', kind, label));
      state.shareBusy = false;
      render();
      if(!shared){
        triggerImageDownload(dataUrl, filename);
        showToast(T('toastShareUnsupported'));
      }
    }).catch(()=>{
      state.shareBusy = false;
      render();
      showToast(T('shareFailed'));
    });
  }
  else if(action==='page-share-download'){
    const kind = state.pageShare.kind;
    if(state.shareBusy) return;
    state.pageShare = null;
    state.shareBusy = true;
    render();
    showToast(T('shareGenerating'));
    const key = ckey(state.activeMonth, state.activeChapter);
    const html = kind==='content' ? buildContentSnapshotHTML(key) : buildThoughtSnapshotHTML(key);
    captureSnapshotImage(html).then(dataUrl=>{
      triggerImageDownload(dataUrl, `${kind}-${key}.png`);
      state.shareBusy = false;
      render();
      showToast(T('toastDownloadDone'));
    }).catch(()=>{
      state.shareBusy = false;
      render();
      showToast(T('shareFailed'));
    });
  }
  else if(action==='do-share'){
    const gid = el.dataset.id;
    const kind = el.dataset.kind;
    const g = getGroup(gid);
    if(!g || state.shareBusy) return;
    const shareM = state.sharePickMonth;
    const shareC = state.sharePickChapter;
    const key = ckey(shareM, shareC);
    const entry = journalData[key];
    const hasRecord = kind==='content' ? entryHasContentAnswers(entry)
      : kind==='thought' ? entryHasThoughtAnswers(entry)
      : entryHasContentAnswers(entry) || entryHasThoughtAnswers(entry);
    if(!hasRecord){
      showToast(T('toastNoRecordForShare'));
      return;
    }
    state.shareGroupId = null;
    state.shareBusy = true;
    render();
    showToast(T('shareGenerating'));
    const label = chapterLabel(bookName(shareM), shareC);

    if(kind==='both'){
      Promise.all([
        captureSnapshotImage(buildContentSnapshotHTML(key)),
        captureSnapshotImage(buildThoughtSnapshotHTML(key)),
      ]).then(([contentUrl, thoughtUrl])=>{
        pushMyMessage(g, {
          id:'m-'+Date.now(), from:'나', isMe:true, type:'image-pair',
          images:[
            { dataUrl:contentUrl, cap:T('sharedImageCap','content',label) },
            { dataUrl:thoughtUrl, cap:T('sharedImageCap','thought',label) },
          ],
          jTitle: T('shareBothName') + ' · ' + label,
        });
        state.shareBusy = false;
        render();
        showToast(T('shareDone'));
      }).catch(()=>{
        state.shareBusy = false;
        render();
        showToast(T('shareFailed'));
      });
      return;
    }

    const html = kind==='content' ? buildContentSnapshotHTML(key) : buildThoughtSnapshotHTML(key);
    const cap = T('sharedImageCap', kind, label);
    captureSnapshotImage(html).then(dataUrl=>{
      pushMyMessage(g, { id:'m-'+Date.now(), from:'나', isMe:true, type:'image', imageData:dataUrl, jTitle:cap });
      state.shareBusy = false;
      render();
      showToast(T('shareDone'));
    }).catch(()=>{
      state.shareBusy = false;
      render();
      showToast(T('shareFailed'));
    });
  }
  else if(action==='send-message'){
    const gid = el.dataset.id;
    const g = getGroup(gid);
    const inp = document.getElementById('chat-input');
    if(!g || !inp || !inp.value.trim()) return;
    pushMyMessage(g, {id:'m-'+Date.now(), from:'나', isMe:true, type:'text', text:inp.value.trim()});
    inp.value='';
    render();
  }
});

document.getElementById('shell').addEventListener('keydown', (e)=>{
  if(e.key==='Enter' && e.target && e.target.id==='chat-input'){
    const gid = e.target.dataset.id;
    const g = getGroup(gid);
    if(!g || !e.target.value.trim()) return;
    pushMyMessage(g, {id:'m-'+Date.now(), from:'나', isMe:true, type:'text', text:e.target.value.trim()});
    e.target.value='';
    render();
  }
});

/* input handling — no full re-render, so focus/cursor is preserved */
document.getElementById('shell').addEventListener('input', (e)=>{
  const t = e.target;
  if(t.dataset.signupField){
    // 가입 화면 입력값을 state.signupForm에 즉시 반영합니다. render()는 호출하지
    // 않습니다 — 여기서 다시 그리면 매 keystroke마다 input DOM이 재생성되어
    // 포커스/커서 위치를 잃기 때문입니다. 다른 요인(체크박스 토글 등)으로
    // render()가 호출될 때는 이 state 값이 value 속성으로 복원되어 입력값이
    // 유지됩니다.
    state.signupForm[t.dataset.signupField] = t.value;
    return;
  }
  if(t.dataset.deleteAccountField && state.deleteAccountModal){
    // 회원 탈퇴 모달의 비밀번호 입력도 같은 이유로 render() 없이 state만 갱신합니다.
    state.deleteAccountModal[t.dataset.deleteAccountField] = t.value;
    return;
  }
  const kind = t.dataset.kind;
  if(!kind || !state.activeMonth || !state.activeChapter) return;
  const entry = getEntry(ckey(state.activeMonth, state.activeChapter));
  if(kind==='content'){
    entry.content[t.dataset.qid] = t.value;
  } else if(kind==='thought'){
    entry.thought[t.dataset.field] = t.value;
  } else if(kind==='thanks'){
    entry.thought.thanks[Number(t.dataset.index)] = t.value;
  }
  markStreakProgress(entry);
  saveAnswersDebounced();
});

/* ---------------- verse long-press to copy ---------------- */
const VERSE_LONGPRESS_MS = 450;
const VERSE_LONGPRESS_MOVE_TOLERANCE = 10;
let versePressTimer = null;
let versePressStart = null;
function cancelVersePress(){
  clearTimeout(versePressTimer);
  versePressTimer = null;
  versePressStart = null;
}
document.getElementById('shell').addEventListener('pointerdown', (e)=>{
  const el = e.target.closest('.verse');
  if(!el || state.screen!=='daily' || state.activeTab!=='bible' || state.verseActionMenu) return;
  if(e.pointerType==='mouse' && e.button!==0) return;
  const n = Number(el.dataset.verseNum);
  if(!n) return;
  versePressStart = { x:e.clientX, y:e.clientY };
  clearTimeout(versePressTimer);
  versePressTimer = setTimeout(()=>{
    versePressTimer = null;
    if(navigator.vibrate){ try{ navigator.vibrate(10); }catch(err){} }
    state.verseActionMenu = { n };
    render();
  }, VERSE_LONGPRESS_MS);
});
document.getElementById('shell').addEventListener('pointermove', (e)=>{
  if(!versePressTimer || !versePressStart) return;
  const dx = e.clientX - versePressStart.x, dy = e.clientY - versePressStart.y;
  if(Math.hypot(dx, dy) > VERSE_LONGPRESS_MOVE_TOLERANCE) cancelVersePress();
});
document.getElementById('shell').addEventListener('pointerup', cancelVersePress);
document.getElementById('shell').addEventListener('pointercancel', cancelVersePress);
document.getElementById('shell').addEventListener('contextmenu', (e)=>{
  if(e.target.closest('.verse')) e.preventDefault();
});

initAuthGate();
loadAll();
