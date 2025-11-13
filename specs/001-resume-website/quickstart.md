# Quick Start: 個人履歷網站

**Date**: 2025-11-13  
**Feature**: 001-resume-website

## 概述

本文件提供開發人員快速啟動專案的指南，包括環境設定、開發流程和部署步驟。

---

## 前置需求

- Node.js 18.x 或更高版本
- pnpm 或 npm
- Git

---

## 專案結構

```
OliverLiou_Resume/
├── app/
│   ├── pages/
│   │   └── index.vue              # 主頁面
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.vue      # Header 區塊
│   │   │   └── AppFooter.vue      # Footer 區塊
│   │   └── resume/
│   │       ├── IntroSection.vue   # 自我介紹
│   │       ├── ExperienceSection.vue  # 工作經歷
│   │       ├── SkillsSection.vue  # 技能清單
│   │       ├── ProjectsSection.vue    # 專案經驗
│   │       └── EducationSection.vue   # 教育背景
│   ├── stores/
│   │   └── resume.ts              # Pinia store
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css
│   │   └── images/
│   │       └── ProfilePicture.jpg
│   └── app.vue
├── i18n/
│   └── locales/
│       ├── zh-tw.json             # 繁體中文
│       └── en.json                # 英文
├── public/
│   └── assets/
│       └── images/
│           ├── HCMF_Logo_White.png
│           ├── HCMF_Logo_Black.png
│           └── MUST_LOGO.png
├── nuxt.config.ts
└── package.json
```

---

## 開發流程

### 1. 安裝依賴

```bash
# 已有 package.json，直接安裝
pnpm install
```

### 2. 啟動開發伺服器

```bash
pnpm dev
```

開發伺服器將在 `http://localhost:3000` 啟動。

### 3. 開發步驟

#### 步驟 1: 建立型別定義

在 `app/types/resume.ts` 建立型別定義（參考 `specs/001-resume-website/contracts/types.ts`）。

#### 步驟 2: 建立 Pinia Store

在 `app/stores/resume.ts` 建立 store 並初始化履歷資料：

```typescript
import { defineStore } from 'pinia'
import type { Profile, Experience, Skills, Project, Education } from '~/types/resume'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    profile: {
      name: '劉子暐',
      title: '資深工程師',
      // ... 其他資料
    } as Profile,
    experiences: [...] as Experience[],
    skills: {...} as Skills,
    projects: [...] as Project[],
    education: [...] as Education[]
  }),

  getters: {
    sortedExperiences: (state) => {
      return [...state.experiences].sort((a, b) => 
        b.positions[0].period.start.localeCompare(a.positions[0].period.start)
      )
    },
    sortedProjects: (state) => {
      return [...state.projects].sort((a, b) => 
        b.period.start.localeCompare(a.period.start)
      )
    },
    sortedEducation: (state) => {
      return [...state.education].sort((a, b) => 
        b.period.start.localeCompare(a.period.start)
      )
    }
  }
})
```

#### 步驟 3: 建立語系檔

在 `i18n/locales/zh-tw.json` 和 `en.json` 建立語系內容：

```json
// zh-tw.json
{
  "nav": {
    "about": "關於",
    "skills": "技能",
    "experience": "經歷",
    "projects": "專案",
    "education": "教育"
  },
  "sections": {
    "about": "關於我",
    "skills": "技能清單",
    "experience": "工作經歷",
    "projects": "專案經驗",
    "education": "教育背景"
  },
  // ... 更多內容
}
```

#### 步驟 4: 建立 Layout 元件

1. **AppHeader.vue**: 包含導航、語言切換、主題切換
   - 使用 `useI18n()` 和 `useColorMode()`
   - 響應式設計（桌面/手機）

2. **AppFooter.vue**: 包含版權和社群連結
   - 使用 `UIcon` 顯示圖示

#### 步驟 5: 建立 Resume 元件

1. **IntroSection.vue**: 自我介紹
   - 使用 `<img>` 標籤顯示頭像
   - 從 store 取得 profile 資料

2. **ExperienceSection.vue**: 工作經歷
   - 使用 `UTimeline` 元件（垂直）
   - 從 store 取得 sortedExperiences

3. **SkillsSection.vue**: 技能清單
   - 使用三個 `UTree` 元件 (size="xl")
   - 分別顯示後端、前端、其他技能

4. **ProjectsSection.vue**: 專案經驗
   - 使用 `UCard` 元件
   - 從 store 取得 sortedProjects

5. **EducationSection.vue**: 教育背景
   - 使用 `UPageCard` 元件
   - 從 store 取得 sortedEducation

#### 步驟 6: 組合主頁面

在 `app/pages/index.vue` 組合所有元件：

```vue
<template>
  <div>
    <AppHeader />
    <main>
      <IntroSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
    </main>
    <AppFooter />
  </div>
</template>
```

