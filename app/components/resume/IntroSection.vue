<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'

const { t } = useI18n()
const resumeStore = useResumeStore()

const profile = computed(() => resumeStore.profile)
</script>

<template>
  <section id="about" class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">{{ t('intro.title') }}</h2>
      
      <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
        <!-- Avatar -->
        <div class="shrink-0">
          <img
            :src="profile?.avatar"
            :alt="profile?.name"
            class="w-48 h-48 rounded-full object-cover shadow-lg"
          />
        </div>

        <!-- Text Content -->
        <div class="flex-1 text-center md:text-left">
          <h1 class="text-4xl font-bold mb-2">{{ profile?.name }}</h1>
          <h2 class="text-2xl text-gray-600 dark:text-gray-400 mb-4">
            {{ profile?.title }}
          </h2>
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ profile?.description }}
          </p>

          <!-- Contact Info -->
          <div class="mt-6 space-y-2">
            <h3 class="text-xl font-semibold mb-3">{{ t('intro.contactTitle') }}</h3>
            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                :href="`mailto:${profile?.contacts.email}`"
                class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                <span>{{ t('intro.email') }}</span>
              </a>
              <a
                :href="profile?.contacts.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <UIcon name="i-heroicons-code-bracket" class="w-5 h-5" />
                <span>{{ t('intro.github') }}</span>
              </a>
              <a
                :href="profile?.contacts.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <UIcon name="i-heroicons-briefcase" class="w-5 h-5" />
                <span>{{ t('intro.linkedin') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
