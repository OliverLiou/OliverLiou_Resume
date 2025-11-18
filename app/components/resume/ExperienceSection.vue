<template>
  <section id="experience" class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 block text-gray-900 dark:text-white">
        {{ t('section.experience') }}
      </h2>

      <div v-if="experiences && experiences.length > 0" v-for="exp in experiences" :key="exp.company" class="mb-12 last:mb-0">
        <!-- Company Header -->
        <div class="flex items-center gap-4 mb-6">
          <img 
            :src="exp.logo" 
            :alt="`${exp.company} logo`"
            class="w-16 h-16 object-contain"
          />
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ exp.company }}
          </h3>
        </div>

        <UTimeline 
          size="2xl"
          :items="setTimeLineItems(exp.positions)"
          :model-value="exp.positions.length - 1"
        >
          <template #description="{ item }" >
            <template v-if="item.descriptions.length > 0">
              <UCollapsible v-model:open="descriptions_collapsibleOpen">
                <UBadge
                  class="group my-2"
                  variant="subtle"
                  leading-icon="lucide:message-square-text"
                  trailing-icon='i-lucide-chevron-down'
                  label="工作描述"
                  :ui="{
                    trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
                  }"
                />
                <template #content>
                  <div class="ms-4" v-for="(description, index) in item.descriptions" :key="index"> - {{ description }}</div>
                </template>
              </UCollapsible>
            </template>
            
            <template v-if="item.achievements?.length > 0">
              <UCollapsible v-model:open="achievements_collapsibleOpen">
                <UBadge 
                  class="group my-2"
                  color="secondary" 
                  variant="subtle" 
                  leading-icon="lucide:trophy"
                  trailing-icon='i-lucide-chevron-down'
                  label="工作成就"
                  :ui="{
                    trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
                  }"
                />
                <template #content>
                  <div class="ms-4" v-for="(achievement, index) in item.achievements" :key="index"> - {{ achievement }}</div>
                </template>
              </UCollapsible>
            </template>
            
            <template v-if="item.technologies?.length > 0">
              <UCollapsible v-model:open="technologies_collapsibleOpen">
                <UBadge 
                  class="group my-2"
                  color="neutral" 
                  variant="subtle" 
                  leading-icon="lucide:message-square-code"
                  trailing-icon='i-lucide-chevron-down'
                  label="開發工具"
                  :ui="{
                    trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
                  }"
                />
                <template #content>
                  <div class="ms-4">
                    <UBadge
                      v-for="(technology, index) in item.technologies"
                      :key="index"
                      class="my-2 mx-0.5"
                      color="neutral"
                      variant="outline"
                      :label="technology"
                    /> 
                  </div>
                  
                </template>
              </UCollapsible>
            </template>

          </template>
        </UTimeline>
        
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'
import type { TimelineItem } from '@nuxt/ui'

const { t } = useI18n()
const resumeStore = useResumeStore()

const experiences = computed(() => resumeStore.sortedExperiences)

const setTimeLineItems = (positions: TimelineItem[]) => {
  return positions.map(p => {
    return {
      date: `${p.period.start} - ${p.period.end}`,
      title: p.title,
      icon: p.icon || 'i-heroicons-briefcase',
      descriptions: p.descriptions,
      technologies: p.technologies,
      achievements: p.achievements, 
    }
  })
}

const descriptions_collapsibleOpen = ref(true)
const achievements_collapsibleOpen = ref(true)
const technologies_collapsibleOpen = ref(true)

</script>
