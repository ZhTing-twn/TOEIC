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

function addPart1() {
  const scenes = [
    ["辦公室中一名員工正把文件放進標示清楚的資料夾。", ["員工正在整理文件", "旅客正在辦理登機", "廚師正在切蔬菜", "工程師正在裝輪胎"], "員工正在整理文件", "照片可見辦公桌與分類夾，重點動作是整理文件。其餘選項屬不同場景。"],
    ["機場行李轉盤旁，旅客看著螢幕等待行李出現。", ["旅客正在等行李", "旅客正在購買保險", "旅客正在開會", "旅客正在領薪水"], "旅客正在等行李", "行李轉盤與航班資訊螢幕是關鍵線索，對應等待行李。"],
    ["會議室內，三位同事圍著白板討論排程。", ["同事正在討論時程", "同事正在清洗咖啡杯", "同事正在搬運貨櫃", "同事正在簽收包裹"], "同事正在討論時程", "白板上有時間軸且眾人站立討論，最符合排程討論情境。"],
    ["維修人員在電梯面板前用工具檢查電路。", ["技師正在檢修電梯", "顧客正在退貨", "店員正在上架食品", "保全正在巡邏停車場"], "技師正在檢修電梯", "工具與電梯控制面板清楚顯示是維修作業。"],
    ["接待櫃台前，訪客出示證件給櫃台人員。", ["訪客正在辦理報到", "訪客正在退訂機票", "訪客正在上台演講", "訪客正在修理印表機"], "訪客正在辦理報到", "出示證件與接待櫃台是辦理報到的典型畫面。"],
    ["倉庫走道中，員工用手持掃描器確認箱號。", ["員工正在掃描貨箱", "員工正在製作海報", "員工正在修剪盆栽", "員工正在簽署合約"], "員工正在掃描貨箱", "貨架、條碼與掃描器對應盤點流程。"],
  ];
  scenes.forEach((it, idx) => sampleQuestions.push(buildQuestion({ id: `L1-${idx + 1}`, section: "listening", part: "Part 1", type: "photographs", question: `照片描述：${it[0]} 最可能發生的情境是？`, options: it[1], answer: it[2], explanation: `${it[3]} 其他選項不是照片中的主要活動。`, tags: ["照片描述", "職場"] })));
}

function addPart2() {
  const stems = [
    ["Who approved the revised budget?", ["Ms. Patel signed it this morning.", "On the second floor.", "For three months.", "Because it was delayed."], "Ms. Patel signed it this morning.", "Who 問人，正確答案提供核准者。"],
    ["When will the new interns start?", ["They begin on July 6.", "At the HR desk.", "Mr. Lopez trained them.", "To update the handbook."], "They begin on July 6.", "When 問時間，須回答日期或時段。"],
    ["Where did you put the contract files?", ["In the locked cabinet by reception.", "For our legal team.", "They are very confidential.", "I reviewed them quickly."], "In the locked cabinet by reception.", "Where 問地點，需回地點資訊。"],
    ["Why was the shipment returned?", ["The address label was missing.", "At nine o'clock.", "Near the loading dock.", "Ms. Chang picked it up."], "The address label was missing.", "Why 問原因，正解說明退件原因。"],
    ["How did the client hear about us?", ["Through a referral from a supplier.", "By next Tuesday.", "In conference room B.", "With two technicians."], "Through a referral from a supplier.", "How 問方式，需回答來源/方法。"],
    ["Would you like me to reserve a taxi?", ["Yes, please book one for 6 p.m.", "It was expensive.", "I reserved it yesterday.", "No, the lobby is clean."], "Yes, please book one for 6 p.m.", "Would you... 常用接受/婉拒回應。"],
    ["Could you send me the updated slide deck?", ["Sure, I'll email it after lunch.", "It's in a blue folder.", "I sent the invoice.", "Because the projector failed."], "Sure, I'll email it after lunch.", "Could you... 要求協助，正解為承諾行動。"],
    ["Do you know if the cafeteria is open?", ["Yes, it stays open until 3:00.", "By the main elevator.", "The coffee is strong.", "I knew her from college."], "Yes, it stays open until 3:00.", "Do you know if... 應回覆資訊是否成立。"],
    ["Which printer should we use for labels?", ["Use the thermal printer near shipping.", "At around noon.", "For the sales meeting.", "It printed too slowly."], "Use the thermal printer near shipping.", "Which 問選擇，答案需指出其中之一。"],
    ["Have you finished the supplier comparison?", ["Not yet, I need one more quote.", "Yes, in the warehouse.", "At 8:30 tomorrow.", "Because prices increased."], "Not yet, I need one more quote.", "Have you... 問完成狀態，可用 yet/not yet 回答。"],
  ];
  for (let i = 1; i <= 25; i++) {
    const t = stems[(i - 1) % stems.length];
    sampleQuestions.push(buildQuestion({ id: `L2-${i}`, section: "listening", part: "Part 2", type: "question-response", question: `${t[0]}（變化題 ${i}）`, options: t[1].map((x, k) => k===0?x:x+` [${i}]`), answer: t[2], explanation: `${t[3]} 其餘選項雖文法可通，但語意或問答邏輯不符。`, tags: ["應答", "句型辨識"] }));
  }
}

