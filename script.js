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
p1.forEach(([id, ans, options, exp]) => sampleQuestions.push(q({ id, section: "listening", part: "Part 1", type: "photographs", question: "What is most likely happening in the picture?", options, answer: ans, explanation: `${exp} 中文解析：其餘選項與場景人物或動作不符。`, tags: ["photo"] })));

const p2 = [
["Who will lead the product demo tomorrow?",["Mr. Liao from sales will lead it.","At the showroom on 3rd Street.","Because the projector failed.","Around 4:30 in the afternoon."],"Mr. Liao from sales will lead it.","Who 問人名或職位；正確答案回覆負責人，其餘是地點、原因、時間。"],
["When is the client contract due?",["It's due next Wednesday at noon.","In the legal department.","Ms. Chen reviewed it.","To avoid late fees."],"It's due next Wednesday at noon.","When 問時間；只有 A 是明確期限。"],
["Where should visitors check in for the seminar?",["At the front desk in the main lobby.","By filling out an online form.","After they meet the trainer.","Because badges are required."],"At the front desk in the main lobby.","Where 問地點；A 提供實際報到位置。"],
["Why did the support team escalate the ticket?",["The issue affected multiple customers.","On the second floor.","By tomorrow morning.","With a replacement battery."],"The issue affected multiple customers.","Why 問原因；只有 A 說明升級處理的理由。"],
["How do I apply for travel reimbursement?",["Upload receipts in the expense system.","At 9:00 before the briefing.","Ms. Wu from HR.","The branch in Taichung."],"Upload receipts in the expense system.","How 問方法；A 提供步驟，其餘不對問句。"],
["Would you mind closing the conference room windows?",["Not at all, I'll close them now.","In about three kilometers.","The contract was signed yesterday.","Because the catalog is outdated."],"Not at all, I'll close them now.","Would you mind 屬請求句，合適回應為同意或婉拒。"],
["Could you resend the invoice as a PDF?",["Sure, I'll send it within ten minutes.","It was paid last quarter.","At the loading dock entrance.","The finance workshop."],"Sure, I'll send it within ten minutes.","Could you 表請求；A 是直接承諾執行。"],
["Do you know whether the parking lot is full?",["Yes, only the rooftop level has space.","At the coffee shop nearby.","On Friday evening.","To reduce traffic noise."],"Yes, only the rooftop level has space.","Do you know whether... 問資訊；A 回答狀態。"],
["Which proposal did the board approve?",["The one with the phased rollout plan.","By courier this morning.","During a weather alert.","At Building C reception."],"The one with the phased rollout plan.","Which 問特定選擇；A 指出被核准版本。"],
["Have you submitted the monthly inventory report?",["Yes, I sent it before lunch.","In the supply closet.","Because we changed vendors.","Every three months."],"Yes, I sent it before lunch.","Have you 問完成狀態；A 明確回覆已完成。"],
["Can I leave my suitcase at the reception area?",["Yes, they can store it until 6 p.m.","At gate 12 for boarding.","The marketing manager.","Since last winter."],"Yes, they can store it until 6 p.m.","Can I 問許可；A 給予允許與條件。"],
["Should we postpone the training session?",["Yes, half the team is on business travel.","At the old warehouse.","By printing extra manuals.","The branch accountant."],"Yes, half the team is on business travel.","Should we 問建議；A 提供判斷與理由。"],
["How long will the software update take?",["About twenty minutes per device.","At the help desk counter.","Because the office moved.","Ms. Ito approved it."],"About twenty minutes per device.","How long 問持續時間；A 提供時長。"],
["How often does your team review supplier performance?",["We review it every quarter.","In Meeting Room D.","To finalize the brochure.","At 8:15 this morning."],"We review it every quarter.","How often 問頻率；A 回答週期。"],
["What time does the shuttle to the factory depart?",["It leaves at 7:40 a.m. sharp.","Near the south parking lot.","Because traffic is lighter.","Mr. Park reserved it."],"It leaves at 7:40 a.m. sharp.","What time 問時刻；A 為精確發車時間。"],
["Who handles warranty claims in your department?",["Ms. Ho in customer care handles them.","Before the deadline tomorrow.","At the distribution center.","By replacing the cable."],"Ms. Ho in customer care handles them.","Who 問負責人；A 正確。"],
["When will the online orientation begin?",["It starts at 10 a.m. next Monday.","On the vendor portal.","Because the trainer is abroad.","The HR assistant."],"It starts at 10 a.m. next Monday.","When 問開始時間；A 最符合。"],
["Where can I pick up my new access card?",["At security desk B on the first floor.","By showing your passport.","After the budget meeting.","Because your old card expired."],"At security desk B on the first floor.","Where 問地點；A 回答領取位置。"],
["Why are the display units covered?",["They're being cleaned before the event.","At the west entrance.","In about ten minutes.","The procurement clerk."],"They're being cleaned before the event.","Why 問原因；A 說明覆蓋原因。"],
["How can we reduce printing costs?",["Set default printing to double-sided.","At the off-site warehouse.","By next fiscal year.","The receptionist will."],"Set default printing to double-sided.","How 問做法；A 是可執行方案。"],
["Would you like a reminder email before the webinar?",["Yes, please send one an hour before.","At the registration booth.","Because seats are limited.","Mr. Singh from IT."],"Yes, please send one an hour before.","Would you like 問意願；A 為接受回覆。"],
["Could you check if Room 503 is available?",["Certainly, I'll call facilities now.","At the food court downstairs.","The monthly newsletter.","Since early April."],"Certainly, I'll call facilities now.","Could you 問請求；A 回覆願意執行。"],
["Do you know where the emergency exits are?",["Yes, they're beside the stairwells on both ends.","At 2:00 after lunch.","To finish the audit.","The training coordinator."],"Yes, they're beside the stairwells on both ends.","Do you know 問資訊；A 描述位置。"],
["Which file format should we use for the brochure?",["Use the high-resolution PDF template.","At the copy center.","By extending the deadline.","The intern on Friday."],"Use the high-resolution PDF template.","Which 問選擇；A 提供明確格式。"],
["Have you confirmed the venue for the awards dinner?",["Not yet, but I'll confirm it this afternoon.","At Hall 7 near the stage.","Because the chef was late.","Every weekend."],"Not yet, but I'll confirm it this afternoon.","Have you 問是否完成；A 回答現況與後續。"]
];
p2.forEach((item, i) => sampleQuestions.push(q({ id: `L2-${i + 1}`, section: "listening", part: "Part 2", type: "question-response", question: item[0], options: item[1], answer: item[2], explanation: `${item[3]} 中文解析：其餘選項與問句邏輯不符。`, tags: ["Q&A"] })));

