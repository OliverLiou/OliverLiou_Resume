# Data Model: 個人履歷網站

**Date**: 2025-11-13  
**Feature**: 001-resume-website

## 概述

本文件定義個人履歷網站的資料結構，包括實體定義、關聯關係、驗證規則和狀態管理。

---

## 實體定義

### 1. Profile (個人資料)

**用途**: 儲存個人基本資訊和聯絡方式

**欄位**:

| 欄位名稱 | 型別 | 必填 | 說明 |
|---------|------|------|------|
| name | string | ✅ | 姓名 |
| title | string | ✅ | 職稱 |
| description | string | ✅ | 簡短自我介紹 |
| avatar | string | ✅ | 頭像圖片路徑 |
| contacts | Contacts | ✅ | 聯絡方式物件 |

**Contacts 子物件**:

| 欄位名稱 | 型別 | 必填 | 說明 |
|---------|------|------|------|
| email | string | ✅ | Email 地址 |
| github | string | ✅ | GitHub URL |
| linkedin | string | ✅ | LinkedIn URL |

**TypeScript 定義**:

```typescript
interface Profile {
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
```

**驗證規則**:

- name: 非空字串，長度 2-50 字元
- title: 非空字串，長度 2-100 字元
- description: 非空字串，長度 10-500 字元
- avatar: 有效的圖片路徑
- email: 有效的 email 格式
- github, linkedin: 有效的 URL 格式

---

### 2. Experience (工作經歷)

**用途**: 儲存工作經歷資訊

**欄位**:

| 欄位名稱 | 型別 | 必填 | 說明 |
|---------|------|------|------|
| company | string | ✅ | 公司名稱 |
| logo | string | ✅ | 公司 logo 路徑 |
| positions | Position[] | ✅ | 職位陣列（支援同公司多職位） |

**Position 子物件**:

| 欄位名稱 | 型別 | 必填 | 說明 |
|---------|------|------|------|
| title | string | ✅ | 職位名稱 |
| period | Period | ✅ | 任職期間 |
| description | string[] | ✅ | 工作描述列表 |
| technologies | string[] | ✅ | 使用技術列表 |
| achievements | string[] | ❌ | 成就列表（選填） |

**Period 子物件**:

| 欄位名稱 | 型別 | 必填 | 說明 |
|---------|------|------|------|
| start | string | ✅ | 開始時間 (YYYY 或 YYYY-MM 格式) |
| end | string | ✅ | 結束時間 (YYYY 或 YYYY-MM 或 "至今") |

**TypeScript 定義**:

```typescript
interface Experience {
  company: string
  logo: string
  positions: Array<{
    title: string
    period: {
      start: string
      end: string
    }
    description: string[]
    technologies: string[]
    achievements?: string[]
  }>
}
```

**驗證規則**:

- company: 非空字串
- logo: 有效的圖片路徑
- positions: 至少包含一個職位
- period.start/end: 符合 YYYY 或 YYYY-MM 格式，或 "至今"
- description: 至少包含一項描述

**排序規則**: 按 `positions[0].period.start` 倒序排列（最新在前）

---

### 3. Skill (技能)

**用途**: 儲存技能資訊，分為後端、前端、其他技能

**欄位**:

| 欄位名稱 | 型別 | 必填 | 說明 |
|---------|------|------|------|
| backend | SkillItem[] | ✅ | 後端技能列表 |
| frontend | SkillItem[] | ✅ | 前端技能列表 |
| others | SkillItem[] | ✅ | 其他技能列表 |

**SkillItem 子物件**:

| 欄位名稱 | 型別 | 必填 | 說明 |
|---------|------|------|------|
| name | string | ✅ | 技能名稱 |
| icon | string | ❌ | 圖示名稱（選填，預設空值） |
| children | SkillItem[] | ❌ | 子技能（支援巢狀結構） |

**TypeScript 定義**:

```typescript
interface SkillItem {
  name: string
  icon?: string
  children?: SkillItem[]
}

interface Skills {
  backend: SkillItem[]
  frontend: SkillItem[]
  others: SkillItem[]
}
```

**驗證規則**:

- name: 非空字串
- icon: 有效的 Icon 名稱或空值

**範例結構**:

