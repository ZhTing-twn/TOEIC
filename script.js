const STORAGE_KEY = "toeic_practice_data_v1";

const sampleQuestions = {
  listening: [
    { id: "L1", type: "listening-part1", part: "Part 1", audioUrl: "", question: "A woman is checking in at the airport counter.", options: ["She is boarding a train.", "She is checking in luggage.", "She is repairing a suitcase.", "She is buying groceries."], answer: "She is checking in luggage.", explanation: "畫面描述為機場報到情境。" },
    { id: "L2", type: "listening-part2", part: "Part 2", audioUrl: "", question: "When is the report due?", options: ["By Friday afternoon.", "At the accounting office.", "Yes, I read it.", "Because it was delayed."], answer: "By Friday afternoon.", explanation: "WH-問句應回答時間。" },
    { id: "L3", type: "listening-part3", part: "Part 3", audioUrl: "", question: "What will the man probably do next?", options: ["Cancel the meeting.", "Send the slides.", "Call technical support.", "Take a vacation."], answer: "Send the slides.", explanation: "對話提到會議前先寄簡報。" },
    { id: "L4", type: "listening-part4", part: "Part 4", audioUrl: "", question: "According to the announcement, where should passengers go?", options: ["Gate 12", "Parking Lot B", "Ticket counter", "Information desk"], answer: "Gate 12", explanation: "廣播明確指出前往 Gate 12。" },
    { id: "L5", type: "listening-part2", part: "Part 2", audioUrl: "", question: "Could you print this file for me?", options: ["Sure, give me a minute.", "The printer is expensive.", "I bought a file folder.", "No, it was not mine."], answer: "Sure, give me a minute.", explanation: "請求句應以同意/拒絕回覆。" }
  ],
  reading: [
    { id: "R1", type: "reading-part5", part: "Part 5", question: "The manager asked us to submit the budget report ____ noon.", options: ["at", "in", "on", "for"], answer: "at", explanation: "特定時刻前用 at noon。" },
    { id: "R2", type: "reading-part5", part: "Part 5", question: "Our new policy will be effective ____ July 1.", options: ["in", "on", "at", "for"], answer: "on", explanation: "日期前使用 on。" },
    { id: "R3", type: "reading-part6", part: "Part 6", question: "Please ____ the attached form before Thursday.", options: ["complete", "completed", "completes", "completing"], answer: "complete", explanation: "祈使句用原形動詞。" },
    { id: "R4", type: "reading-part7", part: "Part 7", question: "Email: The seminar starts at 9 a.m. What time should attendees arrive?", options: ["8:00 a.m.", "8:50 a.m.", "9:30 a.m.", "10:00 a.m."], answer: "8:50 a.m.", explanation: "建議提前 10 分鐘到場。" },
    { id: "R5", type: "reading-part6", part: "Part 6", question: "Because demand increased, we ____ production last month.", options: ["expand", "expanded", "expanding", "expands"], answer: "expanded", explanation: "last month 為過去時間。" }
  ],
  vocabulary: [
    { id: "V1", type: "vocabulary-zh-en", question: "中翻英：合約", options: [], answer: "contract", explanation: "商業常見詞 contract。", English: "contract", Chinese: "合約", partOfSpeech: "noun", exampleSentence: "Please sign the contract today." },
    { id: "V2", type: "vocabulary-en-zh", question: "英翻中：negotiate", options: [], answer: "協商", explanation: "negotiate 表示協商、談判。", English: "negotiate", Chinese: "協商", partOfSpeech: "verb", exampleSentence: "They negotiated a better price." },
    { id: "V3", type: "vocabulary-zh-en", question: "中翻英：預算", options: [], answer: "budget", explanation: "budget 是預算。", English: "budget", Chinese: "預算", partOfSpeech: "noun", exampleSentence: "We need to reduce the budget." },
    { id: "V4", type: "vocabulary-en-zh", question: "英翻中：deadline", options: [], answer: "截止日期", explanation: "deadline = 截止日期。", English: "deadline", Chinese: "截止日期", partOfSpeech: "noun", exampleSentence: "The deadline is next Monday." },
    { id: "V5", type: "vocabulary-zh-en", question: "中翻英：運送", options: [], answer: "shipment", explanation: "shipment 常指貨運/運送。", English: "shipment", Chinese: "運送", partOfSpeech: "noun", exampleSentence: "The shipment arrived late." }
  ],
  cloze: [
    { id: "cloze-001", type: "cloze", question: "The manager will _____ the meeting at 9 a.m.", options: ["attend", "attending", "attended", "attends"], answer: "attend", explanation: "will 後面要接原形動詞，所以答案是 attend。" },
    { id: "cloze-002", type: "cloze", question: "Please submit the report _____ Friday afternoon.", options: ["in", "on", "by", "at"], answer: "by", explanation: "表示『在某時間之前』用 by Friday afternoon。" },
    { id: "cloze-003", type: "cloze", question: "Our sales have _____ significantly this year.", options: ["increase", "increased", "increasing", "increases"], answer: "increased", explanation: "have 後面要接過去分詞，形成現在完成式。" },
    { id: "cloze-004", type: "cloze", question: "The flight was _____ because of heavy rain.", options: ["cancel", "cancels", "canceled", "canceling"], answer: "canceled", explanation: "被動語態 was + 過去分詞，所以用 canceled。" },
    { id: "cloze-005", type: "cloze", question: "She is responsible _____ customer service training.", options: ["to", "for", "with", "from"], answer: "for", explanation: "固定片語是 be responsible for。" }
  ],
  sentence: [
    { id: "S1", type: "sentence-translation", question: "中翻英：請在今天下午前回覆這封郵件。", options: [], answer: "Please reply to this email by this afternoon.", explanation: "重點是 by this afternoon。" },
    { id: "S2", type: "sentence-reorder", question: "重組句子：/ will / tomorrow / the manager / arrive / .", options: [], answer: "The manager will arrive tomorrow.", explanation: "英文基本語序 S + V + 時間。" },
    { id: "S3", type: "sentence-correction", question: "改錯：He don't have enough experience.", options: [], answer: "He doesn't have enough experience.", explanation: "第三人稱單數用 doesn't。" },
    { id: "S4", type: "sentence-translation", question: "中翻英：我們需要在會議前完成簡報。", options: [], answer: "We need to finish the presentation before the meeting.", explanation: "need to + V。" },
    { id: "S5", type: "sentence-correction", question: "改錯：The informations are useful.", options: [], answer: "The information is useful.", explanation: "information 不可數名詞。" }
  ]
};

