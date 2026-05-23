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

const p1 = [
["L1-1","A woman is adjusting a projector in a meeting room.",["A woman is adjusting a projector in a meeting room.","A chef is serving soup at a restaurant.","Two engineers are painting a bridge.","A clerk is closing the store early."],"畫面有投影機與會議室場景，主詞與動作吻合。"],
["L1-2","Several passengers are lining up at a boarding gate.",["Several passengers are lining up at a boarding gate.","A mechanic is repairing a bicycle tire.","Customers are dancing near a stage.","A manager is writing on a whiteboard."],"可見登機門與排隊旅客，為機場情境。"],
["L1-3","A technician is replacing a ceiling light.",["A technician is replacing a ceiling light.","Employees are unloading fruit at a market.","A couple is checking into a hotel.","A child is feeding ducks in a park."],"動作是更換燈具，且在室內維修環境。"],
["L1-4","Workers are stacking boxes in a warehouse.",["Workers are stacking boxes in a warehouse.","Students are taking a chemistry exam.","A pilot is greeting tourists.","Office staff are decorating a cake."],"關鍵是倉儲背景與堆箱動作。"],
["L1-5","A barista is handing a drink to a customer.",["A barista is handing a drink to a customer.","A nurse is checking a patient's pulse.","A driver is washing a bus.","A lawyer is signing a contract."],"咖啡吧台與遞飲料動作最符合。"],
["L1-6","A cyclist is parking a bike beside an office building.",["A cyclist is parking a bike beside an office building.","A musician is tuning a violin.","Shoppers are trying on hats.","A gardener is trimming roses."],"可見單車停放與辦公大樓外觀。"]
];
p1.forEach(([id,ans,options,exp])=>sampleQuestions.push(q({id,section:"listening",part:"Part 1",type:"photographs",question:"What is most likely happening in the picture?",options,answer:ans,explanation:`${exp} 中文解析：其餘選項與場景人物或動作不符。`})));

const p2Seeds = [
["Who approved the marketing budget?",["Ms. Rivera in accounting approved it this morning.","At the downtown branch.","By next Tuesday.","It costs around five thousand dollars."],"Ms. Rivera in accounting approved it this morning.","Who 問人，需回答人物身分。"],
["When will the maintenance team arrive?",["They are scheduled to arrive at 2:30 this afternoon.","Near the loading dock.","Because the elevator is noisy.","Mr. Chen handled it."],"They are scheduled to arrive at 2:30 this afternoon.","When 問時間。"],
["Where should we hold the orientation session?",["In Conference Room B on the second floor.","It begins after lunch.","Yes, we should.","The trainer from HR."],"In Conference Room B on the second floor.","Where 問地點。"],
["Why was the shipment delayed?",["A customs inspection took longer than expected.","At gate number four.","Tomorrow morning.","Ms. Park signed it."],"A customs inspection took longer than expected.","Why 問原因。"],
["How can I reset my account password?",["Click 'Forgot Password' and follow the email link.","At 8:00 a.m.","The IT manager.","On the third shelf."],"Click 'Forgot Password' and follow the email link.","How 問方法。"],
["Would you like me to print the handouts?",["Yes, please print thirty copies for the workshop.","At the reception desk.","I printed them yesterday at noon.","Because the ink is blue."],"Yes, please print thirty copies for the workshop.","Would you 開頭適合回應接受/婉拒。"],
["Could you send the invoice today?",["Sure, I'll email it right after this meeting.","It was in April.","At the finance lobby.","The client from Osaka."],"Sure, I'll email it right after this meeting.","Could you 表請求。"],
["Do you know if the seminar is full?",["Yes, only two seats are still available.","By train from Taipei.","On the fourth floor pantry.","Because traffic was heavy."],"Yes, only two seats are still available.","Do you know if... 需資訊回應。"],
["Which printer is connected to this laptop?",["The black one beside the filing cabinet.","Next Thursday afternoon.","Mr. Gomez installed software.","Since last winter."],"The black one beside the filing cabinet.","Which 問特定選擇。"],
["Have you finished the quarterly report?",["Not yet, but I'll complete it before 5 p.m.","On the rooftop garden.","Because finance requested it.","Ms. Lee's assistant."],"Not yet, but I'll complete it before 5 p.m.","Have you 問完成狀態。"]
];
for(let i=1;i<=25;i++){ const s=p2Seeds[(i-1)%p2Seeds.length]; sampleQuestions.push(q({id:`L2-${i}`,section:"listening",part:"Part 2",type:"question-response",question:s[0],options:[...s[1]],answer:s[2],explanation:`${s[3]} 中文解析：正確選項在語意與句型上能直接回應問句。`})); }

