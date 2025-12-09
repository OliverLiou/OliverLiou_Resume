<template>
  <section id="experience" class="py-16">
    <div class="flex justify-center">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {{ t('section.experience') }}
      </h2>
    </div>
    
    <div class="flex justify-center">
      <UPageCard v-if="experiences && experiences.length > 0" v-for="exp in experiences" :key="exp.company" variant="naked">
        <template #header>
          <div class="flex justify-center items-center">
            <img 
            :src="exp.logo" 
            :alt="`${exp.company} logo`"
            class="w-8 md:w-12 h-8 md:h-12 object-contain"
            />
            <span class="text-xl font-bold ml-3 text-gray-900 dark:text-white">
              {{ exp.company }}
            </span>
          </div>
        
        </template>
        <template #description>
          <UTimeline 
            size="3xl"
            reverse
            :items="setTimeLineItems(exp.positions)"
            :model-value="0"
          >
            <template #description="{ item }" >
              <template v-if="item.descriptions.length > 0">
                <UCollapsible v-model:open="descriptions_collapsibleOpen">
                  <UBadge
                    class="group my-2"
                    variant="subtle"
                    leading-icon="lucide:message-square-text"
                    trailing-icon='i-lucide-chevron-down'
                    :label="t('experience.description')"
                    :ui="{
                      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
                    }"
                  />
                  <template #content>
                    <!-- <div class="ms-4" v-for="(description, index) in item.descriptions" :key="index"> {{ description }}</div> -->
                     <ol class="list-[lower-roman]">
                      <li v-for="(description, index) in item.descriptions" :key="index" class="ms-4 mb-1">
                        {{ description }}
                      </li>
                     </ol>
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
                    :label="t('experience.achievements')"
                    :ui="{
                      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
                    }"
                  />
                  <template #content>
                    <div class="ms-4" v-for="(achievement, index) in item.achievements" :key="index">{{ achievement }}</div>
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
                    :label="t('experience.technologies')"
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
        </template>
      </UPageCard>
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
