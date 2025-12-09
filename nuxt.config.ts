import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules:['@nuxt/ui', '@nuxt/icon', '@nuxtjs/i18n', '@pinia/nuxt'],
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  i18n: {
    defaultLocale: 'zh-tw',
    strategy: 'no_prefix',
    locales: [
      { code: 'zh-tw', name: '繁體中文', file: 'zh-tw.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '劉亦剛 - 資深工程師 | Oliver Liou - Senior Engineer',
      meta: [
        { name: 'description', content: '擁有多年全端開發經驗，專注於企業級系統開發與維運，熟悉 .NET Core、Vue.js/Nuxt.js 技術棧。With years of full-stack development experience, specializing in enterprise system development and operations.' },
        { name: 'keywords', content: 'Oliver Liou, 劉亦剛, Full Stack Engineer, .NET Core, Vue.js, Nuxt.js, 資深工程師, 全端開發' },
        { name: 'author', content: 'Oliver Liou' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // { rel: 'canonical', href: 'https://oliverliou.github.io/OliverLiou_Resume/' }
      ],
      htmlAttrs: {
        lang: 'zh-TW'
      }
    }
  }
})