# Tasks: 個人履歷網站

**Branch**: `001-resume-website`  
**Input**: Design documents from `/specs/001-resume-website/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: 根據 Constitution V (No-Testing Policy)，本專案不實作任何測試

**Organization**: 任務按 User Story 組織，以支援獨立實作和驗證

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可平行執行（不同檔案，無相依性）
- **[Story]**: 所屬 User Story（例如 US1, US2, US3）
- 包含確切的檔案路徑

---

## Phase 1: Setup (專案初始化)

**目的**: 建立專案基礎結構和型別定義

- [x] T001 在 `app/types/resume.ts` 建立所有 TypeScript 介面定義（Profile, Experience, Skills, Project, Education）
- [x] T002 [P] 驗證靜態資源：確認頭像圖片已存在於 `app/assets/images/ProfilePicture.jpg`
- [x] T003 [P] 驗證靜態資源：確認公司 logo 已存在於 `app/assets/images/HCMF_Logo_White.png` 和 `HCMF_Logo_Black.png`
- [x] T004 [P] 驗證靜態資源：確認學校校徽已存在於 `app/assets/images/MUST_LOGO.png`

---

## Phase 2: Foundational (基礎建設)

**目的**: 建立必須先完成的核心基礎設施

**⚠️ CRITICAL**: 所有 User Story 工作必須在此階段完成後才能開始

- [x] T005 在 `app/stores/resume.ts` 建立 Pinia store，定義 state 結構（profile, experiences, skills, projects, education）
- [x] T006 在 `app/stores/resume.ts` 實作 getters（sortedExperiences, sortedProjects, sortedEducation）
- [x] T007 在 `app/stores/resume.ts` 根據 `.specify/sdd-docs/` 中的 markdown 文件初始化所有履歷資料
- [x] T008 [P] 在 `i18n/locales/zh-tw.json` 建立繁體中文語系檔，包含所有介面文字和履歷內容
- [x] T009 [P] 在 `i18n/locales/en.json` 建立英文語系檔，包含所有介面文字和履歷內容

**Checkpoint**: 基礎設施完成 - User Story 實作現在可以並行開始

---

## Phase 3: User Story 1 - 瀏覽基本履歷資訊 (Priority: P1) 🎯 MVP

**Goal**: 訪客能夠快速瀏覽個人基本資訊，包括自我介紹、聯絡方式和技能

**Independent Test**: 訪問網站首頁，能看到 Header、自我介紹區塊（含照片、姓名、職稱、簡介）、技能清單區塊和 Footer，並能透過導航選單快速跳轉到不同區塊

### Layout Components

- [x] T010 [P] [US1] 在 `app/components/layout/AppHeader.vue` 建立 Header 元件，包含網站標題、導航選單、語言切換和主題切換按鈕
- [x] T011 [P] [US1] 在 `app/components/layout/AppFooter.vue` 建立 Footer 元件，包含版權資訊和社群連結（Email、GitHub、LinkedIn）
- [x] T012 [US1] 在 `app/components/layout/AppHeader.vue` 實作錨點平滑滾動功能（scrollTo）
- [x] T013 [US1] 在 `app/components/layout/AppHeader.vue` 實作響應式漢堡選單（手機版）

### Resume Sections for US1

- [x] T014 [P] [US1] 在 `app/components/resume/IntroSection.vue` 建立自我介紹區塊，顯示頭像（使用 img 標籤）、姓名、職稱和簡介
- [x] T015 [P] [US1] 在 `app/components/resume/SkillsSection.vue` 建立技能清單區塊，使用三個 UTree 元件分別顯示後端、前端、其他技能（size="xl"）

### Page Integration

- [x] T016 [US1] 在 `app/pages/index.vue` 整合 AppHeader、IntroSection、SkillsSection 和 AppFooter 元件
- [x] T017 [US1] 在 `app/pages/index.vue` 加入區塊錨點 id（about, skills）以支援導航跳轉

### Styling & Responsiveness (US1 Focus)

- [x] T018 [US1] 為 AppHeader 實作響應式樣式（桌面完整導航 vs 手機漢堡選單）
- [x] T019 [US1] 為 IntroSection 實作響應式樣式（mobile: 單欄，desktop: 左右排列）
- [x] T020 [US1] 為 SkillsSection 實作響應式樣式（mobile: 單欄，tablet: 雙欄，desktop: 三欄）

**Checkpoint**: User Story 1 完成 - 基本履歷資訊可完整瀏覽，導航、語言切換、主題切換功能正常運作

---

## Phase 4: User Story 4 - 響應式瀏覽體驗 (Priority: P1)

**Goal**: 訪客使用不同裝置（手機、平板、桌面）都能獲得良好體驗

**Independent Test**: 分別用手機和桌面瀏覽器訪問網站，檢查排版和互動是否正常

**Note**: 此 User Story 的大部分工作已在 Phase 3 中完成，此階段僅處理跨元件的響應式優化

- [x] T021 [US4] 驗證並優化所有現有元件的響應式斷點（確保 mobile < 640px, tablet ≥ 640px, desktop ≥ 1024px）
- [x] T022 [US4] 在 `app/assets/css/main.css` 加入全域響應式樣式（container、spacing、typography）
- [x] T023 [US4] 測試並修正手機漢堡選單的展開/收合行為（點擊導航項目後自動收合）

**Checkpoint**: User Story 4 完成 - 響應式設計在所有裝置上驗證通過

---

## Phase 5: User Story 2 - 查看詳細工作經歷與專案經驗 (Priority: P2)

**Goal**: 訪客能深入了解工作經歷和專案經驗

**Independent Test**: 滾動到工作經歷區塊，能清楚看到每段經歷；滾動到專案經驗區塊，能看到專案詳情

### Implementation

- [x] T024 [P] [US2] 在 `app/components/resume/ExperienceSection.vue` 建立工作經歷區塊，使用 UTimeline 垂直顯示經歷
- [x] T025 [P] [US2] 在 `app/components/resume/ProjectsSection.vue` 建立專案經驗區塊，使用 UCard 顯示專案資訊
- [x] T026 [US2] 在 ExperienceSection.vue 實作公司 logo 根據 color mode 切換（dark: white, light: black）
- [x] T027 [US2] 在 ExperienceSection.vue 將經歷時間軸項目轉換為 UTimeline 所需格式（icon, content）
- [x] T028 [US2] 在 ProjectsSection.vue 實作技術標籤和功能列表的顯示

### Page Integration

- [x] T029 [US2] 在 `app/pages/index.vue` 加入 ExperienceSection 和 ProjectsSection 元件
- [x] T030 [US2] 在 `app/pages/index.vue` 加入區塊錨點 id（experience, projects）
- [x] T031 [US2] 在 AppHeader 導航選單加入「經歷」和「專案」連結

### Styling

- [x] T032 [US2] 為 ExperienceSection 實作響應式樣式和深色模式樣式
- [x] T033 [US2] 為 ProjectsSection 實作響應式樣式（mobile: 單欄，desktop: 雙欄）和深色模式樣式

**Checkpoint**: User Story 2 完成 - 工作經歷和專案經驗可完整瀏覽，按時間倒序排列正確

---

## Phase 6: User Story 5 - 切換深色模式與語言 (Priority: P2)

**Goal**: 訪客可根據偏好切換深色/淺色模式和中英文語言

**Independent Test**: 在網站上找到主題切換按鈕和語言切換按鈕，點擊後檢查視覺和文字是否正確切換

**Note**: 大部分功能已在 Phase 3 的 AppHeader 中實作，此階段處理進階功能

- [x] T034 [US5] 在 AppHeader.vue 實作系統偏好偵測（首次訪問時根據 prefers-color-scheme 自動套用主題）
- [x] T035 [US5] 在 AppHeader.vue 實作偏好設定持久化（使用 localStorage 儲存主題和語言偏好）
- [x] T036 [US5] 驗證所有元件在深色模式下的顯示效果（確保使用 Nuxt UI 的 dark: 工具類別）
- [x] T037 [US5] 驗證所有語系文字的完整性（確保所有介面文字和履歷內容都有中英文版本）

**Checkpoint**: User Story 5 完成 - 主題和語言切換功能完整，偏好設定可持久保存

---

## Phase 7: User Story 3 - 查看教育背景 (Priority: P3)

**Goal**: 訪客能了解教育背景

**Independent Test**: 滾動到教育背景區塊，能看到學校名稱、學位和就讀時間

### Implementation

- [x] T038 [US3] 在 `app/components/resume/EducationSection.vue` 建立教育背景區塊，使用 UPageCard 顯示學歷資訊
- [x] T039 [US3] 在 EducationSection.vue 實作論文連結顯示（如果有 thesis 資料）

### Page Integration

- [x] T040 [US3] 在 `app/pages/index.vue` 加入 EducationSection 元件
- [x] T041 [US3] 在 `app/pages/index.vue` 加入區塊錨點 id（education）
- [x] T042 [US3] 在 AppHeader 導航選單加入「教育」連結

### Styling

- [x] T043 [US3] 為 EducationSection 實作響應式樣式和深色模式樣式

**Checkpoint**: User Story 3 完成 - 教育背景可完整瀏覽，按時間倒序排列正確

---

## Phase 8: Polish & Cross-Cutting Concerns

**目的**: 完善整體使用者體驗和非功能性需求

### Edge Cases Handling

- [x] T044 處理圖片載入失敗的情況（加入 alt 文字和錯誤處理）
- [x] T045 處理空資料欄位的情況（優雅隱藏空欄位，避免顯示空白）
- [x] T046 確保極小螢幕不出現橫向滾動條（檢查所有固定寬度元素）

### Performance & Accessibility

- [x] T047 [P] 在 `nuxt.config.ts` 加入 SEO meta tags（title, description, Open Graph）
- [x] T048 [P] 確保所有互動元素有適當的 ARIA 標籤（鍵盤導航、螢幕閱讀器支援）
- [x] T049 [P] 在 `public/sitemap.xml` 建立 sitemap 檔案

### Final Verification

- [x] T051 在 `app/app.vue` 中整合全域布局結構（確保 Header/Footer 正確顯示）
- [x] T052 執行 `npm run generate` 驗證 SSG 建置成功
- [x] T053 執行 `npm run preview` 驗證建置結果可正常瀏覽
- [ ] T054 驗證所有 User Story 的 Acceptance Scenarios（手動測試檢查清單）

**Checkpoint**: Polish 階段完成 - 網站已完整實作，可進行最終部署

---

## Dependencies & Execution Order

### Critical Path

```
Phase 1 (Setup)
  ↓
