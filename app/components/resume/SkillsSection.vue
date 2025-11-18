<template>
  <section id="skills" class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">{{ t('skills.title') }}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Backend Skills -->
        <div>
          <UTree :items="backendSkills" size="xl" />
        </div>

        <!-- Frontend Skills -->
        <div>
          <UTree :items="frontendSkills" size="xl" />
        </div>

        <!-- Other Skills -->
        <div>
          <UTree :items="othersSkills" size="xl" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'
import type { SkillItem, TreeNode } from '~/types/resume'

const { t } = useI18n()
const resumeStore = useResumeStore()

const skills = computed(() => resumeStore.skills)

// Convert SkillItem[] to UTree format
const convertToTreeNodes = (items: SkillItem[]): TreeNode[] => {
  return items.map(item => ({
    label: item.name,
    icon: item.icon,
    defaultExpanded: item.defaultExpanded,
    children: item.children ? convertToTreeNodes(item.children) : undefined,
  }))
}

const backendSkills = computed(() => 
  // skills.value?.backend ? convertToTreeNodes(skills.value.backend) : []
  skills.value?.backend ?? []
)

const frontendSkills = computed(() => 
  // skills.value?.frontend ? convertToTreeNodes(skills.value.frontend) : []
   skills.value?.frontend ?? []
)

const othersSkills = computed(() => 
  // skills.value?.others ? convertToTreeNodes(skills.value.others) : []
   skills.value?.others ?? []
)
</script>
