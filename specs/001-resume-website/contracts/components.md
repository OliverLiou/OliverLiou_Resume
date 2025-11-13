# Component Contracts: 個人履歷網站

**Date**: 2025-11-13  
**Feature**: 001-resume-website

## 概述

本文件定義所有 Vue 元件的介面契約，包括 props、emits、slots 和使用範例。

---

## Layout Components

### AppHeader

**用途**: 網站頂部區塊，包含網站標題、導航選單、語言切換和主題切換按鈕

**Props**: 無

**Emits**: 無

**插槽 (Slots)**: 無

**API**:

```typescript
// 無 props，內部使用 composables
interface AppHeader {}
```

**內部邏輯**:

- 使用 `useI18n()` 進行語言切換
- 使用 `useColorMode()` 進行主題切換
- 使用 `scrollTo()` 進行錨點滾動

**範例**:

```vue
<template>
  <AppHeader />
</template>
```

**注意事項**:

- 響應式設計：桌面顯示完整導航，手機顯示漢堡選單
- 固定在頂部 (`sticky top-0 z-50`)
- 深色/淺色模式自動適配

---

### AppFooter

**用途**: 網站底部區塊，包含版權資訊和社群連結

**Props**: 無

**Emits**: 無

**插槽 (Slots)**: 無

**API**:

```typescript
interface AppFooter {}
```

**範例**:

```vue
<template>
  <AppFooter />
</template>
```

**內部邏輯**:

- 使用 `useResumeStore()` 取得聯絡資訊
- 社群連結使用 `UIcon` 元件顯示圖示

**注意事項**:

- 版權年份動態顯示 (`new Date().getFullYear()`)
- 社群連結在新分頁開啟 (`target="_blank" rel="noopener noreferrer"`)

---

## Resume Components

### IntroSection

**用途**: 自我介紹區塊，顯示頭像、姓名、職稱和簡短介紹

**Props**: 無

**Emits**: 無

**插槽 (Slots)**: 無

**API**:

```typescript
interface IntroSection {}
```

**範例**:

```vue
<template>
  <IntroSection />
</template>
```

**內部邏輯**:

- 使用 `useResumeStore()` 取得 `profile` 資料
- 頭像使用 `<img>` 標籤（不使用 avatar）
- 文字內容從 i18n 取得

**樣式**:

```vue
<section id="about" class="py-16">
  <div class="container mx-auto px-4">
    <div class="flex flex-col md:flex-row items-center gap-8">
      <!-- 頭像 -->
      <img class="w-48 h-48 rounded-full object-cover" />
      <!-- 文字內容 -->
      <div class="flex-1">
        <h1 class="text-4xl font-bold">{{ profile.name }}</h1>
        <h2 class="text-2xl text-gray-600 dark:text-gray-400">{{ profile.title }}</h2>
        <p class="mt-4">{{ profile.description }}</p>
      </div>
    </div>
  </div>
</section>
```

---

### ExperienceSection

**用途**: 工作經歷區塊，使用 UTimeline 垂直顯示經歷

**Props**: 無

**Emits**: 無

**插槽 (Slots)**: 無

**API**:

```typescript
interface ExperienceSection {}
```

**範例**:

```vue
<template>
  <ExperienceSection />
</template>
```

**內部邏輯**:

- 使用 `useResumeStore()` 取得 `sortedExperiences` (getter)
- 使用 `UTimeline` 元件顯示時間軸
- 公司 logo 根據 color mode 切換（dark/light）

**UTimeline 結構**:

```typescript
// timeline items
interface TimelineItem {
  icon: string           // 時間軸圖示
  content: Component     // 自訂內容元件
}
```

**樣式**:

```vue
<section id="experience" class="py-16 bg-gray-50 dark:bg-gray-900">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8">{{ $t('sections.experience') }}</h2>
    <UTimeline :items="timelineItems">
      <template #content="{ item }">
        <!-- 公司名稱、logo、職位資訊 -->
      </template>
    </UTimeline>
  </div>
</section>
```

---

### SkillsSection

**用途**: 技能清單區塊，使用 UTree 顯示後端、前端、其他技能

**Props**: 無

**Emits**: 無

**插槽 (Slots)**: 無

**API**:

```typescript
interface SkillsSection {}
```

**範例**:

```vue
<template>
  <SkillsSection />
</template>
```

**內部邏輯**:

- 使用 `useResumeStore()` 取得 `skills` 資料
- 使用三個 `UTree` 元件分別顯示後端、前端、其他技能
- UTree size 設定為 `xl`

**UTree 配置**:

```vue
<UTree :items="backendSkills" size="xl" />
<UTree :items="frontendSkills" size="xl" />
<UTree :items="othersSkills" size="xl" />
```

**樣式**:

