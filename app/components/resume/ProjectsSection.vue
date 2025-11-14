<template>
  <section id="projects" class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {{ t('section.projects') }}
      </h2>

      <div v-if="projects && projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard v-for="project in projects" :key="project.name" class="hover:shadow-lg transition-shadow">
          <template #header>
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                {{ project.name }}
              </h3>
              <p v-if="project.nameEn" class="text-sm text-gray-600 dark:text-gray-400">
                {{ project.nameEn }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ t('project.period') }}: {{ project.period.start }} ~ {{ project.period.end }}
              </p>
            </div>
          </template>

          <div class="space-y-4">
            <!-- Description -->
            <p class="text-gray-700 dark:text-gray-300">
              {{ project.description }}
            </p>

            <!-- Technologies -->
            <div>
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {{ t('project.technologies') }}
              </p>
              <div class="flex flex-wrap gap-2">
                <UBadge 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  color="primary"
                  variant="soft"
                >
                  {{ tech }}
                </UBadge>
              </div>
            </div>

            <!-- Features -->
            <div>
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {{ t('project.features') }}
              </p>
              <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li v-for="feature in project.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'

const { t } = useI18n()
const resumeStore = useResumeStore()

const projects = computed(() => resumeStore.sortedProjects)
</script>
