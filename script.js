const STORAGE_KEY = "toeic_practice_data_v3";

const PART_SPECS = {
  "Part 1": { section: "listening", count: 6, type: "photographs" },
  "Part 2": { section: "listening", count: 25, type: "question-response" },
  "Part 3": { section: "listening", count: 39, type: "conversations" },
  "Part 4": { section: "listening", count: 30, type: "talks" },
  "Part 5": { section: "reading", count: 30, type: "incomplete-sentences" },
  "Part 6": { section: "reading", count: 16, type: "text-completion" },
  "Part 7": { section: "reading", count: 54, type: "reading-comprehension" }
};

function q({ id, section, part, type, question, options, answer, explanation, grammarPoint = "", passage = "", groupId = "", tags = [] }) {
  return { id, section, part, type, question, passage, audioUrl: "", options, answer, explanation, grammarPoint, difficulty: "550-750", tags, groupId };
}

const sampleQuestions = [];
const vocabQuestions = [
  { id: "V-1", question: "procurement 最接近哪個中文意思？", options: ["採購", "申訴", "分紅", "裁員"], answer: "採購", explanation: "procurement 指企業採購流程。" },
  { id: "V-2", question: "deadline 最接近哪個中文意思？", options: ["截止日", "午休", "報價單", "折扣"], answer: "截止日", explanation: "deadline 表示最後期限。" },
  { id: "V-3", question: "invoice 最接近哪個中文意思？", options: ["發票", "履歷", "合約", "樣品"], answer: "發票", explanation: "invoice 是請款或交易用的發票。" },
  { id: "V-4", question: "reschedule 最接近哪個中文意思？", options: ["改期", "取消", "確認", "轉帳"], answer: "改期", explanation: "reschedule 是重新安排時間。" },
  { id: "V-5", question: "maintenance 最接近哪個中文意思？", options: ["維護", "行銷", "出貨", "面試"], answer: "維護", explanation: "maintenance 常見於設備或系統維護。" }
];
const clozeQuestions = [
  { id: "C-1", question: "Please submit your report ____ Friday.", options: ["by", "from", "among", "during"], answer: "by", explanation: "by + 時間表示在截止時間前。" },
  { id: "C-2", question: "The manager asked us ____ the figures again.", options: ["to check", "checked", "checking", "checks"], answer: "to check", explanation: "ask 人 to V。" },
  { id: "C-3", question: "This machine should ____ every month.", options: ["be inspected", "inspect", "inspected", "be inspecting"], answer: "be inspected", explanation: "機器是被檢查，用被動語態。" },
  { id: "C-4", question: "We will start the meeting ____ everyone arrives.", options: ["once", "unless", "despite", "while"], answer: "once", explanation: "once 表示一旦、當…就…。" },
  { id: "C-5", question: "The new branch is ____ than the old one.", options: ["larger", "largest", "large", "more large"], answer: "larger", explanation: "兩者比較用比較級 larger。" }
];
const sentenceQuestions = [
  { id: "S-1", question: "請選出正確句子。", options: ["She has worked here for five years.", "She have worked here for five years.", "She worked here since five years.", "She is work here for five years."], answer: "She has worked here for five years.", explanation: "for five years 常搭配現在完成式。" },
  { id: "S-2", question: "請選出最自然的商務句。", options: ["Could you send me the updated schedule?", "Could you sends me updated schedule?", "Could you sent me the update schedule?", "Could you sending me the updated schedule?"], answer: "Could you send me the updated schedule?", explanation: "情態動詞後接原形動詞 send。" },
  { id: "S-3", question: "請選出正確句子。", options: ["The documents were delivered this morning.", "The documents was delivered this morning.", "The documents were deliver this morning.", "The documents delivered were this morning."], answer: "The documents were delivered this morning.", explanation: "複數主詞 documents 搭配 were delivered。" },
  { id: "S-4", question: "請選出最自然句子。", options: ["If you have questions, contact the help desk.", "If you have question, contact to the help desk.", "If you had questions, contact the help desk now yesterday.", "If you have questions, contact with the help desk to."], answer: "If you have questions, contact the help desk.", explanation: "contact 作動詞可直接接受詞。" },
  { id: "S-5", question: "請選出正確句子。", options: ["Our team is responsible for preparing the proposal.", "Our team are responsible for prepare the proposal.", "Our team is responsible to preparing proposal.", "Our team responsible for preparing the proposal is."], answer: "Our team is responsible for preparing the proposal.", explanation: "be responsible for + V-ing。" }
];

