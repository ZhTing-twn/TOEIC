const STORAGE_KEY = "toeic_practice_data_v2";

const PART_SPECS = {
  "Part 1": { section: "listening", count: 6, type: "photographs" },
  "Part 2": { section: "listening", count: 25, type: "question-response" },
  "Part 3": { section: "listening", count: 39, type: "conversations" },
  "Part 4": { section: "listening", count: 30, type: "talks" },
  "Part 5": { section: "reading", count: 30, type: "incomplete-sentences" },
  "Part 6": { section: "reading", count: 16, type: "text-completion" },
  "Part 7": { section: "reading", count: 54, type: "reading-comprehension" }
};

function buildQuestion({ id, section, part, type, question, options, answer, explanation, grammarPoint = "", passage = "", groupId = "", tags = [] }) {
  return { id, section, part, type, question, passage, audioUrl: "", options, answer, explanation, grammarPoint, difficulty: "550-750", tags, groupId };
}

const sampleQuestions = [];

function addPart1() { for (let i = 1; i <= 6; i++) sampleQuestions.push(buildQuestion({ id: `L1-${i}`, section: "listening", part: "Part 1", type: "photographs", question: `照片中最可能發生的情境是什麼？（場景${i}：辦公室/機場/會議室）`, options: ["員工正在整理文件", "旅客正在等行李", "技師正在修電梯", "客戶正在退貨"], answer: "員工正在整理文件", explanation: "正確答案描述畫面中的主要動作。其餘選項與照片可見人物或地點不符。字彙重點：organize files, reception desk。", tags: ["職場", "照片描述"] })); }
function addPart2() { for (let i = 1; i <= 25; i++) sampleQuestions.push(buildQuestion({ id: `L2-${i}`, section: "listening", part: "Part 2", type: "question-response", question: `Where should I submit the expense form?（題${i}）`, options: ["At the finance desk on the third floor.", "Yes, the expense was high.", "I submitted last month.", "Because the printer is broken."], answer: "At the finance desk on the third floor.", explanation: "Where 問句需回答地點。其他選項分別是是非回應、時間資訊或因果句，語用不合。字彙：submit, expense form。", tags: ["出差", "報帳"] })); }
function addPart3() { for (let i = 1; i <= 39; i++) { const g = `L3G-${Math.ceil(i/3)}`; sampleQuestions.push(buildQuestion({ id: `L3-${i}`, section: "listening", part: "Part 3", type: "conversations", groupId: g, passage: `A: The client moved the meeting to 3 p.m. B: Then I will update the agenda and email everyone.`, question: `對話後，男士最可能先做什麼？（題${i}）`, options: ["更新議程並寄信", "取消與客戶合約", "預訂公司餐點", "申請年度休假"], answer: "更新議程並寄信", explanation: "對話明確提到 'update the agenda and email everyone'。其餘選項未在語境中出現。重點：future intention, meeting agenda。", tags: ["會議", "內部溝通"] })); }}
function addPart4() { for (let i = 1; i <= 30; i++) { const g = `L4G-${Math.ceil(i/3)}`; sampleQuestions.push(buildQuestion({ id: `L4-${i}`, section: "listening", part: "Part 4", type: "talks", groupId: g, passage: `Good morning. Due to system maintenance, the customer portal will be unavailable from 10 to 11 a.m.`, question: `公告主要目的是什麼？（題${i}）`, options: ["通知系統維護時段", "介紹新產品功能", "公布獎金名單", "邀請參加旅遊"], answer: "通知系統維護時段", explanation: "開頭直接說明維護與不可用時段，為公告核心。其他選項偏離主題。字彙：maintenance, unavailable。", tags: ["公告", "客服"] })); }}
function addPart5() { for (let i = 1; i <= 30; i++) sampleQuestions.push(buildQuestion({ id: `R5-${i}`, section: "reading", part: "Part 5", type: "incomplete-sentences", question: `The report must be submitted ____ noon.（題${i}）`, options: ["by", "in", "at", "for"], answer: "by", explanation: "by noon 表示「在中午前」。in noon 錯；at noon 是在中午那一刻；for noon 不自然。", grammarPoint: "介系詞 by 表截止時間；at 表特定時間點。", tags: ["文法", "介系詞"] })); }
function addPart6() { for (let i = 1; i <= 16; i++) { const g = `R6G-${Math.ceil(i/4)}`; sampleQuestions.push(buildQuestion({ id: `R6-${i}`, section: "reading", part: "Part 6", type: "text-completion", groupId: g, passage: `To all staff: Please review the updated travel policy before booking flights.`, question: `Please ____ the updated policy before booking flights.（題${i}）`, options: ["review", "reviews", "reviewed", "reviewing"], answer: "review", explanation: "祈使句以原形動詞開頭。其餘選項時態或型態不符。", grammarPoint: "祈使句：句首動詞原形。", tags: ["文法", "公司通知"] })); }}
function addPart7() { for (let i = 1; i <= 54; i++) { const g = `R7G-${Math.ceil(i/3)}`; sampleQuestions.push(buildQuestion({ id: `R7-${i}`, section: "reading", part: "Part 7", type: "reading-comprehension", groupId: g, passage: `Email: The training session starts at 2:00 p.m. Please arrive 10 minutes early and bring your ID badge.`, question: `根據郵件，參加者應該何時到達？（題${i}）`, options: ["1:50 p.m.", "2:00 p.m.", "2:10 p.m.", "1:30 p.m."], answer: "1:50 p.m.", explanation: "文中提到課程 2:00 開始且需提早 10 分鐘，故為 1:50。其餘選項不符合文本依據。字彙：arrive early, ID badge。", tags: ["閱讀", "email"] })); }}

