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

function q({ id, section, part, type, question, options, answer, explanation, translation = "", grammarPoint = "", passage = "", groupId = "", tags = [], questionTranslation = "", optionTranslations = null, optionReasons = null, image = "", imageAlt = "", imageCaption = "" }) {
  return { id, section, part, type, question, passage, image, imageAlt, imageCaption, audioUrl: "", options, answer, explanation, translation, grammarPoint, difficulty: "550-750", tags, groupId, questionTranslation, optionTranslations, optionReasons };
}

const sampleQuestions = [];
const vocabQuestions = [
  { id: "V-1", question: "procurement 最接近哪個中文意思？", options: ["採購", "申訴", "分紅", "裁員"], answer: "採購", explanation: "procurement 指企業採購流程。", translation: "procurement 的中文是「採購」。" },
  { id: "V-2", question: "deadline 最接近哪個中文意思？", options: ["截止日", "午休", "報價單", "折扣"], answer: "截止日", explanation: "deadline 表示最後期限。", translation: "deadline 的中文是「截止日」。" },
  { id: "V-3", question: "invoice 最接近哪個中文意思？", options: ["發票", "履歷", "合約", "樣品"], answer: "發票", explanation: "invoice 是請款或交易用的發票。", translation: "invoice 的中文是「發票」。" },
  { id: "V-4", question: "reschedule 最接近哪個中文意思？", options: ["改期", "取消", "確認", "轉帳"], answer: "改期", explanation: "reschedule 是重新安排時間。", translation: "reschedule 的中文是「改期」。" },
  { id: "V-5", question: "maintenance 最接近哪個中文意思？", options: ["維護", "行銷", "出貨", "面試"], answer: "維護", explanation: "maintenance 常見於設備或系統維護。", translation: "maintenance 的中文是「維護」。" }
];
const clozeQuestions = [
  { id: "C-1", question: "Please submit your report ____ Friday.", options: ["by", "from", "among", "during"], answer: "by", explanation: "by + 時間表示在截止時間前。", translation: "請在星期五前提交你的報告。" },
  { id: "C-2", question: "The manager asked us ____ the figures again.", options: ["to check", "checked", "checking", "checks"], answer: "to check", explanation: "ask 人 to V。", translation: "經理要求我們再次檢查這些數字。" },
  { id: "C-3", question: "This machine should ____ every month.", options: ["be inspected", "inspect", "inspected", "be inspecting"], answer: "be inspected", explanation: "機器是被檢查，用被動語態。", translation: "這台機器應該每個月被檢查。" },
  { id: "C-4", question: "We will start the meeting ____ everyone arrives.", options: ["once", "unless", "despite", "while"], answer: "once", explanation: "once 表示一旦、當…就…。", translation: "一旦所有人都到齊，我們就會開始會議。" },
  { id: "C-5", question: "The new branch is ____ than the old one.", options: ["larger", "largest", "large", "more large"], answer: "larger", explanation: "兩者比較用比較級 larger。", translation: "新分店比舊分店更大。" }
];
const sentenceQuestions = [
  { id: "S-1", question: "請選出正確句子。", options: ["She has worked here for five years.", "She have worked here for five years.", "She worked here since five years.", "She is work here for five years."], answer: "She has worked here for five years.", explanation: "for five years 常搭配現在完成式。", translation: "她已經在這裡工作五年了。" },
  { id: "S-2", question: "請選出最自然的商務句。", options: ["Could you send me the updated schedule?", "Could you sends me updated schedule?", "Could you sent me the update schedule?", "Could you sending me the updated schedule?"], answer: "Could you send me the updated schedule?", explanation: "情態動詞後接原形動詞 send。", translation: "你能把更新後的時程表寄給我嗎？" },
  { id: "S-3", question: "請選出正確句子。", options: ["The documents were delivered this morning.", "The documents was delivered this morning.", "The documents were deliver this morning.", "The documents delivered were this morning."], answer: "The documents were delivered this morning.", explanation: "複數主詞 documents 搭配 were delivered。", translation: "文件在今天早上已送達。" },
  { id: "S-4", question: "請選出最自然句子。", options: ["If you have questions, contact the help desk.", "If you have question, contact to the help desk.", "If you had questions, contact the help desk now yesterday.", "If you have questions, contact with the help desk to."], answer: "If you have questions, contact the help desk.", explanation: "contact 作動詞可直接接受詞。", translation: "如果你有問題，請聯絡服務台。" },
  { id: "S-5", question: "請選出正確句子。", options: ["Our team is responsible for preparing the proposal.", "Our team are responsible for prepare the proposal.", "Our team is responsible to preparing proposal.", "Our team responsible for preparing the proposal is."], answer: "Our team is responsible for preparing the proposal.", explanation: "be responsible for + V-ing。", translation: "我們團隊負責準備這份提案。" }
];

const p1 = [
  ["L1-1", "A woman is adjusting a projector in a meeting room.", ["A woman is adjusting a projector in a meeting room.", "A chef is serving soup at a restaurant.", "Two engineers are painting a bridge.", "A clerk is closing the store early."], "畫面有投影機與會議室場景，主詞與動作吻合。"],
  ["L1-2", "Several passengers are lining up at a boarding gate.", ["Several passengers are lining up at a boarding gate.", "A mechanic is repairing a bicycle tire.", "Customers are dancing near a stage.", "A manager is writing on a whiteboard."], "可見登機門與排隊旅客，為機場情境。"],
  ["L1-3", "A technician is replacing a ceiling light.", ["A technician is replacing a ceiling light.", "Employees are unloading fruit at a market.", "A couple is checking into a hotel.", "A child is feeding ducks in a park."], "動作是更換燈具，且在室內維修環境。"],
  ["L1-4", "Workers are stacking boxes in a warehouse.", ["Workers are stacking boxes in a warehouse.", "Students are taking a chemistry exam.", "A pilot is greeting tourists.", "Office staff are decorating a cake."], "關鍵是倉儲背景與堆箱動作。"],
  ["L1-5", "A barista is handing a drink to a customer.", ["A barista is handing a drink to a customer.", "A nurse is checking a patient's pulse.", "A driver is washing a bus.", "A lawyer is signing a contract."], "咖啡吧台與遞飲料動作最符合。"],
  ["L1-6", "A cyclist is parking a bike beside an office building.", ["A cyclist is parking a bike beside an office building.", "A musician is tuning a violin.", "Shoppers are trying on hats.", "A gardener is trimming roses."], "可見單車停放與辦公大樓外觀。"]
];
const p1Translations = {
  "L1-1": "一名女子正在會議室調整投影機。",
  "L1-2": "幾名旅客正在登機門前排隊。",
  "L1-3": "一名技術人員正在更換天花板燈具。",
  "L1-4": "工人正在倉庫裡堆放箱子。",
  "L1-5": "一名咖啡師正在把飲料遞給顧客。",
  "L1-6": "一名騎自行車的人正在辦公大樓旁停放腳踏車。",
};
const p1Images = {
  "L1-1": {
    image: "assets/images/part1/l1-1.jpg",
    imageAlt: "A woman is adjusting a projector in a meeting room.",
    imageCaption: "Meeting room projector setup",
  },
  "L1-2": {
    image: "assets/images/part1/l1-2.jpg",
    imageAlt: "Several passengers are lining up at a boarding gate.",
    imageCaption: "Airport boarding gate line",
  },
  "L1-3": {
    image: "assets/images/part1/l1-3.jpg",
    imageAlt: "A technician is replacing a ceiling light.",
    imageCaption: "Ceiling light maintenance",
  },
  "L1-4": {
    image: "assets/images/part1/l1-4.jpg",
    imageAlt: "Workers are stacking boxes in a warehouse.",
    imageCaption: "Warehouse box stacking",
  },
  "L1-5": {
    image: "assets/images/part1/l1-5.jpg",
    imageAlt: "A barista is handing a drink to a customer.",
    imageCaption: "Coffee counter service",
  },
  "L1-6": {
    image: "assets/images/part1/l1-6.jpg",
    imageAlt: "A cyclist is parking a bike beside an office building.",
    imageCaption: "Bicycle parking by an office building",
  },
};
p1.forEach(([id, ans, options, exp]) => sampleQuestions.push(q({ id, section: "listening", part: "Part 1", type: "photographs", question: "What is most likely happening in the picture?", options, answer: ans, explanation: `${exp} 中文解析：其餘選項與場景人物或動作不符。`, translation: p1Translations[id], tags: ["photo"], ...p1Images[id] })));

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
const p2Translations = {
  "L2-1": "誰會主持明天的產品展示？",
  "L2-2": "客戶合約什麼時候到期？",
  "L2-3": "參加研討會的訪客應該在哪裡報到？",
  "L2-4": "客服團隊為什麼把這張支援單升級處理？",
  "L2-5": "我要如何申請差旅費報銷？",
  "L2-6": "你介意關上會議室的窗戶嗎？",
  "L2-7": "你能把發票重新寄成 PDF 檔嗎？",
  "L2-8": "你知道停車場是否已經滿了嗎？",
  "L2-9": "董事會核准了哪一份提案？",
  "L2-10": "你已經提交每月庫存報告了嗎？",
  "L2-11": "我能把行李箱放在接待區嗎？",
  "L2-12": "我們應該延後訓練課程嗎？",
  "L2-13": "軟體更新需要多久？",
  "L2-14": "你們團隊多久檢討一次供應商表現？",
  "L2-15": "前往工廠的接駁車幾點出發？",
  "L2-16": "你們部門由誰處理保固索賠？",
  "L2-17": "線上新進人員說明會什麼時候開始？",
  "L2-18": "我可以在哪裡領取新的門禁卡？",
  "L2-19": "為什麼展示機被蓋住了？",
  "L2-20": "我們要如何降低列印成本？",
  "L2-21": "你想在網路研討會前收到提醒電子郵件嗎？",
  "L2-22": "你能確認 503 會議室是否有空嗎？",
  "L2-23": "你知道緊急出口在哪裡嗎？",
  "L2-24": "我們應該用哪種檔案格式製作手冊？",
  "L2-25": "你已經確認頒獎晚宴的場地了嗎？",
};
p2.forEach((item, i) => {
  const id = `L2-${i + 1}`;
  sampleQuestions.push(q({ id, section: "listening", part: "Part 2", type: "question-response", question: item[0], options: item[1], answer: item[2], explanation: `${item[3]} 中文解析：其餘選項與問句邏輯不符。`, translation: p2Translations[id], tags: ["Q&A"] }));
});

// keep rest minimal due space
const p3Groups = [
  {
    passage: "Woman: We need to reschedule Monday's budget meeting. Man: The director is visiting the Kaohsiung branch that morning. Woman: Then let's move the meeting to Tuesday at 2 p.m. and notify finance.",
    items: [
      ["Why are the speakers changing the meeting schedule?", ["The director will be out of the office on Monday.", "The budget file was deleted.", "The conference room is under repair for a week.", "Finance requested a larger meeting room."], "The director will be out of the office on Monday.", "男方說主管週一上午要去高雄分公司，因此無法原時間開會。其他選項未在對話出現。"],
      ["When will the meeting take place?", ["Tuesday at 2 p.m.", "Monday at 2 p.m.", "Tuesday at 10 a.m.", "Friday at 2 p.m."], "Tuesday at 2 p.m.", "女方明確提議改到週二下午兩點。其餘時間與對話不符。"],
      ["What will the woman probably do next?", ["Inform the finance team about the new schedule.", "Book train tickets to Kaohsiung.", "Prepare the annual report alone.", "Cancel the meeting completely."], "Inform the finance team about the new schedule.", "她提到要通知 finance，代表下一步是發出改期通知。"],
    ],
  },
  {
    passage: "Man: Hello, I'd like to confirm my reservation at Harbor Hotel. Woman: Certainly, Mr. Wu. You have a room for three nights starting July 8. Man: Great. Could you also arrange airport pickup at 9 p.m.?",
    items: [
      ["What is the man calling about?", ["A hotel reservation", "A restaurant complaint", "A delayed shipment", "A visa application"], "A hotel reservation", "男方一開始就說要確認在飯店的預訂。其他選項與內容無關。"],
      ["How long will the man stay?", ["Three nights", "One night", "Five nights", "One week"], "Three nights", "女方確認住宿為三晚。其餘天數不正確。"],
      ["What additional request does the man make?", ["Airport pickup at 9 p.m.", "Late checkout at 6 p.m.", "A room upgrade with no fee", "Breakfast for two guests"], "Airport pickup at 9 p.m.", "男方補充要求九點的機場接送服務。其餘服務未被提及。"],
    ],
  },
  {
    passage: "Woman: I'm calling because the headset I received is damaged. Man: I'm sorry to hear that. We can ship a replacement this afternoon. Woman: Thanks. Please send it to my office address.",
    items: [
      ["What problem does the woman report?", ["She received a damaged headset.", "She forgot her account password.", "She was charged twice.", "She got the wrong invoice date."], "She received a damaged headset.", "女方明確表示收到的耳機有損壞。其他問題未出現。"],
      ["What solution does the man offer?", ["Send a replacement today", "Issue a full refund only", "Dispatch a technician next month", "Cancel all future orders"], "Send a replacement today", "男方提出當天下午補寄新品。其餘做法不是對話內容。"],
      ["Where should the replacement be delivered?", ["To the woman's office", "To a convenience store", "To the company's warehouse", "To the airport counter"], "To the woman's office", "女方要求寄到辦公室地址。"],
    ],
  },
  {
    passage: "Man: The product demonstration starts in ten minutes. Woman: I'll set up the sample units and brochures now. Man: Perfect. I'll greet visitors at the entrance.",
    items: [
      ["What event are the speakers preparing for?", ["A product demonstration", "A press interview", "A safety inspection", "A budget meeting"], "A product demonstration", "男方第一句指出產品展示即將開始。"],
      ["What will the woman do?", ["Prepare samples and brochures", "Print employee ID cards", "Call the delivery driver", "Check hotel bookings"], "Prepare samples and brochures", "女方說她要布置樣品與型錄。"],
      ["Where will the man be?", ["At the entrance", "In the storage room", "At the cashier desk", "On the loading dock"], "At the entrance", "男方表示他會在入口迎接來賓。"],
    ],
  },
  {
    passage: "Woman: We need quotations for 500 steel brackets. Man: I can send unit prices by tomorrow morning. Woman: Please include shipping fees and lead time in the quote.",
    items: [
      ["What does the woman request?", ["Quotations for steel brackets", "A revised training schedule", "An updated payroll list", "A conference venue booking"], "Quotations for steel brackets", "女方要求 500 個鋼製支架的報價。"],
      ["When will the man provide pricing?", ["By tomorrow morning", "By the end of this month", "This afternoon", "Next week"], "By tomorrow morning", "男方明確說明明早提供單價。"],
      ["What additional information is needed?", ["Shipping fees and lead time", "Tax refund documents", "Insurance policy numbers", "Product photos only"], "Shipping fees and lead time", "女方補充要運費與交期資訊。"],
    ],
  },
  {
    passage: "Man: The new employee training is this Friday. Woman: Should we reserve the larger training room? Man: Yes, because thirty employees registered.",
    items: [
      ["What are the speakers discussing?", ["An employee training session", "A client dinner", "A software outage", "A contract renewal"], "An employee training session", "對話圍繞新進員工訓練安排。"],
      ["Why do they need a larger room?", ["Many employees signed up", "The projector is missing", "The original room is closed permanently", "The trainer requested outdoor seating"], "Many employees signed up", "男方指出已有 30 人報名，所以需要較大教室。"],
      ["When is the training scheduled?", ["This Friday", "Tomorrow morning", "Next Monday", "At the end of the quarter"], "This Friday", "男方第一句直接給出時間是本週五。"],
    ],
  },
  {
    passage: "Woman: The copier on Floor 6 keeps jamming. Man: I'll inspect it right after lunch. Woman: Thanks, we need it to print payroll documents today.",
    items: [
      ["What equipment problem is mentioned?", ["A copier keeps jamming", "A scanner cannot connect to Wi-Fi", "A projector lamp is broken", "A laptop battery is swollen"], "A copier keeps jamming", "女方指出六樓影印機一直卡紙。"],
      ["When will the man check the machine?", ["After lunch", "Before 9 a.m.", "Tomorrow evening", "Next week"], "After lunch", "男方說午餐後立刻檢查。"],
      ["Why is quick repair important?", ["Payroll documents must be printed today.", "A customer tour starts now.", "The office is moving tonight.", "The copier lease expires today."], "Payroll documents must be printed today.", "女方補充今天要印薪資文件，因此維修有急迫性。"],
    ],
  },
  {
    passage: "Man: My flight to Osaka was changed to 6 a.m. Woman: Then I'll revise your itinerary and hotel check-in time. Man: Please also notify the client about the earlier arrival.",
    items: [
      ["What changed in the man's travel plan?", ["His flight now departs at 6 a.m.", "His destination changed to Tokyo.", "His hotel reservation was canceled.", "His passport expired."], "His flight now departs at 6 a.m.", "男方說航班改為早上六點。其餘資訊未提及。"],
      ["What will the woman update?", ["The itinerary and hotel check-in time", "The annual budget report", "The product catalog", "The training attendance sheet"], "The itinerary and hotel check-in time", "女方表示會更新行程與入住時間。"],
      ["Who else needs to be informed?", ["The client", "The building manager", "The courier company", "The accounting intern"], "The client", "男方最後要求也要通知客戶。"],
    ],
  },
  {
    passage: "Woman: The office move starts next weekend. Man: I'll label each department's boxes this Thursday. Woman: Great. IT will disconnect all computers on Friday evening.",
    items: [
      ["What project are the speakers planning?", ["An office relocation", "A product launch", "A tax audit", "A vendor exhibition"], "An office relocation", "對話主題是辦公室搬遷。"],
      ["What task will the man handle?", ["Label department boxes", "Book moving trucks", "Install computers", "Prepare welcome gifts"], "Label department boxes", "男方說會先標示各部門箱子。"],
      ["What will IT do?", ["Disconnect computers on Friday evening", "Set up desks on Thursday morning", "Deliver boxes to a branch", "Approve moving expenses"], "Disconnect computers on Friday evening", "女方說 IT 週五晚間會拔除電腦設備。"],
    ],
  },
  {
    passage: "Man: Registration for the safety seminar closes tomorrow at 5 p.m. Woman: We still need five people from accounting. Man: I'll send a reminder to that department this afternoon.",
    items: [
      ["What deadline is mentioned?", ["Seminar registration closes tomorrow at 5 p.m.", "Payroll submission closes tonight", "Hotel booking closes this morning", "Contract review closes next week"], "Seminar registration closes tomorrow at 5 p.m.", "男方指出安全講座報名截止時間。"],
      ["Which department still needs participants?", ["Accounting", "Sales", "Human Resources", "Legal"], "Accounting", "女方提到會計部還差五位人員。"],
      ["What will the man do next?", ["Send a reminder email", "Cancel the seminar", "Reserve a larger hall", "Print name cards"], "Send a reminder email", "男方表示下午就會發提醒通知。"],
    ],
  },
  {
    passage: "Woman: Legal asked us to verify clause 12 in the draft. Man: I'll compare it with the previous contract. Woman: Please send the final version by 5 p.m. today.",
    items: [
      ["What did legal request?", ["Verification of clause 12", "A new marketing plan", "An urgent hiring request", "A warehouse inspection"], "Verification of clause 12", "女方說法務要求確認第 12 條。"],
      ["What will the man compare?", ["The draft with the previous contract", "Two shipping invoices", "Three vendor brochures", "Old employee records"], "The draft with the previous contract", "男方表示要和舊合約比對。"],
      ["By when is the final version needed?", ["By 5 p.m. today", "By noon tomorrow", "By the end of the week", "No deadline is given"], "By 5 p.m. today", "女方給出明確期限是今天五點前。"],
    ],
  },
  {
    passage: "Man: Our toner stock is low again. Woman: I can place a rush order this afternoon. Man: Thanks. Please update the inventory sheet after ordering.",
    items: [
      ["What inventory issue is discussed?", ["Toner stock is running low", "Paper clips are overstocked", "Printers were returned", "Warehouse shelves are broken"], "Toner stock is running low", "男方指出碳粉存量不足。"],
      ["What action will the woman take?", ["Place a rush order today", "Cancel all printing tasks", "Request budget cuts", "Move stock to another city"], "Place a rush order today", "女方表示今天下午會加急下單。"],
      ["What should be done after ordering?", ["Update the inventory sheet", "Notify hotel reception", "Submit travel expenses", "Print training manuals"], "Update the inventory sheet", "男方要求下單後更新庫存表。"],
    ],
  },
  {
    passage: "Woman: How is the mobile app project going? Man: Design is complete, and coding is about 70 percent finished. Woman: Good. Please send me a progress report by tomorrow noon.",
    items: [
      ["What project are they talking about?", ["A mobile app project", "A branch relocation", "A customer refund case", "A delivery route change"], "A mobile app project", "女方開頭直接詢問手機 App 專案進度。"],
      ["How much coding is complete?", ["About 70 percent", "About 30 percent", "Fully complete", "Coding has not started"], "About 70 percent", "男方明確說開發完成約七成。"],
      ["What does the woman request?", ["A progress report by tomorrow noon", "A new design mockup by tonight", "A meeting cancellation notice", "A budget increase request"], "A progress report by tomorrow noon", "女方要求明天中午前提交進度報告。"],
    ],
  },
];

let l3idx = 1;
const p3Translations = {
  "L3G-1": "女：我們需要把週一的預算會議改期。男：主管那天早上要去高雄分公司。女：那我們改到週二下午兩點，並通知財務部。",
  "L3G-2": "男：你好，我想確認我在 Harbor 飯店的預訂。女：當然可以，吳先生。您從 7 月 8 日開始預訂了三晚客房。男：太好了，也請幫我安排晚上九點的機場接送。",
  "L3G-3": "女：我打來是因為我收到的耳機有損壞。男：很抱歉聽到這件事，我們今天下午可以寄出替換品。女：謝謝，請寄到我的辦公室地址。",
  "L3G-4": "男：產品展示十分鐘後開始。女：我現在就去擺好樣品和型錄。男：很好，我會在入口迎接來賓。",
  "L3G-5": "女：我們需要 500 個鋼製支架的報價。男：我明天早上可以提供單價。女：請在報價中加入運費和交期。",
  "L3G-6": "男：新進員工訓練在這週五。女：我們要不要預訂比較大的訓練教室？男：要，因為有三十位員工報名。",
  "L3G-7": "女：六樓的影印機一直卡紙。男：我午餐後會立刻去檢查。女：謝謝，我們今天要用它印薪資文件。",
  "L3G-8": "男：我飛大阪的班機改到早上六點。女：那我會更新你的行程和飯店入住時間。男：也請通知客戶我會更早抵達。",
  "L3G-9": "女：辦公室搬遷下週末開始。男：我這週四會幫各部門的箱子貼標籤。女：很好，IT 會在週五晚上拔除所有電腦設備。",
  "L3G-10": "男：安全講座報名明天下午五點截止。女：我們還缺會計部五位人員。男：我今天下午會寄提醒給那個部門。",
  "L3G-11": "女：法務要我們確認草案中的第 12 條。男：我會和前一版合約比對。女：請在今天下午五點前把最終版本給我。",
  "L3G-12": "男：我們的碳粉庫存又不夠了。女：我今天下午可以下加急訂單。男：謝謝，下單後請更新庫存表。",
  "L3G-13": "女：手機 App 專案進度如何？男：設計已完成，程式開發約完成七成。女：很好，請在明天中午前寄給我進度報告。",
};
p3Groups.forEach((group, gi) => {
  group.items.forEach((item) => {
    const groupId = `L3G-${gi + 1}`;
    sampleQuestions.push(q({
      id: `L3-${l3idx++}`,
      section: "listening",
      part: "Part 3",
      type: "conversations",
      groupId,
      passage: group.passage,
      question: item[0],
      options: item[1],
      answer: item[2],
      explanation: `${item[3]} 中文解析：依對話關鍵資訊判斷正確答案。`,
      translation: p3Translations[groupId],
      tags: ["conversation"],
    }));
  });
});