const p1 = [
  ["L1-1", "A woman is adjusting a projector in a meeting room.", ["A woman is adjusting a projector in a meeting room.", "A chef is serving soup at a restaurant.", "Two engineers are painting a bridge.", "A clerk is closing the store early."], "畫面有投影機與會議室場景，主詞與動作吻合。"],
  ["L1-2", "Several passengers are lining up at a boarding gate.", ["Several passengers are lining up at a boarding gate.", "A mechanic is repairing a bicycle tire.", "Customers are dancing near a stage.", "A manager is writing on a whiteboard."], "可見登機門與排隊旅客，為機場情境。"],
  ["L1-3", "A technician is replacing a ceiling light.", ["A technician is replacing a ceiling light.", "Employees are unloading fruit at a market.", "A couple is checking into a hotel.", "A child is feeding ducks in a park."], "動作是更換燈具，且在室內維修環境。"],
  ["L1-4", "Workers are stacking boxes in a warehouse.", ["Workers are stacking boxes in a warehouse.", "Students are taking a chemistry exam.", "A pilot is greeting tourists.", "Office staff are decorating a cake."], "關鍵是倉儲背景與堆箱動作。"],
  ["L1-5", "A barista is handing a drink to a customer.", ["A barista is handing a drink to a customer.", "A nurse is checking a patient's pulse.", "A driver is washing a bus.", "A lawyer is signing a contract."], "咖啡吧台與遞飲料動作最符合。"],
  ["L1-6", "A cyclist is parking a bike beside an office building.", ["A cyclist is parking a bike beside an office building.", "A musician is tuning a violin.", "Shoppers are trying on hats.", "A gardener is trimming roses."], "可見單車停放與辦公大樓外觀。"]
];
p1.forEach(([id, ans, options, exp]) => sampleQuestions.push(q({ id, section: "listening", part: "Part 1", type: "photographs", question: "What is most likely happening in the picture?", options, answer: ans, explanation: `${exp} 中文解析：其餘選項與場景人物或動作不符。` })));

const p2Seeds = [
  ["Who approved the marketing budget?", ["Ms. Rivera in accounting approved it this morning.", "At the downtown branch.", "By next Tuesday.", "It costs around five thousand dollars."], "Ms. Rivera in accounting approved it this morning.", "Who 問人，需回答人物身分。"],
  ["When will the maintenance team arrive?", ["They are scheduled to arrive at 2:30 this afternoon.", "Near the loading dock.", "Because the elevator is noisy.", "Mr. Chen handled it."], "They are scheduled to arrive at 2:30 this afternoon.", "When 問時間。"],
  ["Where should we hold the orientation session?", ["In Conference Room B on the second floor.", "It begins after lunch.", "Yes, we should.", "The trainer from HR."], "In Conference Room B on the second floor.", "Where 問地點。"],
  ["Why was the shipment delayed?", ["A customs inspection took longer than expected.", "At gate number four.", "Tomorrow morning.", "Ms. Park signed it."], "A customs inspection took longer than expected.", "Why 問原因。"],
  ["How can I reset my account password?", ["Click 'Forgot Password' and follow the email link.", "At 8:00 a.m.", "The IT manager.", "On the third shelf."], "Click 'Forgot Password' and follow the email link.", "How 問方法。"],
  ["Would you like me to print the handouts?", ["Yes, please print thirty copies for the workshop.", "At the reception desk.", "I printed them yesterday at noon.", "Because the ink is blue."], "Yes, please print thirty copies for the workshop.", "Would you 開頭適合回應接受/婉拒。"],
  ["Could you send the invoice today?", ["Sure, I'll email it right after this meeting.", "It was in April.", "At the finance lobby.", "The client from Osaka."], "Sure, I'll email it right after this meeting.", "Could you 表請求。"],
  ["Do you know if the seminar is full?", ["Yes, only two seats are still available.", "By train from Taipei.", "On the fourth floor pantry.", "Because traffic was heavy."], "Yes, only two seats are still available.", "Do you know if... 需資訊回應。"],
  ["Which printer is connected to this laptop?", ["The black one beside the filing cabinet.", "Next Thursday afternoon.", "Mr. Gomez installed software.", "Since last winter."], "The black one beside the filing cabinet.", "Which 問特定選擇。"],
  ["Have you finished the quarterly report?", ["Not yet, but I'll complete it before 5 p.m.", "On the rooftop garden.", "Because finance requested it.", "Ms. Lee's assistant."], "Not yet, but I'll complete it before 5 p.m.", "Have you 問完成狀態。"]
];
for (let i = 1; i <= 25; i++) { const s = p2Seeds[(i - 1) % p2Seeds.length]; sampleQuestions.push(q({ id: `L2-${i}`, section: "listening", part: "Part 2", type: "question-response", question: s[0], options: [...s[1]], answer: s[2], explanation: `${s[3]} 中文解析：正確選項在語意與句型上能直接回應問句。` })); }

