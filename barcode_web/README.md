# Barcode Web: URL to QR Code

這是一個使用 Next.js App Router 建立的 Web App，可將網址轉換成 QR Code，並下載成 JPG 圖檔。

## 功能

- 輸入網址（僅接受 http:// 或 https://）
- 產生 QR Code（Canvas 渲染）
- 下載 QR Code 為 .jpg
- 響應式版面，支援桌機與手機

## 技術棧

- Next.js 16.2.6
- React 19.2.4
- TypeScript
- Tailwind CSS v4
- qrcode 1.5.4

## 專案結構

```text
barcode_web/
	app/
		globals.css        # 全域樣式與 Tailwind 匯入
		layout.tsx         # Root layout、字體、metadata、hydration 警告抑制
		page.tsx           # 主要功能頁：輸入、驗證、生成、下載
	public/              # 靜態資源
	AGENTS.md            # AI 代理專案指引
	CLAUDE.md            # 引用 AGENTS.md
	eslint.config.mjs    # ESLint 設定
	next.config.ts       # Next 設定（目前為預設）
	package.json         # scripts 與 dependencies
```

## 本機啟動

### 1. 安裝套件

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

開啟 http://localhost:3000

## 使用流程

1. 在輸入框輸入網址，例如 https://example.com
2. 按下「產生 QR Code」
3. 右側預覽區會顯示 QR Code
4. 按下「下載 JPG」取得圖檔

## 驗證與品質

```bash
npm run lint
npm run build
```

## 實作細節

- 網址驗證在前端進行，必須為有效 URL 且 protocol 為 http: 或 https:
- QR Code 參數：
  - errorCorrectionLevel: M
  - width: 320
  - margin: 1
- 下載格式：image/jpeg
- 下載檔名：qrcode-YYYYMMDD-HHmmss.jpg

## 常見問題

### 出現 hydration mismatch 警告

若瀏覽器外掛在頁面載入時注入 HTML 屬性，可能看到 hydration mismatch 訊息。

此專案已在 root layout 設定 suppressHydrationWarning，且功能不受影響。若仍看到訊息，可用無痕視窗或暫時停用外掛確認。

## 參考

- Next.js 官方文件：https://nextjs.org/docs
- 本專案代理指引：AGENTS.md
