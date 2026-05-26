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

function q({ id, section, part, type, question, options, answer, explanation, translation = "", grammarPoint = "", passage = "", groupId = "", tags = [] }) {
  return { id, section, part, type, question, passage, audioUrl: "", options, answer, explanation, translation, grammarPoint, difficulty: "550-750", tags, groupId };
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
p1.forEach(([id, ans, options, exp]) => sampleQuestions.push(q({ id, section: "listening", part: "Part 1", type: "photographs", question: "What is most likely happening in the picture?", options, answer: ans, explanation: `${exp} 中文解析：其餘選項與場景人物或動作不符。`, translation: p1Translations[id], tags: ["photo"] })));

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
p4Groups.forEach((group, gi) => {
  group.items.forEach((item) => {
    const groupId = `L4G-${gi + 1}`;
    sampleQuestions.push(q({
      id: `L4-${l4idx++}`,
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
    passage: "Event Registration Notice: The Business Writing Workshop will be held on August 14 at Central Hall. The fee is NT$1,200, and payment must be completed by August 7 to secure your seat. Late payments will be placed on a waiting list.",
    items: [
      ["What event is announced?", ["A Business Writing Workshop", "A software maintenance drill", "A warehouse safety audit", "A customer feedback survey"], "A Business Writing Workshop", "第一句指出活動名稱為商務寫作工作坊。"],
      ["What is the registration fee?", ["NT$1,200", "NT$800", "NT$2,000", "No fee is required"], "NT$1,200", "短文明確列出費用為 1,200 元。"],
      ["Payment must be completed ____ August 7.", ["by", "from", "between", "while"], "by", "期限前用 by + 日期。", "介系詞"],
      ["Late payments will be ____ on a waiting list.", ["placed", "placing", "place", "places"], "placed", "被動語態 will be placed 表示被列入。", "主被動"]
    ]
  },
  {
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
p6Groups.forEach((group, g) => {
  group.items.forEach((item) => {
    sampleQuestions.push(q({
      id: `R6-${r6idx++}`,
      section: "reading",
      part: "Part 6",
      type: "text-completion",
      groupId: `R6G-${g + 1}`,
      passage: group.passage,
      question: item[0],
      options: item[1],
      answer: item[2],
      explanation: `${item[3]} 中文解析：依短文內容與句型選出最適合答案。`,
      translation: item[3],
      grammarPoint: item[4] || "",
      tags: ["passage"],
    }));
  });
});

const p7Groups = [
  { type: "email", passage: "Email: Subject: Parking Permit Renewal. Dear Staff, To keep your parking access for July, submit your plate number and employee ID to parking@nova.com by June 28. Permits not renewed by that date will be deactivated on July 1.", items: [
    ["What must employees submit for renewal?", ["Their plate number and employee ID", "A fuel receipt and route map", "A manager recommendation letter", "A copy of their driver's license only"], "Their plate number and employee ID", "信件明確要求提交車牌號碼與員工編號。"],
    ["When will unrenewed permits stop working?", ["July 1", "June 28", "July 15", "No deactivation date is mentioned"], "July 1", "文中指出未續辦者將於 7 月 1 日失效。"],
    ["Who is the intended audience?", ["Company employees with parking access", "Outside delivery drivers", "Customers visiting the showroom", "New job applicants"], "Company employees with parking access", "主旨為停車證續辦，對象是員工。"]
  ]},
  { type: "memo", passage: "Memo: The Marketing Department will move to Floor 8 on June 12. Pack personal items by June 10 and label each box with your team name. IT will reconnect desktop computers on June 13.", items: [
    ["Which department is relocating?", ["Marketing", "Finance", "Human Resources", "Procurement"], "Marketing", "備忘錄第一句指出是行銷部門搬遷。"],
    ["What should staff do by June 10?", ["Pack personal items and label boxes", "Return access cards to security", "Attend a safety drill", "Submit travel receipts"], "Pack personal items and label boxes", "文中要求 6/10 前完成打包與標示。"],
    ["Why is June 13 mentioned?", ["IT will reconnect computers that day", "The office lease ends that day", "A vendor audit is scheduled", "A company holiday begins"], "IT will reconnect computers that day", "備忘錄說明 IT 在 6/13 重新連接電腦。"]
  ]},
  { type: "notice", passage: "Notice: The cafeteria on Level 2 will operate with a limited menu from 11:30 a.m. to 1:30 p.m. this Thursday due to kitchen equipment maintenance. Please expect longer wait times.", items: [
    ["Why will the menu be limited?", ["Kitchen equipment maintenance", "A food supplier strike", "A holiday closure", "A staff training seminar"], "Kitchen equipment maintenance", "公告直接說明原因是廚房設備維護。"],
    ["During what hours does this notice apply?", ["11:30 a.m. to 1:30 p.m.", "9:00 a.m. to 11:00 a.m.", "1:30 p.m. to 3:30 p.m.", "All day"], "11:30 a.m. to 1:30 p.m.", "文中給出限定時段。"],
    ["What can readers infer?", ["Lunch service may be slower than usual", "The cafeteria is closing permanently", "Only drinks will be sold", "All employees must eat off-site"], "Lunch service may be slower than usual", "公告提醒等待時間變長，可推論服務速度較慢。"]
  ]},
  { type: "advertisement", passage: "Advertisement: BrightSkills Training Center offers a Weekend Business English Program. Tuition is NT$6,800 for eight sessions, including mock interviews and pronunciation coaching. Register by July 5 to receive a free workbook.", items: [
    ["What is being advertised?", ["A weekend business English program", "A translation software license", "A corporate tax service", "A recruitment fair"], "A weekend business English program", "廣告主題是週末商務英文課程。"],
    ["How much is the tuition?", ["NT$6,800", "NT$5,200", "NT$7,500", "NT$680"], "NT$6,800", "文中明確列出學費金額。"],
    ["What is offered to early registrants?", ["A free workbook", "A free tablet", "A refund coupon", "A private coaching session"], "A free workbook", "7/5 前報名可獲得免費教材。"]
  ]},
  { type: "schedule", passage: "Schedule: Vendor Onboarding Day, July 18, Room 402. 09:00-09:30 Check-in, 09:30-10:30 Compliance Briefing, 10:45-11:30 System Account Setup, 11:30-12:00 Q&A.", items: [
    ["Where will Vendor Onboarding Day be held?", ["Room 402", "Room 305", "Main Lobby", "Online only"], "Room 402", "時程表標明活動地點是 402 室。"],
    ["What happens at 10:45?", ["System account setup begins", "Compliance briefing ends", "Lunch break starts", "Q&A session starts"], "System account setup begins", "10:45-11:30 的項目是系統帳號設定。"],
    ["Who is this schedule most likely for?", ["Newly approved vendors", "Hotel guests", "Factory inspectors", "Job candidates"], "Newly approved vendors", "活動名稱是 Vendor Onboarding，可推論對象為新供應商。"]
  ]},
  { type: "invoice", passage: "Invoice #A5831: Issued to Orion Office Co. Item: 12 ergonomic chairs. Subtotal NT$24,000; Delivery fee NT$1,200; Total NT$25,200. Payment due within 30 days by bank transfer.", items: [
    ["What is the invoice total?", ["NT$25,200", "NT$24,000", "NT$26,400", "NT$1,200"], "NT$25,200", "發票總額欄位清楚列為 25,200 元。"],
    ["How should payment be made?", ["By bank transfer", "By cash on delivery", "By credit card at store", "By mobile wallet"], "By bank transfer", "付款方式欄位指定銀行轉帳。"],
    ["Which amount is the delivery fee?", ["NT$1,200", "NT$2,400", "NT$12,000", "NT$25,200"], "NT$1,200", "運費欄位標示 1,200 元。"]
  ]},
  { type: "receipt", passage: "Receipt: GreenLine Express, June 3. Service: Same-day parcel delivery. Base fee NT$320, fuel surcharge NT$40, insurance NT$25. Amount paid NT$385 by corporate card.", items: [
    ["What service was purchased?", ["Same-day parcel delivery", "International air freight", "Warehouse storage", "Office cleaning"], "Same-day parcel delivery", "收據服務項目寫明當日包裹配送。"],
    ["How much was paid in total?", ["NT$385", "NT$320", "NT$360", "NT$425"], "NT$385", "收據最後顯示實付金額 385 元。"],
    ["What can be inferred about payment?", ["The payment was already completed", "Payment is due in 30 days", "Only a deposit was paid", "The transaction was canceled"], "The payment was already completed", "收據使用 Amount paid，表示款項已支付。"]
  ]},
  { type: "job posting", passage: "Job Posting: Logistics Coordinator, Delta Supply Ltd. Requirements: at least 2 years of inventory control experience, advanced Excel skills, and ability to communicate with overseas vendors. Apply by sending a resume to hr@deltasupply.com by June 30.", items: [
    ["What position is being offered?", ["Logistics Coordinator", "Finance Analyst", "Sales Trainer", "IT Support Specialist"], "Logistics Coordinator", "職缺標題直接寫明職稱。"],
    ["Which skill is specifically required?", ["Advanced Excel skills", "Graphic design expertise", "Legal drafting experience", "Public speaking certification"], "Advanced Excel skills", "需求條件列有 advanced Excel skills。"],
    ["What should applicants do to apply?", ["Email a resume by June 30", "Call the warehouse manager", "Submit documents in person only", "Register through a travel portal"], "Email a resume by June 30", "公告說明以 email 寄履歷且有截止日。"]
  ]},
  { type: "customer review", passage: "Customer Review: The new online reservation tool is fast and easy to use. I booked a meeting room in under two minutes. However, the cancellation policy is hard to find, so clearer instructions would help.", items: [
    ["What did the reviewer like?", ["The booking process was quick", "The cancellation policy was clear", "Phone support was immediate", "The fee was reduced"], "The booking process was quick", "評論稱讚預約流程快速易用。"],
    ["What problem is mentioned?", ["Cancellation policy is hard to find", "The website frequently crashes", "Payment options are missing", "No rooms are available"], "Cancellation policy is hard to find", "評論中具體指出取消政策不易找到。"],
    ["What is the writer's purpose?", ["To provide feedback with praise and a suggestion", "To request a refund immediately", "To advertise a competing service", "To report billing fraud"], "To provide feedback with praise and a suggestion", "內容同時包含優點與改進建議，屬回饋性評論。"]
  ]},
  { type: "business letter", passage: "Business Letter: June 6. Dear Mr. Park, Thank you for your proposal for monthly equipment maintenance. We would like to proceed, but please revise Clause 3 to include emergency on-site support within 4 hours. Sincerely, Nina Chen, Operations Manager.", items: [
    ["Why is this letter sent?", ["To request a revision before agreement", "To terminate an existing contract", "To confirm shipment delivery", "To invite Mr. Park to an interview"], "To request a revision before agreement", "信中表示願意合作但要求修改第 3 條。"],
    ["What change is requested?", ["Add 4-hour emergency on-site support", "Reduce monthly fee by 50%", "Remove all maintenance visits", "Extend contract length to five years"], "Add 4-hour emergency on-site support", "具體要求在條款加入 4 小時內到場支援。"],
    ["Who wrote the letter?", ["Nina Chen, Operations Manager", "Mr. Park, Sales Director", "The legal department intern", "A customer service agent"], "Nina Chen, Operations Manager", "結尾簽名清楚標示寄件人職稱姓名。"]
  ]},
  { type: "email", passage: "Email: Subject: Webinar Link Update. The product webinar on June 21 has moved from Zoom Room A to Zoom Room C due to participant limits. Please use the new link in the attached calendar invite.", items: [
    ["Why was the webinar room changed?", ["Participant limits were reached", "The presenter canceled", "The topic was updated", "A power outage occurred"], "Participant limits were reached", "信件說明改房因參加人數限制。"],
    ["What should recipients use to join?", ["The new link in the attached invite", "The old link from last week", "A phone number in the footer", "The company intranet homepage"], "The new link in the attached invite", "文中要求使用附件行事曆中的新連結。"],
    ["What type of text is this?", ["A schedule update email", "A payment receipt", "A hiring announcement", "A public advertisement"], "A schedule update email", "內容格式與目的都是通知會議連結異動。"]
  ]},
  { type: "memo", passage: "Memo: Quarterly Safety Drill. All floor leaders must submit attendance records within 24 hours after each drill. Missing records will delay compliance reporting to headquarters.", items: [
    ["Who must submit attendance records?", ["Floor leaders", "All visitors", "Security guards only", "External auditors"], "Floor leaders", "備忘錄點名 floor leaders 為責任對象。"],
    ["When is the submission deadline?", ["Within 24 hours after each drill", "Before the drill starts", "At the end of each month", "No deadline is specified"], "Within 24 hours after each drill", "文中明確給出 24 小時期限。"],
    ["What may happen if records are missing?", ["Compliance reporting will be delayed", "The drill will be canceled", "Employee salaries will be reduced", "Headquarters will close the office"], "Compliance reporting will be delayed", "後句直接說明缺件後果為合規報告延遲。"]
  ]},
  { type: "notice", passage: "Notice: Lobby access-card scanners will be replaced this Saturday from 8 a.m. to 11 a.m. During that period, temporary paper badges will be issued at the reception desk.", items: [
    ["What maintenance work is planned?", ["Replacing lobby card scanners", "Upgrading cafeteria tables", "Painting the parking lot", "Testing fire alarms"], "Replacing lobby card scanners", "公告主題是更換大廳刷卡設備。"],
    ["Where can people get temporary badges?", ["At the reception desk", "At the security control room", "In the HR office", "At the loading dock"], "At the reception desk", "通知指出臨時紙卡在櫃台發放。"],
    ["How long will the replacement take?", ["Three hours", "One hour", "Half a day", "All weekend"], "Three hours", "8 點到 11 點共 3 小時。"]
  ]},
  { type: "advertisement", passage: "Advertisement: GreenLine Courier guarantees same-day delivery for downtown parcels submitted before noon. A flat rate of NT$180 applies to packages under 3 kilograms.", items: [
    ["What does GreenLine Courier guarantee?", ["Same-day downtown delivery before-noon submissions", "International delivery within one day", "Free shipping on all parcels", "Weekend-only pickup service"], "Same-day downtown delivery before-noon submissions", "廣告強調中午前送件可當日送達市區。"],
    ["What is the stated flat rate?", ["NT$180", "NT$150", "NT$200", "NT$300"], "NT$180", "文中明確列出固定費率。"],
    ["Which package condition is required for that rate?", ["Under 3 kilograms", "Over 5 kilograms", "Fragile items only", "International destination"], "Under 3 kilograms", "固定費率適用於 3 公斤以下。"]
  ]},
  { type: "schedule", passage: "Schedule: New Hire Orientation, July 3. 09:30 Welcome Session (HR), 10:30 IT Account Setup, 11:15 Office Tour, 12:00 Lunch with Team Leads.", items: [
    ["Who leads the 9:30 session?", ["HR", "IT", "Finance", "Operations"], "HR", "時程表括號標示 9:30 由 HR 主持。"],
    ["What is scheduled at 10:30?", ["IT account setup", "Office tour", "Lunch", "Welcome session"], "IT account setup", "10:30 的項目是帳號設定。"],
    ["Who is this schedule intended for?", ["Newly hired employees", "External vendors", "Customers visiting showrooms", "Senior executives only"], "Newly hired employees", "活動名稱為 New Hire Orientation。"]
  ]},
  { type: "invoice", passage: "Invoice #M7702: May Website Maintenance Service. Monthly service fee NT$780. Additional emergency fix NT$220. Total due NT$1,000. Payment due date: June 15.", items: [
    ["How much is the emergency fix charge?", ["NT$220", "NT$780", "NT$1,000", "NT$200"], "NT$220", "發票細項列出緊急修復費用。"],
    ["What is the total amount due?", ["NT$1,000", "NT$780", "NT$1,220", "NT$1,500"], "NT$1,000", "總額欄位明示 1,000 元。"],
    ["When is payment due?", ["June 15", "May 15", "June 30", "No due date provided"], "June 15", "付款期限欄位寫明 6 月 15 日。"]
  ]},
  { type: "receipt", passage: "Receipt: Metro Print Shop. Item: 200 color brochures. Printing NT$1,600; Binding NT$300; Tax NT$95. Total paid NT$1,995 by cash. Thank you for your business.", items: [
    ["What item was purchased?", ["200 color brochures", "200 envelopes", "A printer cartridge", "Binding machine rental"], "200 color brochures", "收據品項欄位寫明 200 份彩色型錄。"],
    ["How much tax was charged?", ["NT$95", "NT$300", "NT$1,600", "NT$1,995"], "NT$95", "稅額欄位為 95 元。"],
    ["What payment method was used?", ["Cash", "Bank transfer", "Credit card", "Company check"], "Cash", "收據載明 by cash。"]
  ]},
  { type: "job posting", passage: "Job Posting: Financial Analyst, Apex Manufacturing. Responsibilities include monthly forecasting, variance analysis, and dashboard reporting. Candidates should have CPA-level accounting knowledge and at least 3 years of experience.", items: [
    ["What role is Apex Manufacturing hiring for?", ["Financial Analyst", "Logistics Coordinator", "Marketing Specialist", "Recruitment Officer"], "Financial Analyst", "職缺標題即為 Financial Analyst。"],
    ["Which task is listed as a responsibility?", ["Monthly forecasting", "Warehouse equipment repair", "Customer hotline support", "Contract translation"], "Monthly forecasting", "職務內容包含每月預測。"],
    ["What level of experience is requested?", ["At least 3 years", "No experience required", "At least 1 year", "More than 10 years"], "At least 3 years", "條件中明確寫至少三年經驗。"]
  ]}
];

let r7idx = 1;
p7Groups.forEach((group, gi) => {
  group.items.forEach((item) => {
    sampleQuestions.push(q({
      id: `R7-${r7idx++}`,
      section: "reading",
      part: "Part 7",
      type: "reading-comprehension",
      groupId: `R7G-${gi + 1}`,
      passage: group.passage,
      question: item[0],
      options: item[1],
      answer: item[2],
      explanation: `${item[3]} 中文解析：請依文本中的關鍵資訊定位答案。`,
      translation: item[3],
      tags: ["reading", group.type],
    }));
  });
});

vocabQuestions.forEach((item) => { if (!item.translation) item.translation = `此單字的中文意思是${item.answer}。`; });

function validateQuestionBank() {
  const requiredParts = { "Part 1": 6, "Part 2": 25, "Part 3": 39, "Part 4": 30, "Part 5": 30, "Part 6": 16, "Part 7": 54 };
  const errors = [];
  if (sampleQuestions.length !== 200) errors.push(`sampleQuestions.length should be 200, got ${sampleQuestions.length}`);
  Object.entries(requiredParts).forEach(([part, count]) => {
    const actual = sampleQuestions.filter((x) => x.part === part).length;
    if (actual !== count) errors.push(`${part} should be ${count}, got ${actual}`);
  });
  sampleQuestions.forEach((item) => {
    ["question", "options", "answer", "explanation", "translation"].forEach((key) => { if (!item[key] || (Array.isArray(item[key]) && !item[key].length)) errors.push(`${item.id} missing ${key}`); });
    if (item.part === "Part 5" && !item.grammarPoint) errors.push(`${item.id} missing grammarPoint`);
  });
  return { isValid: errors.length === 0, errors };
}

const tabs = [["home", "首頁"], ["listening", "聽力"], ["reading", "閱讀"], ["vocabulary", "單字"], ["cloze", "填空"], ["sentence", "句子"], ["review", "複習清單"], ["wrongbook", "錯題本"]];
const speechState = { currentKey: "" };
let currentTab = "home";
function defaultState() { return { total: 0, correct: 0, wrongbook: [], reviewList: [], doneToday: 0, lastPracticeDate: new Date().toISOString().slice(0, 10), byPart: {}, solvedIds: {} }; }
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
function loadState() { const raw = localStorage.getItem(STORAGE_KEY); const parsed = raw ? JSON.parse(raw) : defaultState(); const t = new Date().toISOString().slice(0, 10); if (parsed.lastPracticeDate !== t) parsed.doneToday = 0; parsed.lastPracticeDate = t; parsed.wrongbook = dedupeWrongbook(parsed.wrongbook || []); return { ...defaultState(), ...parsed }; }
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
const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderDashboard(); }
function stopSpeech() {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  speechState.currentKey = "";
}
function getListeningSpeechText(qItem, groupItems = []) {
  if (qItem.part === "Part 1") return `${qItem.question} ${qItem.options.join(". ")}`;
  if (qItem.part === "Part 2") return qItem.question;
  if (qItem.part === "Part 3" || qItem.part === "Part 4") return qItem.passage || "";
  return "";
}
function renderListeningSpeechControls(qItem, groupItems = []) {
  if (qItem.section !== "listening") return "";
  const speechText = getListeningSpeechText(qItem, groupItems);
  if (!speechText) return "";
  const speechKey = groupItems.length ? `${qItem.part}::${qItem.groupId}` : qItem.id;
  return `<div class='speech-controls'><button class='primary play-listening' data-speech-key='${esc(speechKey)}' data-speech-text='${esc(speechText)}'>播放聽力</button><button class='danger stop-listening'>停止播放</button></div>`;
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
  if (inReviewMode || inWrongbookMode) {
    if (sessionSolvedIds) sessionSolvedIds.add(qItem.id);
  } else {
    state.solvedIds[qItem.id] = true;
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
    const now = new Date().toISOString();
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
function renderQuestionCard(qItem, partLabel = "", options = {}) { const solved = (options.reviewMode || options.wrongbookMode) ? false : !!state.solvedIds[qItem.id]; return `<div class='card'><h3>${esc(partLabel || qItem.part)}</h3><p>${esc(qItem.question)}</p>${qItem.passage ? `<p><small>${esc(qItem.passage)}</small></p>` : ""}<div>${qItem.options.map((op, i) => `<button class='option-btn' data-id='${qItem.id}' data-idx='${i}' ${solved ? "disabled" : ""}>${esc(op)}</button>`).join("")}</div><button class='danger mark-review' data-review='${qItem.id}'>我不熟</button><div id='fb-${qItem.id}'>${solved ? "<small>此題已作答，已鎖定。</small>" : ""}</div></div>`; }
function renderQuestionBody(qItem, indexInGroup = null, options = {}) { const solved = (options.reviewMode || options.wrongbookMode) ? false : !!state.solvedIds[qItem.id]; const title = indexInGroup === null ? esc(qItem.question) : `Question ${indexInGroup + 1}. ${esc(qItem.question)}`; return `<div class='question-block'><p>${title}</p><div>${qItem.options.map((op, i) => `<button class='option-btn' data-id='${qItem.id}' data-idx='${i}' ${solved ? "disabled" : ""}>${esc(op)}</button>`).join("")}</div><button class='danger mark-review' data-review='${qItem.id}'>我不熟</button><div id='fb-${qItem.id}'>${solved ? "<small>此題已作答，已鎖定。</small>" : ""}</div></div>`; }
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
      html.push(`<div class='card grouped-card'><h3>${esc(getGroupTitle(item.part, index))}</h3>${renderListeningSpeechControls(item, groupItems)}${item.passage ? `<p class='passage-text'>${esc(item.passage)}</p>` : ""}${groupItems.map((qItem, idx) => renderQuestionBody(qItem, idx, options)).join("")}</div>`);
      i = j;
      continue;
    }
    html.push(`<div class='card'><h3>${esc(item.part)}</h3>${renderListeningSpeechControls(item)}${renderQuestionBody(item, null, options)}</div>`);
    i++;
  }
  return html.join("");
}
function bindQuestionEvents(pool, options = {}) { pool.forEach((qItem) => { document.querySelectorAll(`button[data-id='${qItem.id}']`).forEach((btn) => { btn.onclick = () => { const ans = qItem.options[Number(btn.dataset.idx)]; const ok = evaluate(qItem, ans, options); if (ok === null) return; document.querySelectorAll(`button[data-id='${qItem.id}']`).forEach((x) => { x.disabled = true; }); const el = document.getElementById(`fb-${qItem.id}`); el.className = `feedback ${ok ? "success" : "error"}`; el.innerHTML = `${ok ? "✅" : "❌"} 正確答案：${esc(qItem.answer)}<br>解析：${esc(qItem.explanation)}${qItem.translation ? `<br>整句翻譯：${esc(qItem.translation)}` : ""}${qItem.grammarPoint ? `<br>文法重點：${esc(qItem.grammarPoint)}` : ""}`; }; }); }); document.querySelectorAll(".mark-review").forEach((btn) => { btn.onclick = () => { const item = pool.find((x) => x.id === btn.dataset.review); if (!item) return; if (!state.reviewList.some((x) => x.id === item.id)) { state.reviewList.unshift({ ...item, markedAt: new Date().toISOString() }); saveState(); } }; }); document.querySelectorAll(".play-listening").forEach((btn) => { btn.onclick = () => { if (!window.speechSynthesis) return; const text = btn.dataset.speechText || ""; if (!text) return; stopSpeech(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = "en-US"; utterance.rate = 0.95; speechState.currentKey = btn.dataset.speechKey || ""; utterance.onend = () => { speechState.currentKey = ""; }; window.speechSynthesis.speak(utterance); }; }); document.querySelectorAll(".stop-listening").forEach((btn) => { btn.onclick = () => stopSpeech(); }); }
function renderTabs(){const nav=document.getElementById("tabNav");nav.innerHTML=tabs.map(([k,v])=>`<button class='tab-btn ${currentTab===k?"active":""}' data-tab='${k}'>${v}</button>`).join("");nav.querySelectorAll(".tab-btn").forEach((b)=>{b.onclick=()=>{currentTab=b.dataset.tab;renderTabs();renderContent();};});}
function renderDashboard(){const acc=state.total?((state.correct/state.total)*100).toFixed(1):"0.0";document.getElementById("dashboard").innerHTML=`<h2>學習統計</h2><div class='grid-2'><div class='stat'>總題庫數：<strong>${sampleQuestions.length}</strong></div><div class='stat'>今日已答題數：<strong>${state.doneToday}</strong></div><div class='stat'>正確率：<strong>${acc}%</strong></div><div class='stat'>錯題數：<strong>${state.wrongbook.length}</strong></div><div class='stat'>複習清單題數：<strong>${state.reviewList.length}</strong></div></div>`;}
function renderPractice(section){const parts=Object.keys(PART_SPECS).filter((p)=>PART_SPECS[p].section===section);document.getElementById("content").innerHTML=`<h2>${section==="listening"?"聽力":"閱讀"}練習</h2><select id='partFilter'><option value='all'>全部</option>${parts.map((p)=>`<option value='${p}'>${p}</option>`).join("")}</select><button id='reshuffle' class='primary'>重新隨機出題</button><div id='qArea'></div>`;const draw=()=>{const part=document.getElementById("partFilter").value;const pool=buildRandomPracticePool(section,part);document.getElementById("qArea").innerHTML=renderPracticePool(pool);bindQuestionEvents(pool);};document.getElementById("partFilter").onchange=draw;document.getElementById("reshuffle").onclick=draw;draw();}
function renderMiniPractice(title,pool,label){document.getElementById("content").innerHTML=`<h2>${title}</h2><button id='reshuffleMini' class='primary'>重新隨機出題</button><div id='qAreaMini'></div>`;const draw=()=>{const shuffled=shuffle(pool).map((x)=>({...x,part:label,type:label}));document.getElementById("qAreaMini").innerHTML=shuffled.map((item)=>renderQuestionCard(item,label)).join("");bindQuestionEvents(shuffled);};document.getElementById("reshuffleMini").onclick=draw;draw();}
function renderReview(){const list=state.reviewList;document.getElementById("content").innerHTML=`<h2>複習清單</h2><button id='startReview' class='primary'>開始複習清單練習</button>${list.length?list.map((i)=>`<div class='card'><p>${esc(i.part)} ${esc(i.question)}</p></div>`).join(""):"<p>尚未加入題目。</p>"}`;const sr=document.getElementById("startReview");if(sr)sr.onclick=()=>{const pool=shuffle(state.reviewList);const sessionSolvedIds=new Set();const reviewModeOptions={reviewMode:true,allowRetakeInReview:true,sessionSolvedIds};const updateRemain=()=>{const remain=document.getElementById("reviewRemain");if(remain)remain.textContent=String(state.reviewList.length);};document.getElementById("content").innerHTML=`<h2>複習清單練習</h2><p>目前剩餘複習清單題數：<strong id='reviewRemain'>${state.reviewList.length}</strong></p>${renderPracticePool(pool,reviewModeOptions)}`;bindQuestionEvents(pool,{...reviewModeOptions,removeReviewOnCorrect:true,onAfterEvaluate:updateRemain});};}
function renderWrongbook(){state.wrongbook=dedupeWrongbook(state.wrongbook);const list=state.wrongbook;document.getElementById("content").innerHTML=`<h2>錯題本</h2><button id='startWrongbook' class='primary'>開始錯題本練習</button><div id='wrongbookInfo'>${list.length?"":"<p>目前沒有錯題。</p>"}</div><div id='wrongbookList'>${list.map((i)=>`<div class='card'><p>${esc(i.part)}</p><p>${esc(i.question)}</p><p>我的答案：${esc(i.myAnswer)}</p><p>正確答案：${esc(i.answer)}</p><p>解析：${esc(i.explanation)}</p></div>`).join("")}</div>`;const sw=document.getElementById("startWrongbook");if(sw)sw.onclick=()=>{state.wrongbook=dedupeWrongbook(state.wrongbook);if(!state.wrongbook.length){const info=document.getElementById("wrongbookInfo");if(info)info.innerHTML="<p>錯題本已清空</p>";return;}const pool=shuffle(state.wrongbook.slice());const sessionSolvedIds=new Set();const wrongbookModeOptions={wrongbookMode:true,sessionSolvedIds};const updateRemain=()=>{const remain=document.getElementById("wrongbookRemain");if(remain)remain.textContent=String(state.wrongbook.length);if(!state.wrongbook.length){const area=document.getElementById("qAreaWrongbook");if(area)area.innerHTML="<p>錯題本已清空</p>";}};document.getElementById("content").innerHTML=`<h2>錯題本練習</h2><button id='startWrongbook' class='primary'>開始錯題本練習</button><p>目前剩餘錯題數：<strong id='wrongbookRemain'>${state.wrongbook.length}</strong></p><div id='qAreaWrongbook'>${renderPracticePool(pool,wrongbookModeOptions)}</div>`;const startInMode=document.getElementById("startWrongbook");if(startInMode)startInMode.onclick=()=>renderWrongbook();bindQuestionEvents(pool,{...wrongbookModeOptions,removeWrongbookOnCorrect:true,onAfterEvaluate:updateRemain});};}
function renderContent(){if(currentTab==="home")document.getElementById("content").innerHTML="<h2>首頁</h2><p>保留聽力、閱讀、單字、填空、句子、複習清單、錯題本功能。</p>";else if(currentTab==="listening"||currentTab==="reading")renderPractice(currentTab);else if(currentTab==="vocabulary")renderMiniPractice("單字練習",vocabQuestions,"單字");else if(currentTab==="cloze")renderMiniPractice("填空練習",clozeQuestions,"填空");else if(currentTab==="sentence")renderMiniPractice("句子練習",sentenceQuestions,"句子");else if(currentTab==="review")renderReview();else renderWrongbook();}
renderTabs();renderDashboard();renderContent();