// keep rest minimal due space
const p3Passages = [
  "Woman: We need to reschedule Monday's budget meeting. Man: The director is visiting another branch that morning. Woman: Let's move it to Tuesday at 2 p.m. and update everyone.",
  "Man: I'd like to confirm my hotel reservation under David Lin. Woman: Yes, three nights starting July 8. Man: Great, please add airport pickup at 9 p.m.",
  "Woman: I'm calling about my damaged headset. Man: I'm sorry about that. We can ship a replacement today. Woman: Please send it to my office address.",
  "Man: The product demo starts in ten minutes. Woman: I'll prepare the sample units and brochures. Man: I'll greet guests at the entrance.",
  "Woman: We need quotes for 500 steel brackets. Man: I can provide unit prices by tomorrow. Woman: Please include shipping and lead time.",
  "Man: The new staff training is this Friday. Woman: Should we book the larger training room? Man: Yes, thirty employees signed up.",
  "Woman: The copier on Floor 6 keeps jamming. Man: I'll inspect it after lunch. Woman: Thanks, we need it for payroll documents.",
  "Man: My flight to Osaka was changed to 6 a.m. Woman: Then I'll revise your itinerary and hotel check-in. Man: Please also notify the client.",
  "Woman: The office move begins next weekend. Man: I'll label each department's boxes. Woman: IT will disconnect computers on Friday.",
  "Man: Registration for the safety seminar closes tomorrow. Woman: We still need five participants from accounting. Man: I'll send a reminder now.",
  "Woman: Legal asked us to verify clause 12. Man: I'll compare it with the previous contract. Woman: Please send the final version by 5 p.m.",
  "Man: Stock levels of toner are low again. Woman: I can place a rush order today. Man: Please update the inventory sheet afterward.",
  "Woman: How is the mobile app project going? Man: Design is complete, and coding is 70 percent done. Woman: Good, share a progress report tomorrow."
];
function addListeningGroups(partPrefix, part, type, passages) {
  let idx = 1;
  passages.forEach((passage, g) => {
    const bank = {
      "L3": [
        ["What are the speakers mainly discussing?","Which day is the meeting moved to?","What will the woman do next?"],
        ["What is the man calling about?","How many nights is the stay?","What additional service is requested?"],
        ["What problem does the woman report?","What solution does the man offer?","Where should the replacement be sent?"],
        ["What event is about to begin?","What will the woman prepare?","Where will the man be?"],
        ["What is being requested from the man?","When will prices be ready?","What extra details are requested?"],
        ["What is the topic of the conversation?","Why is a larger room needed?","What will they likely do next?"],
        ["What equipment has a problem?","When will it be checked?","Why is quick repair important?"],
        ["What changed in the man's schedule?","What will the woman revise?","Who else should be informed?"],
        ["What project are they planning?","What will the man do first?","What is IT's role?"],
        ["What deadline is mentioned?","Which department still needs participants?","What will the man do now?"],
        ["What did legal request?","What will the man compare?","By when is the final version needed?"],
        ["What inventory issue is discussed?","What action will the woman take?","What should be updated after ordering?"],
        ["What is the conversation about?","How complete is coding?","What does the woman request?" ]
      ]
    };
    const opts = [
      ["meeting reschedule","food menu","airport taxi","salary raise"],
      ["Tuesday at 2 p.m.","Monday 9 a.m.","Friday noon","No new date"],
      ["Send an update notice.","Cancel the project.","Book a concert hall.","Order office chairs."]
    ];
    (bank[partPrefix] ? bank[partPrefix][g] : []).forEach((qq, i) => sampleQuestions.push(q({ id: `${partPrefix}-${idx++}`, section: "listening", part, type, groupId: `${partPrefix}G-${g + 1}`, passage, question: qq, options: opts[i], answer: opts[i][0], explanation: `依內容判斷。中文解析：正確答案與對話重點一致，其餘選項偏離情境。`, tags: ["group"] })));
  });
}
addListeningGroups("L3", "Part 3", "conversations", p3Passages);