Phase 2 (Foundational) ← MUST完成後才能開始任何 User Story
  ↓
Phase 3 (US1 - P1) ← MVP - 最高優先級
  ↓
Phase 4 (US4 - P1) ← 依賴 Phase 3 的元件
  ↓
Phase 5 (US2 - P2) ← 可獨立實作
  ↓
Phase 6 (US5 - P2) ← 可獨立實作
  ↓
Phase 7 (US3 - P3) ← 可獨立實作
  ↓
Phase 8 (Polish)
```

### User Story Independence

- **US1**: 必須最先完成（MVP）
- **US4**: 依賴 US1 的元件，但主要是驗證和優化
- **US2, US5, US3**: 在 US1 完成後可獨立並行實作
- **Phase 8**: 必須在所有 User Story 完成後進行

---

## Parallel Execution Opportunities

### Phase 1 (Setup)
- T002, T003, T004 可並行（準備不同的靜態資源）

### Phase 2 (Foundational)
- T008, T009 可並行（建立語系檔）

### Phase 3 (US1)
- T010, T011 可並行（Layout 元件）
- T014, T015 可並行（Resume 元件）

### Phase 5 (US2)
- T024, T025 可並行（Experience 和 Projects 元件）

### Phase 8 (Polish)
- T047, T048, T049 可並行（SEO、Accessibility、Sitemap）

---

## Implementation Strategy

### MVP Scope (Minimum Viable Product)

**建議 MVP**: Phase 1-4 (Setup + Foundational + US1 + US4)

**MVP 交付物**:
- ✅ 完整的 Header（導航、語言切換、主題切換）
- ✅ 完整的 Footer（版權、社群連結）
- ✅ 自我介紹區塊（照片、姓名、職稱、簡介）
- ✅ 技能清單區塊（後端、前端、其他技能）
- ✅ 響應式設計（手機、平板、桌面）
- ✅ 深色/淺色模式切換
- ✅ 繁體中文/英文切換

**MVP 驗證標準**:
- 訪客能在首頁看到基本個人資訊和技能
- 所有導航和切換功能正常運作
- 在不同裝置上顯示正常

### Incremental Delivery

1. **Iteration 1** (MVP): Phase 1-4 → 基本履歷展示 + 響應式 + 主題/語言切換
2. **Iteration 2**: Phase 5 → 加入工作經歷和專案經驗
3. **Iteration 3**: Phase 6-7 → 完善主題/語言功能 + 加入教育背景
4. **Iteration 4**: Phase 8 → Polish 和非功能性需求

---

## Task Summary

- **Total Tasks**: 54
- **Setup Tasks**: 4
- **Foundational Tasks**: 5
- **User Story 1 (P1)**: 11 tasks
- **User Story 4 (P1)**: 3 tasks
- **User Story 2 (P2)**: 10 tasks
- **User Story 5 (P2)**: 4 tasks
- **User Story 3 (P3)**: 6 tasks
- **Polish**: 11 tasks

- **Parallel Opportunities**: 13 tasks marked with [P]
- **MVP Tasks**: 23 tasks (Phase 1-4)

---

## Validation Checklist

### Format Validation
- ✅ All tasks follow `- [ ] [ID] [P?] [Story?] Description` format
- ✅ All task IDs are sequential (T001-T054)
- ✅ All user story tasks have [US#] labels
- ✅ All tasks include file paths or clear descriptions

### Completeness Validation
- ✅ All user stories from spec.md are covered
- ✅ All entities from data-model.md are addressed
- ✅ All components from plan.md are included
- ✅ Independent test criteria defined for each user story

### Constitution Compliance
- ✅ No testing tasks (No-Testing Policy)
- ✅ All existing files preserved (Brownfield)
- ✅ Uses Nuxt UI components (Framework-First)
- ✅ No new dependencies required
- ✅ Documentation in Traditional Chinese
