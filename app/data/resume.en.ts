import hcmfLogo from '/assets/images/HCMF_SimpleLogo.png'
import profilePicture from '/assets/images/ProfilePicture.jpg'
import mustLogo from '/assets/images/MUST_LOGO.png'

import type { ResumeState } from '~/types/resume'

export const resumeDataEn: ResumeState = {
  profile: {
    name: 'Oliver Liou',
    title: 'Senior Engineer',
    description: 'Senior Software Engineer with 8+ years of experience, specializing in building enterprise web applications.',
    features: [
      {
        title: 'Coding Habits',
        description: 'I value the "long-term health" of the project and strive to write code that "I or my colleagues can easily understand" three months later.',
        icon: 'lucide:folder-code'
      },
      {
        title: "Ownership",
        description: "Capable of independently handling the entire lifecycle from requirement analysis and implementation to automated deployment, proactively reporting progress and ensuring final delivery.",
        icon: "lucide:target"
      },
      {
        title: 'Continuous Learning',
        description: 'I maintain a habit of continuously monitoring and learning new technologies to stay competitive in the professional field while keeping up with the times.',
        icon: 'lucide:swatch-book'
      }
    ],
    links: [
      {
        label: 'View Skills',
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
      company: 'Hsin Chong Machinery Works Co., Ltd.',
      logo: hcmfLogo,
      positions: [
        {
          icon: 'mdi:roman-numeral-1',
          title: 'Assistant Engineer',
          period: {
            start: '2017',
            end: '2020',
          },
          descriptions: [
            'Discussed requirements with users and responsible for implementation.',
            'Maintained company systems.',
          ],
          technologies: ['WinForm', 'MySQL', 'Microsoft Office'],
        },
        {
          icon: 'mdi:roman-numeral-2',
          title: 'Engineer',
          period: {
            start: '2021',
            end: '2024',
          },
          descriptions: [
            'Analyzed user manual workflows and systematized processes and functions.',
            'Learned new technologies and applied them to project development.',
          ],
          technologies: ['.Net Core 5', 'MSSQL', 'Nuxt2'],
          achievements: [
            'Successfully launched multiple custom systems.',
            'Automated the deployment of various systems.',
            'Independently completed tasks from requirement interviews to system implementation.',
          ],
        },
        {
          icon: 'mdi:roman-numeral-3',
          title: 'Senior Engineer',
          period: {
            start: '2025',
            end: 'Present',
          },
          descriptions: [
            'Continuously developing and maintaining projects.',
            'Assisting team members in resolving technical issues.',
            'Optimizing user experience.',
          ],
          technologies: ['.Net Core 8', 'MSSQL', 'Nuxt3', 'Azure DevOps'],
          achievements: [
            'Established frontend and backend development templates, effectively reducing development time.',
            'Implemented a logging mechanism, adding Entity Tracking to the backend.',
          ],
        },
      ],
    },
  ],
  skills: {
    backend: [
      {
        label: 'Backend Skills:',
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
        label: 'Frontend Skills:',
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
        label: 'Other Skills:',
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
      name: 'Quickly Price Quotation Program',
      nameEn: 'Quickly Price Quotation Program',
      description:
        'Automatically collects relevant costs from the ERP system based on the Bill of Materials (BOM), calculates costs according to formulas, and generates the company standard cost analysis report.',
      period: {
        start: '2024-12',
        end: '2025-03',
      },
      technologies: ['.Net 8', 'Nuxt 3'],
      features: [
        {
          label: 'BOM Upload',
          description: 'Users can upload BOM lists (xlsx format), and the system automatically parses and reads material information.'
        },
        {
          label: 'Cross-System Integration',
          description: 'Automatically collects relevant cost data from the Oracle EBS system based on fields in the BOM.'
        },
        {
          label: 'Cost Consolidation',
          description: 'Applies standard factory reports to consolidate costs for each material, while also providing a summary of major item amounts.'
        }
      ],
    },
    {
      name: 'Steel Coil Management System',
      nameEn: 'Steel Coil Management System',
      description: 'Integrated with China Steel Corporation (CSC) business processes to handle the complete steel trading workflow.',
      period: {
        start: '2022-08',
        end: '2023-10',
      },
      technologies: ['.Net 6', 'Nuxt 2'],
      features: [
        {
          label: 'Cross-System Data Integration',
          description: 'Retrieves contracts, invoices, shipping documents, etc., from the CSC API to ensure preservation and real-time updates of relevant information.',
        },
        {
          label: 'Automated Updates',
          description: 'Automatically updates steel coil data via scheduled tasks, reducing manual work and improving data accuracy.',
        },
        {
          label: 'Consolidated Reports',
          description: 'The system can instantly grab relevant data for the current month based on part numbers and consolidate it into a progression chart for easy viewing by purchasing personnel.',
        }
      ],
    },
    {
      name: 'Tempo Production Auto Schedule System',
      nameEn: 'Tempo Production Auto Schedule System',
      description:
        'Manages and controls production schedules by production line based on monthly forecasts, avoiding overstock or material shortages, improving manufacturing efficiency, and achieving production schedule control.',
      period: {
        start: '2021-09',
        end: '2022-07',
      },
      technologies: ['.Net 5', 'Nuxt 2'],
      features: [
        {
          label: 'Calendar Management',
          description: 'Different production lines can have individual calendars configured for flexible production planning.'
        },
        {
          label: 'Multiple Scheduling Strategies',
          description: 'Supports various scheduling strategies such as urgent, continuous, interval, and fixed frequency to meet different production needs.'
        },
        {
          label: 'Report Output',
          description: 'Provides various reports such as monthly schedules and achievement rates for management and decision-making.'
        },
        {
          label: 'System Integration',
          description: 'Performs real-time production monitoring with the Oracle EBS system to ensure data consistency and accuracy.'
        }
      ],
    },
    {
      name: 'Frontend/Backend Development Template',
      nameEn: 'Frontend/Backend Development Template',
      description:
        'Established internal frontend and backend development templates to shorten project development time and improve development efficiency.',
      period: {
        start: '2024-03',
        end: 'Ongoing',
      },
      technologies: ['.Net 8', 'Nuxt 3'],
      features: [
        {
          label: 'Entity Log Recording',
          description: 'Records all data changes, including additions, modifications, and deletions, based on the operator, facilitating tracking and backtracking.'
        },
        {
          label: 'Internal AD Integration',
          description: 'Achieves single sign-on (SSO) for passwords, eliminating the need to remember multiple sets of credentials.'
        },
        {
          label: 'CRUD Shared Interface',
          description: 'Unifies creation, reading, updating, and deletion operations for data tables, improving development efficiency and ensuring consistency.'
        },
        {
          label: 'Unified Frontend Layout',
          description: 'Establishes a unified frontend page layout, including tab navigation and other functions, to enhance user experience.'
        }
      ],
    },
  ],
  education: [
    {
      school: 'Minghsin University of Science and Technology',
      logo: mustLogo,
      degree: 'Master of Information Management',
      period: {
        start: '2015-09',
        end: '2017-06',
      },
      thesis: {
        title: 'Five-round Adaptive Diagnosis on Hypercubes',
        link: 'https://hdl.handle.net/11296/st8q2q',
      },
    },
  ],
}