---

## 樣式設計

### Tailwind CSS 配置

專案已配置 Tailwind CSS 4.x，可直接使用工具類別。

### 響應式斷點

- **Mobile**: < 640px (預設)
- **Tablet**: ≥ 640px (sm:)
- **Desktop**: ≥ 1024px (lg:)

### Dark Mode

使用 Nuxt UI 的 `useColorMode()` composable：

```vue
<script setup>
const colorMode = useColorMode()
</script>

<template>
  <!-- 根據 color mode 切換圖片 -->
  <img :src="`/assets/images/logo_${colorMode.preference === 'dark' ? 'white' : 'black'}.png`" />
</template>
```

---

## 資料來源

履歷資料來源於以下 markdown 文件：

- **個人資料**: 需手動建立
- **工作經歷**: `.specify/sdd-docs/experience.md`
- **技能清單**: `.specify/sdd-docs/skills.md`
- **專案經驗**: `.specify/sdd-docs/project.md`
- **教育背景**: `.specify/sdd-docs/education.md`

將這些資料轉換為 TypeScript 格式，並初始化在 `stores/resume.ts` 中。

---

## 建置與部署

### 本地預覽

```bash
# 建置靜態網站
pnpm generate

# 預覽建置結果
pnpm preview
```

建置結果將輸出到 `.output/public/` 目錄。

### 部署至 GitHub Pages

1. 確認 `nuxt.config.ts` 已設定 `ssr: false` (如需 SSG)
2. 執行建置：

```bash
pnpm generate
```

3. 將 `.output/public/` 內容推送至 GitHub Pages 分支

---

## 開發注意事項

### 1. Constitution 原則

- ✅ **不要更動既有檔案**: `nuxt.config.ts`, `app.vue`, `main.css` 等
- ✅ **使用 Nuxt UI 元件**: 優先使用框架提供的元件
- ✅ **不要新增套件**: 所有依賴已包含在 package.json
- ✅ **查閱文件**: 使用 Context7 查閱 @nuxt/ui, @nuxtjs/i18n 最新文件
- ✅ **繁體中文註解**: 所有註解和文件使用繁體中文

### 2. Nuxt UI 元件參考

查閱 Nuxt UI 4.x 文件：

```typescript
// UTimeline - 時間軸
<UTimeline :items="items" />

// UTree - 樹狀結構
<UTree :items="nodes" size="xl" />

// UCard - 卡片
<UCard>
  <template #header>...</template>
  ...
</UCard>

// UPageCard - 頁面卡片
<UPageCard>
  <template #header>...</template>
  ...
</UPageCard>

// UButton - 按鈕
<UButton @click="...">...</UButton>

// UIcon - 圖示
<UIcon name="i-heroicons-star" />
```

### 3. i18n 使用

```vue
<script setup>
const { t, locale } = useI18n()
</script>

<template>
  <!-- 模板中使用 $t -->
  <h2>{{ $t('sections.about') }}</h2>
  
  <!-- 切換語言 -->
  <button @click="locale = 'en'">English</button>
  <button @click="locale = 'zh-tw'">繁體中文</button>
</template>
```

### 4. 錨點滾動

```typescript
const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start' 
  })
}
```

---

## 除錯技巧

### 1. Nuxt DevTools

開發伺服器啟動後，可使用 Nuxt DevTools：

- 按 `Shift + Alt + D` 開啟
- 查看 Pinia store 狀態
- 查看 i18n 語系

### 2. Vue DevTools

安裝 Vue DevTools 瀏覽器擴充功能，可查看：

- 元件樹狀結構
- Props 和 State
- Events

### 3. 常見問題

**Q: UTimeline 不顯示？**
- 檢查 items 格式是否正確
- 確認已正確 import UTimeline

**Q: Dark mode 不生效？**
- 檢查是否使用 `useColorMode()`
- 確認 Tailwind dark: 工具類別

**Q: i18n 語系不切換？**
- 檢查 nuxt.config.ts 中 i18n 配置
- 確認語系檔案路徑正確

---

## 參考資料

- [Nuxt 4.x 文件](https://nuxt.com/)
- [Nuxt UI 4.x 文件](https://ui.nuxt.com/)
- [@nuxtjs/i18n 文件](https://i18n.nuxtjs.org/)
- [Tailwind CSS 文件](https://tailwindcss.com/)
- [Pinia 文件](https://pinia.vuejs.org/)

---

## 總結

1. 安裝依賴 → 啟動開發伺服器
2. 建立型別 → 建立 Store → 建立語系
3. 依序建立 Layout 和 Resume 元件
4. 組合主頁面
5. 建置並部署

遵循 Constitution 原則，使用 Nuxt UI 元件，保持簡單設計。