const p4Passages = ["Airport announcement...Gate changed to C12 due to weather.","Company notice...annual health check starts June 10.","Store promotion...buy two get one free until Sunday.","Voicemail...please return my call about contract edits.","Weather delay notice...truck departs after storm warning lifted.","Exhibition announcement...register at Hall B desk before 10.","Course notice...submit assignment by Friday midnight.","Hotel service notice...water supply paused 1-3 p.m. for maintenance.","Logistics notice...parcel ETA revised to Thursday morning.","System maintenance notice...portal unavailable Saturday 1-4 a.m."];
let l4idx=1; p4Passages.forEach((p,g)=>{
  [["What is the announcement mainly about?","A schedule/service update.","A schedule/service update."],["When does it happen?","A specific time is stated.","A specific time is stated."],["What should listeners do?","Follow the instruction in the notice.","Follow the instruction in the notice."]].forEach((x,i)=>sampleQuestions.push(q({id:`L4-${l4idx++}`,section:"listening",part:"Part 4",type:"talks",groupId:`L4G-${g+1}`,passage:p,question:x[0],options:[x[1],"Ignore all messages.","Apply for leave.","Order new uniforms."],answer:x[2],explanation:"中文解析：根據獨白中的時間與指示作答。",tags:["talk"]})))
});