```vue
<section id="skills" class="py-16">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8">{{ $t('sections.skills') }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- 後端技能 -->
      <div>
        <h3 class="text-xl font-semibold mb-4">{{ $t('skills.backend') }}</h3>
        <UTree :items="backendSkills" size="xl" />
      </div>
      <!-- 前端技能 -->
      <div>
        <h3 class="text-xl font-semibold mb-4">{{ $t('skills.frontend') }}</h3>
        <UTree :items="frontendSkills" size="xl" />
      </div>
      <!-- 其他技能 -->
      <div>
        <h3 class="text-xl font-semibold mb-4">{{ $t('skills.others') }}</h3>
        <UTree :items="othersSkills" size="xl" />
      </div>
    </div>
  </div>
</section>
```

---

### ProjectsSection

**用途**: 專案經驗區塊，使用 UCard 顯示專案資訊

**Props**: 無

**Emits**: 無

**插槽 (Slots)**: 無

**API**:

```typescript
interface ProjectsSection {}
```

**範例**:

```vue
<template>
  <ProjectsSection />
</template>
```

**內部邏輯**:

- 使用 `useResumeStore()` 取得 `sortedProjects` (getter)
- 使用 `UCard` 元件顯示每個專案

**UCard 結構**:

```vue
<UCard v-for="project in sortedProjects" :key="project.name">
  <template #header>
    <h3>{{ project.name }}</h3>
    <p v-if="project.nameEn" class="text-sm text-gray-500">{{ project.nameEn }}</p>
    <p class="text-sm">{{ project.period.start }} ~ {{ project.period.end }}</p>
  </template>
  
  <p>{{ project.description }}</p>
  
  <div class="mt-4">
    <h4 class="font-semibold">{{ $t('project.technologies') }}</h4>
    <div class="flex flex-wrap gap-2 mt-2">
      <span v-for="tech in project.technologies" class="badge">{{ tech }}</span>
    </div>
  </div>
  
  <div class="mt-4">
    <h4 class="font-semibold">{{ $t('project.features') }}</h4>
    <ul class="list-disc list-inside mt-2">
      <li v-for="feature in project.features">{{ feature }}</li>
    </ul>
  </div>
</UCard>
```

**樣式**:

```vue
<section id="projects" class="py-16 bg-gray-50 dark:bg-gray-900">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8">{{ $t('sections.projects') }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- UCard for each project -->
    </div>
  </div>
</section>
```

---

### EducationSection

**用途**: 教育背景區塊，使用 UPageCard 顯示教育資訊

**Props**: 無

**Emits**: 無

**插槽 (Slots)**: 無

**API**:

```typescript
interface EducationSection {}
```

**範例**:

```vue
<template>
  <EducationSection />
</template>
```

**內部邏輯**:

- 使用 `useResumeStore()` 取得 `sortedEducation` (getter)
- 使用 `UPageCard` 元件顯示每個學歷

**UPageCard 結構**:

```vue
<UPageCard v-for="edu in sortedEducation" :key="edu.school">
  <template #header>
    <div class="flex items-center gap-4">
      <img :src="edu.logo" class="w-16 h-16" />
      <div>
        <h3 class="text-xl font-bold">{{ edu.school }}</h3>
        <p class="text-gray-600 dark:text-gray-400">{{ edu.degree }}</p>
        <p class="text-sm">{{ edu.period.start }} ~ {{ edu.period.end }}</p>
      </div>
    </div>
  </template>
  
  <div v-if="edu.thesis">
    <h4 class="font-semibold">{{ $t('education.thesis') }}</h4>
    <p>{{ edu.thesis.title }}</p>
    <a :href="edu.thesis.link" target="_blank" class="text-blue-600 hover:underline">
      {{ $t('education.viewThesis') }}
    </a>
  </div>
</UPageCard>
```

**樣式**:

```vue
<section id="education" class="py-16">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8">{{ $t('sections.education') }}</h2>
    <div class="space-y-6">
      <!-- UPageCard for each education -->
    </div>
  </div>
</section>
```

---

## Page Structure

### index.vue

**用途**: 主頁面，組合所有區塊元件

**結構**:

```vue
<template>
  <div>
    <!-- Layout -->
    <AppHeader />
    
    <main>
      <!-- Resume Sections -->
      <IntroSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// 初始化 store 資料
const resumeStore = useResumeStore()
resumeStore.initialize()
</script>
```

---

## Composables

### useScrollTo

**用途**: 平滑滾動到指定錨點

**API**:

```typescript
function useScrollTo() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  return { scrollTo }
}
```

**使用範例**:

```vue
<script setup>
const { scrollTo } = useScrollTo()
</script>

<template>
  <a @click.prevent="scrollTo('about')">關於</a>
</template>
```

---

## 總結

- 所有元件均為無 props 設計，直接從 store 取得資料
- 使用 Nuxt UI 元件 (UTimeline, UTree, UCard, UPageCard)
- 響應式設計使用 Tailwind CSS 工具類別
- 深色模式自動適配
- 語言切換使用 i18n
