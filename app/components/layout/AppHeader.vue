<template>
  <UHeader>
    <!-- Title slot -->
    <template #title>
      <div class="text-xl font-bold">
        <!-- {{ t('nav.intro') }} -->
        Nuxt UI
      </div>
    </template>

    <!-- Desktop Navigation Menu -->
    <UNavigationMenu :items="navigationItems" class="hidden md:flex" />

    <!-- Right side controls -->
    <template #right>
      <!-- Language Switcher Dropdown -->
      <UDropdownMenu :items="languageMenuItems">
        <UButton
          :icon="locale === 'zh-tw' ? 'i-heroicons-language' : 'i-heroicons-language'"
          color="neutral"
          variant="ghost"
          :label="t(`language.${locale}`)"
        />
      </UDropdownMenu>

      <!-- Theme Switcher -->
      <UColorModeButton />
    </template>

    <!-- Mobile Navigation Menu in body slot -->
    <template #body>
      <UNavigationMenu :items="navigationItems" orientation="vertical" class="-mx-2.5" />

      <!-- Mobile Language Switcher -->
      <div class="flex gap-2 px-2.5 mt-4 mb-2">
        <UButton
          v-for="loc in locales"
          :key="loc.code"
          :variant="locale === loc.code ? 'solid' : 'ghost'"
          size="sm"
          @click="changeLanguage(loc.code)"
          class="flex-1"
        >
          {{ loc.name }}
        </UButton>
      </div>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '#ui/types'

const { t, locale, setLocale, locales } = useI18n()

// Navigation items for UNavigationMenu
const navigationItems = computed<NavigationMenuItem[][]>(() => [[
  { 
    value: 'intro',
    label: t('nav.intro'), 
    to: '#intro',
  },
  { 
    value: 'skills',
    label: t('nav.skills'),
    to: '#skills',
  },
  {
    value: 'experience', 
    label: t('nav.experience'), 
    to: '#experience',
  },
  {
    value: 'projects', 
    label: t('nav.projects'), 
    to: '#projects',
  },
  { 
    value: 'education',
    label: t('nav.education'), 
    to: '#education',
  },
]])

// Language menu items for dropdown
const languageMenuItems = computed(() => [
  locales.value.map(loc => ({
    label: loc.name,
    icon: locale.value === loc.code ? 'i-heroicons-check' : undefined,
    onSelect: () => changeLanguage(loc.code)
  }))
])


// Handle language change
const changeLanguage = (code: "zh-tw" | "en") => {
  setLocale(code)
}
</script>
