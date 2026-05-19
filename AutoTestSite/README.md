# AutoTool - 企業自動化小工具服務網站

一個專業的一頁式網站，展示企業自動化流程解決方案服務。

## 📁 項目結構

```
AutoTestSite/
├── index.html          # 主頁面 - 包含所有 9 個 Section + Header + Footer
├── styles.css          # 響應式樣式 - 品牌色系統、組件、佈局
├── script.js           # 交互功能 - 導航、FAQ、平滑滾動
├── images/             # 圖片資源文件夾
└── README.md           # 本文件
```

## 🎯 網站內容結構

### 1. **Hero 首屏區塊**

- 主標題：「讓繁瑣工作自動化，把時間留給更重要的事情。」
- 副標題與技術說明
- 3 個 CTA 按鈕（立即洽詢、免費需求評估、客製化工具）
- 5 個特色標籤
- 背景圖片（Unsplash）

### 2. **痛點共鳴區塊**

- 5 張痛點卡片（複製貼上、人工操作、跨系統、人為錯誤、IT 資源）
- 收尾文案

### 3. **服務內容區塊**

- 8 個服務卡片（Excel/VBA、AutoHotKey、Web 自動化、UiPath、C#、IBM PCOMM、SQLite、DOS Batch）
- 格狀布局（響應式）

### 4. **技術能力區塊**

- 9 個技術 Badge（AutoIt、AutoHotKey、VBA、C#、UiPath、SQLite、IBM PCOMM、DOS Batch、iMacros）

### 5. **合作流程區塊**

- 4 步驟 Timeline（需求討論、方案規劃、快速開發、交付導入）

### 6. **適用場景區塊**

- 5 個場景卡片（行政人員、財務會計、銀行內勤、業務客服、中小企業）

### 7. **差異化特色區塊**

- 5 個特色（敏捷開發、客製化、成本較低、逐步擴充、熟悉舊系統）

### 8. **FAQ 常見問題區塊**

- 5 個常見問題（可展開/收起的 Accordion）

### 9. **最終 CTA 區塊**

- 標題與文案
- 3 個 CTA 按鈕
- 聯絡方式卡片（LINE、Email、Facebook）
- 嵌入 Google 表單

### 10. **Footer**

- 品牌資訊
- 快速連結
- 聯絡方式
- 版權資訊

## 🎨 設計系統

### 品牌色

- **主色**：#004E5B（深藍綠）
- **輔色**：#E2BCB8（柔和粉膚色）
- **背景**：#f5f5f5、#ffffff

### 字體

- **中文**：Noto Sans TC（Google Fonts）
- **英文**：Inter、Poppins（Google Fonts）
- **圖標**：Font Awesome 6

### 佈局

- **容器寬度**：1200px（max-width）
- **響應式斷點**：
  - Desktop: 1024px+
  - Tablet: 768px - 1023px
  - Mobile: < 768px

## 🚀 功能

### 導航

- ✅ 固定/粘性導航欄
- ✅ 平滑滾動到各 Section
- ✅ 主動高亮當前導航項
- ✅ 移動端漢堡菜單

### 交互

- ✅ FAQ Accordion（展開/收起）
- ✅ 按鈕 Ripple 效果
- ✅ Card Hover 效果
- ✅ 懶加載動畫

### 響應式

- ✅ 完整 Mobile 適配
- ✅ Tablet 優化
- ✅ 觸摸友好的按鈕大小
- ✅ 彈性佈局（CSS Grid + Flexbox）

### 無障礙

- ✅ 語義化 HTML
- ✅ 鍵盤導航支持（Escape、Tab、Enter）
- ✅ 圖片 Alt 文字

## 📸 圖片資源

### 使用的 Unsplash 圖片

| 位置         | 搜尋詞              | 建議尺寸  | 狀態               |
| ------------ | ------------------- | --------- | ------------------ |
| Hero 區塊    | automation office   | 1920x1080 | ✅ 已配置 CDN 連結 |
| Service 區塊 | workflow automation | 1600x900  | 可選               |
| Scene 區塊   | office teamwork     | 1600x900  | 可選               |
| CTA 區塊     | business success    | 1600x900  | 可選               |

### 如何添加本地圖片

1. 從 [Unsplash](https://unsplash.com) 下載圖片
2. 將圖片放入 `images/` 文件夾
3. 在 `index.html` 中更新圖片路徑：
   ```html
   <img src="images/hero.jpg" alt="描述" loading="lazy" />
   ```

## 🌐 聯絡方式

已配置以下聯絡方式：

- **LINE**：@dunkliao
- **Email**：dicksskimo@yahoo.com.tw
- **Facebook**：https://www.facebook.com/groups/1562757673989767
- **Google 表單**：需求評估表單（已嵌入）

## 📱 使用方式

### 本地查看

1. 在瀏覽器中直接打開 `index.html` 文件
2. 或使用本地伺服器（如 Live Server）

   ```bash
   # 使用 Python
   python -m http.server 8000

   # 使用 Node.js http-server
   npx http-server
   ```

### 部署到線上

1. 將文件上傳到網頁主機（如 GitHub Pages、Netlify、Vercel）
2. 或使用虛擬主機

## 🛠️ 技術棧

- **HTML5** - 語義化結構
- **CSS3** - 響應式佈局、Grid、Flexbox、變量
- **JavaScript** - 無框架交互（原生 JS）
- **Google Fonts** - 字體
- **Font Awesome** - 圖標
- **Unsplash** - 免費圖片 CDN

## ✨ 特點

- 📱 **完全響應式** - 支持所有設備尺寸
- 🚀 **快速加載** - 優化的圖片和代碼
- ♿ **無障礙支持** - WCAG 基本合規
- 🎨 **現代設計** - 專業的企業風格
- 🔧 **易於維護** - 清晰的代碼結構
- 📊 **SEO 友好** - 語義化 HTML 和 Meta 標籤
- 🌙 **卡片設計** - 大量留白、圓角、柔和陰影

## 📝 自定義

### 修改品牌色

編輯 `styles.css` 中的 CSS 變量：

```css
:root {
  --primary-color: #004e5b; /* 主色 */
  --secondary-color: #e2bcb8; /* 輔色 */
}
```

### 修改聯絡方式

編輯 `index.html` 中的聯絡卡片和連結

### 修改文案

編輯 `index.html` 中的各 Section 文本內容

## 🐛 故障排除

### 圖片不顯示

- 確保 Unsplash CDN 可以訪問（需要網絡連接）
- 或使用本地圖片路徑替換

### 導航菜單在移動端不工作

- 檢查 `script.js` 是否正確加載
- 查看瀏覽器控制台是否有錯誤

### 樣式不應用

- 確保 `styles.css` 路徑正確
- 清除瀏覽器緩存（Ctrl+Shift+Delete）

## 📄 許可

本項目為自動化小工具服務的展示網站。

---

**最後更新**：2024 年 5 月 19 日