const p4Groups = [
  {
    passage: "Airport announcement: Flight JT328 to Busan is delayed until 7:45 p.m. due to heavy rain. Passengers are asked to remain near Gate C12 for the next update.",
    items: [
      ["What is the announcement about?", ["A delayed flight to Busan", "A gate closure for maintenance", "A baggage claim error", "A passport control change"], "A delayed flight to Busan", "廣播說明飛往釜山的 JT328 航班延誤。"],
      ["Why is the flight delayed?", ["Heavy rain", "A staffing shortage", "A mechanical inspection", "A late pilot"], "Heavy rain", "原因句明確指出是因大雨延誤。"],
      ["What should passengers do?", ["Wait near Gate C12", "Go to Gate A1 immediately", "Collect luggage now", "Leave the airport"], "Wait near Gate C12", "廣播要求旅客在 C12 附近等候更新。"],
    ],
  },
  {
    passage: "Company notice: The annual health check program begins on June 10. All employees must reserve a time slot through the HR portal by June 5.",
    items: [
      ["What program is being announced?", ["Annual health checks", "A language training course", "A new bonus policy", "An office relocation"], "Annual health checks", "公告主旨是年度健康檢查。"],
      ["What is the reservation deadline?", ["June 5", "June 10", "May 31", "June 20"], "June 5", "文中寫明需在 6/5 前完成預約。"],
      ["How should employees reserve a slot?", ["Through the HR portal", "By phone to accounting", "At the reception counter", "By paper form only"], "Through the HR portal", "公告指定透過 HR 系統預約。"],
    ],
  },
  {
    passage: "Store promotion broadcast: This weekend only, buy two notebooks and get one free at BrightMart. The offer is valid until Sunday 9 p.m. at all city branches.",
    items: [
      ["What is the promotion?", ["Buy two notebooks, get one free", "50% off all electronics", "Free delivery for furniture", "A free coffee with any purchase"], "Buy two notebooks, get one free", "促銷內容是筆記本買二送一。"],
      ["How long is the promotion valid?", ["Until Sunday 9 p.m.", "Until Friday noon", "For one month", "Only today"], "Until Sunday 9 p.m.", "廣播給出截止時間為週日晚上九點。"],
      ["Where can customers use this offer?", ["At all city branches", "Only at the airport branch", "Online only", "At the warehouse outlet only"], "At all city branches", "公告說明活動適用所有市區分店。"],
    ],
  },
  {
    passage: "Voicemail: Hi Ms. Lin, this is Eric from Nova Legal. We revised section 4 of your contract. Please call me back before 4 p.m. so we can submit the final copy today.",
    items: [
      ["Who left the voicemail?", ["Eric from Nova Legal", "Ms. Lin from finance", "A courier driver", "The hotel manager"], "Eric from Nova Legal", "留言開頭自我介紹為 Nova Legal 的 Eric。"],
      ["What was revised?", ["Section 4 of the contract", "The shipping invoice", "The staff schedule", "The project budget"], "Section 4 of the contract", "留言指出已修改合約第 4 條。"],
      ["By when should Ms. Lin call back?", ["Before 4 p.m.", "Before noon tomorrow", "By the end of the week", "No callback is needed"], "Before 4 p.m.", "對方要求四點前回電以便當天送件。"],
    ],
  },
  {
    passage: "Weather delay notice: Due to a thunderstorm warning, truck route B will depart at 3:30 p.m. instead of 1:00 p.m. Drivers should check road updates on the logistics app every 30 minutes.",
    items: [
      ["Why is truck route B delayed?", ["A thunderstorm warning", "A fuel shortage", "A customs inspection", "A driver strike"], "A thunderstorm warning", "通知說因雷雨警報而延後發車。"],
      ["What is the new departure time?", ["3:30 p.m.", "1:00 p.m.", "2:00 p.m.", "5:30 p.m."], "3:30 p.m.", "新時間明確改為下午 3:30。"],
      ["What are drivers asked to do?", ["Check the logistics app every 30 minutes", "Return to headquarters immediately", "Call customers one by one", "Switch to route C"], "Check the logistics app every 30 minutes", "通知要求駕駛每 30 分鐘查看路況更新。"],
    ],
  },
  {
    passage: "Exhibition announcement: The Smart Factory Expo opens at 10 a.m. in Hall B. Visitors who registered online must pick up badges at Counter 6 before entering the keynote session.",
    items: [
      ["Where is the expo held?", ["In Hall B", "In Hall D", "At Counter 6", "On the second floor lobby"], "In Hall B", "第一句說明展覽地點在 Hall B。"],
      ["When does the expo open?", ["At 10 a.m.", "At 9 a.m.", "At noon", "At 3 p.m."], "At 10 a.m.", "公告明確給出開展時間。"],
      ["What must online registrants do first?", ["Pick up badges at Counter 6", "Pay the fee at Hall D", "Submit resumes", "Join the keynote directly"], "Pick up badges at Counter 6", "進場前需先至 6 號櫃台領取識別證。"],
    ],
  },
  {
    passage: "Course notice: The advanced Excel class will be held online this Thursday at 7 p.m. Participants should download the sample workbook from the training portal before class.",
    items: [
      ["What course is mentioned?", ["An advanced Excel class", "A public speaking workshop", "A beginner coding camp", "A design seminar"], "An advanced Excel class", "公告主題是進階 Excel 課程。"],
      ["When will the class take place?", ["This Thursday at 7 p.m.", "This Tuesday at 9 a.m.", "Friday at noon", "Next Monday evening"], "This Thursday at 7 p.m.", "時間資訊在第一句已明確說明。"],
      ["What should participants do before class?", ["Download the sample workbook", "Submit a printed report", "Reserve a classroom seat", "Install a new printer"], "Download the sample workbook", "公告要求課前先下載範例檔。"],
    ],
  },
  {
    passage: "Hotel service notice: Water supply on floors 12 to 15 will be suspended from 1 p.m. to 3 p.m. today for pipe maintenance. Guests may use shower rooms on floor 5 during that period.",
    items: [
      ["Which floors are affected by the maintenance?", ["Floors 12 to 15", "Floors 1 to 3", "Only floor 5", "All floors"], "Floors 12 to 15", "通知指出 12 到 15 樓停水維修。"],
      ["How long will the suspension last?", ["Two hours", "One hour", "Three hours", "All day"], "Two hours", "時間從 1 點到 3 點，共兩小時。"],
      ["What alternative is offered to guests?", ["Use shower rooms on floor 5", "Move to another hotel", "Request refunds at reception", "Use gym lockers"], "Use shower rooms on floor 5", "公告提供 5 樓淋浴間作替代方案。"],
    ],
  },
  {
    passage: "Logistics update: Parcel batch KX-77 is expected to arrive Thursday morning, not Wednesday evening. Receiving staff should prepare Dock 2 and update the unloading schedule.",
    items: [
      ["What changed in the delivery schedule?", ["Arrival moved to Thursday morning", "Delivery moved to Tuesday night", "Batch KX-77 was canceled", "Only half the parcels will arrive"], "Arrival moved to Thursday morning", "通知說由週三晚改為週四早上到貨。"],
      ["Which batch is mentioned?", ["KX-77", "AB-19", "MZ-04", "TR-88"], "KX-77", "文中直接標示批次編號為 KX-77。"],
      ["What should receiving staff do?", ["Prepare Dock 2 and update the schedule", "Send parcels back to the vendor", "Notify hotel reception", "Print billing statements"], "Prepare Dock 2 and update the schedule", "公告要求收貨人員準備 2 號碼頭並更新卸貨時程。"],
    ],
  },
  {
    passage: "System maintenance notice: The employee portal will be unavailable from 1 a.m. to 4 a.m. this Saturday for security upgrades. Please submit leave requests before midnight Friday.",
    items: [
      ["Why will the portal be unavailable?", ["Security upgrades", "A network outage caused by weather", "A hardware delivery delay", "A payroll error"], "Security upgrades", "通知說明停機原因是安全升級。"],
      ["When is the maintenance window?", ["Saturday 1 a.m. to 4 a.m.", "Friday 1 p.m. to 4 p.m.", "Saturday 4 a.m. to 8 a.m.", "Sunday midnight to 3 a.m."], "Saturday 1 a.m. to 4 a.m.", "維護時段在公告中明確列出。"],
      ["What should employees do in advance?", ["Submit leave requests before Friday midnight", "Change passwords at reception", "Print all payroll records", "Avoid using email all week"], "Submit leave requests before Friday midnight", "公告要求週五午夜前先送出請假申請。"],
    ],
  },
];

let l4idx = 1;
const p4Translations = {
  "L4G-1": "機場公告：飛往釜山的 JT328 航班因豪雨延誤至晚上 7 點 45 分。請旅客留在 C12 登機門附近，等候下一次更新。",
  "L4G-2": "公司公告：年度健康檢查計畫將於 6 月 10 日開始。所有員工必須在 6 月 5 日前透過 HR 入口網站預約時段。",
  "L4G-3": "門市促銷廣播：僅限本週末，BrightMart 筆記本買二送一。此優惠在所有市區分店有效至週日晚上 9 點。",
  "L4G-4": "語音留言：林小姐您好，我是 Nova Legal 的 Eric。我們已修改您合約的第 4 條。請在下午 4 點前回電，以便我們今天提交最終版本。",
  "L4G-5": "天候延誤通知：因雷雨警報，B 路線卡車將由下午 1 點改為下午 3 點 30 分發車。駕駛請每 30 分鐘在物流 App 查看路況更新。",
  "L4G-6": "展覽公告：智慧工廠博覽會將於上午 10 點在 B 館開幕。已線上報名的來賓，進入主題演講前須先到 6 號櫃台領取識別證。",
  "L4G-7": "課程通知：進階 Excel 課程將於本週四晚上 7 點線上舉行。參加者請在上課前先至訓練入口網站下載範例活頁簿。",
  "L4G-8": "飯店服務公告：今日下午 1 點至 3 點，12 到 15 樓將因管線維修暫停供水。住客可於該時段使用 5 樓淋浴間。",
  "L4G-9": "物流更新：KX-77 批次包裹預計於週四早上到達，而非週三晚上。收貨人員請準備 2 號碼頭並更新卸貨時程。",
  "L4G-10": "系統維護通知：本週六凌晨 1 點至 4 點，員工入口網站將因安全升級而暫停服務。請在週五午夜前提交請假申請。",
};
const p4QuestionTranslations = {};
const p4OptionTranslations = {};
const p4OptionReasons = {};
p4Groups.forEach((group, gi) => {
  group.items.forEach((item, qi) => {
    const id = `L4-${gi * 3 + qi + 1}`;
    p4QuestionTranslations[id] = "";
    p4OptionTranslations[id] = [];
    p4OptionReasons[id] = [];

    if (id === "L4-1") {
      p4QuestionTranslations[id] = "這則廣播是關於什麼？";
      p4OptionTranslations[id] = ["飛往釜山的航班延誤。", "登機門因維修而關閉。", "行李領取發生錯誤。", "護照查驗流程改變。"];
      p4OptionReasons[id] = ["正確，廣播說 JT328 飛往釜山的航班延誤。", "錯誤，廣播沒有說登機門維修或關閉。", "錯誤，廣播沒有提到行李領取問題。", "錯誤，廣播沒有提到護照查驗流程改變。"];
    }
    if (id === "L4-2") {
      p4QuestionTranslations[id] = "航班為什麼延誤？";
      p4OptionTranslations[id] = ["豪雨。", "人手不足。", "機械檢查。", "機師遲到。"];
      p4OptionReasons[id] = ["正確，廣播明確說延誤原因是豪雨。", "錯誤，廣播沒有提到人手不足。", "錯誤，廣播沒有提到機械檢查。", "錯誤，廣播沒有提到機師遲到。"];
    }
    if (id === "L4-3") {
      p4QuestionTranslations[id] = "乘客應該怎麼做？";
      p4OptionTranslations[id] = ["在 C12 登機門附近等候。", "立刻前往 A1 登機門。", "現在領取行李。", "離開機場。"];
      p4OptionReasons[id] = ["正確，廣播要求乘客留在 C12 登機門附近等候更新。", "錯誤，廣播沒有要求前往 A1 登機門。", "錯誤，廣播沒有要求領取行李。", "錯誤，廣播要求乘客留在原處，不是離開機場。"];
    }
    if (id === "L4-4") {
      p4QuestionTranslations[id] = "公告正在宣布什麼計畫？";
      p4OptionTranslations[id] = ["年度健康檢查。", "語言訓練課程。", "新的獎金政策。", "辦公室搬遷。"];
      p4OptionReasons[id] = ["正確，公告說年度健康檢查計畫將於 6 月 10 日開始。", "錯誤，公告沒有提到語言訓練課程。", "錯誤，公告沒有提到獎金政策。", "錯誤，公告沒有提到辦公室搬遷。"];
    }
    if (id === "L4-5") {
      p4QuestionTranslations[id] = "預約截止日是什麼時候？";
      p4OptionTranslations[id] = ["6 月 5 日。", "6 月 10 日。", "5 月 31 日。", "6 月 20 日。"];
      p4OptionReasons[id] = ["正確，公告說員工必須在 6 月 5 日前完成預約。", "錯誤，6 月 10 日是計畫開始日，不是預約截止日。", "錯誤，公告沒有提到 5 月 31 日。", "錯誤，公告沒有提到 6 月 20 日。"];
    }
    if (id === "L4-6") {
      p4QuestionTranslations[id] = "員工應該如何預約時段？";
      p4OptionTranslations[id] = ["透過 HR 入口網站。", "打電話給會計部。", "在接待櫃台辦理。", "只能用紙本表單。"];
      p4OptionReasons[id] = ["正確，公告指定員工透過 HR 入口網站預約。", "錯誤，公告沒有要求打電話給會計部。", "錯誤，公告沒有要求到接待櫃台辦理。", "錯誤，公告沒有說只能用紙本表單。"];
    }
    if (id === "L4-7") {
      p4QuestionTranslations[id] = "這項促銷活動是什麼？";
      p4OptionTranslations[id] = ["筆記本買二送一。", "所有電子產品五折。", "家具免費配送。", "任意消費贈送免費咖啡。"];
      p4OptionReasons[id] = ["正確，廣播說 BrightMart 筆記本買二送一。", "錯誤，廣播沒有提到電子產品五折。", "錯誤，廣播沒有提到家具免費配送。", "錯誤，廣播沒有提到贈送咖啡。"];
    }
    if (id === "L4-8") {
      p4QuestionTranslations[id] = "這項促銷活動有效到什麼時候？";
      p4OptionTranslations[id] = ["到週日晚上 9 點。", "到週五中午。", "為期一個月。", "只限今天。"];
      p4OptionReasons[id] = ["正確，廣播說優惠有效到週日晚上 9 點。", "錯誤，廣播沒有說週五中午截止。", "錯誤，廣播說只限本週末，不是為期一個月。", "錯誤，廣播說本週末限定，不是只限今天。"];
    }
    if (id === "L4-9") {
      p4QuestionTranslations[id] = "顧客在哪裡能享有這項優惠？";
      p4OptionTranslations[id] = ["所有市區分店。", "只限機場分店。", "只限線上。", "只限倉庫暢貨中心。"];
      p4OptionReasons[id] = ["正確，廣播說優惠適用於所有市區分店。", "錯誤，廣播沒有說只限機場分店。", "錯誤，廣播沒有說只限線上。", "錯誤，廣播沒有提到倉庫暢貨中心。"];
    }
    if (id === "L4-10") {
      p4QuestionTranslations[id] = "是誰留下這通語音留言？";
      p4OptionTranslations[id] = ["Nova Legal 的 Eric。", "財務部的林小姐。", "一名快遞司機。", "飯店經理。"];
      p4OptionReasons[id] = ["正確，留言開頭說話者自我介紹為 Nova Legal 的 Eric。", "錯誤，林小姐是收件人，不是留言者。", "錯誤，留言沒有提到快遞司機。", "錯誤，留言沒有提到飯店經理。"];
    }
    if (id === "L4-11") {
      p4QuestionTranslations[id] = "什麼內容被修改了？";
      p4OptionTranslations[id] = ["合約第 4 條。", "出貨發票。", "員工班表。", "專案預算。"];
      p4OptionReasons[id] = ["正確，留言明確說已修改合約第 4 條。", "錯誤，留言沒有提到出貨發票。", "錯誤，留言沒有提到員工班表。", "錯誤，留言沒有提到專案預算。"];
    }
    if (id === "L4-12") {
      p4QuestionTranslations[id] = "林小姐應該在什麼時候前回電？";
      p4OptionTranslations[id] = ["下午 4 點前。", "明天中午前。", "本週結束前。", "不需要回電。"];
      p4OptionReasons[id] = ["正確，Eric 要求林小姐在下午 4 點前回電。", "錯誤，留言沒有說明天中午前。", "錯誤，留言沒有說本週結束前。", "錯誤，留言明確要求回電。"];
    }
    if (id === "L4-13") {
      p4QuestionTranslations[id] = "B 路線卡車為什麼延誤？";
      p4OptionTranslations[id] = ["雷雨警報。", "燃料短缺。", "海關檢查。", "司機罷工。"];
      p4OptionReasons[id] = ["正確，通知說因雷雨警報而延後發車。", "錯誤，通知沒有提到燃料短缺。", "錯誤，通知沒有提到海關檢查。", "錯誤，通知沒有提到司機罷工。"];
    }
    if (id === "L4-14") {
      p4QuestionTranslations[id] = "新的出發時間是什麼時候？";
      p4OptionTranslations[id] = ["下午 3 點 30 分。", "下午 1 點。", "下午 2 點。", "下午 5 點 30 分。"];
      p4OptionReasons[id] = ["正確，通知明確說 B 路線卡車改為下午 3 點 30 分發車。", "錯誤，下午 1 點是原本的出發時間。", "錯誤，通知沒有提到下午 2 點發車。", "錯誤，通知沒有提到下午 5 點 30 分發車。"];
    }
    if (id === "L4-15") {
      p4QuestionTranslations[id] = "司機被要求做什麼？";
      p4OptionTranslations[id] = ["每 30 分鐘查看物流 App。", "立即返回總部。", "逐一打電話給客戶。", "改走 C 路線。"];
      p4OptionReasons[id] = ["正確，通知要求司機每 30 分鐘在物流 App 查看路況更新。", "錯誤，通知沒有要求司機立即返回總部。", "錯誤，通知沒有要求逐一打電話給客戶。", "錯誤，通知沒有要求改走 C 路線。"];
    }
    if (id === "L4-16") {
      p4QuestionTranslations[id] = "博覽會在哪裡舉行？";
      p4OptionTranslations[id] = ["在 B 館。", "在 D 館。", "在 6 號櫃台。", "在二樓大廳。"];
      p4OptionReasons[id] = ["正確，公告說智慧工廠博覽會在 B 館開幕。", "錯誤，公告沒有提到 D 館。", "錯誤，6 號櫃台是領取識別證的地點，不是展覽地點。", "錯誤，公告沒有提到二樓大廳。"];
    }
    if (id === "L4-17") {
      p4QuestionTranslations[id] = "博覽會什麼時候開幕？";
      p4OptionTranslations[id] = ["上午 10 點。", "上午 9 點。", "中午。", "下午 3 點。"];
      p4OptionReasons[id] = ["正確，公告明確說博覽會上午 10 點開幕。", "錯誤，公告沒有說上午 9 點開幕。", "錯誤，公告沒有說中午開幕。", "錯誤，公告沒有說下午 3 點開幕。"];
    }
    if (id === "L4-18") {
      p4QuestionTranslations[id] = "線上報名的來賓必須先做什麼？";
      p4OptionTranslations[id] = ["到 6 號櫃台領取識別證。", "在 D 館付款。", "提交履歷。", "直接參加主題演講。"];
      p4OptionReasons[id] = ["正確，公告要求線上報名者進入主題演講前先到 6 號櫃台領取識別證。", "錯誤，公告沒有要求在 D 館付款。", "錯誤，公告沒有提到提交履歷。", "錯誤，公告說要先領取識別證，不能直接參加主題演講。"];
    }
    if (id === "L4-19") {
      p4QuestionTranslations[id] = "公告提到哪一門課程？";
      p4OptionTranslations[id] = ["進階 Excel 課程。", "公開演說工作坊。", "初階程式設計營。", "設計研討會。"];
      p4OptionReasons[id] = ["正確，課程通知提到的是進階 Excel 課程。", "錯誤，通知沒有提到公開演說工作坊。", "錯誤，通知沒有提到初階程式設計營。", "錯誤，通知沒有提到設計研討會。"];
    }
    if (id === "L4-20") {
      p4QuestionTranslations[id] = "課程什麼時候舉行？";
      p4OptionTranslations[id] = ["本週四晚上 7 點。", "本週二上午 9 點。", "週五中午。", "下週一晚上。"];
      p4OptionReasons[id] = ["正確，通知說課程將於本週四晚上 7 點線上舉行。", "錯誤，通知沒有說本週二上午 9 點。", "錯誤，通知沒有說週五中午。", "錯誤，通知沒有說下週一晚上。"];
    }
    if (id === "L4-21") {
      p4QuestionTranslations[id] = "參加者課前應該做什麼？";
      p4OptionTranslations[id] = ["下載範例活頁簿。", "提交紙本報告。", "預約教室座位。", "安裝新印表機。"];
      p4OptionReasons[id] = ["正確，通知要求參加者課前從訓練入口網站下載範例活頁簿。", "錯誤，通知沒有要求提交紙本報告。", "錯誤，課程在線上舉行，通知沒有要求預約教室座位。", "錯誤，通知沒有提到安裝新印表機。"];
    }
    if (id === "L4-22") {
      p4QuestionTranslations[id] = "哪些樓層受到維修影響？";
      p4OptionTranslations[id] = ["12 到 15 樓。", "1 到 3 樓。", "只有 5 樓。", "所有樓層。"];
      p4OptionReasons[id] = ["正確，飯店公告說 12 到 15 樓會暫停供水。", "錯誤，公告沒有說 1 到 3 樓受影響。", "錯誤，5 樓是提供淋浴間的替代地點。", "錯誤，公告只提到 12 到 15 樓，不是所有樓層。"];
    }
    if (id === "L4-23") {
      p4QuestionTranslations[id] = "停水會持續多久？";
      p4OptionTranslations[id] = ["兩小時。", "一小時。", "三小時。", "一整天。"];
      p4OptionReasons[id] = ["正確，停水時間從下午 1 點到 3 點，共兩小時。", "錯誤，公告的時段不是一小時。", "錯誤，公告的時段不是三小時。", "錯誤，公告沒有說停水一整天。"];
    }
    if (id === "L4-24") {
      p4QuestionTranslations[id] = "飯店提供給住客什麼替代方案？";
      p4OptionTranslations[id] = ["使用 5 樓淋浴間。", "搬到另一家飯店。", "到櫃台要求退款。", "使用健身房置物櫃。"];
      p4OptionReasons[id] = ["正確，公告說住客可在該時段使用 5 樓淋浴間。", "錯誤，公告沒有要求住客搬到另一家飯店。", "錯誤，公告沒有提到退款。", "錯誤，公告沒有提到健身房置物櫃。"];
    }
    if (id === "L4-25") {
      p4QuestionTranslations[id] = "配送時程有什麼變更？";
      p4OptionTranslations[id] = ["到貨改到週四早上。", "配送改到週二晚上。", "KX-77 批次被取消。", "只有一半包裹會送達。"];
      p4OptionReasons[id] = ["正確，物流更新說 KX-77 預計週四早上到達，而不是週三晚上。", "錯誤，通知沒有說改到週二晚上。", "錯誤，通知沒有說 KX-77 批次被取消。", "錯誤，通知沒有說只會送達一半包裹。"];
    }
    if (id === "L4-26") {
      p4QuestionTranslations[id] = "公告提到哪一個批次？";
      p4OptionTranslations[id] = ["KX-77。", "AB-19。", "MZ-04。", "TR-88。"];
      p4OptionReasons[id] = ["正確，物流更新直接提到 Parcel batch KX-77。", "錯誤，通知沒有提到 AB-19。", "錯誤，通知沒有提到 MZ-04。", "錯誤，通知沒有提到 TR-88。"];
    }
    if (id === "L4-27") {
      p4QuestionTranslations[id] = "收貨人員應該做什麼？";
      p4OptionTranslations[id] = ["準備 2 號碼頭並更新時程。", "把包裹退回供應商。", "通知飯店接待處。", "列印帳單明細。"];
      p4OptionReasons[id] = ["正確，通知要求收貨人員準備 2 號碼頭並更新卸貨時程。", "錯誤，通知沒有要求把包裹退回供應商。", "錯誤，通知沒有提到飯店接待處。", "錯誤，通知沒有要求列印帳單明細。"];
    }
    if (id === "L4-28") {
      p4QuestionTranslations[id] = "員工入口網站為什麼會無法使用？";
      p4OptionTranslations[id] = ["安全升級。", "天候造成的網路中斷。", "硬體交貨延遲。", "薪資錯誤。"];
      p4OptionReasons[id] = ["正確，系統維護通知說入口網站會因安全升級而暫停服務。", "錯誤，通知沒有說是天候造成的網路中斷。", "錯誤，通知沒有提到硬體交貨延遲。", "錯誤，通知沒有提到薪資錯誤。"];
    }
    if (id === "L4-29") {
      p4QuestionTranslations[id] = "維護時段是什麼時候？";
      p4OptionTranslations[id] = ["週六凌晨 1 點到 4 點。", "週五下午 1 點到 4 點。", "週六凌晨 4 點到 8 點。", "週日午夜到凌晨 3 點。"];
      p4OptionReasons[id] = ["正確，通知明確列出本週六凌晨 1 點至 4 點為維護時段。", "錯誤，通知沒有說週五下午 1 點到 4 點。", "錯誤，通知沒有說週六凌晨 4 點到 8 點。", "錯誤，通知沒有說週日午夜到凌晨 3 點。"];
    }
    if (id === "L4-30") {
      p4QuestionTranslations[id] = "員工應該事先做什麼？";
      p4OptionTranslations[id] = ["週五午夜前提交請假申請。", "到接待處更改密碼。", "列印所有薪資紀錄。", "整週避免使用電子郵件。"];
      p4OptionReasons[id] = ["正確，通知要求員工在週五午夜前提交請假申請。", "錯誤，通知沒有要求到接待處更改密碼。", "錯誤，通知沒有要求列印薪資紀錄。", "錯誤，通知沒有要求整週避免使用電子郵件。"];
    }

  });
});
p4Groups.forEach((group, gi) => {
  group.items.forEach((item) => {
    const groupId = `L4G-${gi + 1}`;
    const id = `L4-${l4idx++}`;
    sampleQuestions.push(q({
      id,
      section: "listening",
      part: "Part 4",
      type: "talks",
      groupId,
      passage: group.passage,
      question: item[0],
      options: item[1],
      answer: item[2],
      explanation: `${item[3]} 中文解析：依公告中的關鍵資訊對應答案。`,
      translation: p4Translations[groupId],
      questionTranslation: p4QuestionTranslations[id],
      optionTranslations: p4OptionTranslations[id],
      optionReasons: p4OptionReasons[id],
      tags: ["announcement"],
    }));
  });
});

const p5 = [
["By the time the auditor arrived, the team ____ all receipts.",["had organized","has organized","organize","organizing"],"had organized","過去另一時間點之前已完成的動作用過去完成式。","時態"],
["Please place the signed agreement ____ the blue folder.",["in","at","for","with"],"in","文件在資料夾裡用 in。","介系詞"],
["The manager approved overtime ____ the deadline was moved up.",["because","although","unless","whereas"],"because","表示原因用 because。","連接詞"],
["Her explanation was clear and highly ____.",["persuasive","persuade","persuasion","persuasively"],"persuasive","and 連接兩個形容詞，需用 persuasive。","詞性"],
["All visitor badges must ____ at the front desk.",["be returned","return","returned","be returning"],"be returned","徽章是被歸還，用被動語態。","主被動"],
["We decided ____ the vendor before signing the contract.",["to meet","meeting","meet","met"],"to meet","decide 後接不定詞 to V。","不定詞"],
["They postponed ____ the software until next week.",["installing","to install","install","installed"],"installing","postpone 後接動名詞。","動名詞"],
["The assistant ____ prepared the chart will present first.",["who","which","whom","whose"],"who","先行詞是人且作主詞，用 who。","關係代名詞"],
["This quarter's profit is ____ than last quarter's.",["higher","highest","high","more high"],"higher","兩者比較用比較級。","比較級"],
["The receptionist has ____ confirmed your appointment.",["already","yet","still","almostly"],"already","already 常放在助動詞後、過去分詞前。","副詞位置"],
["____ the proposal twice, she found a pricing error.",["Reviewing","Review","Reviewed","To review"],"Reviewing","分詞構句可表先後或伴隨動作。","分詞"],
["If I ____ in your position, I would request an extension.",["were","am","was","be"],"were","與現在事實相反的假設語氣用 were。","假設語氣"],
["Several ____ were missing from the shipment list.",["items","item","item's","items'"],"items","several 後接可數複數名詞。","名詞單複數"],
["We need more ____ before we can finalize the budget.",["information","informations","an information","info"],"information","information 為不可數名詞。","可數不可數"],
["Each department ____ required to submit a monthly summary.",["is","are","were","be"],"is","each + 單數名詞視為單數主詞。","主詞動詞一致"],
["By next June, the company ____ in this building for ten years.",["will have operated","will operate","operated","has operated"],"will have operated","到未來某時間前已持續一段時間用未來完成式。","時態"],
["The package arrived ____ time despite heavy traffic.",["on","in","at","from"],"on","固定片語 on time。","介系詞"],
["Please call me ____ you receive the signed copy.",["once","unless","despite","whereas"],"once","once 表示一...就...。","連接詞"],
["The director spoke ____ about the merger plan.",["briefly","brief","briefness","briefing"],"briefly","修飾動詞 spoke 用副詞 briefly。","詞性"],
["All reports should ____ by noon on Friday.",["be submitted","submit","submitted","be submitting"],"be submitted","報告是被提交，應用被動。","主被動"],
["He agreed ____ the presentation slides tonight.",["to revise","revising","revise","revised"],"to revise","agree 後接不定詞。","不定詞"],
["We recommend ____ your password every three months.",["changing","to change","change","changed"],"changing","recommend 後接動名詞。","動名詞"],
["The office ____ windows face east gets morning sunlight.",["whose","who","which","whom"],"whose","表所有關係用 whose。","關係代名詞"],
["This model is ____ than the previous one.",["more durable","most durable","durably","durability"],"more durable","兩者比較用 more + 形容詞。","比較級"],
["The legal team has ____ reviewed the final draft.",["just","yet","still","almost"],"just","just 常置於 has 與過去分詞之間。","副詞位置"],
["____ all supporting files, he sent the application.",["Checking","Checked","Check","To checking"],"Checking","分詞構句用現在分詞起首。","分詞"],
["If the weather ____ better, the event would be outdoors.",["were","is","was","be"],"were","與現在事實相反，用 were。","假設語氣"],
["All ____ must be labeled before storage.",["boxes","box","boxs","box's"],"boxes","all 後接可數複數。","名詞單複數"],
["There isn't much ____ left in the printer.",["ink","inks","an ink","inking"],"ink","ink 為不可數名詞。","可數不可數"],
["Neither of the proposals ____ acceptable to the board.",["is","are","were","be"],"is","neither 視為單數主詞。","主詞動詞一致"]
];
const p5Translations = {
  "R5-1": "稽核員抵達時，團隊已經整理好所有收據。",
  "R5-2": "請把已簽署的協議放進藍色資料夾。",
  "R5-3": "經理核准了加班，因為截止日期被提前了。",
  "R5-4": "她的說明清楚且很有說服力。",
  "R5-5": "所有訪客識別證都必須歸還到前台。",
  "R5-6": "我們決定在簽合約前先與供應商會面。",
  "R5-7": "他們把安裝軟體延後到下週。",
  "R5-8": "準備圖表的助理會先進行簡報。",
  "R5-9": "本季利潤比上一季高。",
  "R5-10": "接待員已經確認了你的預約。",
  "R5-11": "在審查提案兩次後，她發現一個定價錯誤。",
  "R5-12": "如果我是你，我會要求延長期限。",
  "R5-13": "出貨清單中少了幾個項目。",
  "R5-14": "在我們完成預算前，需要更多資訊。",
  "R5-15": "每個部門都必須提交每月摘要。",
  "R5-16": "到明年六月時，這家公司在這棟大樓營運就滿十年了。",
  "R5-17": "儘管交通壅塞，包裹仍準時送達。",
  "R5-18": "你收到已簽署的副本後，請打電話給我。",
  "R5-19": "主管簡短說明了合併計畫。",
  "R5-20": "所有報告都應在星期五中午前提交。",
  "R5-21": "他同意今晚修改簡報投影片。",
  "R5-22": "我們建議你每三個月更換一次密碼。",
  "R5-23": "窗戶朝東的辦公室會照到早晨陽光。",
  "R5-24": "這個型號比前一個更耐用。",
  "R5-25": "法務團隊剛剛審查完最終草稿。",
  "R5-26": "檢查完所有佐證檔案後，他送出了申請。",
  "R5-27": "如果天氣好一點，活動就會在戶外舉行。",
  "R5-28": "所有箱子在入庫前都必須貼上標籤。",
  "R5-29": "印表機裡剩下的墨水不多了。",
  "R5-30": "這兩份提案都無法被董事會接受。",
};
for (let i = 1; i <= 30; i++) {
  const s = p5[i - 1];
  sampleQuestions.push(q({ id: `R5-${i}`, section: "reading", part: "Part 5", type: "incomplete-sentences", question: s[0], options: s[1], answer: s[2], explanation: `${s[3]} 中文解析：其餘選項在語法或語意上不正確。`, translation: p5Translations[`R5-${i}`], grammarPoint: s[4], tags: ["grammar"] }));
}

