import { defineStore } from 'pinia'
import type {
  ResumeState,
  Profile,
  Experience,
  Skills,
  Project,
  Education,
} from '~/types/resume'

export const useResumeStore = defineStore('resume', {
  state: (): ResumeState => ({
    profile: {
      name: '廖軒霆',
      title: '資深工程師',
      description: '擁有多年全端開發經驗，專注於企業級系統開發與維運，熟悉 .NET Core、Vue.js/Nuxt.js 技術棧，致力於提升開發效率與使用者體驗。',
      avatar: '/assets/images/ProfilePicture.jpg',
      contacts: {
        email: 'oliver86317@gmail.com',
        github: 'https://github.com/oliver86317',
        linkedin: 'https://www.linkedin.com/in/oliver-liou',
      },
    },
    experiences: [
      {
        company: '信昌機械股份有限公司',
        logo: '/assets/images/HCMF_SimpleLogo.png',
        positions: [
          {
            title: '助理工程師',
            period: {
              start: '2017',
              end: '2020',
            },
            description: [
              '與使用者討論需求並負責實作',
              '維運公司系統',
            ],
            technologies: ['WinForm', 'MySQL', 'Microsoft Office'],
          },
          {
            title: '工程師',
            period: {
              start: '2021',
              end: '2024',
            },
            description: [
              '瞭解使用者手工作業流程，並將流程與功能系統化',
              '學習新技術並應用於專案開發',
            ],
            technologies: ['.Net Core 5', 'MSSQL', 'Nuxt2'],
            achievements: [
              '多個客製系統正式上線',
              '自動化佈署各個系統',
              '需求訪談到系統實作，可獨立完成',
            ],
          },
          {
            title: '資深工程師',
            period: {
              start: '2025',
              end: '至今',
            },
            description: [
              '持續開發與維運專案',
              '協助團隊成員解決技術問題',
              '優化使用者體驗',
            ],
            technologies: ['.Net Core 8', 'MSSQL', 'Nuxt3', 'Azure DevOps'],
            achievements: [
              '建立前端、後端的開發模板，有效縮短開發時間',
              '建立Log機制，後端加入異動紀錄追蹤(Entity Tracking)',
            ],
          },
        ],
      },
    ],
    skills: {
      backend: [
        { name: 'C#' },
        { name: 'Asp.Net Core' },
        { name: 'Microsoft SQL Server' },
        { name: 'Entity Framework Core' },
        { name: 'RESTful API (swagger)' },
        { name: 'JWT Authentication' },
      ],
      frontend: [
        { name: 'Vue.js' },
        { name: 'Nuxt.js' },
        { name: 'TypeScript' },
        { name: 'Tailwind CSS' },
        { name: 'HTML5' },
      ],
      others: [
        { name: 'Git 操作' },
        { name: 'Azure DevOps' },
        { name: 'Azure CI/CD' },
        {
          name: 'AI Coding',
          children: [
            { name: 'GitHub Copilot' },
            { name: 'GitHub Spec-Kit' },
            { name: 'Claude Code' },
          ],
        },
        { name: 'Railway 部署' },
      ],
    },
    projects: [
      {
        name: '快速報價系統',
        nameEn: 'Quickly Price Quotation Program',
        description:
          '根據Bom上的物料清單, 自動至ERP系統蒐集相關成本, 並根據公式計算成本, 最終生成公司的標準成本分析表。',
        period: {
          start: '2024-12',
          end: '2025-03',
        },
        technologies: ['.Net 8', 'Nuxt 3'],
        features: [
          'Bom物料清單上傳',
          '跨系統與Oracle EBS系統進行資料整合',
          '根據預設公式計算成本',
          '生成標準成本分析表',
        ],
      },
      {
        name: '鋼捲管理系統',
        nameEn: 'Steel Coil Management System',
        description: '與中國鋼鐵公司進行業務整合，處理完整的鋼材貿易流程',
        period: {
          start: '2022-08',
          end: '2023-10',
        },
        technologies: ['.Net 6', 'Nuxt 2'],
        features: [
          '紀錄鋼材採購、合約、發票、押匯資料',
          '定時任務, 自動更新與追蹤資料',
          '根據物料需求產生推移表, 並預測下次採購時間',
        ],
      },
      {
        name: '節拍生產排程系統',
        nameEn: 'Tempo Production Auto Schedule System',
        description:
          '以生產線別為單位, 根據每月的預示量, 進行生產排程的管理與控制, 避免庫存過多或缺料, 提升製造效率並實現生產排程控制',
        period: {
          start: '2021-09',
          end: '2022-07',
        },
        technologies: ['.Net 5', 'Nuxt 2'],
        features: [
          '行事曆管理',
          '支援多種排程策略(特急、連續、區間、定頻…等等)',
          '各式報表輸出(月排程、達成率…等等)',
          '跨系統與Oracle EBS系統進行即時生產監控',
        ],
      },
      {
        name: '公司前端/後端開發模板',
        nameEn: 'Frontend/Backend Development Template',
        description:
          '公司內部前端與後端開發模板, 縮短專案開發時間及提升開發效率',
        period: {
          start: '2024-03',
          end: '持續更新中',
        },
        technologies: ['.Net 8', 'Nuxt 3'],
        features: [
          '權限控制',
          'Entity Log日誌記錄',
          '與內部AD整合實現單一入口登入',
          '統一資料表CRUD操作',
          '統一前端 layout',
          '頁籤導航',
        ],
      },
    ],
    education: [
      {
        school: '明新科技大學',
        logo: '/assets/images/MUST_LOGO.png',
        degree: '資訊管理系碩士班',
        period: {
          start: '2015-09',
          end: '2017-06',
        },
        thesis: {
          title: '五回合自適應偵測診斷於超立方體',
          link: 'https://hdl.handle.net/11296/st8q2q',
        },
      },
    ],
  }),

  getters: {
    sortedExperiences: (state): Experience[] => {
      // 經歷已按時間排序（最新到最舊）
      return state.experiences
    },

    sortedProjects: (state): Project[] => {
      // 專案按開始時間降序排序（最新到最舊）
      return [...state.projects].sort((a, b) => {
        const aStart = a.period.start.replace('-', '')
        const bStart = b.period.start.replace('-', '')
        return bStart.localeCompare(aStart)
      })
    },

    sortedEducation: (state): Education[] => {
      // 教育背景已按時間排序
      return state.education
    },
  },
})
