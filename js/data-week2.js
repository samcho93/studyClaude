/* 2주차 — 코딩 워크플로우 */
window.WEEK2 = [
  /* ----------------------------------------------------- Day 7 */
  {
    id: 7, week: 2, icon: "🎯", time: "50분", level: 1,
    title: "프롬프트 패턴",
    subtitle: "특정 작업을 정확하게 시키는 효과적인 프롬프트의 공식을 익힙니다.",
    goals: ["좋은 프롬프트의 5요소를 안다", "막연한 요청을 구체적인 요청으로 바꾼다", "상황별 프롬프트 템플릿을 갖춘다"],
    analogy: { i: "🚕", t: "택시 기사에게 \"좋은 데로 가 주세요\"라고 하면 어디로 갈지 모릅니다. \"강남역 11번 출구, 고속도로 말고 일반 도로로, 7시까지\"라고 해야 원하는 곳에 도착하죠. <b>목적지·조건·기한</b>을 말해 주는 것이 프롬프트의 핵심입니다." },
    sections: [
      {
        h: "좋은 프롬프트의 5요소",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>요소</th><th>질문</th><th>예시</th></tr>
        <tr><td>🎯 <b>목표</b></td><td>무엇을 원하나?</td><td>회원가입 폼에 이메일 검증 추가</td></tr>
        <tr><td>📍 <b>맥락</b></td><td>어디서, 왜?</td><td><code>@src/SignupForm.tsx</code>, 잘못된 이메일로 가입되는 문제</td></tr>
        <tr><td>🚧 <b>제약</b></td><td>지켜야 할 것은?</td><td>새 라이브러리 설치 금지, 기존 스타일 유지</td></tr>
        <tr><td>📐 <b>예시</b></td><td>어떤 모양이어야?</td><td>에러 문구는 '올바른 이메일을 입력하세요'</td></tr>
        <tr><td>✅ <b>완료 기준</b></td><td>어떻게 확인?</td><td>테스트 추가 후 <code>npm test</code> 통과</td></tr></table></div>`,
      },
      {
        h: "실전 프롬프트 패턴 6가지",
        body: `<ol>
        <li><b>탐색 먼저</b>: "먼저 관련 코드를 읽고 어떻게 동작하는지 설명해 줘. 아직 고치지 마."</li>
        <li><b>선택지 요청</b>: "방법 3가지를 장단점과 함께 비교해 줘. 추천도 해 줘."</li>
        <li><b>단계 분할</b>: "1단계만 먼저 해 줘. 확인 후 다음 단계 진행하자."</li>
        <li><b>검증 포함</b>: "수정 후 테스트를 돌려서 통과하는지까지 확인해 줘."</li>
        <li><b>되묻기 허용</b>: "요구사항이 불분명하면 구현 전에 질문해 줘."</li>
        <li><b>깊은 사고</b>: "think hard — 경계 조건과 예외 상황까지 고려해서 계획해 줘."</li></ol>`,
        tip: "<b>🖼️ 이미지도 프롬프트</b> 화면 캡처나 디자인 시안을 터미널에 드래그하거나 붙여넣으면(<kbd>Ctrl</kbd>+<kbd>V</kbd>) Claude 가 보고 작업합니다.",
      },
      {
        h: "구조화된 긴 프롬프트",
        body: "<p>요구사항이 많을 때는 제목이나 XML 태그로 구역을 나누면 Claude 가 헷갈리지 않습니다.</p>",
        code: { lang: "md", file: "구조화 프롬프트", text: "<goal>\n주문 목록 페이지에 날짜 필터 추가\n</goal>\n\n<context>\n- 파일: @src/pages/Orders.tsx, @src/api/orders.ts\n- API 는 이미 ?from=&to= 파라미터를 지원함\n</context>\n\n<constraints>\n- 날짜 선택은 기존 DatePicker 컴포넌트 사용\n- 새 패키지 설치 금지\n</constraints>\n\n<done>\n- 필터 적용 시 URL 쿼리에 반영\n- Orders.test.tsx 에 테스트 2개 추가, npm test 통과\n</done>" },
      },
    ],
    viz: {
      type: "compare", title: "같은 요청, 다른 결과",
      bad: { h: "막연한 요청", code: "로그인 고쳐줘", note: "무엇이 문제인지, 어느 파일인지, 어떻게 확인할지 모름 → Claude 가 추측해서 엉뚱한 곳을 수정할 수 있음" },
      good: { h: "구체적인 요청", code: "@src/auth/login.ts 에서 비밀번호가 틀려도\n로그인되는 버그가 있어.\n\n- 원인을 먼저 설명하고 수정해 줘\n- 다른 인증 로직은 건드리지 마\n- 틀린 비밀번호 테스트를 추가하고\n  npm test 로 통과 확인해 줘", note: "목표·맥락·제약·완료 기준이 모두 있음 → 한 번에 정확한 결과" },
    },
    practice: [
      {
        type: "editor", label: "✍️ 프롬프트 작성", title: "막연한 프롬프트를 고쳐 쓰기",
        intro: "아래의 '검색 기능 만들어줘'를 좋은 프롬프트로 바꿔 보세요. 상황: 블로그 앱(src/pages/PostList.jsx)에 게시글 제목 검색이 필요합니다.",
        file: "prompt.txt",
        starter: "검색 기능 만들어줘",
        checks: [
          { label: "📍 @ 로 관련 파일을 지정했다", re: /@[\w./-]+\.\w+/ },
          { label: "🎯 무엇을 검색하는지 구체적이다 (제목/본문 등)", re: /(제목|본문|태그|작성자)/ },
          { label: "🚧 제약 조건이 있다 (금지/유지/말고 등)", re: /(금지|유지|하지\s*마|말고|건드리지|없이)/ },
          { label: "✅ 완료 기준·검증 방법이 있다 (테스트/확인)", re: /(테스트|test|확인|검증)/i },
          { label: "📐 세부 동작이 있다 (대소문자/빈 결과/실시간 등)", re: /(대소문자|빈\s*결과|결과\s*없|실시간|입력할\s*때|debounce|디바운스)/ },
          { label: "충분히 구체적이다 (80자 이상)", fn: (v) => v.replace(/\s/g, "").length >= 80 },
        ],
        solution: "@src/pages/PostList.jsx 에 게시글 제목 검색 기능을 추가해 줘.\n\n- 상단에 검색창, 입력할 때마다 실시간으로 목록 필터링\n- 대소문자 구분 없이 제목에 포함되면 표시\n- 결과가 없으면 '검색 결과가 없습니다' 표시\n- 새 라이브러리 설치 금지, 기존 스타일 유지\n- PostList.test.jsx 에 검색 테스트를 추가하고 npm test 로 통과 확인",
      },
      {
        type: "quiz", title: "어떤 패턴을 쓸까?",
        questions: [
          { q: "처음 보는 레거시 코드를 수정해야 합니다. 첫 프롬프트로 가장 좋은 것은?", options: ["\"전부 리팩토링해 줘\"", "\"관련 코드를 읽고 동작을 설명해 줘. 아직 수정하지 마\"", "\"빨리 고쳐 줘\"", "\"새로 다시 짜 줘\""], answer: 1, explain: "<b>탐색 먼저</b> 패턴. 이해 없이 수정하면 사이드 이펙트가 생깁니다." },
          { q: "상태 관리 라이브러리를 고민 중입니다. 알맞은 프롬프트는?", options: ["\"Redux 설치해\"", "\"이 프로젝트에 맞는 상태 관리 방법 3가지를 장단점과 함께 비교하고 추천해 줘\"", "\"아무거나 해\"", "\"상태 관리 해\""], answer: 1, explain: "<b>선택지 요청</b> 패턴으로 근거 있는 결정을 할 수 있습니다." },
          { q: "결과 품질을 가장 크게 높이는 요소 하나를 고른다면?", options: ["존댓말 사용", "완료 기준(검증 방법) 제시", "이모지 사용", "영어로 쓰기"], answer: 1, explain: "Claude 는 스스로 검증할 수 있을 때 가장 잘 일합니다. 테스트·실행 결과 같은 <b>확인 방법</b>을 주세요." },
        ],
      },
    ],
    real: {
      code: { lang: "md", file: "나만의 프롬프트 템플릿 (메모장에 저장해 두기)", text: "[목표] \n[관련 파일] @\n[현재 문제/배경] \n[제약] - 건드리지 말 것: \n[완료 기준] - 테스트: \n먼저 계획을 보여주고, 불분명한 점은 질문해 줘." },
    },
    mistakes: [
      ["한 번에 여러 기능을 뭉뚱그려 요청", "작업을 쪼개서 하나씩, 단계마다 확인"],
      ["결과가 틀리면 같은 말 반복", "무엇이 틀렸는지 구체적으로(증상·기대값) 알려주기"],
    ],
    checklist: ["5요소(목표·맥락·제약·예시·완료 기준)를 말할 수 있다", "탐색 먼저 패턴을 써 보았다", "나만의 프롬프트 템플릿을 만들었다"],
  },

  /* ----------------------------------------------------- Day 8 */
  {
    id: 8, week: 2, icon: "🏛️", time: "50분", level: 2,
    title: "아키텍처 설계",
    subtitle: "코드 품질과 확장성을 위한 구조를 Claude 와 함께 설계하고, 결정을 문서로 남깁니다.",
    goals: ["계층(레이어) 구조의 개념을 이해한다", "Claude 와 설계 대안을 비교·결정한다", "설계 문서(plan.md, ADR)를 남긴다"],
    analogy: { i: "🏙️", t: "도시 계획처럼, 주거지·상업지·도로를 미리 나눠야 나중에 건물을 더 지어도 엉키지 않습니다. 코드도 <b>화면 / 비즈니스 로직 / 데이터</b>를 나눠 두면 기능을 추가해도 무너지지 않습니다." },
    sections: [
      {
        h: "왜 설계를 먼저?",
        body: "<p>Claude 는 코드를 매우 빠르게 만듭니다. 그래서 <b>방향이 틀리면 틀린 코드도 빠르게 쌓입니다.</b> 설계는 Claude 가 일관된 방향으로 달리게 하는 레일입니다.</p>",
      },
      {
        h: "설계 대화의 4단계",
        body: `<ol><li><b>요구사항 정리</b>: "이 기능의 요구사항을 정리하고 빠진 게 있으면 질문해 줘"</li>
        <li><b>대안 비교</b>: "구조 대안 2~3개를 장단점·복잡도와 함께 표로 비교해 줘"</li>
        <li><b>결정 문서화</b>: "선택한 안을 docs/plan.md 에 단계별 구현 계획으로 써 줘"</li>
        <li><b>단계별 구현</b>: "plan.md 의 1단계만 구현해 줘"</li></ol>`,
        code: { lang: "md", file: "docs/adr/001-state-management.md (결정 기록 예시)", text: "# ADR 001: 상태 관리 방식\n\n## 상황\n장바구니·로그인 정보를 여러 화면에서 공유해야 함\n\n## 고려한 대안\n1. Context API — 추가 설치 없음, 규모가 커지면 리렌더 문제\n2. Zustand — 가볍고 단순, 팀 학습 비용 낮음\n3. Redux Toolkit — 강력하지만 보일러플레이트 많음\n\n## 결정\nZustand 채택\n\n## 결과\n- src/store/ 에 스토어 파일 배치\n- 서버 데이터는 별도로 React Query 사용" },
        tip: "<b>💡 다이어그램도 맡기기</b> \"현재 구조를 mermaid 다이어그램으로 그려 줘\" 라고 하면 README 에 바로 넣을 수 있는 그림 코드를 만들어 줍니다.",
      },
      {
        h: "설계를 CLAUDE.md 에 연결",
        body: "<p>결정된 구조 규칙은 CLAUDE.md 에 요약해 두면 이후 모든 대화에서 지켜집니다.</p>",
        code: { lang: "md", file: "CLAUDE.md (일부)", text: "## 아키텍처 규칙\n- 화면(components)은 api 를 직접 호출하지 않는다 → hooks 를 통해서만\n- 비즈니스 규칙은 src/domain 에만 둔다\n- 설계 결정은 docs/adr/ 참고: @docs/adr/001-state-management.md" },
      },
    ],
    viz: [
      {
        type: "layers", title: "일반적인 웹앱 계층 구조",
        desc: "위 계층은 아래 계층만 사용합니다. 아래에서 위로 거슬러 부르지 않는 것이 핵심 규칙입니다.",
        layers: [
          { i: "🖼️", n: "화면 (UI)", chips: ["components/", "pages/"], d: "보여 주기만 담당" },
          { i: "🪝", n: "상태·흐름", chips: ["hooks/", "store/"], d: "화면과 로직 연결" },
          { i: "🧠", n: "도메인 로직", chips: ["domain/", "services/"], d: "비즈니스 규칙 (가격 계산 등)" },
          { i: "🔌", n: "데이터 접근", chips: ["api/", "db/"], d: "서버·DB 통신" },
        ],
      },
      {
        type: "flow", title: "Claude 와 설계하는 흐름",
        steps: [
          { i: "📋", t: "요구사항", d: "질문 받기", x: "Claude 가 빠진 요구사항을 <b>되묻게</b> 합니다." },
          { i: "⚖️", t: "대안 비교", d: "표로 정리", x: "2~3개 구조안의 장단점을 비교합니다." },
          { i: "🧭", t: "결정", d: "ADR 작성", x: "왜 그 안을 골랐는지 기록 → 나중의 나와 팀을 위해." },
          { i: "🗺️", t: "구현 계획", d: "plan.md", x: "작은 단계로 나눈 구현 계획을 파일로 저장." },
          { i: "🔁", t: "단계 구현", d: "한 단계씩", x: "\"plan.md 2단계 진행해 줘\" — 단계마다 검증 후 커밋." },
        ],
      },
    ],
    practice: [
      {
        type: "quiz", title: "계층 구조 퀴즈",
        questions: [
          { q: "'할인 금액 계산' 함수는 어느 계층에 두는 게 좋을까요?", options: ["화면(UI)", "도메인 로직", "데이터 접근", "CSS 파일"], answer: 1, explain: "비즈니스 규칙은 화면과 분리해 <b>도메인</b>에 두어야 재사용·테스트가 쉽습니다." },
          { q: "버튼 컴포넌트에서 fetch('/api/orders') 를 직접 호출하는 코드가 있습니다. 문제는?", options: ["문제 없음", "화면이 데이터 접근을 직접 해서 계층 규칙 위반", "fetch 는 금지 함수", "버튼은 항상 클래스여야 함"], answer: 1, explain: "API 호출은 api/ 계층, 화면은 hooks 를 통해서만 접근하도록 분리합니다." },
          { q: "설계 결정을 ADR 로 남기는 가장 큰 이유는?", options: ["문서량을 늘리려고", "왜 그렇게 결정했는지 나중에 알 수 있게", "Claude 가 요구해서", "속도를 높이려고"], answer: 1, explain: "결정의 <b>이유</b>가 남아 있어야 나중에 바꿀지 판단할 수 있습니다." },
        ],
      },
      {
        type: "editor", label: "✍️ 프롬프트 작성", title: "설계 요청 프롬프트 쓰기",
        intro: "쇼핑몰에 '쿠폰' 기능을 추가하려고 합니다. 바로 구현하지 않고 설계부터 하도록 프롬프트를 써 보세요.",
        file: "prompt.txt",
        starter: "",
        checks: [
          { label: "코드를 아직 작성하지 말라고 했다", re: /(코드.*(쓰지|작성하지|수정하지)|구현하지|아직)/ },
          { label: "대안을 여러 개 비교하라고 했다", re: /(대안|방법|안)\s*\d|비교/ },
          { label: "장단점을 요청했다", re: /장단점|트레이드오프|pros/i },
          { label: "계획을 파일로 남기라고 했다 (plan.md / docs/)", re: /(plan\.md|docs\/|ADR|adr)/ },
          { label: "질문을 허용했다 (불분명하면 질문)", re: /질문|물어/ },
        ],
        solution: "쇼핑몰에 쿠폰 기능(정액/정률 할인, 사용 기한, 1인 1회)을 추가하려고 해. 아직 코드는 작성하지 마.\n\n1. 현재 주문·결제 관련 코드를 읽고 구조를 요약해 줘\n2. 쿠폰을 넣는 구조 대안 3개를 장단점과 함께 표로 비교하고 추천해 줘\n3. 요구사항에 불분명한 점이 있으면 먼저 질문해 줘\n4. 결정되면 docs/plan.md 에 단계별 구현 계획을 써 줘",
      },
    ],
    real: {
      code: { lang: "bash", file: "Claude Code (Plan 모드 권장)", text: "> 이 프로젝트의 현재 폴더 구조와 계층을 mermaid 다이어그램으로 그려 줘\n> 구조상 문제가 있는 부분 3가지를 찾아서 이유와 함께 알려 줘\n> 개선안을 docs/plan.md 로 정리해 줘" },
    },
    mistakes: [
      ["설계 없이 기능을 계속 덧붙이기", "기능이 커지면 멈추고 구조부터 정리"],
      ["대화 속 설계 결정이 사라짐", "plan.md·ADR·CLAUDE.md 로 파일에 남기기"],
    ],
    checklist: ["4계층 구조를 그릴 수 있다", "대안 비교 프롬프트를 써 보았다", "plan.md 로 계획을 저장해 보았다"],
  },

  /* ----------------------------------------------------- Day 9 */
  {
    id: 9, week: 2, icon: "🔍", time: "45분", level: 2,
    title: "코드 리뷰",
    subtitle: "Claude 를 꼼꼼한 리뷰어로 활용해 버그·보안·가독성 문제를 머지 전에 잡아냅니다.",
    goals: ["리뷰 관점(정확성·보안·성능·가독성)을 안다", "diff 기반 리뷰 프롬프트를 쓴다", "작성자와 리뷰어를 분리하는 이유를 이해한다"],
    analogy: { i: "📝", t: "자기가 쓴 글의 오타는 잘 안 보이죠. 그래서 <b>다른 사람에게 교정</b>을 맡깁니다. Claude 에게도 코드를 쓴 대화와 <b>다른 새 대화(또는 서브에이전트)</b>에서 리뷰를 시키면 더 객관적인 시선을 얻을 수 있습니다." },
    sections: [
      {
        h: "리뷰 요청 방법",
        code: { lang: "bash", file: "Claude Code", text: "> git diff main 의 변경사항을 리뷰해 줘.\n  버그, 보안, 성능, 가독성 순으로 심각도(높음/중간/낮음)를 붙여서 알려 줘\n\n> @src/payment.ts 를 보안 관점에서만 리뷰해 줘\n\n> /review      # 내장 리뷰 명령 (PR 리뷰)" },
        tip: "<b>💡 관점을 좁히세요</b> \"리뷰해 줘\" 보다 \"동시성 버그 관점에서\", \"SQL 인젝션 관점에서\" 처럼 관점을 지정하면 더 깊이 봅니다.",
      },
      {
        h: "리뷰 체크리스트",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>관점</th><th>확인할 것</th></tr>
        <tr><td>🐞 정확성</td><td>경계값(0, 빈 배열, null), 예외 처리, 비동기 처리 누락</td></tr>
        <tr><td>🔐 보안</td><td>입력 검증, 비밀값 하드코딩, 권한 확인, 인젝션</td></tr>
        <tr><td>⚡ 성능</td><td>반복문 안의 DB/API 호출, 불필요한 재계산</td></tr>
        <tr><td>📖 가독성</td><td>이름, 함수 길이, 중복, 주석이 필요한 복잡한 부분</td></tr>
        <tr><td>🧪 테스트</td><td>변경을 검증하는 테스트가 있는가</td></tr></table></div>`,
      },
      {
        h: "작성자 ≠ 리뷰어",
        body: "<p>같은 대화에서 \"방금 네가 쓴 코드 리뷰해 줘\"라고 하면 자기 결정을 정당화하기 쉽습니다. <code>/clear</code> 후 새 대화에서, 또는 리뷰 전용 <b>서브에이전트</b>(Day 19)로 리뷰하세요. 리뷰 결과를 받아 다시 작성 대화에서 수정하는 패턴이 효과적입니다.</p>",
      },
    ],
    viz: {
      type: "sequence", title: "작성자 / 리뷰어 분리 패턴",
      actors: [{ t: "나", i: "🙋" }, { t: "작성 Claude", i: "✍️", center: true }, { t: "리뷰 Claude", i: "🔍" }],
      msgs: [
        { from: "나", to: "작성 Claude", t: "기능 구현 요청", x: "평소처럼 구현을 요청합니다." },
        { from: "작성 Claude", to: "작성 Claude", t: "구현 + 테스트", x: "코드를 작성하고 테스트를 통과시킵니다." },
        { from: "나", to: "리뷰 Claude", t: "새 대화: git diff 리뷰해 줘", x: "<b>새 세션</b>(또는 서브에이전트)에서 diff 만 보고 리뷰합니다." },
        { from: "리뷰 Claude", to: "나", t: "문제 3건 (높음 1, 중간 2)", x: "작성 의도에 얽매이지 않은 객관적인 지적을 받습니다." },
        { from: "나", to: "작성 Claude", t: "리뷰 의견 전달", x: "리뷰 결과를 붙여넣어 수정을 요청합니다." },
        { from: "작성 Claude", to: "나", t: "수정 완료 + 테스트 통과", x: "수정 후 다시 검증합니다." },
      ],
    },
    practice: [
      {
        type: "quiz", title: "리뷰어가 되어 보기",
        intro: "Claude 가 리뷰에서 찾아낼 법한 문제를 직접 찾아보세요.",
        questions: [
          { q: "<pre style='margin:6px 0;white-space:pre-wrap'><code>function avg(nums) {\n  return nums.reduce((a, b) => a + b) / nums.length;\n}</code></pre>이 함수의 가장 큰 문제는?", options: ["변수 이름이 짧다", "빈 배열이면 reduce 가 에러를 낸다", "화살표 함수를 썼다", "세미콜론이 있다"], answer: 1, explain: "초기값 없는 reduce 는 빈 배열에서 TypeError. 경계값 체크가 필요합니다." },
          { q: "<pre style='margin:6px 0;white-space:pre-wrap'><code>const q = \"SELECT * FROM users WHERE id = \" + req.query.id;\ndb.query(q);</code></pre>어떤 관점의 문제인가요?", options: ["성능", "보안 (SQL 인젝션)", "가독성", "문제 없음"], answer: 1, explain: "사용자 입력을 SQL 문자열에 그대로 붙이면 인젝션 공격이 가능합니다. 파라미터 바인딩을 써야 합니다." },
          { q: "<pre style='margin:6px 0;white-space:pre-wrap'><code>for (const id of userIds) {\n  const user = await db.findUser(id);\n  list.push(user);\n}</code></pre>사용자가 1000명이면 생기는 문제는?", options: ["보안 문제", "DB 를 1000번 순차 호출하는 성능 문제(N+1)", "문법 오류", "메모리 누수"], answer: 1, explain: "한 번의 쿼리로 여러 사용자를 가져오도록(WHERE id IN ...) 바꾸는 것이 좋습니다." },
          { q: "<pre style='margin:6px 0;white-space:pre-wrap'><code>const API_KEY = \"sk-live-123abc...\";</code></pre>", options: ["문제 없음", "비밀 키가 코드에 하드코딩됨", "상수 이름 규칙 위반", "문자열이 너무 김"], answer: 1, explain: "비밀값은 환경 변수나 비밀 관리 도구로. git 에 올라가면 유출입니다." },
        ],
      },
      {
        type: "editor", label: "✍️ 프롬프트 작성", title: "리뷰 요청 프롬프트",
        intro: "결제 기능 PR 을 머지하기 전, Claude 에게 리뷰를 요청하는 프롬프트를 써 보세요.",
        file: "prompt.txt", starter: "",
        checks: [
          { label: "리뷰 대상을 지정했다 (git diff / @파일 / PR)", re: /(git diff|@\S+|PR|#\d+)/ },
          { label: "관점을 2개 이상 지정했다 (보안·성능·버그·가독성 등)", fn: (v) => ["보안", "성능", "버그", "정확", "가독", "테스트", "예외"].filter((k) => v.includes(k)).length >= 2 },
          { label: "심각도/우선순위로 분류를 요청했다", re: /(심각도|우선순위|높음|critical|중요도)/i },
          { label: "수정 제안(어떻게 고칠지)을 요청했다", re: /(수정\s*(제안|방법|코드)|고치는\s*방법|어떻게\s*고칠|대안)/ },
        ],
        solution: "git diff main 의 결제 기능 변경사항을 리뷰해 줘. 코드는 아직 수정하지 마.\n\n관점: 1) 버그(경계값·예외 처리) 2) 보안(입력 검증, 금액 위변조) 3) 성능 4) 테스트 누락\n각 문제에 심각도(높음/중간/낮음)를 붙이고, 파일:줄 위치와 수정 제안 코드를 함께 알려 줘.",
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "# 작업 브랜치에서\nclaude -p \"git diff main 을 리뷰해서 심각도별로 정리해 줘\" > review.md\n# 결과 확인 후 작성 세션에서\nclaude -c\n> @review.md 의 '높음' 항목을 수정해 줘" },
    },
    mistakes: [
      ["방금 코드를 쓴 대화에서 바로 자기 리뷰", "<code>/clear</code> 또는 별도 세션/서브에이전트로 리뷰"],
      ["리뷰 지적을 전부 무조건 반영", "지적의 근거를 확인하고 판단은 사람이 — 오탐도 있습니다"],
    ],
    checklist: ["리뷰 관점 5가지를 안다", "git diff 기반 리뷰를 요청해 보았다", "작성자/리뷰어 분리 이유를 설명할 수 있다"],
  },

  /* ----------------------------------------------------- Day 10 */
  {
    id: 10, week: 2, icon: "📚", time: "40분", level: 1,
    title: "문서화",
    subtitle: "README, 코드 주석, API 문서, 변경 이력까지 — 코드에 대한 문서를 자동으로 생성하고 최신으로 유지합니다.",
    goals: ["문서 종류별 목적을 구분한다", "README·주석·CHANGELOG 를 Claude 로 생성한다", "문서를 코드와 함께 최신 상태로 유지한다"],
    analogy: { i: "🧾", t: "가전제품을 사면 들어 있는 <b>사용 설명서</b>. 아무리 좋은 제품도 설명서가 없으면 쓰기 어렵습니다. 그런데 설명서를 쓰는 건 귀찮죠 — Claude 는 코드를 읽고 설명서를 써 주는 데 아주 능숙합니다." },
    sections: [
      {
        h: "문서의 종류",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>문서</th><th>독자</th><th>내용</th></tr>
        <tr><td><b>README.md</b></td><td>처음 온 사람</td><td>무엇인지, 설치·실행 방법, 사용 예</td></tr>
        <tr><td><b>코드 주석 (JSDoc/docstring)</b></td><td>코드를 고칠 사람</td><td>함수의 목적, 매개변수, 반환값, 주의점</td></tr>
        <tr><td><b>API 문서</b></td><td>API 를 쓰는 사람</td><td>엔드포인트, 요청/응답 예시, 에러</td></tr>
        <tr><td><b>CHANGELOG</b></td><td>사용자·팀</td><td>버전별 변경사항</td></tr>
        <tr><td><b>CLAUDE.md</b></td><td>Claude</td><td>작업 규칙·명령어</td></tr></table></div>`,
      },
      {
        h: "Claude 에게 문서 쓰게 하기",
        code: { lang: "bash", file: "Claude Code", text: "> 이 프로젝트의 README.md 를 써 줘. 처음 보는 사람이 5분 안에 실행할 수 있게.\n  구성: 소개 / 주요 기능 / 설치 / 실행 / 폴더 구조 / 기여 방법\n\n> @src/utils/date.ts 의 export 함수들에 JSDoc 주석을 달아 줘. 사용 예시 포함\n\n> 지난 태그(v1.2.0) 이후 git log 를 읽고 CHANGELOG.md 에 v1.3.0 항목을 추가해 줘\n\n> src/routes 의 API 들을 읽고 docs/api.md 를 만들어 줘. 요청/응답 예시 포함" },
      },
      {
        h: "주석 예시: 좋은 주석은 '왜'를 말한다",
        code: { lang: "js", file: "src/utils/price.js", text: "/**\n * 최종 결제 금액을 계산한다.\n * 쿠폰 할인을 먼저 적용한 뒤 포인트를 차감한다 (회계팀 정책, 2025-03).\n *\n * @param {number} price   - 상품 금액 (원)\n * @param {number} coupon  - 쿠폰 할인율 (0~1)\n * @param {number} points  - 사용할 포인트\n * @returns {number} 0 이상의 결제 금액\n * @example finalPrice(10000, 0.1, 500) // 8500\n */\nexport function finalPrice(price, coupon, points) {\n  return Math.max(0, price * (1 - coupon) - points);\n}" },
        tip: "<b>💡 '무엇'보다 '왜'</b> 코드만 봐도 아는 내용(\"1을 더한다\")은 주석이 필요 없습니다. 정책·이유·주의사항을 남기세요.",
      },
      {
        h: "문서를 최신으로 유지하는 법",
        body: "<p>CLAUDE.md 에 \"API 를 바꾸면 docs/api.md 도 함께 수정할 것\" 같은 규칙을 넣으면, Claude 가 코드 변경 시 문서도 같이 갱신합니다. 3주차에 배울 훅·자동화로 PR 마다 문서 점검을 돌릴 수도 있습니다.</p>",
      },
    ],
    viz: {
      type: "flow", title: "코드 → 문서 자동 생성 파이프라인",
      steps: [
        { i: "📂", t: "코드 읽기", d: "Glob · Read", x: "Claude 가 소스 구조와 주요 함수를 읽습니다." },
        { i: "🧩", t: "구조 파악", d: "진입점·모듈 관계", x: "어디서 시작하고 어떤 모듈이 무엇을 하는지 정리합니다." },
        { i: "🧾", t: "git 이력", d: "git log", x: "변경 이력에서 CHANGELOG 재료를 모읍니다." },
        { i: "✍️", t: "문서 작성", d: "README · JSDoc · API", x: "독자에 맞춘 문서를 생성합니다." },
        { i: "🔁", t: "유지", d: "CLAUDE.md 규칙", x: "코드가 바뀌면 문서도 같이 갱신하도록 규칙화." },
      ],
    },
    practice: [
      {
        type: "editor", label: "✍️ 문서 작성", title: "README 뼈대 완성하기",
        intro: "할 일 앱(Day 6)의 README.md 를 작성해 보세요. 오른쪽 조건을 만족하면 완료!",
        file: "README.md",
        starter: "# 할 일 앱\n\n",
        checks: [
          { label: "한 줄 소개가 있다 (제목 다음 문단)", re: /^#\s+.+\n+[^#\s].{5,}/m },
          { label: "'설치' 또는 '시작하기' 섹션", re: /^##\s*.*(설치|시작|Getting)/mi },
          { label: "실행 명령이 코드 블록(```)으로 들어있다", re: /```[\s\S]+?```/ },
          { label: "'기능' 섹션과 목록(-) 2개 이상", fn: (v) => /^##\s*.*기능/m.test(v) && (v.match(/^\s*-\s+\S/gm) || []).length >= 2 },
          { label: "'구조' 또는 '폴더' 섹션", re: /^##\s*.*(구조|폴더)/m },
        ],
        solution: "# 할 일 앱\n\n브라우저만 있으면 바로 쓰는 가벼운 할 일 관리 웹앱입니다.\n\n## 주요 기능\n- 할 일 추가 / 완료 체크 / 삭제\n- 새로고침해도 유지 (localStorage)\n- 남은 할 일 개수 표시\n\n## 시작하기\n```bash\ngit clone https://github.com/me/todo-app.git\ncd todo-app\nnpx serve .\n```\n브라우저에서 http://localhost:3000 을 엽니다.\n\n## 폴더 구조\n- index.html : 화면과 로직 전체\n- README.md : 이 문서",
      },
      {
        type: "quiz", title: "문서화 퀴즈",
        questions: [
          { q: "좋은 주석은?", options: ["// i 에 1을 더한다", "// 결제사 API 가 5초 이상 걸리면 실패로 간주 (계약 조건)", "// TODO", "// 이 함수는 함수다"], answer: 1, explain: "코드로 알 수 없는 <b>이유·정책</b>을 담은 주석이 가치 있습니다." },
          { q: "CHANGELOG 를 Claude 에게 쓰게 할 때 가장 좋은 재료는?", options: ["git log (커밋 이력)", "package-lock.json", "node_modules", ".env"], answer: 0, explain: "커밋 이력에서 변경사항을 요약합니다. 커밋 메시지가 좋을수록 결과도 좋아집니다." },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "Claude Code", text: "> 이 프로젝트의 README 가 실제 코드와 다른 부분을 찾아서 고쳐 줘\n> 주석이 없는 export 함수 목록을 보여 주고, 상위 5개에 JSDoc 을 추가해 줘" },
    },
    mistakes: [
      ["README 를 한 번 쓰고 방치", "CLAUDE.md 에 '코드 변경 시 문서도 갱신' 규칙 추가"],
      ["모든 줄에 주석", "'왜'가 필요한 곳에만, 나머지는 좋은 이름으로"],
    ],
    checklist: ["README 를 Claude 로 생성해 보았다", "JSDoc/docstring 주석을 추가해 보았다", "CHANGELOG 를 git log 로 만드는 법을 안다"],
  },

  /* ----------------------------------------------------- Day 11 */
  {
    id: 11, week: 2, icon: "🧪", time: "60분", level: 2,
    title: "테스트",
    subtitle: "Claude 와 함께하는 테스트 주도 개발(TDD). 단위·통합 테스트를 작성하고 '통과할 때까지' 맡깁니다.",
    goals: ["단위 테스트와 통합 테스트를 구분한다", "TDD(빨강→초록→리팩터) 순환을 Claude 와 실행한다", "테스트가 Claude 의 '검증 수단'임을 이해한다"],
    analogy: { i: "🎯", t: "과녁 없이 활을 쏘면 잘 쐈는지 알 수 없습니다. <b>테스트는 과녁</b>입니다. 과녁을 먼저 세워 두면 Claude 는 맞을 때까지 스스로 조준을 고칩니다 — 이게 Claude 와 TDD 가 잘 맞는 이유입니다." },
    sections: [
      {
        h: "테스트의 종류",
        body: `<ul><li><b>단위 테스트</b>: 함수 하나가 올바른지 (빠르고 많음)</li>
        <li><b>통합 테스트</b>: 여러 부분이 함께 잘 동작하는지 (API + DB 등)</li>
        <li><b>E2E 테스트</b>: 실제 사용자처럼 브라우저로 전체 흐름 확인</li></ul>`,
        code: { lang: "js", file: "src/price.test.js (Jest/Vitest 단위 테스트)", text: "import { finalPrice } from './price';\n\ntest('쿠폰 10% 적용 후 포인트 차감', () => {\n  expect(finalPrice(10000, 0.1, 500)).toBe(8500);\n});\n\ntest('결제 금액은 음수가 될 수 없다', () => {\n  expect(finalPrice(1000, 0, 5000)).toBe(0);\n});" },
      },
      {
        h: "Claude 와 TDD 하는 4단계",
        body: `<ol><li><b>테스트 먼저</b>: "입력/출력 예시를 바탕으로 테스트를 먼저 써 줘. 구현은 하지 마."</li>
        <li><b>실패 확인</b>: "테스트를 돌려서 실패하는지 확인해 줘" → 테스트를 커밋</li>
        <li><b>구현</b>: "테스트를 통과하도록 구현해 줘. <b>테스트는 수정하지 마.</b> 통과할 때까지 반복해."</li>
        <li><b>리팩터</b>: "테스트가 통과하는 상태를 유지하며 코드를 정리해 줘"</li></ol>`,
        tip: "<b>⚠️ 핵심 주의</b> \"테스트는 수정하지 마\"를 꼭 붙이세요. 그렇지 않으면 구현 대신 테스트를 고쳐서 통과시키는 경우가 있습니다.",
        tipType: "warn",
      },
      {
        h: "기존 코드에 테스트 추가하기",
        code: { lang: "bash", file: "Claude Code", text: "> @src/cart.js 의 테스트 커버리지를 확인하고, 빠진 경계 케이스 테스트를 추가해 줘\n> 테스트 이름은 한국어로, 각 테스트가 무엇을 검증하는지 분명하게\n> npm test 로 모두 통과하는지 확인해 줘" },
      },
    ],
    viz: {
      type: "loop", title: "TDD 순환 — Red → Green → Refactor",
      center: "테스트가\n과녁",
      steps: [
        { i: "🔴", t: "Red", d: "실패하는 테스트 작성", x: "원하는 동작을 테스트로 먼저 씁니다. 아직 구현이 없으니 <b>실패</b>해야 정상." },
        { i: "💾", t: "테스트 커밋", d: "과녁 고정", x: "테스트를 커밋해 두면 Claude 가 테스트를 바꿔도 바로 알 수 있습니다." },
        { i: "🟢", t: "Green", d: "통과하도록 구현", x: "\"테스트는 수정하지 말고 통과시켜\" — Claude 가 실행·수정을 <b>반복</b>합니다." },
        { i: "🔧", t: "Refactor", d: "정리하기", x: "통과 상태를 유지하며 중복 제거·이름 정리." },
      ],
    },
    practice: [
      {
        type: "order", title: "TDD 순서 맞추기",
        items: ["원하는 동작을 입력/출력 예시로 정리", "Claude 에게 테스트만 작성 요청", "테스트 실행 → 실패 확인", "테스트 커밋", "'테스트 수정 금지'로 구현 요청", "모든 테스트 통과 확인", "리팩터링 후 다시 테스트"],
      },
      {
        type: "terminal", title: "TDD 시뮬레이션",
        startMode: "claude",
        tasks: [
          { goal: "테스트만 먼저 작성하라고 요청 ('테스트' + '구현하지 마' 포함)", hint: "isValidEmail 함수의 테스트를 먼저 써줘. 구현은 하지 마", match: /테스트.*(구현|코드).*(하지|쓰지|짜지|만들지)\s*마|테스트만/, mode: "claude", out: "{tool:⏺ Write}(src/email.test.js)\n  {dim:⎿ 테스트 5개: 정상 주소, @ 없음, 도메인 없음, 공백 포함, 빈 문자열}\n{ok:⏺} 테스트를 작성했습니다. 구현은 아직 하지 않았습니다." },
          { goal: "테스트를 실행해 실패 확인하기 (! 사용)", hint: "!npm test", match: /^!\s?npm (run )?test/, mode: "claude", out: "{err: FAIL  src/email.test.js}\n{err:  ✕ 정상 이메일은 true (Cannot find module './email')}\n{dim:Tests: 5 failed, 5 total}\n{warn:→ 예상대로 실패! (Red 단계)}" },
          { goal: "테스트를 수정하지 말고 통과시키라고 요청", hint: "테스트는 수정하지 말고 모두 통과하도록 구현해줘", match: /테스트.*수정하지\s*마|수정\s*금지/, mode: "claude", out: "{tool:⏺ Write}(src/email.js)\n{tool:⏺ Bash}(npm test)\n  {err:⎿ 4 passed, 1 failed (공백 포함 주소)}\n{tool:⏺ Edit}(src/email.js)\n  {dim:⎿ 공백 검사 추가}\n{tool:⏺ Bash}(npm test)\n  {ok:⎿ 5 passed}\n{ok:⏺} 모든 테스트가 통과했습니다 (Green). 테스트 파일은 수정하지 않았습니다." },
          { goal: "리팩터링을 요청하기", hint: "테스트 통과를 유지하면서 코드를 깔끔하게 리팩터링해줘", match: /리팩/, mode: "claude", out: "{tool:⏺ Edit}(src/email.js)\n  {dim:⎿ 정규식을 상수로 분리, 이름 정리}\n{tool:⏺ Bash}(npm test)\n  {ok:⎿ 5 passed}\n{ok:⏺} 리팩터링 완료 (Refactor). 순환 1회 끝!" },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "mkdir tdd-practice && cd tdd-practice\nnpm init -y && npm i -D vitest\nclaude\n> package.json 의 test 스크립트를 vitest run 으로 설정해 줘\n> 문자열을 뒤집는 reverse 함수의 테스트를 먼저 써 줘. 구현은 하지 마\n> !npm test\n> 테스트는 수정하지 말고 통과하도록 구현해 줘" },
    },
    mistakes: [
      ["\"테스트도 같이 짜 줘\" — 구현과 테스트를 동시에", "테스트 먼저 → 실패 확인 → 커밋 → 구현"],
      ["테스트 수정 금지를 말하지 않음", "구현 요청 때 항상 '테스트는 수정하지 마' 명시"],
    ],
    checklist: ["단위/통합/E2E 차이를 설명할 수 있다", "TDD 4단계를 순서대로 말할 수 있다", "Claude 와 실제로 테스트 먼저 작성해 보았다"],
  },

  /* ----------------------------------------------------- Day 12 */
  {
    id: 12, week: 2, icon: "🔧", time: "50분", level: 2,
    title: "리팩토링",
    subtitle: "동작은 그대로, 구조는 더 좋게. 가독성과 성능 개선을 위해 코드를 안전하게 재구성합니다.",
    goals: ["리팩토링과 기능 변경의 차이를 안다", "코드 냄새(문제 신호)를 알아본다", "테스트·git·체크포인트로 안전하게 리팩토링한다"],
    analogy: { i: "🧹", t: "방 정리와 같습니다. 물건(기능)은 하나도 버리지 않고 <b>제자리를 찾아 주는 것</b>. 정리 전에 사진(테스트)을 찍어 두면, 정리 후에도 모든 물건이 있는지 확인할 수 있습니다." },
    sections: [
      {
        h: "리팩토링 = 동작은 그대로",
        body: "<p>리팩토링은 <b>겉으로 보이는 동작을 바꾸지 않고</b> 내부 구조만 개선하는 것입니다. 그래서 '동작이 그대로인지' 확인할 <b>테스트가 먼저</b> 있어야 합니다. 테스트가 없다면 Day 11 처럼 먼저 테스트를 추가하세요.</p>",
      },
      {
        h: "흔한 코드 냄새",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>냄새</th><th>증상</th><th>처방</th></tr>
        <tr><td>긴 함수</td><td>한 함수가 100줄+</td><td>의미 단위로 함수 추출</td></tr>
        <tr><td>중복 코드</td><td>비슷한 코드 복붙</td><td>공통 함수로 묶기</td></tr>
        <tr><td>깊은 중첩</td><td>if 안의 if 안의 for…</td><td>조기 반환(early return)</td></tr>
        <tr><td>매직 넘버</td><td><code>if (s === 3)</code></td><td>이름 있는 상수 <code>STATUS.SHIPPED</code></td></tr>
        <tr><td>모호한 이름</td><td><code>data</code>, <code>tmp</code>, <code>doIt()</code></td><td>의도가 드러나는 이름</td></tr></table></div>`,
      },
      {
        h: "안전한 리팩토링 절차",
        code: { lang: "bash", file: "Claude Code", text: "> !git commit -am \"리팩토링 전 저장\"\n> @src/order.js 의 코드 냄새를 찾아 목록으로 보여 줘. 아직 수정하지 마\n> 1번(긴 함수 분리)만 진행해 줘. 동작은 바꾸지 말고, 끝나면 npm test 실행\n> 좋아. 커밋하고 2번 진행해 줘" },
        after: "<p><b>되돌리기 수단 3가지</b></p><ul><li><kbd>Esc</kbd> <kbd>Esc</kbd> 또는 <code>/rewind</code>: Claude 의 체크포인트로 코드·대화를 되감기</li><li><code>git restore .</code>: 마지막 커밋 상태로 되돌리기</li><li>브랜치: 실험은 별도 브랜치에서</li></ul>",
        tip: "<b>💡 작게, 자주</b> \"전부 리팩토링해 줘\"는 위험합니다. 한 번에 한 가지 냄새만, 단계마다 테스트와 커밋.",
      },
    ],
    viz: [
      {
        type: "compare", title: "리팩토링 전 / 후",
        bad: { h: "Before — 깊은 중첩 + 매직 넘버", code: "function ship(o) {\n  if (o) {\n    if (o.status === 2) {\n      if (o.items.length > 0) {\n        o.status = 3;\n        send(o);\n      }\n    }\n  }\n}" },
        good: { h: "After — 조기 반환 + 이름 있는 상수", code: "const STATUS = { PAID: 2, SHIPPED: 3 };\n\nfunction ship(order) {\n  if (!order) return;\n  if (order.status !== STATUS.PAID) return;\n  if (order.items.length === 0) return;\n\n  order.status = STATUS.SHIPPED;\n  send(order);\n}", note: "동작은 완전히 같고, 읽기 쉬워졌습니다." },
      },
      {
        type: "flow", title: "안전 리팩토링 사이클",
        steps: [
          { i: "🧪", t: "테스트 확보", d: "현재 동작 고정", x: "테스트가 없으면 먼저 작성 → 지금 동작을 '사진' 찍어 둡니다." },
          { i: "💾", t: "커밋", d: "세이브 포인트", x: "언제든 돌아올 수 있게 저장." },
          { i: "🔎", t: "냄새 찾기", d: "수정 없이 목록만", x: "Claude 에게 문제 목록을 받고 우선순위를 정합니다." },
          { i: "🔧", t: "한 가지만", d: "작은 변경", x: "한 번에 하나의 냄새만 처리합니다." },
          { i: "✅", t: "테스트", d: "동작 동일 확인", x: "모든 테스트 통과 → 커밋. 실패 → 되돌리기." },
        ],
      },
    ],
    practice: [
      {
        type: "quiz", title: "코드 냄새 찾기",
        questions: [
          { q: "<code>if (user.role === 7) { ... }</code> 의 냄새는?", options: ["긴 함수", "매직 넘버", "중복 코드", "문제 없음"], answer: 1, explain: "7 이 무엇인지 알 수 없습니다. <code>ROLE.ADMIN</code> 같은 상수로." },
          { q: "리팩토링 전 가장 먼저 확인할 것은?", options: ["변수 이름 목록", "동작을 확인할 테스트가 있는지", "코드 줄 수", "주석 개수"], answer: 1, explain: "테스트 없이 리팩토링하면 동작이 바뀌어도 알 수 없습니다." },
          { q: "Claude 의 리팩토링이 잘못되어 직전 상태로 되돌리고 싶다면?", options: ["컴퓨터 재시작", "Esc 두 번(/rewind)으로 체크포인트 되감기 또는 git restore", "파일 삭제", "그냥 진행"], answer: 1, explain: "Claude Code 체크포인트와 git 이 이중 안전망입니다." },
          { q: "가장 안전한 리팩토링 요청은?", options: ["\"전체 코드베이스 리팩토링해\"", "\"order.js 의 긴 함수 하나만 분리하고 테스트 돌려 줘\"", "\"알아서 좋게 바꿔\"", "\"다 새로 짜 줘\""], answer: 1, explain: "작은 범위 + 검증이 핵심입니다." },
        ],
      },
      {
        type: "editor", label: "🔧 코드 리팩토링", title: "직접 리팩토링 해보기",
        intro: "아래 함수를 조기 반환(early return)과 상수를 써서 고쳐 보세요. (동작은 그대로 유지)",
        file: "discount.js",
        starter: "function getDiscount(user) {\n  if (user) {\n    if (user.grade === 1) {\n      return 0.1;\n    } else {\n      if (user.grade === 2) {\n        return 0.2;\n      } else {\n        return 0;\n      }\n    }\n  } else {\n    return 0;\n  }\n}",
        checks: [
          { label: "등급 상수를 정의했다 (const ... = { ... })", re: /const\s+\w+\s*=\s*\{[^}]*\d/ },
          { label: "숫자 등급 비교(=== 1, === 2)를 없앴다", fn: (v) => !/===\s*[12]\b/.test(v) },
          { label: "user 가 없을 때 조기 반환한다", re: /if\s*\(\s*!user\s*\)\s*return/ },
          { label: "else 를 사용하지 않는다", fn: (v) => !/\belse\b/.test(v) },
          { label: "함수 getDiscount 가 남아 있다", re: /function\s+getDiscount|getDiscount\s*=/ },
        ],
        solution: "const GRADE = { SILVER: 1, GOLD: 2 };\nconst RATE = { [GRADE.SILVER]: 0.1, [GRADE.GOLD]: 0.2 };\n\nfunction getDiscount(user) {\n  if (!user) return 0;\n  return RATE[user.grade] ?? 0;\n}",
      },
    ],
    real: {
      code: { lang: "bash", file: "Claude Code", text: "> 이 프로젝트에서 가장 긴 함수 3개를 찾아 줘\n> 첫 번째 함수를 동작 변경 없이 작은 함수들로 분리해 줘. 끝나면 테스트 실행\n# 마음에 안 들면 Esc 두 번 → 되감기" },
    },
    mistakes: [
      ["리팩토링하면서 기능도 같이 추가", "리팩토링 커밋과 기능 커밋을 분리"],
      ["테스트 없이 대규모 리팩토링", "테스트 → 커밋 → 작은 단계 → 테스트"],
    ],
    checklist: ["코드 냄새 5가지를 알아볼 수 있다", "체크포인트 되감기를 써 보았다", "작은 단위 리팩토링을 Claude 와 해 보았다", "2주차 완주! 🎉"],
  },
];
