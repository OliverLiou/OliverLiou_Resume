<template>
  <section id="ai" class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="flex justify-center text-3xl font-bold mb-10 text-gray-900 dark:text-white">
        {{ t('section.ai') }}
      </h2>

      <!-- Upper: Capability Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <UPageCard
          v-for="cap in capabilities"
          :key="cap.title"
          :title="cap.title"
          :ui="{ title: 'text-lg font-semibold' }"
        >
          <template #leading>
            <UIcon v-if="cap.icon" :name="cap.icon" class="size-6 text-primary" />
          </template>
          <template #description>
            <ul class="mt-2 space-y-2">
              <li
                v-for="(item, i) in cap.items"
                :key="i"
                class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <UIcon name="lucide:check" class="size-4 mt-0.5 shrink-0 text-primary" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </template>
        </UPageCard>
      </div>

      <!-- Lower: Case Study Tabs -->
      <div>
        <h3 class="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          {{ t('ai.caseStudy') }}
        </h3>

        <UTabs
          :items="caseStudyTabs"
          variant="pill"
          color="neutral"
          class="w-full"
        >
          <!-- Tab 1: Custom Agents -->
          <template #agents>
            <UTabs
              v-model="activeAgent"
              :items="agentTabs"
              orientation="vertical"
              variant="link"
              color="primary"
              class="mt-4"
              :ui="{ list: 'min-w-32' }"
            >
              <!-- conventional-commits -->
              <template #conventional-commits>
                <div class="space-y-6 px-2">
                  <!-- Demo: UChangelogVersions -->
                  <div>
                    <UChangelogVersions>
                      <UChangelogVersion
                        v-for="entry in conventionalCommitsDemo"
                        :key="entry.title"
                        :date="entry.date"
                        :title="entry.title"
                        :description="entry.description"
                        :indicator="true"
                      />
                    </UChangelogVersions>
                  </div>

                  <USeparator />

                  <!-- Agent Info Card -->
                  <UPageCard
                    v-bind="conventionalCommitsCard"
                    :ui="{ title: 'font-mono text-base' }"
                  />
                </div>
              </template>

              <!-- vue-doc -->
              <template #vue-doc>
                <div class="space-y-6 px-2">
                  <!-- Demo placeholder -->
                  <div class="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-sm text-gray-400 dark:text-gray-500">
                    {{ t('ai.agents.demoComingSoon') }}
                  </div>

                  <USeparator />

                  <!-- Agent Info Card -->
                  <UPageCard
                    v-bind="vueDocCard"
                    :ui="{ title: 'font-mono text-base' }"
                  />
                </div>
              </template>
            </UTabs>
          </template>

          <!-- Tab 2: Spec-Driven Flow -->
          <template #spec-driven>
            <div class="mt-6">
              <UStepper
                :items="stepperItems"
                :model-value="activeStep"
                color="primary"
                size="sm"
                class="w-full"
                @update:model-value="onStepChange"
              >
                <template #content="{ item }">
                  <div v-if="item.link" class="flex justify-center mt-2">
                    <UButton
                      :to="item.link"
                      target="_blank"
                      size="xs"
                      variant="outline"
                      color="primary"
                      :label="t('ai.spec.artifact')"
                      leading-icon="lucide:external-link"
                    />
                  </div>
                </template>
              </UStepper>
            </div>
          </template>

          <!-- Tab 3: Knowledge & Content -->
          <template #knowledge>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <UPageCard
                v-for="topic in knowledgeTopics"
                :key="topic.name"
                :title="topic.name"
              >
                <template #description>
                  <dl class="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div v-if="topic.input" class="flex flex-col gap-0.5">
                      <dt class="font-medium text-gray-700 dark:text-gray-300">{{ t('ai.knowledge.input') }}</dt>
                      <dd>{{ topic.input }}</dd>
                    </div>
                    <div v-if="topic.tools" class="flex flex-col gap-0.5">
                      <dt class="font-medium text-gray-700 dark:text-gray-300">{{ t('ai.knowledge.tools') }}</dt>
                      <dd>{{ topic.tools }}</dd>
                    </div>
                    <div v-if="topic.outputLink" class="flex flex-col gap-0.5">
                      <dt class="font-medium text-gray-700 dark:text-gray-300">{{ t('ai.knowledge.output') }}</dt>
                      <dd>
                        <img :src="topic.outputLink" :alt="topic.name" class="rounded-md w-full object-cover mt-1" />
                      </dd>
                    </div>
                    <div v-if="!topic.input && !topic.tools && !topic.outputLink" class="text-gray-400 dark:text-gray-500 italic text-xs">
                      即將更新 / Coming soon
                    </div>
                  </dl>
                </template>
              </UPageCard>
            </div>
          </template>
        </UTabs>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'

const { t } = useI18n()
const resumeStore = useResumeStore()

const ai = computed(() => resumeStore.aiApplication)
const capabilities = computed(() => ai.value?.capabilities ?? [])
const conventionalCommitsDemo = computed(() => ai.value?.conventionalCommitsDemo ?? [])
const knowledgeTopics = computed(() => ai.value?.knowledgeTopics ?? [])

// Case study outer tabs
const caseStudyTabs = computed(() => [
  { label: t('ai.tabs.agents'),     slot: 'agents',     value: 'agents' },
  { label: t('ai.tabs.specDriven'), slot: 'spec-driven', value: 'spec-driven' },
  { label: t('ai.tabs.knowledge'),  slot: 'knowledge',  value: 'knowledge' },
])

// Nested agent tabs
const agentTabs = [
  { label: 'conventional-commits', slot: 'conventional-commits', value: 'conventional-commits' },
  { label: 'vue-doc',              slot: 'vue-doc',              value: 'vue-doc' },
]

// Hardcoded agent cards (language-neutral — sourced from YAML)
const conventionalCommitsCard = {
  title: 'conventional-commits',
  description: 'Use this agent when the user asks to generate or help write a Git commit message following Conventional Commits 1.0.0 specification.',
  links: [
    {
      label: t('ai.agents.sourceFile'),
      to: 'https://github.com/OliverLiou/personal-ai-kit/blob/main/.github/agents/conventional-commits.agents.md',
      target: '_blank',
      icon: 'lucide:external-link',
      color: 'neutral' as const,
      variant: 'outline' as const,
    },
  ],
}

const vueDocCard = {
  title: 'vue-doc',
  description: '分析 Vue/Nuxt 檔案邏輯並產出標準化的技術文件 (*.md)',
  links: [
    {
      label: t('ai.agents.sourceFile'),
      to: 'https://github.com/OliverLiou/personal-ai-kit/blob/main/.github/agents/vue-doc.agent.md',
      target: '_blank',
      icon: 'lucide:external-link',
      color: 'neutral' as const,
      variant: 'outline' as const,
    },
  ],
}

// Spec-driven stepper
const activeStep = ref(0)

function onStepChange(val: string | number | undefined) {
  if (typeof val === 'number') activeStep.value = val
}

// Active agent tab
const activeAgent = ref('conventional-commits')

const stepperItems = computed(() =>
  (ai.value?.specDrivenSteps ?? []).map(step => ({
    title: step.label,
    description: step.sublabel,
    link: step.link,
  }))
)
</script>
