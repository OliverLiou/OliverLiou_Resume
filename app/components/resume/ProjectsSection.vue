<template>
  <section id="projects" class="py-16 bg-gray-100/50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="flex justify-center text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {{ t('section.projects') }}
      </h2>

      <div v-if="projects.length" >
        <UCarousel
          :items="projects"
          v-slot="{ item }"
          dots
          loop
          arrows
          class-names
          class="py-2"
          :ui="{
            item: 'basis-[90%] sm:basis-[75%] md:basis-[60%] lg:basis-[50%] transition-opacity [&:not(.is-snapped)]:opacity-30',
            dot: 'w-6 h-1.5'
          }"
        >
          <div class="py-1 px-2 h-full">
            <UPageCard class="h-full">
              <template #title>
                <div class="flex flex-col gap-2 text-xl">
                  {{ item.name }}
                </div>

                <!-- <USeparator /> -->
              </template>
              
              <template #description>
                <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-md text-gray-600 dark:text-gray-400">
                  <!-- 期間 -->
                  <div class="flex items-center whitespace-nowrap">
                    <UIcon name="lucide:calendar" class="mr-1" />
                    {{ t('project.period') }}:
                  </div>
                  <div class="flex items-center">
                    {{ formatPeriod(item.period) }}
                  </div>

                  <!-- 描述 -->
                  <div class="flex items-start whitespace-nowrap">
                    <UIcon name="lucide:book-marked" class="mr-1 mt-0.5" />
                    {{ t('project.description') }}:
                  </div>
                  <div>
                    {{ item.description }}
                  </div>

                  <!-- 主要功能 -->
                  <div v-if="item.features?.length" class="flex items-start whitespace-nowrap">
                    <UIcon name="lucide:bookmark-check" class="mr-1 mt-0.5" />
                    {{ t('project.features') }}:
                  </div>
                  <div v-if="item.features?.length" class="space-y-1">
                    <UPopover arrow v-for="feature in item.features">
                      <UBadge variant="outline" color="primary" class="font-medium mr-1" :label="feature.label" />
                      <template #content>
                        <span class="m-4 inline-flex">
                          {{ feature.description  }}
                        </span>
                      </template>
                    </UPopover>
                  </div>

                  <!-- 技術標籤 -->
                  <div class="flex items-start whitespace-nowrap">
                    <UIcon name="lucide:code" class="mr-1 mt-0.5" />
                    {{ t('project.technologies') }}:
                  </div>
                  <div class="flex flex-wrap gap-1">
                    <UBadge
                      v-for="tech in item.technologies"
                      :key="tech"
                      :label="tech"
                      variant="outline"
                      color="neutral"
                      size="md"
                    >
                      <template #leading>
                        <UIcon :name="tech.includes('.Net')? 'logos:dotnet' : 'logos:nuxt-icon' " />
                      </template>
                    </UBadge>
                  </div>
                </div>
              </template>
            </UPageCard>
          </div>
        </UCarousel>
      </div>

      <p v-else class="text-center text-gray-500 dark:text-gray-400">
        {{ t('common.noData') }}
      </p>
    </div>

  </section>
</template>

<script setup lang="ts">
import { card } from '#build/ui'
import { useResumeStore } from '~/stores/resume'
import type { Project, featureItem } from '~/types/resume'

const { t, locale } = useI18n()
const resumeStore = useResumeStore()

const projects = computed(() => resumeStore.sortedProjects)

const formatPeriod = (period: Project['period']) => `${period.start} ~ ${period.end}`

</script>