const p6Groups = [
  {
    image: "assets/images/reading/p6-weekly-progress-notice.svg",
    imageAlt: "Internal notice showing weekly progress updates due Friday at 4 p.m. through the intranet form.",
    imageCaption: "Weekly progress update notice",
    passage: "Internal Notice: Starting July 1, all departments must submit weekly progress updates by 4 p.m. every Friday through the intranet form. Reports sent by email will not be accepted.",
    items: [
      ["What is the main purpose of this notice?", ["To announce a new weekly reporting rule", "To cancel intranet access", "To recruit new managers", "To explain travel reimbursement"], "To announce a new weekly reporting rule", "短文主旨是宣布每週進度回報的新規定。"],
      ["When is the reporting deadline each week?", ["By 4 p.m. on Friday", "By noon on Thursday", "Before 9 a.m. Monday", "Any time during the weekend"], "By 4 p.m. on Friday", "文中明確指出每週五下午四點前繳交。"],
      ["Updates must be submitted ____ the intranet form.", ["through", "between", "despite", "across"], "through", "透過某系統提交用 through。", "介系詞"],
      ["Reports sent by email will ____ accepted.", ["not be", "not", "be not", "not being"], "not be", "被動語態否定為 will not be + 過去分詞。", "主被動"]
    ]
  },
  {
    passage: "Customer Service Reply: Thank you for contacting us about Order 5521. We have shipped a replacement power adapter today, and delivery is expected on Tuesday. Please keep the defective item in its original box for courier pickup.",
    items: [
      ["Why was this reply sent?", ["To respond to an order problem", "To advertise a new product", "To confirm a hotel booking", "To request invoice payment"], "To respond to an order problem", "開頭提到針對訂單 5521 的聯繫進行回覆。"],
      ["When is the replacement expected to arrive?", ["On Tuesday", "On Monday", "This weekend", "No date is provided"], "On Tuesday", "內文直接提供預計到貨日為星期二。"],
      ["Please keep the defective item ____ pickup.", ["for", "among", "unless", "toward"], "for", "for pickup 表示供取件使用。", "介系詞"],
      ["A replacement adapter has been ____ today.", ["shipped", "shipping", "ship", "ships"], "shipped", "現在完成式被動結構 has been + 過去分詞。", "時態"]
    ]
  },
  {
    image: "assets/images/reading/p6-writing-workshop-poster.svg",
    imageAlt: "Workshop poster with August 14 date, Central Hall location, NT$1,200 fee, and August 7 payment deadline.",
    imageCaption: "Business Writing Workshop registration poster",
    passage: "Event Registration Notice: The Business Writing Workshop will be held on August 14 at Central Hall. The fee is NT$1,200, and payment must be completed by August 7 to secure your seat. Late payments will be placed on a waiting list.",
    items: [
      ["What event is announced?", ["A Business Writing Workshop", "A software maintenance drill", "A warehouse safety audit", "A customer feedback survey"], "A Business Writing Workshop", "第一句指出活動名稱為商務寫作工作坊。"],
      ["What is the registration fee?", ["NT$1,200", "NT$800", "NT$2,000", "No fee is required"], "NT$1,200", "短文明確列出費用為 1,200 元。"],
      ["Payment must be completed ____ August 7.", ["by", "from", "between", "while"], "by", "期限前用 by + 日期。", "介系詞"],
      ["Late payments will be ____ on a waiting list.", ["placed", "placing", "place", "places"], "placed", "被動語態 will be placed 表示被列入。", "主被動"]
    ]
  },
  {
    image: "assets/images/reading/p6-procurement-guide.svg",
    imageAlt: "Procurement guide card showing purchases above NT$50,000 require two vendor quotations and approval before purchase order.",
    imageCaption: "Procurement process guide",
    passage: "Procurement Process Guide: For purchases above NT$50,000, teams must collect two vendor quotations, complete the approval sheet, and submit documents to Procurement before creating a purchase order.",
    items: [
      ["When are two quotations required?", ["For purchases above NT$50,000", "For all office supply orders", "Only for overseas travel", "After an order is delivered"], "For purchases above NT$50,000", "首句說明超過五萬元的採購需兩家報價。"],
      ["What must teams do before creating a purchase order?", ["Submit documents to Procurement", "Ask HR to confirm attendance", "Send invoices directly to clients", "Book a meeting room"], "Submit documents to Procurement", "流程最後要求下單前先送件給採購部。"],
      ["Teams should avoid ____ orders before approval.", ["placing", "to place", "place", "placed"], "placing", "avoid 後接動名詞。", "動名詞"],
      ["The approval sheet must ____ by the department head.", ["be signed", "sign", "signed", "be signing"], "be signed", "表單是被簽署，需被動語態。", "主被動"]
    ]
  }
];

let r6idx = 1;
const p6Translations = {
  "R6-1": "從 7 月 1 日起，所有部門都必須每週五下午 4 點前，透過內部網路表單提交每週進度更新。",
  "R6-2": "每週進度更新必須在每週五下午 4 點前提交。",
  "R6-3": "更新必須透過內部網路表單提交。",
  "R6-4": "透過電子郵件寄送的報告將不被接受。",
  "R6-5": "感謝你就 5521 號訂單與我們聯絡。",
  "R6-6": "替換用電源變壓器預計會在星期二送達。",
  "R6-7": "請保留有瑕疵的商品，供快遞取件。",
  "R6-8": "替換用電源變壓器今天已經寄出。",
  "R6-9": "商務寫作工作坊將於 8 月 14 日在 Central Hall 舉行。",
  "R6-10": "報名費為新台幣 1,200 元。",
  "R6-11": "付款必須在 8 月 7 日前完成。",
  "R6-12": "逾期付款者將被列入候補名單。",
  "R6-13": "超過新台幣 50,000 元的採購，團隊必須取得兩家供應商報價。",
  "R6-14": "建立採購訂單前，團隊必須將文件提交給採購部。",
  "R6-15": "團隊應避免在核准前下訂單。",
  "R6-16": "核准表必須由部門主管簽署。",
};
p6Groups.forEach((group, g) => {
  group.items.forEach((item) => {
    const id = `R6-${r6idx++}`;
    sampleQuestions.push(q({
      id,
      section: "reading",
      part: "Part 6",
      type: "text-completion",
      groupId: `R6G-${g + 1}`,
      passage: group.passage,
      question: item[0],
      options: item[1],
      answer: item[2],
      explanation: `${item[3]} 中文解析：依短文內容與句型選出最適合答案。`,
      translation: p6Translations[id],
      grammarPoint: item[4] || "",
      image: group.image || "",
      imageAlt: group.imageAlt || "",
      imageCaption: group.imageCaption || "",
      tags: ["passage"],
    }));
  });
});

const p7Groups = [
  { type: "email", passage: "Email: Subject: Parking Permit Renewal. Dear Staff, Nova Administration is updating all employee parking records before the July access cycle begins. To keep your current parking privileges, please renew your permit by sending your vehicle plate number and employee ID to parking@nova.com no later than June 28. The renewal is required because several temporary permits and vehicle registrations have expired, and security must match each active card with a current driver record. Permits not renewed by the deadline will be deactivated automatically on July 1, and the gate reader will reject the card until the record is restored. Please do not lend your permit to visitors or coworkers. If you changed vehicles recently or need help, contact parking@nova.com before the deadline.", items: [
    ["What must employees submit for renewal?", ["Their plate number and employee ID", "A fuel receipt and route map", "A manager recommendation letter", "A copy of their driver's license only"], "Their plate number and employee ID", "信件明確要求提交車牌號碼與員工編號。"],
    ["When will unrenewed permits stop working?", ["July 1", "June 28", "July 15", "No deactivation date is mentioned"], "July 1", "文中指出未續辦者將於 7 月 1 日失效。"],
    ["Who is the intended audience?", ["Company employees with parking access", "Outside delivery drivers", "Customers visiting the showroom", "New job applicants"], "Company employees with parking access", "主旨為停車證續辦，對象是員工。"]
  ]},
  { type: "memo", passage: "Memo: Marketing Department Move. The Marketing Department will relocate from Floor 5 to Floor 8 on June 12 as part of the office renovation project. All marketing staff should pack personal items by June 10 and label each box with your team name, full name, and the destination area shown on the seating chart. Shared materials, samples, and campaign files should be placed in the clearly marked team boxes near the copy room. Please keep laptops, chargers, ID cards, and any confidential documents with you during the move. Facilities will move labeled boxes after 6:00 p.m. on June 11. IT will reconnect desktop computers and test network access on June 13, so do not reconnect equipment yourself unless IT asks you to do so.", items: [
    ["Which department is relocating?", ["Marketing", "Finance", "Human Resources", "Procurement"], "Marketing", "備忘錄第一句指出是行銷部門搬遷。"],
    ["What should staff do by June 10?", ["Pack personal items and label boxes", "Return access cards to security", "Attend a safety drill", "Submit travel receipts"], "Pack personal items and label boxes", "文中要求 6/10 前完成打包與標示。"],
    ["Why is June 13 mentioned?", ["IT will reconnect computers that day", "The office lease ends that day", "A vendor audit is scheduled", "A company holiday begins"], "IT will reconnect computers that day", "備忘錄說明 IT 在 6/13 重新連接電腦。"]
  ]},
  { type: "notice", image: "assets/images/reading/p7-cafeteria-notice.svg", imageAlt: "Cafeteria notice for limited menu on Thursday from 11:30 a.m. to 1:30 p.m.", imageCaption: "Level 2 cafeteria service notice", passage: "Notice: Level 2 Cafeteria Service Update. The employee cafeteria on Level 2 will operate with a limited menu from 11:30 a.m. to 1:30 p.m. this Thursday due to scheduled kitchen equipment maintenance. During this two-hour lunch period, the grill station and noodle counter will be closed while technicians inspect the ventilation system and replace several temperature controls. Sandwiches, salads, packaged fruit, bottled drinks, and two hot rice dishes will still be available at the main counter. Because fewer stations will be open, please expect longer wait times, especially between noon and 12:45 p.m. Employees with flexible schedules are encouraged to eat earlier, avoid the peak lunch period, or use the vending area on Level 1. Regular service is expected to resume after 1:30 p.m.", items: [
    ["Why will the menu be limited?", ["Kitchen equipment maintenance", "A food supplier strike", "A holiday closure", "A staff training seminar"], "Kitchen equipment maintenance", "公告直接說明原因是廚房設備維護。"],
    ["During what hours does this notice apply?", ["11:30 a.m. to 1:30 p.m.", "9:00 a.m. to 11:00 a.m.", "1:30 p.m. to 3:30 p.m.", "All day"], "11:30 a.m. to 1:30 p.m.", "文中給出限定時段。"],
    ["What can readers infer?", ["Lunch service may be slower than usual", "The cafeteria is closing permanently", "Only drinks will be sold", "All employees must eat off-site"], "Lunch service may be slower than usual", "公告提醒等待時間變長，可推論服務速度較慢。"]
  ]},
  { type: "advertisement", image: "assets/images/reading/p7-english-program-ad.svg", imageAlt: "Advertisement for Weekend Business English Program with eight Saturday sessions and NT$6,800 tuition.", imageCaption: "Weekend Business English program advertisement", passage: "Advertisement: Weekend Business English Program. BrightSkills Training Center is now accepting registrations for a weekend program designed for office workers, sales representatives, and job seekers who want to communicate more confidently in English. The course includes eight Saturday sessions, held from 9:30 a.m. to noon, and tuition is NT$6,800 for the full program. Lessons cover e-mail writing, meeting expressions, telephone practice, short presentations, mock interviews, and pronunciation coaching. Class size is limited to sixteen participants so that each learner can receive instructor feedback. Students who register by July 5 will receive a free workbook with extra exercises and sample business phrases. Registration closes on July 12, or earlier if all seats are filled.", items: [
    ["What is being advertised?", ["A weekend business English program", "A translation software license", "A corporate tax service", "A recruitment fair"], "A weekend business English program", "廣告主題是週末商務英文課程。"],
    ["How much is the tuition?", ["NT$6,800", "NT$5,200", "NT$7,500", "NT$680"], "NT$6,800", "文中明確列出學費金額。"],
    ["What is offered to early registrants?", ["A free workbook", "A free tablet", "A refund coupon", "A private coaching session"], "A free workbook", "7/5 前報名可獲得免費教材。"]
  ]},
  { type: "schedule", image: "assets/images/reading/p7-vendor-onboarding-schedule.svg", imageAlt: "Vendor Onboarding Day schedule for July 18 in Room 402 with check-in and system setup times.", imageCaption: "Vendor onboarding day schedule", passage: "Schedule: Vendor Onboarding Day will be held on July 18 in Room 402 of the Administration Building for newly approved vendors who will provide goods or services to the company this year. Participants should bring a photo ID, business card, and the confirmation e-mail sent by Procurement. Check-in will take place from 09:00 to 09:30 at the Room 402 entrance. From 09:30 to 10:30, the Compliance team will present purchasing rules, invoice requirements, data-security expectations, and site-access procedures. After a short break, System Account Setup begins at 10:45 and continues until 11:30, when IT staff will help vendors activate portal accounts and temporary passwords. The morning will end with a Q&A session from 11:30 to 12:00 for contract, payment, and account questions.", items: [
    ["Where will Vendor Onboarding Day be held?", ["Room 402", "Room 305", "Main Lobby", "Online only"], "Room 402", "時程表標明活動地點是 402 室。"],
    ["What happens at 10:45?", ["System account setup begins", "Compliance briefing ends", "Lunch break starts", "Q&A session starts"], "System account setup begins", "10:45-11:30 的項目是系統帳號設定。"],
    ["Who is this schedule most likely for?", ["Newly approved vendors", "Hotel guests", "Factory inspectors", "Job candidates"], "Newly approved vendors", "活動名稱是 Vendor Onboarding，可推論對象為新供應商。"]
  ]},
  { type: "invoice", image: "assets/images/reading/p7-furniture-invoice.svg", imageAlt: "Invoice A5831 showing twelve ergonomic chairs, delivery fee, and total NT$25,200.", imageCaption: "Furniture invoice summary", passage: "Invoice #A5831: Billing Notice. This invoice is issued to Orion Office Co. for furniture delivered to its Taipei branch on June 4. Item purchased: 12 ergonomic chairs for the customer service area. Unit price is NT$2,000 per chair, and the quantity of 12 brings the merchandise subtotal to NT$24,000. A delivery fee of NT$1,200 has been added for scheduled truck delivery, elevator handling, and placement in the office. No additional installation charge is included. The invoice total is therefore NT$25,200. Please pay the full amount within 30 days by bank transfer to the account listed in your vendor profile, and include invoice number A5831 in the transfer note. Questions about this billing notice may be sent to billing@furnix.com.", items: [
    ["What is the invoice total?", ["NT$25,200", "NT$24,000", "NT$26,400", "NT$1,200"], "NT$25,200", "發票總額欄位清楚列為 25,200 元。"],
    ["How should payment be made?", ["By bank transfer", "By cash on delivery", "By credit card at store", "By mobile wallet"], "By bank transfer", "付款方式欄位指定銀行轉帳。"],
    ["Which amount is the delivery fee?", ["NT$1,200", "NT$2,400", "NT$12,000", "NT$25,200"], "NT$1,200", "運費欄位標示 1,200 元。"]
  ]},
  { type: "receipt", image: "assets/images/reading/p7-delivery-receipt.svg", imageAlt: "GreenLine Express receipt for same-day parcel delivery paid in full by corporate card.", imageCaption: "Express delivery receipt", passage: "Receipt: GreenLine Express Delivery Services. Receipt No. GL-0603-1842, service date: June 3. Customer: Orion Office Co., Taipei Branch. Service purchased: same-day parcel delivery for one document package from Xinyi District to Neihu before 5:00 p.m. Charges: base fee NT$320, fuel surcharge NT$40, and optional insurance fee NT$25 for loss or damage coverage. Total amount paid: NT$385. Payment method: corporate card ending in 4421, authorized by the customer's administration department at 10:18 a.m. Payment status: paid in full; no balance remains. For delivery confirmation, address corrections, or receipt questions, contact GreenLine Express at service@greenline-express.com or 02-5550-3188 within seven business days.", items: [
    ["What service was purchased?", ["Same-day parcel delivery", "International air freight", "Warehouse storage", "Office cleaning"], "Same-day parcel delivery", "收據服務項目寫明當日包裹配送。"],
    ["How much was paid in total?", ["NT$385", "NT$320", "NT$360", "NT$425"], "NT$385", "收據最後顯示實付金額 385 元。"],
    ["What can be inferred about payment?", ["The payment was already completed", "Payment is due in 30 days", "Only a deposit was paid", "The transaction was canceled"], "The payment was already completed", "收據使用 Amount paid，表示款項已支付。"]
  ]},
  { type: "job posting", image: "assets/images/reading/p7-delta-job-posting.svg", imageAlt: "Job posting flyer for a Logistics Coordinator at Delta Supply Ltd. with advanced Excel skills and a June 30 application deadline.", imageCaption: "Logistics coordinator job posting", passage: "Job Posting: Logistics Coordinator, Delta Supply Ltd. Delta Supply Ltd., a distributor of office equipment and industrial parts, is seeking a full-time Logistics Coordinator for its Taipei operations team. The position will monitor inventory levels, prepare weekly shipment reports, arrange deliveries with local carriers, and communicate with overseas suppliers about production schedules, customs documents, and delivery changes. Applicants must have at least two years of inventory control experience, advanced Excel skills for tracking orders and creating pivot-table reports, and the ability to write clear e-mails to vendors in different time zones. Familiarity with ERP systems is preferred but not required. To apply, send a resume and brief cover letter to hr@deltasupply.com by June 30. Interviews will begin the following week.", items: [
    ["What position is being offered?", ["Logistics Coordinator", "Finance Analyst", "Sales Trainer", "IT Support Specialist"], "Logistics Coordinator", "職缺標題直接寫明職稱。"],
    ["Which skill is specifically required?", ["Advanced Excel skills", "Graphic design expertise", "Legal drafting experience", "Public speaking certification"], "Advanced Excel skills", "需求條件列有 advanced Excel skills。"],
    ["What should applicants do to apply?", ["Email a resume by June 30", "Call the warehouse manager", "Submit documents in person only", "Register through a travel portal"], "Email a resume by June 30", "公告說明以 email 寄履歷且有截止日。"]
  ]},
  { type: "customer review", passage: "Customer Review: I used the new online reservation tool yesterday to book a meeting room for a client presentation, and the process was much faster than the old phone-based system. After selecting the date, room size, and presentation equipment, I received a confirmation in under two minutes. I also liked the clean layout, automatic e-mail reminder, and ability to compare available rooms without opening several pages. However, the cancellation policy is hard to find; I had to search through the help menu before learning how late a reservation could be changed. Please add a visible cancellation link or short policy note on the confirmation screen. Overall, the tool is convenient and worth keeping.", items: [
    ["What did the reviewer like?", ["The booking process was quick", "The cancellation policy was clear", "Phone support was immediate", "The fee was reduced"], "The booking process was quick", "評論稱讚預約流程快速易用。"],
    ["What problem is mentioned?", ["Cancellation policy is hard to find", "The website frequently crashes", "Payment options are missing", "No rooms are available"], "Cancellation policy is hard to find", "評論中具體指出取消政策不易找到。"],
    ["What is the writer's purpose?", ["To provide feedback with praise and a suggestion", "To request a refund immediately", "To advertise a competing service", "To report billing fraud"], "To provide feedback with praise and a suggestion", "內容同時包含優點與改進建議，屬回饋性評論。"]
  ]},
  { type: "business letter", passage: "Business Letter: June 6. Dear Mr. Park, Thank you for sending your proposal for monthly equipment maintenance at our customer service center. Our management team has reviewed the schedule of preventive visits, technician qualifications, and monthly reporting format, and we would like to proceed with your company as our maintenance provider. Before we sign the agreement, however, please revise Clause 3 to state that emergency on-site support will be available within 4 hours after a service request is confirmed. This response time is important because several machines are used during evening order processing. Please send the revised proposal by June 12 so our legal department can complete its review. Sincerely, Nina Chen, Operations Manager.", items: [
    ["Why is this letter sent?", ["To request a revision before agreement", "To terminate an existing contract", "To confirm shipment delivery", "To invite Mr. Park to an interview"], "To request a revision before agreement", "信中表示願意合作但要求修改第 3 條。"],
    ["What change is requested?", ["Add 4-hour emergency on-site support", "Reduce monthly fee by 50%", "Remove all maintenance visits", "Extend contract length to five years"], "Add 4-hour emergency on-site support", "具體要求在條款加入 4 小時內到場支援。"],
    ["Who wrote the letter?", ["Nina Chen, Operations Manager", "Mr. Park, Sales Director", "The legal department intern", "A customer service agent"], "Nina Chen, Operations Manager", "結尾簽名清楚標示寄件人職稱姓名。"]
  ]},
  { type: "email", passage: "Email: Subject: Webinar Link Update. Dear registered participants, this is a reminder that the product webinar scheduled for June 21 at 2:00 p.m. will no longer use the original Zoom Room A link that was sent with your registration confirmation. Because the number of attendees is now higher than the capacity limit for that room, the session has been moved to Zoom Room C. The new link appears in the attached calendar invite and in the updated reminder message from our events team. Please delete the old link from your calendar, or simply accept the attached invitation so the correct room is saved automatically. The presentation topic and starting time have not changed.", items: [
    ["Why was the webinar room changed?", ["Participant limits were reached", "The presenter canceled", "The topic was updated", "A power outage occurred"], "Participant limits were reached", "信件說明改房因參加人數限制。"],
    ["What should recipients use to join?", ["The new link in the attached invite", "The old link from last week", "A phone number in the footer", "The company intranet homepage"], "The new link in the attached invite", "文中要求使用附件行事曆中的新連結。"],
    ["What type of text is this?", ["A schedule update email", "A payment receipt", "A hiring announcement", "A public advertisement"], "A schedule update email", "內容格式與目的都是通知會議連結異動。"]
  ]},
  { type: "memo", passage: "Memo: Quarterly Safety Drill. To all department supervisors and floor leaders: the next quarterly safety drill is intended to confirm evacuation routes, test emergency communication procedures, and ensure that every work area can account for employees and visitors. Floor leaders are responsible for guiding staff to the assigned assembly point, checking names against the attendance sheet, and reporting any access or alarm problems observed during the drill. After each drill, all floor leaders must submit attendance records within 24 hours. Missing records will delay compliance reporting to headquarters and may require the floor to repeat the drill. Completed forms should be uploaded to the Safety Compliance folder on the shared drive. Questions may be directed to the Facilities and Safety Office.", items: [
    ["Who must submit attendance records?", ["Floor leaders", "All visitors", "Security guards only", "External auditors"], "Floor leaders", "備忘錄點名 floor leaders 為責任對象。"],
    ["When is the submission deadline?", ["Within 24 hours after each drill", "Before the drill starts", "At the end of each month", "No deadline is specified"], "Within 24 hours after each drill", "文中明確給出 24 小時期限。"],
    ["What may happen if records are missing?", ["Compliance reporting will be delayed", "The drill will be canceled", "Employee salaries will be reduced", "Headquarters will close the office"], "Compliance reporting will be delayed", "後句直接說明缺件後果為合規報告延遲。"]
  ]},
  { type: "notice", image: "assets/images/reading/p7-lobby-scanner-notice.svg", imageAlt: "Lobby access-card scanner notice showing Saturday June 14 maintenance from 8 to 11 a.m. and temporary badges at reception.", imageCaption: "Lobby access-card scanner notice", passage: "Notice: Lobby Access-Card Scanners. The Facilities and Security Office will replace the access-card scanners at the main lobby entrance this Saturday, June 14, from 8 a.m. to 11 a.m. The work will take place at the two glass doors beside the reception desk, so employees and approved visitors should allow extra time when entering or leaving the building. During the replacement period, regular access cards may not open the lobby doors consistently. Temporary paper badges will be issued at the reception desk after staff show a company ID or sign in with Security. Please keep the badge visible while moving through public areas, and return it before leaving. For questions about building access, contact Facilities and Security at extension 219.", items: [
    ["What maintenance work is planned?", ["Replacing lobby card scanners", "Upgrading cafeteria tables", "Painting the parking lot", "Testing fire alarms"], "Replacing lobby card scanners", "公告主題是更換大廳刷卡設備。"],
    ["Where can people get temporary badges?", ["At the reception desk", "At the security control room", "In the HR office", "At the loading dock"], "At the reception desk", "通知指出臨時紙卡在櫃台發放。"],
    ["How long will the replacement take?", ["Three hours", "One hour", "Half a day", "All weekend"], "Three hours", "8 點到 11 點共 3 小時。"]
  ]},
  { type: "advertisement", image: "assets/images/reading/p7-courier-ad.svg", imageAlt: "GreenLine Courier advertisement for same-day city delivery, before-noon submissions, and NT$180 flat rate.", imageCaption: "Same-day courier advertisement", passage: "Advertisement: GreenLine Courier. Need a small downtown parcel delivered before the end of the business day? GreenLine Courier offers same-day city delivery for documents and packages submitted before noon on weekdays. Our fixed rate of NT$180 applies to standard downtown parcels under 3 kilograms, including envelopes, sample products, and small office supplies traveling within the central business district. Pickups are available from 9:00 a.m. to 12:00 p.m., and most deliveries are completed by 5:30 p.m. The service does not cover refrigerated goods, cash, hazardous materials, oversized boxes, or addresses outside the downtown service zone. Customers may book online or call our dispatch desk for pickup confirmation.", items: [
    ["What does GreenLine Courier guarantee?", ["Same-day downtown delivery before-noon submissions", "International delivery within one day", "Free shipping on all parcels", "Weekend-only pickup service"], "Same-day downtown delivery before-noon submissions", "廣告強調中午前送件可當日送達市區。"],
    ["What is the stated flat rate?", ["NT$180", "NT$150", "NT$200", "NT$300"], "NT$180", "文中明確列出固定費率。"],
    ["Which package condition is required for that rate?", ["Under 3 kilograms", "Over 5 kilograms", "Fragile items only", "International destination"], "Under 3 kilograms", "固定費率適用於 3 公斤以下。"]
  ]},
  { type: "schedule", image: "assets/images/reading/p7-new-hire-schedule.svg", imageAlt: "New Hire Orientation schedule for July 3 in Conference Room B with HR welcome and IT account setup.", imageCaption: "New hire orientation schedule", passage: "Schedule: New Hire Orientation, July 3. All employees starting this month should attend the in-person orientation program in Conference Room B. Please bring a government-issued photo ID, your signed employment forms, and a laptop if one has already been assigned to you. Check-in begins at 09:00. At 09:30, HR will lead a welcome session covering company policies, benefits enrollment, and workplace guidelines. At 10:30, the IT team will help participants complete account setup, password registration, and e-mail access. At 11:15, an office tour will introduce meeting rooms, emergency exits, supply areas, and department locations. At 12:00, new hires will have lunch with team leads to discuss first-week expectations and reporting procedures.", items: [
    ["Who leads the 9:30 session?", ["HR", "IT", "Finance", "Operations"], "HR", "時程表括號標示 9:30 由 HR 主持。"],
    ["What is scheduled at 10:30?", ["IT account setup", "Office tour", "Lunch", "Welcome session"], "IT account setup", "10:30 的項目是帳號設定。"],
    ["Who is this schedule intended for?", ["Newly hired employees", "External vendors", "Customers visiting showrooms", "Senior executives only"], "Newly hired employees", "活動名稱為 New Hire Orientation。"]
  ]},
  { type: "invoice", image: "assets/images/reading/p7-webcare-invoice.svg", imageAlt: "Website maintenance invoice M7702 showing emergency fix charge and NT$1,000 amount due.", imageCaption: "Website maintenance invoice summary", passage: "Invoice #M7702: May Website Maintenance Service. This invoice is issued for the May maintenance plan provided to the company website, including routine security checks, plug-in updates, backup monitoring, broken-link review, and minor content adjustments requested by the marketing team. The monthly service fee is NT$780. An additional emergency fix charge of NT$220 has been added for restoring the contact form after an unexpected server error on May 22. The total amount due is NT$1,000, payable by June 15. Please pay by bank transfer or online payment using the invoice number as the reference. For billing questions, corrected company information, or service details, contact support@webcare.com.tw or call 02-5557-7702.", items: [
    ["How much is the emergency fix charge?", ["NT$220", "NT$780", "NT$1,000", "NT$200"], "NT$220", "發票細項列出緊急修復費用。"],
    ["What is the total amount due?", ["NT$1,000", "NT$780", "NT$1,220", "NT$1,500"], "NT$1,000", "總額欄位明示 1,000 元。"],
    ["When is payment due?", ["June 15", "May 15", "June 30", "No due date provided"], "June 15", "付款期限欄位寫明 6 月 15 日。"]
  ]},
  { type: "receipt", image: "assets/images/reading/p7-print-shop-receipt.svg", imageAlt: "Metro Print Shop receipt showing 200 color brochures, NT$95 sales tax, and cash payment.", imageCaption: "Print shop receipt", passage: "Receipt: Metro Print Shop. Receipt No. MP-0611-204, dated June 11. Store address: 18 Minsheng Road, Taipei; phone: 02-5558-4310. Customer: walk-in business customer. Item purchased: 200 color brochures printed on glossy A4 paper for a product promotion. Charges are listed as follows: color printing fee NT$1,600, brochure binding and folding fee NT$300, and sales tax NT$95. The total amount paid is NT$1,995. Payment was received in cash at the front counter, and no balance remains. Please keep this receipt for accounting records or reprint requests. Questions about file storage, future orders, or design changes may be directed to the shop within seven days.", items: [
    ["What item was purchased?", ["200 color brochures", "200 envelopes", "A printer cartridge", "Binding machine rental"], "200 color brochures", "收據品項欄位寫明 200 份彩色型錄。"],
    ["How much tax was charged?", ["NT$95", "NT$300", "NT$1,600", "NT$1,995"], "NT$95", "稅額欄位為 95 元。"],
    ["What payment method was used?", ["Cash", "Bank transfer", "Credit card", "Company check"], "Cash", "收據載明 by cash。"]
  ]},
  { type: "job posting", image: "assets/images/reading/p7-apex-financial-analyst-posting.svg", imageAlt: "Job posting flyer for a Financial Analyst at Apex Manufacturing requiring monthly forecasting and at least three years of experience.", imageCaption: "Financial analyst job posting", passage: "Job Posting: Financial Analyst, Apex Manufacturing. Apex Manufacturing is seeking a full-time Financial Analyst to join its Taipei finance team and support planning for regional production operations. The position will prepare monthly forecasting files, conduct variance analysis between budgeted and actual costs, and create dashboard reporting for plant managers and senior leadership. The analyst will also review expense trends, coordinate with accounting during month-end closing, and explain financial results in clear written summaries. Applicants should have CPA-level accounting knowledge, strong spreadsheet skills, and at least three years of relevant experience in manufacturing, audit, or corporate finance. To apply, send a resume and brief cover letter to careers@apexmfg.com by July 10. Shortlisted candidates will be contacted for interviews the following week.", items: [
    ["What role is Apex Manufacturing hiring for?", ["Financial Analyst", "Logistics Coordinator", "Marketing Specialist", "Recruitment Officer"], "Financial Analyst", "職缺標題即為 Financial Analyst。"],
    ["Which task is listed as a responsibility?", ["Monthly forecasting", "Warehouse equipment repair", "Customer hotline support", "Contract translation"], "Monthly forecasting", "職務內容包含每月預測。"],
    ["What level of experience is requested?", ["At least 3 years", "No experience required", "At least 1 year", "More than 10 years"], "At least 3 years", "條件中明確寫至少三年經驗。"]
  ]}
];

