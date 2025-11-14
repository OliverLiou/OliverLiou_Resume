<template>
  <section id="experience" class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {{ t('section.experience') }}
      </h2>

      <div v-if="experiences && experiences.length > 0" v-for="exp in experiences" :key="exp.company" class="mb-12 last:mb-0">
        <!-- Company Header -->
        <div class="flex items-center gap-4 mb-6">
          <img 
            :src="exp.logo" 
            :alt="`${exp.company} logo`"
            class="w-16 h-16 object-contain dark:invert"
          />
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ exp.company }}
          </h3>
        </div>

        <!-- Timeline -->
        <!-- <UTimeline :items="getTimelineItems(exp.positions)" /> -->
         <UTimeline :items="setTimeLineItems(exp.positions)" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'
import type { Experience } from '~/types/resume'
import type { TimelineItem } from '@nuxt/ui'

const { t } = useI18n()
const resumeStore = useResumeStore()

const experiences = computed(() => resumeStore.sortedExperiences)

// const getTimelineItems = (positions: Experience['positions']) => {
//   return positions.map((position) => {
//     const children: any[] = [
//       // Title and Period
//       h('div', [
//         h('h4', { class: 'text-xl font-semibold text-gray-900 dark:text-white mb-1' }, position.title),
//         h('p', { class: 'text-sm text-gray-600 dark:text-gray-400' }, 
//           `${position.period.start} ~ ${position.period.end}`
//         ),
//       ]),
      
//       // Description
//       h('div', { class: 'space-y-2' }, [
//         h('ul', { class: 'list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300' },
//           position.description.map(desc => h('li', desc))
//         ),
//       ]),
      
//       // Technologies
//       h('div', [
//         h('p', { class: 'text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2' }, 
//           t('experience.technologies')
//         ),
//         h('p', { class: 'text-sm text-gray-600 dark:text-gray-400' }, 
//           position.technologies.join('、')
//         ),
//       ]),
//     ]

//     // Achievements (if exists)
//     if (position.achievements && position.achievements.length > 0) {
//       children.push(
//         h('div', [
//           h('p', { class: 'text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2' }, 
//             t('experience.achievements')
//           ),
//           h('ul', { class: 'list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400' },
//             position.achievements.map(achievement => h('li', achievement))
//           ),
//         ])
//       )
//     }

//     return {
//       icon: 'i-heroicons-briefcase',
//       content: h('div', { class: 'space-y-4' }, children),
//     }
//   })
// }

const setTimeLineItems = (positions : Experience['positions']) : TimelineItem[] => {
  const items: TimelineItem[] = []
  
  return items
}

</script>