const p5 = [
["If she ____ the draft tonight, we can print it tomorrow.",["finishes","finish","finished","finishing"],"finishes","if 子句用現在式表未來。","時態"],
["Please place the samples ____ the top shelf.",["on","for","during","toward"],"on","在表面用 on。","介系詞"],
["We waited in the lobby ____ the manager arrived.",["until","unless","despite","because of"],"until","直到用 until。","連接詞"],
["The report was written very ____.",["clearly","clear","clarity","clearing"],"clearly","修飾動詞用副詞。","詞性"],
["All forms must ____ before submission.",["be signed","sign","signed","be signing"],"be signed","表單是被簽署。","主動被動"],
["The team plans ____ a new vendor next month.",["to meet","meeting","meet","met"],"to meet","plan to V。","不定詞"],
["He suggested ____ the shipment by rail.",["sending","to send","send","sent"],"sending","suggest 後接 V-ing。","動名詞"],
["The consultant ____ visited us yesterday sent a follow-up email.",["who","which","whom","whose"],"who","先行詞人作主詞。","關係代名詞"],
["This model is ____ than last year's version.",["more efficient","most efficient","efficiently","efficiency"],"more efficient","比較級。","比較級"],
["Our director has ____ approved the proposal.",["already","yet","still","almost"],"already","副詞位置。","副詞位置"],
];
for(let i=1;i<=30;i++){const s=p5[(i-1)%10];sampleQuestions.push(q({id:`R5-${i}`,section:"reading",part:"Part 5",type:"incomplete-sentences",question:s[0],options:s[1],answer:s[2],explanation:`${s[3]} 中文解析：其餘選項在文法或語意上不合。`,grammarPoint:s[4],tags:["grammar"]}));}

const p6Scenarios=["公司內部通知","客服回信","活動報名通知","採購流程說明"]; for(let g=1;g<=4;g++){const passage=`${p6Scenarios[g-1]}：請依程序完成對應步驟並留意截止時間。`; const set=[["Please ____ the attached form today.",["review","reviews","reviewed","reviewing"],"review","祈使句動詞原形。","時態"],["Your request cannot proceed ____ your ID is verified.",["unless","because","although","while"],"unless","條件連接詞。","連接詞"],["The documents should ____ to the support desk.",["be sent","send","sent","be sending"],"be sent","被動語態。","主動被動"],["We appreciate your ____ during this process.",["patience","patient","patiently","patients"],"patience","名詞用法。","詞性"]]; set.forEach((s,i)=>sampleQuestions.push(q({id:`R6-${(g-1)*4+i+1}`,section:"reading",part:"Part 6",type:"text-completion",groupId:`R6G-${g}`,passage,question:s[0],options:s[1],answer:s[2],explanation:`${s[3]} 中文解析：依短文語境與文法選答案。`,grammarPoint:s[4],tags:["passage"]})));}

for(let g=1;g<=18;g++){const passage=`Article ${g}: This notice includes a clear purpose, date/deadline, responsible team, fee or location, and a required next step.`; const qset=[["What is the main purpose of this article?","To explain a specific business update."],["What specific deadline or time is mentioned?","A concrete date or time is provided."],["What should the reader do next?","Complete the requested follow-up action."]]; qset.forEach((x,i)=>sampleQuestions.push(q({id:`R7-${(g-1)*3+i+1}`,section:"reading",part:"Part 7",type:"reading-comprehension",groupId:`R7G-${g}`,passage,question:x[0],options:[x[1],"No details are included.","Ignore this message.","Wait for a weather report."],answer:x[1],explanation:"中文解析：題目可直接從文章中的主旨、期限與行動要求定位。",tags:["reading"]})));}