let r7idx = 1;
const p7Translations = {
  "R7-1": "為了保留七月的停車權限，員工必須在 6 月 28 日前提交車牌號碼與員工編號。",
  "R7-2": "未在該日期前續辦的停車證，將於 7 月 1 日停用。",
  "R7-3": "這封信的對象是擁有停車權限的公司員工。",
  "R7-4": "行銷部門將於 6 月 12 日搬到 8 樓。",
  "R7-5": "員工必須在 6 月 10 日前打包個人物品，並在每個箱子上標示團隊名稱。",
  "R7-6": "IT 部門將於 6 月 13 日重新連接桌上型電腦。",
  "R7-7": "由於廚房設備維護，2 樓餐廳本週四上午 11 點 30 分至下午 1 點 30 分只供應有限菜單。",
  "R7-8": "這則通知適用於本週四上午 11 點 30 分至下午 1 點 30 分。",
  "R7-9": "請預期等候時間會比平常更長。",
  "R7-10": "BrightSkills 訓練中心提供週末商務英文課程。",
  "R7-11": "八堂課的學費為新台幣 6,800 元。",
  "R7-12": "7 月 5 日前報名者可獲得免費練習冊。",
  "R7-13": "供應商導入日將於 7 月 18 日在 402 室舉行。",
  "R7-14": "上午 10 點 45 分開始進行系統帳號設定。",
  "R7-15": "這份時程表最可能是給新核准的供應商看的。",
  "R7-16": "這張發票的總金額為新台幣 25,200 元。",
  "R7-17": "款項須在 30 天內以銀行轉帳支付。",
  "R7-18": "運費為新台幣 1,200 元。",
  "R7-19": "購買的服務是當日包裹配送。",
  "R7-20": "已用公司卡支付新台幣 385 元。",
  "R7-21": "收據上的已付款金額表示付款已完成。",
  "R7-22": "Delta Supply Ltd. 正在徵聘物流協調員。",
  "R7-23": "此職缺明確要求具備進階 Excel 技能。",
  "R7-24": "申請者須在 6 月 30 日前將履歷寄到 hr@deltasupply.com。",
  "R7-25": "新的線上預約工具快速且容易操作，評論者不到兩分鐘就訂好了會議室。",
  "R7-26": "取消政策很難找到。",
  "R7-27": "評論者提供了稱讚，也提出希望說明更清楚的建議。",
  "R7-28": "寄件者想繼續進行合作，但要求先修改合約第 3 條。",
  "R7-29": "對方要求加入 4 小時內緊急到場支援。",
  "R7-30": "這封信由營運經理 Nina Chen 撰寫。",
  "R7-31": "由於參加人數限制，6 月 21 日的產品網路研討會從 Zoom Room A 改到 Zoom Room C。",
  "R7-32": "收件者應用附件行事曆邀請中的新連結加入會議。",
  "R7-33": "這是一封通知網路研討會連結更新的電子郵件。",
  "R7-34": "所有樓層負責人都必須在每次演練後 24 小時內提交出席紀錄。",
  "R7-35": "提交期限是每次演練後 24 小時內。",
  "R7-36": "缺少紀錄會延誤提交給總部的合規報告。",
  "R7-37": "大廳門禁卡掃描器將於本週六上午 8 點至 11 點更換。",
  "R7-38": "在該時段，臨時紙本識別證會在接待櫃台發放。",
  "R7-39": "更換作業將花費三小時。",
  "R7-40": "GreenLine Courier 保證中午前提交的市區包裹可當日送達。",
  "R7-41": "固定費率為新台幣 180 元。",
  "R7-42": "該費率適用於 3 公斤以下的包裹。",
  "R7-43": "這份時程表是 7 月 3 日的新進員工說明會。",
  "R7-44": "上午 10 點 30 分安排 IT 帳號設定。",
  "R7-45": "這份時程表是給新進員工看的。",
  "R7-46": "緊急修復費用為新台幣 220 元。",
  "R7-47": "應付總金額為新台幣 1,000 元。",
  "R7-48": "付款截止日為 6 月 15 日。",
  "R7-49": "購買的品項是 200 份彩色型錄。",
  "R7-50": "收取的稅額為新台幣 95 元。",
  "R7-51": "付款方式為現金。",
  "R7-52": "Apex Manufacturing 正在徵聘財務分析師。",
  "R7-53": "職責包含每月預測、差異分析與儀表板報告。",
  "R7-54": "應徵者應具備 CPA 等級的會計知識與至少三年經驗。",
};
p7Groups.forEach((group, gi) => {
  group.items.forEach((item) => {
    const id = `R7-${r7idx++}`;
    sampleQuestions.push(q({
      id,
      section: "reading",
      part: "Part 7",
      type: "reading-comprehension",
      groupId: `R7G-${gi + 1}`,
      passage: group.passage,
      question: item[0],
      options: item[1],
      answer: item[2],
      explanation: `${item[3]} 中文解析：請依文本中的關鍵資訊定位答案。`,
      translation: p7Translations[id],
      image: group.image || "",
      imageAlt: group.imageAlt || "",
      imageCaption: group.imageCaption || "",
      tags: ["reading", group.type],
    }));
  });
});