function addGrouped(partPrefix,countGroups,part,type,passages){
  let idx=1;
  for(let g=1;g<=countGroups;g++){
    const pg=passages[g-1];
    for(let k=1;k<=3;k++){
      const item=pg.questions[k-1];
      sampleQuestions.push(q({id:`${partPrefix}-${idx++}`,section:"listening",part,type,groupId:`${partPrefix}G-${g}`,passage:pg.passage,question:item.q,options:item.o,answer:item.a,explanation:item.e+" 中文解析：依對話/獨白細節判斷。"}));
    }
  }
}

const p3Passages = Array.from({length:13},(_,i)=>({passage:`Conversation ${i+1}: A and B discuss workplace issue #${i+1} including schedule, task owner, and follow-up action.`,questions:[
{q:"What are the speakers mainly discussing?",o:[`A schedule change for project ${i+1}.`,`A restaurant reservation.`,`A damaged product return.`,`A hiring interview.`],a:`A schedule change for project ${i+1}.`,e:"主題聚焦在時程與專案安排。"},
{q:"What will the woman do next?",o:["Update the shared calendar and notify the team.","Cancel the vendor contract immediately.","Take a day off without notice.","Move offices this weekend."],a:"Update the shared calendar and notify the team.",e:"對話提到後續動作是更新與通知。"},
{q:"Why is the deadline important?",o:["Because the client review meeting is on Friday.","Because the office closes permanently.","Because salaries are delayed.","Because travel is canceled."],a:"Because the client review meeting is on Friday.",e:"提到客戶審查會議，形成時間壓力。"}
]}));
addGrouped("L3",13,"Part 3","conversations",p3Passages);

const p4Passages = Array.from({length:10},(_,i)=>({passage:`Talk ${i+1}: This announcement covers service update #${i+1}, timing, and audience instructions.`,questions:[
{q:"What is the purpose of the announcement?",o:[`To explain service update #${i+1}.`,`To advertise a new smartphone.`,`To announce a staff party menu.","To request a tax refund.`],a:`To explain service update #${i+1}.`,e:"獨白開頭先點出公告目的。"},
{q:"When will the change take effect?",o:["At 9:00 p.m. tonight.","Last Monday morning.","At the end of next year.","No schedule is provided."],a:"At 9:00 p.m. tonight.",e:"明確給定生效時間。"},
{q:"What are listeners asked to do?",o:["Check the website and follow the updated instructions.","Ignore all email notifications.","Return their ID cards.","Call a travel agent."],a:"Check the website and follow the updated instructions.",e:"結尾提供行動指引。"}
]}));
addGrouped("L4",10,"Part 4","talks",p4Passages);

const p5 = [
["By the time the CEO arrived, the team ____ the presentation.",["had finished","has finished","finish","finishing"],"had finished","過去完成先於另一過去時間點，用過去完成式。","時態：past perfect"],
["Please place the signed contract ____ the blue folder.",["in","at","for","to"],"in","文件放在資料夾「裡面」用 in。","介系詞：in/at"],
["We postponed the launch ____ the supplier missed the deadline.",["because","although","unless","if"],"because","表示原因用 because。","連接詞：原因"],
["The new policy is both practical and ____.",["effective","effectively","effect","effectiveness"],"effective","be 動詞後接形容詞。","詞性：adjective"],
["All invoices must ____ before Friday.",["be submitted","submit","submitted","be submitting"],"be submitted","發票是被提交，用被動語態。","主被動：passive"],
["The manager decided ____ the proposal again.",["to review","reviewing","review","reviewed"],"to review","decide 後接 to V。","不定詞：decide to"],
["They avoided ____ during peak traffic hours.",["driving","to drive","drive","driven"],"driving","avoid 後接 V-ing。","動名詞：avoid V-ing"],
["The engineer ____ designed this app won an award.",["who","whom","which","whose"],"who","先行詞是人且作主詞，用 who。","關係代名詞：who"],
["This quarter's sales are ____ than last quarter's.",["higher","highest","high","more high"],"higher","兩者比較用比較級 higher。","比較級"],
["The receptionist politely ____ the visitor to wait.",["asked","ask","is asking","has ask"],"asked","副詞 politely 修飾動詞 asked。","副詞位置"],
];
for(let i=1;i<=30;i++){ const s=p5[(i-1)%p5.length]; sampleQuestions.push(q({id:`R5-${i}`,section:"reading",part:"Part 5",type:"incomplete-sentences",question:s[0],options:s[1],answer:s[2],explanation:`${s[3]} 中文解析：其餘選項在語法或語意上不成立。`,grammarPoint:s[4]})); }

