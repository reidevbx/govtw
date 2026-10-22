# 組織圖加入幕僚長、三級機關首長、司法／考試／監察委員

## 問題分析

- 使用者要再往下加三類：總統府與五院幕僚、三級機關首長、大法官／考試委員／監察委員。維持全部攤開。
- 目前版面只有三種位置：總統府、五院一列、行政院底下的分類面板。新的單位掛在五院和部會底下，需要通用的「卡片＋所屬單位」排法。
- 監察院正副院長出缺時 `members: []`；加入秘書長後，空陣列無法再表示出缺。

## 需求定義

- 幕僚：總統府秘書長、副秘書長、國安會秘書長；立法、司法、考試、監察院秘書長、副秘書長（行政院已在 `ey-office`）。加在原單位 members，正副首長之後。
- 出缺：`Member.vacant: true`，name 寫「出缺」，卡片顯示「缺」字佔位；人數統計排除。
- 院內成員：新單位 `jy-justices`（大法官）、`exam-members`（考試委員）、`cy-members`（監察委員），parent 為該院，group null。
- 三級機關：各部會所屬三級機關首長，parent 為部會 id，group null，只列首長。
- 版面：每個單位與其 group 為 null 的子單位組成一個區塊：卡片在上，子單位在下方框內流式排列。五院列與行政院面板都改排區塊。
- 驗收：`pnpm build:orgchart` 成功；每人都有 `source`；id 不重複。

## 實作計劃

- [x] 收集資料（6 個 agent 平行）：
  - core：幕僚、出缺標記（更新 `core.json`）
  - 院內成員：新增 `parts/yuan-members.json`
  - A／B／C／D＋工程會：三級機關，新增 `parts/agencies-*.json`
- [x] `types.ts`：`Member.vacant?`
- [x] `layout.ts`：抽出 `flow()` 與 `block()`；五院列依區塊寬度排列；面板排區塊；`containers` 給 render 畫子單位框
- [x] `render.ts`：出缺佔位、子單位框、子單位連線
- [x] `main.ts`：人數排除出缺；文字版名單包含子單位
- [x] 建置驗證、總結

## 影響範圍

- `apps/orgchart/src/`：`types.ts`、`layout.ts`、`render.ts`、`main.ts`
- `apps/orgchart/src/data/parts/`、`public/photos/`

## 總結

### 完成項目
- ✅ 資料：129 個單位、238 個職位（3 個出缺）、231 人、216 張照片，照片共 4.1 MB
  - 幕僚 12 人（`core.json`）；出缺標記：監察院正副院長、司法院副院長
  - 院內成員：大法官 7、考試委員 6、監察委員 0（全數出缺）
  - 三級機關 87 個：A 40、B 33、C 13、D 1
- ✅ `layout.ts` 改為區塊排列（卡片＋子單位框），抽出 `flow()`、`block()`、`translate()`
- ✅ `Member.vacant`、`Unit.note`、`Unit.url` 可為 null
- ✅ 下載圖片依 canvas 尺寸上限自動降倍率（目前全圖 3832×10304，倍率約 1.55）
- ✅ `pnpm build:orgchart` 成功；以 vite ssrLoadModule 跑版面：129 個單位全部有位置、0 個重疊

### 資料注意事項
- 國防部主計局查不到現任局長，`note: 查無現任資料`
- 非官網確認：公路局、鐵道局、農糧署、軍備局、軍醫局、能源署、產業園區管理局、地礦中心（媒體或搜尋結果）
- 官網資料舊、未找到 2026 佐證：國有財產署、關務署、財政資訊中心、金管會保險局、證期局
- 範圍判斷：
  - 三級「機構」有列入：國家海洋研究院、原住民族文化發展中心、客家文化發展中心、司法官學院
  - 沒列入：國防部各軍司令部、內政部新住民發展署（尚無首長資料）、各部會研究所／博物館等三級機構
- 衛福部組織法 2026-09-30 修正（社家署分拆）尚未施行，照現行組織列

### 變更檔案
- `apps/orgchart/src/`：`types.ts`、`layout.ts`、`render.ts`、`main.ts`
- `apps/orgchart/src/data/parts/`：`core.json`、`agencies-a.json`（新）、`agencies-b.json`（新）、`agencies-c.json`（新）、`agencies-d.json`（新）、`yuan-members.json`（新）
- `apps/orgchart/public/photos/`：新增 99 張
