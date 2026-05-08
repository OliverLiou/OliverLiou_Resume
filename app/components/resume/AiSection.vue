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
          color="primary"
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
              :ui="{ list: 'min-w-32 self-start' }"
            >
              <template #default="{ item }">
                <UTooltip :text="item.label">
                  <span class="truncate">{{ item.label }}</span>
                </UTooltip>
              </template>
              <!-- conventional-commits -->
              <template #conventional-commits>
                <div class="space-y-6 px-2">
                  <!-- Agent description -->
                  <UPageCard
                    icon="lucide:git-commit-vertical"
                    title="Conventional-Commits"
                    variant="subtle"
                    to="https://github.com/OliverLiou/personal-ai-kit/blob/main/.github/agents/conventional-commits.agents.md"
                    target="_blank"
                    :description=" t('ai.agents.conventionalCommitsDesc')"
                  />

                  <USeparator />

                  <!-- Demo: UChangelogVersions -->
                  <div>
                    <UChangelogVersions :indicator-motion="false">
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
                </div>
              </template>

              <!-- vue-doc -->
              <template #vue-doc>
                <div class="space-y-6 px-2">
                  <UPageCard
                    icon="i-ph-file-vue-duotone"
                    title="vue-doc"
                    variant="subtle"
                    to="https://github.com/OliverLiou/personal-ai-kit/blob/main/.github/agents/vue-doc.agents.md"
                    target="_blank"
                    :description=" t('ai.agents.vueDocDesc')"
                  />
                  
                  <USeparator />
                  
                  <div class="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-sm text-gray-400 dark:text-gray-500">
                    {{ t('ai.agents.demoComingSoon') }}
                  </div>
                  
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
                  <div class="mt-4 space-y-4 pb-6 px-1">

                    <!-- Step header (locale-aware) -->
                    <div>
                      <p class="font-semibold text-highlighted">{{ item.label }}</p>
                      <USeparator class="my-2" />
                      <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{{ item.detail }}</p>
                    </div>

                    <!-- Markdown section (constitution / specify / plan) -->
                    <template v-if="item.markdownUrl !== undefined">
                      <!-- Real content: fetched + parsed -->
                      <UScrollArea
                        v-if="item.markdownUrl && markdownCache[item.key]"
                        class="h-72 rounded-xl border border-muted px-5 py-3"
                      >
                        <MDCRenderer :body="markdownCache[item.key]!.body" :data="markdownCache[item.key]!.data" class="prose dark:prose-invert max-w-none" />
                      </UScrollArea>
                      <!-- Loading: URL set but not yet parsed -->
                      <USkeleton
                        v-else-if="item.markdownUrl && !markdownCache[item.key]"
                        class="h-72 rounded-xl"
                      />
                      <!-- Placeholder: URL not set yet -->
                      <div
                        v-else
                        class="h-64 rounded-xl border border-dashed border-muted bg-muted/20 flex flex-col items-center justify-center gap-2"
                      >
                        <UIcon name="lucide:file-text" class="size-8 opacity-40" />
                        <p class="text-sm text-muted">{{ t('ai.spec.docComingSoon') }}</p>
                      </div>
                    </template>

                    <!-- Implement card (implement step only) -->
                    <template v-if="item.cardLink !== undefined">
                      <UCard :ui="{ body: 'p-0', footer: 'px-4 py-3' }">
                        <div class="aspect-video rounded-t-xl overflow-hidden bg-muted/30">
                          <img
                            v-if="item.cardImage"
                            :src="item.cardImage"
                             :alt="item.label"
                            class="w-full h-full object-cover"
                          />
                          <div v-else class="w-full h-full flex flex-col items-center justify-center gap-2 text-muted">
                            <UIcon name="lucide:image" class="size-10 opacity-30" />
                            <p class="text-xs opacity-50">{{ t('ai.spec.previewComingSoon') }}</p>
                          </div>
                        </div>
                        <template #footer>
                          <UButton
                            :to="item.cardLink || '#'"
                            :disabled="!item.cardLink"
                            target="_blank"
                            variant="outline"
                            size="sm"
                            leading-icon="lucide:external-link"
                          >
                            {{ t('ai.spec.viewImpl') }}
                          </UButton>
                        </template>
                      </UCard>
                    </template>

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
  { label: 'vue-doc', slot: 'vue-doc', value: 'vue-doc' },
]

// Spec-driven stepper
const activeStep = ref(0)

function onStepChange(val: string | number | undefined) {
  if (typeof val === 'number') activeStep.value = val
}

// Active agent tab
const activeAgent = ref('conventional-commits')

// Markdown cache: key → parsed AST (null = loading, undefined = not started)
const markdownCache = reactive<Record<string, Awaited<ReturnType<typeof parseMarkdown>> | null>>({})

async function fetchStepMarkdown(key: string, url: string) {
  if (key in markdownCache) return
  markdownCache[key] = null
  try {
    const raw = await $fetch<string>(url)
    markdownCache[key] = await parseMarkdown(raw)
  } catch {
    delete markdownCache[key]
  }
}

const stepperItems = computed(() =>
  (ai.value?.specDrivenSteps ?? []).map(step => ({
    title: step.label,
    key: step.key,
    label: step.label,
    detail: step.description,
    markdownUrl: step.markdownUrl,
    cardImage: step.cardImage,
    cardLink: step.cardLink,
  }))
)

watch(activeStep, (idx) => {
  const item = stepperItems.value[idx]
  if (item?.markdownUrl) fetchStepMarkdown(item.key, item.markdownUrl)
}, { immediate: true })
</script>
