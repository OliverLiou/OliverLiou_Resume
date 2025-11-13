# Implementation Plan: 個人履歷網站

**Branch**: `001-resume-website` | **Date**: 2025-11-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-resume-website/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

建立一個現代化的個人履歷網站，展示個人資訊、技能、工作經歷、專案經驗和教育背景。網站採用 Nuxt 4.x + Nuxt UI 4.x 框架，支援響應式設計、深色模式和中英文切換，並可靜態部署至 GitHub Pages。

## Technical Context

**Language/Version**: TypeScript 5.9.3+ / Vue 3.5.22+ / Nuxt 4.2.1+  
**Primary Dependencies**: @nuxt/ui 4.1.0+, @nuxt/icon 2.1.0+, @nuxtjs/i18n 10.2.0+, Pinia 3.0.4+, Tailwind CSS 4.1.17+  
**Storage**: Static content stored as TypeScript constants in Pinia stores, images in `/public/assets/images/`  
**Testing**: N/A (No-Testing Policy per Constitution)  
**Target Platform**: Static Site Generation (SSG) for GitHub Pages deployment  
**Project Type**: Web application (frontend-only)  
**Performance Goals**: Fast initial load (<3s), smooth scrolling, 60fps animations  
**Constraints**: Must be fully static (no backend), support SSG, mobile-first responsive design  
**Scale/Scope**: Single-page application with 5 main content sections, ~10 components, bilingual content (zh-tw, en)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Brownfield Preservation | ✅ PASS | 新增 components, stores, locales，不更動既有 nuxt.config.ts 和 app.vue |
| II. Framework-First Architecture | ✅ PASS | 嚴格使用 Nuxt UI 4.x 元件 (UTimeline, UTree, UCard, UPageCard)，遵循 Nuxt 4.x 最佳實踐 |
| III. No Self-Dependency Management | ✅ PASS | 所有套件已存在於 package.json，無需新增依賴 |
| IV. Documentation-First with Context7 | ✅ PASS | 需查閱 @nuxt/ui, @nuxtjs/i18n, Pinia 最新文件 |
| V. No-Testing Policy | ✅ PASS | 不實作任何測試 |
| VI. Traditional Chinese Documentation | ✅ PASS | 所有文件和註解使用繁體中文 |

**GATE RESULT**: ✅ **APPROVED** - 無違反原則，可進入 Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── pages/
│   └── index.vue              # 主頁面，組合所有區塊元件
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue      # Header 區塊 (網站標題、導航、語言/主題切換)
│   │   └── AppFooter.vue      # Footer 區塊 (版權、社群連結)
│   └── resume/
│       ├── IntroSection.vue   # 自我介紹區塊
│       ├── ExperienceSection.vue  # 工作經歷區塊 (UTimeline)
│       ├── SkillsSection.vue  # 技能清單區塊 (UTree)
│       ├── ProjectsSection.vue    # 專案經驗區塊 (UCard)
│       └── EducationSection.vue   # 教育背景區塊 (UPageCard)
├── stores/
│   ├── resume.ts              # 履歷資料 store (Pinia)
│   └── theme.ts               # 主題切換 store (可選，若 Nuxt UI 已提供則不需要)
├── assets/
│   ├── css/
│   │   └── main.css           # 全域樣式 (已存在)
│   └── images/
│       └── ProfilePicture.jpg # 個人頭像
└── app.vue                    # 根元件 (已存在，需組合 Header/Footer/page)

i18n/
└── locales/
    ├── zh-tw.json             # 繁體中文語系檔
    └── en.json                # 英文語系檔

public/
├── assets/
│   └── images/
│       ├── HCMF_Logo_White.png   # 公司 logo (dark mode)
│       ├── HCMF_Logo_Black.png   # 公司 logo (light mode)
│       └── MUST_LOGO.png         # 學校校徽
└── robots.txt                 # 已存在
```

**Structure Decision**: 採用 Nuxt 4.x 標準 Web 應用程式結構。所有元件置於 `app/components/` 並按功能分類 (layout vs resume)。使用 Pinia store 管理履歷資料，支援未來擴展為動態內容。靜態資源 (圖片、logo) 放置於 `public/assets/images/` 以支援 SSG 部署。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**無違反事項**: 所有設計決策均符合 Constitution 原則，無需額外複雜度說明。

---

## Post-Phase 1 Constitution Re-Check

*Re-evaluation after design phase completion*

| Principle | Status | Post-Design Notes |
|-----------|--------|-------------------|
| I. Brownfield Preservation | ✅ PASS | 設計確認：僅新增檔案，不修改既有配置 |
| II. Framework-First Architecture | ✅ PASS | 所有元件使用 Nuxt UI，無自訂元件 |
| III. No Self-Dependency Management | ✅ PASS | 無新增套件需求 |
| IV. Documentation-First with Context7 | ✅ PASS | 已完成 research.md，記錄所有技術決策 |
| V. No-Testing Policy | ✅ PASS | 無測試相關檔案或規劃 |
| VI. Traditional Chinese Documentation | ✅ PASS | 所有文件使用繁體中文 |

**FINAL GATE RESULT**: ✅ **APPROVED** - 設計階段完成，可進入實作階段

---

## 下一步

執行 `/speckit.tasks` 命令以生成 tasks.md 並開始實作。
