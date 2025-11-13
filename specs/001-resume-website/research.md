# Research: 個人履歷網站

**Date**: 2025-11-13  
**Feature**: 001-resume-website

## 概述

本文件記錄在實作個人履歷網站時的技術決策、最佳實踐研究結果，以及關鍵實作細節。

---

## 研究主題 1: Nuxt UI 4.x 元件選擇與使用

### 決策

根據使用者需求，選擇以下 Nuxt UI 元件：

- **UTimeline**: 用於工作經歷區塊，垂直時間軸展示
- **UTree**: 用於技能清單區塊，樹狀結構展示技能分類
- **UCard**: 用於專案經驗區塊，卡片式佈局
- **UPageCard**: 用於教育背景區塊
- **UButton**: 用於導航選單和語言/主題切換按鈕
- **UIcon**: 用於圖示顯示（社群連結、技能圖示等）

### 理由

- Nuxt UI 4.x 提供完整的現代化元件庫，符合 Constitution II (Framework-First Architecture)
- 這些元件原生支援 dark mode 和 Tailwind CSS
- 避免重複造輪子，直接使用框架提供的最佳實踐

### 替代方案考量

- **自行開發元件**: 違反 Constitution II，且增加開發時間和維護成本
- **使用其他 UI 框架**: 需要額外安裝套件，違反 Constitution III (No Self-Dependency Management)

---

## 研究主題 2: 狀態管理與資料結構

### 決策

使用 Pinia stores 管理履歷資料：

```typescript
// stores/resume.ts
export const useResumeStore = defineStore('resume', {
  state: () => ({
    profile: {...},
    experiences: [...],
    skills: {...},
    projects: [...],
    education: [...]
  })
})
```

所有內容以 TypeScript 型別定義，並在 store 中初始化為靜態資料。

### 理由

- Pinia 是 Nuxt 4.x 官方推薦的狀態管理工具，已包含在 package.json
- 將資料集中管理，方便未來擴展（例如從 API 載入）
- 支援 SSG，資料在建置時即確定
- TypeScript 型別安全，減少錯誤

### 替代方案考量

- **直接在元件中定義資料**: 資料分散，難以維護和復用
- **使用 Composition API 的 reactive**: 缺乏 Pinia 提供的 devtools 支援和 SSR 優化

---

## 研究主題 3: i18n 國際化實作

### 決策

使用 @nuxtjs/i18n 10.2.0+ 進行國際化：

```typescript
// nuxt.config.ts (已存在配置)
i18n: {
  defaultLocale: 'zh-tw',
  locales: [
    { code: 'zh-tw', name: '繁體中文' },
    { code: 'en', name: 'English' }
  ]
}
```

語系檔案結構：

```json
// i18n/locales/zh-tw.json
{
  "nav": { "about": "關於", "skills": "技能", ... },
  "profile": { "name": "劉子暐", "title": "資深工程師", ... },
  "experiences": [...],
  "skills": {...},
  "projects": [...],
  "education": [...]
}
```

### 理由

- @nuxtjs/i18n 是 Nuxt 官方推薦，已整合在專案中
- 支援 SSG，可在建置時生成多語言靜態頁面
- 提供 $t() helper 和 useI18n() composable
- 自動偵測瀏覽器語言

### 替代方案考量

- **手動實作切換邏輯**: 功能不完整，缺乏 SEO 優化和 SSG 支援
- **使用其他 i18n 套件**: 需要額外安裝，與 Nuxt 整合度不如官方模組

---

## 研究主題 4: 響應式設計與 Tailwind CSS

### 決策

採用 Mobile-First 設計策略，使用 Tailwind CSS 4.x 的響應式斷點：

- **Mobile** (default): < 640px
- **Tablet** (sm): ≥ 640px
- **Desktop** (lg): ≥ 1024px

關鍵設計：

```vue
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 手機: 單欄, 平板: 雙欄, 桌面: 三欄 -->
</div>
```

### 理由

- Tailwind CSS 4.x 已整合在專案中 (@tailwindcss/vite)
- Mobile-First 符合現代網頁開發趨勢
- Nuxt UI 元件原生支援 Tailwind 響應式工具類別

### 替代方案考量

- **Desktop-First**: 不符合行動裝置優先的產業標準
- **純 CSS Media Queries**: 增加樣式複雜度，失去 Tailwind 的工具類別優勢

---

## 研究主題 5: Dark Mode 實作

### 決策

使用 Nuxt UI 內建的 Color Mode 功能：

```vue
<script setup>
const colorMode = useColorMode()
</script>

<template>
  <UButton @click="colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'">
    <UIcon :name="colorMode.preference === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'" />
  </UButton>
</template>
```

### 理由