const p3Passages = Array.from({ length: 13 }, (_, i) => ({
  passage: `Woman: Hi Kevin, the supplier moved tomorrow's delivery to 4 p.m., so we need to shift our inspection time. Man: Thanks for telling me. I'll notify the warehouse team and update the checklist before lunch. Woman: Great, because the client will visit at 5 p.m. to review the samples.`,
  questions: [
    { q: "What are the speakers mainly discussing?", o: [`A delivery schedule change for project ${i + 1}.`, "A menu update for the cafeteria.", "A hotel check-in issue.", "A canceled flight."], a: `A delivery schedule change for project ${i + 1}.`, e: "主題是交貨時間改動與後續安排。" },
    { q: "What will the man do next?", o: ["Notify the warehouse team.", "Book a taxi for the client.", "Rewrite the sales contract.", "Call the finance manager."], a: "Notify the warehouse team.", e: "男士明確提到會通知倉儲同仁。" },
    { q: "Why is the timing important?", o: ["The client will review samples at 5 p.m.", "The office closes at noon.", "The courier is on vacation.", "A system error deleted the files."], a: "The client will review samples at 5 p.m.", e: "對話提到客戶 5 點要看樣品。" }
  ]
}));

const p4Passages = Array.from({ length: 10 }, (_, i) => ({
  passage: `Good afternoon, this is an announcement from Building Operations. Tonight from 9:00 to 10:30 p.m., the main elevator in Tower B will be temporarily out of service for safety inspection. Please use the side elevators during that period, and allow extra travel time if you have evening meetings.`,
  questions: [
    { q: "What is the purpose of the announcement?", o: ["To inform staff about an elevator inspection.", "To advertise office furniture.", "To announce a holiday party menu.", "To request overtime applications."], a: "To inform staff about an elevator inspection.", e: "公告主旨是通知電梯檢查時段。" },
    { q: "When will the service interruption occur?", o: ["From 9:00 to 10:30 p.m.", "From 7:00 to 8:00 a.m.", "All day on Sunday.", "No time is given."], a: "From 9:00 to 10:30 p.m.", e: "獨白提供明確時間區間。" },
    { q: "What are listeners asked to do?", o: ["Use the side elevators and allow extra time.", "Cancel all evening meetings.", "Move to another building.", "Call emergency services."], a: "Use the side elevators and allow extra time.", e: "結尾明確交代聽眾行動。" }
  ]
}));

function addListeningGroups(partPrefix, part, type, passages) {
  let idx = 1;
  passages.forEach((pg, g) => {
    pg.questions.forEach((item) => {
      sampleQuestions.push(q({ id: `${partPrefix}-${idx++}`, section: "listening", part, type, groupId: `${partPrefix}G-${g + 1}`, passage: pg.passage, question: item.q, options: item.o, answer: item.a, explanation: `${item.e} 中文解析：依對話/獨白內容判斷。` }));
    });
  });
}

addListeningGroups("L3", "Part 3", "conversations", p3Passages);
addListeningGroups("L4", "Part 4", "talks", p4Passages);

