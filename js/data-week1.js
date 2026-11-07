/* 1주차 — 기초 */
window.WEEK1 = [
  /* ----------------------------------------------------- Day 1 */
  {
    id: 1, week: 1, icon: "⚙️", time: "30분", level: 1,
    title: "Claude Code 설정",
    subtitle: "CLI 설치, 계정 인증, 개발 환경 준비까지 — 오늘은 Claude Code 를 내 컴퓨터에 들입니다.",
    goals: ["Claude Code 가 무엇인지 한 문장으로 설명한다", "운영체제에 맞게 설치하고 버전을 확인한다", "로그인하고 첫 대화를 시작한다"],
    analogy: { i: "🧑‍🔧", t: "챗봇형 Claude 가 <b>전화로 조언해 주는 전문가</b>라면, Claude Code 는 <b>내 작업실에 직접 와서 공구를 들고 일하는 동료</b>입니다. 파일을 읽고, 코드를 고치고, 명령을 실행합니다. 단, 위험한 일은 하기 전에 꼭 나에게 물어봅니다." },
    sections: [
      {
        h: "Claude Code 란?",
        body: `<p><b>Claude Code</b> 는 터미널(명령 프롬프트)에서 동작하는 <b>AI 코딩 에이전트</b>입니다. 웹 채팅과 가장 큰 차이는 '직접 행동할 수 있다'는 점입니다.</p>
        <div class="tbl-wrap"><table class="tbl"><tr><th></th><th>웹 채팅 (claude.ai)</th><th>Claude Code</th></tr>
        <tr><td>코드 보기</td><td>내가 복사해서 붙여넣기</td><td>프로젝트 파일을 직접 읽음</td></tr>
        <tr><td>코드 수정</td><td>답변을 내가 옮겨 적기</td><td>파일을 직접 수정 (승인 후)</td></tr>
        <tr><td>실행/테스트</td><td>내가 실행하고 결과 전달</td><td>명령 실행 후 결과 보고 스스로 수정</td></tr>
        <tr><td>사용 장소</td><td>브라우저</td><td>터미널, VS Code·JetBrains, 데스크톱 앱, 웹</td></tr></table></div>`,
        tip: "<b>💡 '에이전트'란?</b> 목표를 주면 스스로 계획을 세우고, 도구를 써서 실행하고, 결과를 확인하며 반복하는 AI 를 말합니다.",
      },
      {
        h: "준비물 체크",
        body: `<ul><li><b>운영체제</b>: macOS, Linux, Windows (Windows 는 PowerShell 또는 WSL)</li>
        <li><b>계정</b>: Claude 유료 구독(Pro/Max 등) 계정 또는 Anthropic Console(API) 계정</li>
        <li><b>터미널 기초</b>: 명령어를 입력하고 Enter 를 누를 줄 알면 충분합니다</li>
        <li><b>(선택) Node.js 18+</b>: npm 으로 설치할 때만 필요</li></ul>`,
      },
      {
        h: "설치하기 — 운영체제별 명령",
        body: "<p>공식 설치 스크립트(네이티브 설치)를 권장합니다. 아래 중 내 환경에 맞는 <b>하나만</b> 실행하세요.</p>",
        code: [
          { lang: "bash", file: "macOS / Linux / WSL", text: "# 공식 설치 스크립트\ncurl -fsSL https://claude.ai/install.sh | bash" },
          { lang: "powershell", file: "Windows PowerShell", text: "# 공식 설치 스크립트\nirm https://claude.ai/install.ps1 | iex" },
          { lang: "bash", file: "npm 으로 설치 (Node.js 18+ 필요)", text: "npm install -g @anthropic-ai/claude-code" },
        ],
        tip: "<b>⚠️ 주의</b> npm 설치 시 <code>sudo npm install -g</code> 처럼 관리자 권한을 쓰지 마세요. 권한 문제가 생기면 네이티브 설치를 사용하세요.",
        tipType: "warn",
      },
      {
        h: "설치 확인과 로그인",
        body: "<p>설치가 끝나면 버전을 확인하고, 프로젝트 폴더에서 <code>claude</code> 를 실행합니다. 처음 실행하면 브라우저가 열리며 로그인 절차가 진행됩니다.</p>",
        code: { lang: "bash", file: "terminal", text: "claude --version     # 버전 확인\nclaude doctor        # 설치 상태 진단\ncd my-project        # 작업할 폴더로 이동\nclaude               # Claude Code 시작 (첫 실행 시 로그인)" },
        after: "<p>Claude Code 안에서는 <code>/login</code>, <code>/logout</code>, <code>/status</code> 로 계정 상태를 확인·변경할 수 있습니다. 종료는 <code>/exit</code> 또는 <kbd>Ctrl</kbd>+<kbd>C</kbd> 두 번입니다.</p>",
      },
    ],
    viz: {
      type: "flow", title: "설치에서 첫 대화까지",
      desc: "각 단계를 클릭하거나 '다음' 버튼으로 따라가 보세요.",
      steps: [
        { i: "🖥️", t: "터미널 열기", d: "PowerShell / Terminal", x: "Windows 는 <b>PowerShell</b>, macOS 는 <b>터미널</b> 앱을 엽니다." },
        { i: "📦", t: "설치", d: "install 스크립트", x: "운영체제에 맞는 설치 명령을 붙여넣고 Enter. 1~2분이면 끝납니다." },
        { i: "🔎", t: "확인", d: "claude --version", x: "버전 번호가 나오면 설치 성공. <code>claude doctor</code> 로 상세 진단도 가능합니다." },
        { i: "📁", t: "폴더 이동", d: "cd my-project", x: "Claude 는 <b>현재 폴더</b>를 프로젝트로 인식합니다. 작업할 폴더로 먼저 이동하세요." },
        { i: "🔑", t: "로그인", d: "브라우저 인증", x: "처음 <code>claude</code> 실행 시 브라우저에서 Claude 계정 또는 Console 계정으로 로그인합니다." },
        { i: "💬", t: "첫 대화", d: "자연어로 요청", x: "\"이 프로젝트가 뭐하는 건지 설명해 줘\" 처럼 평소 말투로 요청하면 됩니다." },
      ],
    },
    practice: [
      {
        type: "terminal", title: "설치부터 첫 실행까지",
        intro: "실제 설치 과정을 그대로 흉내 낸 터미널입니다. 오른쪽 과제를 순서대로 입력해 보세요.",
        tasks: [
          { goal: "Node.js 버전 확인하기 (npm 설치 시 18 이상 필요)", hint: "node -v", match: /^node (-v|--version)$/, out: "v22.11.0\n{ok:✓ Node.js 18 이상이므로 npm 설치가 가능합니다.}" },
          { goal: "npm 으로 Claude Code 전역 설치하기", hint: "npm install -g @anthropic-ai/claude-code", match: /^npm (install|i) (-g|--global) @anthropic-ai\/claude-code$/, out: "{dim:⠙ 패키지 다운로드 중...}\nadded 3 packages in 6s\n{ok:✓ 설치 완료}", stream: true },
          { goal: "설치된 버전 확인하기", hint: "claude --version", match: /^claude (-v|--version)$/, out: "2.x.x (Claude Code)" },
          { goal: "설치 상태 진단하기", hint: "claude doctor", match: /^claude doctor$/, out: "{ok:✓} 설치 경로 확인\n{ok:✓} 실행 권한 정상\n{ok:✓} 자동 업데이트 활성화" },
          { goal: "Claude Code 실행하기", hint: "claude", match: /^claude$/, enter: "claude", out: "{dim:브라우저에서 로그인을 완료했습니다 (시뮬레이션)}" },
          { goal: "계정·모델 상태 확인하기", hint: "/status", match: /^\/status$/, mode: "claude", out: "버전: 2.x.x\n계정: me@example.com (Pro)\n모델: Default\n작업 디렉터리: ~/my-project" },
          { goal: "Claude Code 종료하기", hint: "/exit", match: /^(\/exit|exit)$/, mode: "claude", enter: "shell", out: "{dim:세션을 종료했습니다. 다음에 claude -c 로 이어서 할 수 있어요.}" },
        ],
      },
      {
        type: "quiz", title: "개념 확인",
        questions: [
          { q: "Claude Code 가 웹 채팅과 가장 다른 점은?", options: ["더 많은 언어를 지원한다", "프로젝트 파일을 직접 읽고 수정하며 명령을 실행할 수 있다", "무료로만 사용할 수 있다", "인터넷 없이 동작한다"], answer: 1, explain: "Claude Code 는 도구(파일 읽기·편집·명령 실행)를 직접 사용하는 에이전트입니다." },
          { q: "Claude Code 를 실행하기 전에 먼저 해야 할 일로 가장 알맞은 것은?", options: ["컴퓨터 재부팅", "작업할 프로젝트 폴더로 cd 이동", "브라우저 캐시 삭제", "모든 파일 백업 후 삭제"], answer: 1, explain: "Claude 는 실행한 위치(현재 폴더)를 프로젝트로 인식합니다." },
          { q: "설치 문제를 진단하는 명령은?", options: ["claude fix", "claude doctor", "claude repair", "claude --debug-install"], answer: 1, explain: "<code>claude doctor</code> 가 설치 상태를 점검합니다." },
        ],
      },
    ],
    real: {
      body: "<p>이제 실제 PC 에서 해 봅시다. 연습용 폴더를 만들고 그 안에서 실행하세요.</p>",
      code: { lang: "bash", file: "내 터미널", text: "mkdir claude-study\ncd claude-study\nclaude\n# Claude 에게: 안녕! 너는 이 폴더에서 무엇을 할 수 있어?" },
      after: "<div class='callout ok'><b>✅ 성공 기준</b> Claude 가 답하고, 현재 폴더 경로를 알고 있다면 오늘 목표 달성입니다.</div>",
    },
    mistakes: [
      ["홈 폴더(~)나 C:\\ 에서 바로 <code>claude</code> 실행", "프로젝트 폴더로 이동한 다음 실행 — Claude 가 볼 수 있는 범위가 명확해집니다"],
      ["<code>sudo npm install -g</code> 로 설치", "네이티브 설치 스크립트 사용, 또는 npm 전역 경로 권한 설정"],
    ],
    checklist: ["claude --version 으로 버전이 표시된다", "로그인을 완료했다", "연습 폴더에서 첫 질문을 해 보았다", "/exit 로 종료할 수 있다"],
  },

  /* ----------------------------------------------------- Day 2 */
  {
    id: 2, week: 1, icon: "⌨️", time: "40분", level: 1,
    title: "Claude Code 기본 실습",
    subtitle: "명령어 실행, 기본 상호작용, 꼭 알아야 할 단축키와 슬래시 명령",
    goals: ["에이전트가 일하는 순환 구조를 이해한다", "@파일 참조, ! 명령, 슬래시 명령을 사용한다", "Esc·Shift+Tab 등 핵심 단축키를 익힌다"],
    analogy: { i: "🍳", t: "요리사에게 '김치찌개 만들어 줘'라고 하면 요리사는 <b>냉장고를 열어 재료를 보고(정보 수집)</b> → <b>순서를 정하고(계획)</b> → <b>요리하고(실행)</b> → <b>간을 봅니다(검증)</b>. 간이 안 맞으면 다시 조정하죠. Claude Code 도 똑같이 일합니다." },
    sections: [
      {
        h: "대화하는 법: 그냥 말하세요",
        body: `<p>Claude Code 프롬프트(<code>&gt;</code>)에 평소 말투로 요청하면 됩니다. 영어가 아니어도 괜찮습니다.</p>
        <ul><li>"이 프로젝트 구조를 설명해 줘"</li><li>"로그인 기능은 어느 파일에 있어?"</li><li>"<code>@src/app.js</code> 의 버그를 찾아 줘" — <code>@</code> 로 특정 파일을 지정</li></ul>`,
      },
      {
        h: "입력창의 특수 기호 3가지",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>기호</th><th>뜻</th><th>예시</th></tr>
        <tr><td><code>@</code></td><td>파일·폴더를 대화에 첨부</td><td><code>@package.json 의존성 설명해 줘</code></td></tr>
        <tr><td><code>/</code></td><td>슬래시 명령 (기능 실행)</td><td><code>/help</code>, <code>/clear</code>, <code>/model</code></td></tr>
        <tr><td><code>!</code></td><td>셸 명령 바로 실행 (bash 모드)</td><td><code>!git status</code></td></tr></table></div>`,
      },
      {
        h: "꼭 알아야 할 단축키",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>키</th><th>기능</th></tr>
        <tr><td><kbd>Esc</kbd></td><td>Claude 가 하던 일을 <b>중단</b> (대화는 유지)</td></tr>
        <tr><td><kbd>Esc</kbd> <kbd>Esc</kbd></td><td>이전 메시지로 되돌아가 수정 / 체크포인트로 되감기</td></tr>
        <tr><td><kbd>Shift</kbd>+<kbd>Tab</kbd></td><td>모드 전환: 기본 → 편집 자동 승인 → <b>Plan 모드</b></td></tr>
        <tr><td><kbd>Ctrl</kbd>+<kbd>C</kbd></td><td>입력 취소 / 두 번 누르면 종료</td></tr>
        <tr><td><kbd>↑</kbd></td><td>이전에 입력한 메시지 불러오기</td></tr></table></div>`,
      },
      {
        h: "자주 쓰는 슬래시 명령",
        body: `<ul><li><code>/help</code> 도움말 · <code>/clear</code> 대화 초기화(새 작업 시작 시 권장)</li>
        <li><code>/compact</code> 긴 대화를 요약해 컨텍스트(기억 공간) 절약</li>
        <li><code>/model</code> 모델 변경 · <code>/cost</code> 사용량 확인 · <code>/resume</code> 이전 대화 이어가기</li></ul>`,
        code: { lang: "bash", file: "터미널에서 바로 쓰는 실행 옵션", text: "claude                      # 대화형 모드 시작\nclaude \"버그 찾아줘\"         # 첫 메시지와 함께 시작\nclaude -c                   # 가장 최근 대화 이어가기\nclaude -r                   # 이전 대화 목록에서 골라 이어가기\nclaude -p \"README 요약해줘\"  # 한 번만 답하고 종료 (스크립트용)" },
        tip: "<b>💡 컨텍스트란?</b> Claude 가 한 번에 기억할 수 있는 대화·파일 내용의 양입니다. 주제가 바뀌면 <code>/clear</code> 로 비워 주는 습관이 결과 품질을 높입니다.",
      },
    ],
    viz: {
      type: "loop", title: "에이전트 루프 — Claude Code 가 일하는 방식",
      desc: "하나의 요청에 대해 Claude 는 이 순환을 여러 번 돌면서 목표에 도달합니다.",
      center: "Claude\n에이전트",
      steps: [
        { i: "💬", t: "요청 받기", d: "사용자 프롬프트", x: "\"로그인 버그 고쳐 줘\" 같은 <b>목표</b>를 받습니다." },
        { i: "🔎", t: "정보 수집", d: "Read · Grep · Glob", x: "관련 파일을 검색하고 읽어 <b>상황을 파악</b>합니다." },
        { i: "🧠", t: "계획", d: "무엇을 바꿀지 결정", x: "어떤 파일을 어떻게 바꿀지 <b>계획</b>을 세웁니다." },
        { i: "🛠️", t: "실행", d: "Edit · Bash", x: "파일을 수정하거나 명령을 실행합니다. 위험한 작업은 <b>사용자 승인</b>을 받습니다." },
        { i: "✅", t: "검증", d: "테스트 · 결과 확인", x: "테스트를 돌리거나 결과를 확인해 <b>제대로 됐는지</b> 봅니다. 실패하면 다시 정보 수집으로!" },
      ],
    },
    practice: [
      {
        type: "terminal", title: "Claude Code 와 대화하기",
        intro: "이번에는 Claude Code 안(> 프롬프트)에서 연습합니다.",
        startMode: "claude",
        tasks: [
          { goal: "도움말 열기", hint: "/help", match: /^\/help$/, mode: "claude", out: "{acc:주요 슬래시 명령}\n  /init /clear /compact /model /permissions /mcp /agents /hooks /cost /exit\n{dim:@ 파일 참조, ! 셸 명령, Shift+Tab 모드 전환}" },
          { goal: "<code>@</code> 로 package.json 을 첨부해 설명 요청하기", hint: "@package.json 이 프로젝트 설명해줘", match: /@package\.json/, mode: "claude", out: "{tool:⏺ Read}(package.json)\n  {dim:⎿ 24줄 읽음}\n{ok:⏺} 이 프로젝트는 Express 기반 웹 서버입니다.\n  • 실행: npm start\n  • 테스트: npm test (Jest)\n  • 주요 의존성: express, dotenv" },
          { goal: "<code>!</code> 로 git 상태를 바로 확인하기", hint: "!git status", match: /^!\s?git status$/, mode: "claude", out: "{dim:(bash 모드)} git status\nOn branch main\nnothing to commit, working tree clean" },
          { goal: "모델 선택 화면 열기", hint: "/model", match: /^\/model$/, mode: "claude", out: "모델 선택:\n  {ok:❯ Default (권장)}\n    Opus   — 복잡한 작업\n    Sonnet — 균형\n    Haiku  — 빠름" },
          { goal: "사용량(비용) 확인하기", hint: "/cost", match: /^\/(cost|usage)$/, mode: "claude", out: "이번 세션 사용량(예시)\n입력 12,410 토큰 · 출력 1,920 토큰" },
          { goal: "새 작업을 위해 대화 초기화하기", hint: "/clear", match: /^\/clear$/, mode: "claude", out: "{dim:(대화 기록이 초기화되었습니다 — 새 작업은 깨끗한 상태로!)}" },
        ],
      },
      {
        type: "quiz", title: "단축키 퀴즈",
        questions: [
          { q: "Claude 가 엉뚱한 파일을 고치기 시작했습니다. 즉시 멈추려면?", options: ["Ctrl+Z", "Esc", "Tab", "/stop"], answer: 1, explain: "<kbd>Esc</kbd> 는 진행 중인 작업을 멈추고 대화는 유지합니다. 그 다음 방향을 다시 알려 주면 됩니다." },
          { q: "Plan 모드로 바꾸는 키는?", options: ["Shift+Tab", "Ctrl+P", "Alt+M", "F5"], answer: 0, explain: "<kbd>Shift</kbd>+<kbd>Tab</kbd> 을 누를 때마다 모드가 순환합니다." },
          { q: "어제 하던 대화를 이어가려면?", options: ["claude --again", "claude -c", "claude restore", "claude -x"], answer: 1, explain: "<code>-c</code>(continue)는 최근 대화, <code>-r</code>(resume)은 목록에서 선택." },
          { q: "<code>!npm test</code> 는 무엇을 하나요?", options: ["Claude 에게 테스트를 금지시킨다", "셸에서 npm test 를 바로 실행하고 결과를 대화에 넣는다", "npm 을 삭제한다", "테스트 파일을 생성한다"], answer: 1, explain: "<code>!</code> 는 bash 모드로, 명령을 직접 실행합니다." },
        ],
      },
    ],
    real: {
      body: "<p>실제 프로젝트 폴더(아무 코드나 괜찮습니다)에서 아래 순서로 대화해 보세요.</p>",
      code: { lang: "bash", file: "Claude Code 안에서", text: "> 이 폴더의 파일 구조를 표로 정리해 줘\n> @README.md 를 3줄로 요약해 줘\n> !git log --oneline -5\n> 방금 본 커밋들이 무슨 작업인지 설명해 줘\n> /clear" },
    },
    mistakes: [
      ["여러 주제를 한 대화에서 계속 이어가기", "주제가 바뀌면 <code>/clear</code> — 이전 맥락이 새 작업을 방해하지 않게"],
      ["잘못 가는 걸 보면서도 끝날 때까지 기다리기", "바로 <kbd>Esc</kbd> 로 멈추고 방향을 다시 알려주기"],
    ],
    checklist: ["@ 로 파일을 첨부해 질문해 보았다", "! 로 셸 명령을 실행해 보았다", "Esc 로 작업을 중단해 보았다", "Shift+Tab 으로 모드가 바뀌는 것을 확인했다", "/clear 의 용도를 설명할 수 있다"],
  },

  /* ----------------------------------------------------- Day 3 */
  {
    id: 3, week: 1, icon: "📁", time: "45분", level: 1,
    title: "프로젝트 구성과 초기화",
    subtitle: "프로젝트 파일·디렉터리 구조를 이해하고, /init 으로 CLAUDE.md 를 만들어 Claude 에게 '프로젝트 설명서'를 줍니다.",
    goals: ["Claude Code 관련 파일이 어디에 있는지 안다", "/init 으로 CLAUDE.md 를 생성한다", "좋은 CLAUDE.md 를 직접 작성한다"],
    analogy: { i: "📋", t: "새로 온 동료에게 매번 '우리 팀은 이렇게 일해요'라고 말해 주긴 힘들죠. 그래서 <b>신입 안내서</b>를 책상에 두는데, <b>CLAUDE.md 가 바로 그 안내서</b>입니다. Claude 는 대화를 시작할 때마다 이 파일을 자동으로 읽습니다." },
    sections: [
      {
        h: "Claude Code 가 읽는 파일들",
        body: `<p>Claude Code 는 프로젝트 안의 특정 파일·폴더를 약속된 이름으로 찾습니다.</p>
        <ul><li><code>CLAUDE.md</code> — 프로젝트 설명서(메모리). 팀과 공유하므로 git 에 커밋</li>
        <li><code>.claude/settings.json</code> — 권한·훅 등 팀 공용 설정</li>
        <li><code>.claude/settings.local.json</code> — 나만의 설정(git 에 올리지 않음)</li>
        <li><code>.claude/commands/</code>, <code>.claude/agents/</code>, <code>.claude/skills/</code> — 사용자 정의 명령·서브에이전트·스킬 (3~4주차)</li>
        <li><code>.mcp.json</code> — 팀이 공유하는 외부 도구(MCP) 연결 설정 (3주차)</li>
        <li><code>~/.claude/CLAUDE.md</code> — 모든 프로젝트에 적용되는 <b>개인</b> 설명서</li></ul>`,
      },
      {
        h: "/init — CLAUDE.md 자동 생성",
        body: "<p>프로젝트 폴더에서 Claude Code 를 실행하고 <code>/init</code> 을 입력하면, Claude 가 코드를 훑어보고 빌드 명령·구조·코딩 규칙을 정리한 CLAUDE.md 초안을 만들어 줍니다.</p>",
        code: { lang: "bash", file: "Claude Code", text: "> /init" },
        tip: "<b>💡 초안은 시작일 뿐</b> 생성된 CLAUDE.md 를 읽어 보고, 틀린 내용은 고치고 팀 규칙을 추가하세요. 짧고 정확할수록 좋습니다.",
      },
      {
        h: "좋은 CLAUDE.md 의 구성",
        code: { lang: "md", file: "CLAUDE.md", text: "# 프로젝트: 할 일 관리 웹앱\n\n## 명령어\n- 개발 서버: npm run dev\n- 테스트: npm test\n- 린트: npm run lint\n\n## 구조\n- src/components: React 컴포넌트\n- src/api: 서버 통신 함수\n\n## 코딩 규칙\n- TypeScript 사용, any 금지\n- 컴포넌트는 함수형 + 훅\n- 커밋 메시지는 한국어, 'feat: ' 같은 접두어 사용\n\n## 주의사항\n- .env 파일은 절대 수정하지 말 것\n- 수정 후에는 반드시 npm test 실행" },
        after: "<p>메모리는 여러 곳에 둘 수 있고 모두 합쳐서 읽습니다. 하위 폴더의 CLAUDE.md 는 Claude 가 그 폴더 파일을 다룰 때 함께 읽습니다. CLAUDE.md 안에서 <code>@docs/style.md</code> 처럼 다른 파일을 불러올(import) 수도 있습니다.</p>",
        tip: "<b>✍️ 작성 팁</b> '코드를 깔끔하게' 같은 막연한 말보다 '함수는 40줄 이하' 같은 <b>구체적인 규칙</b>이 훨씬 잘 지켜집니다.",
      },
    ],
    viz: [
      {
        type: "tree", title: "Claude Code 프로젝트 구조",
        desc: "파란색은 Claude Code 가 특별히 인식하는 파일입니다.",
        items: [
          { n: "my-project/", dir: true },
          { n: "├── CLAUDE.md", hl: true, a: "프로젝트 설명서 — 팀 공유 (git 커밋)" },
          { n: "├── .mcp.json", hl: true, a: "외부 도구(MCP) 연결 — 팀 공유" },
          { n: "├── .claude/", dir: true, a: "Claude Code 설정 폴더" },
          { n: "│   ├── settings.json", hl: true, a: "권한·훅 팀 공용 설정" },
          { n: "│   ├── settings.local.json", hl: true, a: "개인 설정 (gitignore)" },
          { n: "│   ├── commands/", dir: true, a: "나만의 /슬래시 명령" },
          { n: "│   ├── agents/", dir: true, a: "서브에이전트 정의" },
          { n: "│   └── skills/", dir: true, a: "스킬 (작업 매뉴얼 묶음)" },
          { n: "├── src/", dir: true },
          { n: "│   └── api/", dir: true },
          { n: "│       └── CLAUDE.md", hl: true, a: "이 폴더 전용 추가 규칙" },
          { n: "└── package.json" },
          { n: "" },
          { n: "~/.claude/", dir: true, a: "내 컴퓨터 전체(사용자 단위)" },
          { n: "├── CLAUDE.md", hl: true, a: "모든 프로젝트에 적용되는 개인 선호" },
          { n: "└── settings.json", hl: true, a: "개인 전역 설정" },
        ],
      },
      {
        type: "layers", title: "메모리(CLAUDE.md)가 합쳐지는 범위",
        layers: [
          { i: "🏢", n: "조직 정책", chips: ["관리자가 배포", "모든 사용자"], d: "회사 단위 규칙" },
          { i: "👥", n: "프로젝트", chips: ["./CLAUDE.md", "git 공유"], d: "팀 전체가 같은 규칙" },
          { i: "🙋", n: "사용자", chips: ["~/.claude/CLAUDE.md"], d: "내 모든 프로젝트에 적용" },
          { i: "📂", n: "하위 폴더", chips: ["src/api/CLAUDE.md"], d: "해당 폴더 작업 시 추가로 읽음" },
        ],
      },
    ],
    practice: [
      {
        type: "terminal", title: "/init 으로 CLAUDE.md 만들기",
        files: ["package.json", "src/", "README.md", "tests/"],
        cat: { "CLAUDE.md": "# my-project\n\n## 명령어\n- npm run dev / npm test\n\n## 구조\n- src/: 소스, tests/: 테스트" },
        tasks: [
          { goal: "현재 폴더 파일 목록 보기", hint: "ls", match: /^ls( -la?)?$/, out: "package.json  src/  README.md  tests/" },
          { goal: "Claude Code 실행", hint: "claude", match: /^claude$/, enter: "claude", out: "" },
          { goal: "/init 으로 CLAUDE.md 생성", hint: "/init", match: /^\/init$/, mode: "claude", out: "{tool:⏺ Read}(package.json)\n{tool:⏺ Glob}(src/**/*)\n{tool:⏺ Read}(README.md)\n{tool:⏺ Write}(CLAUDE.md)\n  {dim:⎿ 42줄 작성}\n{ok:⏺} CLAUDE.md 를 만들었습니다. 빌드/테스트 명령, 폴더 구조, 코드 스타일을 정리했어요. 내용을 검토해 주세요." },
          { goal: "Claude Code 를 종료", hint: "/exit", match: /^(\/exit|exit)$/, mode: "claude", enter: "shell", out: "" },
          { goal: "생성된 파일 내용 확인", hint: "cat CLAUDE.md", match: /^cat CLAUDE\.md$/, out: "# my-project\n\n## 명령어\n- 개발: npm run dev\n- 테스트: npm test\n\n## 구조\n- src/: 소스 코드\n- tests/: Jest 테스트\n\n## 코드 스타일\n- ES Modules, 2칸 들여쓰기" },
        ],
      },
      {
        type: "editor", title: "나만의 CLAUDE.md 작성하기",
        intro: "할 일 관리 앱 프로젝트의 CLAUDE.md 를 직접 써 보세요. 오른쪽 조건이 실시간으로 체크됩니다.",
        file: "CLAUDE.md",
        starter: "# 프로젝트: \n\n## 명령어\n\n",
        checks: [
          { label: "제목(# 프로젝트 이름)이 있다", re: /^#\s+\S+/m },
          { label: "'명령어' 섹션에 테스트 명령(npm test 등)이 있다", re: /(npm|pnpm|yarn)\s+(run\s+)?test|pytest/ },
          { label: "'구조' 또는 '폴더' 섹션이 있다", re: /^##\s*.*(구조|폴더|디렉)/m },
          { label: "'규칙' 또는 '스타일' 섹션이 있다", re: /^##\s*.*(규칙|스타일|컨벤션)/m },
          { label: "규칙 항목(- 로 시작)이 3개 이상", fn: (v) => (v.match(/^\s*-\s+\S/gm) || []).length >= 3 },
          { label: "하지 말아야 할 일(금지/하지 말/절대)이 적혀 있다", re: /(금지|하지\s*말|절대|never|don't)/i },
        ],
        solution: "# 프로젝트: 할 일 관리 앱\n\n## 명령어\n- 개발 서버: npm run dev\n- 테스트: npm test\n- 린트: npm run lint\n\n## 구조\n- src/components: 화면 컴포넌트\n- src/store: 상태 관리\n- tests/: 단위 테스트\n\n## 코딩 규칙\n- TypeScript 사용, any 금지\n- 함수는 40줄 이하로 유지\n- 새 기능에는 반드시 테스트 추가\n\n## 주의사항\n- .env 파일은 절대 수정하지 말 것\n- 수정 후 npm test 를 실행해 통과를 확인할 것",
        tip: "<b>팁</b> 실제 프로젝트에 맞는 명령어를 쓰는 것이 가장 중요합니다.",
      },
    ],
    real: {
      body: "<p>Day 1 에 만든 <code>claude-study</code> 폴더(또는 아무 프로젝트)에서:</p>",
      code: { lang: "bash", file: "Claude Code", text: "> /init\n> CLAUDE.md 에 '답변은 항상 한국어로' 규칙을 추가해 줘\n> /memory     # 메모리 파일을 에디터로 열기" },
      after: "<p>그 다음 <code>/clear</code> 후 \"이 프로젝트 테스트는 어떻게 돌려?\" 라고 물어 보세요. CLAUDE.md 내용을 기반으로 답하면 성공입니다.</p>",
    },
    mistakes: [
      ["CLAUDE.md 에 코드 전체나 긴 문서를 붙여넣기", "핵심 명령·규칙만 짧게, 자세한 문서는 <code>@docs/파일.md</code> 로 import"],
      ["/init 결과를 검토 없이 그대로 사용", "틀린 명령·오래된 정보는 직접 고치고 팀 규칙 추가"],
    ],
    checklist: ["CLAUDE.md, .claude/settings.json 의 역할을 구분할 수 있다", "/init 을 실행해 보았다", "CLAUDE.md 에 명령어·구조·규칙을 적었다", "개인용(~/.claude)과 프로젝트용 메모리의 차이를 안다"],
  },

  /* ----------------------------------------------------- Day 4 */
  {
    id: 4, week: 1, icon: "🛡️", time: "45분", level: 2,
    title: "제어 관리 — 권한과 보안",
    subtitle: "Claude 가 무엇을 마음대로 하고, 무엇을 물어보고, 무엇을 절대 못 하게 할지 정합니다.",
    goals: ["권한 모드 4가지를 구분한다", "settings.json 의 allow / ask / deny 규칙을 작성한다", "민감한 파일과 위험한 명령을 보호한다"],
    analogy: { i: "🏢", t: "회사 출입증과 같습니다. 일반 사무실은 <b>자유 출입(allow)</b>, 회의실은 <b>예약 확인 후 출입(ask)</b>, 서버실·금고는 <b>출입 금지(deny)</b>. 신입 동료(Claude)에게 처음부터 모든 열쇠를 주지 않는 것이 안전합니다." },
    sections: [
      {
        h: "기본 동작: 위험하면 물어본다",
        body: `<p>기본적으로 Claude 는 파일 읽기·검색은 자유롭게 하지만, <b>파일 수정</b>과 <b>셸 명령 실행</b> 전에는 승인을 요청합니다. 승인 창에서 '이번만 허용', '이 명령은 앞으로 항상 허용', '거부(다른 방법 제안)'를 고를 수 있습니다.</p>`,
      },
      {
        h: "권한 모드 4가지",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>모드</th><th>동작</th><th>언제 쓰나</th></tr>
        <tr><td><b>default</b></td><td>수정·명령 실행 전 매번 확인</td><td>처음 배울 때, 중요한 코드</td></tr>
        <tr><td><b>acceptEdits</b></td><td>파일 수정은 자동 승인</td><td>믿을 만한 작업을 빠르게</td></tr>
        <tr><td><b>plan</b></td><td>읽기만 하고 계획만 세움 (수정 불가)</td><td>큰 작업 전 설계·조사</td></tr>
        <tr><td><b>bypassPermissions</b></td><td>모든 확인 생략</td><td>격리된 컨테이너 안에서만!</td></tr></table></div>
        <p>대화 중 <kbd>Shift</kbd>+<kbd>Tab</kbd> 으로 전환하거나, 실행할 때 <code>claude --permission-mode plan</code> 처럼 지정합니다.</p>`,
        tip: "<b>⛔ 경고</b> <code>--dangerously-skip-permissions</code>(bypass)는 이름 그대로 위험합니다. 인터넷과 분리된 컨테이너나 VM 이 아닌 곳에서는 쓰지 마세요.",
        tipType: "bad",
      },
      {
        h: "settings.json 으로 규칙 정하기",
        body: "<p>매번 승인하기 귀찮은 안전한 명령은 <b>allow</b>, 신중해야 할 명령은 <b>ask</b>, 절대 안 되는 것은 <b>deny</b> 에 넣습니다. <code>/permissions</code> 명령으로 대화 중에 편집할 수도 있습니다.</p>",
        code: { lang: "json", file: ".claude/settings.json", text: "{\n  \"permissions\": {\n    \"allow\": [\n      \"Bash(npm run test:*)\",\n      \"Bash(npm run lint)\",\n      \"Edit(src/**)\"\n    ],\n    \"ask\": [\n      \"Bash(git push:*)\"\n    ],\n    \"deny\": [\n      \"Read(./.env)\",\n      \"Read(./secrets/**)\",\n      \"Bash(rm -rf:*)\",\n      \"WebFetch\"\n    ]\n  }\n}" },
        after: `<p><b>규칙 문법</b></p><ul>
          <li><code>Bash</code> — 모든 셸 명령 / <code>Bash(npm run test:*)</code> — 'npm run test' 로 시작하는 명령</li>
          <li><code>Edit(src/**)</code> — src 아래 모든 파일 수정 / <code>Read(./.env)</code> — .env 파일 읽기</li>
          <li><code>WebFetch(domain:example.com)</code> — 특정 도메인만 웹 요청</li></ul>
          <p><b>우선순위:</b> deny 가 가장 강하고, 그 다음 ask, allow 순입니다. 설정 파일은 조직 정책 → 명령줄 옵션 → <code>settings.local.json</code> → <code>settings.json</code> → <code>~/.claude/settings.json</code> 순으로 우선합니다.</p>`,
      },
    ],
    viz: {
      type: "flow", title: "Claude 가 도구를 쓰려 할 때 권한 판정 과정",
      steps: [
        { i: "🤖", t: "도구 요청", d: "Bash(git push)", x: "Claude 가 <code>git push origin main</code> 을 실행하려 합니다." },
        { i: "⛔", t: "deny 확인", d: "해당하면 즉시 차단", x: "deny 목록에 맞는 규칙이 있으면 <b>무조건 차단</b>. 다른 규칙보다 우선합니다." },
        { i: "❓", t: "ask 확인", d: "해당하면 사용자에게 질문", x: "ask 에 <code>Bash(git push:*)</code> 가 있으므로 <b>사용자에게 승인 요청</b>." },
        { i: "✅", t: "allow 확인", d: "해당하면 자동 실행", x: "ask·deny 에 없고 allow 에 있으면 묻지 않고 실행합니다." },
        { i: "🙋", t: "기본값", d: "모드에 따라 판단", x: "어떤 규칙에도 없으면 현재 <b>권한 모드</b>에 따라 처리합니다 (기본 모드는 질문)." },
      ],
    },
    practice: [
      {
        type: "permsim", title: "권한 규칙 설계하기",
        intro: "왼쪽 규칙을 고쳐서 오른쪽 모든 작업이 '목표' 결과가 나오게 만드세요. (한 줄에 규칙 하나)",
        allow: ["Bash(npm run test:*)"],
        ask: [],
        deny: [],
        tests: [
          { call: "Bash(npm run test -- --watch)", want: "allow" },
          { call: "Bash(npm run lint)", want: "allow" },
          { call: "Edit(src/app.js)", want: "allow" },
          { call: "Edit(package.json)", want: "ask" },
          { call: "Bash(git push origin main)", want: "ask" },
          { call: "Read(.env)", want: "deny" },
          { call: "Read(secrets/api-key.txt)", want: "deny" },
          { call: "Read(src/app.js)", want: "allow" },
        ],
      },
      {
        type: "quiz", title: "권한 퀴즈",
        questions: [
          { q: "allow 에 <code>Bash(git:*)</code>, deny 에 <code>Bash(git push:*)</code> 가 있을 때 <code>git push</code> 는?", options: ["허용", "차단", "질문", "오류"], answer: 1, explain: "deny 가 항상 우선합니다." },
          { q: "큰 리팩토링 전에 코드는 건드리지 않고 조사·계획만 시키고 싶다면?", options: ["acceptEdits 모드", "plan 모드", "bypassPermissions 모드", "/clear"], answer: 1, explain: "Plan 모드는 읽기 전용으로 계획만 세웁니다." },
          { q: "팀원과 공유하지 않고 나만 쓰는 권한 설정 파일은?", options: [".claude/settings.json", ".claude/settings.local.json", "CLAUDE.md", ".mcp.json"], answer: 1, explain: "<code>settings.local.json</code> 은 개인용이며 git 에 올리지 않습니다." },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "Claude Code", text: "> /permissions          # 현재 규칙 보기·추가\n# Shift+Tab 을 눌러 Plan 모드로 전환한 뒤:\n> 이 프로젝트에 로그인 기능을 넣으려면 어떤 파일을 바꿔야 하는지 계획만 세워 줘" },
      after: "<p>Plan 모드에서는 Claude 가 파일을 수정하지 못하는 것을 확인해 보세요.</p>",
    },
    mistakes: [
      ["귀찮아서 모든 Bash 를 allow", "자주 쓰는 안전한 명령(test, lint)만 접두어로 허용"],
      [".env 같은 비밀 파일을 그대로 방치", "<code>Read(./.env)</code> 를 deny 에 넣어 아예 못 읽게"],
    ],
    checklist: ["4가지 권한 모드를 설명할 수 있다", "allow/ask/deny 의 우선순위를 안다", ".env 를 deny 하는 규칙을 쓸 수 있다", "Plan 모드를 실제로 써 보았다"],
  },

  /* ----------------------------------------------------- Day 5 */
  {
    id: 5, week: 1, icon: "🐙", time: "45분", level: 2,
    title: "GitHub 연결",
    subtitle: "git·GitHub CLI 와 연결해 커밋, 브랜치, PR 까지 Claude 와 함께 처리합니다.",
    goals: ["git 과 GitHub 의 기본 흐름을 이해한다", "gh CLI 로 GitHub 인증을 한다", "Claude 에게 커밋·PR 작성을 맡긴다"],
    analogy: { i: "💾", t: "git 은 <b>게임의 세이브 포인트</b>입니다. Claude 가 실수해도 저장해 둔 곳으로 돌아갈 수 있죠. GitHub 은 그 세이브 파일을 팀과 공유하는 <b>클라우드 저장소</b>입니다." },
    sections: [
      {
        h: "왜 git 이 Claude Code 와 궁합이 좋을까?",
        body: `<ul><li><b>안전망</b>: Claude 의 변경이 마음에 안 들면 <code>git restore</code> / <code>git checkout</code> 으로 되돌리기</li>
        <li><b>변경 확인</b>: <code>git diff</code> 로 Claude 가 정확히 무엇을 바꿨는지 확인</li>
        <li><b>자동화</b>: Claude 는 변경 내용을 읽고 <b>커밋 메시지·PR 설명</b>을 훌륭하게 써 줍니다</li></ul>`,
      },
      {
        h: "GitHub CLI(gh) 설치와 로그인",
        body: "<p>Claude 는 GitHub 작업(이슈 보기, PR 만들기)에 <code>gh</code> 명령을 사용합니다. 설치 후 한 번만 로그인하면 됩니다.</p>",
        code: [
          { lang: "bash", file: "설치", text: "# macOS\nbrew install gh\n# Windows\nwinget install --id GitHub.cli\n# 로그인 (브라우저 인증)\ngh auth login\ngh auth status" },
        ],
      },
      {
        h: "Claude 에게 git 작업 맡기기",
        code: { lang: "bash", file: "Claude Code", text: "> 지금까지 변경사항을 확인하고 적절한 커밋 메시지로 커밋해 줘\n> feature/login 브랜치를 만들고 거기서 작업해 줘\n> 이 브랜치로 PR 을 만들어 줘. 설명에는 변경 이유와 테스트 방법을 넣어\n> 이슈 #12 를 읽고 해결해 줘" },
        after: "<p>GitHub Actions 와 연동하면 이슈·PR 에 <code>@claude</code> 라고 댓글을 달아 Claude 를 호출할 수도 있습니다. Claude Code 안에서 <code>/install-github-app</code> 으로 설정하며, 3주차(Day 17)에 자세히 다룹니다.</p>",
        tip: "<b>💡 좋은 습관</b> 큰 작업 전에 <code>git commit</code> 으로 세이브 포인트를 만들고, 작업은 별도 브랜치에서 하세요.",
      },
    ],
    viz: {
      type: "sequence", title: "Claude 와 함께하는 커밋·PR 흐름",
      actors: [{ t: "나", i: "🙋" }, { t: "Claude", i: "✻", center: true }, { t: "git", i: "🌿" }, { t: "GitHub", i: "🐙" }],
      msgs: [
        { from: "나", to: "Claude", t: "\"변경사항 커밋하고 PR 만들어 줘\"", x: "자연어로 요청합니다." },
        { from: "Claude", to: "git", t: "git status / git diff", x: "무엇이 바뀌었는지 먼저 <b>확인</b>합니다." },
        { from: "Claude", to: "Claude", t: "변경 분석 → 커밋 메시지 작성", x: "diff 를 읽고 변경 의도를 요약합니다." },
        { from: "Claude", to: "나", t: "git commit 실행해도 될까요?", x: "명령 실행 전 <b>승인</b>을 요청합니다 (권한 설정에 따라)." },
        { from: "Claude", to: "git", t: "git commit · git push", x: "커밋하고 원격 저장소로 올립니다." },
        { from: "Claude", to: "GitHub", t: "gh pr create", x: "<code>gh</code> CLI 로 PR 을 만듭니다." },
        { from: "GitHub", to: "나", t: "PR 링크", x: "완성된 PR 주소를 받아 리뷰합니다." },
      ],
    },
    practice: [
      {
        type: "terminal", title: "GitHub 연결하고 PR 만들기",
        tasks: [
          { goal: "GitHub 로그인 상태 확인", hint: "gh auth status", match: /^gh auth status$/, out: "github.com\n  {ok:✓} Logged in to github.com account me (keyring)\n  - Token scopes: 'repo', 'read:org'" },
          { goal: "새 브랜치 만들기", hint: "git checkout -b feature/hello", match: /^git (checkout -b|switch -c) \S+$/, out: (c) => `Switched to a new branch '${c.split(" ").pop()}'` },
          { goal: "Claude Code 실행", hint: "claude", match: /^claude$/, enter: "claude", out: "" },
          { goal: "Claude 에게 커밋을 요청", hint: "변경사항 확인하고 커밋해줘", match: /커밋|commit/i, mode: "claude", out: "{tool:⏺ Bash}(git status)\n{tool:⏺ Bash}(git diff)\n  {dim:⎿ src/hello.js 1개 파일 변경}\n{tool:⏺ Bash}(git add src/hello.js && git commit -m \"feat: 인사 메시지 함수 추가\")\n  {dim:⎿ [feature/hello 3f2a1c9] feat: 인사 메시지 함수 추가}\n{ok:⏺} 커밋했습니다." },
          { goal: "Claude 에게 PR 생성을 요청", hint: "PR 만들어줘", match: /PR|풀\s?리퀘|pull request/i, mode: "claude", out: "{tool:⏺ Bash}(git push -u origin feature/hello)\n{tool:⏺ Bash}(gh pr create --title \"feat: 인사 메시지 함수 추가\" --body \"...\")\n  {dim:⎿ https://github.com/me/my-project/pull/7}\n{ok:⏺} PR #7 을 만들었습니다. 설명에 변경 이유와 테스트 방법을 적었어요." },
        ],
      },
      {
        type: "order", title: "안전한 작업 순서 맞추기",
        intro: "Claude 와 새 기능을 개발할 때의 권장 순서로 정렬하세요. (드래그 또는 ▲▼ 버튼)",
        items: ["작업 전 현재 상태 커밋 (세이브 포인트)", "새 브랜치 만들기", "Claude 에게 기능 구현 요청", "git diff 로 변경 내용 검토", "테스트 실행 후 커밋", "push 하고 PR 생성"],
        explain: "브랜치 + 커밋 습관이 있으면 언제든 되돌릴 수 있습니다.",
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "cd claude-study\ngit init\ngit add . && git commit -m \"init\"\nclaude\n> hello.py 파일을 만들어 인사말을 출력하게 하고, 커밋까지 해 줘\n> !git log --oneline" },
    },
    mistakes: [
      ["main 브랜치에서 바로 큰 작업", "브랜치를 만들고 작업 → 문제 시 브랜치만 버리면 됨"],
      ["Claude 가 쓴 커밋을 확인 없이 push", "<code>git diff</code>, <code>git show</code> 로 확인 후 push"],
    ],
    checklist: ["gh auth status 가 로그인 상태다", "Claude 에게 커밋 메시지를 쓰게 해 보았다", "git 으로 Claude 의 변경을 되돌리는 법을 안다"],
  },

  /* ----------------------------------------------------- Day 6 */
  {
    id: 6, week: 1, icon: "🏗️", time: "60분", level: 2,
    title: "첫 번째 빌드",
    subtitle: "탐색 → 계획 → 구현 → 커밋. 계획에 따라 작은 앱을 처음부터 만들어 실행합니다.",
    goals: ["탐색-계획-구현-커밋(EPCC) 흐름을 익힌다", "Plan 모드로 계획을 먼저 검토한다", "작은 앱을 완성하고 실행·검증한다"],
    analogy: { i: "🏠", t: "집을 지을 때 바로 벽돌부터 쌓지 않습니다. <b>땅을 살펴보고(탐색) → 설계도를 그리고(계획) → 짓고(구현) → 준공 검사(검증)</b>를 하죠. Claude 에게도 '바로 코딩하지 말고 먼저 계획을 보여줘'라고 하면 결과가 훨씬 좋아집니다." },
    sections: [
      {
        h: "EPCC 워크플로우",
        body: `<ol><li><b>Explore(탐색)</b>: "관련 파일을 읽어 봐. 아직 코드는 쓰지 마."</li>
        <li><b>Plan(계획)</b>: Plan 모드(<kbd>Shift</kbd>+<kbd>Tab</kbd>)에서 "계획을 세워 줘" → 계획 검토·수정</li>
        <li><b>Code(구현)</b>: 계획 승인 후 구현, 중간중간 실행·테스트로 검증</li>
        <li><b>Commit(커밋)</b>: 결과를 확인하고 커밋, 필요하면 PR</li></ol>`,
        tip: "<b>💡 '생각' 요청</b> 어려운 문제라면 \"깊게 생각해서 계획해 줘(think hard)\" 처럼 요청하면 더 신중하게 검토합니다.",
      },
      {
        h: "실습 목표: 할 일(To-do) 웹앱",
        body: "<p>HTML 파일 하나로 동작하는 할 일 앱을 만들어 봅니다. 요구사항을 명확히 적어서 전달하는 것이 핵심입니다.</p>",
        code: { lang: "md", file: "요청 프롬프트 예시", text: "할 일 관리 웹앱을 만들고 싶어. 먼저 계획만 세워 줘.\n\n요구사항:\n- index.html 하나로 동작 (외부 라이브러리 없이)\n- 할 일 추가, 완료 체크, 삭제\n- 새로고침해도 유지 (localStorage)\n- 모바일에서도 보기 좋게\n\n완료 기준:\n- 브라우저에서 열어 추가/완료/삭제가 모두 동작" },
      },
      {
        h: "검증까지가 개발이다",
        body: "<p>Claude 가 '완료했습니다'라고 해도 직접 실행해 보세요. 문제가 있으면 <b>증상을 구체적으로</b> 알려 주면 됩니다.</p>",
        code: { lang: "bash", file: "Claude Code", text: "> 삭제 버튼을 눌러도 새로고침하면 다시 나타나. 원인을 찾아서 고쳐 줘\n> 지금 상태로 커밋해 줘" },
      },
    ],
    viz: {
      type: "flow", title: "탐색 → 계획 → 구현 → 커밋",
      steps: [
        { i: "🔎", t: "탐색", d: "읽기만, 코딩 금지", x: "\"관련 파일 읽어 보고 구조를 파악해. <b>아직 코드는 쓰지 마</b>.\"" },
        { i: "📝", t: "계획", d: "Plan 모드", x: "<kbd>Shift</kbd>+<kbd>Tab</kbd> 으로 Plan 모드. Claude 가 단계별 계획을 제시하면 <b>검토·수정</b>합니다." },
        { i: "✅", t: "승인", d: "계획 확정", x: "계획이 마음에 들면 승인. 이제부터 실제 수정이 시작됩니다." },
        { i: "🛠️", t: "구현", d: "작은 단위로", x: "Claude 가 파일을 만들고 수정합니다. 중간 결과를 실행해 보며 피드백합니다." },
        { i: "🧪", t: "검증", d: "실행·테스트", x: "직접 열어 보고, 테스트를 돌립니다. 문제는 증상과 함께 전달." },
        { i: "💾", t: "커밋", d: "세이브 포인트", x: "\"커밋해 줘\" — 다음 작업의 안전한 출발점이 됩니다." },
      ],
    },
    practice: [
      {
        type: "terminal", title: "할 일 앱 빌드 시뮬레이션",
        startMode: "claude",
        files: [],
        tasks: [
          { goal: "Plan 모드 상태라고 가정하고, 계획을 요청하세요 (단어 '계획' 포함)", hint: "할 일 관리 웹앱을 만들고 싶어. index.html 하나로, localStorage 사용. 먼저 계획만 세워줘", match: /계획|plan/i, mode: "claude", out: "{warn:⏸ plan mode}\n{ok:⏺} 계획안\n  1. index.html 생성 — 입력창, 추가 버튼, 목록 영역\n  2. 할 일 데이터: [{id, text, done}] 배열\n  3. 추가/완료 토글/삭제 함수 작성\n  4. 변경 시 localStorage 에 저장, 시작 시 불러오기\n  5. 모바일 대응 CSS\n  6. 브라우저에서 동작 확인\n{acc:이 계획대로 진행할까요? (승인 / 수정 요청)}" },
          { goal: "계획을 한 가지 수정 요청하기 (예: 완료 항목 개수 표시 추가)", hint: "좋아. 남은 할 일 개수 표시도 추가해줘", match: /추가|넣어|포함|수정/, mode: "claude", out: "{ok:⏺} 계획 수정: 5-1. 상단에 '남은 할 일 N개' 표시 추가\n{acc:수정된 계획으로 진행할까요?}" },
          { goal: "계획 승인하고 구현 시작시키기", hint: "좋아 진행해", match: /진행|승인|시작|좋아|ok|go/i, mode: "claude", out: "{tool:⏺ Write}(index.html)\n  {dim:⎿ 128줄 작성}\n{tool:⏺ Bash}(npx serve . )\n  {dim:⎿ http://localhost:3000}\n{ok:⏺} 구현을 마쳤습니다. 브라우저에서 확인해 주세요." },
          { goal: "버그를 증상과 함께 보고하기 (예: 새로고침하면 삭제가 원래대로)", hint: "삭제한 항목이 새로고침하면 다시 나타나. 원인 찾아서 고쳐줘", match: /새로고침|버그|안\s?돼|다시 나타|고쳐/, mode: "claude", out: "{tool:⏺ Read}(index.html)\n{ok:⏺} 원인: remove() 함수에서 배열은 지우지만 save() 를 호출하지 않았습니다.\n{tool:⏺ Edit}(index.html)\n  {dim:⎿ +1 줄: save() 호출 추가}\n{ok:⏺} 수정했습니다. 다시 확인해 주세요." },
          { goal: "완성본 커밋 요청하기", hint: "커밋해줘", match: /커밋|commit/i, mode: "claude", out: "{tool:⏺ Bash}(git add index.html && git commit -m \"feat: 할 일 관리 앱 첫 버전\")\n{ok:⏺} 커밋 완료! 첫 번째 빌드를 축하합니다 🎉" },
        ],
      },
      {
        type: "order", title: "EPCC 순서",
        items: ["관련 파일 읽기 (코드 작성 금지)", "Plan 모드로 계획 세우기", "계획 검토 후 수정·승인", "구현", "실행·테스트로 검증", "커밋"],
      },
    ],
    real: {
      body: "<p>위 프롬프트 예시를 그대로 사용해 실제로 할 일 앱을 만들어 보세요. 완성되면 index.html 을 브라우저로 열어 확인합니다.</p>",
      code: { lang: "bash", file: "내 터미널", text: "mkdir todo-app && cd todo-app && git init\nclaude --permission-mode plan\n# 계획 승인 후 Shift+Tab 으로 기본 모드로 돌아와 구현" },
    },
    mistakes: [
      ["\"할 일 앱 만들어 줘\" 한 줄 요청", "요구사항 + 제약 + 완료 기준을 함께 전달"],
      ["\"완료했습니다\"만 믿고 넘어가기", "직접 실행·테스트로 검증, 문제는 증상과 함께 전달"],
    ],
    checklist: ["Plan 모드로 계획을 먼저 받아 보았다", "요구사항과 완료 기준을 적어서 요청했다", "결과를 직접 실행해 확인했다", "1주차 완주! 🎉"],
  },
];
