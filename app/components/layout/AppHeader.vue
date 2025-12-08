<template>
  <div class="fixed top-2 sm:top-3 mx-auto left-1/2 transform -translate-x-1/2 z-10">
    <UNavigationMenu 
      :items="navigationItems" 
      variant="pill"
      color="success"
      class=" bg-muted/80 backdrop-blur-sm rounded-full border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-2 text-xs sm:text-sm',
      }"
    >
    
    <template #list-trailing>
      <USeparator orientation="vertical" class="h-4 dark:bg-gray-300" />
      <UDropdownMenu :items="settingsMenuItems" class="mr-1">
        <UButton
          icon="i-lucide-settings"
          color="neutral"
          variant="ghost"
        />
        <template #theme-item="{ item }">
          <UIcon :name="item.icon" class="size-4" />
          <span class="flex-1">{{ item.label }}</span>
          <UColorModeSwitch />
        </template>
      </UDropdownMenu>
    </template>
    </UNavigationMenu>
  </div>
  
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '#ui/types'

const { t, locale, setLocale, locales } = useI18n()

// Navigation items for UNavigationMenu
const navigationItems = computed<NavigationMenuItem[][]>(() => [
  [
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
  ],
])

// Settings menu items (language + theme)
const settingsMenuItems = computed(() => [
  [
    {
      label: t('settings.language'),
      icon: 'i-heroicons-language',
      children: locales.value.map(loc => ({
        label: loc.name,
        icon: locale.value === loc.code ? 'i-heroicons-check' : undefined,
        onSelect: () => changeLanguage(loc.code)
      }))
    }
  ],
  [
    {
      label: t('settings.theme'),
      icon: 'lucide:sun-moon',
      slot: 'theme-item'
    }
  ]
])


// Handle language change
const changeLanguage = (code: "zh-tw" | "en") => {
  setLocale(code)
}
</script>