const p5Seeds = [
  ["By the time the CEO arrived, the team ____ the presentation.", ["had finished", "has finished", "finish", "finishing"], "had finished", "過去完成先於另一過去時間點，用過去完成式。", "時態"],
  ["Please place the signed contract ____ the blue folder.", ["in", "at", "for", "to"], "in", "文件放在資料夾裡面用 in。", "介系詞"],
  ["We postponed the launch ____ the supplier missed the deadline.", ["because", "although", "unless", "if"], "because", "表示原因用 because。", "連接詞"],
  ["The new policy is both practical and ____.", ["effective", "effectively", "effect", "effectiveness"], "effective", "be 動詞後接形容詞。", "詞性"],
  ["All invoices must ____ before Friday.", ["be submitted", "submit", "submitted", "be submitting"], "be submitted", "發票是被提交，用被動語態。", "主被動"],
  ["The manager decided ____ the proposal again.", ["to review", "reviewing", "review", "reviewed"], "to review", "decide 後接 to V。", "不定詞"],
  ["They avoided ____ during peak traffic hours.", ["driving", "to drive", "drive", "driven"], "driving", "avoid 後接 V-ing。", "動名詞"],
  ["The engineer ____ designed this app won an award.", ["who", "whom", "which", "whose"], "who", "先行詞是人且作主詞，用 who。", "關係代名詞"],
  ["This quarter's sales are ____ than last quarter's.", ["higher", "highest", "high", "more high"], "higher", "兩者比較用比較級。", "比較級"],
  ["The receptionist politely ____ the visitor to wait.", ["asked", "ask", "is asking", "has ask"], "asked", "副詞 politely 修飾動詞。", "副詞位置"]
];
for (let i = 1; i <= 30; i++) { const s = p5Seeds[(i - 1) % p5Seeds.length]; sampleQuestions.push(q({ id: `R5-${i}`, section: "reading", part: "Part 5", type: "incomplete-sentences", question: s[0], options: s[1], answer: s[2], explanation: `${s[3]} 中文解析：其餘選項在語法或語意上不成立。`, grammarPoint: s[4] })); }

for (let g = 1; g <= 4; g++) {
  const passage = `Memo: Beginning next Monday, all travel reimbursement requests must include receipts, a manager signature, and a project code. Incomplete forms will be returned within one business day.`;
  const set = [
    ["Please ____ the form before 3 p.m.", ["submit", "submits", "submitted", "submitting"], "submit", "祈使句動詞原形。", "祈使句"],
    ["The request was rejected ____ key details were missing.", ["because", "however", "despite", "unless"], "because", "因果連接詞。", "連接詞"],
    ["Managers are responsible for ____ all entries.", ["reviewing", "review", "to review", "reviewed"], "reviewing", "for 後接動名詞。", "介系詞+Ving"],
    ["Any errors should ____ immediately.", ["be corrected", "correct", "corrected", "be correcting"], "be corrected", "應被更正用被動。", "被動語態"]
  ];
  set.forEach((s, i) => sampleQuestions.push(q({ id: `R6-${(g - 1) * 4 + i + 1}`, section: "reading", part: "Part 6", type: "text-completion", groupId: `R6G-${g}`, passage, question: s[0], options: s[1], answer: s[2], explanation: `${s[3]} 中文解析：依上下文選最合適語法。`, grammarPoint: s[4] })));
}

const p7Passages = [
  "Email: Subject: Parking Permit Renewal. Please submit your vehicle plate number by Friday to keep your employee parking access active next month.",
  "Memo: The marketing team will relocate to Floor 8 on June 3. Pack personal items by Wednesday and label boxes with your department code.",
  "Notice: The cafeteria will serve only takeout meals between 11:30 and 13:00 due to ventilation repairs.",
  "Advertisement: City Language Center now offers weekend business English classes with small-group coaching and mock interviews.",
  "Schedule: Vendor training is set for Tuesday 10:00-11:30 in Room 402, followed by Q&A and system login setup.",
  "Invoice: Invoice #A5032 for office chairs totals $2,460, payable within 30 days via bank transfer.",
  "Job Posting: We are hiring a logistics coordinator with two years of inventory experience and strong spreadsheet skills.",
  "Review: Customers praised the new online booking tool for its speed, though some requested clearer refund instructions.",
  "Email: The client moved tomorrow's call to 4:00 p.m. Please update the agenda and resend the meeting link.",
  "Memo: Quarterly safety drills begin next week. Team leaders must confirm attendance records after each session.",
  "Notice: Lobby access card scanners will be upgraded this Saturday; temporary paper badges will be issued at reception.",
  "Advertisement: GreenLine Courier guarantees same-day delivery for downtown parcels sent before noon.",
  "Schedule: HR orientation for new hires starts at 9:30 a.m., followed by IT account setup at 11:00.",
  "Invoice: Service fee for May website maintenance is listed as $780 with payment due on June 15.",
  "Job Posting: The finance department seeks an analyst familiar with budgeting, forecasting, and dashboard reporting.",
  "Review: Attendees said the product webinar was informative but too short for advanced troubleshooting topics.",
  "Email: Please approve the draft contract by end of day so legal can finalize signatures tomorrow.",
  "Notice: Due to heavy rain, the outdoor company event will move to the auditorium at 3:00 p.m."
];

