<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Title -->
        <div class="text-xl font-bold">
          {{ t('nav.intro') }}
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <button
            v-for="item in navItems"
            :key="item.key"
            @click="scrollToSection(item.href)"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            {{ t(item.label) }}
          </button>
        </nav>

        <!-- Desktop Controls -->
        <div class="hidden md:flex items-center gap-4">
          <!-- Language Switcher -->
          <UButton
            v-for="lang in languages"
            :key="lang.code"
            :variant="locale === lang.code ? 'solid' : 'ghost'"
            size="sm"
            @click="changeLanguage(lang.code)"
          >
            {{ t(lang.label) }}
          </UButton>

          <!-- Theme Switcher -->
          <UButton
            v-for="theme in themes"
            :key="theme.value"
            :variant="colorMode.preference === theme.value ? 'solid' : 'ghost'"
            size="sm"
            :icon="theme.icon"
            @click="changeTheme(theme.value)"
          >
            <span class="sr-only">{{ t(theme.label) }}</span>
          </UButton>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2"
          @click="isMenuOpen = !isMenuOpen"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        >
          <UIcon
            :name="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            class="w-6 h-6"
          />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-show="isMenuOpen"
        class="md:hidden py-4 border-t border-gray-200 dark:border-gray-800"
      >
        <!-- Mobile Navigation -->
        <nav class="flex flex-col gap-2 mb-4">
          <button
            v-for="item in navItems"
            :key="item.key"
            @click="scrollToSection(item.href)"
            class="text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            {{ t(item.label) }}
          </button>
        </nav>

        <!-- Mobile Language Switcher -->
        <div class="flex gap-2 px-4 mb-3">
          <UButton
            v-for="lang in languages"
            :key="lang.code"
            :variant="locale === lang.code ? 'solid' : 'ghost'"
            size="sm"
            @click="changeLanguage(lang.code)"
          >
            {{ t(lang.label) }}
          </UButton>
        </div>

        <!-- Mobile Theme Switcher -->
        <div class="flex gap-2 px-4">
          <UButton
            v-for="theme in themes"
            :key="theme.value"
            :variant="colorMode.preference === theme.value ? 'solid' : 'ghost'"
            size="sm"
            :icon="theme.icon"
            @click="changeTheme(theme.value)"
          >
            {{ t(theme.label) }}
          </UButton>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const colorMode = useColorMode()

// Mobile menu state
const isMenuOpen = ref(false)

// Navigation items
const navItems = [
  { key: 'intro', label: 'nav.intro', href: '#about' },
  { key: 'skills', label: 'nav.skills', href: '#skills' },
  { key: 'experience', label: 'nav.experience', href: '#experience' },
  { key: 'projects', label: 'nav.projects', href: '#projects' },
  { key: 'education', label: 'nav.education', href: '#education' },
]

// Language options
const languages = [
  { code: 'zh-tw', label: 'language.zh-tw' },
  { code: 'en', label: 'language.en' },
]

// Theme options
const themes = [
  { value: 'light', label: 'theme.light', icon: 'i-heroicons-sun' },
  { value: 'dark', label: 'theme.dark', icon: 'i-heroicons-moon' },
  { value: 'system', label: 'theme.system', icon: 'i-heroicons-computer-desktop' },
]

// Smooth scroll to anchor
const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    isMenuOpen.value = false
  }
}

// Handle language change
const changeLanguage = (code: string) => {
  if (code === 'zh-tw' || code === 'en') {
    locale.value = code
    localStorage.setItem('locale', code)
  }
}

// Handle theme change
const changeTheme = (theme: string) => {
  colorMode.preference = theme
}

// Initialize preferences
onMounted(() => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && (savedLocale === 'zh-tw' || savedLocale === 'en')) {
    locale.value = savedLocale
  }
})
</script>
