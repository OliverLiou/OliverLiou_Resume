# Oliver Liou Resume Website

A modern, bilingual (繁體中文/English) personal resume website built with Nuxt 4, Vue 3, and TypeScript.

## 🌐 Live Demo

Visit the live website: [https://oliverliou.github.io/OliverLiou_Resume/](https://oliverliou.github.io/OliverLiou_Resume/)

## ✨ Features

- 🌍 **Bilingual Support** - Seamless switching between Traditional Chinese (繁體中文) and English using @nuxtjs/i18n
- ⚡ **SPA Mode** - Fast, client-side rendered single-page application
- 🎨 **Modern UI** - Built with Nuxt UI and Tailwind CSS 4 for a responsive, beautiful design
- 📦 **Component-Based Architecture** - Modular resume sections (Intro, Skills, Experience, Projects, Education)
- 🔧 **State Management** - Pinia for efficient state handling
- 🎯 **Type Safety** - Full TypeScript support with strict type checking
- 🎭 **Icon System** - @nuxt/icon with Iconify integration

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4.2.1](https://nuxt.com/) + [Vue 3.5.22](https://vuejs.org/)
- **Language**: [TypeScript 5.9.3](https://www.typescriptlang.org/)
- **UI Framework**: [@nuxt/ui 4.1.0](https://ui.nuxt.com/) + [Tailwind CSS 4.1.17](https://tailwindcss.com/)
- **Internationalization**: [@nuxtjs/i18n 10.2.0](https://i18n.nuxtjs.org/)
- **State Management**: [Pinia 3.0.4](https://pinia.vuejs.org/)
- **Icons**: [@nuxt/icon 2.1.0](https://nuxt.com/modules/icon)

## 📁 Project Structure

```
app/
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue      # Navigation header with language switcher
│   │   └── AppFooter.vue      # Footer component
│   └── resume/
│       ├── IntroSection.vue      # Personal introduction & contact info
│       ├── SkillsSection.vue     # Technical skills overview
│       ├── ExperienceSection.vue # Work experience timeline
│       ├── ProjectsSection.vue   # Project showcase
│       └── EducationSection.vue  # Educational background
├── data/
│   ├── resume.en.ts           # English resume data
│   └── resume.zh.ts           # Traditional Chinese resume data
├── stores/
│   └── resume.ts              # Pinia store for resume state
├── types/
│   └── resume.ts              # TypeScript type definitions
└── pages/
    └── index.vue              # Main resume page
i18n/
└── locales/
    ├── en.json                # English translations
    └── zh-tw.json             # Traditional Chinese translations
```

## 🚀 Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 💻 Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 📦 Production

### Generate Static Site (for GitHub Pages)

Build the application as a static site:

```bash
# npm
npm run generate

# pnpm
pnpm generate

# yarn
yarn generate

# bun
bun run generate
```

The static files will be generated in the `.output/public` directory.

### Preview Production Build

Locally preview the production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 📝 Development Guidelines

This project follows [Conventional Commits](./ConventionalCommits.md) specification for commit messages. Please refer to the documentation for detailed guidelines.

## 📄 License

© 2025 Oliver Liou (劉亦剛). All rights reserved.

---

For more information about Nuxt, check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction).