p7Passages.forEach((passage, g) => {
  const n = g + 1;
  const qs = [
    ["What is the main purpose of the text?", [`To share information about item ${n}.`, "To explain hospital procedures.", "To publish a cooking recipe.", "To describe a vacation plan."], `To share information about item ${n}.`, "主旨題看標題與第一句。"],
    ["What detail is mentioned?", ["A specific time or deadline is provided.", "No action is required.", "The text is about weather only.", "All services are discontinued."], "A specific time or deadline is provided.", "本文皆含時間或期限資訊。"],
    ["What are readers likely expected to do?", ["Follow the instruction in the message.", "Ignore future announcements.", "Submit a medical form.", "Cancel all reservations."], "Follow the instruction in the message.", "商務文本常在結尾給行動要求。"]
  ];
  qs.forEach((it, i) => sampleQuestions.push(q({ id: `R7-${g * 3 + i + 1}`, section: "reading", part: "Part 7", type: "reading-comprehension", groupId: `R7G-${n}`, passage, question: it[0], options: it[1], answer: it[2], explanation: `${it[3]} 中文解析：依文章資訊定位答案。` })));
});

const tabs = [["home", "首頁"], ["listening", "聽力"], ["reading", "閱讀"], ["vocabulary", "單字"], ["cloze", "填空"], ["sentence", "句子"], ["review", "複習清單"], ["wrongbook", "錯題本"]];
let currentTab = "home";

function defaultState() { return { total: 0, correct: 0, wrongbook: [], reviewList: [], doneToday: 0, lastPracticeDate: new Date().toISOString().slice(0, 10), byPart: {}, solvedIds: {} }; }
function loadState() { const raw = localStorage.getItem(STORAGE_KEY); const parsed = raw ? JSON.parse(raw) : defaultState(); const t = new Date().toISOString().slice(0, 10); if (parsed.lastPracticeDate !== t) parsed.doneToday = 0; parsed.lastPracticeDate = t; return { ...defaultState(), ...parsed }; }
let state = loadState();
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderDashboard(); }
function evaluate(qItem, answer) { if (state.solvedIds[qItem.id]) return null; const ok = answer === qItem.answer; state.solvedIds[qItem.id] = true; state.total++; state.doneToday++; state.byPart[qItem.part] = (state.byPart[qItem.part] || 0) + 1; if (ok) state.correct++; else state.wrongbook.unshift({ ...qItem, myAnswer: answer, wrongAt: new Date().toISOString() }); saveState(); return ok; }

function renderQuestionCard(qItem, partLabel = "") {
  const solved = !!state.solvedIds[qItem.id];
  return `<div class='card'><h3>${esc(partLabel || qItem.part)}</h3><p>${esc(qItem.question)}</p>${qItem.passage ? `<p><small>${esc(qItem.passage)}</small></p>` : ""}<div>${qItem.options.map((op, i) => `<button class='option-btn' data-id='${qItem.id}' data-idx='${i}' ${solved ? "disabled" : ""}>${esc(op)}</button>`).join("")}</div><button class='danger mark-review' data-review='${qItem.id}'>我不熟</button><div id='fb-${qItem.id}'>${solved ? "<small>此題已作答，已鎖定。</small>" : ""}</div></div>`;
}

function bindQuestionEvents(pool) {
  pool.forEach((qItem) => {
    document.querySelectorAll(`button[data-id='${qItem.id}']`).forEach((btn) => {
      btn.onclick = () => {
        const ans = qItem.options[Number(btn.dataset.idx)];
        const ok = evaluate(qItem, ans);
        if (ok === null) return;
        document.querySelectorAll(`button[data-id='${qItem.id}']`).forEach((x) => { x.disabled = true; });
        const el = document.getElementById(`fb-${qItem.id}`);
        el.className = `feedback ${ok ? "success" : "error"}`;
        el.innerHTML = `${ok ? "✅" : "❌"} 正確答案：${esc(qItem.answer)}<br>解析：${esc(qItem.explanation)}${qItem.grammarPoint ? `<br>文法重點：${esc(qItem.grammarPoint)}` : ""}`;
      };
    });
  });
  document.querySelectorAll(".mark-review").forEach((btn) => {
    btn.onclick = () => {
      const item = pool.find((x) => x.id === btn.dataset.review);
      if (!item) return;
      if (!state.reviewList.some((x) => x.id === item.id)) { state.reviewList.unshift({ ...item, markedAt: new Date().toISOString() }); saveState(); }
    };
  });
}