for(let g=1;g<=4;g++){
  const passage=`Memo ${g}: Team members must follow updated process ${g} for request approval and reporting.`;
  const set=[
    ["Please ____ the form before 3 p.m.",["submit","submits","submitted","submitting"],"submit","祈使句動詞原形。","祈使句"],
    ["The request was rejected ____ key details were missing.",["because","however","despite","unless"],"because","因果連接詞。","連接詞"],
    ["Managers are responsible for ____ all entries.",["reviewing","review","to review","reviewed"],"reviewing","for 後接動名詞。","介系詞+Ving"],
    ["Any errors should ____ immediately.",["be corrected","correct","corrected","be correcting"],"be corrected","應被更正用被動。","被動語態"]
  ];
  set.forEach((s,i)=>sampleQuestions.push(q({id:`R6-${(g-1)*4+i+1}`,section:"reading",part:"Part 6",type:"text-completion",groupId:`R6G-${g}`,passage,question:s[0],options:s[1],answer:s[2],explanation:`${s[3]} 中文解析：依上下文選最合適語法。`,grammarPoint:s[4]})));
}

for(let g=1;g<=18;g++){
  const passage=`Article ${g}: A notice/email/report about business topic ${g}, including time, purpose, and next steps.`;
  const qs=[
    ["What is the main purpose of the text?",[`To provide information about topic ${g}.`,`To compare hotel prices.","To publish a recipe.","To request medical advice.`],`To provide information about topic ${g}.`,`主旨題看首段與關鍵句。`],
    ["What is indicated about the schedule?",["It starts at 10:00 a.m. on Monday.","It was canceled last year.","No date is mentioned.","It lasts only five minutes."],"It starts at 10:00 a.m. on Monday.","文中有明確時間線索。"],
    ["What are readers asked to do?",["Confirm participation by email.","Pay in cash at arrival.","Ignore the update.","Call after midnight."],"Confirm participation by email.","結尾行動要求通常是答案。"]
  ];
  qs.forEach((it,i)=>sampleQuestions.push(q({id:`R7-${(g-1)*3+i+1}`,section:"reading",part:"Part 7",type:"reading-comprehension",groupId:`R7G-${g}`,passage,question:it[0],options:it[1],answer:it[2],explanation:`${it[3]} 中文解析：依文章資訊定位答案。`})));
}

