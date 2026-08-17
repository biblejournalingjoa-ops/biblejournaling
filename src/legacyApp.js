/* ---------------- data ---------------- */
const BOOKS = [
  { m:1, ko:'창세기', en:'Genesis' },
  { m:2, ko:'출애굽기', en:'Exodus' },
  { m:3, ko:'레위기', en:'Leviticus' },
  { m:4, ko:'민수기', en:'Numbers' },
  { m:5, ko:'신명기', en:'Deuteronomy' },
];
function bookName(m){
  const b = BOOKS.find(x=>x.m===m);
  if(!b) return '';
  return state.lang==='en' ? b.en : b.ko;
}
const CHAPTER_COUNTS = { 1:50, 2:40, 3:27, 4:36, 5:34 }; // Genesis, Exodus, Leviticus, Numbers, Deuteronomy
function ckey(m, c){ return `${m}-${c}`; }
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
    langLabel:'언어', langKo:'한국어', langEn:'English',
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
    notif:'알림 설정', account:'계정 정보', contact:'문의하기', logout:'로그아웃',
    notifTitle:'알림 설정', notifSub:'요일을 선택해서 묵상 알림 시간을 설정해 보세요.',
    dayMon:'월요일', dayTue:'화요일', dayWed:'수요일', dayThu:'목요일', dayFri:'금요일',
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
    todayWord:'오늘', moveToday:'오늘로 이동', calLegend:'작성한 묵상 기록이 있는 날',
    calTitle:(name)=>`${name} 저널 캘린더`, calCap:'2026 · Bible Journal',
    chapterGridSub:'읽고 싶은 장을 선택해 주세요.',
    dailyCap:(name)=>`${name}의 말씀 여정`,
    navBible:'성경', navContent:'내용 질문 기록', navThought:'생각 질문 기록',
    todayReading:'오늘의 말씀', chapterNote:'본문은 이해를 돕기 위한 요약 예시입니다.',
    chapterInfoBtn:'장 배경 설명 보기',
    chapterInfoTitle:(book,ch)=>`${book} ${ch}장 배경 설명`,
    chapterInfoEmptyTitle:'준비 중이에요',
    chapterInfoEmptyBody:'이 장의 배경 설명은 곧 추가될 예정이에요.',
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
    langLabel:'Language', langKo:'한국어', langEn:'English',
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
    notif:'Notifications', account:'Account', contact:'Contact us', logout:'Log out',
    notifTitle:'Notifications', notifSub:'Choose a weekday to set a reflection reminder time.',
    dayMon:'Monday', dayTue:'Tuesday', dayWed:'Wednesday', dayThu:'Thursday', dayFri:'Friday',
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
    todayWord:'Today', moveToday:'Jump to today', calLegend:'Days with a saved reflection',
    calTitle:(name)=>`${name} calendar`, calCap:'2026 · Bible Journal',
    chapterGridSub:'Choose a chapter to read.',
    dailyCap:(name)=>`${name} journey`,
    navBible:'Bible', navContent:'Content Qs', navThought:'Reflection',
    todayReading:"Today's reading", chapterNote:'This passage is a summarized sample for demo purposes.',
    chapterInfoBtn:'View chapter background',
    chapterInfoTitle:(book,ch)=>`Background: ${book} ${ch}`,
    chapterInfoEmptyTitle:'Coming soon',
    chapterInfoEmptyBody:"Background notes for this chapter will be added soon.",
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
  },
};
function T(key, ...args){
  const dict = STRINGS[state.lang] || STRINGS.ko;
  const v = dict[key];
  if(v===undefined) return '';
  return typeof v==='function' ? v(...args) : v;
}

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
};

/* ---------------- state ---------------- */
let state = {
  screen:'loading',         // loading | main | login | signup | chapters | daily | groups | group-room | settings
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
  createGroupOpen:false,
  inviteGroupId:null,       // group id whose invite sheet is open
  shareGroupId:null,        // group id whose share-picker sheet is open
  shareBusy:false,          // true while generating the snapshot image
  imageViewer:null,         // { groupId, msgId, index } when the full-screen image viewer is open
  chapterInfoOpen:false,    // whether the chapter background info sheet is open
  notifDayOpen:null,        // which weekday's time-set sheet is open ('mon'..'fri')
  pageShare:null,           // { kind:'content'|'thought', step:'menu'|'pickGroup' } when the page share menu is open
  fontSize:'default',       // small | default | large
  lang:'ko',                // ko | en
  theme:'light',            // light | dark
  signupTermsConsent:false, // terms-of-service checkbox on the signup screen
  signupTermsConsentOpen:false,
  signupConsent:false,      // privacy consent checkbox on the signup screen
  signupConsentOpen:false,  // whether the consent detail text is expanded
  prevScreen:'main',        // where to return to when leaving settings
};