const tabs = [
  ["home", "首頁"], ["listening", "聽力"], ["reading", "閱讀"], ["vocabulary", "單字"], ["cloze", "填空"], ["sentence", "句子"], ["wrongbook", "錯題本"]
];

let state = loadState();
let currentTab = "home";

function defaultState() { return { total: 0, correct: 0, byCategory: {}, wrongbook: [], doneToday: 0, lastPracticeDate: new Date().toISOString().slice(0,10) }; }
function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState();
  const parsed = JSON.parse(raw);
  const today = new Date().toISOString().slice(0,10);
  if (parsed.lastPracticeDate !== today) parsed.doneToday = 0;
  parsed.lastPracticeDate = today;
  return { ...defaultState(), ...parsed };
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderDashboard(); }

function renderTabs() {
  const nav = document.getElementById("tabNav");
  nav.innerHTML = tabs.map(([key, label]) => `<button class="tab-btn ${currentTab===key?"active":""}" data-tab="${key}">${label}</button>`).join("");
  nav.querySelectorAll(".tab-btn").forEach(btn => btn.onclick = () => { currentTab = btn.dataset.tab; renderTabs(); renderContent(); });
}

function renderDashboard() {
  const acc = state.total ? ((state.correct / state.total) * 100).toFixed(1) : "0.0";
  document.getElementById("dashboard").innerHTML = `
    <h2>今日練習進度</h2>
    <div class="grid-2">
      <div class="stat">今日作答：<strong>${state.doneToday}</strong> 題</div>
      <div class="stat">累積正確率：<strong>${acc}%</strong></div>
      <div class="stat">總答題數：<strong>${state.total}</strong></div>
      <div class="stat">答對題數：<strong>${state.correct}</strong></div>
    </div>
    <small class="muted">可從下方切換分類開始練習。</small>
  `;
}

