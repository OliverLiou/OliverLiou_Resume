// Resume Data Types
// Date: 2025-11-13
// Feature: 001-resume-website

import type { ButtonProps, PageFeatureProps } from "@nuxt/ui"

// Profile
export interface Profile {
  name: string
  title: string
  description: string,
  features: PageFeatureProps[],
  links: ButtonProps[],
  avatar: string
  contacts: {
    email: string
    github: string
    linkedin: string
  }
}

// Experience
export interface Period {
  start: string
  end: string
}

export interface Position {
  icon?: string
  title: string
  period: Period
  descriptions: string[]
  technologies: string[]
  achievements?: string[]
}

export interface Experience {
  company: string
  logo: string
  positions: Position[]
}

// Skills
export interface SkillItem {
  name: string
  icon?: string,
  defaultExpanded?: boolean,
  children?: SkillItem[]
}

export interface Skills {
  backend: SkillItem[]
  frontend: SkillItem[]
  others: SkillItem[]
}

// Project
export interface Project {
  name: string
  nameEn?: string
  description: string
  period: Period
  technologies: string[]
  features: string[]
}

// Education
export interface Thesis {
  title: string
  link: string
}

export interface Education {
  school: string
  logo: string
  degree: string
  period: Period
  thesis?: Thesis
}

// Store State
export interface ResumeState {
  profile: Profile | null
  experiences: Experience[]
  skills: Skills | null
  projects: Project[]
  education: Education[]
}

// UI Component Types
export interface TimelineItem {
  icon?: string
  content: any
}

export interface TreeNode {
  label: string
  icon?: string
  defaultExpanded?: boolean
  children?: TreeNode[]
}
