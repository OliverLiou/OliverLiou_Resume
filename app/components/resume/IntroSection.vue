<template>
  <section id="about">
    <UPageSection
      orientation="vertical"
      variant="naked"
      :title="profile?.name"
      :description="profile?.description"
      :features="profile?.features"
      :links="profile?.links"
      :ui="{
        container: 'py-20 sm:py-24 lg:py-28',
        headline: 'flex items-center justify-center mb-6',
      }"
    >
      <template #headline>
        <UAvatar
          :src="profile?.avatar"
          class="size-24 sm:size-36 ring ring-default ring-offset-3 ring-offset-bg"
        />
      </template>
    </UPageSection>
  </section>
</template>

<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'

const { t } = useI18n()
const resumeStore = useResumeStore()

const profile = computed(() => resumeStore.profile)
</script>