[addPart1, addPart2, addPart3, addPart4, addPart5, addPart6, addPart7].forEach(fn => fn());

const tabs = [["home", "首頁"], ["listening", "聽力"], ["reading", "閱讀"], ["review", "複習清單"], ["wrongbook", "錯題本"]];
let currentTab = "home";
let currentPool = [];

function defaultState() { return { total: 0, correct: 0, wrongbook: [], reviewList: [], doneToday: 0, lastPracticeDate: new Date().toISOString().slice(0, 10), byPart: {}, solvedIds: {} }; }
function loadState() { const raw = localStorage.getItem(STORAGE_KEY); const parsed = raw ? JSON.parse(raw) : defaultState(); const today = new Date().toISOString().slice(0, 10); if (parsed.lastPracticeDate !== today) parsed.doneToday = 0; parsed.lastPracticeDate = today; return { ...defaultState(), ...parsed }; }
let state = loadState();
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderDashboard(); }

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const fmt = n => new Date(n).toLocaleString("zh-TW", { hour12: false });

function renderTabs(){ const nav = document.getElementById("tabNav"); nav.innerHTML = tabs.map(([k,v])=>`<button class='tab-btn ${currentTab===k?"active":""}' data-tab='${k}'>${v}</button>`).join(""); nav.querySelectorAll(".tab-btn").forEach(b=>b.onclick=()=>{currentTab=b.dataset.tab; renderTabs(); renderContent();}); }

function renderDashboard(){
  const byPart = Object.keys(PART_SPECS).map(p => { const total = PART_SPECS[p].count; const done = state.byPart[p] || 0; return `<li>${p}：${done}/${total}</li>`; }).join("");
  const acc = state.total ? ((state.correct / state.total) * 100).toFixed(1) : "0.0";
  document.getElementById("dashboard").innerHTML = `<h2>學習統計</h2><div class='grid-2'><div class='stat'>總題庫數：<strong>${sampleQuestions.length}</strong></div><div class='stat'>今日已答題數：<strong>${state.doneToday}</strong></div><div class='stat'>正確率：<strong>${acc}%</strong></div><div class='stat'>錯題數：<strong>${state.wrongbook.length}</strong></div><div class='stat'>複習清單題數：<strong>${state.reviewList.length}</strong></div><div class='stat'>聽力/閱讀：<strong>${sampleQuestions.filter(q=>q.section==="listening").length}/${sampleQuestions.filter(q=>q.section==="reading").length}</strong></div></div><h3>Part 進度</h3><ul>${byPart}</ul>`;
}

function markReview(q){ if(state.reviewList.some(i=>i.id===q.id)) return; state.reviewList.unshift({ ...q, markedAt: new Date().toISOString() }); saveState(); alert("已加入複習清單"); }
function evaluate(q, userAnswer){ const ok = userAnswer === q.answer; state.total++; state.doneToday++; state.byPart[q.part] = (state.byPart[q.part]||0)+1; state.solvedIds[q.id] = true; if(ok) state.correct++; else state.wrongbook.unshift({ ...q, myAnswer:userAnswer, wrongAt:new Date().toISOString() }); saveState(); return ok; }

