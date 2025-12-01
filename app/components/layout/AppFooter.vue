<template>
  <USeparator icon="i-heroicons-user" type="dashed" class="h-px" />

  <UFooter>
    <!-- Left: Copyright -->
    <template #left>
      <p class="text-muted text-sm">
        {{ t('footer.copyright', { year: currentYear, name: profile?.name || '' }) }}
      </p>
    </template>

    <!-- Center: Built with info -->
    <div class="text-xs text-muted">
      <!-- {{ t('footer.builtWith') }} -->
    </div>

    <!-- Right: Social Links -->
    <template #right>
      <UButton
        v-for="link in socialLinks"
        :key="link.name"
        :icon="link.icon"
        color="neutral"
        variant="ghost"
        :to="link.href"
        :target="link.href.startsWith('mailto:') ? undefined : '_blank'"
        :aria-label="link.ariaLabel"
      />
    </template>
  </UFooter>
</template>

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
    ariaLabel: `Email ${profile.value?.name || 'me'}`,
  },
  {
    name: 'GitHub',
    icon: 'i-heroicons-code-bracket',
    href: profile.value?.contacts.github || '',
    ariaLabel: 'Visit GitHub profile',
  },
  {
    name: 'LinkedIn',
    icon: 'i-heroicons-briefcase',
    href: profile.value?.contacts.linkedin || '',
    ariaLabel: 'Visit LinkedIn profile',
  },
])
</script>