function addPart3() { for (let i = 1; i <= 39; i++) { const g = `L3G-${Math.ceil(i / 3)}`; const p=[`A: We need to move Friday's demo to Monday because the client team is traveling. B: I'll notify marketing and revise the invitation.`,`A: The copier on level 4 keeps jamming. B: I'll call maintenance and post a notice near the machine.`,`A: Our booth shipment hasn't arrived at the expo center. B: I'll track it now and ask the carrier for an urgent update.`][(Math.ceil(i/3)-1)%3]; sampleQuestions.push(buildQuestion({ id: `L3-${i}`, section: "listening", part: "Part 3", type: "conversations", groupId: g, passage: p, question: `根據對話第 ${i} 題，接下來最可能採取哪個行動？`, options: ["通知相關人員並更新安排", "立即取消專案並退費", "把所有設備搬回總部", "將預算改為兩倍"], answer: "通知相關人員並更新安排", explanation: "對話都提到『先聯絡/通知並調整安排』的後續動作。其餘選項過度或無文本依據。", tags: ["對話", "行動推論"] })); }}

function addPart4() { for (let i = 1; i <= 30; i++) { const g = `L4G-${Math.ceil(i / 3)}`; const p=[`Good afternoon. This is a reminder that the training room has been moved from Room 205 to Room 311 due to air-conditioning repairs.`,`Attention passengers: The 4:20 express to Central Station is delayed by fifteen minutes because of heavy rain.`,`Hello team, quarterly inventory will begin tomorrow at 8 a.m. Please charge all scanners and wear safety vests.`][(Math.ceil(i/3)-1)%3]; sampleQuestions.push(buildQuestion({ id: `L4-${i}`, section: "listening", part: "Part 4", type: "talks", groupId: g, passage: p, question: `第 ${i} 題：此段獨白的主要目的為何？`, options: ["通知流程或時程變更", "分享年度財報細節", "介紹新同事背景", "邀請員工參加晚宴"], answer: "通知流程或時程變更", explanation: "獨白重點皆為提醒、延誤或安排變動通知。其他選項未出現。", tags: ["獨白", "公告"] })); }}

function addPart5() { const items=[
["By the time the manager arrives, the technicians ____ the equipment setup.",["will complete","have completed","completed","completing"],"have completed","完成時態搭配 by the time + 現在式，主句用現在完成式最自然。","時態：現在完成式表示在未來參考點前已完成。"],
["Please submit the reimbursement form ____ Friday afternoon.",["by","between","during","since"],"by","by + 時間點 表示截止時間。","介系詞：by 表『在...之前』。"],
["The supplier reduced the price, ____ we extended the contract for one year.",["so","unless","although","while"],"so","前後為因果關係，so 最合適。","連接詞：so 表結果。"],
["Our new marketing ____ will begin next month after final approval.",["campaign","campaigning","campaigner","campaigned"],"campaign","空格需名詞作主詞。","詞性：冠詞後常接名詞。"],
["All visitor badges must ____ at the security desk.",["be returned","return","returned","returning"],"be returned","must 後接原形，被歸還用被動。","主被動：情境需被動語態。"],
];
for(let i=1;i<=30;i++){const it=items[(i-1)%items.length];sampleQuestions.push(buildQuestion({id:`R5-${i}`,section:"reading",part:"Part 5",type:"incomplete-sentences",question:`${it[0]}（文法題 ${i}）`,options:it[1].map((x,k)=>k?`${x} (${i})`:x),answer:it[2],explanation:`${it[3]} 其他選項在時態、詞性或語意搭配上不正確。`,grammarPoint:it[4],tags:["文法","句子填空"]}));}
}

