/* 3주차 — 자동화 */
window.WEEK3 = [
  /* ----------------------------------------------------- Day 13 */
  {
    id: 13, week: 3, icon: "🪝", time: "60분", level: 2,
    title: "동작 트리거 — 훅(Hooks)",
    subtitle: "특정 조건(이벤트)에서 정해진 작업이 자동으로 실행되게 합니다. 포맷팅, 위험 차단, 알림까지.",
    goals: ["훅 이벤트 종류와 발생 시점을 안다", "settings.json 에 훅을 설정한다", "종료 코드로 작업을 차단하는 원리를 이해한다"],
    analogy: { i: "🚪", t: "자동문 센서와 같습니다. <b>사람이 다가오면(이벤트)</b> → <b>문이 열린다(동작)</b>. 훅은 'Claude 가 파일을 수정한 직후', '명령을 실행하기 직전' 같은 순간에 <b>내가 정한 스크립트가 반드시 실행</b>되도록 합니다. 프롬프트로 부탁하는 것과 달리 <b>100% 실행이 보장</b>됩니다." },
    sections: [
      {
        h: "주요 훅 이벤트",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>이벤트</th><th>언제?</th><th>활용 예</th></tr>
        <tr><td><b>PreToolUse</b></td><td>도구 실행 <b>직전</b></td><td>위험 명령·민감 파일 접근 차단</td></tr>
        <tr><td><b>PostToolUse</b></td><td>도구 실행 <b>직후</b></td><td>파일 수정 후 자동 포맷팅·린트</td></tr>
        <tr><td><b>UserPromptSubmit</b></td><td>사용자가 프롬프트 전송 시</td><td>프롬프트 검사, 추가 맥락 주입</td></tr>
        <tr><td><b>Notification</b></td><td>Claude 가 승인·입력을 기다릴 때</td><td>데스크톱/슬랙 알림</td></tr>
        <tr><td><b>Stop</b></td><td>Claude 가 응답을 마쳤을 때</td><td>완료 알림, 최종 테스트</td></tr>
        <tr><td><b>SubagentStop</b></td><td>서브에이전트가 끝났을 때</td><td>결과 기록</td></tr>
        <tr><td><b>SessionStart</b></td><td>세션 시작 시</td><td>개발 맥락(이슈 목록 등) 불러오기</td></tr>
        <tr><td><b>PreCompact</b></td><td>대화 압축 직전</td><td>대화 기록 백업</td></tr></table></div>`,
      },
      {
        h: "훅 설정 구조",
        body: "<p>훅은 <code>.claude/settings.json</code> 의 <code>hooks</code> 에 적습니다. <b>matcher</b> 로 어떤 도구에 반응할지 정하고(정규식, 예: <code>Edit|Write</code>), <b>command</b> 에 실행할 셸 명령을 씁니다. 대화 중 <code>/hooks</code> 명령으로도 설정할 수 있습니다.</p>",
        code: { lang: "json", file: ".claude/settings.json", text: "{\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          { \"type\": \"command\", \"command\": \"npx prettier --write .\" }\n        ]\n      }\n    ],\n    \"Notification\": [\n      {\n        \"hooks\": [\n          { \"type\": \"command\", \"command\": \"echo 'Claude 가 기다리는 중' >> ~/claude.log\" }\n        ]\n      }\n    ]\n  }\n}" },
      },
      {
        h: "차단하는 훅: 종료 코드 2",
        body: "<p>훅 스크립트는 표준 입력(stdin)으로 <b>JSON</b>(도구 이름, 입력값 등)을 받습니다. 스크립트가 <b>종료 코드 2</b>로 끝나면 해당 작업이 <b>차단</b>되고, 표준 에러(stderr)에 쓴 메시지가 Claude 에게 전달되어 Claude 가 다른 방법을 찾습니다. 종료 코드 0 은 통과입니다.</p>",
        code: [
          { lang: "json", file: ".claude/settings.json", text: "{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Edit|Write|Read\",\n        \"hooks\": [\n          { \"type\": \"command\", \"command\": \"python3 .claude/hooks/protect_env.py\" }\n        ]\n      }\n    ]\n  }\n}" },
          { lang: "python", file: ".claude/hooks/protect_env.py", text: "import json, sys\n\ndata = json.load(sys.stdin)              # 훅 입력 JSON\npath = data.get(\"tool_input\", {}).get(\"file_path\", \"\")\n\nif \".env\" in path:\n    print(\"보안 정책: .env 파일은 접근할 수 없습니다\", file=sys.stderr)\n    sys.exit(2)                           # 2 = 차단\n\nsys.exit(0)                               # 0 = 통과" },
        ],
        tip: "<b>⚠️ 보안 주의</b> 훅은 내 컴퓨터 권한으로 셸 명령을 실행합니다. 다른 사람이 만든 훅 설정은 내용을 확인한 뒤에 사용하세요.",
        tipType: "warn",
      },
    ],
    viz: {
      type: "sequence", title: "훅이 끼어드는 순간",
      desc: "Claude 가 파일을 수정할 때 PreToolUse → 실행 → PostToolUse 가 순서대로 일어납니다.",
      actors: [{ t: "Claude", i: "✻", center: true }, { t: "Hook", i: "🪝" }, { t: "도구", i: "🛠️" }, { t: "파일", i: "📄" }],
      msgs: [
        { from: "Claude", to: "Hook", t: "PreToolUse: Edit(src/app.js)", x: "도구 실행 <b>직전</b>, 훅 스크립트가 JSON 입력을 받습니다." },
        { from: "Hook", to: "Hook", t: "검사: .env 아님 → exit 0", x: "문제가 없으므로 종료 코드 0 → 통과." },
        { from: "Hook", to: "도구", t: "실행 허가", x: "권한 규칙도 통과하면 도구가 실행됩니다." },
        { from: "도구", to: "파일", t: "src/app.js 수정", x: "실제 파일이 수정됩니다." },
        { from: "도구", to: "Hook", t: "PostToolUse 발생", x: "수정 <b>직후</b> PostToolUse 훅이 실행됩니다." },
        { from: "Hook", to: "파일", t: "prettier --write", x: "자동 포맷팅 — Claude 가 잊어도 항상 실행됩니다." },
        { from: "Hook", to: "Claude", t: "결과 전달", x: "훅 출력이 필요하면 Claude 에게 전달되어 다음 행동에 반영됩니다." },
      ],
    },
    practice: [
      {
        type: "editor", label: "🧩 JSON 작성", title: "자동 포맷팅 + 테스트 알림 훅 만들기",
        intro: "settings.json 에 ① 파일 수정(Edit|Write) 후 prettier 실행, ② 응답이 끝나면(Stop) 'done' 을 로그에 남기는 훅을 작성하세요.",
        file: ".claude/settings.json",
        starter: "{\n  \"hooks\": {\n    \n  }\n}",
        checks: [
          { label: "올바른 JSON 형식이다", fn: (v) => { JSON.parse(v); return true; } },
          { label: "PostToolUse 이벤트가 있다", fn: (v) => !!JSON.parse(v).hooks.PostToolUse },
          { label: "PostToolUse 의 matcher 가 Edit 와 Write 를 포함", fn: (v) => JSON.parse(v).hooks.PostToolUse.some((h) => /Edit/.test(h.matcher) && /Write/.test(h.matcher)) },
          { label: "PostToolUse 에서 prettier 명령을 실행", fn: (v) => JSON.parse(v).hooks.PostToolUse.some((h) => (h.hooks || []).some((x) => x.type === "command" && /prettier/.test(x.command))) },
          { label: "Stop 이벤트 훅이 있다", fn: (v) => (JSON.parse(v).hooks.Stop || []).some((h) => (h.hooks || []).some((x) => x.type === "command" && x.command)) },
        ],
        solution: "{\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          { \"type\": \"command\", \"command\": \"npx prettier --write .\" }\n        ]\n      }\n    ],\n    \"Stop\": [\n      {\n        \"hooks\": [\n          { \"type\": \"command\", \"command\": \"echo done >> ~/claude.log\" }\n        ]\n      }\n    ]\n  }\n}",
        tip: "<b>힌트</b> 구조: 이벤트 → [ { matcher, hooks: [ { type, command } ] } ]",
      },
      {
        type: "quiz", title: "어떤 훅 이벤트?",
        questions: [
          { q: "Claude 가 <code>rm -rf</code> 를 실행하기 <b>전에</b> 막고 싶다", options: ["PostToolUse", "PreToolUse", "Stop", "SessionStart"], answer: 1, explain: "실행 전 차단은 PreToolUse + 종료 코드 2." },
          { q: "Claude 가 승인을 기다릴 때 휴대폰 알림을 받고 싶다", options: ["Notification", "PreCompact", "PostToolUse", "UserPromptSubmit"], answer: 0 },
          { q: "훅 스크립트에서 작업을 차단하는 종료 코드는?", options: ["0", "1", "2", "127"], answer: 2, explain: "2 는 차단, stderr 메시지가 Claude 에게 전달됩니다." },
          { q: "프롬프트로 \"수정 후 항상 포맷팅해\" 라고 하는 것과 훅의 차이는?", options: ["차이 없음", "훅은 Claude 의 판단과 상관없이 매번 반드시 실행된다", "프롬프트가 더 확실하다", "훅은 한 번만 실행된다"], answer: 1, explain: "훅은 <b>결정적(deterministic)</b> 실행을 보장합니다." },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "Claude Code", text: "> /hooks\n# PostToolUse → matcher: Edit|Write → command: npx prettier --write .\n# 저장 위치: Project settings 선택\n> src/app.js 의 들여쓰기를 일부러 엉망으로 바꿔 줘\n# → 훅이 자동으로 다시 정리하는지 확인" },
    },
    mistakes: [
      ["확인 안 한 외부 훅 설정을 그대로 복사", "명령 내용을 읽고 이해한 뒤 사용"],
      ["오래 걸리는 작업(전체 테스트)을 모든 Edit 마다 실행", "Stop 이벤트나 특정 matcher 로 범위를 좁히기"],
    ],
    checklist: ["훅 이벤트 4개 이상을 설명할 수 있다", "PostToolUse 포맷팅 훅을 설정했다", "종료 코드 2 의 의미를 안다"],
  },

  /* ----------------------------------------------------- Day 14 */
  {
    id: 14, week: 3, icon: "🔌", time: "60분", level: 2,
    title: "커넥터 활용 — MCP",
    subtitle: "MCP(Model Context Protocol)로 GitHub, 데이터베이스, 브라우저, 사내 도구 등 외부 서비스와 연결합니다.",
    goals: ["MCP 가 무엇이고 왜 필요한지 안다", "claude mcp add 로 서버를 추가한다", ".mcp.json 으로 팀과 설정을 공유한다"],
    analogy: { i: "🔌", t: "MCP 는 AI 용 <b>USB-C 포트</b>입니다. 모니터든 충전기든 USB-C 하나로 연결되듯, MCP 규격만 맞추면 GitHub·Slack·DB·브라우저 등 어떤 도구든 Claude 에 꽂아 쓸 수 있습니다." },
    sections: [
      {
        h: "MCP 로 할 수 있는 것",
        body: `<ul><li>🐙 <b>GitHub</b>: 이슈·PR 조회, 코멘트 작성</li>
        <li>🗄️ <b>데이터베이스</b>: \"지난주 가입자 수 조회해 줘\"</li>
        <li>🌐 <b>브라우저 자동화(Playwright 등)</b>: 웹페이지를 열고 클릭·스크린샷으로 UI 확인</li>
        <li>📋 <b>업무 도구</b>: Jira·Notion·Sentry·Figma 등의 데이터를 읽고 작업</li></ul>
        <p>MCP 서버는 Claude 에게 새로운 <b>도구(tool)</b>를 추가합니다. 연결 방식은 내 PC 에서 프로그램을 실행하는 <b>stdio</b>, 원격 서버에 접속하는 <b>HTTP</b> 가 있습니다.</p>`,
      },
      {
        h: "MCP 서버 추가하기",
        code: { lang: "bash", file: "터미널", text: "# 원격(HTTP) 서버 추가\nclaude mcp add --transport http github https://api.githubcopilot.com/mcp/\n\n# 로컬(stdio) 서버 추가: -- 뒤가 실행할 명령\nclaude mcp add playwright -- npx @playwright/mcp@latest\n\n# 환경 변수 전달\nclaude mcp add mydb -e DB_URL=postgres://localhost/dev -- npx some-db-mcp-server\n\nclaude mcp list            # 목록\nclaude mcp get github      # 상세\nclaude mcp remove github   # 삭제" },
        after: "<p>Claude Code 안에서는 <code>/mcp</code> 로 연결 상태 확인과 OAuth 인증을 할 수 있습니다.</p>",
      },
      {
        h: "설치 범위(scope)와 .mcp.json",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>scope</th><th>저장 위치</th><th>용도</th></tr>
        <tr><td><b>local</b> (기본)</td><td>내 사용자 설정 (이 프로젝트 전용)</td><td>나만, 이 프로젝트에서만</td></tr>
        <tr><td><b>project</b></td><td>프로젝트의 <code>.mcp.json</code></td><td>팀 전체 공유 (git 커밋)</td></tr>
        <tr><td><b>user</b></td><td>내 사용자 설정</td><td>나만, 모든 프로젝트에서</td></tr></table></div>`,
        code: { lang: "json", file: ".mcp.json (project scope)", text: "{\n  \"mcpServers\": {\n    \"playwright\": {\n      \"command\": \"npx\",\n      \"args\": [\"@playwright/mcp@latest\"]\n    },\n    \"sentry\": {\n      \"type\": \"http\",\n      \"url\": \"https://mcp.sentry.dev/mcp\"\n    }\n  }\n}" },
        tip: "<b>⚠️ 신뢰할 수 있는 서버만</b> MCP 서버는 Claude 가 읽는 데이터를 제공합니다. 출처가 불분명한 서버는 악성 지시(프롬프트 인젝션)를 섞을 수 있으니 공식·검증된 서버만 사용하세요. 비밀번호·토큰은 .mcp.json 에 직접 쓰지 말고 환경 변수로.",
        tipType: "warn",
      },
    ],
    viz: {
      type: "hub", title: "MCP — Claude 를 중심으로 연결되는 도구들",
      desc: "각 서버를 클릭하면 어떤 방식으로 연결되는지 보여 줍니다.",
      center: "Claude Code\n(MCP 클라이언트)",
      nodes: [
        { i: "🐙", t: "GitHub", d: "이슈·PR", via: "HTTP", x: "원격 HTTP 서버. OAuth 로 로그인 후 이슈·PR 도구 사용." },
        { i: "🗄️", t: "Database", d: "SQL 조회", via: "stdio", x: "내 PC 에서 서버 프로그램을 실행(stdio). 읽기 전용 계정 사용을 권장." },
        { i: "🌐", t: "Playwright", d: "브라우저 조작", via: "stdio", x: "브라우저를 띄워 클릭·입력·스크린샷. UI 버그 확인에 유용." },
        { i: "🐞", t: "Sentry", d: "에러 모니터링", via: "HTTP", x: "\"오늘 가장 많이 발생한 에러 원인 찾아 줘\" 같은 요청이 가능해집니다." },
        { i: "📝", t: "Notion/Jira", d: "업무 문서", via: "HTTP", x: "기획 문서·티켓을 읽고 그대로 구현." },
        { i: "📁", t: "사내 API", d: "직접 만든 서버", via: "stdio/HTTP", x: "MCP SDK 로 우리 회사 시스템용 서버를 직접 만들 수도 있습니다." },
      ],
    },
    practice: [
      {
        type: "terminal", title: "MCP 서버 연결하기",
        tasks: [
          { goal: "현재 MCP 서버 목록 확인", hint: "claude mcp list", match: /^claude mcp list$/, out: "{dim:No MCP servers configured. Use `claude mcp add` to add a server.}" },
          { goal: "Playwright MCP 서버를 stdio 로 추가 (-- 뒤에 npx 명령)", hint: "claude mcp add playwright -- npx @playwright/mcp@latest", match: /^claude mcp add (-s \w+ )?playwright( -s \w+)? -- npx @playwright\/mcp(@latest)?$/, addMcp: "playwright", out: "{ok:Added stdio MCP server playwright} with command: npx @playwright/mcp@latest to local config" },
          { goal: "GitHub MCP 서버를 HTTP 로 추가", hint: "claude mcp add --transport http github https://api.githubcopilot.com/mcp/", match: /^claude mcp add --transport http github https?:\/\/\S+$/, addMcp: "github", out: "{ok:Added HTTP MCP server github} with URL: https://api.githubcopilot.com/mcp/ to local config" },
          { goal: "Claude Code 실행", hint: "claude", match: /^claude$/, enter: "claude", out: "" },
          { goal: "연결 상태 확인", hint: "/mcp", match: /^\/mcp$/, mode: "claude", out: "{ok:●} playwright — connected (도구 21개)\n{warn:●} github — 인증 필요 → Enter 로 브라우저 인증\n{dim:(인증 완료 가정)} {ok:●} github — connected" },
          { goal: "MCP 도구를 쓰는 요청 (예: 브라우저로 localhost:3000 열어 스크린샷)", hint: "브라우저로 localhost:3000 을 열고 스크린샷 찍어서 레이아웃 문제 찾아줘", match: /(브라우저|스크린샷|이슈|issue|PR)/i, mode: "claude", out: "{tool:⏺ playwright - browser_navigate}(url: http://localhost:3000)\n{tool:⏺ playwright - browser_take_screenshot}()\n  {dim:⎿ 스크린샷 캡처}\n{ok:⏺} 모바일 폭에서 헤더 메뉴가 화면 밖으로 넘칩니다. header.css 의 고정 너비(960px)가 원인으로 보여요." },
        ],
      },
      {
        type: "editor", label: "🧩 JSON 작성", title: "팀 공유용 .mcp.json 작성",
        intro: "팀원 모두가 쓸 수 있도록 playwright(stdio)와 sentry(http, https://mcp.sentry.dev/mcp) 서버를 .mcp.json 에 등록하세요.",
        file: ".mcp.json",
        starter: "{\n  \"mcpServers\": {\n\n  }\n}",
        checks: [
          { label: "올바른 JSON", fn: (v) => { JSON.parse(v); return true; } },
          { label: "mcpServers 안에 playwright 가 있다", fn: (v) => !!JSON.parse(v).mcpServers.playwright },
          { label: "playwright 는 command 와 args 로 실행", fn: (v) => { const p = JSON.parse(v).mcpServers.playwright; return !!p.command && Array.isArray(p.args); } },
          { label: "sentry 는 type: http 와 url 을 가진다", fn: (v) => { const s = JSON.parse(v).mcpServers.sentry; return s && s.type === "http" && /^https:\/\//.test(s.url); } },
          { label: "토큰·비밀번호를 직접 쓰지 않았다", fn: (v) => !/(token|password|secret)"\s*:\s*"[^$]/i.test(v) },
        ],
        solution: "{\n  \"mcpServers\": {\n    \"playwright\": {\n      \"command\": \"npx\",\n      \"args\": [\"@playwright/mcp@latest\"]\n    },\n    \"sentry\": {\n      \"type\": \"http\",\n      \"url\": \"https://mcp.sentry.dev/mcp\"\n    }\n  }\n}",
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "claude mcp add playwright -- npx @playwright/mcp@latest\nclaude\n> /mcp\n> playwright 로 https://example.com 을 열고 페이지 제목을 알려 줘" },
    },
    mistakes: [
      ["출처 모를 MCP 서버 설치", "공식/검증된 서버만, 권한은 최소로 (DB 는 읽기 전용 계정)"],
      ["API 토큰을 .mcp.json 에 직접 기록 후 커밋", "환경 변수로 전달, 비밀값은 git 에 올리지 않기"],
    ],
    checklist: ["MCP 를 한 문장으로 설명할 수 있다", "claude mcp add 로 서버를 추가했다", "local/project/user scope 차이를 안다", "/mcp 로 상태를 확인했다"],
  },

  /* ----------------------------------------------------- Day 15 */
  {
    id: 15, week: 3, icon: "🤖", time: "60분", level: 2,
    title: "동작 자동화",
    subtitle: "나만의 슬래시 명령, 스킬, 헤드리스 모드(claude -p)로 반복 작업을 자동화합니다.",
    goals: ["커스텀 슬래시 명령을 만든다", "스킬(Skill)의 개념을 이해한다", "claude -p 로 스크립트에서 Claude 를 호출한다"],
    analogy: { i: "📼", t: "매일 하는 일을 <b>매크로 버튼</b>으로 만드는 것과 같습니다. 긴 프롬프트를 매번 타이핑하는 대신 <code>/fix-issue 123</code> 처럼 버튼 하나로 실행하고, 더 나아가 사람이 없어도 스크립트가 Claude 를 호출하게 합니다." },
    sections: [
      {
        h: "① 커스텀 슬래시 명령",
        body: "<p><code>.claude/commands/</code> 폴더에 마크다운 파일을 만들면 파일 이름이 곧 명령이 됩니다. <code>$ARGUMENTS</code> 는 명령 뒤에 입력한 내용으로 바뀝니다. (<code>$1</code>, <code>$2</code> 로 개별 인자도 가능)</p>",
        code: { lang: "md", file: ".claude/commands/fix-issue.md", text: "---\ndescription: GitHub 이슈를 분석하고 수정한다\nallowed-tools: Bash(gh issue view:*), Bash(npm test:*), Edit, Read\n---\n\nGitHub 이슈 #$ARGUMENTS 를 해결해 줘.\n\n1. gh issue view $ARGUMENTS 로 이슈 내용을 읽는다\n2. 관련 코드를 찾아 원인을 설명한다\n3. 수정하고 테스트를 추가한다\n4. npm test 로 통과를 확인한다\n5. 변경 요약을 보여 준다 (커밋은 하지 않음)" },
        after: "<p>사용: Claude Code 에서 <code>/fix-issue 123</code>. 개인용 명령은 <code>~/.claude/commands/</code> 에 둡니다.</p>",
      },
      {
        h: "② 스킬(Skill)",
        body: "<p>스킬은 <b>특정 작업용 매뉴얼 + 스크립트 묶음</b>입니다. <code>.claude/skills/이름/SKILL.md</code> 에 설명을 써 두면, Claude 가 관련 작업을 할 때 <b>스스로 판단해서</b> 불러 씁니다. (슬래시 명령은 내가 호출, 스킬은 Claude 가 필요할 때 호출)</p>",
        code: { lang: "md", file: ".claude/skills/release-notes/SKILL.md", text: "---\nname: release-notes\ndescription: 릴리스 노트를 작성할 때 사용. git 태그 사이의 변경을 사용자 관점으로 요약한다.\n---\n\n# 릴리스 노트 작성법\n1. git describe --tags 로 직전 태그를 찾는다\n2. git log <직전태그>..HEAD 로 변경 목록을 모은다\n3. '새 기능 / 개선 / 버그 수정' 세 분류로 정리한다\n4. 내부 리팩토링은 제외하고, 사용자가 체감하는 변화만 쓴다" },
      },
      {
        h: "③ 헤드리스 모드: claude -p",
        body: "<p><code>-p</code>(print) 옵션은 대화창 없이 <b>한 번 실행하고 결과만 출력</b>합니다. 셸 스크립트, cron, CI 에서 Claude 를 부품처럼 쓸 수 있습니다.</p>",
        code: { lang: "bash", file: "터미널 / 스크립트", text: "# 파이프로 입력 전달\ncat error.log | claude -p \"이 에러 로그의 원인을 3줄로 요약해 줘\"\n\n# JSON 으로 결과 받기 (비용·소요시간 포함)\nclaude -p \"src 폴더의 TODO 주석을 목록으로\" --output-format json\n\n# 허용 도구와 최대 반복 횟수 제한\nclaude -p \"린트 에러를 고쳐 줘\" --allowedTools \"Edit,Bash(npm run lint:*)\" --max-turns 5\n\n# 여러 파일 일괄 처리\nfor f in src/*.js; do\n  claude -p \"$f 에 JSDoc 이 없는 함수에 주석을 추가해 줘\" --allowedTools \"Read,Edit\"\ndone" },
        tip: "<b>💡 헤드리스 = 무인 실행</b> 사람이 승인 버튼을 누를 수 없으므로, <code>--allowedTools</code> 로 꼭 필요한 도구만 허용하는 것이 안전합니다.",
      },
    ],
    viz: {
      type: "layers", title: "자동화 도구 3종 비교",
      layers: [
        { i: "⌨️", n: "슬래시 명령", chips: [".claude/commands/*.md", "$ARGUMENTS", "내가 호출"], d: "자주 쓰는 프롬프트를 버튼으로" },
        { i: "📘", n: "스킬", chips: [".claude/skills/*/SKILL.md", "Claude 가 자동 선택"], d: "전문 작업 매뉴얼·스크립트 묶음" },
        { i: "🤖", n: "헤드리스", chips: ["claude -p", "--output-format json", "cron / CI"], d: "사람 없이 스크립트에서 실행" },
        { i: "🪝", n: "훅 (Day 13)", chips: ["이벤트 기반", "결정적 실행"], d: "특정 순간에 항상 실행" },
      ],
    },
    practice: [
      {
        type: "editor", label: "✍️ 명령 작성", title: "/review-pr 명령 만들기",
        intro: "PR 번호를 받아 리뷰하는 슬래시 명령을 만들어 보세요.",
        file: ".claude/commands/review-pr.md",
        starter: "---\ndescription: \n---\n\n",
        checks: [
          { label: "frontmatter(---) 안에 description 이 채워져 있다", re: /^---[\s\S]*description:\s*\S+[\s\S]*?---/ },
          { label: "$ARGUMENTS (또는 $1) 로 PR 번호를 받는다", re: /\$(ARGUMENTS|1)\b/ },
          { label: "gh pr 명령으로 PR 을 읽는다", re: /gh pr (view|diff)/ },
          { label: "리뷰 관점이 2개 이상 있다", fn: (v) => ["보안", "성능", "버그", "가독", "테스트"].filter((k) => v.includes(k)).length >= 2 },
          { label: "단계가 번호 목록(1. 2. 3.)으로 정리되어 있다", fn: (v) => (v.match(/^\s*\d+\.\s/gm) || []).length >= 3 },
        ],
        solution: "---\ndescription: PR 번호를 받아 변경사항을 리뷰한다\nallowed-tools: Bash(gh pr view:*), Bash(gh pr diff:*), Read\n---\n\nPR #$ARGUMENTS 를 리뷰해 줘.\n\n1. gh pr view $ARGUMENTS 로 PR 설명을 읽는다\n2. gh pr diff $ARGUMENTS 로 변경 내용을 확인한다\n3. 버그, 보안, 성능, 테스트 누락 관점으로 검토한다\n4. 심각도(높음/중간/낮음)별로 정리해 보고한다",
      },
      {
        type: "terminal", title: "헤드리스 모드 체험",
        files: ["error.log", "src/", "package.json"],
        cat: { "error.log": "TypeError: Cannot read properties of undefined (reading 'map')\n    at renderList (src/List.jsx:12)" },
        tasks: [
          { goal: "에러 로그 내용 보기", hint: "cat error.log", match: /^cat error\.log$/, out: "TypeError: Cannot read properties of undefined (reading 'map')\n    at renderList (src/List.jsx:12)" },
          { goal: "파이프로 로그를 Claude 에게 넘겨 원인 요약 받기", hint: "cat error.log | claude -p \"원인을 요약해줘\"", match: /^cat error\.log \| claude -p .+/, stream: true, out: "원인: List.jsx 12번째 줄에서 items 가 아직 로드되지 않아 undefined 인데 .map() 을 호출했습니다.\n해결: items 의 기본값을 [] 로 두거나 (items ?? []).map(...) 을 사용하세요." },
          { goal: "JSON 형식으로 결과 받기", hint: "claude -p \"TODO 주석 목록 보여줘\" --output-format json", match: /^claude -p .+ --output-format json$/, stream: true, out: "{\n  \"type\": \"result\",\n  \"subtype\": \"success\",\n  \"result\": \"TODO 3개: src/api.js:8, src/List.jsx:3, src/util.js:20\",\n  \"num_turns\": 2,\n  \"duration_ms\": 8120,\n  \"total_cost_usd\": 0.012\n}\n{dim:→ 스크립트에서 jq 등으로 result 값을 꺼내 쓸 수 있습니다}" },
          { goal: "도구를 제한해서 실행 (--allowedTools)", hint: "claude -p \"린트 에러 고쳐줘\" --allowedTools \"Edit,Bash(npm run lint:*)\"", match: /^claude -p .+ --allowedTools .+/, stream: true, out: "{tool:⏺ Bash}(npm run lint)\n{tool:⏺ Edit}(src/api.js)\n{tool:⏺ Bash}(npm run lint)\n  {ok:⎿ 0 problems}\n린트 에러 4개를 수정했습니다." },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "mkdir -p .claude/commands\n# 위 예제로 .claude/commands/review-pr.md 작성 후\nclaude\n> /review-pr 1\n\n# 헤드리스\ngit diff | claude -p \"이 변경으로 커밋 메시지 한 줄 추천해 줘\"" },
    },
    mistakes: [
      ["헤드리스에서 모든 도구 허용", "<code>--allowedTools</code> 로 필요한 것만"],
      ["매번 같은 긴 프롬프트 복붙", "<code>.claude/commands/</code> 에 저장해서 팀과 공유"],
    ],
    checklist: ["슬래시 명령을 하나 만들었다", "스킬과 슬래시 명령의 차이를 안다", "claude -p 로 파이프 입력을 처리해 보았다"],
  },

  /* ----------------------------------------------------- Day 16 */
  {
    id: 16, week: 3, icon: "💬", time: "50분", level: 2,
    title: "슬랙 통합",
    subtitle: "Slack 알림과 제어를 통합합니다 — 작업 완료·승인 대기를 슬랙으로 받고, 슬랙에서 작업을 요청합니다.",
    goals: ["슬랙 연동 방식 3가지를 구분한다", "훅 + Incoming Webhook 으로 알림을 보낸다", "비밀값(Webhook URL)을 안전하게 다룬다"],
    analogy: { i: "📟", t: "식당의 <b>진동벨</b>과 같습니다. 음식(작업)이 준비되면 벨이 울리니 카운터 앞에서 기다릴 필요가 없죠. Claude 가 긴 작업을 하는 동안 다른 일을 하다가, 슬랙 알림이 오면 확인하면 됩니다." },
    sections: [
      {
        h: "연동 방식 3가지",
        body: `<div class="tbl-wrap"><table class="tbl">
        <tr><th>방식</th><th>방향</th><th>예시</th></tr>
        <tr><td><b>① 훅 → Webhook</b></td><td>Claude → 슬랙 (알림)</td><td>작업 완료, 승인 대기 알림</td></tr>
        <tr><td><b>② Slack MCP 서버</b></td><td>Claude ↔ 슬랙 (읽기/쓰기)</td><td>\"#bug 채널 최근 신고 요약해 줘\"</td></tr>
        <tr><td><b>③ 슬랙에서 Claude 호출</b></td><td>슬랙 → Claude (요청)</td><td>Claude 슬랙 앱에서 멘션으로 코딩 작업 요청, 또는 직접 만든 봇이 <code>claude -p</code> 실행</td></tr></table></div>`,
      },
      {
        h: "① 훅으로 슬랙 알림 보내기",
        body: "<p>먼저 슬랙에서 <b>Incoming Webhook</b> 을 만들어 URL 을 받습니다 (슬랙 앱 설정 → Incoming Webhooks). 이 URL 은 <b>비밀번호와 같으므로</b> 환경 변수로 보관합니다.</p>",
        code: [
          { lang: "bash", file: "환경 변수 설정 (~/.zshrc 또는 ~/.bashrc)", text: "export SLACK_WEBHOOK_URL=\"https://hooks.slack.com/services/XXX/YYY/ZZZ\"" },
          { lang: "json", file: ".claude/settings.json", text: "{\n  \"hooks\": {\n    \"Stop\": [\n      {\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"curl -s -X POST -H 'Content-type: application/json' --data '{\\\"text\\\":\\\"✅ Claude 작업 완료\\\"}' \\\"$SLACK_WEBHOOK_URL\\\"\"\n          }\n        ]\n      }\n    ],\n    \"Notification\": [\n      {\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"curl -s -X POST -H 'Content-type: application/json' --data '{\\\"text\\\":\\\"⏳ Claude 가 승인을 기다립니다\\\"}' \\\"$SLACK_WEBHOOK_URL\\\"\"\n          }\n        ]\n      }\n    ]\n  }\n}" },
        ],
        tip: "<b>💡 스크립트로 분리하면 깔끔</b> JSON 안의 따옴표 이스케이프가 복잡하면 <code>.claude/hooks/slack.sh</code> 스크립트로 만들고 command 에는 스크립트 경로만 적으세요.",
      },
      {
        h: "② / ③ 슬랙에서 읽고 요청하기",
        body: "<p>Slack MCP 서버를 연결하면 Claude 가 채널 메시지를 읽거나 게시할 수 있습니다. 또 Claude 슬랙 앱을 워크스페이스에 설치하면 슬랙 스레드에서 Claude 를 멘션해 작업을 맡길 수 있습니다 (조직 관리자 설정 필요).</p>",
        code: { lang: "bash", file: "슬랙 봇 서버에서 헤드리스 호출 (개념 예시)", text: "# 슬랙 메시지 → 봇 서버 → claude -p → 결과를 스레드에 답글\nclaude -p \"$SLACK_MESSAGE_TEXT\" \\\n  --allowedTools \"Read,Grep\" \\\n  --output-format json" },
      },
    ],
    viz: {
      type: "sequence", title: "작업 완료 → 슬랙 알림 흐름",
      actors: [{ t: "Claude", i: "✻", center: true }, { t: "Stop 훅", i: "🪝" }, { t: "Slack", i: "💬" }, { t: "나", i: "📱" }],
      msgs: [
        { from: "Claude", to: "Claude", t: "긴 작업 수행 (테스트 수정 등)", x: "나는 다른 일을 하고 있습니다." },
        { from: "Claude", to: "Stop 훅", t: "응답 완료 → Stop 이벤트", x: "Claude 가 응답을 마치면 Stop 훅이 실행됩니다." },
        { from: "Stop 훅", to: "Slack", t: "curl POST $SLACK_WEBHOOK_URL", x: "환경 변수에 저장된 Webhook URL 로 메시지를 보냅니다." },
        { from: "Slack", to: "나", t: "\"✅ Claude 작업 완료\"", x: "휴대폰·PC 로 알림이 옵니다." },
        { from: "나", to: "Claude", t: "결과 확인 / 다음 지시", x: "돌아와서 결과를 검토합니다." },
      ],
    },
    practice: [
      {
        type: "editor", label: "🧩 JSON 작성", title: "승인 대기 알림 훅 만들기",
        intro: "Claude 가 승인을 기다릴 때(Notification) 슬랙으로 알림을 보내는 훅을 작성하세요. Webhook URL 은 반드시 환경 변수 $SLACK_WEBHOOK_URL 로!",
        file: ".claude/settings.json",
        starter: "{\n  \"hooks\": {\n\n  }\n}",
        checks: [
          { label: "올바른 JSON", fn: (v) => { JSON.parse(v); return true; } },
          { label: "Notification 이벤트를 사용", fn: (v) => Array.isArray(JSON.parse(v).hooks.Notification) },
          { label: "command 에서 curl 로 POST 요청", fn: (v) => JSON.parse(v).hooks.Notification.some((h) => (h.hooks || []).some((x) => /curl/.test(x.command) && /POST/.test(x.command))) },
          { label: "$SLACK_WEBHOOK_URL 환경 변수를 사용", re: /\$\{?SLACK_WEBHOOK_URL\}?/ },
          { label: "Webhook URL 을 직접 적지 않았다", fn: (v) => !/hooks\.slack\.com/.test(v) },
        ],
        solution: "{\n  \"hooks\": {\n    \"Notification\": [\n      {\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"curl -s -X POST -H 'Content-type: application/json' --data '{\\\"text\\\":\\\"⏳ Claude 가 승인을 기다립니다\\\"}' \\\"$SLACK_WEBHOOK_URL\\\"\"\n          }\n        ]\n      }\n    ]\n  }\n}",
      },
      {
        type: "quiz", title: "슬랙 연동 퀴즈",
        questions: [
          { q: "\"#장애 채널의 오늘 메시지를 요약해 줘\" 를 하려면?", options: ["Stop 훅", "Slack MCP 서버 연결", "CLAUDE.md 수정", "/compact"], answer: 1, explain: "슬랙 데이터를 <b>읽으려면</b> MCP 서버가 필요합니다. 훅+Webhook 은 보내기 전용." },
          { q: "Slack Webhook URL 을 settings.json 에 그대로 적어 커밋하면?", options: ["안전하다", "누구나 우리 채널에 메시지를 보낼 수 있게 된다", "속도가 빨라진다", "슬랙이 자동 차단한다"], answer: 1, explain: "Webhook URL 은 비밀값입니다. 환경 변수나 비밀 저장소로." },
          { q: "작업이 끝났을 때 알림을 보내기 가장 적합한 훅 이벤트는?", options: ["PreToolUse", "Stop", "SessionStart", "UserPromptSubmit"], answer: 1 },
        ],
      },
    ],
    real: {
      body: "<p>슬랙 워크스페이스가 있다면 테스트 채널에 Incoming Webhook 을 만들고 아래로 먼저 확인하세요.</p>",
      code: { lang: "bash", file: "내 터미널", text: "export SLACK_WEBHOOK_URL=\"(발급받은 URL)\"\ncurl -X POST -H 'Content-type: application/json' --data '{\"text\":\"테스트\"}' \"$SLACK_WEBHOOK_URL\"\n# 메시지가 오면 /hooks 로 Stop 훅에 등록" },
    },
    mistakes: [
      ["Webhook URL 하드코딩 후 git 커밋", "환경 변수 + .gitignore, 노출되면 즉시 재발급"],
      ["모든 PostToolUse 마다 슬랙 알림", "Stop·Notification 처럼 의미 있는 순간에만"],
    ],
    checklist: ["슬랙 연동 3가지 방식을 구분할 수 있다", "Webhook URL 을 환경 변수로 다룬다", "Stop/Notification 훅으로 알림을 설정했다"],
  },

  /* ----------------------------------------------------- Day 17 */
  {
    id: 17, week: 3, icon: "🚢", time: "60분", level: 3,
    title: "배포 프로세스 — CI/CD",
    subtitle: "GitHub Actions 에 Claude 를 넣어 PR 자동 리뷰, @claude 멘션 작업, 배포 파이프라인을 자동화합니다.",
    goals: ["CI/CD 의 개념을 이해한다", "claude-code-action 워크플로우를 구성한다", "시크릿과 권한을 안전하게 설정한다"],
    analogy: { i: "🏭", t: "공장의 <b>컨베이어 벨트</b>입니다. 코드를 올리면(push) 벨트를 따라 <b>검사(테스트) → 품질 검수(리뷰) → 포장(빌드) → 출고(배포)</b>가 자동으로 진행됩니다. Claude 는 이 벨트 위의 꼼꼼한 검수원 역할을 합니다." },
    sections: [
      {
        h: "CI/CD 란?",
        body: "<p><b>CI(지속적 통합)</b>: 코드를 올릴 때마다 자동으로 빌드·테스트. <b>CD(지속적 배포)</b>: 검증된 코드를 자동으로 서버에 배포. GitHub 에서는 <b>GitHub Actions</b> 가 이 일을 하며, <code>.github/workflows/*.yml</code> 파일로 정의합니다.</p>",
      },
      {
        h: "가장 쉬운 시작: /install-github-app",
        body: "<p>Claude Code 안에서 <code>/install-github-app</code> 을 실행하면 GitHub 앱 설치, API 키 시크릿 등록, 워크플로우 파일 생성을 안내해 줍니다. 설정 후에는 이슈나 PR 댓글에 <code>@claude</code> 를 멘션해 작업을 요청할 수 있습니다.</p>",
        code: { lang: "md", file: "GitHub PR 댓글 예시", text: "@claude 이 PR 의 에러 처리 부분을 리뷰하고, 빠진 테스트를 추가해 줘" },
      },
      {
        h: "워크플로우 직접 작성하기",
        code: [
          { lang: "yaml", file: ".github/workflows/claude.yml — @claude 멘션 응답", text: "name: Claude\non:\n  issue_comment:\n    types: [created]\n  pull_request_review_comment:\n    types: [created]\n\njobs:\n  claude:\n    if: contains(github.event.comment.body, '@claude')\n    runs-on: ubuntu-latest\n    permissions:\n      contents: write\n      pull-requests: write\n      issues: write\n    steps:\n      - uses: actions/checkout@v4\n      - uses: anthropics/claude-code-action@v1\n        with:\n          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}" },
          { lang: "yaml", file: ".github/workflows/claude-review.yml — PR 자동 리뷰", text: "name: Claude PR Review\non:\n  pull_request:\n    types: [opened, synchronize]\n\njobs:\n  review:\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n      pull-requests: write\n    steps:\n      - uses: actions/checkout@v4\n      - uses: anthropics/claude-code-action@v1\n        with:\n          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}\n          prompt: |\n            이 PR 을 버그, 보안, 성능 관점으로 리뷰하고\n            심각도별로 정리해 PR 코멘트로 남겨 줘." },
        ],
        tip: "<b>🔐 시크릿</b> API 키는 저장소 Settings → Secrets and variables → Actions 에 <code>ANTHROPIC_API_KEY</code> 로 등록하고, 워크플로우에서는 <code>${{ secrets.ANTHROPIC_API_KEY }}</code> 로만 참조합니다. <code>permissions</code> 는 필요한 만큼만 주세요.",
        tipType: "warn",
      },
    ],
    viz: {
      type: "sequence", title: "PR 이 올라가면 일어나는 일",
      actors: [{ t: "개발자", i: "🙋" }, { t: "GitHub", i: "🐙" }, { t: "Actions", i: "⚙️" }, { t: "Claude", i: "✻", center: true }],
      msgs: [
        { from: "개발자", to: "GitHub", t: "git push → PR 생성", x: "PR 이 열리면 <code>pull_request</code> 이벤트가 발생합니다." },
        { from: "GitHub", to: "Actions", t: "워크플로우 시작", x: ".github/workflows 의 조건에 맞는 워크플로우가 실행됩니다." },
        { from: "Actions", to: "Actions", t: "checkout · 테스트 실행", x: "코드를 내려받고 테스트·빌드 (CI)." },
        { from: "Actions", to: "Claude", t: "claude-code-action 실행", x: "시크릿의 API 키로 Claude 를 호출하고 prompt 를 전달." },
        { from: "Claude", to: "GitHub", t: "리뷰 코멘트 작성", x: "변경을 분석해 PR 에 리뷰를 남깁니다." },
        { from: "개발자", to: "GitHub", t: "@claude 수정해 줘", x: "댓글로 추가 작업을 요청하면 Claude 가 커밋을 추가합니다." },
        { from: "GitHub", to: "개발자", t: "머지 → 배포 (CD)", x: "사람이 최종 승인·머지하면 배포 워크플로우가 실행됩니다." },
      ],
    },
    practice: [
      {
        type: "editor", label: "🧩 YAML 작성", title: "PR 자동 리뷰 워크플로우 완성하기",
        intro: "PR 이 열리거나 업데이트될 때 Claude 가 리뷰하는 워크플로우를 완성하세요.",
        file: ".github/workflows/claude-review.yml",
        starter: "name: Claude PR Review\non:\n  \njobs:\n  review:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n",
        checks: [
          { label: "pull_request 이벤트에 반응한다", re: /on:\s*\n\s+pull_request:/ },
          { label: "opened 와 synchronize 타입을 지정", re: /types:\s*\[?.*opened.*synchronize|types:\s*\[?.*synchronize.*opened/ },
          { label: "permissions 에 pull-requests: write", re: /pull-requests:\s*write/ },
          { label: "anthropics/claude-code-action 을 사용", re: /uses:\s*anthropics\/claude-code-action@/ },
          { label: "API 키는 secrets 로 참조 (직접 기재 금지)", fn: (v) => /\$\{\{\s*secrets\.ANTHROPIC_API_KEY\s*\}\}/.test(v) && !/sk-ant-/.test(v) },
          { label: "prompt 로 리뷰 지시를 전달", re: /prompt:\s*\|?\s*\n?\s*\S+/ },
        ],
        solution: "name: Claude PR Review\non:\n  pull_request:\n    types: [opened, synchronize]\n\njobs:\n  review:\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n      pull-requests: write\n    steps:\n      - uses: actions/checkout@v4\n      - uses: anthropics/claude-code-action@v1\n        with:\n          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}\n          prompt: |\n            이 PR 을 버그, 보안, 성능 관점으로 리뷰하고\n            심각도별로 정리해 코멘트로 남겨 줘.",
      },
      {
        type: "order", title: "CI/CD 파이프라인 순서",
        items: ["개발자가 브랜치에 push", "PR 생성", "Actions 가 테스트 실행", "Claude 가 PR 리뷰 코멘트 작성", "개발자가 리뷰 반영", "사람이 최종 승인 후 머지", "배포 워크플로우 실행"],
        explain: "Claude 는 검수원이고, 최종 머지 결정은 사람이 합니다.",
      },
    ],
    real: {
      code: { lang: "bash", file: "Claude Code (GitHub 저장소 폴더에서)", text: "> /install-github-app\n# 안내에 따라 앱 설치 → 시크릿 등록 → 워크플로우 PR 생성\n# 이후 아무 이슈에 댓글: @claude 이 이슈 원인을 조사해 줘" },
    },
    mistakes: [
      ["API 키를 YAML 에 직접 작성", "<code>secrets.ANTHROPIC_API_KEY</code> 로만 참조"],
      ["Claude 리뷰 통과 = 자동 머지", "최종 머지는 사람이, Claude 는 보조 검수원"],
    ],
    checklist: ["CI 와 CD 를 구분할 수 있다", "claude-code-action 워크플로우를 이해했다", "시크릿 사용법을 안다", "@claude 멘션 흐름을 설명할 수 있다"],
  },

  /* ----------------------------------------------------- Day 18 */
  {
    id: 18, week: 3, icon: "🧬", time: "60분", level: 3,
    title: "시스템 연결 — Agent SDK",
    subtitle: "Claude Agent SDK 로 Claude Code 의 에이전트 엔진을 내 프로그램에 넣어, 소프트웨어와 도구를 원활하게 통합합니다.",
    goals: ["Agent SDK 가 무엇인지 안다", "TypeScript/Python 으로 query() 를 호출한다", "도구 권한·시스템 프롬프트를 설정한다"],
    analogy: { i: "🚗", t: "Claude Code 가 <b>완성차</b>라면, Agent SDK 는 그 <b>엔진</b>입니다. 엔진만 가져와 트럭(사내 업무 봇), 버스(고객 지원 에이전트) 등 내가 원하는 차를 만들 수 있습니다." },
    sections: [
      {
        h: "Agent SDK 란?",
        body: "<p>Claude Code 를 움직이는 에이전트 루프(도구 사용, 컨텍스트 관리, 권한 처리)를 <b>라이브러리</b>로 제공하는 것입니다. 파일 읽기·편집·명령 실행·웹 검색 같은 도구를 그대로 쓰면서, 내 서비스에 맞는 에이전트를 코드로 만듭니다.</p>",
        code: { lang: "bash", file: "설치", text: "# TypeScript / JavaScript\nnpm install @anthropic-ai/claude-agent-sdk\n\n# Python\npip install claude-agent-sdk\n\n# API 키 (Console 에서 발급)\nexport ANTHROPIC_API_KEY=\"(내 API 키)\"" },
      },
      {
        h: "첫 에이전트 (TypeScript)",
        code: { lang: "ts", file: "agent.ts", text: "import { query } from \"@anthropic-ai/claude-agent-sdk\";\n\nfor await (const message of query({\n  prompt: \"src 폴더에서 TODO 주석을 찾아 목록으로 정리해 줘\",\n  options: {\n    systemPrompt: \"너는 코드베이스 정리 도우미다. 한국어로 답한다.\",\n    allowedTools: [\"Read\", \"Grep\", \"Glob\"],   // 읽기 전용 에이전트\n    maxTurns: 10,\n  },\n})) {\n  if (message.type === \"result\") {\n    console.log(message.result);\n  }\n}" },
        after: "<p><code>query()</code> 는 에이전트가 일하는 동안 메시지를 <b>스트림</b>으로 돌려줍니다. 마지막 <code>result</code> 메시지에 최종 답과 비용 정보가 담깁니다.</p>",
      },
      {
        h: "같은 에이전트 (Python)",
        code: { lang: "python", file: "agent.py", text: "import asyncio\nfrom claude_agent_sdk import query, ClaudeAgentOptions\n\nasync def main():\n    options = ClaudeAgentOptions(\n        system_prompt=\"너는 코드베이스 정리 도우미다. 한국어로 답한다.\",\n        allowed_tools=[\"Read\", \"Grep\", \"Glob\"],\n        max_turns=10,\n    )\n    async for message in query(prompt=\"TODO 주석 목록을 정리해 줘\", options=options):\n        print(message)\n\nasyncio.run(main())" },
        tip: "<b>💡 확장 포인트</b> SDK 에서도 MCP 서버 연결, 직접 만든 함수를 도구로 등록(커스텀 도구), 훅, 서브에이전트, 권한 모드 설정을 모두 쓸 수 있습니다. 3~4주차에 배운 개념이 그대로 코드 옵션이 됩니다.",
      },
    ],
    viz: {
      type: "layers", title: "Agent SDK 로 만든 시스템의 구조",
      layers: [
        { i: "🧑‍💻", n: "내 애플리케이션", chips: ["웹 서버", "슬랙 봇", "배치 작업"], d: "사용자 요청을 받는 곳" },
        { i: "🧬", n: "Agent SDK", chips: ["query()", "systemPrompt", "allowedTools", "maxTurns"], d: "에이전트 루프 엔진" },
        { i: "🛠️", n: "도구", chips: ["Read/Edit/Bash", "MCP 서버", "커스텀 도구"], d: "에이전트가 실제로 하는 일" },
        { i: "🛡️", n: "제어", chips: ["권한 모드", "훅", "로그"], d: "안전장치" },
        { i: "☁️", n: "Claude 모델", chips: ["Claude API"], d: "판단과 생성" },
      ],
    },
    practice: [
      {
        type: "editor", label: "🧩 코드 작성", title: "버그 리포트 분석 에이전트 만들기",
        intro: "SDK 로 '로그 분석 에이전트'를 완성하세요: 읽기 전용 도구만, 최대 5턴, 시스템 프롬프트 지정, 결과 출력.",
        file: "log-agent.ts",
        starter: "import { query } from \"@anthropic-ai/claude-agent-sdk\";\n\nfor await (const message of query({\n  prompt: \"logs/error.log 를 분석해서 원인과 해결책을 알려줘\",\n  options: {\n    \n  },\n})) {\n  \n}",
        checks: [
          { label: "SDK 에서 query 를 import", re: /import\s*\{\s*query\s*\}\s*from\s*["']@anthropic-ai\/claude-agent-sdk["']/ },
          { label: "systemPrompt 를 지정", re: /systemPrompt\s*:\s*["'`]\S/ },
          { label: "allowedTools 에 Read 포함", re: /allowedTools\s*:\s*\[[^\]]*["']Read["']/ },
          { label: "Edit/Write/Bash 는 허용하지 않음 (읽기 전용)", fn: (v) => { const m = v.match(/allowedTools\s*:\s*\[([^\]]*)\]/); return m && !/Edit|Write|Bash/.test(m[1]); } },
          { label: "maxTurns: 5", re: /maxTurns\s*:\s*5\b/ },
          { label: "result 메시지를 출력", re: /type\s*===\s*["']result["'][\s\S]*console\.log/ },
        ],
        solution: "import { query } from \"@anthropic-ai/claude-agent-sdk\";\n\nfor await (const message of query({\n  prompt: \"logs/error.log 를 분석해서 원인과 해결책을 알려줘\",\n  options: {\n    systemPrompt: \"너는 서버 로그 분석 전문가다. 원인, 근거, 해결책 순서로 한국어로 답한다.\",\n    allowedTools: [\"Read\", \"Grep\", \"Glob\"],\n    maxTurns: 5,\n  },\n})) {\n  if (message.type === \"result\") {\n    console.log(message.result);\n  }\n}",
      },
      {
        type: "quiz", title: "SDK 퀴즈",
        questions: [
          { q: "Claude Code CLI 와 Agent SDK 의 관계는?", options: ["전혀 관계 없다", "같은 에이전트 엔진을 CLI 대신 코드에서 쓰는 것", "SDK 는 채팅 전용", "SDK 는 파이썬만 지원"], answer: 1 },
          { q: "고객 문의에 답하는 에이전트에 가장 먼저 해야 할 안전 설정은?", options: ["모든 도구 허용", "allowedTools 로 필요한 도구만 허용", "maxTurns 무제한", "시스템 프롬프트 생략"], answer: 1, explain: "최소 권한 원칙. 필요 없는 Bash·Edit 는 막습니다." },
          { q: "SDK 에서 API 키를 넣는 올바른 방법은?", options: ["코드에 문자열로", "환경 변수 ANTHROPIC_API_KEY", "README 에 기록", "URL 쿼리 파라미터"], answer: 1 },
        ],
      },
    ],
    real: {
      code: { lang: "bash", file: "내 터미널", text: "mkdir my-agent && cd my-agent\nnpm init -y && npm i @anthropic-ai/claude-agent-sdk tsx\nexport ANTHROPIC_API_KEY=\"(내 키)\"\n# 위 agent.ts 를 저장한 뒤\nnpx tsx agent.ts" },
    },
    mistakes: [
      ["실서비스 에이전트에 Bash 무제한 허용", "필요한 도구만, 위험 작업은 훅으로 차단"],
      ["maxTurns 없이 실행", "상한을 둬서 무한 반복·비용 폭주 방지"],
    ],
    checklist: ["SDK 를 설치했다", "query() 의 주요 옵션 4개를 안다", "읽기 전용 에이전트를 만들어 보았다", "3주차 완주! 🎉"],
  },
];
