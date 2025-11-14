<template>
  <section id="education" class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {{ t('section.education') }}
      </h2>

      <div v-if="education && education.length > 0" class="max-w-2xl mx-auto space-y-6">
        <UPageCard v-for="edu in education" :key="edu.school">
          <template #title>
            <div class="flex items-center gap-4">
              <img 
                :src="edu.logo" 
                :alt="`${edu.school} logo`"
                :onerror="`this.style.display='none'`"
                class="w-16 h-16 object-contain"
              />
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ edu.school }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ edu.degree }}
                </p>
              </div>
            </div>
          </template>

          <div class="space-y-3 mt-4">
            <!-- Period -->
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
              <span>{{ t('education.period') }}: {{ edu.period.start }} ~ {{ edu.period.end }}</span>
            </div>

            <!-- Thesis (if exists) -->
            <div v-if="edu.thesis" class="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {{ t('education.thesis') }}
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                {{ edu.thesis.title }}
              </p>
              <UButton
                :to="edu.thesis.link"
                target="_blank"
                external
                size="sm"
                variant="soft"
                icon="i-heroicons-arrow-top-right-on-square"
              >
                {{ t('education.viewThesis') }}
              </UButton>
            </div>
          </div>
        </UPageCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'

const { t } = useI18n()
const resumeStore = useResumeStore()

const education = computed(() => resumeStore.sortedEducation)
</script>