function normalize(text){ return text.trim().toLowerCase(); }

function evaluate(question, userAnswer, category){
  const correct = normalize(userAnswer) === normalize(question.answer);
  state.total += 1; state.doneToday += 1;
  state.byCategory[category] = (state.byCategory[category] || 0) + 1;
  if (correct) state.correct += 1;
  else state.wrongbook.unshift({ id: question.id, type: question.type, question: question.question, myAnswer: userAnswer, answer: question.answer, explanation: question.explanation });
  saveState();
  return correct;
}

function renderQuestionCard(q, category){
  if (q.options && q.options.length) {
    return `<div class="card"><h3>${q.part || (category === "cloze" ? "填空練習" : q.type)}</h3><p>${q.question}</p>${q.audioUrl!==undefined?`<small class="muted">audioUrl: ${q.audioUrl || '(待補 mp3)'}</small>`:""}<div>${q.options.map(op=>`<button class='option-btn' data-id='${q.id}' data-ans='${op.replace(/'/g,"&#39;")}' >${op}</button>`).join("")}</div><div id='fb-${q.id}'></div></div>`;
  }
  return `<div class="card"><h3>${q.type}</h3><p>${q.question}</p><input id='input-${q.id}' placeholder='輸入你的答案' /><button class='primary' data-id='${q.id}'>檢查答案</button><div id='fb-${q.id}'></div>${q.English?`<small class='muted'>${q.English} / ${q.Chinese} / ${q.partOfSpeech}<br>${q.exampleSentence}</small>`:""}</div>`;
}

function bindQuestionEvents(category, questions){
  questions.forEach(q => {
    if (q.options.length) {
      document.querySelectorAll(`button[data-id='${q.id}']`).forEach(btn => btn.onclick = () => showFeedback(q, btn.dataset.ans, category));
    } else {
      document.querySelector(`button[data-id='${q.id}']`).onclick = () => {
        const v = document.getElementById(`input-${q.id}`).value;
        showFeedback(q, v, category);
      };
    }
  });
}

function showFeedback(q, userAnswer, category){
  const correct = evaluate(q, userAnswer, category);
  const el = document.getElementById(`fb-${q.id}`);
  el.className = `feedback ${correct?"success":"error"}`;
  el.innerHTML = `${correct ? "✅ 答對" : "❌ 答錯"}<br>你的答案：${userAnswer}<br>正確答案：${q.answer}<br>解析：${q.explanation}`;
}

function renderPractice(category){
  const qs = sampleQuestions[category];
  document.getElementById("content").innerHTML = `<h2>${tabs.find(t=>t[0]===category)[1]}練習</h2>${qs.map(q => renderQuestionCard(q, category)).join("")}`;
  bindQuestionEvents(category, qs);
}

function renderWrongbook(){
  const list = state.wrongbook;
  document.getElementById("content").innerHTML = `
    <h2>錯題本</h2>
    <button class='danger' id='clearWrong'>清除錯題本</button>
    ${list.length ? list.map(i=>`<div class='card'><p><strong>題型：</strong>${i.type}</p><p>${i.question}</p><p>我的答案：${i.myAnswer}</p><p>正確答案：${i.answer}</p><p>解析：${i.explanation}</p></div>`).join("") : "<p>目前沒有錯題，繼續保持！</p>"}
  `;
  const btn = document.getElementById("clearWrong");
  if (btn) btn.onclick = () => { state.wrongbook = []; saveState(); renderWrongbook(); };
}

function renderHome(){
  const byCat = Object.entries(state.byCategory).map(([k,v])=>`<li>${tabs.find(t=>t[0]===k)?.[1] || k}：${v} 題</li>`).join("") || "<li>尚無紀錄</li>";
  document.getElementById("content").innerHTML = `<h2>首頁</h2><p>歡迎使用 TOEIC 複習網頁，請選擇分類開始練習。</p><h3>各類完成數</h3><ul>${byCat}</ul>`;
}

function renderContent(){
  if (currentTab === "home") return renderHome();
  if (currentTab === "wrongbook") return renderWrongbook();
  renderPractice(currentTab);
}

renderTabs();
renderDashboard();
renderContent();