- Nuxt UI 4.x 提供 `useColorMode()` composable，原生支援 dark mode
- 自動偵測系統偏好設定 (`prefers-color-scheme`)
- 自動儲存使用者偏好到 localStorage
- 所有 Nuxt UI 元件自動適配 dark mode

### 替代方案考量

- **手動實作 dark mode 切換**: 需要處理 localStorage、class toggle、系統偵測等，增加複雜度
- **使用第三方套件**: 不必要，Nuxt UI 已提供完整功能

---

## 研究主題 6: 圖片處理與靜態資源

### 決策

將所有圖片放置於 `public/assets/images/`：

```
public/
└── assets/
    └── images/
        ├── ProfilePicture.jpg      # 個人頭像
        ├── HCMF_Logo_White.png     # 公司 logo (dark)
        ├── HCMF_Logo_Black.png     # 公司 logo (light)
        └── MUST_LOGO.png           # 學校校徽
```

在元件中使用：

```vue
<img src="/assets/images/ProfilePicture.jpg" alt="Profile Picture" />
```

根據 color mode 切換 logo：

```vue
<img :src="`/assets/images/HCMF_Logo_${colorMode.preference === 'dark' ? 'White' : 'Black'}.png`" />
```

### 理由

- `public/` 目錄的檔案會直接複製到輸出目錄，適合靜態資源
- 支援 SSG 部署，路徑簡單明確
- 不需要額外的圖片處理或優化（履歷網站圖片數量少）

### 替代方案考量

- **使用 `assets/` 目錄**: 需要 Webpack/Vite 處理，增加建置複雜度
- **使用 Nuxt Image**: 需要額外安裝套件，且對靜態 SSG 的價值有限

---

## 研究主題 7: 導航與錨點滾動

### 決策

使用原生 HTML 錨點和 `scrollIntoView()` API：

```vue
<!-- Header 導航 -->
<nav>
  <a href="#about" @click.prevent="scrollTo('about')">關於</a>
  <a href="#skills" @click.prevent="scrollTo('skills')">技能</a>
</nav>

<!-- 各區塊 -->
<section id="about">...</section>
<section id="skills">...</section>

<script setup>
const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>
```

### 理由

- 簡單直接，不需要額外套件
- 原生支援平滑滾動 (`behavior: 'smooth'`)
- 符合 HTML5 標準，SEO 友善
- 支援鍵盤導航和無障礙功能

### 替代方案考量

- **使用 Vue Router hash mode**: 單頁應用不需要路由，過度設計
- **使用第三方滾動套件**: 增加依賴，違反 Constitution III

---

## 研究主題 8: 資料型別定義

### 決策

定義 TypeScript 介面以確保型別安全：

```typescript
// types/resume.ts
export interface Profile {
  name: string
  title: string
  description: string
  avatar: string
  contacts: {
    email: string
    github: string
    linkedin: string
  }
}

export interface Experience {
  company: string
  logo: string
  positions: Array<{
    title: string
    period: { start: string; end: string }
    description: string[]
    technologies: string[]
    achievements?: string[]
  }>
}

export interface Skill {
  category: string
  items: Array<{
    name: string
    icon?: string
  }>
}

export interface Project {
  name: string
  description: string
  period: { start: string; end: string }
  technologies: string[]
  features: string[]
}

export interface Education {
  school: string
  logo: string
  degree: string
  period: { start: string; end: string }
  thesis?: {
    title: string
    link: string
  }
}
```

### 理由

- TypeScript 型別安全，減少執行時錯誤
- 明確的資料結構，方便維護和擴展
- IDE 自動完成和型別檢查
- 符合專案 TypeScript 5.9.3+ 要求

### 替代方案考量

- **不定義型別**: 失去 TypeScript 的優勢，增加錯誤風險
- **使用 Zod 等驗證庫**: 過度設計，靜態資料不需要執行時驗證

---

## 總結

所有技術決策均遵循 Constitution 原則：

- ✅ **Brownfield Preservation**: 不更動既有配置和程式碼
- ✅ **Framework-First**: 優先使用 Nuxt UI 4.x 和官方模組
- ✅ **No Self-Dependency**: 不新增任何套件
- ✅ **Documentation-First**: 需查閱 @nuxt/ui, @nuxtjs/i18n 最新文件
- ✅ **No-Testing**: 不實作測試
- ✅ **Traditional Chinese**: 文件使用繁體中文

實作重點：

1. 使用 Pinia 集中管理履歷資料
2. 使用 Nuxt UI 元件 (UTimeline, UTree, UCard, UPageCard)
3. 使用 @nuxtjs/i18n 實現中英文切換
4. 使用 Tailwind CSS 實現響應式設計
5. 使用 Nuxt UI Color Mode 實現深色模式
6. 簡單直接的實作方式，避免過度設計