```typescript
{
  backend: [
    { name: 'C#', icon: '' },
    { name: 'Asp.Net Core', icon: '' }
  ],
  frontend: [
    { name: 'Vue.js', icon: '' },
    { name: 'Nuxt.js', icon: '' }
  ],
  others: [
    { 
      name: 'AI Coding', 
      icon: '',
      children: [
        { name: 'GitHub Copilot', icon: '' },
        { name: 'Claude Code', icon: '' }
      ]
    }
  ]
}
```

---

### 4. Project (專案經驗)

**用途**: 儲存專案經驗資訊

**欄位**:

| 欄位名稱 | 型別 | 必填 | 說明 |
|---------|------|------|------|
| name | string | ✅ | 專案名稱 |
| nameEn | string | ❌ | 專案英文名稱（選填） |
| description | string | ✅ | 專案描述 |
| period | Period | ✅ | 開發期間 |
| technologies | string[] | ✅ | 使用技術列表 |
| features | string[] | ✅ | 功能描述列表 |

**TypeScript 定義**:

```typescript
interface Project {
  name: string
  nameEn?: string
  description: string
  period: {
    start: string
    end: string
  }
  technologies: string[]
  features: string[]
}
```

**驗證規則**:

- name: 非空字串
- description: 非空字串，長度 10-500 字元
- period: 符合 YYYY-MM 格式或 "持續更新中"
- technologies: 至少包含一項技術
- features: 至少包含一項功能

**排序規則**: 按 `period.start` 倒序排列（最新在前）

---

### 5. Education (教育背景)

**用途**: 儲存教育背景資訊

**欄位**:

| 欄位名稱 | 型別 | 必填 | 說明 |
|---------|------|------|------|
| school | string | ✅ | 學校名稱 |
| logo | string | ✅ | 學校校徽路徑 |
| degree | string | ✅ | 學位 |
| period | Period | ✅ | 就讀期間 |
| thesis | Thesis | ❌ | 論文資訊（選填） |

**Thesis 子物件**:

| 欄位名稱 | 型別 | 必填 | 說明 |
|---------|------|------|------|
| title | string | ✅ | 論文標題 |
| link | string | ✅ | 論文連結 URL |

**TypeScript 定義**:

```typescript
interface Education {
  school: string
  logo: string
  degree: string
  period: {
    start: string
    end: string
  }
  thesis?: {
    title: string
    link: string
  }
}
```

**驗證規則**:

- school: 非空字串
- logo: 有效的圖片路徑
- degree: 非空字串
- period: 符合 YYYYMM 格式
- thesis.link: 有效的 URL 格式

**排序規則**: 按 `period.start` 倒序排列（最新在前）

---

## 關聯關係

本專案為靜態資料，無資料庫關聯。所有實體獨立儲存在 Pinia store 中。

```
ResumeStore
├── profile: Profile
├── experiences: Experience[]
├── skills: Skills
├── projects: Project[]
└── education: Education[]
```

---

## 狀態管理 (Pinia Store)

### Store 結構

```typescript
// stores/resume.ts
import { defineStore } from 'pinia'
import type { Profile, Experience, Skills, Project, Education } from '~/types/resume'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    profile: null as Profile | null,
    experiences: [] as Experience[],
    skills: null as Skills | null,
    projects: [] as Project[],
    education: [] as Education[]
  }),

  getters: {
    // 取得排序後的工作經歷（最新在前）
    sortedExperiences: (state) => {
      return [...state.experiences].sort((a, b) => {
        const startA = a.positions[0].period.start
        const startB = b.positions[0].period.start
        return startB.localeCompare(startA)
      })
    },

    // 取得排序後的專案經驗（最新在前）
    sortedProjects: (state) => {
      return [...state.projects].sort((a, b) => {
        return b.period.start.localeCompare(a.period.start)
      })
    },

    // 取得排序後的教育背景（最新在前）
    sortedEducation: (state) => {
      return [...state.education].sort((a, b) => {
        return b.period.start.localeCompare(a.period.start)
      })
    }
  },

  actions: {
    // 初始化資料（從靜態資料或未來的 API）
    initialize() {
      // 在此處初始化所有資料
    }
  }
})
```

### 狀態轉換

由於是靜態履歷網站，無狀態轉換需求。資料在建置時確定，運行時為唯讀。

---

## 資料來源映射

以下為現有 markdown 文件到資料模型的映射關係：