const explicitExplanationMetadata = {
  "L1-1": {
    questionTranslation: "圖片中最可能正在發生什麼事？",
    optionTranslations: ["一名女子正在會議室調整投影機。", "一名廚師正在餐廳端湯。", "兩名工程師正在粉刷橋梁。", "一名店員正提早關店。"],
    optionReasons: ["正確，題目描述的女子、調整投影機與會議室場景都符合圖片內容。", "錯誤，圖片不是餐廳場景，也沒有廚師端湯。", "錯誤，圖片沒有兩名工程師，也沒有粉刷橋梁的動作。", "錯誤，圖片沒有店員關店或商店場景。"],
  },
  "L1-2": {
    questionTranslation: "圖片中最可能正在發生什麼事？",
    optionTranslations: ["幾名旅客正在登機門前排隊。", "一名技師正在修理腳踏車輪胎。", "顧客正在舞台附近跳舞。", "一名經理正在白板上書寫。"],
    optionReasons: ["正確，選項描述旅客在登機門前排隊，符合機場登機情境。", "錯誤，圖片沒有技師修理腳踏車輪胎。", "錯誤，圖片沒有舞台，也沒有顧客跳舞。", "錯誤，圖片沒有經理在白板上書寫。"],
  },
  "L1-3": {
    questionTranslation: "圖片中最可能正在發生什麼事？",
    optionTranslations: ["一名技術人員正在更換天花板燈具。", "員工正在市場卸下水果。", "一對夫妻正在飯店辦理入住。", "一名小孩正在公園餵鴨子。"],
    optionReasons: ["正確，選項描述技術人員更換天花板燈具，符合室內維修情境。", "錯誤，圖片不是市場，也沒有卸水果。", "錯誤，圖片沒有飯店櫃台或辦理入住情境。", "錯誤，圖片沒有小孩、公園或鴨子。"],
  },
  "L1-4": {
    questionTranslation: "圖片中最可能正在發生什麼事？",
    optionTranslations: ["工人正在倉庫裡堆放箱子。", "學生正在參加化學考試。", "一名飛行員正在迎接遊客。", "辦公室人員正在裝飾蛋糕。"],
    optionReasons: ["正確，選項描述工人在倉庫堆放箱子，符合倉儲場景與動作。", "錯誤，圖片沒有學生或考試場景。", "錯誤，圖片沒有飛行員迎接遊客。", "錯誤，圖片沒有裝飾蛋糕的動作。"],
  },
  "L1-5": {
    questionTranslation: "圖片中最可能正在發生什麼事？",
    optionTranslations: ["一名咖啡師正在把飲料遞給顧客。", "一名護理師正在檢查病人的脈搏。", "一名司機正在清洗公車。", "一名律師正在簽署合約。"],
    optionReasons: ["正確，選項描述咖啡師把飲料遞給顧客，符合咖啡吧台情境。", "錯誤，圖片沒有醫療場景或檢查脈搏動作。", "錯誤，圖片沒有司機或清洗公車。", "錯誤，圖片沒有律師簽署合約情境。"],
  },
  "L1-6": {
    questionTranslation: "圖片中最可能正在發生什麼事？",
    optionTranslations: ["一名騎自行車的人正在辦公大樓旁停放腳踏車。", "一名音樂家正在為小提琴調音。", "購物者正在試戴帽子。", "一名園丁正在修剪玫瑰。"],
    optionReasons: ["正確，選項描述騎自行車的人在辦公大樓旁停放腳踏車，符合畫面重點。", "錯誤，圖片沒有音樂家或小提琴。", "錯誤，圖片沒有購物者試戴帽子。", "錯誤，圖片沒有園丁修剪玫瑰。"],
  },
  "L2-1": {
    questionTranslation: "誰會主持明天的產品展示？",
    optionTranslations: ["業務部的廖先生會主持。", "在第三街的展示間。", "因為投影機故障了。", "大約在下午四點半。"],
    optionReasons: ["正確，Who 問人或職位，此選項直接回答主持者是業務部的廖先生。", "錯誤，這是地點回覆，沒有回答誰會主持。", "錯誤，這是原因回覆，沒有回答主持者。", "錯誤，這是時間回覆，沒有回答人物。"],
  },
  "L2-2": {
    questionTranslation: "客戶合約什麼時候到期？",
    optionTranslations: ["下週三中午到期。", "在法務部。", "陳小姐審查了它。", "為了避免滯納金。"],
    optionReasons: ["正確，When 問時間，此選項直接回答合約到期時間是下週三中午。", "錯誤，這是地點回覆，沒有回答到期時間。", "錯誤，這是人物與動作，沒有回答時間。", "錯誤，這是原因回覆，沒有回答什麼時候到期。"],
  },
  "L2-3": {
    questionTranslation: "參加研討會的訪客應該在哪裡報到？",
    optionTranslations: ["在主大廳的前台。", "透過填寫線上表單。", "在他們見到講師之後。", "因為需要識別證。"],
    optionReasons: ["正確，Where 問地點，此選項直接回答報到地點是主大廳前台。", "錯誤，這是方式，不是報到地點。", "錯誤，這是時間順序，不是地點。", "錯誤，這是原因，不是報到位置。"],
  },
  "L2-4": {
    questionTranslation: "客服團隊為什麼把這張支援單升級處理？",
    optionTranslations: ["這個問題影響了多位客戶。", "在二樓。", "到明天早上前。", "用替換電池。"],
    optionReasons: ["正確，Why 問原因，此選項說明升級處理的原因是問題影響多位客戶。", "錯誤，這是地點資訊，沒有說明原因。", "錯誤，這是時間資訊，沒有說明升級原因。", "錯誤，這是處理方式或工具，不是升級原因。"],
  },
  "L2-5": {
    questionTranslation: "我要如何申請差旅費報銷？",
    optionTranslations: ["在費用系統上傳收據。", "在簡報前的 9 點。", "人資部的吳小姐。", "台中的分公司。"],
    optionReasons: ["正確，How 問方法，此選項提供申請報銷的步驟。", "錯誤，這是時間回覆，沒有說明申請方法。", "錯誤，這是人物回覆，沒有說明操作步驟。", "錯誤，這是地點回覆，沒有說明如何申請。"],
  },
  "L2-6": {
    questionTranslation: "你介意關上會議室的窗戶嗎？",
    optionTranslations: ["不介意，我現在就去關。", "大約三公里後。", "合約昨天簽好了。", "因為型錄已經過時。"],
    optionReasons: ["正確，Would you mind 是請求句，此選項表示願意協助並立刻關窗。", "錯誤，這是距離資訊，沒有回應請求。", "錯誤，這是合約狀態，與關窗請求無關。", "錯誤，這是原因句，與是否願意關窗無關。"],
  },
  "L2-7": {
    questionTranslation: "你能把發票重新寄成 PDF 檔嗎？",
    optionTranslations: ["當然，我會在十分鐘內寄出。", "它已經在上一季付款了。", "在裝卸碼頭入口。", "財務工作坊。"],
    optionReasons: ["正確，Could you 是請求句，此選項直接表示會重新寄出 PDF。", "錯誤，這是付款狀態，沒有回應重新寄送的請求。", "錯誤，這是地點資訊，與寄發票無關。", "錯誤，這是活動名稱或主題，沒有回應請求。"],
  },
  "L2-8": {
    questionTranslation: "你知道停車場是否已經滿了嗎？",
    optionTranslations: ["是的，只有屋頂樓層還有空位。", "在附近的咖啡店。", "在星期五晚上。", "為了降低交通噪音。"],
    optionReasons: ["正確，Do you know whether 問狀態，此選項直接回答停車場剩餘空位情況。", "錯誤，這是地點回覆，沒有回答停車場是否已滿。", "錯誤，這是時間資訊，沒有回答停車場狀態。", "錯誤，這是原因回覆，與停車場是否已滿無關。"],
  },
  "L2-9": {
    questionTranslation: "董事會核准了哪一份提案？",
    optionTranslations: ["有分階段推行計畫的那一份。", "今天早上用快遞寄出。", "在天氣警報期間。", "在 C 棟接待處。"],
    optionReasons: ["正確，Which 問特定選項，此選項指出董事會核准的是分階段推行版本。", "錯誤，這是寄送方式與時間，沒有回答是哪一份提案。", "錯誤，這是情境或時間背景，不是提案內容。", "錯誤，這是地點資訊，沒有回答核准的提案。"],
  },
  "L2-10": {
    questionTranslation: "你已經提交每月庫存報告了嗎？",
    optionTranslations: ["是的，我午餐前就寄出了。", "在用品櫃裡。", "因為我們換了供應商。", "每三個月一次。"],
    optionReasons: ["正確，Have you 問是否完成，此選項明確回答已提交。", "錯誤，這是地點資訊，沒有回答是否提交。", "錯誤，這是原因回覆，沒有回答完成狀態。", "錯誤，這是頻率回覆，與是否已提交本月報告無關。"],
  },
  "L2-11": {
    questionTranslation: "我能把行李箱放在接待區嗎？",
    optionTranslations: ["可以，他們能幫你保管到下午 6 點。", "在 12 號登機門登機。", "行銷經理。", "從去年冬天開始。"],
    optionReasons: ["正確，Can I 問許可，此選項表示允許放置並說明保管時間。", "錯誤，這是登機地點資訊，沒有回答是否能放行李。", "錯誤，這是人物回覆，與許可問題無關。", "錯誤，這是時間起點，沒有回答是否允許。"],
  },
  "L2-12": {
    questionTranslation: "我們應該延後訓練課程嗎？",
    optionTranslations: ["是的，團隊有一半人員在出差。", "在舊倉庫。", "透過多印一些手冊。", "分公司的會計人員。"],
    optionReasons: ["正確，Should we 問建議，此選項表達同意延後，並給出團隊多人出差的理由。", "錯誤，這是地點資訊，沒有回應是否應延後課程。", "錯誤，這是方法資訊，沒有回答是否延後。", "錯誤，這是人物資訊，與延後訓練課程無關。"],
  },
  "L2-13": {
    questionTranslation: "軟體更新需要多久？",
    optionTranslations: ["每台裝置大約二十分鐘。", "在服務台櫃台。", "因為辦公室搬遷了。", "伊藤小姐核准了。"],
    optionReasons: ["正確，How long 問持續時間，此選項直接回答每台裝置約二十分鐘。", "錯誤，這是地點資訊，沒有回答時間長度。", "錯誤，這是原因回覆，沒有回答需要多久。", "錯誤，這是人物與動作，沒有回答時間長度。"],
  },
  "L2-14": {
    questionTranslation: "你們團隊多久檢討一次供應商表現？",
    optionTranslations: ["我們每季檢討一次。", "在 D 會議室。", "為了完成型錄。", "今天早上 8 點 15 分。"],
    optionReasons: ["正確，How often 問頻率，此選項直接回答每季檢討一次。", "錯誤，這是地點資訊，沒有回答頻率。", "錯誤，這是目的資訊，沒有回答多久一次。", "錯誤，這是單一時間點，沒有回答頻率。"],
  },
  "L2-15": {
    questionTranslation: "前往工廠的接駁車幾點出發？",
    optionTranslations: ["早上 7 點 40 分準時出發。", "在南側停車場附近。", "因為交通比較順。", "Park 先生預訂了它。"],
    optionReasons: ["正確，What time 問時刻，此選項直接回答接駁車出發時間。", "錯誤，這是地點資訊，沒有回答幾點出發。", "錯誤，這是原因回覆，沒有回答出發時間。", "錯誤，這是人物與動作，沒有回答時刻。"],
  },
  "L2-16": {
    questionTranslation: "你們部門由誰處理保固索賠？",
    optionTranslations: ["客服部的何小姐負責處理。", "在明天截止前。", "在配送中心。", "透過更換電纜。"],
    optionReasons: ["正確，Who 問負責人，此選項直接回答由客服部的何小姐處理。", "錯誤，這是時間資訊，沒有回答誰負責。", "錯誤，這是地點資訊，沒有回答負責人。", "錯誤，這是處理方式，沒有回答由誰處理。"],
  },
  "L2-17": {
    questionTranslation: "線上新進人員說明會什麼時候開始？",
    optionTranslations: ["下週一上午 10 點開始。", "在供應商入口網站上。", "因為講師人在國外。", "人資助理。"],
    optionReasons: ["正確，When 問開始時間，此選項直接回答說明會開始時間。", "錯誤，這是地點或平台資訊，沒有回答什麼時候開始。", "錯誤，這是原因資訊，沒有回答開始時間。", "錯誤，這是人物資訊，沒有回答時間。"],
  },
  "L2-18": {
    questionTranslation: "我可以在哪裡領取新的門禁卡？",
    optionTranslations: ["在一樓 B 安全櫃台。", "透過出示你的護照。", "在預算會議之後。", "因為你的舊卡過期了。"],
    optionReasons: ["正確，Where 問地點，此選項直接回答領取門禁卡的位置。", "錯誤，這是方式資訊，沒有回答在哪裡領取。", "錯誤，這是時間順序，沒有回答地點。", "錯誤，這是原因，沒有回答領取位置。"],
  },
  "L2-19": {
    questionTranslation: "為什麼展示機被蓋住了？",
    optionTranslations: ["活動前正在清潔。", "在西側入口。", "大約十分鐘後。", "採購部職員。"],
    optionReasons: ["正確，Why 問原因，此選項說明展示機被蓋住是因為活動前清潔。", "錯誤，這是地點資訊，沒有說明原因。", "錯誤，這是時間資訊，沒有回答為什麼被蓋住。", "錯誤，這是人物資訊，與原因不符。"],
  },
  "L2-20": {
    questionTranslation: "我們要如何降低列印成本？",
    optionTranslations: ["將預設列印設定為雙面列印。", "在外部倉庫。", "到下一個會計年度前。", "接待員會處理。"],
    optionReasons: ["正確，How 問做法，此選項提供降低列印成本的具體方法。", "錯誤，這是地點資訊，沒有說明降低成本的方法。", "錯誤，這是時間資訊，沒有回答如何降低成本。", "錯誤，這是人物與動作，沒有提出具體方法。"],
  },
  "L2-21": {
    questionTranslation: "你想在網路研討會前收到提醒電子郵件嗎？",
    optionTranslations: ["好的，請在一小時前寄一封。", "在報到櫃台。", "因為座位有限。", "IT 部門的 Singh 先生。"],
    optionReasons: ["正確，Would you like 問意願，此選項直接表示願意收到提醒信，並指定時間。", "錯誤，這是地點資訊，沒有回答是否想收到提醒信。", "錯誤，這是原因資訊，沒有回答意願。", "錯誤，這是人物資訊，沒有回答是否需要提醒信。"],
  },
  "L2-22": {
    questionTranslation: "你能確認 503 會議室是否有空嗎？",
    optionTranslations: ["當然，我現在會打給總務確認。", "在樓下美食廣場。", "每月電子報。", "從四月初開始。"],
    optionReasons: ["正確，Could you 問請求，此選項表示願意確認 503 會議室是否有空。", "錯誤，這是地點資訊，沒有回應確認會議室的請求。", "錯誤，這是文件或刊物名稱，與會議室是否有空無關。", "錯誤，這是時間起點，沒有回答請求。"],
  },
  "L2-23": {
    questionTranslation: "你知道緊急出口在哪裡嗎？",
    optionTranslations: ["知道，在兩端樓梯間旁邊。", "午餐後 2 點。", "為了完成稽核。", "訓練協調員。"],
    optionReasons: ["正確，Where 問地點，此選項直接回答緊急出口位置。", "錯誤，這是時間資訊，沒有回答出口位置。", "錯誤，這是目的資訊，沒有回答在哪裡。", "錯誤，這是人物資訊，與緊急出口位置無關。"],
  },
  "L2-24": {
    questionTranslation: "我們應該用哪種檔案格式製作手冊？",
    optionTranslations: ["用高解析度 PDF 範本。", "在影印中心。", "透過延長截止日期。", "星期五的實習生。"],
    optionReasons: ["正確，Which file format 問檔案格式，此選項直接回答要用高解析度 PDF 範本。", "錯誤，這是地點資訊，沒有回答檔案格式。", "錯誤，這是方法或動作，沒有指出格式。", "錯誤，這是人物與時間資訊，與檔案格式無關。"],
  },
  "L2-25": {
    questionTranslation: "你已經確認頒獎晚宴的場地了嗎？",
    optionTranslations: ["還沒，但我今天下午會確認。", "在舞台附近的 7 號廳。", "因為廚師遲到了。", "每個週末。"],
    optionReasons: ["正確，Have you 問是否完成，此選項直接回答尚未完成，並說明今天下午會確認。", "錯誤，這是場地資訊，但沒有回答是否已經確認。", "錯誤，這是原因資訊，與是否確認場地無關。", "錯誤，這是頻率資訊，沒有回答確認狀態。"],
  },
  "L3-1": {
    questionTranslation: "說話者為什麼要更改會議時間？",
    optionTranslations: ["主管週一會不在辦公室。", "預算檔案被刪除了。", "會議室要維修一週。", "財務部要求換更大的會議室。"],
    optionReasons: ["正確，對話中男方說主管週一早上要去高雄分公司，因此原訂會議時間需要更改。", "錯誤，對話沒有提到預算檔案被刪除。", "錯誤，對話沒有提到會議室維修。", "錯誤，財務部只是需要被通知，沒有要求更大的會議室。"],
  },
  "L3-2": {
    questionTranslation: "會議將在什麼時候舉行？",
    optionTranslations: ["週二下午 2 點。", "週一下午 2 點。", "週二上午 10 點。", "週五下午 2 點。"],
    optionReasons: ["正確，女方明確說把會議改到週二下午 2 點。", "錯誤，原本是週一的會議，但新時間不是週一下午 2 點。", "錯誤，對話沒有提到週二上午 10 點。", "錯誤，對話沒有提到週五下午 2 點。"],
  },
  "L3-3": {
    questionTranslation: "女方接下來最可能會做什麼？",
    optionTranslations: ["通知財務團隊新的時程。", "預訂前往高雄的火車票。", "獨自準備年度報告。", "完全取消會議。"],
    optionReasons: ["正確，女方說要通知 finance，代表下一步是通知財務團隊改期資訊。", "錯誤，去高雄分公司的是主管，對話沒有說女方要訂火車票。", "錯誤，對話沒有提到年度報告。", "錯誤，女方是改期，不是取消會議。"],
  },
  "L3-4": {
    questionTranslation: "男方打電話是為了什麼？",
    optionTranslations: ["確認飯店預訂。", "抱怨餐廳。", "詢問延誤的出貨。", "申請簽證。"],
    optionReasons: ["正確，男方一開始說想確認在 Harbor Hotel 的預訂。", "錯誤，對話沒有提到餐廳或抱怨。", "錯誤，對話沒有提到出貨。", "錯誤，對話沒有提到簽證申請。"],
  },
  "L3-5": {
    questionTranslation: "男方會住多久？",
    optionTranslations: ["三晚。", "一晚。", "五晚。", "一週。"],
    optionReasons: ["正確，女方確認男方從 7 月 8 日開始預訂三晚。", "錯誤，對話明確說三晚，不是一晚。", "錯誤，對話沒有提到五晚。", "錯誤，對話沒有提到住一週。"],
  },
  "L3-6": {
    questionTranslation: "男方提出什麼額外要求？",
    optionTranslations: ["晚上 9 點的機場接送。", "下午 6 點延後退房。", "免費升等房型。", "兩位客人的早餐。"],
    optionReasons: ["正確，男方要求安排晚上 9 點的機場接送。", "錯誤，對話沒有提到延後退房。", "錯誤，對話沒有提到房型升等。", "錯誤，對話沒有提到早餐。"],
  },
  "L3-7": {
    questionTranslation: "女方回報了什麼問題？",
    optionTranslations: ["她收到損壞的耳機。", "她忘記帳號密碼。", "她被收了兩次費用。", "她拿到錯誤的發票日期。"],
    optionReasons: ["正確，女方明確說她收到的耳機有損壞。", "錯誤，對話沒有提到忘記帳號密碼。", "錯誤，對話沒有提到重複收費。", "錯誤，對話沒有提到發票日期錯誤。"],
  },
  "L3-8": {
    questionTranslation: "男方提出什麼解決方式？",
    optionTranslations: ["今天寄出替換品。", "只提供全額退款。", "下個月派技術人員。", "取消所有未來訂單。"],
    optionReasons: ["正確，男方說今天下午會寄出替換品。", "錯誤，對話沒有提到全額退款。", "錯誤，對話沒有提到下個月派技術人員。", "錯誤，對話沒有提到取消未來訂單。"],
  },
  "L3-9": {
    questionTranslation: "替換品應該寄到哪裡？",
    optionTranslations: ["寄到女方的辦公室。", "寄到便利商店。", "寄到公司的倉庫。", "寄到機場櫃台。"],
    optionReasons: ["正確，女方要求寄到她的辦公室地址。", "錯誤，對話沒有提到便利商店。", "錯誤，對話沒有提到公司倉庫。", "錯誤，對話沒有提到機場櫃台。"],
  },
  "L3-10": {
    questionTranslation: "說話者正在準備什麼活動？",
    optionTranslations: ["產品展示。", "新聞訪問。", "安全檢查。", "預算會議。"],
    optionReasons: ["正確，男方開頭說產品展示十分鐘後開始。", "錯誤，對話沒有提到新聞訪問。", "錯誤，對話沒有提到安全檢查。", "錯誤，對話沒有提到預算會議。"],
  },
  "L3-11": {
    questionTranslation: "女方會做什麼？",
    optionTranslations: ["準備樣品和型錄。", "列印員工識別證。", "打電話給送貨司機。", "檢查飯店預訂。"],
    optionReasons: ["正確，女方說她現在會擺好樣品和型錄。", "錯誤，對話沒有提到列印員工識別證。", "錯誤，對話沒有提到打電話給送貨司機。", "錯誤，對話沒有提到飯店預訂。"],
  },
  "L3-12": {
    questionTranslation: "男方會在哪裡？",
    optionTranslations: ["在入口。", "在儲藏室。", "在收銀台。", "在裝卸碼頭。"],
    optionReasons: ["正確，男方說他會在入口迎接來賓。", "錯誤，對話沒有提到男方在儲藏室。", "錯誤，對話沒有提到收銀台。", "錯誤，對話沒有提到裝卸碼頭。"],
  },
  "L3-13": {
    questionTranslation: "女方要求什麼？",
    optionTranslations: ["鋼製支架的報價。", "修改後的訓練時程。", "更新後的薪資名單。", "預訂會議場地。"],
    optionReasons: ["正確，女方說需要 500 個鋼製支架的報價。", "錯誤，對話沒有提到訓練時程。", "錯誤，對話沒有提到薪資名單。", "錯誤，對話沒有提到會議場地預訂。"],
  },
  "L3-14": {
    questionTranslation: "男方什麼時候會提供價格？",
    optionTranslations: ["明天早上前。", "本月底前。", "今天下午。", "下週。"],
    optionReasons: ["正確，男方說明天早上可以提供單價。", "錯誤，對話沒有提到本月底。", "錯誤，對話沒有說今天下午提供價格。", "錯誤，對話沒有提到下週提供價格。"],
  },
  "L3-15": {
    questionTranslation: "還需要什麼額外資訊？",
    optionTranslations: ["運費和交期。", "退稅文件。", "保險單號碼。", "只有產品照片。"],
    optionReasons: ["正確，女方要求報價中加入運費和交期。", "錯誤，對話沒有提到退稅文件。", "錯誤，對話沒有提到保險單號碼。", "錯誤，女方要的是運費和交期，不是只有產品照片。"],
  },
  "L3-16": {
    questionTranslation: "說話者正在討論什麼？",
    optionTranslations: ["員工訓練課程。", "客戶晚餐。", "軟體故障。", "合約續約。"],
    optionReasons: ["正確，男方開頭說新進員工訓練在這週五。", "錯誤，對話沒有提到客戶晚餐。", "錯誤，對話沒有提到軟體故障。", "錯誤，對話沒有提到合約續約。"],
  },
  "L3-17": {
    questionTranslation: "為什麼他們需要較大的教室？",
    optionTranslations: ["很多員工報名了。", "投影機不見了。", "原本的教室永久關閉了。", "講師要求戶外座位。"],
    optionReasons: ["正確，男方說有三十位員工報名，因此需要較大的訓練教室。", "錯誤，對話沒有提到投影機不見。", "錯誤，對話沒有提到原本教室永久關閉。", "錯誤，對話沒有提到講師要求戶外座位。"],
  },
  "L3-18": {
    questionTranslation: "訓練安排在什麼時候？",
    optionTranslations: ["本週五。", "明天早上。", "下週一。", "本季結束時。"],
    optionReasons: ["正確，男方第一句說新進員工訓練在本週五。", "錯誤，對話沒有提到明天早上。", "錯誤，對話沒有提到下週一。", "錯誤，對話沒有提到本季結束時。"],
  },
  "L3-19": {
    questionTranslation: "對話中提到什麼設備問題？",
    optionTranslations: ["影印機一直卡紙。", "掃描器無法連接 Wi-Fi。", "投影機燈泡壞了。", "筆電電池膨脹。"],
    optionReasons: ["正確，女方說六樓的影印機一直卡紙。", "錯誤，對話沒有提到掃描器無法連接 Wi-Fi。", "錯誤，對話沒有提到投影機燈泡壞了。", "錯誤，對話沒有提到筆電電池膨脹。"],
  },
  "L3-20": {
    questionTranslation: "男方什麼時候會檢查機器？",
    optionTranslations: ["午餐後。", "上午 9 點前。", "明天晚上。", "下週。"],
    optionReasons: ["正確，男方說午餐後會立刻檢查。", "錯誤，對話沒有提到上午 9 點前。", "錯誤，對話沒有提到明天晚上。", "錯誤，對話沒有提到下週。"],
  },
  "L3-21": {
    questionTranslation: "為什麼快速維修很重要？",
    optionTranslations: ["今天必須列印薪資文件。", "客戶參觀現在開始。", "辦公室今晚搬遷。", "影印機租約今天到期。"],
    optionReasons: ["正確，女方說今天需要用影印機列印薪資文件。", "錯誤，對話沒有提到客戶參觀。", "錯誤，對話沒有提到辦公室今晚搬遷。", "錯誤，對話沒有提到影印機租約到期。"],
  },
  "L3-22": {
    questionTranslation: "男方的旅行計畫有什麼變更？",
    optionTranslations: ["他的班機現在早上 6 點起飛。", "他的目的地改成東京。", "他的飯店預訂被取消。", "他的護照過期了。"],
    optionReasons: ["正確，男方說他飛大阪的班機改到早上 6 點。", "錯誤，對話沒有提到目的地改成東京。", "錯誤，對話沒有提到飯店預訂被取消。", "錯誤，對話沒有提到護照過期。"],
  },
  "L3-23": {
    questionTranslation: "女方會更新什麼？",
    optionTranslations: ["行程和飯店入住時間。", "年度預算報告。", "產品型錄。", "訓練出席表。"],
    optionReasons: ["正確，女方說她會修改男方的行程和飯店入住時間。", "錯誤，對話沒有提到年度預算報告。", "錯誤，對話沒有提到產品型錄。", "錯誤，對話沒有提到訓練出席表。"],
  },
  "L3-24": {
    questionTranslation: "還需要通知誰？",
    optionTranslations: ["客戶。", "大樓管理員。", "快遞公司。", "會計實習生。"],
    optionReasons: ["正確，男方要求女方也通知客戶他會更早抵達。", "錯誤，對話沒有提到大樓管理員。", "錯誤，對話沒有提到快遞公司。", "錯誤，對話沒有提到會計實習生。"],
  },
  "L3-25": {
    questionTranslation: "說話者正在規劃什麼專案？",
    optionTranslations: ["辦公室搬遷。", "產品上市。", "稅務稽核。", "供應商展覽。"],
    optionReasons: ["正確，女方說辦公室搬遷下週末開始。", "錯誤，對話沒有提到產品上市。", "錯誤，對話沒有提到稅務稽核。", "錯誤，對話沒有提到供應商展覽。"],
  },
  "L3-26": {
    questionTranslation: "男方會負責什麼工作？",
    optionTranslations: ["標示各部門的箱子。", "預訂搬家卡車。", "安裝電腦。", "準備歡迎禮物。"],
    optionReasons: ["正確，男方說他這週四會幫各部門的箱子貼標籤。", "錯誤，對話沒有提到男方會預訂搬家卡車。", "錯誤，IT 會處理電腦相關事項，不是男方負責安裝電腦。", "錯誤，對話沒有提到準備歡迎禮物。"],
  },
  "L3-27": {
    questionTranslation: "IT 會做什麼？",
    optionTranslations: ["週五晚上拔除電腦設備。", "週四早上設置桌子。", "把箱子送到分公司。", "核准搬遷費用。"],
    optionReasons: ["正確，女方說 IT 會在週五晚上拔除所有電腦設備。", "錯誤，對話沒有提到週四早上設置桌子。", "錯誤，對話沒有提到把箱子送到分公司。", "錯誤，對話沒有提到 IT 會核准搬遷費用。"],
  },
  "L3-28": {
    questionTranslation: "對話中提到什麼截止時間？",
    optionTranslations: ["安全講座報名明天下午 5 點截止。", "薪資提交今晚截止。", "飯店預訂今天早上截止。", "合約審查下週截止。"],
    optionReasons: ["正確，男方說安全講座報名明天下午 5 點截止。", "錯誤，對話沒有提到薪資提交今晚截止。", "錯誤，對話沒有提到飯店預訂今天早上截止。", "錯誤，對話沒有提到合約審查下週截止。"],
  },
  "L3-29": {
    questionTranslation: "哪個部門還需要參加人員？",
    optionTranslations: ["會計部。", "業務部。", "人力資源部。", "法務部。"],
    optionReasons: ["正確，女方說會計部還缺五位人員。", "錯誤，對話沒有提到業務部還缺人。", "錯誤，對話沒有提到人力資源部還缺人。", "錯誤，對話沒有提到法務部還缺人。"],
  },
  "L3-30": {
    questionTranslation: "男方接下來會做什麼？",
    optionTranslations: ["寄提醒電子郵件。", "取消講座。", "預訂更大的大廳。", "列印名牌。"],
    optionReasons: ["正確，男方說今天下午會寄提醒給會計部。", "錯誤，對話沒有提到取消講座。", "錯誤，對話沒有提到預訂更大的大廳。", "錯誤，對話沒有提到列印名牌。"],
  },
  "L3-31": {
    questionTranslation: "法務提出什麼要求？",
    optionTranslations: ["確認第 12 條。", "新的行銷計畫。", "緊急招募需求。", "倉庫檢查。"],
    optionReasons: ["正確，女方說法務要求確認草案中的第 12 條。", "錯誤，對話沒有提到新的行銷計畫。", "錯誤，對話沒有提到緊急招募需求。", "錯誤，對話沒有提到倉庫檢查。"],
  },
  "L3-32": {
    questionTranslation: "男方會比較什麼？",
    optionTranslations: ["草案與前一版合約。", "兩張出貨發票。", "三份供應商型錄。", "舊員工紀錄。"],
    optionReasons: ["正確，男方說他會把草案和前一版合約比對。", "錯誤，對話沒有提到兩張出貨發票。", "錯誤，對話沒有提到供應商型錄。", "錯誤，對話沒有提到舊員工紀錄。"],
  },
  "L3-33": {
    questionTranslation: "最終版本需要在什麼時候前完成？",
    optionTranslations: ["今天下午 5 點前。", "明天中午前。", "本週結束前。", "沒有給截止時間。"],
    optionReasons: ["正確，女方說請在今天下午 5 點前寄出最終版本。", "錯誤，對話沒有提到明天中午前。", "錯誤，對話沒有提到本週結束前。", "錯誤，對話明確給出今天下午 5 點前的截止時間。"],
  },
  "L3-34": {
    questionTranslation: "對話中討論了什麼庫存問題？",
    optionTranslations: ["碳粉庫存不足。", "迴紋針庫存過多。", "印表機被退回。", "倉庫層架壞了。"],
    optionReasons: ["正確，男方說碳粉庫存又不夠了。", "錯誤，對話沒有提到迴紋針庫存過多。", "錯誤，對話沒有提到印表機被退回。", "錯誤，對話沒有提到倉庫層架壞了。"],
  },
  "L3-35": {
    questionTranslation: "女方會採取什麼行動？",
    optionTranslations: ["今天下加急訂單。", "取消所有列印工作。", "要求削減預算。", "把庫存移到另一個城市。"],
    optionReasons: ["正確，女方說她今天下午會下加急訂單。", "錯誤，對話沒有提到取消列印工作。", "錯誤，對話沒有提到削減預算。", "錯誤，對話沒有提到把庫存移到另一個城市。"],
  },
  "L3-36": {
    questionTranslation: "下單後應該做什麼？",
    optionTranslations: ["更新庫存表。", "通知飯店接待處。", "提交差旅費。", "列印訓練手冊。"],
    optionReasons: ["正確，男方要求下單後更新庫存表。", "錯誤，對話沒有提到飯店接待處。", "錯誤，對話沒有提到提交差旅費。", "錯誤，對話沒有提到列印訓練手冊。"],
  },
  "L3-37": {
    questionTranslation: "他們正在談論什麼專案？",
    optionTranslations: ["手機 App 專案。", "分公司搬遷。", "客戶退款案件。", "配送路線變更。"],
    optionReasons: ["正確，女方開頭問手機 App 專案進度。", "錯誤，對話沒有提到分公司搬遷。", "錯誤，對話沒有提到客戶退款案件。", "錯誤，對話沒有提到配送路線變更。"],
  },
  "L3-38": {
    questionTranslation: "程式開發完成多少？",
    optionTranslations: ["大約 70%。", "大約 30%。", "完全完成。", "程式開發尚未開始。"],
    optionReasons: ["正確，男方說程式開發約完成 70%。", "錯誤，對話沒有說完成 30%。", "錯誤，男方說約完成 70%，不是完全完成。", "錯誤，男方說程式開發已完成約 70%，不是尚未開始。"],
  },
  "L3-39": {
    questionTranslation: "女方要求什麼？",
    optionTranslations: ["明天中午前提交進度報告。", "今晚前提交新的設計模型。", "發出會議取消通知。", "提出增加預算的要求。"],
    optionReasons: ["正確，女方要求男方在明天中午前寄給她進度報告。", "錯誤，對話沒有提到新的設計模型。", "錯誤，對話沒有提到取消會議。", "錯誤，對話沒有提到增加預算。"],
  },
  "R5-1": {
    questionTranslation: "稽核員抵達時，團隊已經整理好所有收據。空格應填入哪個動詞形式？",
    optionTranslations: ["已經整理好（過去完成式）。", "已經整理好（現在完成式）。", "整理（原形動詞）。", "正在整理／整理中（動名詞或現在分詞）。"],
    optionReasons: ["正確，by the time 加過去時間 arrived 表示稽核員抵達之前已完成的動作，需用過去完成式 had organized。", "錯誤，has organized 是現在完成式，不能配合 arrived 這個過去時間點之前的動作。", "錯誤，organize 是原形動詞，無法與主詞 the team 和過去完成語意搭配。", "錯誤，organizing 是動名詞或現在分詞，不能表達已完成整理的動作。"],
  },
  "R5-2": {
    questionTranslation: "請把已簽署的協議放進藍色資料夾。空格應填入哪個介系詞？",
    optionTranslations: ["在裡面。", "在某地點或時間點。", "為了，給。", "和，用。"],
    optionReasons: ["正確，文件放在資料夾裡，應填 in。", "錯誤，at 常指地點或時間點，不適合表達放進資料夾裡。", "錯誤，for 表示目的或對象，不符合句意。", "錯誤，with 表示和或用，不符合句意。"],
  },
  "R5-3": {
    questionTranslation: "經理核准了加班，因為截止日期被提前了。空格應填入哪個連接詞？",
    optionTranslations: ["因為。", "雖然。", "除非。", "然而，而。"],
    optionReasons: ["正確，後半句說明核准加班的原因，應填 because。", "錯誤，although 表示讓步，句意不符。", "錯誤，unless 表示除非，句意不符。", "錯誤，whereas 表示對比，句意不符。"],
  },
  "R5-4": {
    questionTranslation: "她的說明清楚且很有說服力。空格應填入哪個詞性？",
    optionTranslations: ["有說服力的。", "說服。", "說服力，說服。", "有說服力地。"],
    optionReasons: ["正確，clear 是形容詞，and 連接平行結構，空格也應填形容詞 persuasive。", "錯誤，persuade 是動詞，不能和 clear 平行。", "錯誤，persuasion 是名詞，不能修飾 explanation。", "錯誤，persuasively 是副詞，不能和 clear 平行。"],
  },
  "R5-5": {
    questionTranslation: "所有訪客識別證都必須歸還到前台。空格應填入哪個動詞形式？",
    optionTranslations: ["被歸還。", "歸還，原形動詞。", "已歸還，過去式或過去分詞。", "正在被歸還。"],
    optionReasons: ["正確，visitor badges 是被歸還，must 後接 be returned 形成被動語態。", "錯誤，return 是主動語態，主詞 badges 不能主動歸還自己。", "錯誤，returned 少了 be，不能構成 must 後的被動結構。", "錯誤，be returning 是進行式語意，不符合必須被歸還的規定。"],
  },
  "R5-6": {
    questionTranslation: "我們決定在簽合約前先與供應商會面。空格應填入哪個動詞形式？",
    optionTranslations: ["去會面。", "會面，動名詞或現在分詞。", "會面，原形動詞。", "會面，過去式或過去分詞。"],
    optionReasons: ["正確，decide 後面接不定詞 to meet。", "錯誤，meeting 不能直接接在 decided 後表達決定做某事。", "錯誤，meet 是原形動詞，缺少 to。", "錯誤，met 是過去式或過去分詞，不符合 decide to V 句型。"],
  },
  "R5-7": {
    questionTranslation: "他們把安裝軟體延後到下週。空格應填入哪個動詞形式？",
    optionTranslations: ["安裝，動名詞。", "去安裝，不定詞。", "安裝，原形動詞。", "安裝，過去式或過去分詞。"],
    optionReasons: ["正確，postpone 後面接動名詞，因此應填 installing。", "錯誤，to install 是不定詞，不符合 postpone 後接 V-ing 的句型。", "錯誤，install 是原形動詞，不能直接接在 postponed 後面。", "錯誤，installed 是過去式或過去分詞，不符合此句型。"],
  },
  "R5-8": {
    questionTranslation: "準備圖表的助理會先進行簡報。空格應填入哪個關係代名詞？",
    optionTranslations: ["指人且作主詞的關係代名詞。", "指物的關係代名詞。", "指人且作受詞的關係代名詞。", "表示所有關係的關係代名詞。"],
    optionReasons: ["正確，先行詞是 The assistant，且關係子句中缺主詞，所以應填 who。", "錯誤，which 通常指物，不適合指 assistant。", "錯誤，whom 指人但作受詞，這裡缺的是主詞。", "錯誤，whose 表所有關係，句中沒有所有格語意。"],
  },
  "R5-9": {
    questionTranslation: "本季利潤比上一季高。空格應填入哪個比較級？",
    optionTranslations: ["更高的。", "最高的。", "高的。", "錯誤形式的更高。"],
    optionReasons: ["正確，than 表示兩者比較，profit 高低比較應填 higher。", "錯誤，highest 是最高級，不符合 than 的比較結構。", "錯誤，high 是原級，不能搭配 than 表示比較。", "錯誤，high 的比較級是 higher，不是 more high。"],
  },
  "R5-10": {
    questionTranslation: "接待員已經確認了你的預約。空格應填入哪個副詞？",
    optionTranslations: ["已經。", "尚未，還。", "仍然。", "非標準英文用字。"],
    optionReasons: ["正確，has already confirmed 表示已經確認，already 放在助動詞 has 後、過去分詞 confirmed 前。", "錯誤，yet 常用於疑問句或否定句，這裡是肯定句。", "錯誤，still 表示仍然，放入句中語意不如 already 精確。", "錯誤，almostly 不是標準英文副詞。"],
  },
  "R5-11": {
    questionTranslation: "在審查提案兩次後，她發現一個定價錯誤。空格應填入哪個分詞形式？",
    optionTranslations: ["審查，現在分詞。", "審查，原形動詞。", "已審查，過去分詞。", "為了審查，不定詞。"],
    optionReasons: ["正確，Reviewing the proposal twice 作分詞構句，表示她審查提案後發現錯誤。", "錯誤，Review 是原形動詞，不能直接放在句首形成此分詞構句。", "錯誤，Reviewed 表示被審查，主詞 she 與動作關係不符。", "錯誤，To review 表目的，句意會變成為了審查而發現錯誤，不自然。"],
  },
  "R5-12": {
    questionTranslation: "如果我是你，我會要求延長期限。空格應填入哪個假設語氣形式？",
    optionTranslations: ["是，假設語氣。", "是，現在式第一人稱。", "是，過去式。", "是，原形。"],
    optionReasons: ["正確，If I were in your position 是與現在事實相反的假設語氣，應填 were。", "錯誤，am 是直述語氣現在式，不符合假設語氣。", "錯誤，was 在口語中有時出現，但標準假設語氣此題應選 were。", "錯誤，be 是原形，不能直接接在 I 後面。"],
  },
  "R5-13": {
    questionTranslation: "出貨清單中少了幾個項目。空格應填入哪個名詞形式？",
    optionTranslations: ["項目，複數。", "項目，單數。", "項目的，單數所有格。", "項目的，複數所有格。"],
    optionReasons: ["正確，several 後面接可數複數名詞，因此應填 items。", "錯誤，item 是單數，不能直接接在 several 後面。", "錯誤，item's 是所有格，不符合句中主詞位置。", "錯誤，items' 是複數所有格，不符合句意。"],
  },
  "R5-14": {
    questionTranslation: "在我們完成預算前，需要更多資訊。空格應填入哪個名詞形式？",
    optionTranslations: ["資訊。", "錯誤的複數資訊。", "一個資訊。", "非正式的資訊。"],
    optionReasons: ["正確，information 是不可數名詞，可接 more，表示更多資訊。", "錯誤，information 不加複數 s。", "錯誤，information 是不可數名詞，不能說 an information。", "錯誤，info 偏口語且非此題正式語境的最佳答案。"],
  },
  "R5-15": {
    questionTranslation: "每個部門都必須提交每月摘要。空格應填入哪個動詞形式？",
    optionTranslations: ["是，單數現在式。", "是，複數現在式。", "是，過去式。", "是，原形。"],
    optionReasons: ["正確，Each department 視為單數主詞，因此應填 is。", "錯誤，are 搭配複數主詞，不符合 Each department。", "錯誤，were 是過去式，句子是在描述一般規定。", "錯誤，be 是原形，不能直接接在 Each department 後面。"],
  },
  "R5-16": {
    questionTranslation: "到明年六月時，這家公司在這棟大樓營運就滿十年了。空格應填入哪個時態？",
    optionTranslations: ["將已經營運，未來完成式。", "將營運，未來簡單式。", "營運了，過去式。", "已經營運，現在完成式。"],
    optionReasons: ["正確，By next June 表示到未來某時間點以前已完成或持續的動作，應填 will have operated。", "錯誤，will operate 只表示未來會營運，無法表達到明年六月已滿十年的完成語意。", "錯誤，operated 是過去式，不能搭配 By next June 的未來時間。", "錯誤，has operated 是現在完成式，不能表達到未來時間點前的完成狀態。"],
  },
  "R5-17": {
    questionTranslation: "儘管交通壅塞，包裹仍準時送達。空格應填入哪個介系詞？",
    optionTranslations: ["在上面，準時片語的一部分。", "在裡面。", "在某地點或時間點。", "從。"],
    optionReasons: ["正確，on time 是固定片語，表示準時。", "錯誤，in time 表示及時，不是本句要表達的準時送達。", "錯誤，at time 不是此語境的正確片語。", "錯誤，from 表示來源或起點，無法組成準時的意思。"],
  },
  "R5-18": {
    questionTranslation: "你收到已簽署的副本後，請打電話給我。空格應填入哪個連接詞？",
    optionTranslations: ["一旦。", "除非。", "儘管。", "然而，而。"],
    optionReasons: ["正確，once 表示一旦，符合收到副本後就打電話的時間條件。", "錯誤，unless 表示除非，句意會變成除非你收到副本，邏輯不符。", "錯誤，despite 是介系詞，後面不能直接接完整子句 you receive。", "錯誤，whereas 表示對比，不符合時間條件語意。"],
  },
  "R5-19": {
    questionTranslation: "主管簡短說明了合併計畫。空格應填入哪個詞性？",
    optionTranslations: ["簡短地。", "簡短的。", "簡短，名詞。", "簡報，說明會。"],
    optionReasons: ["正確，spoke 是動詞，修飾動詞要用副詞 briefly。", "錯誤，brief 是形容詞，不能直接修飾 spoke。", "錯誤，briefness 是名詞，不符合修飾動詞的位置。", "錯誤，briefing 是名詞，表示簡報或說明會，不符合句型。"],
  },
  "R5-20": {
    questionTranslation: "所有報告都應在星期五中午前提交。空格應填入哪個動詞形式？",
    optionTranslations: ["被提交。", "提交，原形動詞。", "已提交，過去式或過去分詞。", "正在提交。"],
    optionReasons: ["正確，reports 是被提交，should 後接 be submitted 形成被動語態。", "錯誤，submit 是主動語態，主詞 reports 不能主動提交自己。", "錯誤，submitted 少了 be，不能構成 should 後的被動結構。", "錯誤，be submitting 是進行式語意，不符合規定句中的被提交。"],
  },
  "R5-21": {
    questionTranslation: "他同意今晚修改簡報投影片。空格應填入哪個動詞形式？",
    optionTranslations: ["去修改。", "修改，動名詞或現在分詞。", "修改，原形動詞。", "修改，過去式或過去分詞。"],
    optionReasons: ["正確，agree 後面接不定詞，因此應填 to revise。", "錯誤，revising 不能直接接在 agreed 後表達同意做某事。", "錯誤，revise 是原形動詞，缺少 to。", "錯誤，revised 是過去式或過去分詞，不符合 agree to V 句型。"],
  },
  "R5-22": {
    questionTranslation: "我們建議你每三個月更換一次密碼。空格應填入哪個動詞形式？",
    optionTranslations: ["更換，動名詞。", "去更換，不定詞。", "更換，原形動詞。", "更換，過去式或過去分詞。"],
    optionReasons: ["正確，recommend 後面接動名詞，因此應填 changing。", "錯誤，to change 不符合本題設定的 recommend 後接 V-ing 用法。", "錯誤，change 是原形動詞，不能直接接在 recommend 後面。", "錯誤，changed 是過去式或過去分詞，不符合句型。"],
  },
  "R5-23": {
    questionTranslation: "窗戶朝東的辦公室會照到早晨陽光。空格應填入哪個關係代名詞？",
    optionTranslations: ["表示所有關係的關係代名詞。", "指人且作主詞的關係代名詞。", "指物的關係代名詞。", "指人且作受詞的關係代名詞。"],
    optionReasons: ["正確，windows 屬於 The office，表示所有關係應填 whose。", "錯誤，who 指人且作主詞，不適合指 office。", "錯誤，which 可指物，但不能表達 office 的 windows 這種所有關係。", "錯誤，whom 指人且作受詞，不符合句意。"],
  },
  "R5-24": {
    questionTranslation: "這個型號比前一個更耐用。空格應填入哪個比較級？",
    optionTranslations: ["更耐用的。", "最耐用的。", "耐用地。", "耐用性。"],
    optionReasons: ["正確，than 表示兩者比較，durable 的比較級用 more durable。", "錯誤，most durable 是最高級，不符合 than 的兩者比較。", "錯誤，durably 是副詞，不能作為 is 後的主詞補語形容 model。", "錯誤，durability 是名詞，不符合句型。"],
  },
  "R5-25": {
    questionTranslation: "法務團隊剛剛審查完最終草稿。空格應填入哪個副詞？",
    optionTranslations: ["剛剛。", "尚未，還。", "仍然。", "幾乎。"],
    optionReasons: ["正確，has just reviewed 表示剛剛審查完，just 常放在 has 和過去分詞 reviewed 中間。", "錯誤，yet 常用於疑問句或否定句，不適合此肯定句。", "錯誤，still 表示仍然，語意不如 just 符合已剛完成的狀態。", "錯誤，almost 表示幾乎，語意會變成幾乎審查完，不符合句意。"],
  },
  "R5-26": {
    questionTranslation: "檢查完所有佐證檔案後，他送出了申請。空格應填入哪個分詞形式？",
    optionTranslations: ["檢查，現在分詞。", "已檢查，過去分詞。", "檢查，原形動詞。", "錯誤的不定詞形式。"],
    optionReasons: ["正確，Checking all supporting files 作分詞構句，表示他檢查完檔案後送出申請。", "錯誤，Checked 表示被檢查，主詞 he 與動作關係不符。", "錯誤，Check 是原形動詞，不能直接放在句首形成此分詞構句。", "錯誤，To checking 不是正確的不定詞形式。"],
  },
  "R5-27": {
    questionTranslation: "如果天氣好一點，活動就會在戶外舉行。空格應填入哪個假設語氣形式？",
    optionTranslations: ["是，假設語氣。", "是，現在式。", "是，過去式。", "是，原形。"],
    optionReasons: ["正確，If the weather were better 是與現在事實相反的假設語氣，應填 were。", "錯誤，is 是直述語氣現在式，不符合 would be outdoors 的假設語氣結構。", "錯誤，was 在口語中可能出現，但標準假設語氣此題應選 were。", "錯誤，be 是原形，不能直接接在 the weather 後面。"],
  },
  "R5-28": {
    questionTranslation: "所有箱子在入庫前都必須貼上標籤。空格應填入哪個名詞形式？",
    optionTranslations: ["箱子，複數。", "箱子，單數。", "錯誤的複數形式。", "箱子的，單數所有格。"],
    optionReasons: ["正確，All 後接可數複數名詞，因此應填 boxes。", "錯誤，box 是單數，不能直接接在 All 後表示所有箱子。", "錯誤，box 的複數是 boxes，不是 boxs。", "錯誤，box's 是所有格，不符合句中主詞位置。"],
  },
  "R5-29": {
    questionTranslation: "印表機裡剩下的墨水不多了。空格應填入哪個名詞形式？",
    optionTranslations: ["墨水。", "錯誤的複數墨水。", "一個墨水。", "正在上墨或相關動作。"],
    optionReasons: ["正確，ink 是不可數名詞，可搭配 much，表示墨水不多。", "錯誤，ink 作為墨水時通常不可數，不加複數 s。", "錯誤，ink 是不可數名詞，不能說 an ink。", "錯誤，inking 是動名詞或現在分詞，不符合名詞位置與句意。"],
  },
  "R5-30": {
    questionTranslation: "這兩份提案都無法被董事會接受。空格應填入哪個動詞形式？",
    optionTranslations: ["是，單數現在式。", "是，複數現在式。", "是，過去式。", "是，原形。"],
    optionReasons: ["正確，Neither of the proposals 視為單數主詞，因此應填 is。", "錯誤，are 搭配複數主詞，不符合 neither 的單數用法。", "錯誤，were 是過去式，句子是在描述目前判斷。", "錯誤，be 是原形，不能直接接在 Neither of the proposals 後面。"],
  },
  "R6-1": {
    questionTranslation: "這則通知的主要目的是什麼？",
    optionTranslations: ["宣布新的每週回報規定。", "取消內部網路存取權。", "招募新的經理。", "說明差旅費報銷。"],
    optionReasons: ["正確，短文說各部門從 7 月 1 日起必須每週五提交進度更新，主旨是宣布新的回報規定。", "錯誤，短文提到使用內部網路表單，沒有說取消存取權。", "錯誤，短文沒有招募經理的內容。", "錯誤，短文沒有討論差旅費或報銷流程。"],
  },
  "R6-2": {
    questionTranslation: "每週回報截止時間是什麼時候？",
    optionTranslations: ["星期五下午 4 點前。", "星期四中午前。", "星期一上午 9 點前。", "週末任何時間。"],
    optionReasons: ["正確，通知說所有部門必須每週五下午 4 點前提交進度更新。", "錯誤，短文沒有提到星期四中午前。", "錯誤，短文沒有提到星期一上午 9 點前。", "錯誤，短文給了明確截止時間，不是週末任何時間。"],
  },
  "R6-3": {
    questionTranslation: "更新必須透過內部網路表單提交。空格應填入哪個介系詞？",
    optionTranslations: ["透過。", "在兩者之間。", "儘管。", "橫跨，穿過。"],
    optionReasons: ["正確，through the intranet form 表示透過內部網路表單提交。", "錯誤，between 表示在兩者之間，不符合提交管道。", "錯誤，despite 表示儘管，不符合句意。", "錯誤，across 表示橫跨或穿過，不符合透過表單的語意。"],
  },
  "R6-4": {
    questionTranslation: "用電子郵件寄送的報告將不被接受。空格應填入哪個被動結構？",
    optionTranslations: ["不被。", "不。", "錯誤語序的不被。", "正在不被。"],
    optionReasons: ["正確，will not be accepted 是未來式被動否定結構。", "錯誤，will not accepted 少了 be，不能構成被動語態。", "錯誤，will be not accepted 語序不自然，本題標準答案是 will not be accepted。", "錯誤，not being 不符合 will 後面的結構。"],
  },
  "R6-5": {
    questionTranslation: "這封客服回覆為什麼被寄出？",
    optionTranslations: ["回覆訂單問題。", "宣傳新產品。", "確認飯店預訂。", "要求支付發票。"],
    optionReasons: ["正確，短文開頭提到感謝對方就 5521 號訂單聯絡客服。", "錯誤，短文沒有宣傳新產品。", "錯誤，短文沒有飯店預訂內容。", "錯誤，短文沒有要求支付發票。"],
  },
  "R6-6": {
    questionTranslation: "替換品預計什麼時候送達？",
    optionTranslations: ["星期二。", "星期一。", "這個週末。", "沒有提供日期。"],
    optionReasons: ["正確，短文說 delivery is expected on Tuesday。", "錯誤，短文沒有提到星期一送達。", "錯誤，短文沒有提到這個週末送達。", "錯誤，短文明確提供星期二作為送達時間。"],
  },
  "R6-7": {
    questionTranslation: "請保留有瑕疵的商品，供快遞取件。空格應填入哪個介系詞？",
    optionTranslations: ["供，為了。", "在許多之中。", "除非。", "朝向。"],
    optionReasons: ["正確，for courier pickup 表示供快遞取件。", "錯誤，among 表示在許多之中，不符合句意。", "錯誤，unless 表示除非，不符合句型。", "錯誤，toward 表示朝向，不符合取件用途。"],
  },
  "R6-8": {
    questionTranslation: "替換用電源變壓器今天已經寄出。空格應填入哪個動詞形式？",
    optionTranslations: ["已寄出。", "正在寄送。", "寄送，原形動詞。", "寄送，第三人稱單數。"],
    optionReasons: ["正確，has been shipped 是現在完成式被動結構。", "錯誤，shipping 是現在分詞，不能接在 has been 後表達已寄出。", "錯誤，ship 是原形動詞，不符合 has been 後接過去分詞的結構。", "錯誤，ships 是第三人稱單數，不符合被動完成式。"],
  },
  "R6-9": {
    questionTranslation: "公告提到什麼活動？",
    optionTranslations: ["商務寫作工作坊。", "軟體維護演練。", "倉庫安全稽核。", "客戶意見調查。"],
    optionReasons: ["正確，短文第一句說 Business Writing Workshop 將舉行。", "錯誤，短文沒有提到軟體維護演練。", "錯誤，短文沒有提到倉庫安全稽核。", "錯誤，短文沒有提到客戶意見調查。"],
  },
  "R6-10": {
    questionTranslation: "報名費是多少？",
    optionTranslations: ["新台幣 1,200 元。", "新台幣 800 元。", "新台幣 2,000 元。", "不需要費用。"],
    optionReasons: ["正確，短文明確寫出 fee is NT$1,200。", "錯誤，短文沒有提到 NT$800。", "錯誤，短文沒有提到 NT$2,000。", "錯誤，短文明確列出報名費，不是免費。"],
  },
  "R6-11": {
    questionTranslation: "付款必須在 8 月 7 日前完成。空格應填入哪個介系詞？",
    optionTranslations: ["在期限前。", "從。", "在兩者之間。", "當，然而。"],
    optionReasons: ["正確，by August 7 表示在 8 月 7 日前完成。", "錯誤，from 表示起點，不符合截止期限。", "錯誤，between 需要兩個端點，不符合句意。", "錯誤，while 表示當或然而，不符合付款截止語意。"],
  },
  "R6-12": {
    questionTranslation: "逾期付款者將被列入候補名單。空格應填入哪個動詞形式？",
    optionTranslations: ["被放置，被列入。", "正在放置。", "放置，原形動詞。", "放置，第三人稱單數。"],
    optionReasons: ["正確，will be placed 是未來式被動結構，表示被列入候補名單。", "錯誤，placing 是現在分詞，不能接在 will be 後表達被列入。", "錯誤，place 是原形動詞，不符合被動語態。", "錯誤，places 是第三人稱單數，不符合 will be 後接過去分詞。"],
  },
  "R6-13": {
    questionTranslation: "什麼情況下需要兩份報價？",
    optionTranslations: ["採購金額超過新台幣 50,000 元。", "所有辦公用品訂單。", "只限海外差旅。", "訂單送達之後。"],
    optionReasons: ["正確，流程說明提到 purchases above NT$50,000 需要兩家供應商報價。", "錯誤，短文沒有說所有辦公用品訂單都需要兩份報價。", "錯誤，短文沒有提到海外差旅。", "錯誤，短文說建立採購訂單前要完成，不是送達後。"],
  },
  "R6-14": {
    questionTranslation: "建立採購訂單前，團隊必須做什麼？",
    optionTranslations: ["將文件提交給採購部。", "請人資確認出席。", "直接把發票寄給客戶。", "預訂會議室。"],
    optionReasons: ["正確，短文說建立採購訂單前必須將文件提交給 Procurement。", "錯誤，短文沒有提到人資或出席確認。", "錯誤，短文沒有提到把發票寄給客戶。", "錯誤，短文沒有提到預訂會議室。"],
  },
  "R6-15": {
    questionTranslation: "團隊應避免在核准前下訂單。空格應填入哪個動詞形式？",
    optionTranslations: ["下訂，動名詞。", "去下訂，不定詞。", "下訂，原形動詞。", "下訂，過去式或過去分詞。"],
    optionReasons: ["正確，avoid 後面接動名詞，因此應填 placing。", "錯誤，to place 不符合 avoid 後接 V-ing 的句型。", "錯誤，place 是原形動詞，不能直接接在 avoid 後面。", "錯誤，placed 是過去式或過去分詞，不符合句型。"],
  },
  "R6-16": {
    questionTranslation: "核准表必須由部門主管簽署。空格應填入哪個動詞形式？",
    optionTranslations: ["被簽署。", "簽署，原形動詞。", "已簽署，過去式或過去分詞。", "正在簽署。"],
    optionReasons: ["正確，approval sheet 是被簽署，must 後接 be signed 形成被動語態。", "錯誤，sign 是主動語態，表單不能主動簽署自己。", "錯誤，signed 少了 be，不能構成 must 後的被動結構。", "錯誤，be signing 是進行式語意，不符合必須被簽署的規定。"],
  },
  "R7-1": {
    questionTranslation: "員工續辦時必須提交什麼？",
    optionTranslations: ["車牌號碼與員工編號。", "燃油收據與路線圖。", "主管推薦信。", "只有駕照影本。"],
    optionReasons: ["正確，文章明確要求員工提交車牌號碼與員工編號以保留停車權限。", "錯誤，文章沒有要求燃油收據或路線圖。", "錯誤，文章沒有提到主管推薦信。", "錯誤，文章要求車牌號碼與員工編號，不是只有駕照影本。"],
  },
  "R7-2": {
    questionTranslation: "未續辦的停車證什麼時候會停用？",
    optionTranslations: ["7 月 1 日。", "6 月 28 日。", "7 月 15 日。", "沒有提到停用日期。"],
    optionReasons: ["正確，信中說未在期限前續辦的停車證會在 7 月 1 日停用。", "錯誤，6 月 28 日是續辦截止日，不是停用日。", "錯誤，文章沒有提到 7 月 15 日。", "錯誤，文章明確提到 7 月 1 日為停用日期。"],
  },
  "R7-3": {
    questionTranslation: "這封信的預期讀者是誰？",
    optionTranslations: ["擁有停車權限的公司員工。", "外部送貨司機。", "參觀展示間的顧客。", "新工作申請者。"],
    optionReasons: ["正確，信件稱呼 Dear Staff，內容是員工停車證續辦。", "錯誤，文章沒有針對外部送貨司機。", "錯誤，文章沒有提到展示間顧客。", "錯誤，文章不是徵才通知，也不是給求職者。"],
  },
  "R7-4": {
    questionTranslation: "哪個部門要搬遷？",
    optionTranslations: ["行銷部。", "財務部。", "人力資源部。", "採購部。"],
    optionReasons: ["正確，備忘錄第一句說 Marketing Department 將搬到 8 樓。", "錯誤，文章沒有說財務部搬遷。", "錯誤，文章沒有說人力資源部搬遷。", "錯誤，文章沒有說採購部搬遷。"],
  },
  "R7-5": {
    questionTranslation: "員工在 6 月 10 日前應該做什麼？",
    optionTranslations: ["打包個人物品並標示箱子。", "將門禁卡歸還給保全。", "參加安全演練。", "提交差旅收據。"],
    optionReasons: ["正確，備忘錄要求員工在 6 月 10 日前打包個人物品並標示每個箱子。", "錯誤，文章沒有提到歸還門禁卡。", "錯誤，文章沒有提到安全演練。", "錯誤，文章沒有提到提交差旅收據。"],
  },
  "R7-6": {
    questionTranslation: "為什麼提到 6 月 13 日？",
    optionTranslations: ["IT 會在那天重新連接電腦。", "辦公室租約在那天結束。", "供應商稽核安排在那天。", "公司假期在那天開始。"],
    optionReasons: ["正確，備忘錄說 IT 會在 6 月 13 日重新連接桌上型電腦。", "錯誤，文章沒有提到辦公室租約。", "錯誤，文章沒有提到供應商稽核。", "錯誤，文章沒有提到公司假期。"],
  },
  "R7-7": {
    questionTranslation: "菜單為什麼會有限制？",
    optionTranslations: ["廚房設備維護。", "食品供應商罷工。", "假日休館。", "員工訓練研討會。"],
    optionReasons: ["正確，公告明確說因為廚房設備維護，所以菜單會受限。", "錯誤，公告沒有提到食品供應商罷工。", "錯誤，公告沒有說餐廳因假日關閉。", "錯誤，公告沒有提到員工訓練研討會。"],
  },
  "R7-8": {
    questionTranslation: "這則通知適用於哪個時段？",
    optionTranslations: ["上午 11 點 30 分到下午 1 點 30 分。", "上午 9 點到上午 11 點。", "下午 1 點 30 分到下午 3 點 30 分。", "一整天。"],
    optionReasons: ["正確，公告說本週四上午 11 點 30 分到下午 1 點 30 分供應有限菜單。", "錯誤，公告沒有提到上午 9 點到 11 點。", "錯誤，公告沒有提到下午 1 點 30 分到 3 點 30 分。", "錯誤，公告只限定兩小時，不是一整天。"],
  },
  "R7-9": {
    questionTranslation: "讀者可以推論什麼？",
    optionTranslations: ["午餐服務可能比平常慢。", "餐廳將永久關閉。", "只會販售飲料。", "所有員工都必須外出用餐。"],
    optionReasons: ["正確，公告提醒等待時間會變長，所以可推論午餐服務較慢。", "錯誤，公告沒有說餐廳永久關閉。", "錯誤，公告說有限菜單，不是只賣飲料。", "錯誤，公告沒有要求所有員工外出用餐。"],
  },
  "R7-10": {
    questionTranslation: "這則廣告在宣傳什麼？",
    optionTranslations: ["週末商務英文課程。", "翻譯軟體授權。", "企業稅務服務。", "招募博覽會。"],
    optionReasons: ["正確，廣告主題是 Weekend Business English Program。", "錯誤，文章沒有提到翻譯軟體。", "錯誤，文章沒有提到企業稅務服務。", "錯誤，文章沒有提到招募博覽會。"],
  },
  "R7-11": {
    questionTranslation: "學費是多少？",
    optionTranslations: ["新台幣 6,800 元。", "新台幣 5,200 元。", "新台幣 7,500 元。", "新台幣 680 元。"],
    optionReasons: ["正確，廣告明確寫出八堂課學費為 NT$6,800。", "錯誤，文章沒有提到 NT$5,200。", "錯誤，文章沒有提到 NT$7,500。", "錯誤，NT$680 與文章列出的學費不符。"],
  },
  "R7-12": {
    questionTranslation: "早鳥報名者會獲得什麼？",
    optionTranslations: ["免費練習冊。", "免費平板。", "退款折價券。", "私人指導課程。"],
    optionReasons: ["正確，廣告說 7 月 5 日前報名可獲得免費 workbook。", "錯誤，文章沒有提到免費平板。", "錯誤，文章沒有提到退款折價券。", "錯誤，文章提到發音指導包含在課程中，沒有說早鳥送私人指導課程。"],
  },
  "R7-13": {
    questionTranslation: "供應商導入日會在哪裡舉行？",
    optionTranslations: ["402 室。", "305 室。", "主大廳。", "只在線上。"],
    optionReasons: ["正確，時程表標示 Vendor Onboarding Day 的地點是 Room 402。", "錯誤，文章沒有提到 Room 305。", "錯誤，文章沒有說地點在主大廳。", "錯誤，文章提供實體地點 Room 402，不是只在線上。"],
  },
  "R7-14": {
    questionTranslation: "上午 10 點 45 分會發生什麼事？",
    optionTranslations: ["系統帳號設定開始。", "合規簡報結束。", "午餐休息開始。", "問答時間開始。"],
    optionReasons: ["正確，時程表寫 10:45 到 11:30 是 System Account Setup。", "錯誤，合規簡報時間是 09:30 到 10:30。", "錯誤，文章沒有提到午餐休息。", "錯誤，問答時間是 11:30 到 12:00，不是 10:45。"],
  },
  "R7-15": {
    questionTranslation: "這份時程表最可能是給誰看的？",
    optionTranslations: ["新核准的供應商。", "飯店住客。", "工廠檢查員。", "工作申請者。"],
    optionReasons: ["正確，活動名稱是 Vendor Onboarding Day，表示對象是新核准或新加入的供應商。", "錯誤，文章沒有飯店住宿內容。", "錯誤，文章沒有工廠檢查內容。", "錯誤，文章不是面試或徵才時程。"],
  },
  "R7-16": {
    questionTranslation: "這張發票的總金額是多少？",
    optionTranslations: ["新台幣 25,200 元。", "新台幣 24,000 元。", "新台幣 26,400 元。", "新台幣 1,200 元。"],
    optionReasons: ["正確，發票明確列出總金額為 NT$25,200。", "錯誤，NT$24,000 是小計，不是總金額。", "錯誤，文章沒有列出 NT$26,400。", "錯誤，NT$1,200 是運費，不是總金額。"],
  },
  "R7-17": {
    questionTranslation: "付款應如何完成？",
    optionTranslations: ["透過銀行轉帳。", "貨到付款。", "到店刷信用卡。", "用行動錢包付款。"],
    optionReasons: ["正確，發票寫明 payment due within 30 days by bank transfer。", "錯誤，發票沒有提到貨到付款。", "錯誤，發票沒有提到到店刷卡。", "錯誤，發票沒有提到行動錢包。"],
  },
  "R7-18": {
    questionTranslation: "運費是多少？",
    optionTranslations: ["新台幣 1,200 元。", "新台幣 2,400 元。", "新台幣 12,000 元。", "新台幣 25,200 元。"],
    optionReasons: ["正確，發票中 Delivery fee 標示為 NT$1,200。", "錯誤，文章沒有列出 NT$2,400 作為運費。", "錯誤，文章沒有列出 NT$12,000。", "錯誤，NT$25,200 是總金額，不是運費。"],
  },
  "R7-19": {
    questionTranslation: "購買了什麼服務？",
    optionTranslations: ["當日包裹配送。", "國際空運。", "倉庫儲存。", "辦公室清潔。"],
    optionReasons: ["正確，收據的 Service 欄位寫明 Same-day parcel delivery。", "錯誤，收據沒有提到國際空運。", "錯誤，收據沒有提到倉庫儲存。", "錯誤，收據沒有提到辦公室清潔。"],
  },
  "R7-20": {
    questionTranslation: "總共支付了多少？",
    optionTranslations: ["新台幣 385 元。", "新台幣 320 元。", "新台幣 360 元。", "新台幣 425 元。"],
    optionReasons: ["正確，收據寫明 Amount paid NT$385。", "錯誤，NT$320 是基本費用，不是總支付金額。", "錯誤，NT$360 不是收據列出的總額。", "錯誤，NT$425 不是收據列出的總額。"],
  },
  "R7-21": {
    questionTranslation: "關於付款可以推論什麼？",
    optionTranslations: ["付款已經完成。", "付款期限是 30 天內。", "只支付了訂金。", "交易已取消。"],
    optionReasons: ["正確，收據寫 Amount paid，表示款項已完成支付。", "錯誤，收據沒有提到 30 天付款期限。", "錯誤，收據沒有提到只付訂金。", "錯誤，收據沒有提到交易取消。"],
  },
  "R7-22": {
    questionTranslation: "正在招募哪個職位？",
    optionTranslations: ["物流協調員。", "財務分析師。", "業務訓練師。", "IT 支援專員。"],
    optionReasons: ["正確，職缺標題寫明 Logistics Coordinator。", "錯誤，文章沒有說招募財務分析師。", "錯誤，文章沒有說招募業務訓練師。", "錯誤，文章沒有說招募 IT 支援專員。"],
  },
  "R7-23": {
    questionTranslation: "哪項技能被明確要求？",
    optionTranslations: ["進階 Excel 技能。", "平面設計專業。", "法律草擬經驗。", "公開演說證照。"],
    optionReasons: ["正確，職缺要求列出 advanced Excel skills。", "錯誤，文章沒有提到平面設計。", "錯誤，文章沒有提到法律草擬經驗。", "錯誤，文章沒有提到公開演說證照。"],
  },
  "R7-24": {
    questionTranslation: "申請者應如何應徵？",
    optionTranslations: ["在 6 月 30 日前寄出履歷。", "打電話給倉庫經理。", "只能親自提交文件。", "透過旅遊入口網站登記。"],
    optionReasons: ["正確，文章說申請者要在 6 月 30 日前把履歷寄到 hr@deltasupply.com。", "錯誤，文章沒有要求打電話給倉庫經理。", "錯誤，文章沒有說只能親自提交。", "錯誤，文章沒有提到旅遊入口網站。"],
  },
  "R7-25": {
    questionTranslation: "評論者喜歡什麼？",
    optionTranslations: ["預訂流程很快速。", "取消政策很清楚。", "電話支援很即時。", "費用降低了。"],
    optionReasons: ["正確，評論者說線上預約工具快速且容易操作，兩分鐘內訂好會議室。", "錯誤，評論者說取消政策很難找到，不是很清楚。", "錯誤，文章沒有提到電話支援。", "錯誤，文章沒有提到費用降低。"],
  },
  "R7-26": {
    questionTranslation: "評論中提到什麼問題？",
    optionTranslations: ["取消政策很難找到。", "網站經常當機。", "缺少付款選項。", "沒有會議室可用。"],
    optionReasons: ["正確，評論者明確說 cancellation policy is hard to find。", "錯誤，文章沒有提到網站當機。", "錯誤，文章沒有提到付款選項缺少。", "錯誤，文章沒有提到沒有會議室可用。"],
  },
  "R7-27": {
    questionTranslation: "作者的目的是什麼？",
    optionTranslations: ["提供包含稱讚與建議的回饋。", "立即要求退款。", "宣傳競爭服務。", "回報帳務詐欺。"],
    optionReasons: ["正確，評論先稱讚工具快速易用，再建議讓取消政策更清楚。", "錯誤，文章沒有要求退款。", "錯誤，文章沒有宣傳其他服務。", "錯誤，文章沒有提到帳務詐欺。"],
  },
  "R7-28": {
    questionTranslation: "這封信為什麼被寄出？",
    optionTranslations: ["在同意前要求修改。", "終止現有合約。", "確認出貨送達。", "邀請 Park 先生面試。"],
    optionReasons: ["正確，信中說願意繼續，但要求先修改第 3 條。", "錯誤，信中沒有說終止合約。", "錯誤，信中沒有提到出貨送達。", "錯誤，信中沒有面試邀請。"],
  },
  "R7-29": {
    questionTranslation: "要求做什麼修改？",
    optionTranslations: ["加入 4 小時內緊急到場支援。", "將月費降低 50%。", "移除所有維護訪視。", "將合約延長到五年。"],
    optionReasons: ["正確，信中要求在第 3 條加入 4 小時內緊急到場支援。", "錯誤，信中沒有要求降價。", "錯誤，信中沒有要求移除維護訪視。", "錯誤，信中沒有要求延長合約到五年。"],
  },
  "R7-30": {
    questionTranslation: "這封信是誰寫的？",
    optionTranslations: ["營運經理 Nina Chen。", "業務總監 Park 先生。", "法務部實習生。", "客服人員。"],
    optionReasons: ["正確，信尾署名是 Nina Chen, Operations Manager。", "錯誤，Park 先生是收件者，不是寫信者。", "錯誤，信中沒有提到法務部實習生。", "錯誤，信中沒有提到客服人員。"],
  },
  "R7-31": {
    questionTranslation: "網路研討會房間為什麼更換？",
    optionTranslations: ["參加人數限制已達上限。", "主講者取消了。", "主題更新了。", "發生停電。"],
    optionReasons: ["正確，信件說因為 participant limits，所以從 Zoom Room A 改到 Zoom Room C。", "錯誤，文章沒有提到主講者取消。", "錯誤，文章沒有提到主題更新。", "錯誤，文章沒有提到停電。"],
  },
  "R7-32": {
    questionTranslation: "收件者應該用什麼加入？",
    optionTranslations: ["附件行事曆邀請中的新連結。", "上週的舊連結。", "頁尾中的電話號碼。", "公司內部網路首頁。"],
    optionReasons: ["正確，信件要求收件者使用 attached calendar invite 裡的新連結。", "錯誤，文章沒有要求使用舊連結。", "錯誤，文章沒有提到用頁尾電話號碼加入。", "錯誤，文章沒有要求從公司內部網路首頁加入。"],
  },
  "R7-33": {
    questionTranslation: "這是什麼類型的文字？",
    optionTranslations: ["時程更新電子郵件。", "付款收據。", "招募公告。", "公開廣告。"],
    optionReasons: ["正確，主旨是 Webinar Link Update，內容通知網路研討會連結與房間變更。", "錯誤，文章沒有付款或收據資訊。", "錯誤，文章沒有招募內容。", "錯誤，文章不是對外宣傳廣告。"],
  },
  "R7-34": {
    questionTranslation: "誰必須提交出席紀錄？",
    optionTranslations: ["樓層負責人。", "所有訪客。", "只有保全人員。", "外部稽核員。"],
    optionReasons: ["正確，備忘錄說 all floor leaders must submit attendance records。", "錯誤，文章沒有要求所有訪客提交紀錄。", "錯誤，文章沒有說只有保全人員負責。", "錯誤，文章沒有提到外部稽核員提交紀錄。"],
  },
  "R7-35": {
    questionTranslation: "提交期限是什麼時候？",
    optionTranslations: ["每次演練後 24 小時內。", "演練開始前。", "每月底。", "沒有指定期限。"],
    optionReasons: ["正確，備忘錄說 within 24 hours after each drill。", "錯誤，文章沒有說演練開始前提交。", "錯誤，文章沒有說每月底提交。", "錯誤，文章明確指定 24 小時內。"],
  },
  "R7-36": {
    questionTranslation: "如果缺少紀錄，可能會發生什麼事？",
    optionTranslations: ["合規報告會延誤。", "演練會被取消。", "員工薪資會被降低。", "總部會關閉辦公室。"],
    optionReasons: ["正確，備忘錄說 missing records will delay compliance reporting to headquarters。", "錯誤，文章沒有說演練會取消。", "錯誤，文章沒有提到降低薪資。", "錯誤，文章沒有說總部會關閉辦公室。"],
  },
  "R7-37": {
    questionTranslation: "計畫進行什麼維護工作？",
    optionTranslations: ["更換大廳門禁卡掃描器。", "升級餐廳桌子。", "粉刷停車場。", "測試火災警報器。"],
    optionReasons: ["正確，公告說 lobby access-card scanners will be replaced。", "錯誤，文章沒有提到餐廳桌子。", "錯誤，文章沒有提到粉刷停車場。", "錯誤，文章沒有提到測試火災警報器。"],
  },
  "R7-38": {
    questionTranslation: "人們可以在哪裡取得臨時識別證？",
    optionTranslations: ["接待櫃台。", "保全控制室。", "人資辦公室。", "裝卸碼頭。"],
    optionReasons: ["正確，公告說 temporary paper badges will be issued at the reception desk。", "錯誤，文章沒有提到保全控制室。", "錯誤，文章沒有提到人資辦公室。", "錯誤，文章沒有提到裝卸碼頭。"],
  },
  "R7-39": {
    questionTranslation: "更換作業會花多久？",
    optionTranslations: ["三小時。", "一小時。", "半天。", "整個週末。"],
    optionReasons: ["正確，時間從上午 8 點到 11 點，共三小時。", "錯誤，公告時間不是一小時。", "錯誤，公告時間不是半天。", "錯誤，公告沒有說整個週末都會更換。"],
  },
  "R7-40": {
    questionTranslation: "GreenLine Courier 保證什麼？",
    optionTranslations: ["中午前提交的市區包裹當日送達。", "國際包裹一天內送達。", "所有包裹免費配送。", "只在週末取件。"],
    optionReasons: ["正確，廣告說 downtown parcels submitted before noon 可 same-day delivery。", "錯誤，文章沒有提到國際包裹一天內送達。", "錯誤，文章沒有提到免費配送。", "錯誤，文章沒有說只在週末取件。"],
  },
  "R7-41": {
    questionTranslation: "公告中的固定費率是多少？",
    optionTranslations: ["新台幣 180 元。", "新台幣 150 元。", "新台幣 200 元。", "新台幣 300 元。"],
    optionReasons: ["正確，廣告明確寫出 flat rate of NT$180。", "錯誤，文章沒有提到 NT$150。", "錯誤，文章沒有提到 NT$200。", "錯誤，文章沒有提到 NT$300。"],
  },
  "R7-42": {
    questionTranslation: "要適用該費率，包裹需要符合什麼條件？",
    optionTranslations: ["低於 3 公斤。", "超過 5 公斤。", "只限易碎品。", "目的地為國外。"],
    optionReasons: ["正確，廣告說固定費率適用於 packages under 3 kilograms。", "錯誤，文章沒有說超過 5 公斤適用。", "錯誤，文章沒有說只限易碎品。", "錯誤，文章沒有提到國外目的地。"],
  },
  "R7-43": {
    questionTranslation: "上午 9 點 30 分的場次由誰主持？",
    optionTranslations: ["人資部。", "IT 部門。", "財務部。", "營運部。"],
    optionReasons: ["正確，時程表寫 09:30 Welcome Session，括號標示 HR。", "錯誤，IT 是 10:30 的帳號設定，不是 9:30 場次。", "錯誤，文章沒有提到財務部主持。", "錯誤，文章沒有提到營運部主持。"],
  },
  "R7-44": {
    questionTranslation: "上午 10 點 30 分安排了什麼？",
    optionTranslations: ["IT 帳號設定。", "辦公室導覽。", "午餐。", "歡迎場次。"],
    optionReasons: ["正確，時程表 10:30 的項目是 IT Account Setup。", "錯誤，Office Tour 是 11:15。", "錯誤，Lunch 是 12:00。", "錯誤，Welcome Session 是 09:30。"],
  },
  "R7-45": {
    questionTranslation: "這份時程表是給誰看的？",
    optionTranslations: ["新進員工。", "外部供應商。", "參觀展示間的顧客。", "只有高階主管。"],
    optionReasons: ["正確，活動名稱是 New Hire Orientation，對象是新進員工。", "錯誤，文章沒有提到外部供應商。", "錯誤，文章沒有提到展示間顧客。", "錯誤，文章沒有說只給高階主管。"],
  },
  "R7-46": {
    questionTranslation: "緊急修復費用是多少？",
    optionTranslations: ["新台幣 220 元。", "新台幣 780 元。", "新台幣 1,000 元。", "新台幣 200 元。"],
    optionReasons: ["正確，發票細項列出 Additional emergency fix NT$220。", "錯誤，NT$780 是每月服務費，不是緊急修復費。", "錯誤，NT$1,000 是應付總額，不是緊急修復費。", "錯誤，文章沒有列出 NT$200 作為緊急修復費。"],
  },
  "R7-47": {
    questionTranslation: "應付總金額是多少？",
    optionTranslations: ["新台幣 1,000 元。", "新台幣 780 元。", "新台幣 1,220 元。", "新台幣 1,500 元。"],
    optionReasons: ["正確，發票明確寫出 Total due NT$1,000。", "錯誤，NT$780 是每月服務費，不是總金額。", "錯誤，文章沒有列出 NT$1,220。", "錯誤，文章沒有列出 NT$1,500。"],
  },
  "R7-48": {
    questionTranslation: "付款截止日是什麼時候？",
    optionTranslations: ["6 月 15 日。", "5 月 15 日。", "6 月 30 日。", "沒有提供截止日。"],
    optionReasons: ["正確，發票寫明 Payment due date: June 15。", "錯誤，文章沒有提到 5 月 15 日。", "錯誤，文章沒有提到 6 月 30 日。", "錯誤，文章明確提供付款截止日。"],
  },
  "R7-49": {
    questionTranslation: "購買了什麼品項？",
    optionTranslations: ["200 份彩色型錄。", "200 個信封。", "一個印表機墨水匣。", "裝訂機租借。"],
    optionReasons: ["正確，收據品項寫明 200 color brochures。", "錯誤，收據沒有提到 200 個信封。", "錯誤，收據沒有提到印表機墨水匣。", "錯誤，收據沒有提到裝訂機租借。"],
  },
  "R7-50": {
    questionTranslation: "收取的稅額是多少？",
    optionTranslations: ["新台幣 95 元。", "新台幣 300 元。", "新台幣 1,600 元。", "新台幣 1,995 元。"],
    optionReasons: ["正確，收據明確列出 Tax NT$95。", "錯誤，NT$300 是裝訂費，不是稅額。", "錯誤，NT$1,600 是印刷費，不是稅額。", "錯誤，NT$1,995 是已付總額，不是稅額。"],
  },
  "R7-51": {
    questionTranslation: "採用哪一種付款方式？",
    optionTranslations: ["現金。", "銀行轉帳。", "信用卡。", "公司支票。"],
    optionReasons: ["正確，收據寫明 Total paid NT$1,995 by cash。", "錯誤，收據沒有提到銀行轉帳。", "錯誤，收據沒有提到信用卡付款。", "錯誤，收據沒有提到公司支票。"],
  },
  "R7-52": {
    questionTranslation: "Apex Manufacturing 正在招募哪個職位？",
    optionTranslations: ["財務分析師。", "物流協調員。", "行銷專員。", "招募專員。"],
    optionReasons: ["正確，職缺標題寫明 Financial Analyst。", "錯誤，文章沒有說招募物流協調員。", "錯誤，文章沒有說招募行銷專員。", "錯誤，文章沒有說招募招募專員。"],
  },
  "R7-53": {
    questionTranslation: "哪一項工作被列為職責？",
    optionTranslations: ["每月預測。", "倉庫設備維修。", "客服專線支援。", "合約翻譯。"],
    optionReasons: ["正確，職責包含 monthly forecasting。", "錯誤，文章沒有提到倉庫設備維修。", "錯誤，文章沒有提到客服專線支援。", "錯誤，文章沒有提到合約翻譯。"],
  },
  "R7-54": {
    questionTranslation: "職缺要求多少經驗？",
    optionTranslations: ["至少三年。", "不需要經驗。", "至少一年。", "超過十年。"],
    optionReasons: ["正確，職缺條件寫明 at least 3 years of experience。", "錯誤，文章明確要求經驗，不是不需要經驗。", "錯誤，文章要求至少三年，不是一年。", "錯誤，文章沒有要求超過十年經驗。"],
  },
};