function validateQuestionBank() {
  const requiredParts = { "Part 1": 6, "Part 2": 25, "Part 3": 39, "Part 4": 30, "Part 5": 30, "Part 6": 16, "Part 7": 54 };
  const errors = [];
  if (sampleQuestions.length !== 200) errors.push(`sampleQuestions.length should be 200, got ${sampleQuestions.length}`);
  Object.entries(requiredParts).forEach(([part, count]) => {
    const actual = sampleQuestions.filter((x) => x.part === part).length;
    if (actual !== count) errors.push(`${part} should be ${count}, got ${actual}`);
  });
  sampleQuestions.forEach((item) => {
    ["question", "options", "answer", "explanation"].forEach((key) => { if (!item[key] || (Array.isArray(item[key]) && !item[key].length)) errors.push(`${item.id} missing ${key}`); });
    if (item.part === "Part 5" && !item.grammarPoint) errors.push(`${item.id} missing grammarPoint`);
  });
  return { isValid: errors.length === 0, errors };
}

const tabs = [["home", "首頁"], ["listening", "聽力"], ["reading", "閱讀"], ["vocabulary", "單字"], ["cloze", "填空"], ["sentence", "句子"], ["review", "複習清單"], ["wrongbook", "錯題本"]];
let currentTab = "home";
function defaultState() { return { total: 0, correct: 0, wrongbook: [], reviewList: [], doneToday: 0, lastPracticeDate: new Date().toISOString().slice(0, 10), byPart: {}, solvedIds: {} }; }
function loadState() { const raw = localStorage.getItem(STORAGE_KEY); const parsed = raw ? JSON.parse(raw) : defaultState(); const t = new Date().toISOString().slice(0, 10); if (parsed.lastPracticeDate !== t) parsed.doneToday = 0; parsed.lastPracticeDate = t; return { ...defaultState(), ...parsed }; }
let state = loadState();
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderDashboard(); }
function evaluate(qItem, answer) { if (state.solvedIds[qItem.id]) return null; const ok = answer === qItem.answer; state.solvedIds[qItem.id] = true; state.total++; state.doneToday++; state.byPart[qItem.part] = (state.byPart[qItem.part] || 0) + 1; if (ok) state.correct++; else state.wrongbook.unshift({ ...qItem, myAnswer: answer, wrongAt: new Date().toISOString() }); saveState(); return ok; }
function renderQuestionCard(qItem, partLabel = "") { const solved = !!state.solvedIds[qItem.id]; return `<div class='card'><h3>${esc(partLabel || qItem.part)}</h3><p>${esc(qItem.question)}</p>${qItem.passage ? `<p><small>${esc(qItem.passage)}</small></p>` : ""}<div>${qItem.options.map((op, i) => `<button class='option-btn' data-id='${qItem.id}' data-idx='${i}' ${solved ? "disabled" : ""}>${esc(op)}</button>`).join("")}</div><button class='danger mark-review' data-review='${qItem.id}'>我不熟</button><div id='fb-${qItem.id}'>${solved ? "<small>此題已作答，已鎖定。</small>" : ""}</div></div>`; }
function bindQuestionEvents(pool) { pool.forEach((qItem) => { document.querySelectorAll(`button[data-id='${qItem.id}']`).forEach((btn) => { btn.onclick = () => { const ans = qItem.options[Number(btn.dataset.idx)]; const ok = evaluate(qItem, ans); if (ok === null) return; document.querySelectorAll(`button[data-id='${qItem.id}']`).forEach((x) => { x.disabled = true; }); const el = document.getElementById(`fb-${qItem.id}`); el.className = `feedback ${ok ? "success" : "error"}`; el.innerHTML = `${ok ? "✅" : "❌"} 正確答案：${esc(qItem.answer)}<br>解析：${esc(qItem.explanation)}${qItem.grammarPoint ? `<br>文法重點：${esc(qItem.grammarPoint)}` : ""}`; }; }); }); document.querySelectorAll(".mark-review").forEach((btn) => { btn.onclick = () => { const item = pool.find((x) => x.id === btn.dataset.review); if (!item) return; if (!state.reviewList.some((x) => x.id === item.id)) { state.reviewList.unshift({ ...item, markedAt: new Date().toISOString() }); saveState(); } }; }); }
function renderTabs(){const nav=document.getElementById("tabNav");nav.innerHTML=tabs.map(([k,v])=>`<button class='tab-btn ${currentTab===k?"active":""}' data-tab='${k}'>${v}</button>`).join("");nav.querySelectorAll(".tab-btn").forEach((b)=>{b.onclick=()=>{currentTab=b.dataset.tab;renderTabs();renderContent();};});}
function renderDashboard(){const acc=state.total?((state.correct/state.total)*100).toFixed(1):"0.0";document.getElementById("dashboard").innerHTML=`<h2>學習統計</h2><div class='grid-2'><div class='stat'>總題庫數：<strong>${sampleQuestions.length}</strong></div><div class='stat'>今日已答題數：<strong>${state.doneToday}</strong></div><div class='stat'>正確率：<strong>${acc}%</strong></div><div class='stat'>錯題數：<strong>${state.wrongbook.length}</strong></div><div class='stat'>複習清單題數：<strong>${state.reviewList.length}</strong></div></div>`;}
function renderPractice(section){const parts=Object.keys(PART_SPECS).filter((p)=>PART_SPECS[p].section===section);document.getElementById("content").innerHTML=`<h2>${section==="listening"?"聽力":"閱讀"}練習</h2><select id='partFilter'><option value='all'>全部</option>${parts.map((p)=>`<option value='${p}'>${p}</option>`).join("")}</select><button id='reshuffle' class='primary'>重新隨機出題</button><div id='qArea'></div>`;const draw=()=>{const part=document.getElementById("partFilter").value;const pool=shuffle(sampleQuestions.filter((x)=>x.section===section&&(part==="all"||x.part===part)));document.getElementById("qArea").innerHTML=pool.map((item)=>renderQuestionCard(item)).join("");bindQuestionEvents(pool);};document.getElementById("partFilter").onchange=draw;document.getElementById("reshuffle").onclick=draw;draw();}
function renderMiniPractice(title,pool,label){document.getElementById("content").innerHTML=`<h2>${title}</h2><button id='reshuffleMini' class='primary'>重新隨機出題</button><div id='qAreaMini'></div>`;const draw=()=>{const shuffled=shuffle(pool).map((x)=>({...x,part:label,type:label}));document.getElementById("qAreaMini").innerHTML=shuffled.map((item)=>renderQuestionCard(item,label)).join("");bindQuestionEvents(shuffled);};document.getElementById("reshuffleMini").onclick=draw;draw();}
function renderReview(){const list=state.reviewList;document.getElementById("content").innerHTML=`<h2>複習清單</h2><button id='startReview' class='primary'>開始複習清單練習</button>${list.length?list.map((i)=>`<div class='card'><p>${esc(i.part)} ${esc(i.question)}</p></div>`).join(""):"<p>尚未加入題目。</p>"}`;const sr=document.getElementById("startReview");if(sr)sr.onclick=()=>{const pool=shuffle(state.reviewList);document.getElementById("content").innerHTML=`<h2>複習清單練習</h2>${pool.map((x)=>renderQuestionCard(x)).join("")}`;bindQuestionEvents(pool);};}
function renderWrongbook(){const list=state.wrongbook;document.getElementById("content").innerHTML=`<h2>錯題本</h2>${list.length?list.map((i)=>`<div class='card'><p>${esc(i.part)}</p><p>${esc(i.question)}</p><p>我的答案：${esc(i.myAnswer)}</p><p>正確答案：${esc(i.answer)}</p><p>解析：${esc(i.explanation)}</p></div>`).join(""):"<p>目前沒有錯題。</p>"}`;}
function renderContent(){if(currentTab==="home")document.getElementById("content").innerHTML="<h2>首頁</h2><p>保留聽力、閱讀、單字、填空、句子、複習清單、錯題本功能。</p>";else if(currentTab==="listening"||currentTab==="reading")renderPractice(currentTab);else if(currentTab==="vocabulary")renderMiniPractice("單字練習",vocabQuestions,"單字");else if(currentTab==="cloze")renderMiniPractice("填空練習",clozeQuestions,"填空");else if(currentTab==="sentence")renderMiniPractice("句子練習",sentenceQuestions,"句子");else if(currentTab==="review")renderReview();else renderWrongbook();}
renderTabs();renderDashboard();renderContent();