function renderTabs() {
  const nav = document.getElementById("tabNav");
  nav.innerHTML = tabs.map(([k, v]) => `<button class='tab-btn ${currentTab === k ? "active" : ""}' data-tab='${k}'>${v}</button>`).join("");
  nav.querySelectorAll(".tab-btn").forEach((b) => { b.onclick = () => { currentTab = b.dataset.tab; renderTabs(); renderContent(); }; });
}

function renderDashboard() {
  const acc = state.total ? ((state.correct / state.total) * 100).toFixed(1) : "0.0";
  document.getElementById("dashboard").innerHTML = `<h2>學習統計</h2><div class='grid-2'><div class='stat'>總題庫數：<strong>${sampleQuestions.length}</strong></div><div class='stat'>今日已答題數：<strong>${state.doneToday}</strong></div><div class='stat'>正確率：<strong>${acc}%</strong></div><div class='stat'>錯題數：<strong>${state.wrongbook.length}</strong></div><div class='stat'>複習清單題數：<strong>${state.reviewList.length}</strong></div></div>`;
}

function renderPractice(section) {
  const parts = Object.keys(PART_SPECS).filter((p) => PART_SPECS[p].section === section);
  document.getElementById("content").innerHTML = `<h2>${section === "listening" ? "聽力" : "閱讀"}練習</h2><select id='partFilter'><option value='all'>全部</option>${parts.map((p) => `<option value='${p}'>${p}</option>`).join("")}</select><button id='reshuffle' class='primary'>重新隨機出題</button><div id='qArea'></div>`;
  const draw = () => {
    const part = document.getElementById("partFilter").value;
    const pool = shuffle(sampleQuestions.filter((x) => x.section === section && (part === "all" || x.part === part)));
    document.getElementById("qArea").innerHTML = pool.map((item) => renderQuestionCard(item)).join("");
    bindQuestionEvents(pool);
  };
  document.getElementById("partFilter").onchange = draw;
  document.getElementById("reshuffle").onclick = draw;
  draw();
}

function renderMiniPractice(title, pool, label) {
  document.getElementById("content").innerHTML = `<h2>${title}</h2><button id='reshuffleMini' class='primary'>重新隨機出題</button><div id='qAreaMini'></div>`;
  const draw = () => {
    const shuffled = shuffle(pool).map((x) => ({ ...x, part: label, type: label }));
    document.getElementById("qAreaMini").innerHTML = shuffled.map((item) => renderQuestionCard(item, label)).join("");
    bindQuestionEvents(shuffled);
  };
  document.getElementById("reshuffleMini").onclick = draw;
  draw();
}

function renderReview() {
  const list = state.reviewList;
  document.getElementById("content").innerHTML = `<h2>複習清單</h2><button id='startReview' class='primary'>開始複習清單練習</button>${list.length ? list.map((i) => `<div class='card'><p>${esc(i.part)} ${esc(i.question)}</p></div>`).join("") : "<p>尚未加入題目。</p>"}`;
  const sr = document.getElementById("startReview");
  if (sr) sr.onclick = () => { const pool = shuffle(state.reviewList); document.getElementById("content").innerHTML = `<h2>複習清單練習</h2>${pool.map((x) => renderQuestionCard(x)).join("")}`; bindQuestionEvents(pool); };
}

function renderWrongbook() {
  const list = state.wrongbook;
  document.getElementById("content").innerHTML = `<h2>錯題本</h2>${list.length ? list.map((i) => `<div class='card'><p>${esc(i.part)}</p><p>${esc(i.question)}</p><p>我的答案：${esc(i.myAnswer)}</p><p>正確答案：${esc(i.answer)}</p><p>解析：${esc(i.explanation)}</p></div>`).join("") : "<p>目前沒有錯題。</p>"}`;
}

function renderContent() {
  if (currentTab === "home") document.getElementById("content").innerHTML = "<h2>首頁</h2><p>保留聽力、閱讀、單字、填空、句子、複習清單、錯題本功能。</p>";
  else if (currentTab === "listening" || currentTab === "reading") renderPractice(currentTab);
  else if (currentTab === "vocabulary") renderMiniPractice("單字練習", vocabQuestions, "單字");
  else if (currentTab === "cloze") renderMiniPractice("填空練習", clozeQuestions, "填空");
  else if (currentTab === "sentence") renderMiniPractice("句子練習", sentenceQuestions, "句子");
  else if (currentTab === "review") renderReview();
  else renderWrongbook();
}

renderTabs();
renderDashboard();
renderContent();
