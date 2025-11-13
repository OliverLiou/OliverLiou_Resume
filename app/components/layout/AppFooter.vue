<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'

const { t } = useI18n()
const resumeStore = useResumeStore()

const profile = computed(() => resumeStore.profile)
const currentYear = new Date().getFullYear()

const socialLinks = computed(() => [
  {
    name: 'Email',
    icon: 'i-heroicons-envelope',
    href: `mailto:${profile.value?.contacts.email}`,
    label: profile.value?.contacts.email,
  },
  {
    name: 'GitHub',
    icon: 'i-heroicons-code-bracket',
    href: profile.value?.contacts.github,
    label: 'GitHub',
  },
  {
    name: 'LinkedIn',
    icon: 'i-heroicons-briefcase',
    href: profile.value?.contacts.linkedin,
    label: 'LinkedIn',
  },
])
</script>

<template>
  <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Copyright -->
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {{ t('footer.copyright', { year: currentYear, name: profile?.name || '' }) }}
        </div>

        <!-- Social Links -->
        <div class="flex items-center gap-4">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            :aria-label="link.name"
          >
            <UIcon :name="link.icon" class="w-5 h-5" />
            <span class="text-sm hidden sm:inline">{{ link.label }}</span>
          </a>
        </div>
      </div>

      <!-- Built with -->
      <div class="text-center text-xs text-gray-500 dark:text-gray-500 mt-4">
        {{ t('footer.builtWith') }}
      </div>
    </div>
  </footer>
</template>