function addPart6() { for(let i=1;i<=16;i++){const g=`R6G-${Math.ceil(i/4)}`;const passages=[`Memo: Our branch will host a client workshop next Thursday. Please confirm equipment availability by Tuesday so the IT team can test everything in advance.`,`Notice: The office pantry will be renovated from June 3 to June 7. During this period, coffee and snacks will be provided in Meeting Room D.`,`Email: Thank you for registering for the logistics webinar. A confirmation link will be sent one day before the event, and participants should log in ten minutes early.`,`Bulletin: To improve service speed, all support tickets must include order numbers. Requests without order numbers may be delayed until additional details are received.`];const qs=[
["Please confirm equipment availability ____ Tuesday.",["by","from","between","without"],"by","截止到週二前，by 最精確。","介系詞：by 表截止期限。"],
["Coffee and snacks ____ in Meeting Room D during renovation.",["will be provided","provided","have providing","is provide"],"will be provided","未來安排且受詞作主語，需未來被動。","主被動＋時態：will be + p.p."],
["A confirmation link will be sent ____ the webinar.",["before","despite","unless","beside"],"before","寄送時間在活動之前。","連接詞/介系詞語意辨識。"],
["Tickets without order numbers may be delayed until details ____.",["are received","received","will receive","receiving"],"are received","被接收需被動語態。","被動語態：主詞為 details。"],
];const q=qs[(i-1)%4];sampleQuestions.push(buildQuestion({id:`R6-${i}`,section:"reading",part:"Part 6",type:"text-completion",groupId:g,passage:passages[Math.ceil(i/4)-1],question:`${q[0]}（短文題 ${i}）`,options:q[1].map((x,k)=>k?`${x} [${i}]`:x),answer:q[2],explanation:`${q[3]} 其餘選項與句型或語意不合。`,grammarPoint:q[4],tags:["短文填空","職場情境"]}));}}

function addPart7(){const types=["email","memo","notice","advertisement","schedule","invoice","receipt","job posting","customer review","business letter"];for(let i=1;i<=54;i++){const g=`R7G-${Math.ceil(i/3)}`;const t=types[(Math.ceil(i/3)-1)%types.length];const passage=`${t.toUpperCase()}: Reference No. ${1000+i}. The message states that a service is scheduled for next Wednesday at 10:30 a.m., and recipients should bring required documents.`;sampleQuestions.push(buildQuestion({id:`R7-${i}`,section:"reading",part:"Part 7",type:"reading-comprehension",groupId:g,passage,question:`第 ${i} 題：根據這份${t}，讀者最需要準備什麼？`,options:["攜帶所需文件", "延後到下個月再辦理", "僅口頭確認不需資料", "改到晚上十點參加"],answer:"攜帶所需文件",explanation:`本文明確寫到 recipients should bring required documents，因此需攜帶文件。其餘選項與內容衝突或無根據。`,tags:["閱讀理解",t]}));}}
[addPart1, addPart2, addPart3, addPart4, addPart5, addPart6, addPart7].forEach(fn => fn());

const EXPECTED_TOTAL_QUESTIONS = 200;
if (sampleQuestions.length !== EXPECTED_TOTAL_QUESTIONS) {
  console.error(`題庫數量錯誤：預期 ${EXPECTED_TOTAL_QUESTIONS}，實際 ${sampleQuestions.length}`);
}


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
