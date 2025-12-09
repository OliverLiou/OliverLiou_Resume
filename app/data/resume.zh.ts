import hcmfLogo from '/assets/images/HCMF_SimpleLogo.png'
import profilePicture from '/assets/images/ProfilePicture.jpg'
import mustLogo from '/assets/images/MUST_LOGO.png'

import type { ResumeState } from '~/types/resume'

export const resumeDataZh: ResumeState = {
  profile: {
    name: '劉亦剛',
    title: '資深工程師',
    description: '資深軟體工程師，具備 8+年的開發經驗，擅長打造企業使用的網頁應用程式',
    features: [
      {
        title: '開發習慣',
        description: '重視專案整體的「長期健康」，致力於撰寫三個月後「自己或同事也能輕易看懂」的程式碼',
        icon: 'lucide:folder-code'
      },
      {
        title: "獨立當責",
        description: "能獨立負責從需求分析、開發實作到自動化部署的完整週期，主動回報進度並確保最終交付的成果",
        icon: "lucide:target"
      },
      {
        title: '持續學習',
        description: '持續關注及學習新技術的習慣，與時俱進的同時，也在專業領域上保持競爭力',
        icon: 'lucide:swatch-book'
      }
    ],
    links: [
      {
        label: '點擊查看更多',
        to: '#skills',
        leadingIcon: 'lucide:mouse-pointer-click',
        color: 'neutral',
        variant: 'outline',
        size: 'xl'
      }
    ],
    avatar: profilePicture,
    contacts: {
      email: 'cpsgang@gmail.com',
      github: 'https://github.com/OliverLiou',
      linkedin: 'https://www.linkedin.com/in/亦剛-劉-51980936a',
    },
  },
  experiences: [
    {
      company: '信昌機械股份有限公司',
      logo: hcmfLogo,
      positions: [
        {
          icon: 'mdi:roman-numeral-1',
          title: '助理工程師',
          period: {
            start: '2017',
            end: '2020',
          },
          descriptions: [
            '與使用者討論需求並負責實作',
            '維運公司系統',
          ],
          technologies: ['WinForm', 'MySQL', 'Microsoft Office'],
        },
        {
          icon: 'mdi:roman-numeral-2',
          title: '工程師',
          period: {
            start: '2021',
            end: '2024',
          },
          descriptions: [
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
          icon: 'mdi:roman-numeral-3',
          title: '資深工程師',
          period: {
            start: '2025',
            end: '至今',
          },
          descriptions: [
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
      {
        label: '後端技能:',
        icon: 'lucide:database',
        defaultExpanded: true,
        children: [
          { label: 'C#', icon: 'logos:c-sharp' },
          { label: 'Asp.Net Core', icon: 'logos:dotnet' },
          { label: 'Microsoft SQL Server', icon: 'devicon:microsoftsqlserver-wordmark' },
          { label: 'RESTful API (swagger)', icon: 'logos:swagger' },
          { label: 'JWT Authentication', icon: 'logos:jwt-icon' },
        ] 
      }
    ],
    frontend: [
      {
        label: '前端技能:',
        icon: 'lucide:app-window',
        defaultExpanded: true,
        children: [
          { label: 'Vue.js', icon: 'logos:vue' },
          { label: 'Nuxt.js', icon: 'logos:nuxt-icon' },
          { label: 'TypeScript', icon: 'logos:typescript-icon-round' },
          { label: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
          { label: 'HTML5', icon: 'logos:html-5' },
        ]
      }
    ],
    others: [
      {
        label: '其它技能:',
        icon: 'lucide:share-2',
        defaultExpanded: true,
        children: [
          { label: 'Git', icon: 'logos:git-icon' },
          { label: 'Azure DevOps', icon: 'devicon:azuredevops' },
          { label: 'Azure CI/CD', icon: 'vscode-icons:file-type-azurepipelines' },
          {
            label: 'AI Coding',
            defaultExpanded: true,
            icon: 'streamline:ai-prompt-spark-remix',
            children: [
              { label: 'GitHub Copilot', icon: 'logos:github-copilot' },
              { label: 'GitHub Spec-Kit', icon: 'lucide:sprout' },
              { label: 'Claude Code', icon: 'logos:claude-icon' },
            ],
          },
          { label: 'Railway', icon: 'simple-icons:railway' },
        ]
      }
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
        {
          label: '物料清單上傳',
          description: '使用者可上傳Bom物料清單(xlsx格式)，系統自動解析並讀取物料資訊'
        },
        {
          label: '跨系統整合',
          description: '根據物料清單中的欄位，自動至Oracle EBS系統蒐集相關成本資料'
        },
        {
          label: '成本彙整',
          description: '套入廠內制式的報表，將每一個物料的成本進行彙整，同時提供大項目金額彙整'
        }
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
        {
          label: '跨系統整合資料',
          description: '與中鋼API索取合約、發票、押匯...等資料，確保相關資訊的保存與即時更新',
        },
        {
          label: '自動化更新',
          description: '透過定時任務，自動更新鋼捲資料，減少人工作業並提升資料準確性',
        },
        {
          label: '彙整報表',
          description: '根據件號系統可即時抓取當月份相關資料, 並統整在推移表上, 便於採購人員查看資料',
        }
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
        {
          label: '行事曆管理',
          description: '不同的生產線別，可設置個別的行事曆，靈活調整生產計劃'
        },
        {
          label: '多種排程策略',
          description: '支援特急、連續、區間、定頻等多種排程策略，滿足不同生產需求'
        },
        {
          label: '報表輸出',
          description: '提供月排程、達成率等各式報表，方便管理與決策'
        },
        {
          label: '系統整合',
          description: '與Oracle EBS系統進行即時生產監控，確保數據一致性與準確性'
        }
      ],
    },
    {
      name: '前端/後端開發模板',
      nameEn: 'Frontend/Backend Development Template',
      description:
        '建立公司內部前端與後端開發模板, 縮短專案開發時間及提升開發效率',
      period: {
        start: '2024-03',
        end: '持續更新中',
      },
      technologies: ['.Net 8', 'Nuxt 3'],
      features: [
        {
          label: 'Entity Log日誌記錄',
          description: '根據操作人員，紀錄所有資料異動，包含新增、修改、刪除等操作，方便追蹤與回溯'
        },
        {
          label: '與內部AD整合',
          description: '實現密碼單一入口登入，不需要記憶多組帳號密碼'
        },
        {
          label: 'CRUD共用介面',
          description: '統一資料表的新增、讀取、更新、刪除操作，提升開發效率並確保一致性'
        },
        {
          label: '前端統一Layout',
          description: '建立統一的前端頁面佈局，包含頁籤導航等功能，提升使用者體驗'
        }
      ],
    },
  ],
  education: [
    {
      school: '明新科技大學',
      logo: mustLogo,
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
}
