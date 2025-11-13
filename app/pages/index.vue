<script setup lang="ts">
// SEO Meta
useHead({
  title: '廖軒霆 - 資深工程師',
  meta: [
    {
      name: 'description',
      content: '擁有多年全端開發經驗，專注於企業級系統開發與維運，熟悉 .NET Core、Vue.js/Nuxt.js 技術棧。',
    },
  ],
})
</script>

<template>
  <div>
    <AppHeader />
    
    <main>
      <IntroSection />
      <SkillsSection />
    </main>

    <AppFooter />
  </div>
</template>
