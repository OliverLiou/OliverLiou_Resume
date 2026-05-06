# OliverLiou_Resume Copilot Instructions

Nuxt 4 single-page resume site built with Vue 3, TypeScript, Nuxt UI, Pinia, and `@nuxtjs/i18n`.

## Commands

| Task | Command | Notes |
| --- | --- | --- |
| Install dependencies | `npm install` | `postinstall` runs `nuxt prepare`. |
| Run locally | `npm run dev` | Starts the SPA dev server. |
| Build production app | `npm run build` | Nuxt production build. |
| Generate static site | `npm run generate` | Generates the GitHub Pages artifact in `.output/public`. |
| Preview production build | `npm run preview` | Preview the generated production output locally. |
| Tests | Not defined | There is no `test` script and no test files in the repo, so there is no single-test command to run. |
| Lint / typecheck | Not defined | There is no `lint` or `typecheck` script/config in the repo today. |

## High-level architecture

1. This repository is frontend-only. The actual app code lives under `app/` and `i18n/`; there is no backend service in this repo.
2. `nuxt.config.ts` sets `ssr: false`, enables `@nuxt/ui`, `@nuxt/icon`, `@nuxtjs/i18n`, and `@pinia/nuxt`, and uses a production `app.baseURL` of `/OliverLiou_Resume/` for GitHub Pages.
3. `app/app.vue` is the shared shell: it wraps the page in `UApp`, renders `AppHeader` and `AppFooter`, and places the routed page inside a `UContainer`.
4. `app/pages/index.vue` is the only page. It composes the five resume sections in order: intro, skills, experience, projects, and education.
5. Resume content is static and locale-driven. `app/stores/resume.ts` chooses `app/data/resume.en.ts` or `app/data/resume.zh.ts` from the active i18n locale, then exposes computed slices consumed by the section components.
6. `i18n/locales/en.json` and `i18n/locales/zh-tw.json` hold shared UI strings such as navigation labels, section labels, footer text, and settings labels. They are not the source of truth for the actual resume content.
7. `.github/workflows/nuxtjs.yml` deploys the site to GitHub Pages by running `npm ci`, `npm run generate`, and publishing `.output/public`.

## Key conventions

- Keep `app/data/resume.en.ts` and `app/data/resume.zh.ts` structurally aligned. When you add or remove a field, update both files and `app/types/resume.ts`.
- Put resume/profile/project/education content in the locale-specific TypeScript data files. Use `i18n/locales/*.json` for reusable UI copy only.
- Keep section root IDs aligned with `AppHeader.vue` anchor links: `about`, `skills`, `experience`, `projects`, and `education`.
- The default locale is `zh-tw`, and i18n uses `strategy: 'no_prefix'`. Language switching happens at runtime through `setLocale`, not route prefixes.
- The repo relies on Nuxt auto-imports and `components.pathPrefix = false`, so local components are referenced by basename like `<IntroSection />` and `<AppHeader />`.
- `SkillsSection.vue` passes the store data directly to `UTree`, so the skills data should stay in a Nuxt UI-compatible tree-node shape.
- Be careful with root-relative links and asset handling in production because the deployed site runs under `/OliverLiou_Resume/`, not `/`.
- The README declares Conventional Commits as the commit message convention for this repository.