function applyExplicitExplanationMetadata() {
  Object.entries(explicitExplanationMetadata).forEach(([id, metadata]) => {
    const item = sampleQuestions.find((question) => question.id === id);
    if (!item) return;
    item.questionTranslation = metadata.questionTranslation;
    item.optionTranslations = metadata.optionTranslations;
    item.optionReasons = metadata.optionReasons;
  });
}

applyExplicitExplanationMetadata();

vocabQuestions.forEach((item) => { if (!item.translation) item.translation = `此單字的中文意思是${item.answer}。`; });

function validateQuestionBank() {
  const requiredParts = { "Part 1": 6, "Part 2": 25, "Part 3": 39, "Part 4": 30, "Part 5": 30, "Part 6": 16, "Part 7": 54 };
  const forbiddenPlaceholders = new Set([
    "請根據對話內容回答問題",
    ["請根據", "廣播內容回答問題"].join(""),
    ["選項一", "的中文翻譯"].join(""),
    "選項二的中文翻譯",
    "選項三的中文翻譯",
    "選項四的中文翻譯",
    ["關鍵資訊", "支持此選項"].join(""),
    "內容沒有支持這個敘述",
    "提到的重點不一致",
    "時間或事件不符",
    "題目詢問原因",
    "題目詢問地點",
    "題目詢問時間",
    "題目詢問人物或對象是誰",
    "題目詢問哪一個選項符合內容",
    "題目詢問內容所指的是什麼",
    "請根據題目與文本選出正確答案",
    "第 1 個選項的中文語意",
    "第 2 個選項的中文語意",
    "第 3 個選項的中文語意",
    "第 4 個選項的中文語意",
    "第 1 個文法選項的中文語意",
    "第 2 個文法選項的中文語意",
    "第 3 個文法選項的中文語意",
    "第 4 個文法選項的中文語意",
    "第 1 個名詞片語選項的中文意思",
    "不定詞形式，表示要執行的動作",
    "動名詞或現在分詞形式",
    "過去式或過去分詞形式",
    "be 動詞加分詞形成的結構",
    "未來式動詞片語",
    "完成式動詞片語",
    "A 選項表達的是題目所需的正確資訊。",
    "B 選項表達的是與題目線索不同的干擾資訊。",
    "C 選項表達的是與題目線索不同的干擾資訊。",
    "D 選項表達的是與題目線索不同的干擾資訊。",
    "A 選項的文法語意：需判斷是否符合句型、詞性與上下文。",
    "B 選項的文法語意：需判斷是否符合句型、詞性與上下文。",
    "C 選項的文法語意：需判斷是否符合句型、詞性與上下文。",
    "D 選項的文法語意：需判斷是否符合句型、詞性與上下文。",
  ]);
  const forbiddenFragments = ["包含數字或時間資訊的第"];
  const errors = [];
  if (sampleQuestions.length !== 200) errors.push(`sampleQuestions.length should be 200, got ${sampleQuestions.length}`);
  Object.entries(requiredParts).forEach(([part, count]) => {
    const actual = sampleQuestions.filter((x) => x.part === part).length;
    if (actual !== count) errors.push(`${part} should be ${count}, got ${actual}`);
  });
  sampleQuestions.forEach((item) => {
    ["question", "options", "answer", "explanation", "translation"].forEach((key) => { if (!item[key] || (Array.isArray(item[key]) && !item[key].length)) errors.push(`${item.id} missing ${key}`); });
    if (item.image && /^https?:\/\//i.test(item.image)) errors.push(`${item.id} image should use a local path`);
    if (item.part === "Part 5" && !item.grammarPoint) errors.push(`${item.id} missing grammarPoint`);

    if (!item.questionTranslation) errors.push(`${item.id} missing questionTranslation`);
    if (!Array.isArray(item.optionTranslations) || item.optionTranslations.length !== item.options.length) errors.push(`${item.id} missing optionTranslations`);
    if (!Array.isArray(item.optionReasons) || item.optionReasons.length !== item.options.length) errors.push(`${item.id} missing optionReasons`);

    const checkText = (value, field) => {
      if (typeof value === "string" && forbiddenPlaceholders.has(value.trim())) errors.push(`${item.id} has placeholder ${field}: ${value.trim()}`);
      if (typeof value === "string" && forbiddenFragments.some((fragment) => value.includes(fragment))) errors.push(`${item.id} has forbidden ${field}: ${value.trim()}`);
    };
    checkText(item.questionTranslation, "questionTranslation");
    (item.optionTranslations || []).forEach((v, idx) => {
      checkText(v, `optionTranslations[${idx}]`);
      if (typeof v === "string" && v.trim() === String(item.options[idx]).trim()) errors.push(`${item.id} optionTranslations[${idx}] equals original option`);
    });
    if (Array.isArray(item.optionReasons) && item.optionReasons.length > 1 && item.optionReasons.every((v) => v === item.optionReasons[0])) errors.push(`${item.id} optionReasons should not all be identical`);
    (item.optionReasons || []).forEach((v, idx) => checkText(v, `optionReasons[${idx}]`));
  });
  return { isValid: errors.length === 0, errors };
}

function validateExplanationCoverage() {
  const coverageByPart = {};
  const errors = [];

  Object.keys(PART_SPECS).forEach((part) => {
    coverageByPart[part] = {
      total: 0,
      questionTranslation: 0,
      optionTranslations: 0,
      optionReasons: 0,
    };
  });

  sampleQuestions.forEach((item) => {
    const coverage = coverageByPart[item.part] || { total: 0, questionTranslation: 0, optionTranslations: 0, optionReasons: 0 };
    coverage.total++;
    if (item.questionTranslation) coverage.questionTranslation++;
    if (Array.isArray(item.optionTranslations) && item.optionTranslations.length === item.options.length) coverage.optionTranslations++;
    if (Array.isArray(item.optionReasons) && item.optionReasons.length === item.options.length) coverage.optionReasons++;
    coverageByPart[item.part] = coverage;
  });

  Object.entries(coverageByPart).forEach(([part, coverage]) => {
    if (coverage.questionTranslation !== coverage.total) errors.push(`${part} questionTranslation coverage ${coverage.questionTranslation}/${coverage.total}`);
    if (coverage.optionTranslations !== coverage.total) errors.push(`${part} optionTranslations coverage ${coverage.optionTranslations}/${coverage.total}`);
    if (coverage.optionReasons !== coverage.total) errors.push(`${part} optionReasons coverage ${coverage.optionReasons}/${coverage.total}`);
  });

  return { isValid: errors.length === 0, errors, coverageByPart };
}

const tabs = [["exam", "正式測驗"], ["listening", "聽力練習"], ["reading", "閱讀練習"], ["wrongbook", "錯題本"], ["review", "複習清單"]];
const speechState = { currentKey: "", textByKey: new Map() };
let currentTab = "exam";
function defaultState() {
  return {
    total: 0,
    correct: 0,
    wrongbook: [],
    reviewList: [],
    doneToday: 0,
    lastPracticeDate: new Date().toISOString().slice(0, 10),
    byPart: {},
    solvedIds: {},
    userAnswers: {},
    currentExam: null,
  };
}
function dedupeWrongbook(list = []) {
  const byId = new Map();
  list.forEach((item) => {
    if (!item || !item.id) return;
    const existed = byId.get(item.id);
    if (!existed) {
      byId.set(item.id, item);
      return;
    }
    const existedTime = Date.parse(existed.wrongAt || 0);
    const currentTime = Date.parse(item.wrongAt || 0);
    if (currentTime >= existedTime) byId.set(item.id, item);
  });
  return Array.from(byId.values()).sort((a, b) => Date.parse(b.wrongAt || 0) - Date.parse(a.wrongAt || 0));
}
function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? JSON.parse(raw) : defaultState();
  const t = new Date().toISOString().slice(0, 10);
  if (parsed.lastPracticeDate !== t) parsed.doneToday = 0;
  parsed.lastPracticeDate = t;
  parsed.wrongbook = dedupeWrongbook(parsed.wrongbook || []);
  parsed.userAnswers = parsed.userAnswers && typeof parsed.userAnswers === "object" ? parsed.userAnswers : {};
  return { ...defaultState(), ...parsed };
}
let state = loadState();
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const GROUPED_RANDOM_PARTS = new Set(["Part 3", "Part 4", "Part 6", "Part 7"]);

