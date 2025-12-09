import { defineStore } from 'pinia'
import { resumeDataZh } from '~/data/resume.zh'
import { resumeDataEn } from '~/data/resume.en'

export const useResumeStore = defineStore('resume', () => {
  const { locale } = useI18n()

  const resumeData = computed(() => {
    return locale.value.startsWith('en') ? resumeDataEn : resumeDataZh
  })

  const profile = computed(() => resumeData.value.profile)
  const experiences = computed(() => resumeData.value.experiences)
  const skills = computed(() => resumeData.value.skills)
  const projects = computed(() => resumeData.value.projects)
  const education = computed(() => resumeData.value.education)

  // Getters (now computed)
  const sortedExperiences = computed(() => {
    // 經歷已按時間排序（最新到最舊）
    return experiences.value
  })

  const sortedProjects = computed(() => {
    // 專案按開始時間降序排序（最新到最舊）
    return [...projects.value].sort((a, b) => {
      const aStart = a.period.start.replace('-', '')
      const bStart = b.period.start.replace('-', '')
      return bStart.localeCompare(aStart)
    })
  })

  const sortedEducation = computed(() => {
    // 教育背景已按時間排序
    return education.value
  })

  return {
    // State
    profile,
    experiences,
    skills,
    projects,
    education,

    // Getters
    sortedExperiences,
    sortedProjects,
    sortedEducation
  }
})