| Markdown 文件 | 對應實體 | 說明 |
|--------------|---------|------|
| N/A | Profile | 需根據使用者資訊手動建立 |
| experience.md | Experience[] | 解析公司、職位、期間資訊 |
| skills.md | Skills | 解析後端、前端、其他技能 |
| project.md | Project[] | 解析專案名稱、描述、技術、功能 |
| education.md | Education[] | 解析學校、學位、期間、論文 |

---

## 範例資料

### Profile 範例

```typescript
{
  name: '劉子暐',
  title: '資深工程師',
  description: '熱愛學習新技術的全端工程師，專注於 .NET 和 Vue.js 生態系統。',
  avatar: '/assets/images/ProfilePicture.jpg',
  contacts: {
    email: 'oliver@example.com',
    github: 'https://github.com/OliverLiou',
    linkedin: 'https://linkedin.com/in/oliverliou'
  }
}
```

### Experience 範例

```typescript
{
  company: '信昌機械股份有限公司',
  logo: '/assets/images/HCMF_Logo_Black.png',
  positions: [
    {
      title: '資深工程師',
      period: { start: '2025', end: '至今' },
      description: [
        '持續開發與維運專案',
        '協助團隊成員解決技術問題',
        '優化使用者體驗'
      ],
      technologies: ['.Net Core 8', 'MSSQL', 'Nuxt3', 'Azure DevOps'],
      achievements: [
        '建立前端、後端的開發模板，有效縮短開發時間',
        '建立Log機制，後端加入異動紀錄追蹤(Entity Tracking)'
      ]
    },
    {
      title: '工程師',
      period: { start: '2021', end: '2024' },
      description: [
        '瞭解使用者手工作業流程，並將流程與功能系統化',
        '學習新技術並應用於專案開發'
      ],
      technologies: ['.Net Core 5', 'MSSQL', 'Nuxt2'],
      achievements: [
        '多個客製系統正式上線',
        '自動化佈署各個系統',
        '需求訪談到系統實作，可獨立完成'
      ]
    }
  ]
}
```

### Skills 範例

```typescript
{
  backend: [
    { name: 'C#', icon: '' },
    { name: 'Asp.Net Core', icon: '' },
    { name: 'Microsoft SQL Server', icon: '' },
    { name: 'Entity Framework Core', icon: '' },
    { name: 'RESTful API (swagger)', icon: '' },
    { name: 'JWT Authentication', icon: '' }
  ],
  frontend: [
    { name: 'Vue.js', icon: '' },
    { name: 'Nuxt.js', icon: '' },
    { name: 'TypeScript', icon: '' },
    { name: 'Tailwind CSS', icon: '' },
    { name: 'HTML5', icon: '' }
  ],
  others: [
    { name: 'Git 操作', icon: '' },
    { name: 'Azure DevOps', icon: '' },
    { name: 'Azure CI/CD', icon: '' },
    { 
      name: 'AI Coding',
      icon: '',
      children: [
        { name: 'GitHub Copilot', icon: '' },
        { name: 'GitHub Spec-Kit', icon: '' },
        { name: 'Claude Code', icon: '' }
      ]
    },
    { name: 'Railway 部署', icon: '' }
  ]
}
```

### Project 範例

```typescript
{
  name: '快速報價系統',
  nameEn: 'Quickly Price Quotation Program',
  description: '根據Bom上的物料清單, 自動至ERP系統蒐集相關成本, 並根據公式計算成本, 最終生成公司的標準成本分析表。',
  period: { start: '2024-12', end: '2025-03' },
  technologies: ['.Net 8', 'Nuxt 3'],
  features: [
    'Bom物料清單上傳',
    '跨系統與Oracle EBS系統進行資料整合',
    '根據預設公式計算成本',
    '生成標準成本分析表'
  ]
}
```

### Education 範例

```typescript
{
  school: '明新科技大學',
  logo: '/assets/images/MUST_LOGO.png',
  degree: '資訊管理系碩士班',
  period: { start: '201509', end: '201706' },
  thesis: {
    title: '五回合自適應偵測診斷於超立方體',
    link: 'https://hdl.handle.net/11296/st8q2q'
  }
}
```

---

## 總結

- 所有資料結構使用 TypeScript 介面定義，確保型別安全
- 使用 Pinia store 集中管理，支援 SSG
- 資料結構簡單直接，避免過度設計
- 支援未來擴展為動態內容（從 API 載入）
- 排序邏輯封裝在 store getters 中
