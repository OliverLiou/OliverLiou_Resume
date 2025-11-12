<!--
Sync Impact Report:
Version Change: Initial → 1.0.0
Modified Principles: N/A (Initial version)
Added Sections: 
  - Core Principles (I-VI)
  - Technology Stack Constraints
  - Development Workflow
  - Governance
Removed Sections: N/A
Templates Status:
  ✅ plan-template.md - Reviewed, compatible with constitution principles
  ✅ spec-template.md - Reviewed, compatible with constitution principles
  ✅ tasks-template.md - Reviewed, no-testing principle aligned
Follow-up TODOs: None
-->

# OliverLiou_Resume Constitution

## Core Principles

### I. Brownfield Preservation (NON-NEGOTIABLE)

嚴格禁止更動已經存在的設定檔及程式碼。此專案為 Brownfield Project，所有現有的配置和程式碼必須保持不變，除非獲得明確的人類授權。任何新功能必須以非侵入方式實作，遵循現有架構和模式。

**Rationale**: 維護系統穩定性與向後相容性，避免破壞現有功能。

### II. Framework-First Architecture

必須嚴格遵循當前 Nuxt 4.x 和 Nuxt UI 4.x 版本的規範與最佳實踐。優先使用 Nuxt UI 提供的元件，除非場景無適合的元件可用，否則禁止自創元件。所有實作必須符合官方文件的建議模式。

**Rationale**: 確保程式碼品質、可維護性，並充分利用框架提供的優化和功能。

### III. No Self-Dependency Management

嚴格禁止 AI 代理自行安裝套件。所有依賴項必須由人類開發者手動安裝並審核。當需要新套件時，必須明確請求人類進行安裝，並說明用途和理由。

**Rationale**: 控制專案依賴，避免不必要或不安全的套件引入，維持專案的輕量與安全性。

### IV. Documentation-First with Context7

實作程式碼或遇到無法解決的問題時，必須優先查閱 Context7 (#context7) 以獲取 package.json 中已安裝套件的最新文件、範例和指引。遵循官方文件的建議模式，避免使用已棄用的 API 或反模式。

**Rationale**: 確保使用最新、正確的 API 和模式，減少技術債務和潛在錯誤。

### V. No-Testing Policy

此專案不需要任何測試（單元測試、整合測試、E2E 測試等）。所有與測試相關的任務和基礎設施應被省略。實作計畫和任務列表中不應包含測試相關項目。

**Rationale**: 專案性質為個人履歷網站，複雜度低，人工驗證即可滿足品質需求。

### VI. Traditional Chinese Documentation

所有文件（包括註解、README、規格說明、提交訊息描述等）必須使用繁體中文撰寫。遇到專有名詞或技術名詞時可使用英文。程式碼本身（變數名、函式名等）應使用英文以符合業界慣例。

**Rationale**: 提升專案文件的可讀性與親和力，符合目標受眾的語言偏好。

## Technology Stack Constraints

**Platform**: Static Site Generation (SSG) 部署至 GitHub Pages

**Framework**: 
- Nuxt 4.2.1+ (嚴格遵循當前版本規範)
- Vue 3.5.22+
- TypeScript 5.9.3+

**UI Framework**:
- @nuxt/ui 4.1.0+ (優先使用，禁止重複造輪子)
- @nuxt/icon 2.1.0+
- Tailwind CSS 4.1.17+ (via @tailwindcss/vite)

**State Management**:
- Pinia 3.0.4+ with @pinia/nuxt 0.11.3+

**Internationalization**:
- @nuxtjs/i18n 10.2.0+

**Build & Deploy**:
- 必須支援靜態生成 (nuxt generate)
- 產出必須相容 GitHub Pages 部署

**Dependency Policy**:
- 禁止新增未經人類批准的套件
- 所有套件必須與 Nuxt 4.x 相容
- 優先使用 ESM 模組格式

## Development Workflow

### Commit Convention

所有提交必須嚴格遵循 Conventional Commits 1.0.0 規範（參見 ConventionalCommits.md）：

- 格式: `<type>[optional scope]: <description>`
- Description 必須使用繁體中文 (zh-tw)
- Type 包括: feat, fix, docs, style, refactor, perf, chore, build, ci 等
- Breaking changes 必須標註 `!` 或 `BREAKING CHANGE:` footer

**範例**:
- `feat(i18n): 新增繁體中文語系支援`
- `fix(ui): 修正導航列在行動裝置上的顯示問題`
- `docs: 更新 README 安裝說明`

### Implementation Process

1. **需求分析**: 理解需求，檢查是否違反 Brownfield Preservation 原則
2. **文件查閱**: 透過 Context7 查詢相關套件文件與最佳實踐
3. **元件優先**: 檢查 Nuxt UI 是否提供可用元件
4. **非侵入實作**: 以新增方式實作，不修改現有檔案（除非明確授權）
5. **人工驗證**: 由人類開發者驗證功能（無自動化測試）
6. **規範提交**: 使用 Conventional Commits 格式提交變更

### Code Review Checklist

- [ ] 未修改現有設定檔和程式碼（除非授權）
- [ ] 遵循 Nuxt 4.x 和 Nuxt UI 4.x 規範
- [ ] 未自行安裝新套件
- [ ] 已查閱 Context7 相關文件
- [ ] 優先使用 Nuxt UI 元件
- [ ] 文件使用繁體中文撰寫
- [ ] 提交訊息符合 Conventional Commits 規範

## Governance

本憲章為專案的最高指導原則，所有開發活動必須遵循。違反核心原則（特別是標註為 NON-NEGOTIABLE 者）的變更將被拒絕。

**Amendment Process**:
1. 提出修訂需求並說明理由
2. 更新憲章文件
3. 遞增版本號（遵循語義化版本）
4. 同步更新相關模板和文件
5. 產生 Sync Impact Report

**Version Policy**:
- MAJOR: 移除或重新定義核心原則、破壞性治理變更
- MINOR: 新增原則、擴展章節、重大指引補充
- PATCH: 澄清文字、修正錯誤、非語義性調整

**Compliance Review**:
所有規格說明、實作計畫和任務列表必須通過憲章檢查（Constitution Check），確保符合核心原則。不符合原則的複雜度必須明確說明正當理由。

**Version**: 1.0.0 | **Ratified**: 2025-11-12 | **Last Amended**: 2025-11-12
