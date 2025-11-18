<template>
  <section id="about">
    <!-- <UPageCTA
      class="rounded-none sm:rounded-xl"
      orientation="horizontal"
      variant="naked"
      :title="profile?.name"
      :description="profile?.description"
    >
      <img 
        class="w-1/2 rounded-lg mx-auto block"
        :src="profile?.avatar"
      />
    </UPageCTA> -->

    <UPageSection
      class="rounded-none sm:rounded-xl"
      orientation="horizontal"
      variant="naked"
      :title="profile?.name"
      :description="profile?.description"
      :features="profile?.features"
      :links="profile?.links"
      :ui="{
        links: 'flex lg:justify-end sm:justify-center',
      }"
    >
      <img 
        class="w-1/2 rounded-lg mx-auto block"
        :src="profile?.avatar"
      />
    </UPageSection>

    
  </section>
</template>

<script setup lang="ts">
import { pageSection } from '#build/ui'
import { useResumeStore } from '~/stores/resume'

const { t } = useI18n()
const resumeStore = useResumeStore()

const profile = computed(() => resumeStore.profile)
</script>