function buildRandomPracticePool(section, part = "all") {
  const filtered = sampleQuestions.filter((item) => item.section === section && (part === "all" || item.part === part));
  const blocks = [];
  const groupedIndex = new Map();

  filtered.forEach((item) => {
    if (GROUPED_RANDOM_PARTS.has(item.part) && item.groupId) {
      const key = `${item.part}::${item.groupId}`;
      if (!groupedIndex.has(key)) {
        groupedIndex.set(key, blocks.length);
        blocks.push([item]);
      } else {
        blocks[groupedIndex.get(key)].push(item);
      }
      return;
    }
    blocks.push([item]);
  });

  return shuffle(blocks).flat();
}

function buildQuestionBlocks(section, part = null) {
  const blocks = [];
  const groupedIndex = new Map();
  sampleQuestions
    .filter((item) => item.section === section && (!part || item.part === part))
    .forEach((item) => {
      if (GROUPED_RANDOM_PARTS.has(item.part) && item.groupId) {
        const key = `${item.part}::${item.groupId}`;
        if (!groupedIndex.has(key)) {
          groupedIndex.set(key, blocks.length);
          blocks.push([item]);
        } else {
          blocks[groupedIndex.get(key)].push(item);
        }
        return;
      }
      blocks.push([item]);
    });
  return blocks;
}

function buildExamSectionIds(section, targetCount = 100) {
  const sectionParts = Object.keys(PART_SPECS).filter((part) => PART_SPECS[part].section === section);
  const selected = [];

  sectionParts.forEach((part) => {
    const partBlocks = buildQuestionBlocks(section, part);
    shuffle(partBlocks).forEach((block) => {
      selected.push(...block.map((item) => item.id));
    });
  });

  return selected.slice(0, targetCount);
}

function buildOptionOrder(qItem) {
  return shuffle(qItem.options.map((_, index) => index));
}

function buildExamOptionOrders(questionIds = []) {
  const byId = new Map(sampleQuestions.map((item) => [item.id, item]));
  return questionIds.reduce((orders, id) => {
    const qItem = byId.get(id);
    if (qItem) orders[id] = buildOptionOrder(qItem);
    return orders;
  }, {});
}

function createExamPool() {
  const listeningIds = buildExamSectionIds("listening", 100);
  const readingIds = buildExamSectionIds("reading", 100);
  return {
    listeningIds,
    readingIds,
    optionOrders: buildExamOptionOrders([...listeningIds, ...readingIds]),
    createdAt: new Date().toISOString(),
  };
}