function renderQuestionCard(q){ return `<div class='card'><h3>${q.part}</h3><p>${q.question}</p>${q.passage?`<p><small>${q.passage}</small></p>`:""}<div>${q.options.map(op=>`<button class='option-btn' data-id='${q.id}' data-ans='${op}'>${op}</button>`).join("")}</div><button class='danger mark-review' data-review='${q.id}'>我不熟</button><div id='fb-${q.id}'></div></div>`; }
function bindQuestionEvents(pool){ pool.forEach(q=>document.querySelectorAll(`button[data-id='${q.id}']`).forEach(b=>b.onclick=()=>{ const ok=evaluate(q,b.dataset.ans); const el=document.getElementById(`fb-${q.id}`); el.className=`feedback ${ok?"success":"error"}`; el.innerHTML=`${ok?"✅":"❌"} 正確答案：${q.answer}<br>解析：${q.explanation}${q.grammarPoint?`<br>文法重點：${q.grammarPoint}`:""}`; })); document.querySelectorAll(".mark-review").forEach(b=>b.onclick=()=>markReview(pool.find(q=>q.id===b.dataset.review))); }

function renderPractice(section){
  const parts = Object.keys(PART_SPECS).filter(p => PART_SPECS[p].section === section);
  const filterOptions = [`<option value='all'>全部</option>`, ...parts.map(p=>`<option value='${p}'>${p}</option>`)].join("");
  document.getElementById("content").innerHTML = `<h2>${section==="listening"?"聽力":"閱讀"}練習</h2><label>Part 篩選</label><select id='partFilter'>${filterOptions}</select><button class='primary' id='reshuffle'>重新隨機出題</button><div id='qArea'></div>`;
  const draw = () => { const part = document.getElementById("partFilter").value; const pool = sampleQuestions.filter(q=>q.section===section && (part==="all"||q.part===part)); currentPool = shuffle(pool); document.getElementById("qArea").innerHTML = currentPool.map(renderQuestionCard).join(""); bindQuestionEvents(currentPool); };
  document.getElementById("partFilter").onchange = draw; document.getElementById("reshuffle").onclick = draw; draw();
}

function renderReview(){ const list = state.reviewList; document.getElementById("content").innerHTML = `<h2>複習清單</h2><button class='primary' id='startReview'>開始複習清單練習</button><button class='danger' id='clearReview'>清空複習清單</button>${list.length?list.map(i=>`<div class='card'><p>${i.type} / ${i.part}</p><p>${i.question}</p><p>答案：${i.answer}</p><p>解析：${i.explanation}${i.grammarPoint?`<br>文法：${i.grammarPoint}`:""}</p><p>標記時間：${fmt(i.markedAt)}</p><button class='danger rm-review' data-id='${i.id}'>移除</button></div>`).join(""):"<p>尚未加入題目。</p>"}`; const sr=document.getElementById("startReview"); if(sr) sr.onclick=()=>{ currentTab="review-practice"; renderContent();}; const cr=document.getElementById("clearReview"); if(cr) cr.onclick=()=>{state.reviewList=[]; saveState(); renderReview();}; document.querySelectorAll(".rm-review").forEach(b=>b.onclick=()=>{ state.reviewList=state.reviewList.filter(i=>i.id!==b.dataset.id); saveState(); renderReview(); }); }
function renderReviewPractice(){ const pool = shuffle(state.reviewList); document.getElementById("content").innerHTML = `<h2>複習清單練習</h2>${pool.length?pool.map(renderQuestionCard).join(""):"<p>複習清單是空的。</p>"}`; bindQuestionEvents(pool); }
function renderWrongbook(){ const list = state.wrongbook; document.getElementById("content").innerHTML = `<h2>錯題本</h2><button class='danger' id='clearWrong'>清除錯題本</button>${list.length?list.map(i=>`<div class='card'><p>${i.part}</p><p>${i.question}</p><p>我的答案：${i.myAnswer}</p><p>正確答案：${i.answer}</p><p>解析：${i.explanation}</p></div>`).join(""):"<p>目前沒有錯題。</p>"}`; const btn=document.getElementById("clearWrong"); if(btn) btn.onclick=()=>{state.wrongbook=[]; saveState(); renderWrongbook();}; }
function renderContent(){ if(currentTab==="home") document.getElementById("content").innerHTML = "<h2>首頁</h2><p>可選擇聽力/閱讀進行隨機練習，或前往複習清單與錯題本。</p>"; else if(currentTab==="listening"||currentTab==="reading") renderPractice(currentTab); else if(currentTab==="review") renderReview(); else if(currentTab==="review-practice") renderReviewPractice(); else renderWrongbook(); }

renderTabs(); renderDashboard(); renderContent();