const YEAR = 2026;

// journalData: { 'YYYY-MM-DD': { content:{qid:text}, thought:{...} } }
let journalData = {};

// notifSettings: { mon: '07:00'|null, tue: ..., wed: ..., thu: ..., fri: ... }  (null = off)
let notifSettings = { mon:null, tue:null, wed:null, thu:null, fri:null };
const NOTIF_DAYS = ['mon','tue','wed','thu','fri'];

// groups: [{ id, name, color, code, memberCount, messages:[{id, from, isMe, type:'text'|'journal'|'image'|'system', text, unread, ...}] }]
let groups = [];
let groupsLoaded = false;

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
  const noAnswer = state.lang==='en' ? 'No answer written yet' : '아직 작성한 답이 없어요';
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
        <div class="snap-eyebrow">${escapeHtml(bookName(state.activeMonth))} ${state.activeChapter}${state.lang==='en'?'':'장'} · ${T('navContent')}</div>
        <div class="snap-date">${todayDateLabelKorean()}</div>
      </div>
      ${cards}
      <div class="snap-footer">Bible Journal · 말씀 묵상 저널</div>
    </div>`;
}
function buildThoughtSnapshotHTML(key){
  const entry = getEntry(key);
  const t = entry.thought;
  const noAnswer = state.lang==='en' ? 'Not written yet' : '아직 작성하지 않았어요';
  const val = (v)=> (v && v.trim()) ? `<div class="snap-value">${escapeHtml(v)}</div>` : `<div class="snap-value empty">${noAnswer}</div>`;
  const askQ = t.askIndex!==null ? ASK_QUESTIONS[t.askIndex] : (state.lang==='en' ? 'No question selected' : '선택한 질문이 없어요');
  const thanksRows = (t.thanks||[]).filter(v=>v && v.trim()).map((v,i)=>`
    <div class="snap-thanks-row"><div class="num">${i+1}</div><div style="font-size:13px">${escapeHtml(v)}</div></div>
  `).join('') || `<div class="snap-value empty">${noAnswer}</div>`;

  return `
    <div class="snap-card" id="snap-render-target">
      <div class="snap-header">
        <div class="snap-eyebrow">${escapeHtml(bookName(state.activeMonth))} ${state.activeChapter}${state.lang==='en'?'':'장'} · ${T('navThought')}</div>
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

let toastTimer=null, saveTimer=null;

