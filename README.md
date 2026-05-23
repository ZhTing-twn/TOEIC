# TOEIC 英文多益複習網頁

## 目前版本重點

- 題庫已擴充為 **200 題**，符合 TOEIC Listening & Reading 正式配比：
  - Listening 100 題：Part 1 (6)、Part 2 (25)、Part 3 (39)、Part 4 (30)
  - Reading 100 題：Part 5 (30)、Part 6 (16)、Part 7 (54)
- 題目主題為職場情境（會議、出差、採購、客服、公告、email、內部通知、簡報）。
- 每題皆包含答案、中文解析；文法題（Part 5/6）包含 `grammarPoint` 文法重點。
- 聽力/閱讀支援 **Part 篩選** 與 **隨機出題**，可按「重新隨機出題」。
- 同一輪題目由打亂後題庫呈現，不重複抽出同一題。
- 新增「我不熟」按鈕：可將題目加入「複習清單」。
- 複習清單獨立於錯題本，並保存於 `localStorage`（重整後保留）。
- 複習清單頁包含：題型、Part、題目、正確答案、解析、標記時間、移除。
- 複習清單提供「開始複習清單練習」與「清空複習清單」。
- 首頁統計新增：總題庫數、今日已答題數、正確率、錯題數、複習清單題數、各 Part 進度。

## 資料欄位格式

每題採用以下欄位：

- `id`
- `section`
- `part`
- `type`
- `question`
- `passage`
- `audioUrl`
- `options`
- `answer`
- `explanation`
- `grammarPoint`
- `difficulty`
- `tags`
- `groupId`

Part 3 / Part 4 / Part 6 / Part 7 多題同文時，以 `groupId` 串接。

## 使用方式

1. 直接以瀏覽器開啟 `index.html`。
2. 在「聽力」或「閱讀」選擇 Part，系統會隨機排列題目。
3. 點「我不熟」可加入複習清單。
4. 前往「複習清單」可開始針對不熟題複習。
