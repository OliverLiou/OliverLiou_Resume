<template>
  <section id="about">
    <UPageSection
      orientation="horizontal"
      variant="naked"
      :title="profile?.name"
      :description="profile?.description"
      :features="profile?.features"
      :links="profile?.links"
      :ui="{
        container: 'lg:grid lg:grid-cols-3 lg:gap-8',
        wrapper: 'col-span-2'
      }"
    >
      <img 
        class="rounded-lg w-full"
        :src="profile?.avatar"
      />
    </UPageSection>

    
  </section>
</template>

<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'

const { t } = useI18n()
const resumeStore = useResumeStore()

const profile = computed(() => resumeStore.profile)
</script>
