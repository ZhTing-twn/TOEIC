# TOEIC 英文多益複習網頁

## 題庫結構

本專案的 `sampleQuestions` 維持 **200 題**，並固定為 TOEIC 常見配比：

- Part 1：6 題
- Part 2：25 題
- Part 3：39 題（13 組對話 × 3 題）
- Part 4：30 題（10 組獨白 × 3 題）
- Part 5：30 題
- Part 6：16 題（4 組短文 × 4 題）
- Part 7：54 題（18 篇文章 × 3 題）

另外保留：

- 單字 5 題
- 填空 5 題
- 句子 5 題

每題欄位包含：

- `id`
- `section`
- `part`
- `type`
- `question`
- `options`
- `answer`
- `explanation`（中文解析）
- `grammarPoint`（文法題必要）
- `difficulty`
- `tags`
- `groupId`

## 題庫檢查

`script.js` 內新增 `validateQuestionBank()`，可檢查：

1. `sampleQuestions.length === 200`
2. 各 Part 題數是否正確（6/25/39/30/30/16/54）
3. 每題是否都有 `question`、`options`、`answer`、`explanation`
4. Part 5 文法題是否都有 `grammarPoint`

可在瀏覽器 Console 執行：

```js
validateQuestionBank()
```

回傳格式：

- `isValid: true` 代表題庫結構通過
- `errors: []` 為錯誤清單（若有問題會列出）

## 語法檢查

執行下列命令可檢查 JavaScript 語法：

```bash
node --check script.js
```

## 使用方式

1. 直接開啟 `index.html`。
2. 在聽力或閱讀頁可選擇 Part 並重新隨機出題。
3. 單字、填空、句子頁面可直接四選一作答。
4. 點擊「我不熟」可加入複習清單。
5. 可在複習清單與錯題本持續追蹤弱點題目。