const tabs = [["home","首頁"],["listening","聽力"],["reading","閱讀"],["vocabulary","單字"],["cloze","填空"],["sentence","句子"],["review","複習清單"],["wrongbook","錯題本"]];
let currentTab = "home";
function defaultState(){return {total:0,correct:0,wrongbook:[],reviewList:[],doneToday:0,lastPracticeDate:new Date().toISOString().slice(0,10),byPart:{},solvedIds:{}}}
function loadState(){const raw=localStorage.getItem(STORAGE_KEY);const parsed=raw?JSON.parse(raw):defaultState();const t=new Date().toISOString().slice(0,10);if(parsed.lastPracticeDate!==t) parsed.doneToday=0;parsed.lastPracticeDate=t;return {...defaultState(),...parsed};}
let state=loadState();
const shuffle=arr=>[...arr].sort(()=>Math.random()-0.5);
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));renderDashboard();}
function evaluate(q,answer){if(state.solvedIds[q.id]) return null; const ok=answer===q.answer; state.solvedIds[q.id]=true; state.total++; state.doneToday++; state.byPart[q.part]=(state.byPart[q.part]||0)+1; if(ok) state.correct++; else state.wrongbook.unshift({...q,myAnswer:answer,wrongAt:new Date().toISOString()}); saveState(); return ok;}
function renderQuestionCard(q){ const solved=!!state.solvedIds[q.id]; return `<div class='card'><h3>${q.part}</h3><p>${esc(q.question)}</p>${q.passage?`<p><small>${esc(q.passage)}</small></p>`:""}<div>${q.options.map((op,i)=>`<button class='option-btn' data-id='${q.id}' data-idx='${i}' ${solved?"disabled":""}>${esc(op)}</button>`).join("")}</div><button class='danger mark-review' data-review='${q.id}'>我不熟</button><div id='fb-${q.id}'>${solved?"<small>此題已作答，已鎖定。</small>":""}</div></div>`; }
function bindQuestionEvents(pool){ pool.forEach(q=>document.querySelectorAll(`button[data-id='${q.id}']`).forEach(b=>b.onclick=()=>{const ans=q.options[Number(b.dataset.idx)]; const ok=evaluate(q,ans); if(ok===null)return; document.querySelectorAll(`button[data-id='${q.id}']`).forEach(x=>x.disabled=true); const el=document.getElementById(`fb-${q.id}`); el.className=`feedback ${ok?"success":"error"}`; el.innerHTML=`${ok?"✅":"❌"} 正確答案：${esc(q.answer)}<br>解析：${esc(q.explanation)}${q.grammarPoint?`<br>文法重點：${esc(q.grammarPoint)}`:""}`; })); document.querySelectorAll('.mark-review').forEach(b=>b.onclick=()=>{const q=pool.find(x=>x.id===b.dataset.review); if(!q)return; if(!state.reviewList.some(x=>x.id===q.id)){state.reviewList.unshift({...q,markedAt:new Date().toISOString()}); saveState();}})}
function renderTabs(){const nav=document.getElementById('tabNav');nav.innerHTML=tabs.map(([k,v])=>`<button class='tab-btn ${currentTab===k?"active":""}' data-tab='${k}'>${v}</button>`).join('');nav.querySelectorAll('.tab-btn').forEach(b=>b.onclick=()=>{currentTab=b.dataset.tab;renderTabs();renderContent();});}
function renderDashboard(){const acc=state.total?((state.correct/state.total)*100).toFixed(1):"0.0";document.getElementById('dashboard').innerHTML=`<h2>學習統計</h2><div class='grid-2'><div class='stat'>總題庫數：<strong>${sampleQuestions.length}</strong></div><div class='stat'>今日已答題數：<strong>${state.doneToday}</strong></div><div class='stat'>正確率：<strong>${acc}%</strong></div><div class='stat'>錯題數：<strong>${state.wrongbook.length}</strong></div><div class='stat'>複習清單題數：<strong>${state.reviewList.length}</strong></div></div>`;}
function renderPractice(section){const parts=Object.keys(PART_SPECS).filter(p=>PART_SPECS[p].section===section);document.getElementById('content').innerHTML=`<h2>${section==='listening'?'聽力':'閱讀'}練習</h2><select id='partFilter'><option value='all'>全部</option>${parts.map(p=>`<option value='${p}'>${p}</option>`).join('')}</select><button id='reshuffle' class='primary'>重新隨機出題</button><div id='qArea'></div>`; const draw=()=>{const part=document.getElementById('partFilter').value;const pool=shuffle(sampleQuestions.filter(x=>x.section===section&&(part==='all'||x.part===part)));document.getElementById('qArea').innerHTML=pool.map(renderQuestionCard).join('');bindQuestionEvents(pool)}; document.getElementById('partFilter').onchange=draw;document.getElementById('reshuffle').onclick=draw;draw();}
function renderSimple(title,text){document.getElementById('content').innerHTML=`<h2>${title}</h2><p>${text}</p>`}
function renderReview(){const list=state.reviewList;document.getElementById('content').innerHTML=`<h2>複習清單</h2><button id='startReview' class='primary'>開始複習清單練習</button>${list.length?list.map(i=>`<div class='card'><p>${esc(i.part)} ${esc(i.question)}</p></div>`).join(''):'<p>尚未加入題目。</p>'}`;const sr=document.getElementById('startReview');if(sr)sr.onclick=()=>{const pool=shuffle(state.reviewList);document.getElementById('content').innerHTML=`<h2>複習清單練習</h2>${pool.map(renderQuestionCard).join('')}`;bindQuestionEvents(pool)}}
function renderWrongbook(){const list=state.wrongbook;document.getElementById('content').innerHTML=`<h2>錯題本</h2>${list.length?list.map(i=>`<div class='card'><p>${esc(i.part)}</p><p>${esc(i.question)}</p><p>我的答案：${esc(i.myAnswer)}</p><p>正確答案：${esc(i.answer)}</p><p>解析：${esc(i.explanation)}</p></div>`).join(''):'<p>目前沒有錯題。</p>'}`}
function renderContent(){if(currentTab==='home')renderSimple('首頁','保留原本功能並新增複習清單。'); else if(currentTab==='listening'||currentTab==='reading') renderPractice(currentTab); else if(currentTab==='vocabulary') renderSimple('單字','單字頁面已保留，可搭配閱讀題重點字彙複習。'); else if(currentTab==='cloze') renderSimple('填空','填空頁面已保留，建議練習 Part 5/6。'); else if(currentTab==='sentence') renderSimple('句子','句子頁面已保留，可做句型整理。'); else if(currentTab==='review') renderReview(); else renderWrongbook();}
renderTabs();renderDashboard();renderContent();