/* ---------------- persistence ---------------- */
async function loadAll(){
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
  render();
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
function saveGroups(){
  window.storage.set('groups-data', JSON.stringify(groups), false).catch(()=>{});
}
function saveAnswersDebounced(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(()=>{
    window.storage.set('journal-entries', JSON.stringify(journalData), false).catch(()=>{});
  }, 450);
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
function todayLabel(){
  const d = new Date();
  const days=['일','월','화','수','목','금','토'];
  return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
}

/* ---------------- render root ---------------- */
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
  else if(state.screen==='settings') html = renderSettingsScreen();
  else if(state.screen==='contact') html = renderContactScreen();
  else if(state.screen==='guide') html = renderGuideScreen();
  else if(state.screen==='notifications') html = renderNotificationsScreen();

  let overlays = '';
  if(state.purchaseModal) overlays += renderPurchaseModal();
  if(state.createGroupOpen) overlays += renderCreateGroupSheet();
  if(state.inviteGroupId) overlays += renderInviteSheet();
  if(state.shareGroupId) overlays += renderSharePicker();
  if(state.imageViewer) overlays += renderImageViewer();
  if(state.chapterInfoOpen) overlays += renderChapterInfoSheet();
  if(state.notifDayOpen) overlays += renderNotifDaySheet();
  if(state.pageShare) overlays += renderPageShareSheet();

  app.innerHTML = html + overlays + `<div class="toast" id="toast"></div>`;

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
      <span class="book-row-name">${b.ko} <span class="book-row-en">${b.en}</span></span>
      ${locked ? ICON.lock : ICON.chevRight}
    </button>`;
  }).join('');

  return `
    <div class="topbar">
      <div class="left-group">
        <button class="icon-btn" data-action="open-settings">${ICON.gear}</button>
        <button class="icon-btn icon-btn-accent" data-action="go-today" title="${T('todayNavTitle')}">${ICON.book}</button>
        <div class="streak-badge">${ICON.flame}<span class="streak-num">${streak}${state.lang==='en'?'d':'일'}</span></div>
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
    const name = state.user.name ? escapeHtml(state.user.name) : '';
    const email = state.user.email ? escapeHtml(state.user.email) : '';
    const username = state.user.username ? escapeHtml(state.user.username) : email;
    const nickname = state.user.nickname ? escapeHtml(state.user.nickname) : name;
    const photoUrl = state.user.photoUrl ? escapeHtml(state.user.photoUrl) : '';
    const avatar = photoUrl
      ? `<img src="${photoUrl}" alt="" style="width:64px;height:64px;border-radius:50%;object-fit:cover;object-position:center;display:block;">`
      : `<div style="width:64px;height:64px;border-radius:50%;background:var(--paper);box-shadow:var(--shadow-sm);display:flex;align-items:center;justify-content:center;color:var(--ink-soft);">${ICON.personCheck}</div>`;
    return `
      <button class="back-fab" data-action="go-main">${ICON.back}</button>
      <div class="screen-center">
        <div class="login-mark">
          <div style="display:flex;justify-content:center;margin-bottom:10px;">${avatar}</div>
          <div class="eyebrow">${T('loginWelcome')}</div>
          <h2>${name || email}</h2>
        </div>
        <div class="field">
          <label>${T('usernameLabel')}</label>
          <div style="padding:13px 14px;border-radius:12px;border:1px solid var(--line);background:var(--paper);font-size:14px;color:var(--ink);">${username}</div>
        </div>
        <div class="field">
          <label>${T('nicknameLabel')}</label>
          <div style="padding:13px 14px;border-radius:12px;border:1px solid var(--line);background:var(--paper);font-size:14px;color:var(--ink);">${nickname}</div>
        </div>
        <button class="btn btn-primary" data-action="do-logout">${T('logout')}</button>
      </div>
    `;
  }
  return `
    <button class="back-fab" data-action="go-main">${ICON.back}</button>
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
      <p class="terms-sub" style="text-align:center;margin-bottom:18px;font-size:12.5px;color:var(--ink-soft);">${T('signupSub')}</p>

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
        <div class="g-title">${T('fontSizeLabel')}</div>
        <div class="pill-toggle">
          <button class="${state.fontSize==='small'?'selected':''}" data-action="set-fontsize" data-size="small">${T('fontSmall')}</button>
          <button class="${state.fontSize==='default'?'selected':''}" data-action="set-fontsize" data-size="default">${T('fontDefault')}</button>
          <button class="${state.fontSize==='large'?'selected':''}" data-action="set-fontsize" data-size="large">${T('fontLarge')}</button>
        </div>
      </div>

      <div class="settings-group">
        <div class="g-title">${T('langLabel')}</div>
        <div class="pill-toggle">
          <button class="${state.lang==='ko'?'selected':''}" data-action="set-lang" data-lang="ko">${T('langKo')}</button>
          <button class="${state.lang==='en'?'selected':''}" data-action="set-lang" data-lang="en">${T('langEn')}</button>
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
          <div class="setting-item">${T('account')} <span class="arrow">${ICON.chevRight}</span></div>
          <div class="setting-item" data-action="go-guide">${T('guideMenu')} <span class="arrow">${ICON.chevRight}</span></div>
          <div class="setting-item" data-action="go-contact">${T('contact')} <span class="arrow">${ICON.chevRight}</span></div>
          <div class="setting-item" data-action="do-logout">${T('logout')} <span class="arrow">${ICON.chevRight}</span></div>
        </div>
      </div>
    </div>
  `;
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

/* ---------------- usage guide screen ---------------- */
function renderGuideScreen(){
  return `
    <div class="settings-header">
      <button class="icon-btn" data-action="open-settings">${ICON.back}</button>
      <h2>${T('guideTitle')}</h2>
    </div>
    <div class="settings-body">
      <div class="guide-empty">
        <div class="guide-empty-icon">${ICON.book}</div>
        <div class="guide-empty-title">${T('guideEmptyTitle')}</div>
        <p class="guide-empty-body">${T('guideEmptyBody')}</p>
      </div>
    </div>
  `;
}

/* ---------------- notification settings screen ---------------- */
function renderNotificationsScreen(){
  const dayKeys = { mon:'dayMon', tue:'dayTue', wed:'dayWed', thu:'dayThu', fri:'dayFri' };
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
  const dayKeys = { mon:'dayMon', tue:'dayTue', wed:'dayWed', thu:'dayThu', fri:'dayFri' };
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
      <div class="group-avatar" style="background:${g.color}">${g.name.slice(0,1)}</div>
      <div class="group-info">
        <div class="g-name">${g.name}</div>
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
      <div class="r-avatar" style="background:${g.color}">${g.name.slice(0,1)}</div>
      <div class="titles">
        <h2>${g.name}</h2>
        <div class="cap">${g.messages.length}개 대화</div>
      </div>
      <button class="invite-btn" data-action="open-invite" data-id="${g.id}">${ICON.link}</button>
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
        <h2>${bookName(m)} ${c}${state.lang==='en'?'':'장'}</h2>
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

function renderBibleTab(){
  const verses = CHAPTER.verses.map((text,idx)=>{
    const n = idx+1;
    return `<div class="verse" id="verse-${n}"><span class="vnum">${n}</span><span>${text}</span></div>`;
  }).join('');
  return `
    <div class="chapter-card">
      <div class="chapter-card-head">
        <div>
          <div class="cap">${T('todayReading')}</div>
          <h3>${bookName(state.activeMonth)} ${state.activeChapter}${state.lang==='en'?'':'장'}</h3>
        </div>
        <button class="chapter-info-btn" data-action="open-chapter-info" title="${T('chapterInfoBtn')}">${ICON.info}</button>
      </div>
      <div class="verse-list">${verses}</div>
    </div>
  `;
}

/* ---------------- chapter background info sheet ---------------- */
function renderChapterInfoSheet(){
  return `
  <div class="overlay" data-action="close-chapter-info">
    <div class="sheet" data-action="noop">
      <div class="sheet-handle"></div>
      <div class="modal-title">${T('chapterInfoTitle', bookName(state.activeMonth), state.activeChapter)}</div>
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
  const askQ = t.askIndex!==null ? ASK_QUESTIONS[t.askIndex] : T('askPlaceholderQ');
  const askList = ASK_QUESTIONS.map((q,i)=>`
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
    window.__firebaseAuth.signInWithEmail(email, password).then(profile=>{
      window.storage.set('user-profile', JSON.stringify(profile), false).catch(()=>{});
      state.user = { name:profile.name, email:profile.email, photoUrl:profile.photoUrl };
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
      window.__firebaseAuth.signInWithGoogle().then(profile=>{
        window.storage.set('user-profile', JSON.stringify(profile), false).catch(()=>{});
        if(window.__firebaseDB && window.__firebaseDB.ready){
          window.__firebaseDB.saveUserProfile(profile.uid, { name:profile.name, email:profile.email, photoUrl:profile.photoUrl, provider:'google' }).catch(()=>{});
        }
        state.user = { name:profile.name, email:profile.email, photoUrl:profile.photoUrl };
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
      window.__firebaseAuth.signInWithKakao().then(profile=>{
        window.storage.set('user-profile', JSON.stringify(profile), false).catch(()=>{});
        if(window.__firebaseDB && window.__firebaseDB.ready){
          window.__firebaseDB.saveUserProfile(profile.uid, { name:profile.name, email:profile.email, photoUrl:profile.photoUrl, provider:'kakao' }).catch(()=>{});
        }
        state.user = { name:profile.name, email:profile.email, photoUrl:profile.photoUrl };
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
    window.__firebaseAuth.signUpWithEmail(email, pw, name).then(profile=>{
      const fullProfile = { ...profile, name, birth, username, nickname };
      window.storage.set('user-profile', JSON.stringify(fullProfile), false).catch(()=>{});
      if(window.__firebaseDB && window.__firebaseDB.ready){
        window.__firebaseDB.saveUserProfile(profile.uid, {
          name, email, birth, username, nickname, provider:'password',
          termsConsent:true, privacyConsent:true, consentAgreedAt:new Date().toISOString(),
        }).catch(err=>console.error('Firestore save failed:', err));
      }
      state.user = { name:fullProfile.name, email:fullProfile.email, photoUrl:fullProfile.photoUrl, username:fullProfile.username, nickname:fullProfile.nickname };
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
      state.loggedIn=false; state.user=null; saveAuth(); state.screen='login'; render(); showToast(T('toastLogout'));
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
  else if(action==='open-settings'){ state.screen='settings'; render(); }
  else if(action==='go-contact'){ state.screen='contact'; render(); }
  else if(action==='do-email-contact'){
    openEmailContact('biblejournalingjoa@gmail.com', T('contactMailSubject'), T('contactMailBody'));
  }
  else if(action==='go-guide'){ state.screen='guide'; render(); }
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
  else if(action==='set-lang'){ state.lang = el.dataset.lang; savePrefs(); render(); }
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

initAuthGate();
loadAll();
