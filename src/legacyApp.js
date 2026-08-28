import kjvData from './data/kjv.json';
import thKjvData from './data/th_kjv.json';

/* ---------------- data ---------------- */
const BOOKS = [
  { m:1, ko:'창세기', en:'Genesis', ja:'創世記', th:'ปฐมกาล' },
  { m:2, ko:'출애굽기', en:'Exodus', ja:'出エジプト記', th:'อพยพ' },
  { m:3, ko:'레위기', en:'Leviticus', ja:'レビ記', th:'เลวีนิติ' },
  { m:4, ko:'민수기', en:'Numbers', ja:'民数記', th:'กันดารวิถี' },
  { m:5, ko:'신명기', en:'Deuteronomy', ja:'申命記', th:'เฉลยธรรมบัญญัติ' },
];
function bookDisplayName(b){
  return b[state.lang] || b.en || b.ko;
}
function bookName(m){
  const b = BOOKS.find(x=>x.m===m);
  if(!b) return '';
  return bookDisplayName(b);
}
function chapterLabel(name, c){
  if(state.lang==='en') return `${name} ${c}`;
  if(state.lang==='ja') return `${name} ${c}章`;
  if(state.lang==='th') return `${name} บทที่ ${c}`;
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

const CONTENT_QUESTIONS = [
  {id:'q1', v:1, ref:'출 8:1', text:'출 8:1에 따르면, 하나님이 하실 일을 누구에게 말씀하실까?'},
  {id:'q2', v:2, ref:'출 8:2', text:'출 8:2에 따르면, 하나님이 이집트에서 백성들을 내보내기 위해 내리신 재앙은 무엇일까?'},
  {id:'q3', v:6, ref:'출 8:6', text:'출 8:6에서 아론이 지팡이를 들었을 때 애굽 온 땅에 나타난 것은 무엇일까?'},
  {id:'q4', v:15, ref:'출 8:15', text:'출 8:15에 따르면, 재앙이 그친 것을 본 바로의 마음은 어떻게 되었을까?'},
  {id:'q5', v:19, ref:'출 8:19', text:'출 8:19에서 요술사들이 재앙을 보고 바로에게 무엇이라고 말했을까?'},
];

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

function getAskQuestions(){
  if(state.lang==='en') return ASK_QUESTIONS_EN;
  if(state.lang==='ja') return ASK_QUESTIONS_JA;
  if(state.lang==='th') return ASK_QUESTIONS_TH;
  return ASK_QUESTIONS;
}

/* ---------------- i18n ---------------- */
const STRINGS = {
  ko:{
    yearTag:'Bible Journaling', yearSub:'한 달에 한 권, 말씀과 함께 걷는 열두 달',
    buyLabel:'구매하기', todayNavTitle:'오늘의 묵상으로 이동', groupsNavTitle:'함께 나누기',
    loginWelcome:'Welcome back', loginTitle:'말씀 묵상 저널',
    emailLabel:'이메일', pwLabel:'비밀번호', emailPh:'you@example.com', pwPh:'비밀번호를 입력하세요',
    loginBtn:'로그인', or:'또는', googleLogin:'구글 계정으로 로그인하기', kakaoLogin:'카카오 계정으로 로그인하기', signup:'회원가입',
    purchaseTitle:(name)=>`${name} 성경저널링노트`,
    purchaseSub:'말씀 읽기, 내용 질문, 묵상 질문이 모두 담긴 저널을 구매하고 오늘의 말씀부터 시작해 보세요.',
    yearPlanName:'1년 전체 이용권', yearPlanBadge:'추천', yearPlanDesc:'12개월 저널을 한 번에', yearPlanPrice:'₩19,000',
    monthPlanName:'1권 노트 구매', monthPlanDesc:(name)=>`${name} 저널만 이용`, monthPlanPrice:'₩2,000',
    cancel:'취소', buyBtn:'구매하기',
    settingsTitle:'설정', fontSizeLabel:'글자 크기', fontSmall:'작게', fontDefault:'기본', fontLarge:'크게',
    langLabel:'언어', langKo:'한국어', langEn:'English', langJa:'日本語', langTh:'ไทย',
    languageMenu:'언어 설정', languageModalTitle:'언어 선택',
    themeLabel:'다크 모드', themeLight:'라이트', themeDark:'다크',
    signupTitle:'회원가입', signupSub:'가입에 필요한 정보를 입력해 주세요.',
    nameLabel:'이름', namePh:'실명을 입력해 주세요',
    birthLabel:'생년월일', birthPh:'YYYY-MM-DD',
    usernameLabel:'아이디', usernamePh:'로그인에 사용할 아이디',
    nicknameLabel:'닉네임', nicknamePh:'그룹방에 표시될 닉네임',
    signupTermsLabel:'서비스 이용약관 동의 (필수)',
    signupTermsBody:'말씀 묵상 저널이 제공하는 성경 읽기, 묵상 질문 기록, 그룹 나눔 기능 이용을 위한 기본 약관입니다. 부정 이용 방지를 위해 필요한 경우 서비스 이용이 제한될 수 있습니다.',
    signupConsentLabel:'개인정보 수집 및 이용에 동의합니다 (필수)',
    signupConsentBody:'수집 항목: 이름, 생년월일, 아이디, 닉네임, 비밀번호(암호화 저장)\n수집·이용 목적: 회원 식별 및 로그인, 서비스 제공\n보유 기간: 회원 탈퇴 시까지\n동의를 거부하실 수 있으나, 거부 시 회원가입이 제한됩니다.',
    viewDetail:'보기', hideDetail:'접기',
    submitSignup:'가입하기',
    toastFillAll:'모든 항목을 입력해 주세요', toastNeedConsent:'개인정보 수집에 동의해 주세요',
    toastSignupDone:'회원가입이 완료되었습니다',
    notif:'알림 설정', contact:'문의하기', logout:'로그아웃', donate:'후원하기',
    dayUnit:'일', snapNoAnswerContent:'아직 작성한 답이 없어요', snapNoAnswerThought:'아직 작성하지 않았어요', snapNoQuestionSelected:'선택한 질문이 없어요',
    notifTitle:'알림 설정', notifSub:'요일을 선택해서 묵상 알림 시간을 설정해 보세요.',
    dayMon:'월요일', dayTue:'화요일', dayWed:'수요일', dayThu:'목요일', dayFri:'금요일', daySat:'토요일', daySun:'일요일',
    notifOff:'알림 꺼짐',
    notifOnLabel:'알림 켜기',
    notifTimeLabel:'알림 시간',
    notifSave:'저장',
    notifDelete:'알림 끄기',
    contactTitle:'문의하기',
    guideMenu:'사용가이드',
    guideTitle:'사용가이드',
    guideEmptyTitle:'준비 중이에요',
    guideEmptyBody:'사용가이드 콘텐츠는 곧 추가될 예정이에요. 조금만 기다려 주세요.',
    contactBody:'말씀 묵상 저널을 이용하시다가 궁금한 점이나 불편한 점이 있으시면 언제든지 편하게 문의해 주세요. 최대한 빠르게 답변드릴게요.',
    contactEmailBtn:'이메일로 문의하기',
    contactEmailNote:'버튼을 누르면 기본 이메일 앱이 열리고, 받는 사람이 자동으로 입력돼요.',
    contactMailSubject:'[말씀 묵상 저널] 문의드립니다',
    contactMailBody:'안녕하세요, 말씀 묵상 저널을 이용하다 문의드립니다.\n\n문의 내용:\n',
    donateModalTitle:'바이블 저널링 후원하기',
    donateDesc:'바이블 저널링 서비스의 지속적인 운영과 개발을 응원해 주세요. 소중한 후원금은 서비스 개선 및 서버 유지비로 사용됩니다. 감사합니다 🤍',
    donateBankLabel:'은행', donateHolderLabel:'예금주', donateAccountLabel:'계좌번호',
    donateBankName:'토스뱅크', donateHolderName:'박유나', donateAccountNumber:'1002-7159-7116',
    copyAccountBtn:'계좌번호 복사하기', copyAccountDone:'복사 완료! ✓',
    toastAccountCopied:'계좌번호가 복사되었습니다!',
    todayWord:'오늘', moveToday:'오늘로 이동', calLegend:'작성한 묵상 기록이 있는 날',
    calTitle:(name)=>`${name} 저널 캘린더`, calCap:'2026 · Bible Journal',
    chapterGridSub:'읽고 싶은 장을 선택해 주세요.',
    dailyCap:(name)=>`${name}의 말씀 여정`,
    navBible:'성경', navContent:'내용 질문 기록', navThought:'생각 질문 기록',
    todayReading:'오늘의 말씀', chapterNote:'본문은 이해를 돕기 위한 요약 예시입니다.',
    chapterInfoBtn:'배경 설명 보기',
    chapterInfoTitle:(book)=>`${book} 배경 설명`,
    chapterInfoEmptyTitle:'준비 중이에요',
    chapterInfoEmptyBody:'이 책의 배경 설명은 곧 추가될 예정이에요.',
    copyVerseBtn:'구절 복사하기',
    toastVerseCopied:'구절이 복사되었습니다.',
    qPlaceholder:'생각한 답을 적어보세요',
    verseLabel:'나에게 주신 말씀 한 구절', versePh:'예: 출애굽기 8:10',
    passageLabel:'본문 내용', passagePh:'오늘 본문의 흐름을 요약해 보세요',
    godIsLabel:'하나님은 이런 분', godIsPh:'본문에서 발견한 하나님의 성품',
    askLabel:'하나님께 물어보기', askPlaceholderQ:'질문을 선택해 주세요',
    heardLabel:'들은 음성 기록하기', heardPh:'묵상 중 들려온 마음의 음성을 적어보세요',
    appLabel:'삶으로의 적용', appPh:'오늘 삶에서 실천할 한 가지',
    prayerLabel:'기도제목', prayerPh:'오늘의 기도제목을 적어보세요',
    thanksLabel:'오늘의 감사', thanksPh:(i)=>`감사한 일 ${i}`, addThanks:'감사한 일 추가',
    toastLogin:'로그인되었습니다', toastLogout:'로그아웃되었습니다',
    toastGoogleFailed:'구글 로그인에 실패했어요. 다시 시도해 주세요',
    toastGoogleCancelled:'구글 로그인을 취소했어요',
    toastPopupBlocked:'팝업이 차단되어 로그인할 수 없어요. 팝업 차단을 해제한 뒤 다시 시도해 주세요',
    toastNetworkError:'네트워크 연결을 확인해 주세요',
    toastLogoutFailed:'로그아웃에 실패했어요. 다시 시도해 주세요',
    toastKakaoFailed:'카카오 로그인에 실패했어요. 다시 시도해 주세요',
    toastEmailLoginFailed:'이메일 또는 비밀번호가 올바르지 않아요',
    toastEmailInUse:'이미 가입된 이메일이에요',
    toastWeakPassword:'비밀번호는 6자 이상으로 입력해 주세요',
    toastSignupFailed:'회원가입에 실패했어요. 다시 시도해 주세요',
    toastFirebaseNotSet:'Firebase 설정이 아직 연결되지 않았어요 (firebaseConfig를 입력해 주세요)',
    nicknameModalTitle:'닉네임 수정', saveBtn:'저장',
    toastNicknameEmpty:'닉네임을 입력해 주세요',
    toastNicknameSaved:'닉네임이 변경되었습니다',
    toastNicknameSaveFailed:'닉네임 저장에 실패했어요. 다시 시도해 주세요',
    avatarModalTitle:'프로필 사진 변경', avatarModalSub:'선택한 사진으로 프로필 이미지를 바꿀까요?',
    toastAvatarInvalidType:'이미지 파일만 선택할 수 있어요',
    toastAvatarSaved:'프로필 사진이 변경되었습니다',
    toastAvatarSaveFailed:'프로필 사진 업로드에 실패했어요. 다시 시도해 주세요',
    toastAvatarTooLarge:'이미지 용량이 너무 커요. 더 작은 사진으로 다시 시도해 주세요',
    toastAvatarPermissionDenied:'프로필 사진을 저장할 권한이 없어요. 다시 로그인한 뒤 시도해 주세요',
    toastAvatarLoginRequired:'로그인 정보가 만료됐어요. 다시 로그인한 뒤 시도해 주세요',
    toastPurchaseYear:'1년 전체 이용권 구매가 완료되었습니다', toastPurchaseMonth:(name)=>`${name} 노트 구매가 완료되었습니다`,
    toastNeedPurchase:(name)=>`${name} 저널을 먼저 구매해 주세요`,
    sharePickTitle:'무엇을 공유할까요?', sharePickSub:'오늘 작성한 기록을 이미지로 만들어 공유해요.',
    shareContentName:'내용 질문 기록', shareContentDesc:'오늘 본문에 대한 질문과 답',
    shareThoughtName:'생각 질문 기록', shareThoughtDesc:'오늘의 묵상과 기도, 감사',
    shareBothName:'둘 다 공유', shareBothDesc:'내용 질문과 생각 질문 기록을 함께 보내요',
    shareGenerating:'이미지를 만들고 있어요...', shareDone:'묵상 기록을 공유했어요', shareFailed:'이미지를 만들지 못했어요. 다시 시도해 주세요',
    sharedImageCap:(kind,date)=>`${kind==='content'?'내용 질문 기록':'생각 질문 기록'} · ${date}`,
    pageShareBtn:'공유하기',
    pageShareTitle:'어디에 공유할까요?',
    shareToChatName:'앱 내 채팅방에 공유',
    shareToChatDesc:'함께 나누기 채팅방으로 보내요',
    shareToKakaoName:'카카오톡에 공유',
    shareToKakaoDesc:'카카오톡 등 설치된 앱으로 공유해요',
    shareDownloadName:'이미지로 다운로드',
    shareDownloadDesc:'기기에 이미지 파일로 저장해요',
    pickGroupTitle:'보낼 채팅방을 선택하세요',
    noGroupsYet:'아직 만든 채팅방이 없어요',
    toastShareUnsupported:'이 기기·브라우저에서는 바로 공유가 지원되지 않아 이미지를 다운로드했어요. 카카오톡에서 직접 첨부해 주세요.',
    toastDownloadDone:'이미지가 다운로드되었어요',
    groupInfoParticipants:(n)=>`참여자 ${n}명`,
    leaveGroupBtn:'채팅방 나가기',
    leaveConfirmTitle:'채팅방에서 나가시겠어요?',
    leaveConfirmBody:'나가면 이 채팅방의 메시지와 멤버 목록에 더 이상 접근할 수 없습니다.',
    leaveConfirmBtn:'채팅방 나가기',
    toastLeftGroup:'채팅방에서 나갔어요',
    toastLeaveFailed:'채팅방 나가기에 실패했어요. 다시 시도해 주세요',
    toastMembersLoadFailed:'참여자 정보를 불러오지 못했어요',
    memberFallbackName:'팀원', youTag:'(나)', loadingLabel:'불러오는 중...',
    groupManageTitle:'채팅방 관리',
    roomNameLabel:'채팅방 이름',
    renameRoomTitle:'채팅방 이름 변경',
    changeRoomPhotoTitle:'채팅방 프로필 사진 변경',
    ownerTag:'방장',
    streakLabel:'연속 기록',
    streakDaysSuffix:(n)=>`${n}일 연속 기록`,
    toastRoomNameEmpty:'채팅방 이름을 입력해 주세요',
    toastRoomNameTooLong:'채팅방 이름은 30자 이내로 입력해 주세요',
    toastRoomNameSaved:'채팅방 이름이 변경되었습니다',
    toastRoomNameSaveFailed:'채팅방 이름 저장에 실패했어요. 다시 시도해 주세요',
    toastRoomPhotoSaved:'채팅방 프로필 사진이 변경되었습니다',
    toastRoomPhotoSaveFailed:'채팅방 프로필 사진 업로드에 실패했어요. 다시 시도해 주세요',
    toastRoomGone:'더 이상 존재하지 않는 채팅방이에요',
  },
  en:{
    yearTag:'Bible Journaling', yearSub:'One journal a month, twelve months walking with the Word',
    buyLabel:'Unlock', todayNavTitle:"Go to today's devotion", groupsNavTitle:'Share together',
    loginWelcome:'Welcome back', loginTitle:'Bible Devotion Journal',
    emailLabel:'Email', pwLabel:'Password', emailPh:'you@example.com', pwPh:'Enter your password',
    loginBtn:'Log in', or:'or', googleLogin:'Continue with Google', kakaoLogin:'Continue with Kakao', signup:'Sign up',
    purchaseTitle:(name)=>`${name} Journal`,
    purchaseSub:'Unlock daily readings, content questions, and reflection prompts — and start with today.',
    yearPlanName:'Full year pass', yearPlanBadge:'Best value', yearPlanDesc:'All 12 monthly journals at once', yearPlanPrice:'₩19,000',
    monthPlanName:'Single book', monthPlanDesc:(name)=>`${name} journal only`, monthPlanPrice:'₩2,000',
    cancel:'Cancel', buyBtn:'Unlock',
    settingsTitle:'Settings', fontSizeLabel:'Text size', fontSmall:'Small', fontDefault:'Default', fontLarge:'Large',
    langLabel:'Language', langKo:'한국어', langEn:'English', langJa:'日本語', langTh:'ไทย',
    languageMenu:'Language', languageModalTitle:'Select language',
    themeLabel:'Dark mode', themeLight:'Light', themeDark:'Dark',
    signupTitle:'Sign up', signupSub:'Please fill in the details below to create your account.',
    nameLabel:'Full name', namePh:'Enter your legal name',
    birthLabel:'Date of birth', birthPh:'YYYY-MM-DD',
    usernameLabel:'Username', usernamePh:'Used to log in',
    nicknameLabel:'Nickname', nicknamePh:'Shown in group rooms',
    signupTermsLabel:'I agree to the Terms of Service (required)',
    signupTermsBody:"These are the basic terms for using Bible Journal's reading, reflection, and group-sharing features. Access may be restricted if misuse is detected.",
    signupConsentLabel:'I agree to the collection and use of my personal information (required)',
    signupConsentBody:'Items collected: name, date of birth, username, nickname, password (encrypted)\nPurpose: account identification, login, and providing the service\nRetention: until account deletion\nYou may decline, but sign-up will be limited if you do.',
    viewDetail:'View', hideDetail:'Hide',
    submitSignup:'Create account',
    toastFillAll:'Please fill in every field', toastNeedConsent:'Please agree to the privacy consent',
    toastSignupDone:'Sign-up complete',
    notif:'Notifications', contact:'Contact us', logout:'Log out', donate:'Support us',
    dayUnit:'d', snapNoAnswerContent:'No answer written yet', snapNoAnswerThought:'Not written yet', snapNoQuestionSelected:'No question selected',
    notifTitle:'Notifications', notifSub:'Choose a day to set a reflection reminder time.',
    dayMon:'Monday', dayTue:'Tuesday', dayWed:'Wednesday', dayThu:'Thursday', dayFri:'Friday', daySat:'Saturday', daySun:'Sunday',
    notifOff:'Off',
    notifOnLabel:'Turn on reminder',
    notifTimeLabel:'Reminder time',
    notifSave:'Save',
    notifDelete:'Turn off',
    contactTitle:'Contact us',
    guideMenu:'Usage guide',
    guideTitle:'Usage guide',
    guideEmptyTitle:'Coming soon',
    guideEmptyBody:"Guide content will be added here soon. Please check back later.",
    contactBody:"If you have any questions or run into issues while using Bible Journal, feel free to reach out anytime. We'll get back to you as soon as we can.",
    contactEmailBtn:'Email us',
    contactEmailNote:'Tapping this opens your default mail app with the recipient already filled in.',
    contactMailSubject:'[Bible Journal] Support request',
    contactMailBody:'Hello, I have a question about Bible Journal.\n\nDetails:\n',
    donateModalTitle:'Support Bible Journal',
    donateDesc:"Your support helps us keep Bible Journal running and growing. Every gift goes toward improving the service and covering server costs. Thank you 🤍",
    donateBankLabel:'Bank', donateHolderLabel:'Account holder', donateAccountLabel:'Account number',
    donateBankName:'Toss Bank', donateHolderName:'Yuna Park', donateAccountNumber:'1002-7159-7116',
    copyAccountBtn:'Copy account number', copyAccountDone:'Copied! ✓',
    toastAccountCopied:'Account number copied!',
    todayWord:'Today', moveToday:'Jump to today', calLegend:'Days with a saved reflection',
    calTitle:(name)=>`${name} calendar`, calCap:'2026 · Bible Journal',
    chapterGridSub:'Choose a chapter to read.',
    dailyCap:(name)=>`${name} journey`,
    navBible:'Bible', navContent:'Content Qs', navThought:'Reflection',
    todayReading:"Today's reading", chapterNote:'This passage is a summarized sample for demo purposes.',
    chapterInfoBtn:'View background',
    chapterInfoTitle:(book)=>`Background: ${book}`,
    chapterInfoEmptyTitle:'Coming soon',
    chapterInfoEmptyBody:"Background notes for this book will be added soon.",
    copyVerseBtn:'Copy Verse',
    toastVerseCopied:'Verse copied.',
    qPlaceholder:'Write your answer here',
    verseLabel:'A verse given to me', versePh:'e.g. Exodus 8:10',
    passageLabel:'Passage summary', passagePh:'Summarize the flow of today\u2019s passage',
    godIsLabel:'Who God is here', godIsPh:'A trait of God you noticed in the passage',
    askLabel:'Asking God', askPlaceholderQ:'Choose a question',
    heardLabel:'What I heard', heardPh:'Write down what came to mind during reflection',
    appLabel:'Living it out', appPh:'One small step for today',
    prayerLabel:'Prayer requests', prayerPh:"Write today's prayer requests",
    thanksLabel:"Today's gratitude", thanksPh:(i)=>`Gratitude ${i}`, addThanks:'Add gratitude',
    toastLogin:'Logged in', toastLogout:'Logged out',
    toastGoogleFailed:'Google sign-in failed. Please try again',
    toastGoogleCancelled:'Google sign-in was cancelled',
    toastPopupBlocked:'Sign-in popup was blocked. Please allow popups and try again',
    toastNetworkError:'Please check your network connection',
    toastLogoutFailed:'Sign-out failed. Please try again',
    toastKakaoFailed:'Kakao sign-in failed. Please try again',
    toastEmailLoginFailed:'Incorrect email or password',
    toastEmailInUse:'This email is already registered',
    toastWeakPassword:'Password must be at least 6 characters',
    toastSignupFailed:'Sign-up failed. Please try again',
    toastFirebaseNotSet:'Firebase is not configured yet (please add your firebaseConfig)',
    nicknameModalTitle:'Edit nickname', saveBtn:'Save',
    toastNicknameEmpty:'Please enter a nickname',
    toastNicknameSaved:'Nickname updated',
    toastNicknameSaveFailed:'Could not save your nickname. Please try again',
    avatarModalTitle:'Change profile photo', avatarModalSub:'Use this photo as your new profile picture?',
    toastAvatarInvalidType:'Please choose an image file',
    toastAvatarSaved:'Profile photo updated',
    toastAvatarSaveFailed:'Could not upload the photo. Please try again',
    toastAvatarTooLarge:'That image is too large. Please try a smaller photo',
    toastAvatarPermissionDenied:"You don't have permission to save this photo. Please sign in again and retry",
    toastAvatarLoginRequired:'Your session expired. Please sign in again and retry',
    toastPurchaseYear:'Full year pass unlocked', toastPurchaseMonth:(name)=>`${name} journal unlocked`,
    toastNeedPurchase:(name)=>`Unlock the ${name} journal first`,
    sharePickTitle:'What would you like to share?', sharePickSub:"Turn today's entry into an image and share it.",
    shareContentName:'Content Questions', shareContentDesc:"Today's passage questions and answers",
    shareThoughtName:'Reflection', shareThoughtDesc:"Today's reflection, prayer, and gratitude",
    shareBothName:'Share both', shareBothDesc:'Send both content and reflection records together',
    shareGenerating:'Creating image...', shareDone:'Shared your journal entry', shareFailed:'Could not create the image. Please try again',
    sharedImageCap:(kind,date)=>`${kind==='content'?'Content Questions':'Reflection'} · ${date}`,
    pageShareBtn:'Share',
    pageShareTitle:'Where would you like to share?',
    shareToChatName:'Share to an in-app chat room',
    shareToChatDesc:'Send it to a Share Together chat room',
    shareToKakaoName:'Share to KakaoTalk',
    shareToKakaoDesc:'Share via KakaoTalk or any installed app',
    shareDownloadName:'Download as image',
    shareDownloadDesc:'Save as an image file on your device',
    pickGroupTitle:'Choose a chat room to send to',
    noGroupsYet:"You haven't created a chat room yet",
    toastShareUnsupported:"Direct sharing isn't supported on this device/browser, so the image was downloaded instead. Please attach it in KakaoTalk yourself.",
    toastDownloadDone:'Image downloaded',
    groupInfoParticipants:(n)=>`${n} participant${n===1?'':'s'}`,
    leaveGroupBtn:'Leave chat room',
    leaveConfirmTitle:'Leave this chat room?',
    leaveConfirmBody:"Once you leave, you won't be able to access this chat room's messages or member list anymore.",
    leaveConfirmBtn:'Leave chat room',
    toastLeftGroup:'You left the chat room',
    toastLeaveFailed:'Failed to leave the chat room. Please try again',
    toastMembersLoadFailed:'Could not load participants',
    memberFallbackName:'Member', youTag:'(You)', loadingLabel:'Loading...',
    groupManageTitle:'Chat room settings',
    roomNameLabel:'Chat room name',
    renameRoomTitle:'Rename chat room',
    changeRoomPhotoTitle:'Change chat room photo',
    ownerTag:'Owner',
    streakLabel:'Streak',
    streakDaysSuffix:(n)=>`${n}-day streak`,
    toastRoomNameEmpty:'Please enter a chat room name',
    toastRoomNameTooLong:'Chat room names must be 30 characters or fewer',
    toastRoomNameSaved:'Chat room name updated',
    toastRoomNameSaveFailed:'Could not save the chat room name. Please try again',
    toastRoomPhotoSaved:'Chat room photo updated',
    toastRoomPhotoSaveFailed:'Could not upload the chat room photo. Please try again',
    toastRoomGone:'This chat room no longer exists',
  },
  ja:{
    yearTag:'Bible Journaling', yearSub:'月に1冊、御言葉と共に歩む12か月',
    buyLabel:'購入する', todayNavTitle:'今日の黙想へ移動', groupsNavTitle:'一緒に分かち合う',
    loginWelcome:'Welcome back', loginTitle:'聖書黙想ジャーナル',
    emailLabel:'メールアドレス', pwLabel:'パスワード', emailPh:'you@example.com', pwPh:'パスワードを入力してください',
    loginBtn:'ログイン', or:'または', googleLogin:'Googleアカウントでログイン', kakaoLogin:'カカオアカウントでログイン', signup:'新規登録',
    purchaseTitle:(name)=>`${name} 聖書ジャーナリングノート`,
    purchaseSub:'聖書を読み、内容の質問と黙想の質問がすべて含まれたジャーナルを購入して、今日の御言葉から始めましょう。',
    yearPlanName:'年間全巻利用券', yearPlanBadge:'おすすめ', yearPlanDesc:'12か月分のジャーナルを一度に', yearPlanPrice:'₩19,000',
    monthPlanName:'1冊ノート購入', monthPlanDesc:(name)=>`${name}ジャーナルのみ利用`, monthPlanPrice:'₩2,000',
    cancel:'キャンセル', buyBtn:'購入する',
    settingsTitle:'設定', fontSizeLabel:'文字サイズ', fontSmall:'小', fontDefault:'標準', fontLarge:'大',
    langLabel:'言語', langKo:'한국어', langEn:'English', langJa:'日本語', langTh:'ไทย',
    languageMenu:'言語設定', languageModalTitle:'言語を選択',
    themeLabel:'ダークモード', themeLight:'ライト', themeDark:'ダーク',
    signupTitle:'新規登録', signupSub:'登録に必要な情報を入力してください。',
    nameLabel:'氏名', namePh:'本名を入力してください',
    birthLabel:'生年月日', birthPh:'YYYY-MM-DD',
    usernameLabel:'ユーザーID', usernamePh:'ログインに使用するID',
    nicknameLabel:'ニックネーム', nicknamePh:'グループルームに表示される名前',
    signupTermsLabel:'利用規約に同意する(必須)',
    signupTermsBody:'聖書黙想ジャーナルが提供する聖書の閲覧、黙想の質問記録、グループ共有機能を利用するための基本規約です。不正利用防止のため、必要な場合はサービスの利用が制限されることがあります。',
    signupConsentLabel:'個人情報の収集および利用に同意します(必須)',
    signupConsentBody:'収集項目: 氏名、生年月日、ユーザーID、ニックネーム、パスワード(暗号化保存)\n収集・利用目的: 会員識別およびログイン、サービス提供\n保有期間: 退会時まで\n同意を拒否することができますが、拒否した場合は新規登録が制限されます。',
    viewDetail:'表示', hideDetail:'閉じる',
    submitSignup:'登録する',
    toastFillAll:'すべての項目を入力してください', toastNeedConsent:'個人情報の収集に同意してください',
    toastSignupDone:'登録が完了しました',
    notif:'通知設定', contact:'お問い合わせ', logout:'ログアウト', donate:'応援する',
    dayUnit:'日', snapNoAnswerContent:'まだ入力した答えがありません', snapNoAnswerThought:'まだ記入していません', snapNoQuestionSelected:'選択した質問がありません',
    notifTitle:'通知設定', notifSub:'曜日を選んで黙想の通知時間を設定してみましょう。',
    dayMon:'月曜日', dayTue:'火曜日', dayWed:'水曜日', dayThu:'木曜日', dayFri:'金曜日', daySat:'土曜日', daySun:'日曜日',
    notifOff:'通知オフ',
    notifOnLabel:'通知をオンにする',
    notifTimeLabel:'通知時間',
    notifSave:'保存',
    notifDelete:'通知を切る',
    contactTitle:'お問い合わせ',
    guideMenu:'使い方ガイド',
    guideTitle:'使い方ガイド',
    guideEmptyTitle:'準備中です',
    guideEmptyBody:'使い方ガイドのコンテンツは近日公開予定です。もうしばらくお待ちください。',
    contactBody:'聖書黙想ジャーナルをご利用中に気になる点や不便な点がございましたら、いつでもお気軽にお問い合わせください。できるだけ早くご返信いたします。',
    contactEmailBtn:'メールで問い合わせる',
    contactEmailNote:'ボタンを押すと標準のメールアプリが開き、宛先が自動的に入力されます。',
    contactMailSubject:'[聖書黙想ジャーナル] お問い合わせ',
    contactMailBody:'こんにちは、聖書黙想ジャーナルについてお問い合わせいたします。\n\nお問い合わせ内容:\n',
    donateModalTitle:'バイブルジャーナリングを応援する',
    donateDesc:'バイブルジャーナリングサービスの継続的な運営と開発を応援してください。いただいたご支援は、サービス改善とサーバー維持費に大切に使わせていただきます。ありがとうございます 🤍',
    donateBankLabel:'銀行', donateHolderLabel:'口座名義', donateAccountLabel:'口座番号',
    donateBankName:'トスバンク', donateHolderName:'パク・ユナ', donateAccountNumber:'1002-7159-7116',
    copyAccountBtn:'口座番号をコピーする', copyAccountDone:'コピー完了! ✓',
    toastAccountCopied:'口座番号がコピーされました!',
    todayWord:'今日', moveToday:'今日に移動', calLegend:'黙想記録がある日',
    calTitle:(name)=>`${name} ジャーナルカレンダー`, calCap:'2026 · Bible Journal',
    chapterGridSub:'読みたい章を選んでください。',
    dailyCap:(name)=>`${name}の御言葉の旅`,
    navBible:'聖書', navContent:'内容質問記録', navThought:'黙想質問記録',
    todayReading:'今日の御言葉', chapterNote:'本文は理解を助けるための要約例です。',
    chapterInfoBtn:'背景説明を見る',
    chapterInfoTitle:(book)=>`${book} 背景説明`,
    chapterInfoEmptyTitle:'準備中です',
    chapterInfoEmptyBody:'この書の背景説明は近日追加予定です。',
    copyVerseBtn:'聖句をコピー',
    toastVerseCopied:'聖句をコピーしました。',
    qPlaceholder:'考えた答えを書いてみましょう',
    verseLabel:'私に与えられた御言葉一節', versePh:'例: 出エジプト記8:10',
    passageLabel:'本文の内容', passagePh:'今日の本文の流れをまとめてみましょう',
    godIsLabel:'神はこのような方', godIsPh:'本文から見つけた神の性質',
    askLabel:'神に尋ねる', askPlaceholderQ:'質問を選んでください',
    heardLabel:'聞こえた声を記録する', heardPh:'黙想中に心に響いた声を書いてみましょう',
    appLabel:'生活への適用', appPh:'今日の生活で実践すること一つ',
    prayerLabel:'祈りの課題', prayerPh:'今日の祈りの課題を書いてみましょう',
    thanksLabel:'今日の感謝', thanksPh:(i)=>`感謝なこと ${i}`, addThanks:'感謝を追加',
    toastLogin:'ログインしました', toastLogout:'ログアウトしました',
    toastGoogleFailed:'Googleログインに失敗しました。もう一度お試しください',
    toastGoogleCancelled:'Googleログインをキャンセルしました',
    toastPopupBlocked:'ポップアップがブロックされてログインできません。ポップアップブロックを解除して再度お試しください',
    toastNetworkError:'ネットワーク接続をご確認ください',
    toastLogoutFailed:'ログアウトに失敗しました。もう一度お試しください',
    toastKakaoFailed:'カカオログインに失敗しました。もう一度お試しください',
    toastEmailLoginFailed:'メールアドレスまたはパスワードが正しくありません',
    toastEmailInUse:'すでに登録されているメールアドレスです',
    toastWeakPassword:'パスワードは6文字以上で入力してください',
    toastSignupFailed:'登録に失敗しました。もう一度お試しください',
    toastFirebaseNotSet:'Firebaseの設定がまだ連携されていません(firebaseConfigを入力してください)',
    nicknameModalTitle:'ニックネーム編集', saveBtn:'保存',
    toastNicknameEmpty:'ニックネームを入力してください',
    toastNicknameSaved:'ニックネームが変更されました',
    toastNicknameSaveFailed:'ニックネームの保存に失敗しました。もう一度お試しください',
    avatarModalTitle:'プロフィール写真の変更', avatarModalSub:'選択した写真をプロフィール画像に変更しますか?',
    toastAvatarInvalidType:'画像ファイルのみ選択できます',
    toastAvatarSaved:'プロフィール写真が変更されました',
    toastAvatarSaveFailed:'プロフィール写真のアップロードに失敗しました。もう一度お試しください',
    toastAvatarTooLarge:'画像サイズが大きすぎます。もっと小さい写真でもう一度お試しください',
    toastAvatarPermissionDenied:'プロフィール写真を保存する権限がありません。再度ログインしてからお試しください',
    toastAvatarLoginRequired:'ログイン情報の有効期限が切れました。再度ログインしてからお試しください',
    toastPurchaseYear:'年間全巻利用券の購入が完了しました', toastPurchaseMonth:(name)=>`${name}ノートの購入が完了しました`,
    toastNeedPurchase:(name)=>`先に${name}ジャーナルを購入してください`,
    sharePickTitle:'何を共有しますか?', sharePickSub:'今日書いた記録を画像にして共有します。',
    shareContentName:'内容質問記録', shareContentDesc:'今日の本文についての質問と答え',
    shareThoughtName:'黙想質問記録', shareThoughtDesc:'今日の黙想と祈り、感謝',
    shareBothName:'両方共有', shareBothDesc:'内容質問と黙想質問の記録を一緒に送ります',
    shareGenerating:'画像を作成しています...', shareDone:'黙想記録を共有しました', shareFailed:'画像を作成できませんでした。もう一度お試しください',
    sharedImageCap:(kind,date)=>`${kind==='content'?'内容質問記録':'黙想質問記録'} · ${date}`,
    pageShareBtn:'共有する',
    pageShareTitle:'どこに共有しますか?',
    shareToChatName:'アプリ内チャットルームに共有',
    shareToChatDesc:'「一緒に分かち合う」チャットルームに送ります',
    shareToKakaoName:'カカオトークに共有',
    shareToKakaoDesc:'カカオトークなどインストール済みのアプリで共有します',
    shareDownloadName:'画像としてダウンロード',
    shareDownloadDesc:'端末に画像ファイルとして保存します',
    pickGroupTitle:'送信先のチャットルームを選んでください',
    noGroupsYet:'まだ作成したチャットルームがありません',
    toastShareUnsupported:'この端末・ブラウザでは直接共有がサポートされていないため、画像をダウンロードしました。カカオトークで直接添付してください。',
    toastDownloadDone:'画像がダウンロードされました',
    groupInfoParticipants:(n)=>`参加者 ${n}人`,
    leaveGroupBtn:'チャットルームを退出',
    leaveConfirmTitle:'このチャットルームから退出しますか?',
    leaveConfirmBody:'退出すると、このチャットルームのメッセージやメンバー一覧に二度とアクセスできなくなります。',
    leaveConfirmBtn:'チャットルームを退出',
    toastLeftGroup:'チャットルームから退出しました',
    toastLeaveFailed:'退出に失敗しました。もう一度お試しください',
    toastMembersLoadFailed:'参加者情報を読み込めませんでした',
    memberFallbackName:'メンバー', youTag:'(自分)', loadingLabel:'読み込み中...',
    groupManageTitle:'チャットルーム管理',
    roomNameLabel:'チャットルーム名',
    renameRoomTitle:'チャットルーム名を変更',
    changeRoomPhotoTitle:'チャットルームのプロフィール写真を変更',
    ownerTag:'ルームリーダー',
    streakLabel:'連続記録',
    streakDaysSuffix:(n)=>`${n}日連続記録`,
    toastRoomNameEmpty:'チャットルーム名を入力してください',
    toastRoomNameTooLong:'チャットルーム名は30文字以内で入力してください',
    toastRoomNameSaved:'チャットルーム名が変更されました',
    toastRoomNameSaveFailed:'チャットルーム名の保存に失敗しました。もう一度お試しください',
    toastRoomPhotoSaved:'チャットルームのプロフィール写真が変更されました',
    toastRoomPhotoSaveFailed:'チャットルームのプロフィール写真のアップロードに失敗しました。もう一度お試しください',
    toastRoomGone:'これ以上存在しないチャットルームです',
  },
  th:{
    yearTag:'Bible Journaling', yearSub:'หนึ่งเดือนหนึ่งเล่ม เดินไปกับพระวจนะตลอดสิบสองเดือน',
    buyLabel:'ซื้อเลย', todayNavTitle:'ไปยังบทเฝ้าเดี่ยววันนี้', groupsNavTitle:'แบ่งปันด้วยกัน',
    loginWelcome:'Welcome back', loginTitle:'สมุดบันทึกเฝ้าเดี่ยวพระคัมภีร์',
    emailLabel:'อีเมล', pwLabel:'รหัสผ่าน', emailPh:'you@example.com', pwPh:'กรอกรหัสผ่านของคุณ',
    loginBtn:'เข้าสู่ระบบ', or:'หรือ', googleLogin:'เข้าสู่ระบบด้วยบัญชี Google', kakaoLogin:'เข้าสู่ระบบด้วยบัญชี Kakao', signup:'สมัครสมาชิก',
    purchaseTitle:(name)=>`สมุดบันทึกพระคัมภีร์ ${name}`,
    purchaseSub:'ซื้อสมุดบันทึกที่มีทั้งการอ่านพระวจนะ คำถามเนื้อหา และคำถามเฝ้าเดี่ยว แล้วเริ่มต้นจากวันนี้เลย',
    yearPlanName:'แพ็กเกจรายปีทั้งหมด', yearPlanBadge:'แนะนำ', yearPlanDesc:'สมุดบันทึกทั้ง 12 เดือนในครั้งเดียว', yearPlanPrice:'₩19,000',
    monthPlanName:'ซื้อสมุดบันทึกเล่มเดียว', monthPlanDesc:(name)=>`ใช้ได้เฉพาะสมุดบันทึก ${name}`, monthPlanPrice:'₩2,000',
    cancel:'ยกเลิก', buyBtn:'ซื้อเลย',
    settingsTitle:'การตั้งค่า', fontSizeLabel:'ขนาดตัวอักษร', fontSmall:'เล็ก', fontDefault:'ปกติ', fontLarge:'ใหญ่',
    langLabel:'ภาษา', langKo:'한국어', langEn:'English', langJa:'日本語', langTh:'ไทย',
    languageMenu:'ตั้งค่าภาษา', languageModalTitle:'เลือกภาษา',
    themeLabel:'โหมดมืด', themeLight:'สว่าง', themeDark:'มืด',
    signupTitle:'สมัครสมาชิก', signupSub:'กรุณากรอกข้อมูลที่จำเป็นสำหรับการสมัครสมาชิก',
    nameLabel:'ชื่อ-นามสกุล', namePh:'กรุณากรอกชื่อจริง',
    birthLabel:'วันเดือนปีเกิด', birthPh:'YYYY-MM-DD',
    usernameLabel:'ชื่อผู้ใช้', usernamePh:'ชื่อผู้ใช้สำหรับเข้าสู่ระบบ',
    nicknameLabel:'ชื่อเล่น', nicknamePh:'ชื่อที่จะแสดงในห้องกลุ่ม',
    signupTermsLabel:'ยอมรับข้อตกลงการใช้บริการ (จำเป็น)',
    signupTermsBody:'นี่คือข้อตกลงพื้นฐานสำหรับการใช้ฟีเจอร์การอ่านพระคัมภีร์ การบันทึกคำถามเฝ้าเดี่ยว และการแบ่งปันกลุ่มของสมุดบันทึกเฝ้าเดี่ยวพระคัมภีร์ การใช้บริการอาจถูกจำกัดหากตรวจพบการใช้งานที่ไม่เหมาะสม',
    signupConsentLabel:'ยินยอมให้เก็บรวบรวมและใช้ข้อมูลส่วนบุคคล (จำเป็น)',
    signupConsentBody:'ข้อมูลที่เก็บรวบรวม: ชื่อ-นามสกุล วันเดือนปีเกิด ชื่อผู้ใช้ ชื่อเล่น รหัสผ่าน (จัดเก็บแบบเข้ารหัส)\nวัตถุประสงค์: ยืนยันตัวตนสมาชิก การเข้าสู่ระบบ และการให้บริการ\nระยะเวลาจัดเก็บ: จนกว่าจะลบบัญชี\nคุณสามารถปฏิเสธได้ แต่การสมัครสมาชิกจะถูกจำกัดหากปฏิเสธ',
    viewDetail:'ดูเพิ่มเติม', hideDetail:'ซ่อน',
    submitSignup:'สมัครสมาชิก',
    toastFillAll:'กรุณากรอกข้อมูลให้ครบทุกช่อง', toastNeedConsent:'กรุณายินยอมให้เก็บรวบรวมข้อมูลส่วนบุคคล',
    toastSignupDone:'สมัครสมาชิกสำเร็จแล้ว',
    notif:'ตั้งค่าการแจ้งเตือน', contact:'ติดต่อเรา', logout:'ออกจากระบบ', donate:'สนับสนุนเรา',
    dayUnit:' วัน', snapNoAnswerContent:'ยังไม่มีคำตอบที่บันทึกไว้', snapNoAnswerThought:'ยังไม่ได้บันทึก', snapNoQuestionSelected:'ยังไม่ได้เลือกคำถาม',
    notifTitle:'ตั้งค่าการแจ้งเตือน', notifSub:'เลือกวันในสัปดาห์เพื่อตั้งเวลาแจ้งเตือนเฝ้าเดี่ยว',
    dayMon:'วันจันทร์', dayTue:'วันอังคาร', dayWed:'วันพุธ', dayThu:'วันพฤหัสบดี', dayFri:'วันศุกร์', daySat:'วันเสาร์', daySun:'วันอาทิตย์',
    notifOff:'ปิดการแจ้งเตือน',
    notifOnLabel:'เปิดการแจ้งเตือน',
    notifTimeLabel:'เวลาแจ้งเตือน',
    notifSave:'บันทึก',
    notifDelete:'ปิดการแจ้งเตือน',
    contactTitle:'ติดต่อเรา',
    guideMenu:'คู่มือการใช้งาน',
    guideTitle:'คู่มือการใช้งาน',
    guideEmptyTitle:'กำลังเตรียมการ',
    guideEmptyBody:'เนื้อหาคู่มือการใช้งานจะเพิ่มเข้ามาเร็วๆ นี้ กรุณารอสักครู่',
    contactBody:'หากมีคำถามหรือพบปัญหาขณะใช้งานสมุดบันทึกเฝ้าเดี่ยวพระคัมภีร์ สามารถติดต่อเราได้ตลอดเวลา เราจะตอบกลับให้เร็วที่สุด',
    contactEmailBtn:'ติดต่อทางอีเมล',
    contactEmailNote:'เมื่อกดปุ่มนี้ แอปอีเมลเริ่มต้นของคุณจะเปิดขึ้นพร้อมกรอกผู้รับให้อัตโนมัติ',
    contactMailSubject:'[สมุดบันทึกเฝ้าเดี่ยวพระคัมภีร์] ติดต่อสอบถาม',
    contactMailBody:'สวัสดีครับ/ค่ะ ผม/ดิฉันมีคำถามเกี่ยวกับสมุดบันทึกเฝ้าเดี่ยวพระคัมภีร์\n\nรายละเอียด:\n',
    donateModalTitle:'สนับสนุน Bible Journaling',
    donateDesc:'ร่วมสนับสนุนการดำเนินงานและพัฒนาบริการ Bible Journaling อย่างต่อเนื่อง เงินสนับสนุนอันมีค่าของคุณจะถูกนำไปใช้ปรับปรุงบริการและค่าดูแลรักษาเซิร์ฟเวอร์ ขอบคุณค่ะ 🤍',
    donateBankLabel:'ธนาคาร', donateHolderLabel:'ชื่อบัญชี', donateAccountLabel:'เลขที่บัญชี',
    donateBankName:'Toss Bank', donateHolderName:'Park Yuna', donateAccountNumber:'1002-7159-7116',
    copyAccountBtn:'คัดลอกเลขที่บัญชี', copyAccountDone:'คัดลอกแล้ว! ✓',
    toastAccountCopied:'คัดลอกเลขที่บัญชีเรียบร้อยแล้ว!',
    todayWord:'วันนี้', moveToday:'ไปยังวันนี้', calLegend:'วันที่มีบันทึกเฝ้าเดี่ยว',
    calTitle:(name)=>`ปฏิทินสมุดบันทึก ${name}`, calCap:'2026 · Bible Journal',
    chapterGridSub:'กรุณาเลือกบทที่ต้องการอ่าน',
    dailyCap:(name)=>`เส้นทางพระวจนะของ ${name}`,
    navBible:'พระคัมภีร์', navContent:'บันทึกคำถามเนื้อหา', navThought:'บันทึกคำถามเฝ้าเดี่ยว',
    todayReading:'พระวจนะวันนี้', chapterNote:'เนื้อหานี้เป็นตัวอย่างสรุปเพื่อช่วยความเข้าใจ',
    chapterInfoBtn:'ดูข้อมูลพื้นหลัง',
    chapterInfoTitle:(book)=>`ข้อมูลพื้นหลัง: ${book}`,
    chapterInfoEmptyTitle:'กำลังเตรียมการ',
    chapterInfoEmptyBody:'ข้อมูลพื้นหลังของหนังสือเล่มนี้จะเพิ่มเข้ามาเร็วๆ นี้',
    copyVerseBtn:'คัดลอกข้อพระคัมภีร์',
    toastVerseCopied:'คัดลอกข้อพระคัมภีร์แล้ว',
    qPlaceholder:'ลองเขียนคำตอบที่คุณคิดไว้',
    verseLabel:'ข้อพระคัมภีร์ที่ได้รับ', versePh:'เช่น อพยพ 8:10',
    passageLabel:'สรุปเนื้อหาบทนี้', passagePh:'ลองสรุปเนื้อหาของบทนี้ในวันนี้',
    godIsLabel:'พระเจ้าทรงเป็นเช่นนี้', godIsPh:'พระลักษณะของพระเจ้าที่พบในบทนี้',
    askLabel:'ทูลถามพระเจ้า', askPlaceholderQ:'กรุณาเลือกคำถาม',
    heardLabel:'บันทึกเสียงที่ได้ยิน', heardPh:'ลองเขียนสิ่งที่อยู่ในใจระหว่างเฝ้าเดี่ยว',
    appLabel:'การนำไปใช้ในชีวิต', appPh:'สิ่งหนึ่งที่จะลงมือทำในวันนี้',
    prayerLabel:'คำอธิษฐาน', prayerPh:'ลองเขียนคำอธิษฐานของวันนี้',
    thanksLabel:'ขอบคุณพระเจ้าวันนี้', thanksPh:(i)=>`เรื่องที่ขอบคุณ ${i}`, addThanks:'เพิ่มเรื่องขอบคุณ',
    toastLogin:'เข้าสู่ระบบแล้ว', toastLogout:'ออกจากระบบแล้ว',
    toastGoogleFailed:'เข้าสู่ระบบด้วย Google ไม่สำเร็จ กรุณาลองอีกครั้ง',
    toastGoogleCancelled:'ยกเลิกการเข้าสู่ระบบด้วย Google แล้ว',
    toastPopupBlocked:'หน้าต่างป๊อปอัปถูกบล็อก ทำให้เข้าสู่ระบบไม่ได้ กรุณาอนุญาตป๊อปอัปแล้วลองอีกครั้ง',
    toastNetworkError:'กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
    toastLogoutFailed:'ออกจากระบบไม่สำเร็จ กรุณาลองอีกครั้ง',
    toastKakaoFailed:'เข้าสู่ระบบด้วย Kakao ไม่สำเร็จ กรุณาลองอีกครั้ง',
    toastEmailLoginFailed:'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
    toastEmailInUse:'อีเมลนี้ถูกใช้สมัครสมาชิกไปแล้ว',
    toastWeakPassword:'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
    toastSignupFailed:'สมัครสมาชิกไม่สำเร็จ กรุณาลองอีกครั้ง',
    toastFirebaseNotSet:'ยังไม่ได้ตั้งค่า Firebase (กรุณากรอก firebaseConfig)',
    nicknameModalTitle:'แก้ไขชื่อเล่น', saveBtn:'บันทึก',
    toastNicknameEmpty:'กรุณากรอกชื่อเล่น',
    toastNicknameSaved:'เปลี่ยนชื่อเล่นแล้ว',
    toastNicknameSaveFailed:'บันทึกชื่อเล่นไม่สำเร็จ กรุณาลองอีกครั้ง',
    avatarModalTitle:'เปลี่ยนรูปโปรไฟล์', avatarModalSub:'ต้องการใช้รูปที่เลือกเป็นรูปโปรไฟล์ใหม่หรือไม่?',
    toastAvatarInvalidType:'เลือกได้เฉพาะไฟล์รูปภาพเท่านั้น',
    toastAvatarSaved:'เปลี่ยนรูปโปรไฟล์แล้ว',
    toastAvatarSaveFailed:'อัปโหลดรูปโปรไฟล์ไม่สำเร็จ กรุณาลองอีกครั้ง',
    toastAvatarTooLarge:'ไฟล์รูปภาพมีขนาดใหญ่เกินไป กรุณาลองใช้รูปที่มีขนาดเล็กลง',
    toastAvatarPermissionDenied:'คุณไม่มีสิทธิ์บันทึกรูปโปรไฟล์นี้ กรุณาเข้าสู่ระบบใหม่แล้วลองอีกครั้ง',
    toastAvatarLoginRequired:'เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่แล้วลองอีกครั้ง',
    toastPurchaseYear:'ซื้อแพ็กเกจรายปีทั้งหมดสำเร็จแล้ว', toastPurchaseMonth:(name)=>`ซื้อสมุดบันทึก ${name} สำเร็จแล้ว`,
    toastNeedPurchase:(name)=>`กรุณาซื้อสมุดบันทึก ${name} ก่อน`,
    sharePickTitle:'ต้องการแบ่งปันอะไร?', sharePickSub:'สร้างภาพจากบันทึกของวันนี้เพื่อแบ่งปัน',
    shareContentName:'บันทึกคำถามเนื้อหา', shareContentDesc:'คำถามและคำตอบเกี่ยวกับบทนี้ของวันนี้',
    shareThoughtName:'บันทึกคำถามเฝ้าเดี่ยว', shareThoughtDesc:'การเฝ้าเดี่ยว คำอธิษฐาน และคำขอบคุณของวันนี้',
    shareBothName:'แบ่งปันทั้งสองอย่าง', shareBothDesc:'ส่งบันทึกคำถามเนื้อหาและคำถามเฝ้าเดี่ยวไปพร้อมกัน',
    shareGenerating:'กำลังสร้างภาพ...', shareDone:'แบ่งปันบันทึกเฝ้าเดี่ยวแล้ว', shareFailed:'ไม่สามารถสร้างภาพได้ กรุณาลองอีกครั้ง',
    sharedImageCap:(kind,date)=>`${kind==='content'?'บันทึกคำถามเนื้อหา':'บันทึกคำถามเฝ้าเดี่ยว'} · ${date}`,
    pageShareBtn:'แบ่งปัน',
    pageShareTitle:'ต้องการแบ่งปันที่ไหน?',
    shareToChatName:'แบ่งปันในห้องแชทของแอป',
    shareToChatDesc:'ส่งไปยังห้องแชท "แบ่งปันด้วยกัน"',
    shareToKakaoName:'แบ่งปันไปยัง KakaoTalk',
    shareToKakaoDesc:'แบ่งปันผ่าน KakaoTalk หรือแอปอื่นที่ติดตั้งไว้',
    shareDownloadName:'ดาวน์โหลดเป็นรูปภาพ',
    shareDownloadDesc:'บันทึกเป็นไฟล์รูปภาพในอุปกรณ์',
    pickGroupTitle:'เลือกห้องแชทที่จะส่ง',
    noGroupsYet:'ยังไม่มีห้องแชทที่สร้างไว้',
    toastShareUnsupported:'อุปกรณ์/เบราว์เซอร์นี้ไม่รองรับการแบ่งปันโดยตรง จึงดาวน์โหลดภาพให้แทน กรุณาแนบไฟล์ใน KakaoTalk ด้วยตนเอง',
    toastDownloadDone:'ดาวน์โหลดภาพแล้ว',
    groupInfoParticipants:(n)=>`ผู้เข้าร่วม ${n} คน`,
    leaveGroupBtn:'ออกจากห้องแชท',
    leaveConfirmTitle:'ต้องการออกจากห้องแชทนี้หรือไม่?',
    leaveConfirmBody:'เมื่อออกแล้ว คุณจะไม่สามารถเข้าถึงข้อความและรายชื่อสมาชิกของห้องแชทนี้ได้อีก',
    leaveConfirmBtn:'ออกจากห้องแชท',
    toastLeftGroup:'ออกจากห้องแชทแล้ว',
    toastLeaveFailed:'ออกจากห้องแชทไม่สำเร็จ กรุณาลองอีกครั้ง',
    toastMembersLoadFailed:'ไม่สามารถโหลดข้อมูลผู้เข้าร่วมได้',
    memberFallbackName:'สมาชิก', youTag:'(ฉัน)', loadingLabel:'กำลังโหลด...',
    groupManageTitle:'จัดการห้องแชท',
    roomNameLabel:'ชื่อห้องแชท',
    renameRoomTitle:'เปลี่ยนชื่อห้องแชท',
    changeRoomPhotoTitle:'เปลี่ยนรูปโปรไฟล์ห้องแชท',
    ownerTag:'เจ้าของห้อง',
    streakLabel:'สถิติต่อเนื่อง',
    streakDaysSuffix:(n)=>`บันทึกต่อเนื่อง ${n} วัน`,
    toastRoomNameEmpty:'กรุณากรอกชื่อห้องแชท',
    toastRoomNameTooLong:'ชื่อห้องแชทต้องไม่เกิน 30 ตัวอักษร',
    toastRoomNameSaved:'เปลี่ยนชื่อห้องแชทแล้ว',
    toastRoomNameSaveFailed:'บันทึกชื่อห้องแชทไม่สำเร็จ กรุณาลองอีกครั้ง',
    toastRoomPhotoSaved:'เปลี่ยนรูปโปรไฟล์ห้องแชทแล้ว',
    toastRoomPhotoSaveFailed:'อัปโหลดรูปโปรไฟล์ห้องแชทไม่สำเร็จ กรุณาลองอีกครั้ง',
    toastRoomGone:'ห้องแชทนี้ไม่มีอยู่แล้ว',
  },
};

/* ---------------- usage guide i18n ----------------
   저널링 노트 사용가이드 화면 전용 문자열. 기존 STRINGS 사전에 언어별로 합칩니다.
   실제 기록 화면(renderThoughtTab / renderBibleTab)의 라벨은 기존 키를 그대로 재사용하고,
   여기서는 각 단계 설명과 12가지 질문만 추가로 정의합니다. */
const GUIDE_STRINGS = {
  ko:{
    guideHowToTitle:'저널링 노트 사용하는 방법',
    guideHowToLead:'하루의 말씀을 읽고, 묵상하고, 하나님께 묻고,\n삶에 적용하고 기도로 기록해보세요.',
    guideShotLabel:'실제 기록 화면',
    guideTapHint:'단계를 누르면 해당 설명으로 이동해요.',
    guideFlow:['고요하게 하기','말씀 묵상','하나님께 여쭙기','들은 음성 기록','삶에 적용','기도'],
    guideS1Title:'1. 마음을 고요하게 하기',
    guideS1En:'Quiet Time',
    guideS1Desc:'하나님과 일대일로 만나는 시간입니다.\n평안한 마음으로 조용히 말씀을 듣고, 그 말씀에 응답하여 마음을 아룁니다.',
    guideS1Ref:'출애굽기 8장',
    guideS1Verse1:'여호와께서 모세에게 바로에게 가서 백성을 보내라고 전하라 말씀하신다.',
    guideS1Verse2:'모세가 여호와와 같은 이 없음을 알게 되리라 말한다.',
    guideS1Callout:'먼저 오늘의 말씀을 조용히 읽으며 마음을 준비하세요.',
    guideS2Title:'2. 말씀 묵상',
    guideS2En:'Scripture Listening',
    guideS2Desc:'오늘 본문에서 들은 말씀을 세 곳에 나누어 기록합니다.',
    guideS2VerseDesc:'마음에 와닿은 한 구절을 기록하세요.',
    guideS2PassageDesc:'본문의 핵심 내용을 요약해 보세요.',
    guideS2GodDesc:'오늘 말씀을 통해 알게 된 하나님은 어떤 분인가요?',
    guideS3Title:'3. 하나님께 여쭙기',
    guideS3En:'Asking',
    guideS3Desc:'아래 질문 중 하루 한 가지를 선택해 묻고, 떠오른 답을 기록하세요.',
    guideS3Callout:'▼ 를 눌러 질문을 고르고, 마음에 떠오른 답을 적으세요.',
    guideS3ListTitle:'하나님께 드리는 주요 질문 12가지',
    guideAsk:[
      '주님, 오늘 제게 주시는 마음의 감동은 무엇입니까?',
      '제가 놓치고 있는 죄/교만/두려움이 있습니까?',
      '주님이 오늘 제게 알려주고 싶은 진리는 무엇입니까?',
      '제가 오늘 사랑해야 할 사람은 누구입니까?',
      '제가 멈춰야 할 것은 무엇입니까?',
      '제가 오늘 행동해야 할 작은 한 걸음은 무엇입니까?',
      '저의 가정, 사역, 사업(일, 공부) 가운데 정리해주시는 방향성이 있습니까?',
      '제가 걱정하는 문제를 주님은 어떻게 보십니까?',
      '제가 오늘 내려놓아야 할 짐은 무엇입니까?',
      '제 삶에서 회복시키길 원하시는 영역은 어디입니까?',
      '주님이 제게 말씀하시는 위로는 무엇입니까?',
      '주님, 지금 제게 무엇을 말씀하십니까?',
    ],
    guideS4Title:'4. 들은 음성 기록하기',
    guideS4En:'Listening & Writing',
    guideS4Desc:'고요하게 들리는 감동·생각·그림·성경 말씀 등을 기록합니다.',
    guideS4Note:'기록한 내용이 성경의 원리와 일치하는지 검증하면서 적어요.',
    guideS5Title:'5. 삶으로의 적용',
    guideS5Desc:'오늘 말씀 중에 즉시 적용할 한 가지 실천을 기록하세요.',
    guideS6Title:'6. 기도',
    guideS6Desc:'기도제목과 오늘의 감사를 나누어 기록합니다.',
    guideS6PrayerDesc:'하나님께 감사함으로 드릴 기도를 기록하세요.',
    guideS6ThanksDesc:'말씀과 성령의 인도 중에 주시는 감사 내용을 기록하세요.',
  },
  en:{
    guideHowToTitle:'How to use the journaling note',
    guideHowToLead:'Read the day’s Word, reflect on it, ask God,\napply it to your life, and record it as prayer.',
    guideShotLabel:'Actual entry screen',
    guideTapHint:'Tap a step to jump to its explanation.',
    guideFlow:['Stilling your heart','Reflect','Ask God','Write what you heard','Apply','Pray'],
    guideS1Title:'1. Stilling your heart',
    guideS1En:'Quiet Time',
    guideS1Desc:'A time to meet God one on one.\nQuietly listen to the Word with a calm heart, and respond to Him from your heart.',
    guideS1Ref:'Exodus 8',
    guideS1Verse1:'The LORD tells Moses to go to Pharaoh and say, “Let my people go.”',
    guideS1Verse2:'Moses says Pharaoh will come to know there is no one like the LORD.',
    guideS1Callout:'First, quietly read today’s passage and prepare your heart.',
    guideS2Title:'2. Scripture reflection',
    guideS2En:'Scripture Listening',
    guideS2Desc:'Record what you heard in today’s passage in three places.',
    guideS2VerseDesc:'Write down the one verse that touched your heart.',
    guideS2PassageDesc:'Summarize the key content of the passage.',
    guideS2GodDesc:'Who is the God you came to know through today’s Word?',
    guideS3Title:'3. Asking God',
    guideS3En:'Asking',
    guideS3Desc:'Choose one question for the day, ask it, and write down what comes to mind.',
    guideS3Callout:'Tap ▼ to choose a question, then write what comes to mind.',
    guideS3ListTitle:'12 key questions to ask God',
    guideAsk:[
      'Lord, what is on Your heart for me today?',
      'Is there sin, pride, or fear that I am overlooking?',
      'What truth do You want to show me today?',
      'Who is someone You want me to love today?',
      'What is something I need to stop doing?',
      'What is one small step You want me to take today?',
      'Is there direction You are giving me for my family, ministry, or work/study?',
      'How do You see the problem that worries me?',
      'What burden do You want me to lay down today?',
      'In what area of my life do You want to bring restoration?',
      'What comfort do You want to speak to me?',
      'Lord, what are You saying to me right now?',
    ],
    guideS4Title:'4. Writing what you heard',
    guideS4En:'Listening & Writing',
    guideS4Desc:'Record the impressions, thoughts, images, or Scripture that come to you quietly.',
    guideS4Note:'As you write, check that it aligns with the principles of Scripture.',
    guideS5Title:'5. Applying it to life',
    guideS5Desc:'Write one thing from today’s Word that you can put into practice right away.',
    guideS6Title:'6. Prayer',
    guideS6Desc:'Record your prayer requests and today’s gratitude separately.',
    guideS6PrayerDesc:'Write a prayer you want to offer to God with thanksgiving.',
    guideS6ThanksDesc:'Write the thanks that come as you are led by the Word and the Spirit.',
  },
  ja:{
    guideHowToTitle:'ジャーナリングノートの使い方',
    guideHowToLead:'一日の御言葉を読み、黙想し、神に尋ね、\n生活に適用し、祈りとして記録してみましょう。',
    guideShotLabel:'実際の記録画面',
    guideTapHint:'ステップを押すと、その説明へ移動します。',
    guideFlow:['心を静める','御言葉の黙想','神に尋ねる','聞いた声を記録','生活に適用','祈り'],
    guideS1Title:'1. 心を静める',
    guideS1En:'Quiet Time',
    guideS1Desc:'神と一対一で出会う時間です。\n平安な心で静かに御言葉を聞き、その御言葉に応えて心を申し上げます。',
    guideS1Ref:'出エジプト記 8章',
    guideS1Verse1:'主はモーセに、パロのもとへ行き「わたしの民を去らせよ」と告げるよう命じられる。',
    guideS1Verse2:'モーセは、主のような方はほかにいないとパロが知るようになる、と告げる。',
    guideS1Callout:'まず今日の御言葉を静かに読み、心を整えましょう。',
    guideS2Title:'2. 御言葉の黙想',
    guideS2En:'Scripture Listening',
    guideS2Desc:'今日の本文で聞いた御言葉を、3つの場所に分けて記録します。',
    guideS2VerseDesc:'心に響いた一節を記録しましょう。',
    guideS2PassageDesc:'本文の重要な内容を要約しましょう。',
    guideS2GodDesc:'今日の御言葉を通して知った神は、どのような方ですか?',
    guideS3Title:'3. 神に尋ねる',
    guideS3En:'Asking',
    guideS3Desc:'下の質問から一日一つを選んで尋ね、心に浮かんだ答えを記録しましょう。',
    guideS3Callout:'▼ を押して質問を選び、心に浮かんだ答えを書きましょう。',
    guideS3ListTitle:'神にお尋ねする主な質問12',
    guideAsk:[
      '主よ、今日私に与えてくださる心の感動は何ですか?',
      '私が見落としている罪、高ぶり、恐れはありますか?',
      '主が今日私に知らせたい真理は何ですか?',
      '私が今日愛すべき人は誰ですか?',
      '私がやめるべきことは何ですか?',
      '私が今日踏み出すべき小さな一歩は何ですか?',
      '私の家庭、奉仕、仕事(学び)の中で示してくださる方向はありますか?',
      '私が心配している問題を主はどのようにご覧になっていますか?',
      '私が今日手放すべき荷物は何ですか?',
      '私の人生の中で、主が回復させたいと望んでおられる領域はどこですか?',
      '主が私に語りたい慰めは何ですか?',
      '主よ、今、私に何を語っておられますか?',
    ],
    guideS4Title:'4. 聞いた声を記録する',
    guideS4En:'Listening & Writing',
    guideS4Desc:'静かに聞こえる感動・思い・イメージ・聖書の御言葉などを記録します。',
    guideS4Note:'記録した内容が聖書の原理と一致するか確かめながら書きます。',
    guideS5Title:'5. 生活への適用',
    guideS5Desc:'今日の御言葉の中から、すぐに実践できる一つを記録しましょう。',
    guideS6Title:'6. 祈り',
    guideS6Desc:'祈りの課題と今日の感謝を分けて記録します。',
    guideS6PrayerDesc:'神に感謝をもってささげる祈りを記録しましょう。',
    guideS6ThanksDesc:'御言葉と御霊の導きの中で与えられる感謝を記録しましょう。',
  },
  th:{
    guideHowToTitle:'วิธีใช้สมุดบันทึกเฝ้าเดี่ยว',
    guideHowToLead:'อ่านพระวจนะประจำวัน ใคร่ครวญ ทูลถามพระเจ้า\nนำไปใช้ในชีวิต และบันทึกเป็นคำอธิษฐาน',
    guideShotLabel:'หน้าจอบันทึกจริง',
    guideTapHint:'แตะที่ขั้นตอนเพื่อไปยังคำอธิบาย',
    guideFlow:['ทำใจให้สงบ','ใคร่ครวญพระวจนะ','ทูลถามพระเจ้า','บันทึกเสียงที่ได้ยิน','นำไปใช้','อธิษฐาน'],
    guideS1Title:'1. ทำใจให้สงบ',
    guideS1En:'Quiet Time',
    guideS1Desc:'เป็นเวลาที่ได้พบพระเจ้าแบบตัวต่อตัว\nฟังพระวจนะอย่างเงียบสงบด้วยใจสงบ แล้วตอบสนองต่อพระองค์จากใจ',
    guideS1Ref:'อพยพ บทที่ 8',
    guideS1Verse1:'พระยาห์เวห์ตรัสสั่งโมเสสให้ไปเข้าเฝ้าฟาโรห์และบอกว่า “จงปล่อยประชากรของเราไป”',
    guideS1Verse2:'โมเสสกล่าวว่าฟาโรห์จะได้รู้ว่าไม่มีผู้ใดเหมือนพระยาห์เวห์',
    guideS1Callout:'ก่อนอื่น อ่านพระวจนะของวันนี้อย่างเงียบ ๆ และเตรียมใจของคุณ',
    guideS2Title:'2. ใคร่ครวญพระวจนะ',
    guideS2En:'Scripture Listening',
    guideS2Desc:'บันทึกสิ่งที่ได้ยินจากเนื้อหาวันนี้แยกเป็นสามส่วน',
    guideS2VerseDesc:'เขียนข้อพระคัมภีร์หนึ่งข้อที่สัมผัสใจคุณ',
    guideS2PassageDesc:'สรุปเนื้อหาสำคัญของบทนี้',
    guideS2GodDesc:'พระเจ้าที่คุณได้รู้จักผ่านพระวจนะวันนี้เป็นอย่างไร?',
    guideS3Title:'3. ทูลถามพระเจ้า',
    guideS3En:'Asking',
    guideS3Desc:'เลือกคำถามหนึ่งข้อต่อวัน ทูลถาม แล้วบันทึกสิ่งที่ผุดขึ้นในใจ',
    guideS3Callout:'แตะ ▼ เพื่อเลือกคำถาม แล้วเขียนสิ่งที่ผุดขึ้นในใจ',
    guideS3ListTitle:'12 คำถามสำคัญที่ทูลถามพระเจ้า',
    guideAsk:[
      'พระเจ้าข้า วันนี้พระองค์ทรงสัมผัสใจข้าพระองค์เรื่องอะไร?',
      'มีบาป ความหยิ่ง หรือความกลัวใดที่ข้าพระองค์มองข้ามไปหรือไม่?',
      'ความจริงใดที่พระองค์ทรงอยากสำแดงแก่ข้าพระองค์ในวันนี้?',
      'มีใครบ้างที่พระองค์อยากให้ข้าพระองค์รักในวันนี้?',
      'มีสิ่งใดที่ข้าพระองค์ควรหยุดทำ?',
      'ก้าวเล็กๆ ก้าวหนึ่งที่พระองค์อยากให้ข้าพระองค์ทำวันนี้คืออะไร?',
      'มีทิศทางที่พระองค์กำลังทรงนำในเรื่องครอบครัว การรับใช้ หรือการงาน/การเรียนของข้าพระองค์หรือไม่?',
      'พระองค์ทรงมองปัญหาที่ข้าพระองค์กังวลอยู่อย่างไร?',
      'ภาระใดที่พระองค์อยากให้ข้าพระองค์วางลงในวันนี้?',
      'มีด้านใดในชีวิตของข้าพระองค์ที่พระองค์ทรงปรารถนาจะฟื้นฟู?',
      'คำปลอบประโลมใดที่พระองค์อยากตรัสกับข้าพระองค์?',
      'พระเจ้าข้า ขณะนี้พระองค์กำลังตรัสอะไรกับข้าพระองค์?',
    ],
    guideS4Title:'4. บันทึกเสียงที่ได้ยิน',
    guideS4En:'Listening & Writing',
    guideS4Desc:'บันทึกความประทับใจ ความคิด ภาพ หรือพระวจนะที่เข้ามาอย่างเงียบ ๆ',
    guideS4Note:'ขณะเขียน ตรวจสอบว่าสอดคล้องกับหลักการของพระคัมภีร์หรือไม่',
    guideS5Title:'5. การนำไปใช้ในชีวิต',
    guideS5Desc:'เขียนสิ่งหนึ่งจากพระวจนะวันนี้ที่ลงมือปฏิบัติได้ทันที',
    guideS6Title:'6. คำอธิษฐาน',
    guideS6Desc:'บันทึกหัวข้ออธิษฐานและคำขอบพระคุณของวันนี้แยกกัน',
    guideS6PrayerDesc:'เขียนคำอธิษฐานที่อยากทูลต่อพระเจ้าด้วยการขอบพระคุณ',
    guideS6ThanksDesc:'เขียนคำขอบพระคุณที่ได้รับขณะได้รับการทรงนำจากพระวจนะและพระวิญญาณ',
  },
};
Object.keys(GUIDE_STRINGS).forEach(l=>{ Object.assign(STRINGS[l] || (STRINGS[l]={}), GUIDE_STRINGS[l]); });

function T(key, ...args){
  const dict = STRINGS[state.lang] || STRINGS.ko;
  const v = dict[key];
  if(v===undefined) return '';
  return typeof v==='function' ? v(...args) : v;
}
const LANG_CODES = ['ko','en','ja','th'];
const LANG_LABEL_KEYS = { ko:'langKo', en:'langEn', ja:'langJa', th:'langTh' };

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
  prevScreen:'main',        // where to return to when leaving settings
  loadingCount:0,           // >0 while any global async op (auth/Firestore/etc) is in flight
  nicknameModal:false,      // whether the nickname-edit modal (on the profile screen) is open
  avatarModal:null,         // { previewUrl, blob } while a newly picked profile photo awaits confirmation
  donateModal:false,        // whether the donation/support-us modal is open
  donateCopied:false,       // true briefly after the account number was copied, to flip the button label
  languageModal:false,      // whether the language-picker modal is open
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

const GROUP_COLORS = ['#3F5670','#8A6A2F','#4F6B8F','#7E9A6D','#B25C6B'];

function makeCode(){
  return Math.random().toString(36).slice(2,8).toUpperCase();
}
function seedGroups(){
  return [{
    id:'g-'+Date.now(),
    name:'가족 묵상방',
    color:GROUP_COLORS[0],
    code:makeCode(),
    memberCount:3,
    messages:[
      {id:'m1', from:'시스템', isMe:false, type:'system', text:'그룹방이 만들어졌어요. 링크로 초대해 함께 말씀을 나눠보세요.'},
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
    .then(()=> fdb.sendMessage(g.id, { uid: state.user.uid, name: state.user.nickname || state.user.name || null, text: msg.text }))
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
function isRoomOwner(){
  const uid = state.user && state.user.uid;
  if(!uid) return false;
  if(state.groupManageDoc) return state.groupManageDoc.ownerUid === uid;
  const g = getGroup(state.activeGroupId);
  return !!(g && g.ownerUid === uid);
}

function blankEntry(){
  return { content:{}, thought:{ verse:'', passage:'', godIs:'', askIndex:null, heard:'', application:'', prayer:'', thanks:['','',''] } };
}
function getEntry(dateStr){
  if(!journalData[dateStr]) journalData[dateStr] = blankEntry();
  return journalData[dateStr];
}
function hasEntryContent(dStr){
  const e = journalData[dStr];
  if(!e) return false;
  const c = Object.values(e.content||{}).some(v=>v && v.trim());
  const t = e.thought||{};
  const th = ['verse','passage','godIs','heard','application','prayer'].some(k=>t[k] && t[k].trim())
    || (t.askIndex!==null && t.askIndex!==undefined)
    || (t.thanks||[]).some(v=>v && v.trim());
  return c || th;
}
function isBookComplete(m){
  const prefix = `${YEAR}-${pad(m)}-`;
  return Object.keys(journalData).some(k=>k.startsWith(prefix) && hasEntryContent(k));
}
function pad(n){ return n<10 ? '0'+n : ''+n; }
function dstr(y,m,d){ return `${y}-${pad(m)}-${pad(d)}`; }
function computeStreak(){
  return Object.keys(journalData).filter(k => hasEntryContent(k)).length;
}

/* ---------------- share snapshot (screenshot-style image) ---------------- */
function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function todayDateLabelKorean(){
  const now = new Date();
  const days=['일','월','화','수','목','금','토'];
  return `${now.getFullYear()}년 ${now.getMonth()+1}월 ${now.getDate()}일 (${days[now.getDay()]})`;
}
function buildContentSnapshotHTML(key){
  const entry = getEntry(key);
  const noAnswer = T('snapNoAnswerContent');
  const cards = CONTENT_QUESTIONS.map(q=>{
    const val = (entry.content[q.id]||'').trim();
    return `
      <div class="snap-qcard">
        <div class="snap-ref">${escapeHtml(q.ref)}</div>
        <div class="snap-qtext">${escapeHtml(q.text)}</div>
        <div class="snap-answer ${val?'':'empty'}">${val?escapeHtml(val):noAnswer}</div>
      </div>`;
  }).join('');
  return `
    <div class="snap-card" id="snap-render-target">
      <div class="snap-header">
        <div class="snap-eyebrow">${escapeHtml(chapterLabel(bookName(state.activeMonth), state.activeChapter))} · ${T('navContent')}</div>
        <div class="snap-date">${todayDateLabelKorean()}</div>
      </div>
      ${cards}
      <div class="snap-footer">Bible Journal · 말씀 묵상 저널</div>
    </div>`;
}
function buildThoughtSnapshotHTML(key){
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
        <div class="snap-eyebrow">${escapeHtml(chapterLabel(bookName(state.activeMonth), state.activeChapter))} · ${T('navThought')}</div>
        <div class="snap-date">${todayDateLabelKorean()}</div>
      </div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('verseLabel')}</div>${val(t.verse)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('passageLabel')}</div>${val(t.passage)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('godIsLabel')}</div>${val(t.godIs)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('askLabel')}</div><div class="snap-value">${escapeHtml(askQ)}</div></div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('heardLabel')}</div>${val(t.heard)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('appLabel')}</div>${val(t.application)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('prayerLabel')}</div>${val(t.prayer)}</div>
      <div class="snap-section"><div class="snap-slabel"><span class="dot"></span>${T('thanksLabel')}</div>${thanksRows}</div>
      <div class="snap-footer">Bible Journal · 말씀 묵상 저널</div>
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
  try{
    // Firebase Authentication (via initAuthGate/onAuthStateChanged) is the source of truth
    // for state.loggedIn/state.user. Here we only merge in extra cached profile fields
    // (username/nickname/birth from signup) that Firebase itself doesn't store.
    const up = await window.storage.get('user-profile');
    if(up && up.value) state.user = Object.assign({}, JSON.parse(up.value), state.user);
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
  try{
    const nf = await window.storage.get('notif-settings');
    if(nf) notifSettings = Object.assign(notifSettings, JSON.parse(nf.value));
  }catch(e){}
  groupsLoaded = true;
  hideLoading();
}
function savePrefs(){
  window.storage.set('app-prefs', JSON.stringify({fontSize:state.fontSize, lang:state.lang, theme:state.theme}), false).catch(()=>{});
}
function saveNotifSettings(){
  window.storage.set('notif-settings', JSON.stringify(notifSettings), false).catch(()=>{});
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
      state.screen = profile ? 'main' : 'login';
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
    if(window.__firebaseDB && window.__firebaseDB.ready){
      try{
        const doc = await withLoading(window.__firebaseDB.getUserProfile(profile.uid));
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
    if(groupsLoaded) render();
  });
}
function saveGroups(){
  window.storage.set('groups-data', JSON.stringify(groups), false).catch(()=>{});
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
    <button class="back-fab" data-action="go-login">${ICON.back}</button>
    <div class="screen-center">
      <div class="login-mark">
        <div class="eyebrow">${T('loginTitle')}</div>
        <h2>${T('signupTitle')}</h2>
      </div>
      <p class="terms-sub" style="text-align:center;margin-bottom:18px;font-size:calc(12.5px * var(--fs-scale));color:var(--ink-soft);">${T('signupSub')}</p>

      <div class="field">
        <label>${T('nameLabel')}</label>
        <input type="text" id="signup-name" placeholder="${T('namePh')}">
      </div>
      <div class="field">
        <label>${T('emailLabel')}</label>
        <input type="email" id="signup-email" placeholder="${T('emailPh')}">
      </div>
      <div class="field">
        <label>${T('birthLabel')}</label>
        <input type="date" id="signup-birth" placeholder="${T('birthPh')}">
      </div>
      <div class="field">
        <label>${T('usernameLabel')}</label>
        <input type="text" id="signup-username" placeholder="${T('usernamePh')}">
      </div>
      <div class="field">
        <label>${T('pwLabel')}</label>
        <input type="password" id="signup-password" placeholder="${T('pwPh')}">
      </div>
      <div class="field">
        <label>${T('nicknameLabel')}</label>
        <input type="text" id="signup-nickname" placeholder="${T('nicknamePh')}">
      </div>

      <div class="consent-box">
        <div class="consent-row">
          <button class="consent-check ${state.signupTermsConsent?'checked':''}" data-action="toggle-signup-terms-consent">${ICON.check}</button>
          <div class="consent-label" data-action="toggle-signup-terms-consent">${T('signupTermsLabel')}</div>
          <button class="consent-view-btn" data-action="toggle-signup-terms-consent-detail">${state.signupTermsConsentOpen?T('hideDetail'):T('viewDetail')}</button>
        </div>
        ${state.signupTermsConsentOpen ? `<div class="consent-detail">${T('signupTermsBody')}</div>` : ''}
      </div>

      <div class="consent-box" style="margin-top:8px;">
        <div class="consent-row">
          <button class="consent-check ${state.signupConsent?'checked':''}" data-action="toggle-signup-consent">${ICON.check}</button>
          <div class="consent-label" data-action="toggle-signup-consent">${T('signupConsentLabel')}</div>
          <button class="consent-view-btn" data-action="toggle-signup-consent-detail">${state.signupConsentOpen?T('hideDetail'):T('viewDetail')}</button>
        </div>
        ${state.signupConsentOpen ? `<div class="consent-detail">${T('signupConsentBody')}</div>` : ''}
      </div>

      <button class="btn btn-primary" style="margin-top:16px;" data-action="confirm-signup">${T('submitSignup')}</button>
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
        </div>
      </div>
    </div>
  `;
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
    const lastText = last ? (last.type==='image' ? `📷 ${last.jTitle}` : last.type==='journal' ? `📖 ${last.jTitle}` : last.text) : '아직 대화가 없어요';
    return `
    <button class="group-card" data-action="open-group" data-id="${g.id}">
      ${groupAvatarHtml(g, 'group-avatar')}
      <div class="group-info">
        <div class="g-name">${escapeHtml(g.name)}</div>
        <div class="g-sub">${lastText}</div>
      </div>
      <div class="group-meta">${g.messages.length}개 대화</div>
    </button>`;
  }).join('');

  return `
    <div class="groups-header">
      <button class="icon-btn" data-action="go-main">${ICON.back}</button>
      <div class="titles">
        <div class="cap">Together</div>
        <h2>함께 나누기</h2>
      </div>
    </div>
    <div class="groups-body">
      <button class="new-group-btn" data-action="open-create-group">${ICON.plus} 그룹방 만들기</button>
      ${groups.length ? cards : `
        <div class="empty-groups">
          <div class="emoji">👥</div>
          <p>아직 함께하는 그룹방이 없어요.<br>그룹방을 만들고 링크로 초대해보세요.</p>
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
      return `<div class="msg-row system"><div class="msg-bubble">${m.text}</div></div>`;
    }
    if(m.type==='journal'){
      return `
      <div class="msg-row ${m.isMe?'me':'them'}">
        ${!m.isMe ? `<div class="msg-sender">${m.from}</div>` : ''}
        <div class="msg-line">
          ${badge}
          <div class="journal-card">
            <div class="jc-cap">공유된 묵상 · ${m.dateLabel}</div>
            <div class="jc-title">${m.jTitle}</div>
            <div class="jc-text">${m.jText}</div>
          </div>
        </div>
      </div>`;
    }
    if(m.type==='image'){
      return `
      <div class="msg-row ${m.isMe?'me':'them'}">
        ${!m.isMe ? `<div class="msg-sender">${m.from}</div>` : ''}
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
        ${!m.isMe ? `<div class="msg-sender">${m.from}</div>` : ''}
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
        ${!m.isMe ? `<div class="msg-sender">${m.from}</div>` : ''}
        <div class="msg-line">
          ${badge}
          <div class="msg-bubble">${m.text}</div>
        </div>
      </div>`;
  }).join('');

  return `
    <div class="room-header">
      <button class="icon-btn" data-action="go-groups">${ICON.back}</button>
      ${groupAvatarHtml(g, 'r-avatar')}
      <div class="titles">
        <h2>${escapeHtml(g.name)}</h2>
        <div class="cap">${g.messages.length}개 대화</div>
      </div>
      <button class="invite-btn" data-action="open-invite" data-id="${g.id}">${ICON.link}</button>
      <button class="icon-btn" data-action="open-group-manage" data-id="${g.id}" title="${T('groupManageTitle')}">${ICON.menu}</button>
    </div>
    <div class="chat-scroll" id="chat-scroll">${bubbles}</div>
    <div class="compose-bar">
      <button class="share-journal-btn" data-action="open-share-picker" data-id="${g.id}" title="${T('todayNavTitle')}">${ICON.book}</button>
      <input type="text" id="chat-input" placeholder="메시지를 입력하세요" data-action-enter="send-message" data-id="${g.id}">
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
      <div class="modal-title">그룹방 만들기</div>
      <p class="modal-sub">가족, 소그룹, 친구들과 함께 묵상을 나눌 그룹방을 만들어보세요.</p>
      <div class="create-group-field">
        <label>그룹방 이름</label>
        <input type="text" id="new-group-name" placeholder="예: 수요 소그룹">
      </div>
      <button class="btn btn-primary" data-action="confirm-create-group">만들기</button>
    </div>
  </div>`;
}

/* ---------------- invite sheet ---------------- */
function renderInviteSheet(){
  const g = getGroup(state.inviteGroupId);
  if(!g) return '';
  const link = `https://biblejournal.app/invite/${g.code}`;
  return `
  <div class="overlay" data-action="close-invite">
    <div class="sheet" data-action="noop">
      <div class="sheet-handle"></div>
      <div class="modal-title">${g.name}에 초대하기</div>
      <p class="modal-sub">아래 링크를 공유하면 상대방이 그룹방에 바로 들어올 수 있어요.</p>
      <div class="invite-link-box">
        <span>${link}</span>
        <button data-action="copy-invite" data-link="${link}">${ICON.copy} 복사</button>
      </div>
      <div class="share-channels">
        <button class="share-channel" data-action="share-invite" data-channel="카카오톡" data-link="${link}">
          <div class="ch-icon" style="background:#F2C230">${ICON.chatBubble}</div>
          <div>
            <div class="ch-name">카카오톡으로 보내기</div>
            <div class="ch-desc">대화방에 초대 링크를 전달해요</div>
          </div>
        </button>
        <button class="share-channel" data-action="share-invite" data-channel="문자" data-link="${link}">
          <div class="ch-icon" style="background:var(--sage)">${ICON.message}</div>
          <div>
            <div class="ch-name">문자로 보내기</div>
            <div class="ch-desc">SMS로 초대 링크를 전달해요</div>
          </div>
        </button>
      </div>
    </div>
  </div>`;
}

/* ---------------- share picker sheet ---------------- */
function renderSharePicker(){
  const gid = state.shareGroupId;
  return `
  <div class="overlay" data-action="close-share-picker">
    <div class="sheet" data-action="noop">
      <div class="sheet-handle"></div>
      <div class="modal-title">${T('sharePickTitle')}</div>
      <p class="modal-sub">${T('sharePickSub')}</p>
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
  return state.lang==='en' ? kjvVerses(m, c)
    : state.lang==='th' ? thVerses(m, c)
    : CHAPTER.verses;
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
  return `
  <div class="overlay" data-action="close-chapter-info">
    <div class="sheet" data-action="noop">
      <div class="sheet-handle"></div>
      <div class="modal-title">${T('chapterInfoTitle', bookName(state.activeMonth))}</div>
      <div class="guide-empty" style="padding:30px 4px 10px;">
        <div class="guide-empty-icon">${ICON.info}</div>
        <div class="guide-empty-title">${T('chapterInfoEmptyTitle')}</div>
        <p class="guide-empty-body">${T('chapterInfoEmptyBody')}</p>
      </div>
    </div>
  </div>`;
}

function renderContentTab(ds){
  const entry = getEntry(ds);
  const cards = CONTENT_QUESTIONS.map(q=>{
    const val = entry.content[q.id] || '';
    return `
    <div class="q-card">
      <button class="q-ref" data-action="goto-verse" data-verse="${q.v}">${q.ref} ${ICON.linkArrow}</button>
      <div class="q-text">${q.text}</div>
      <textarea class="q-answer" data-kind="content" data-qid="${q.id}" placeholder="${T('qPlaceholder')}">${val}</textarea>
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
      <textarea data-kind="thought" data-field="application" placeholder="${T('appPh')}">${t.application}</textarea>
    </div>

    <div class="section-block">
      <div class="s-label"><span class="dot"></span>${T('prayerLabel')}</div>
      <textarea data-kind="thought" data-field="prayer" placeholder="${T('prayerPh')}">${t.prayer}</textarea>
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
      state.screen = 'main';
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
        state.screen = 'main';
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
        state.screen = 'main';
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
    const val = (id)=> { const e = document.getElementById(id); return e ? e.value.trim() : ''; };
    const name = val('signup-name');
    const email = val('signup-email');
    const birth = val('signup-birth');
    const username = val('signup-username');
    const pw = val('signup-password');
    const nickname = val('signup-nickname');

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
      saveAuth();
      state.screen = 'main';
      render();
      showToast(T('toastSignupDone'));
    }).catch(err=>{
      console.error('Email sign-up failed:', err);
      if(err && err.code==='auth/email-already-in-use') showToast(T('toastEmailInUse'));
      else if(err && err.code==='auth/weak-password') showToast(T('toastWeakPassword'));
      else showToast(T('toastSignupFailed'));
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
  }
  else if(action==='turn-off-notif-day'){
    const d = el.dataset.day;
    notifSettings[d] = null;
    saveNotifSettings();
    state.notifDayOpen = null;
    render();
  }
  else if(action==='set-fontsize'){ state.fontSize = el.dataset.size; savePrefs(); render(); }
  else if(action==='open-language'){ state.languageModal=true; render(); }
  else if(action==='close-language'){ state.languageModal=false; render(); }
  else if(action==='set-lang'){ state.lang = el.dataset.lang; savePrefs(); state.languageModal=false; render(); }
  else if(action==='set-theme'){ state.theme = el.dataset.theme; savePrefs(); render(); }
  else if(action==='go-today'){
    const m = state.purchased.length ? state.purchased[0] : 1;
    if(state.purchased.includes(m)){
      state.activeMonth = m;
      state.activeChapter = 1;
      state.screen = 'daily';
      state.activeTab = 'bible';
      state.highlightVerse = null;
      state.askOpen = false;
      render();
    } else {
      state.purchaseModal = m;
      state.selectedPlan = 'year';
      render();
      showToast(T('toastNeedPurchase', bookName(m)));
    }
  }
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
    state.activeMonth = Number(el.dataset.month);
    state.activeChapter = Number(el.dataset.chapter);
    state.screen='daily';
    state.activeTab='bible';
    state.highlightVerse=null;
    state.askOpen=false;
    render();
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
    const name = (inp && inp.value.trim()) || '새 그룹방';
    const g = {
      id:'g-'+Date.now(),
      name,
      color:GROUP_COLORS[groups.length % GROUP_COLORS.length],
      code:makeCode(),
      ownerUid: state.user && state.user.uid,
      photoUrl:null,
      memberCount:2,
      messages:[{id:'m-'+Date.now(), from:'시스템', isMe:false, type:'system', text:'그룹방이 만들어졌어요. 링크로 초대해 함께 말씀을 나눠보세요.'}]
    };
    groups.push(g);
    saveGroups();
    state.createGroupOpen = false;
    state.activeGroupId = g.id;
    state.screen = 'group-room';
    render();
    showToast('그룹방이 만들어졌어요');
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
    showToast(channel ? `${channel} 공유 화면으로 연결하고 링크를 복사했어요` : '초대 링크가 복사되었어요');
  }
  else if(action==='open-share-picker'){
    state.shareGroupId = el.dataset.id;
    render();
  }
  else if(action==='close-share-picker'){
    state.shareGroupId = null;
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
    const label = `${bookName(state.activeMonth)} ${state.activeChapter}${state.lang==='en'?'':'장'}`;
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
    const label = `${bookName(state.activeMonth)} ${state.activeChapter}${state.lang==='en'?'':'장'}`;
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
    state.shareGroupId = null;
    state.shareBusy = true;
    render();
    showToast(T('shareGenerating'));
    const key = ckey(state.activeMonth, state.activeChapter);
    const label = `${bookName(state.activeMonth)} ${state.activeChapter}${state.lang==='en'?'':'장'}`;

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
