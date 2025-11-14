<template>
  <section id="about" class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">{{ t('intro.title') }}</h2>
      
      <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
        <!-- Avatar -->
        <div class="shrink-0">
          <img
            :src="profile?.avatar"
            :alt="`${profile?.name} - ${profile?.title}`"
            :onerror="`this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2260%22 fill=%22%23999%22%3E${profile?.name?.substring(0, 2) || 'User'}%3C/text%3E%3C/svg%3E'`"
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
          <div v-if="profile?.contacts" class="mt-6 space-y-2">
            <h3 class="text-xl font-semibold mb-3">{{ t('intro.contactTitle') }}</h3>
            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                v-if="profile?.contacts.email"
                :href="`mailto:${profile.contacts.email}`"
                class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                <span>{{ t('intro.email') }}</span>
              </a>
              <a
                v-if="profile?.contacts.github"
                :href="profile.contacts.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                <UIcon name="i-heroicons-code-bracket" class="w-5 h-5" />
                <span>{{ t('intro.github') }}</span>
              </a>
              <a
                v-if="profile?.contacts.linkedin"
                :href="profile.contacts.linkedin"
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

<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'

const { t } = useI18n()
const resumeStore = useResumeStore()

const profile = computed(() => resumeStore.profile)
</script>
