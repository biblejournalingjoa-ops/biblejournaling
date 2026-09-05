/* ---------------- bible book content-question data ----------------
 * Keyed by book id (a lowercase English book name, independent of BOOKS[].m
 * in legacyApp.js so future books can be added without touching existing
 * entries) -> chapter number -> ordered list of { questionNumber, question }.
 *
 * Question text is preserved verbatim from the source journaling material,
 * including embedded verse references, parenthetical notes, and footnote
 * lines (kept as extra lines inside the same question via "\n"). Do not
 * summarize, reword, renumber, or invent questions when editing this file.
 *
 * Only Genesis is populated for now. Add further books (exodus, leviticus,
 * numbers, deuteronomy, …) as their own top-level keys once their source
 * material is provided — existing entries must not be touched when doing so.
 */

export const CONTENT_QUESTIONS_META = {
  genesis: { bookName: '창세기', bookNameEn: 'Genesis', translation: '킹제임스흠정역' },
};

export const CONTENT_QUESTIONS_BY_BOOK = {
  genesis: {
    1: [
      { questionNumber: 1, question: '창1:1에 따르면 세상 역사의 시작에 어떤 일이 일어났을까?' },
      { questionNumber: 2, question: '창1:3에 따르면 세상을 창조하는 창조법은 무엇일까?' },
      { questionNumber: 3, question: "창1:3절에서 하나님이 창조하실 때 '이르시되'라고 표현한다. 창세기 1장에서 동일하게 몇번 언급되고 있는지 아래 성경 절에 이어서 모든 절을 적어보자.\n3절, 6절, 9절 그리고?" },
      { questionNumber: 4, question: "창세기1:26에 따르면, 사람은 '우리의 형상, 우리의 모습'을 따라 만들어졌다고 한다. 여기서 말하는 복수의 표현 '우리'는 누구를 말하는 것인지 내 생각을 기록해보자." },
      { questionNumber: 5, question: '창1:27에 따르면 하나님이 사람을 창조하실 때 무엇을 따라 창조했으며, 창조된 두 가지 성(性)은 무엇일까?' },
      { questionNumber: 6, question: '창1:28에 따르면, 하나님의 인간 창조 목적을 말하고 있다. 그것은 무엇인지 자신의 말로 정리하여 보자.' },
      { questionNumber: 7, question: '창1:29에 따르면, 인간에게 주신 태초 먹거리는 무엇일까?' },
    ],
    2: [
      { questionNumber: 1, question: '창2:7에 따르면,흙으로 사람을 지으시고 무엇을 할 때 살아 있는 생명이 되었을까?\n\n*네샤마(호흡,바람,숨)\n*루아흐(영,호흡,바람)' },
      { questionNumber: 2, question: '창2:15에 따르면, 하나님은 태초의 인간을 데려다가 무엇을 하도록 하셨는가?' },
      { questionNumber: 3, question: '창2:18에 따르면, 하나님이 보시기에 좋지 않았던 것은 무엇일까?\n남자를 돕는 자로 여자를 지으신 이유는 무엇 때문일까?' },
      { questionNumber: 4, question: '창2:19에 따르면, 모든 창조물들의 이름을 지은 이는 누구일까?' },
      { questionNumber: 5, question: '창2:21에 의하면,여자를 만들때 무엇을 통해 만들었을까?\n그 의미는 무엇이라고 생각하는지 내 생각을 기록해보자.' },
      { questionNumber: 6, question: '창2:24에 따르면, 남자가 여자와 한 몸이 되기 위해 우선적으로 선결되어야 할 것은?' },
      { questionNumber: 7, question: '창2:17과 창3:3에 비교해 볼 때 하와(여자)가 전한 말과 하나님의 말씀이 다른 부분은 무엇일까?' },
    ],
    3: [
      { questionNumber: 1, question: '창3:1에 따르면,사탄이 여자에게 처음으로 제시한 질문의 의도는 무엇이라고 생각하는가?' },
      { questionNumber: 2, question: '창3:4에 따르면,뱀(사탄)이 확신을 가지고 한 말은 무엇일까? 창2:17의 하나님의 말씀과 비교해보자.' },
      { questionNumber: 3, question: '창3:6에 따르면,사탄의 거짓말에 속아 넘어간 사람이 첫 번째 보인 반응은 무엇일까?' },
      { questionNumber: 4, question: '죄를 지으면 가장 먼저 나타나는 사람의 심리적 반응은 무엇일까? 창3:8,10을 읽어보자.' },
      { questionNumber: 5, question: '창3:12에 따르면, 아담이 죄를 짓고 난 이후 그 죄를 지을 수밖에 없는 원인으로 탓한 두 가지 대상은 누구일까?' },
      { questionNumber: 6, question: '창3:15은 최초의 복음이라고 불린다. 여기서 말하는 그녀의 씨는 누구이며, 뱀의 씨는 누구를 말하는 것일까?' },
      { questionNumber: 7, question: '창3:16-19에 의하면, 죄로 인해 여자에게 주어진 메시지와 죄로 인해 남자에게 주어진 메시지는 무엇일까?' },
      { questionNumber: 8, question: '창3:21에 의하면, 하나님이 아담과 하와를 보호하시기 위하여 주신 것은 무엇일까? 창3:7의 무화과나무 잎과의 차이점은 무엇일까?' },
    ],
    4: [
      { questionNumber: 1, question: '창4:4-5에 따르면, 하나님은 아벨의 헌물은 받으셨으나 가인의 헌물에는 관심을 갖지 않으셨다(쳐다보지도 않다). 그 이유는 무엇일까? 히브리서11:4을 참고해보자.' },
      { questionNumber: 2, question: '창4:7에 따르면, 가인은 죄를 다스릴 수 있는 능력을 가지고 있었을까?' },
      { questionNumber: 3, question: '창4:15에 따르면, 가인을 향한 하나님의 마음은 어떠한지 내 생각을 기록해보자.' },
      { questionNumber: 4, question: '창4:19-22에 따르면 야발, 유발, 두발가인은 무엇의 조상일까?' },
      { questionNumber: 5, question: '창4:24에 따르면, 가인을 위해서는 7배로 복수하지만, 라멕을 위해서는 77배로 복수하리라는 말의 의미는 무엇일까?' },
      { questionNumber: 6, question: '창4:25에 따르면, 죽은 아벨 대신 하나님이 주신 새로운 아들은 누구일까?\n역대상1:1을 읽어보자.' },
      { questionNumber: 7, question: '셋의 아들인 에노스의 때에 사람들이 무엇을 시작했을까?\n*부르다(말을 걸다, 선포하다)' },
    ],
    5: [
      { questionNumber: 1, question: '창5:1에 따르면, 하나님이 사람을 창조하실 때 누구의 형상을 따라 지으셨을까?' },
      { questionNumber: 2, question: '창5:2에 근거할 때 인간 창조의 특징은 어떠한가?' },
      { questionNumber: 3, question: '창5:22에 따라 에녹의 삶의 특징을 내 말로 표현해 본다면?' },
      { questionNumber: 4, question: '창5:24에 따르면, 에녹이 300년간 하나님과 동행하다가 없어진 이유는 무엇일까?' },
      { questionNumber: 5, question: '인류 가운데 가장 오래 산 사람이 므두셀라이다. 몇 세까지 살았을까? 창5:27을 읽어보자.' },
      { questionNumber: 6, question: "창5:29에 의하면, '노아'라는 이름의 의미는 무엇일까?" },
    ],
    6: [
      { questionNumber: 1, question: '창6:2,4에 따르면, 하나님의 아들들이 사람의 딸들의 아름다움을 보고 아내로 삼아 낳은 자녀들을 가리켜 무엇이라 불렀을까?' },
      { questionNumber: 2, question: '창6:6에 의하면 하나님이 땅 위에 사람을 지으신 것을 후회하셨다. 그 이유는 무엇 때문일까? 창6:5을 읽어보자.' },
      { questionNumber: 3, question: '창6:3에 의하면, 하나님이 세상을 심판하기로 하셨을 때 인간의 수명을 몇 년으로 제한하셨을까?' },
      { questionNumber: 4, question: '창6:8에 따르면, 노아가 하나님께 받은 것은?' },
      { questionNumber: 5, question: '창6:9에 따르면 노아는 어떤 사람인가?' },
      { questionNumber: 6, question: '창6:11,13에 의하면, 하나님이 땅에 심판을 내리려는 이유는 무엇인가?\n로마서6:23도 읽어보자.' },
      { questionNumber: 7, question: '창6:22, 창7:5에 따르면, 노아가 행한 것은 어떤 것들인가?' },
      { questionNumber: 8, question: '창6:20에 따르면, 각 종류의 짐승들을 어떻게 방주에 태웠을까?\n(shall come unto thee)' },
    ],
    7: [
      { questionNumber: 1, question: '창7:1에 따르면 죽음에서 구원받는 조건은 무엇일까?' },
      { questionNumber: 2, question: '창7:4에 따르면, 대홍수 유예기간과 비가 내린 기간은 얼마이며,\n멸망 당하는 심판의 대상은 누구일까?(6:3비교)' },
      { questionNumber: 3, question: '창7:11에 따르면, 대홍수의 비(물)의 2가지 근원은 어디일까?' },
      { questionNumber: 4, question: '창7:12에 따르면, 비가 땅에 쏟아져 내린 기간은 며칠 밤낮일까?' },
      { questionNumber: 5, question: '창7:16에 따르면, 방주의 문을 닫은 이는 누구일까?' },
      { questionNumber: 6, question: '창7:19에 의하면, 홍수가 났을 때 물로 덮였던 것은 무엇일까?' },
      { questionNumber: 7, question: '창7:23에 따르면, 오직 살아남은 이들은 누구일까?' },
    ],
    8: [
      { questionNumber: 1, question: '창8:1에 따르면, 물들은 어떤 자연현상을 통해 줄어들게 되었을까?' },
      { questionNumber: 2, question: '창8:3에 의하면, 물들은 언제부터 줄어들게 되었을까?' },
      { questionNumber: 3, question: '창8:11에 따르면, 비둘기가 올리브 잎사귀를 뜯은 것은 무엇을 의미하는걸까?' },
      { questionNumber: 4, question: '창8:17에 의하면 노아 언약의 핵심은 무엇일까?' },
      { questionNumber: 5, question: '창8:21에서 언급하는 하나님이 맡으신 향기로운 냄새는\n무엇이었을까? 창8:20을 읽어보자.' },
      { questionNumber: 6, question: '창8:22에 의하면, 땅이 있는 동안 없어지지 않는 것들은 무엇일까?' },
    ],
    9: [
      { questionNumber: 1, question: '창9:1,9:7에 동일하게 반복되는 노아에게 주신 언약은?' },
      { questionNumber: 2, question: '창9:3에 의하면, 노아의 홍수 이후 하나님이 주신 먹거리는?' },
      { questionNumber: 3, question: '하나님은 사람이 사람을 죽이는 살인 행위에 대하여 응당한 보응을 똑같이 받을 것이라고 말한다. 그 이유는 무엇 때문일까?\n창9:6을 읽어보자.' },
      { questionNumber: 4, question: '창9:13에 의하면, 하나님과 땅과의 언약의 증표는 무엇일까?' },
      { questionNumber: 5, question: '대 홍수 이후 온 세상에 퍼진 사람들의 조상 세 사람은 누구일까? 창9:18-19을 읽어보자.' },
      { questionNumber: 6, question: '창9:22을살펴보면,함이 아버지의 벌거벗음(히:에르와)을 보고(히:라아)형제들에게 고했다. 그러나 셈과 야벳은 어떻게 대응했는가?' },
      { questionNumber: 7, question: '창9:25에 따르면, 가나안(창10:6)이 받은 저주는 무엇일까?' },
    ],
    10: [
      { questionNumber: 1, question: '창10:1에 따르면, 노아의 세 아들의 이름은 무엇일까?' },
      { questionNumber: 2, question: '땅의 민족들이 형성된 기준은 무엇일까? 창10:5을 읽어보자.' },
      { questionNumber: 3, question: "창10:8-12에 따르면, 함의 자손 중 '세상에 처음 나타난 용사- 강력한 자'로 불리며 여러 도시를 건설한 이는 누구일까?" },
      { questionNumber: 4, question: '창10:25에 따르면, 땅이 나뉘어진 때는 누구의 때일까?' },
    ],
    11: [
      { questionNumber: 1, question: '창11:1에 따르면, 온 땅에 언어는 몇 개였을까?' },
      { questionNumber: 2, question: '창11:4에 의하면, 바벨탑을 쌓는 사람들이 탑을 쌓은 이유는 무엇 때문일까? (창1:28,창12:2비교)' },
      { questionNumber: 3, question: '창11:9에 따르면, 하나님은 사람들을 온 지면에 널리 흩으셨다고 말한다. 왜 그랬을까? 내 생각을 기록해보자.' },
      { questionNumber: 4, question: '창11:10에 따르면, 아르박삿은 셈의 후손이다. 이 아르박삿과 벨렉(17절) 후손 가운데 태어난 믿음의 사람은 누구일까? 11:26을 읽어보자. 그리고 마태복음1:1을 기록해보자.' },
    ],
    12: [
      { questionNumber: 1, question: '창12:1에 따르면, 하나님은 아브람에게 어디로 가라고 하셨을까?' },
      { questionNumber: 2, question: '창12:2-3에 의하면 하나님이 아브람과 맺은 언약의 내용은 무엇일까?' },
      { questionNumber: 3, question: '창12:4에 의하면, 아브람이 하란을 떠난 이유는 무엇 때문일까?' },
      { questionNumber: 4, question: '창12:6-7에 따르면, 네 씨에게 주리라 한 그 땅은 어디인가?' },
      { questionNumber: 5, question: '창12:13에 따르면, 아브람이 아내 사라를 누이라 한 이유는 자신의 목숨이 누구에게 달려있다고 믿고 있는걸까?' },
    ],
    13: [
      { questionNumber: 1, question: '창13:2에 따르면, 아브람이 가나안 땅에 들어갈 때 심히 가득했던 것은 무엇일까?' },
      { questionNumber: 2, question: '창13:11에 따르면, 롯이 택한 땅은 어떤 땅과 유사한 곳이었을까?\n롯은 왜 그곳을 택했을까? 내 생각을 기록해보자.' },
      { questionNumber: 3, question: '창13:12에 따르면, 아브람은 어디에 거했을까?' },
      { questionNumber: 4, question: '창13:15에 따르면, 주시고자 하는 땅의 영역은 어디까지인가?' },
      { questionNumber: 5, question: '창13:17에 따르면, 하나님이 주시겠다고 하신 땅은 어디까지인가?' },
    ],
    14: [
      { questionNumber: 1, question: '창14:8에 따르면, 반역을 일으킨 다섯 왕은 어디서 싸웠을까?' },
      { questionNumber: 2, question: '창14:12에 따르면, 이 전쟁에서 소돔에 거하던 롯의 결과는 어땠을까?' },
      { questionNumber: 3, question: '창14:14에 따르면, 아브람의 군사들은 어디까지 쫓아가서 모든 것을 되찾아 왔을까?' },
      { questionNumber: 4, question: '창14:18에 따르면, 살렘 왕 멜기세덱이 가져온 것은 무엇일까?' },
      { questionNumber: 5, question: '창14:20에 따르면, 아브라함이 원수들을 넘겨주신 하나님을 송축하며 하나님께 자원하여 드린 것은 무엇일까?' },
      { questionNumber: 6, question: '창14:23에 의하면, 아브람이 전쟁 전리품들을 소돔 왕으로부터 받지 않은 궁극적 이유는 무엇 때문일까?' },
    ],
    15: [
      { questionNumber: 1, question: '창15:1에 의하면, 하나님은 아브람에게 자신은 누구라고 말하시는가?' },
      { questionNumber: 2, question: '창15:2에 비추어보면 아브람이 두려워한 이유는 무엇 때문일까?\n현재 내가 느끼는 불확실성의 두려움이 있다면?' },
      { questionNumber: 3, question: '창15:6에 따르면, 아브람이 의롭게 된 근거는 무엇일까?' },
      { questionNumber: 4, question: '창15:7에 의하면, 하나님이 갈대아 우르에서 아브람을 데리고 나온 궁극적인 이유는 무엇일까?' },
      { questionNumber: 5, question: '창15:16에 따르면, 4세대 만에 이스라엘이 다시 히브리 땅으로 오는 이유는 무엇일까?' },
    ],
    16: [
      { questionNumber: 1, question: '창16:2에 의하면, 사래가 여종을 통해 아기를 낳으려고 한 이유는 무엇 때문일까?' },
      { questionNumber: 2, question: '창16:3에 의하면, 하갈을 통해 아기를 낳은 때는 아브람이 가나안땅에 거한지 얼마나 흘렀을 때일까?' },
      { questionNumber: 3, question: '창16:5에 따르면, 사래가 탓하는 대상은 누구일까?\n창16:2에 따르면, 사래가 임신하지 못한 것에 대해 탓하는 대상은 누구일까?' },
      { questionNumber: 4, question: '창16:10에 따르면, 여종 하갈에게 준 약속은 무엇일까?\n(창25:12-16참조)' },
      { questionNumber: 5, question: '창16:15에 따르면, 이스마엘은 누구의 이름일까?' },
    ],
    17: [
      { questionNumber: 1, question: '창17:1에 따르면, 아브람이 99세였을 때 주신 메시지는 무엇일까?' },
      { questionNumber: 2, question: '창17:4-8에 의하면, 아브람이 99세였을 때 하나님이 하신 약속은 무엇일까?' },
      { questionNumber: 3, question: '창17:11에 따르면, 언약의 증표로 육체에 행했던 의식은 무엇일까?' },
      { questionNumber: 4, question: '창17:16에 따르면, 사라에게 준 하나님의 약속은 무엇일까?' },
      { questionNumber: 5, question: '창17:21에 따르면, 하나님은 언약을 누구와 더불어 세울 것이라고 말씀하셨을까?' },
      { questionNumber: 6, question: '창17:23에 따르면, 아브라함은 언제 할례를 행했을까?' },
    ],
    18: [
      { questionNumber: 1, question: '창18:2에 등장하는 세 남자는 누구를 가리키는 것일까? 내 생각을 기록해보자. (창19:1을 읽어보자)' },
      { questionNumber: 2, question: '창18:2에 따르면, 아브라함은 세 나그네를 보고 어떻게 맞이했을까?' },
      { questionNumber: 3, question: '창18:10에 따르면, 사라에게 아들이 생기는 그때가 언제라고 얘기하고 있을까?' },
      { questionNumber: 4, question: '창18:12과 18:15에 비추어볼 때 하나님을 무엇을 들으실까?' },
      { questionNumber: 5, question: '창18:19에 따르면, 하나님은 아브라함의 무엇을 알고 계셨을까?' },
      { questionNumber: 6, question: '창18:20에 따르면, 하나님은 주목하고 보시는 것은 무엇일까?' },
      { questionNumber: 7, question: '창18:23-33을 비추어 볼 때, 아브라함의 심정은 어떤 것일까?\n세상 심판과 구원의 기준이 되는 근거는 무엇일까? 창18:25-26을 읽어보자.' },
    ],
    19: [
      { questionNumber: 1, question: '창19:4-5에 따르면, 롯의 집을 둘러싼 사람들은 누구이며 그들이 요구했던 것은 무엇일까?' },
      { questionNumber: 2, question: '롬1:25-32에 따르면, 하나님이 진노하시는 악한 자들(본성)의 모습은 어떤지 내 말로 그 특징들을 기록해보자.' },
      { questionNumber: 3, question: '창19:14에 따르면,소돔과 고모라의 멸망에 대한 장인의 말에 사위들은 어떻게 반응했을까?' },
      { questionNumber: 4, question: '창19:16에 따르면, 롯과 두 딸을 구원한 방법은 무엇이었을까?' },
      { questionNumber: 5, question: '창19:26에 의하면, 롯의 아내가 소금기둥이 된 이유는?\n롯의 아내가 뒤를 돌아본 이유는 무엇 때문이라고 생각이 드는가?' },
      { questionNumber: 6, question: '창19:29에 의하면, 하나님이 소돔과 고모라 땅을 멸하실 때에 롯을 구원하신 궁극적인 이유는 무엇 때문일까?' },
    ],
    20: [
      { questionNumber: 1, question: '창20:2에 의하면,그랄왕 아비멜렉이 사라를 데려간 이유는 무엇일까?' },
      { questionNumber: 2, question: '창20:3에 따르면,하나님이 아비멜렉에게 어떤 방편으로 말씀하셨을까? 그리고 강조한 메시지는 무엇일까?\n창2:24을 읽어보자.' },
      { questionNumber: 3, question: '창20:4에 비추어볼 때 아비멜렉이 알고 있는 하나님은 어떤 분이실까?' },
      { questionNumber: 4, question: '창20:7에 따르면, 하나님은 아브라함을 어떤 자라고 칭하셨을까?' },
      { questionNumber: 5, question: '창20:14에 의하면,아비멜렉이 아브라함에게 준 것들은 무엇일까?\n(참조) 창17:2 내가 나와 너 사이에 내 언약을 맺어...' },
      { questionNumber: 6, question: '하나님 자녀로서의 책임, 남편으로서의 책임, 세상에 있는 성도로서의 책임을 생각할 때 아브라함으로부터 배워야할 것은 무엇일까? 창세기20:9,16을 읽어보자.' },
      { questionNumber: 7, question: '창20:17에 따르면, 아브라함의 중보기도를 통해 하나님은 어떤 일을 행하셨을까? 그는 누구인가?' },
    ],
    21: [
      { questionNumber: 1, question: '창21:1에 따르면, 하나님이 사라를 찾아오신 것을 볼 때 하나님은 무엇에 신실하신가?' },
      { questionNumber: 2, question: '창21:2에 의하면, 사라가 수태하여 아들을 낳은 때는 언제일까?' },
      { questionNumber: 3, question: '창21:5에 따르면, 아브라함이 아들을 낳은 때는 몇세일까?' },
      { questionNumber: 4, question: '창21:20에 따르면, 하나님은 누구와 함께 하셨을까?' },
      { questionNumber: 5, question: '창21:22에 따르면, 아비멜렉과 군대장관 비골이 아브라함을 볼 때 분명하게 알고 있었던 사실은 무엇일까?' },
      { questionNumber: 6, question: "창21:31에 따르면, 아비멜렉과 아브라함이 서로 '맹세한 우물'(혹은 일곱 우물)의 이름은 무엇일까?" },
    ],
    22: [
      { questionNumber: 1, question: '창22:1에 따르면, 하나님이 아들 이삭을 번제 헌물로 드리라 한 이유는 무엇일까?\n창22:2에 따르면, 그 장소는 어디일까?(브엘세바에서 3일 길)\n이에 대한 아브라함의 반응은?창22:3을 읽어보자.' },
      { questionNumber: 2, question: '아래 말씀에 나오는 아브라함의 예언 2가지는 무엇일까?\n1)창22:5\n2)창22:8' },
      { questionNumber: 3, question: '창22:9에 의하면, 결박당하는 이삭의 태도는 어땠을까? 이사야53:7을 읽어보자.' },
      { questionNumber: 4, question: '창22:13에 따르면, 아브라함이 아들 이삭 대신 번제로 드린 제물은 무엇일까?\n그 숫양이 의미하는 대상은 누구인지 내 생각을 기록해보자.' },
      { questionNumber: 5, question: '창22:17은 복음의 선포이다. 아브라함의 씨가 차지하는 것은 무엇일까?\n이 의미는 무엇인지 내 생각을 기록해보자.' },
      { questionNumber: 6, question: '아브라함이 궁극적으로 복을 받은 이유는 무엇 때문일까? 창22:18을 읽어보자.' },
    ],
    23: [
      { questionNumber: 1, question: "창23:2에 따르면, 사라가 죽어 장사 된 곳의 지명은 무엇일까?\n'기럇아르바'-아르바의 성읍\n창23:19아브라함이 자기 아내 사라를 마므레 앞 막벨라의 밭 굴에 묻었는데 바로 그곳은 가나안 땅에 있는 헤브론이니라." },
      { questionNumber: 2, question: "창23:6에 따르면, 헷(히타이트)자손들이 아브라함을 가리켜 어떻게 지칭하고 있을까?\n'하나님이 세우신 지도자이시니'\n(직역)하나님이 높은 자리에 임명한 자" },
      { questionNumber: 3, question: '창23:16에 따르면 얼마의 가치로 마므레 앞 에브론의 밭을 샀을까?\n그 밭을 돈 주고 산 이유는 무엇일까? 내 생각을 기록해보자.' },
      { questionNumber: 4, question: '창23:17에 따르면, 아브라함의 소유로 확정된 곳은 어디일까?' },
    ],
    24: [
      { questionNumber: 1, question: '창24:1에 따르면, 아브라함은 어떤 복을 받았을까?' },
      { questionNumber: 2, question: '창24:4에 따르면, 아브라함이 아들의 아내를 삼은 기본 기준은 무엇일까?' },
      { questionNumber: 3, question: '창24:7에 따르면, 아브라함이 가진 명확한 확신의 근거가 된 말씀은 무엇일까?' },
      { questionNumber: 4, question: '창24:14,27에 따르면, 아브라함의 노종이 이삭의 아내라고 인도받는 방법은 무엇일까?\n신약 성도들은 어떻게 인도받는지 내가 기억하는 말씀에 따라 기록해보자.' },
      { questionNumber: 5, question: '창24:49에 따르면, 늙은 노종이 하나님의 인도를 확인했을지라도 관계된 상대방에서 제시한 것은 무엇일까?' },
      { questionNumber: 6, question: '창24:60에 따르면, 리브가의 오라비와 어머니가 리브가에게 전한 복음 메시지는 무엇일까?' },
      { questionNumber: 7, question: '창24:63에 따르면, 미혼 청년 이삭이 평소 자주 가졌던 일상(루틴)은 무엇이었을까?' },
    ],
    25: [
      { questionNumber: 1, question: '창25:2에 따르면, 아브라함이 사라 사후 그두라를 통해 자녀를 낳았다. 이 때 아브라함의 나이는 약 몇 세였을까?(참고:아내 사라가 147세에 떠나다)' },
      { questionNumber: 2, question: '창25:8에 따르면, 아브라함의 죽음을 어떻게 묘사하는가?\n당신의 죽음은 어떻게 묘사되었으면 좋겠는지 내 원함을 기록해보자.' },
      { questionNumber: 3, question: '창25:21에 의하면, 리브가가 임신할 수 있었던 이유는 무엇일까?' },
      { questionNumber: 4, question: '창25:26에 따르면, 이삭이 60세에 두 아들을 얻었다. 결혼 이후 얼마 만에 아들들을 얻었을까? 창25:20을 읽어보자.' },
      { questionNumber: 5, question: '창25:28에 따르면, 이삭이 에서를 사랑한 이유는 무엇 때문일까?' },
      { questionNumber: 6, question: '창25:32에 따르면, 에서가 장자권을 동생 야곱에게 판 궁극적인 이유는 무엇 때문일까?\n이삭은 고기를 아주 사랑했고, 아들 에서는 무엇을 참지 못했는가?\n내가 참지 못하는 것이 있다면 무엇인지 생각하고 기록해보자.' },
    ],
    26: [
      { questionNumber: 1, question: '창26:3-4에 따르면, 이삭에게 주신 하나님의 언약내용은 무엇일까?' },
      { questionNumber: 2, question: '이삭이 하나님으로부터 복의 언약을 받을 수 있었던 이유는 무엇 때문일까? 창26:5을 읽어보자.' },
      { questionNumber: 3, question: '아버지 아브라함과 닮은 모습을 이삭에게 찾아볼 수 있다. 죄를 가져올 뻔한(26:10) 그 행위는 무엇이며, 그 이유는 무엇 때문일까? 창26:7을 읽어보자.' },
      { questionNumber: 4, question: '창26:12-13에 따르면, 이삭이 이전 해보다 100배 수익을 얻고, 마침내 심히 큰 자가 될 수 있었던 이유는 무엇때문일까?\n엡1:3을 읽어보자.' },
      { questionNumber: 5, question: '팔레스타인들이 자신들보다 부요하고 번성하는 이삭을 보며 가졌던 감정은 무엇일까? 창26:14을 읽어보자.\n"진노는 잔인하고 성냄은 사나우나, 시기 앞에 누가 설 수 있으리요?"(잠언27:4)' },
      { questionNumber: 6, question: '물이 귀한 곳에서 파는 우물마다 이삭은 물을 얻었다.물을 주고 자리를 만들어주는 근원은 누구라고 이삭은 생각했을까? 창26:22을 읽어보자.' },
      { questionNumber: 7, question: '창26:28에 따르면, 블레셋 사람들이 이삭을 통해 발견한 사실은 무엇일까?\n세상 사람들이 하나님이 함께 하신다는 사실을 무엇을 통해 발견할까? 내 생각을 기록해보자.' },
    ],
    27: [
      { questionNumber: 1, question: '창27:4에 따르면, 아버지 이삭이 죽기 전 아들에게 하고자 했던 것은 무엇일까?' },
      { questionNumber: 2, question: '양심에 찔리는 행동(거짓)을 인하여 우려하는 야곱에게 어머니 리브가가 한 말은 무엇일까? 그녀의 말은 응답이 되었을까?창27:13을 읽어보자.' },
      { questionNumber: 3, question: '창27:8과 27:13에 따르면, 야곱이 아버지를 속여 축복을 받은 주된 공통된 이유는 무엇 때문일까?' },
      { questionNumber: 4, question: '창27:29에 따르면, 이삭이 아버지로부터 받은 축복의 메시지의 주된 내용은 무엇일까?' },
      { questionNumber: 5, question: '창27:44-45에 따르면, 어머니 리브가는 아들 야곱을 얼마 만에 다시 볼 것이라고 생각했을까?' },
      { questionNumber: 6, question: '만약, 리브가와 야곱이 간교하게 속임수를 쓰지 않았더라면 어떻게 되었을까? 내 생각을 기록해보자.' },
    ],
    28: [
      { questionNumber: 1, question: '창28:1-2에 따르면, 아버지 이삭은 야곱에게 가나안 족속의 딸들이 아닌 외삼촌 집 딸들 중에서 아내를 취하라고 권면한다.\n그 이유는 무엇인지 내 생각을 기록해보자.(고후6:14,16참조)' },
      { questionNumber: 2, question: '창28:3-4에 따르면, 야곱이 받을 아브라함의 복은 무엇일까?' },
      { questionNumber: 3, question: '창28:8-9에 따르면, 에서가 마할랏을 다시 아내로 취한 궁극적인 이유는 무엇 때문일까?' },
      { questionNumber: 4, question: '창28:12에 따르면,꿈속에 본 사닥다리가 어디에 닿았을까?' },
      { questionNumber: 5, question: '창28:15에 따르면, 하나님은 야곱에게 언제까지 야곱을 떠나지 않겠다고 약속하셨을까?' },
      { questionNumber: 6, question: '창28:17에 따르면, 하나님이 함께 계신다는 꿈의 메시지를 듣고 지은 그 장소, 벧엘의 뜻은 무엇일까?' },
      { questionNumber: 7, question: '창28:21-22에 따르면, 야곱은 하나님이 도우셔서 아버지의 집(가나안땅)으로 돌아온다는 가정하에 어떤 선포와 결단을 했을까?' },
    ],
    29: [
      { questionNumber: 1, question: '창29:11에서 야곱이 천신만고 끝에 라헬을 만나 인사하고 크게 소리 내어 운 까닭은 무엇일까?내 생각을 기록해보자.' },
      { questionNumber: 2, question: '창29:17에 따르면, 외삼촌 라반의 두 딸의 특징은 어떠했을까?\n두 딸중 메시아(예수)의 조상이 된 여인은 누구일까?' },
      { questionNumber: 3, question: '창29:20에 따르면, 야곱이 라반의 집에서 7여년 동안 일했지만 불과 며칠같이 느꼈던 이유는 무엇 때문일까?' },
      { questionNumber: 4, question: '창29:23에 따르면, 외삼촌 라반이 야곱에게 아내로 준 딸은 누구일까?\n속임을 당한 야곱은 이전에 심은 대로 거두었다.' },
      { questionNumber: 5, question: '창29:31에 따르면, 하나님이 무엇을 보고 계셨을까?' },
      { questionNumber: 6, question: "창29:35에 따르면, 레아가 네 번째 태어난 아들을 '유다'라고 부른 이유는?" },
    ],
    30: [
      { questionNumber: 1, question: "창세기30:1에 따르면, 라헬이 언니를 시기하여 '자식을 달라'고 남편에게 외친다. 불임에 대한 레아와 라헬의 차이점은 무엇일까?\n이에 대해 야곱이 분노하며 이른 메시지는 무엇일까? 창세기30:2을 읽어보자." },
      { questionNumber: 2, question: "창세기30:8에 따르면, 라헬의 심정을 대변하는 '납달리'라는 이름의 뜻은 무엇일까?" },
      { questionNumber: 3, question: '창세기30:11,13에 비추어볼 때 레아의 마음은 어떻게 보이는가?' },
      { questionNumber: 4, question: '창30:17에 따르면, 레아가 임신한 이유는?' },
      { questionNumber: 5, question: '창30:27에 따르면, 라반은 자신이 복 받은 것의 근원이 무엇이라고 고백하고 있을까?' },
      { questionNumber: 6, question: '야곱이 외삼촌에게 요구한 한 가지는 경제적 독립(30:30)이었다. 재물 얻을 능력을 야곱은 어떻게 활용했을까? 창세기30:38-39을 읽어보자.' },
    ],
  },
};

/**
 * @param {string} bookId - e.g. 'genesis'
 * @param {number} chapter
 * @returns {{ meta: object, chapter: number, questions: {questionNumber:number, question:string}[] } | null}
 */
export function getContentQuestions(bookId, chapter) {
  const book = bookId && CONTENT_QUESTIONS_BY_BOOK[bookId];
  const questions = book && book[chapter];
  if (!questions) return null;
  return { meta: CONTENT_QUESTIONS_META[bookId] || null, chapter, questions };
}