function getQuestionsByIds(ids = []) {
  const byId = new Map(sampleQuestions.map((item) => [item.id, item]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

function resetLearningStats() {
  const fresh = defaultState();
  fresh.currentExam = createExamPool();
  state = fresh;
  saveState();
  renderContent();
}

function validateExamPool(exam = state.currentExam) {
  const errors = [];
  const byId = new Map(sampleQuestions.map((item) => [item.id, item]));
  const groupedByKey = new Map();

  sampleQuestions.forEach((item) => {
    if (GROUPED_RANDOM_PARTS.has(item.part) && item.groupId) {
      const key = `${item.part}::${item.groupId}`;
      if (!groupedByKey.has(key)) groupedByKey.set(key, []);
      groupedByKey.get(key).push(item.id);
    }
  });

  if (!exam) {
    errors.push("currentExam missing");
    return { isValid: false, errors };
  }

  const checkIds = (ids, section, field) => {
    if (!Array.isArray(ids)) {
      errors.push(`${field} should be an array`);
      return;
    }
    if (ids.length !== 100) errors.push(`${field} length should be 100, got ${ids.length}`);

    const expectedParts = Object.keys(PART_SPECS).filter((part) => PART_SPECS[part].section === section);
    const selectedCounts = new Map();
    const positionsById = new Map();
    let lastPartIndex = 0;

    ids.forEach((id, index) => {
      const item = byId.get(id);
      if (!item) {
        errors.push(`${field} has missing question id: ${id}`);
        return;
      }
      if (item.section !== section) errors.push(`${id} should be section ${section}, got ${item.section}`);
      const partIndex = expectedParts.indexOf(item.part);
      if (partIndex < lastPartIndex) errors.push(`${field} has out-of-order part ${item.part} at position ${index + 1}`);
      if (partIndex >= 0) lastPartIndex = partIndex;
      selectedCounts.set(id, (selectedCounts.get(id) || 0) + 1);
      if (!positionsById.has(id)) positionsById.set(id, []);
      positionsById.get(id).push(index);
    });

    groupedByKey.forEach((groupIds, key) => {
      const groupSection = byId.get(groupIds[0])?.section;
      if (groupSection !== section) return;
      const counts = groupIds.map((id) => selectedCounts.get(id) || 0);
      const hasAny = counts.some((count) => count > 0);
      if (hasAny && !counts.every((count) => count === counts[0])) {
        errors.push(`${field} has partial group ${key}`);
      }
      if (!hasAny) return;
      const groupPositions = groupIds
        .flatMap((id) => positionsById.get(id) || [])
        .sort((a, b) => a - b);
      for (let i = 1; i < groupPositions.length; i++) {
        if (groupPositions[i] !== groupPositions[i - 1] + 1) {
          errors.push(`${field} has split group ${key}`);
          break;
        }
      }
    });
  };

  checkIds(exam.listeningIds, "listening", "currentExam.listeningIds");
  checkIds(exam.readingIds, "reading", "currentExam.readingIds");
  return { isValid: errors.length === 0, errors };
}

const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
function getToeicQuestionNumber(qItem) {
  if (!qItem || !qItem.id) return null;
  const match = String(qItem.id).match(/^(L[1-4]|R[5-7])-(\d+)$/);
  if (!match) return null;
  const sequence = Number(match[2]);
  if (!Number.isInteger(sequence) || sequence < 1) return null;
  const offsets = { L1: 0, L2: 6, L3: 31, L4: 70, R5: 100, R6: 130, R7: 146 };
  return offsets[match[1]] + sequence;
}
function renderQuestionImage(qItem) {
  if (!qItem || !qItem.image) return "";
  const alt = qItem.imageAlt || qItem.imageCaption || "TOEIC question image";
  const caption = qItem.imageCaption ? `<figcaption>${esc(qItem.imageCaption)}</figcaption>` : "";
  return `<figure class='question-image'><img src='${esc(qItem.image)}' alt='${esc(alt)}' loading='lazy'>${caption}</figure>`;
}
function isValidOptionOrder(qItem, order) {
  if (!qItem || !Array.isArray(qItem.options) || !Array.isArray(order) || order.length !== qItem.options.length) return false;
  const sorted = [...order].sort((a, b) => a - b);
  return sorted.every((value, index) => value === index);
}
function getDisplayOptions(qItem, options = {}) {
  const order = options.optionOrders && options.optionOrders[qItem.id];
  const optionOrder = isValidOptionOrder(qItem, order) ? order : qItem.options.map((_, index) => index);
  return optionOrder.map((originalIndex) => ({
    text: qItem.options[originalIndex],
    translation: Array.isArray(qItem.optionTranslations) ? qItem.optionTranslations[originalIndex] : "",
    reason: Array.isArray(qItem.optionReasons) ? qItem.optionReasons[originalIndex] : "",
    originalIndex,
  }));
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderDashboard(); }
function stopSpeech() {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  speechState.currentKey = "";
}
function getListeningSpeechText(qItem, groupItems = [], options = {}) {
  if (qItem.part === "Part 1") return `${qItem.question} ${getDisplayOptions(qItem, options).map((option) => option.text).join(". ")}`;
  if (qItem.part === "Part 2") return qItem.question;
  if (qItem.part === "Part 3" || qItem.part === "Part 4") return qItem.passage || "";
  return "";
}
function renderListeningSpeechControls(qItem, groupItems = [], options = {}) {
  if (qItem.section !== "listening") return "";
  const speechText = getListeningSpeechText(qItem, groupItems, options);
  if (!speechText) return "";
  const speechKey = groupItems.length ? `${qItem.part}::${qItem.groupId}` : qItem.id;
  speechState.textByKey.set(speechKey, speechText);
  return `<div class='speech-controls'><button class='primary play-listening' data-speech-key='${esc(speechKey)}'>播放聽力</button><button class='danger stop-listening'>停止播放</button></div>`;
}
function removeFromReviewList(questionId) {
  const index = state.reviewList.findIndex((item) => item.id === questionId);
  if (index === -1) return false;
  state.reviewList.splice(index, 1);
  return true;
}
function evaluate(qItem, answer, options = {}) {
  const inReviewMode = !!options.reviewMode;
  const inWrongbookMode = !!options.wrongbookMode;
  const allowRetakeInReview = !!options.allowRetakeInReview;
  const sessionSolvedIds = options.sessionSolvedIds;
  if (inReviewMode && allowRetakeInReview) {
    if (sessionSolvedIds && sessionSolvedIds.has(qItem.id)) return null;
  } else if (inWrongbookMode) {
    if (sessionSolvedIds && sessionSolvedIds.has(qItem.id)) return null;
  } else if (state.solvedIds[qItem.id]) return null;
  const ok = answer === qItem.answer;
  const answeredAt = new Date().toISOString();
  if (inReviewMode || inWrongbookMode) {
    if (sessionSolvedIds) sessionSolvedIds.add(qItem.id);
  } else {
    state.solvedIds[qItem.id] = true;
    state.userAnswers[qItem.id] = { selectedAnswer: answer, isCorrect: ok, answeredAt };
  }
  state.total++;
  state.doneToday++;
  state.byPart[qItem.part] = (state.byPart[qItem.part] || 0) + 1;
  if (ok) {
    state.correct++;
    if (options.removeReviewOnCorrect) removeFromReviewList(qItem.id);
    if (options.removeWrongbookOnCorrect) {
      state.wrongbook = state.wrongbook.filter((item) => item.id !== qItem.id);
    }
  } else {
    const now = answeredAt;
    const existed = state.wrongbook.find((item) => item.id === qItem.id);
    if (existed) {
      existed.myAnswer = answer;
      existed.wrongAt = now;
      state.wrongbook = dedupeWrongbook(state.wrongbook);
    } else {
      state.wrongbook.unshift({ ...qItem, myAnswer: answer, wrongAt: now });
    }
  }
  saveState();
  if (typeof options.onAfterEvaluate === "function") options.onAfterEvaluate(ok);
  return ok;
}
function getQuestionAnswerState(qItem, options = {}) {
  if (options.reviewMode || options.wrongbookMode) return null;
  const stored = state.userAnswers && state.userAnswers[qItem.id];
  if (stored && typeof stored.selectedAnswer === "string") {
    return {
      selectedAnswer: stored.selectedAnswer,
      isCorrect: typeof stored.isCorrect === "boolean" ? stored.isCorrect : stored.selectedAnswer === qItem.answer,
      answeredAt: stored.answeredAt || "",
    };
  }
  if (state.solvedIds[qItem.id]) return { selectedAnswer: "", isCorrect: false, answeredAt: "", legacy: true };
  return null;
}
function getOptionLabel(index) { return ["A", "B", "C", "D"][index] || String(index + 1); }
function formatAnswerWithLabel(qItem, answer, options = {}) {
  const index = getDisplayOptions(qItem, options).findIndex((option) => option.text === answer);
  return index >= 0 ? `${getOptionLabel(index)}. ${esc(answer)}` : esc(answer || "無法從舊紀錄判斷");
}
function renderAnswerFeedback(qItem, answerState, options = {}) {
  if (!answerState) return "";
  if (answerState.legacy) {
    const legacyLines = [
      "此題已作答，但舊版紀錄未保存你選的答案。",
      `正確答案：${formatAnswerWithLabel(qItem, qItem.answer, options)}`,
      `解析：${esc(qItem.explanation)}`,
      `中文翻譯：${esc(qItem.questionTranslation || qItem.translation || "")}`,
    ];
    if (Array.isArray(qItem.optionReasons) && qItem.optionReasons.length === qItem.options.length) {
      legacyLines.push("選項解析：");
      getDisplayOptions(qItem, options).forEach((option, idx) => {
        legacyLines.push(`${getOptionLabel(idx)}. ${esc(option.reason)}`);
      });
    }
    return `<div class='feedback answered-summary'>${legacyLines.join("<br>")}</div>`;
  }
  const lines = [
    `我的答案：${formatAnswerWithLabel(qItem, answerState.selectedAnswer, options)}（${answerState.isCorrect ? "答對" : "答錯"}）`,
  ];
  if (!answerState.isCorrect) lines.push(`正確答案：${formatAnswerWithLabel(qItem, qItem.answer, options)}`);
  lines.push(`解析：${esc(qItem.explanation)}`);
  lines.push(`中文翻譯：${esc(qItem.questionTranslation || qItem.translation || "")}`);
  if (Array.isArray(qItem.optionReasons) && qItem.optionReasons.length === qItem.options.length) {
    lines.push("選項解析：");
    getDisplayOptions(qItem, options).forEach((option, idx) => {
      lines.push(`${getOptionLabel(idx)}. ${esc(option.reason)}`);
    });
  }
  return `<div class='feedback ${answerState.isCorrect ? "success" : "error"} answered-summary'>${lines.join("<br>")}</div>`;
}
function getAnsweredOptionClass(qItem, optionText, answerState) {
  if (!answerState || answerState.legacy) return "";
  if (optionText === qItem.answer) return " correct";
  if (!answerState.isCorrect && optionText === answerState.selectedAnswer) return " wrong";
  return "";
}
function renderQuestionCard(qItem, partLabel = "", options = {}) {
  const answerState = getQuestionAnswerState(qItem, options);
  const solved = !!answerState;
  const feedback = renderAnswerFeedback(qItem, answerState, options);
  const displayOptions = getDisplayOptions(qItem, options);
  return `<div class='card'><h3>${esc(partLabel || qItem.part)}</h3><p>${esc(qItem.question)}</p>${renderQuestionImage(qItem)}${qItem.passage ? `<p><small>${esc(qItem.passage)}</small></p>` : ""}${feedback || `<div id='fb-${qItem.id}'></div>`}<div>${displayOptions.map((op, i) => `<button class='option-btn${getAnsweredOptionClass(qItem, op.text, answerState)}' data-id='${qItem.id}' data-idx='${i}' ${solved ? "disabled" : ""}>${esc(op.text)}</button>`).join("")}</div><button class='danger mark-review' data-review='${qItem.id}'>我不熟</button></div>`;
}
function isListeningQuestion(qItem) { return qItem.section === "listening" && ["Part 1", "Part 2", "Part 3", "Part 4"].includes(qItem.part); }
function getListeningTranscriptKey(qItem) { return qItem.groupId ? `${qItem.part}-${qItem.groupId}`.replace(/[^a-zA-Z0-9_-]/g, "-") : qItem.id; }
function renderOptionTranscriptRows(qItem, options = {}) {
  const optionLabels = ["A", "B", "C", "D"];
  return getDisplayOptions(qItem, options).map((option, idx) => {
    return `<li><strong>${esc(optionLabels[idx] || idx + 1)}.</strong> ${esc(option.text)}${option.translation ? `<br><span class='muted'>${esc(option.translation)}</span>` : ""}</li>`;
  }).join("");
}
function isListeningGroupFullyAnswered(qItem, pool, options = {}) {
  if (!qItem.groupId || !(qItem.part === "Part 3" || qItem.part === "Part 4")) return true;
  const groupItems = pool.filter((item) => item.part === qItem.part && item.groupId === qItem.groupId);
  const sessionSolvedIds = options.sessionSolvedIds;
  return groupItems.length > 0 && groupItems.every((item) => state.solvedIds[item.id] || (sessionSolvedIds && sessionSolvedIds.has(item.id)));
}
function renderListeningTranscript(qItem, options = {}) {
  if (!isListeningQuestion(qItem)) return "";
  if (qItem.part === "Part 1") {
    return `<div class='listening-transcript'><h4>聽力逐字稿 Transcript</h4><h5>選項英文與中文對照</h5><ol>${renderOptionTranscriptRows(qItem, options)}</ol></div>`;
  }
  if (qItem.part === "Part 2") {
    const questionTranslation = qItem.questionTranslation || qItem.translation || "";
    return `<div class='listening-transcript'><h4>聽力逐字稿 Transcript</h4><h5>英文內容</h5><p>${esc(qItem.question)}</p><h5>中文翻譯</h5>${questionTranslation ? `<p>${esc(questionTranslation)}</p>` : ""}<h5>選項英文與中文對照</h5><ol>${renderOptionTranscriptRows(qItem, options)}</ol></div>`;
  }
  if (qItem.part === "Part 3" || qItem.part === "Part 4") {
    return `<div class='listening-transcript'><h4>聽力逐字稿 Transcript</h4><h5>英文內容</h5><p>${esc(qItem.passage || "")}</p><h5>中文翻譯</h5><p>${esc(qItem.translation || "")}</p></div>`;
  }
  return "";
}
function renderQuestionBody(qItem, indexInGroup = null, options = {}) {
  const answerState = getQuestionAnswerState(qItem, options);
  const solved = !!answerState;
  const toeicQuestionNumber = getToeicQuestionNumber(qItem);
  const title = isListeningQuestion(qItem) ? `Question ${toeicQuestionNumber || (indexInGroup === null ? "" : indexInGroup + 1)}`.trim() : (indexInGroup === null ? esc(qItem.question) : `Question ${indexInGroup + 1}. ${esc(qItem.question)}`);
  const imageHtml = qItem.part === "Part 1" ? renderQuestionImage(qItem) : "";
  const feedback = renderAnswerFeedback(qItem, answerState, options);
  const displayOptions = getDisplayOptions(qItem, options);
  return `<div class='question-block'><p>${title}</p>${imageHtml}${feedback || `<div id='fb-${qItem.id}'></div>`}<div>${displayOptions.map((op, i) => `<button class='option-btn${getAnsweredOptionClass(qItem, op.text, answerState)}' data-id='${qItem.id}' data-idx='${i}' ${solved ? "disabled" : ""}>${esc(op.text)}</button>`).join("")}</div><button class='danger mark-review' data-review='${qItem.id}'>我不熟</button></div>`;
}
function getGroupTitle(part, groupIndex) { const labelMap = { "Part 3": "組對話", "Part 4": "組獨白", "Part 6": "篇短文", "Part 7": "篇閱讀" }; return `${part} 第 ${groupIndex + 1} ${labelMap[part] || "組"}`; }
function renderPracticePool(pool, options = {}) {
  const html = [];
  let i = 0;
  const groupCounter = new Map();
  while (i < pool.length) {
    const item = pool[i];
    if (GROUPED_RANDOM_PARTS.has(item.part) && item.groupId) {
      const groupItems = [item];
      let j = i + 1;
      while (j < pool.length && pool[j].part === item.part && pool[j].groupId === item.groupId) {
        groupItems.push(pool[j]);
        j++;
      }
      const index = groupCounter.get(item.part) || 0;
      groupCounter.set(item.part, index + 1);
      const transcriptSlot = item.section === "listening" ? `<div id='transcript-${esc(getListeningTranscriptKey(item))}'></div>` : "";
      html.push(`<div class='card grouped-card'><h3>${esc(getGroupTitle(item.part, index))}</h3>${renderListeningSpeechControls(item, groupItems, options)}${(item.part === "Part 6" || item.part === "Part 7") ? renderQuestionImage(item) : ""}${item.passage && item.section !== "listening" ? `<p class='passage-text'>${esc(item.passage)}</p>` : ""}${groupItems.map((qItem, idx) => renderQuestionBody(qItem, idx, options)).join("")}${transcriptSlot}</div>`);
      i = j;
      continue;
    }
    html.push(`<div class='card'><h3>${esc(item.part)}</h3>${renderListeningSpeechControls(item, [], options)}${renderQuestionBody(item, null, options)}</div>`);
    i++;
  }
  return html.join("");
}
function bindQuestionEvents(pool, options = {}) {
  pool.forEach((qItem) => {
    document.querySelectorAll(`button[data-id='${qItem.id}']`).forEach((btn) => {
      btn.onclick = () => {
        const ans = getDisplayOptions(qItem, options)[Number(btn.dataset.idx)]?.text;
        const ok = evaluate(qItem, ans, options);
        if (ok === null) return;
        const answeredAt = state.userAnswers?.[qItem.id]?.answeredAt || new Date().toISOString();
        document.querySelectorAll(`button[data-id='${qItem.id}']`).forEach((x) => {
          const optionText = getDisplayOptions(qItem, options)[Number(x.dataset.idx)]?.text;
          x.disabled = true;
          x.classList.toggle("correct", optionText === qItem.answer);
          x.classList.toggle("wrong", !ok && optionText === ans);
        });

        const el = document.getElementById(`fb-${qItem.id}`);
        el.outerHTML = renderAnswerFeedback(qItem, { selectedAnswer: ans, isCorrect: ok, answeredAt }, options);
        const feedbackEl = document.getElementById(`fb-${qItem.id}`) || document.querySelector(`button[data-id='${qItem.id}']`)?.closest(".question-block, .card")?.querySelector(".answered-summary");

        if (isListeningQuestion(qItem)) {
          const transcriptHtml = renderListeningTranscript(qItem, options);
          if (qItem.part === "Part 3" || qItem.part === "Part 4") {
            const transcriptEl = document.getElementById(`transcript-${getListeningTranscriptKey(qItem)}`);
            if (transcriptEl && !transcriptEl.innerHTML && isListeningGroupFullyAnswered(qItem, pool, options)) transcriptEl.innerHTML = transcriptHtml;
          } else if (transcriptHtml) {
            if (feedbackEl) feedbackEl.innerHTML += transcriptHtml;
          }
        }
      };
    });
  });

  document.querySelectorAll(".mark-review").forEach((btn) => {
    btn.onclick = () => {
      const item = pool.find((x) => x.id === btn.dataset.review);
      if (!item) return;
      if (!state.reviewList.some((x) => x.id === item.id)) {
        state.reviewList.unshift({ ...item, markedAt: new Date().toISOString() });
        saveState();
      }
    };
  });

  document.querySelectorAll(".play-listening").forEach((btn) => {
    btn.onclick = () => {
      if (!window.speechSynthesis) return;
      const text = speechState.textByKey.get(btn.dataset.speechKey || "") || "";
      if (!text) return;
      stopSpeech();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      speechState.currentKey = btn.dataset.speechKey || "";
      utterance.onend = () => { speechState.currentKey = ""; };
      window.speechSynthesis.speak(utterance);
    };
  });

  document.querySelectorAll(".stop-listening").forEach((btn) => { btn.onclick = () => stopSpeech(); });
}

function renderTabs(){const nav=document.getElementById("tabNav");nav.innerHTML=tabs.map(([k,v])=>`<button class='tab-btn ${currentTab===k?"active":""}' data-tab='${k}'>${v}</button>`).join("");nav.querySelectorAll(".tab-btn").forEach((b)=>{b.onclick=()=>{currentTab=b.dataset.tab;renderTabs();renderContent();};});}
function renderDashboard() {
  const acc = state.total ? ((state.correct / state.total) * 100).toFixed(1) : "0.0";
  const examInfo = state.currentExam ? `<div class='stat'>正式測驗題組：<strong>${esc(state.currentExam.listeningIds?.length || 0)} 聽力 / ${esc(state.currentExam.readingIds?.length || 0)} 閱讀</strong></div>` : "";
  document.getElementById("dashboard").innerHTML = `<div class='dashboard-header'><h2>學習統計</h2><button id='resetStatsBtn' class='danger'>重製學習統計</button></div><div class='grid-2'><div class='stat'>總題庫數：<strong>${sampleQuestions.length}</strong></div><div class='stat'>今日已答題數：<strong>${state.doneToday}</strong></div><div class='stat'>正確率：<strong>${acc}%</strong></div><div class='stat'>錯題數：<strong>${state.wrongbook.length}</strong></div><div class='stat'>複習清單題數：<strong>${state.reviewList.length}</strong></div>${examInfo}</div>`;
  const resetBtn = document.getElementById("resetStatsBtn");
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (!confirm("確定要重製學習統計並產生新的正式測驗題組嗎？")) return;
      resetLearningStats();
    };
  }
}
function renderPractice(section){const parts=Object.keys(PART_SPECS).filter((p)=>PART_SPECS[p].section===section);document.getElementById("content").innerHTML=`<h2>${section==="listening"?"聽力":"閱讀"}練習</h2><select id='partFilter'><option value='all'>全部</option>${parts.map((p)=>`<option value='${p}'>${p}</option>`).join("")}</select><button id='reshuffle' class='primary'>重新隨機出題</button><div id='qArea'></div>`;const draw=()=>{const part=document.getElementById("partFilter").value;const pool=buildRandomPracticePool(section,part);document.getElementById("qArea").innerHTML=renderPracticePool(pool);bindQuestionEvents(pool);};document.getElementById("partFilter").onchange=draw;document.getElementById("reshuffle").onclick=draw;draw();}
function renderMiniPractice(title,pool,label){document.getElementById("content").innerHTML=`<h2>${title}</h2><button id='reshuffleMini' class='primary'>重新隨機出題</button><div id='qAreaMini'></div>`;const draw=()=>{const shuffled=shuffle(pool).map((x)=>({...x,part:label,type:label}));document.getElementById("qAreaMini").innerHTML=shuffled.map((item)=>renderQuestionCard(item,label)).join("");bindQuestionEvents(shuffled);};document.getElementById("reshuffleMini").onclick=draw;draw();}
function renderReview(){const list=state.reviewList;document.getElementById("content").innerHTML=`<h2>複習清單</h2><button id='startReview' class='primary'>開始複習清單練習</button>${list.length?list.map((i)=>`<div class='card'><p>${esc(i.part)} ${esc(i.question)}</p></div>`).join(""):"<p>尚未加入題目。</p>"}`;const sr=document.getElementById("startReview");if(sr)sr.onclick=()=>{const pool=shuffle(state.reviewList);const sessionSolvedIds=new Set();const reviewModeOptions={reviewMode:true,allowRetakeInReview:true,sessionSolvedIds};const updateRemain=()=>{const remain=document.getElementById("reviewRemain");if(remain)remain.textContent=String(state.reviewList.length);};document.getElementById("content").innerHTML=`<h2>複習清單練習</h2><p>目前剩餘複習清單題數：<strong id='reviewRemain'>${state.reviewList.length}</strong></p>${renderPracticePool(pool,reviewModeOptions)}`;bindQuestionEvents(pool,{...reviewModeOptions,removeReviewOnCorrect:true,onAfterEvaluate:updateRemain});};}
function renderWrongbook(){state.wrongbook=dedupeWrongbook(state.wrongbook);const list=state.wrongbook;document.getElementById("content").innerHTML=`<h2>錯題本</h2><button id='startWrongbook' class='primary'>開始錯題本練習</button><div id='wrongbookInfo'>${list.length?"":"<p>目前沒有錯題。</p>"}</div><div id='wrongbookList'>${list.map((i)=>`<div class='card'><p>${esc(i.part)}</p>${renderQuestionImage(i)}<p>${esc(i.question)}</p><p>我的答案：${esc(i.myAnswer)}</p><p>正確答案：${esc(i.answer)}</p><p>解析：${esc(i.explanation)}</p></div>`).join("")}</div>`;const sw=document.getElementById("startWrongbook");if(sw)sw.onclick=()=>{state.wrongbook=dedupeWrongbook(state.wrongbook);if(!state.wrongbook.length){const info=document.getElementById("wrongbookInfo");if(info)info.innerHTML="<p>錯題本已清空</p>";return;}const pool=shuffle(state.wrongbook.slice());const sessionSolvedIds=new Set();const wrongbookModeOptions={wrongbookMode:true,sessionSolvedIds};const updateRemain=()=>{const remain=document.getElementById("wrongbookRemain");if(remain)remain.textContent=String(state.wrongbook.length);if(!state.wrongbook.length){const area=document.getElementById("qAreaWrongbook");if(area)area.innerHTML="<p>錯題本已清空</p>";}};document.getElementById("content").innerHTML=`<h2>錯題本練習</h2><button id='startWrongbook' class='primary'>開始錯題本練習</button><p>目前剩餘錯題數：<strong id='wrongbookRemain'>${state.wrongbook.length}</strong></p><div id='qAreaWrongbook'>${renderPracticePool(pool,wrongbookModeOptions)}</div>`;const startInMode=document.getElementById("startWrongbook");if(startInMode)startInMode.onclick=()=>renderWrongbook();bindQuestionEvents(pool,{...wrongbookModeOptions,removeWrongbookOnCorrect:true,onAfterEvaluate:updateRemain});};}
function renderHome() {
  const exam = state.currentExam;
  document.getElementById("content").innerHTML = `<h2>首頁</h2><p>保留聽力、閱讀、單字、填空、句子、複習清單、錯題本功能。</p><button id='startOfficialExam' class='primary'>開始正式測驗</button>${exam ? `<p><small class='muted'>目前正式測驗題組建立時間：${esc(exam.createdAt)}</small></p>` : "<p><small class='muted'>尚未建立正式測驗題組，開始時會自動產生。</small></p>"}`;
  document.getElementById("startOfficialExam").onclick = () => renderOfficialExam();
}

function ensureCurrentExam() {
  if (!state.currentExam || !validateExamPool(state.currentExam).isValid) {
    state.currentExam = createExamPool();
    saveState();
  }
  const ids = [...(state.currentExam.listeningIds || []), ...(state.currentExam.readingIds || [])];
  state.currentExam.optionOrders = state.currentExam.optionOrders && typeof state.currentExam.optionOrders === "object" ? state.currentExam.optionOrders : {};
  const byId = new Map(sampleQuestions.map((item) => [item.id, item]));
  let changed = false;
  ids.forEach((id) => {
    const qItem = byId.get(id);
    if (qItem && !isValidOptionOrder(qItem, state.currentExam.optionOrders[id])) {
      state.currentExam.optionOrders[id] = buildOptionOrder(qItem);
      changed = true;
    }
  });
  if (changed) saveState();
  return state.currentExam;
}

function renderOfficialExam() {
  const exam = ensureCurrentExam();
  const listeningPool = getQuestionsByIds(exam.listeningIds);
  const readingPool = getQuestionsByIds(exam.readingIds);
  const pool = [...listeningPool, ...readingPool];
  document.getElementById("content").innerHTML = `<h2>正式測驗</h2><p>聽力 100 題，閱讀 100 題。題組題目會維持在同一組內。</p><h3>Listening 聽力</h3>${renderPracticePool(listeningPool, { optionOrders: exam.optionOrders })}<h3>Reading 閱讀</h3>${renderPracticePool(readingPool, { optionOrders: exam.optionOrders })}`;
  bindQuestionEvents(pool, { optionOrders: exam.optionOrders });
}

function renderContent() {
  if (currentTab === "exam") renderOfficialExam();
  else if (currentTab === "listening" || currentTab === "reading") renderPractice(currentTab);
  else if (currentTab === "review") renderReview();
  else renderWrongbook();
}
renderTabs();renderDashboard();renderContent();
