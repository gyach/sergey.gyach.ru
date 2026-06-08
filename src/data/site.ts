export type Locale = "ru" | "en";

export type NavItem = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  summary: string;
};

export type SkillGroup = {
  title: string;
  values: string[];
};

export type DetailItem = {
  title: string;
  summary: string;
};

export type PublicationItem = {
  title: string;
  summary: string;
  tags: string[];
  date: string;
  source: string;
  url: string;
};

export type LocalizedSiteContent = {
  metadataTitle: string;
  metadataDescription: string;
  displayName: string;
  homeLabel: string;
  navItems: NavItem[];
  role: string;
  summary: string;
  heroImageAlt: string;
  primaryActionsLabel: string;
  contactLinksLabel: string;
  overviewAriaLabel: string;
  actions: {
    resume: string;
    publications: string;
    allPublications: string;
    read: string;
  };
  contactLabels: {
    github: string;
    email: string;
    telegram: string;
    max: string;
  };
  sections: {
    impact: string;
    resume: string;
    skills: string;
    artifacts: string;
    expertise: string;
    publications: string;
  };
  benefits: DetailItem[];
  experience: ExperienceItem[];
  artifacts: DetailItem[];
  expertise: {
    summary: string;
    items: DetailItem[];
  };
  skillGroups: SkillGroup[];
  publications: PublicationItem[];
};

export const site = {
  name: "Sergey Gyach",
  nameRu: "Сергей Гяч",
  domain: "sergey.gyach.ru",
  url: "https://sergey.gyach.ru",
  location: "Remote / Moscow",
  email: "sergey@gyach.ru",
  github: "https://github.com/gyach",
  githubLabel: "github.com/gyach",
  telegram: "https://t.me/gyach",
  telegramHandle: "@gyach",
  max: "https://max.ru/u/f9LHodD0cOJwNP_K5y_Cy5WZPGaoIyGP7GCynA4IeNgKUAOZIoz7mweMgr0",
  maxLabel: "MAX",
  habr: "https://habr.com/ru/users/gyach/publications/articles/",
  cvUrls: {
    ru: "/resume/sergey-gyach-cv-ru.pdf",
    en: "/resume/sergey-gyach-cv-en.pdf"
  }
};

export const defaultLocale: Locale = "ru";

export const localeLabels: Record<Locale, string> = {
  ru: "RU",
  en: "EN"
};

export const localizedContent: Record<Locale, LocalizedSiteContent> = {
  ru: {
    metadataTitle: "Сергей Гяч - руководитель отдела аналитики",
    metadataDescription:
      "Личный сайт Сергея Гяча с резюме, публикациями по аналитике, проектированию систем и ИИ-инструментам.",
    displayName: "Сергей Гяч",
    homeLabel: "На главную",
    navItems: [
      { label: "Резюме", href: "#resume" },
      { label: "Публикации", href: "#publications" }
    ],
    role: "Руководитель отдела аналитики",
    summary:
      "Помогаю продуктовым и инженерным командам быстрее переводить сложные бизнес-задачи в понятные требования, пользовательские сценарии и интеграции, снижая риски разработки и ускоряя выпуск решений за счет ИИ-инструментов.",
    heroImageAlt: "Портрет Сергея Гяча на фоне ночного города",
    primaryActionsLabel: "Основные действия",
    contactLinksLabel: "Контактные ссылки",
    overviewAriaLabel: "Обзор резюме и публикаций",
    actions: {
      resume: "Скачать CV",
      publications: "Смотреть публикации",
      allPublications: "Все публикации",
      read: "Читать"
    },
    contactLabels: {
      github: "GitHub",
      email: "Почта",
      telegram: "Telegram",
      max: "MAX"
    },
    sections: {
      impact: "Чем полезен",
      resume: "Резюме",
      skills: "Навыки",
      artifacts: "Артефакты",
      expertise: "Публичная экспертиза",
      publications: "Публикации"
    },
    benefits: [
      {
        title: "Перевожу неопределенность в рабочие решения",
        summary:
          "Разбираю бизнес-цели, ограничения и спорные ожидания до уровня сценариев, требований и понятных решений для разработки."
      },
      {
        title: "Связываю продукт, инженерию и бизнес",
        summary:
          "Помогаю командам договориться о границах задач, API-контрактах, интеграциях и критериях готовности."
      },
      {
        title: "Ускоряю подготовку к разработке",
        summary:
          "Использую ИИ-инструменты для черновиков требований, прототипов, документации и поиска разрывов в логике."
      },
      {
        title: "Снижаю риск переделок",
        summary:
          "Выношу спорные сценарии, исключения и приемку до старта реализации, чтобы меньше исправлять после разработки."
      }
    ],
    experience: [
      {
        period: "2023 - сейчас",
        role: "Руководитель отдела аналитики",
        company: "HRlink",
        summary:
          "Отвечаю за бизнес- и системный анализ, проектирование пользовательских сценариев и внешних интеграций. Внедряю ИИ-инструменты для увеличения производительности труда."
      },
      {
        period: "2020 - 2023",
        role: "Руководитель направления клиентского опыта",
        company: "МТС",
        summary:
          "Исследовал и улучшал пользовательский опыт в портфеле внутренних продуктов для инвестиционного планирования, надежности, мониторинга и наблюдаемости."
      },
      {
        period: "Ранее",
        role: "20+ лет опыта в бизнес- и операционных доменах",
        company: "Клиентский сервис, логистика, управление персоналом, строительство",
        summary:
          "Работал с процессами, требованиями и изменениями в разных предметных областях: разбирал пользовательские и операционные сценарии, согласовывал ожидания участников и переводил практический контекст бизнеса в понятные задачи для команд."
      }
    ],
    artifacts: [
      {
        title: "Требования и критерии приемки",
        summary:
          "User stories, use cases, acceptance criteria, release readiness и договоренности, которые можно передавать в разработку и тестирование."
      },
      {
        title: "API и интеграционные контракты",
        summary:
          "Описание внешних интеграций, схем обмена, ошибок, статусов, ограничений и контрактов в форматах, понятных аналитикам и инженерам."
      },
      {
        title: "Модели процессов и систем",
        summary:
          "BPMN, UML, C4, sequence diagrams, ER-модели и другие схемы, которые помогают согласовать поведение системы до реализации."
      },
      {
        title: "Пользовательские сценарии и CJM",
        summary:
          "Сценарии, карты пути клиента и edge cases для согласования продукта, поддержки, тестирования и разработки."
      },
      {
        title: "Прототипы и проверки гипотез",
        summary:
          "Интерактивные прототипы и сценарии проверки, которые помогают быстрее увидеть решение и обсудить его до затратной реализации."
      },
      {
        title: "Контекст и база знаний",
        summary:
          "Структурированные заметки, decision records и материалы для передачи контекста между продуктом, аналитикой, разработкой и поддержкой."
      }
    ],
    expertise: {
      summary:
        "Показываю практики аналитики, проектирования и документации через публичные материалы, рабочие примеры и открытые ссылки.",
      items: [
        {
          title: "Практические разборы инструментов",
          summary:
            "Пишу о технологиях и подходах, которые помогают аналитикам и инженерам быстрее договариваться о контрактах и документации."
        },
        {
          title: "Фокус на воспроизводимости",
          summary:
            "Материалы собираю как рабочие инструкции: с настройкой, примерами, ограничениями и ссылками на источники."
        },
        {
          title: "Открытые профессиональные следы",
          summary:
            "Публикации, GitHub и контактные каналы собраны рядом, чтобы было проще проверить контекст и связаться по задаче."
        }
      ]
    },
    skillGroups: [
      {
        title: "Софт-скиллы",
        values: [
          "Лидерство",
          "Управление командой",
          "Фасилитация встреч",
          "Управление ожиданиями заинтересованных сторон"
        ]
      },
      {
        title: "Аналитика и требования",
        values: [
          "Бизнес-анализ",
          "Системный анализ",
          "Управление требованиями",
          "Критерии приемки"
        ]
      },
      {
        title: "Проектирование систем",
        values: [
          "Высоконагруженные приложения",
          "Распределенные системы",
          "Программные интерфейсы и интеграции",
          "Событийно-ориентированная архитектура"
        ]
      },
      {
        title: "Пользовательские сценарии",
        values: [
          "Карты пути клиента",
          "Интерактивные прототипы интерфейсов",
          "Проверка гипотез до разработки",
          "Сценарии для согласования и тестирования"
        ]
      },
      {
        title: "ИИ и автоматизация",
        values: [
          "Внедрение ИИ-инструментов",
          "Проектирование запросов к ИИ",
          "Автоматизация процессов",
          "Управление знаниями"
        ]
      },
      {
        title: "Процессы разработки",
        values: [
          "Цикл от исследования задачи до выпуска",
          "Поиск узких мест в разработке",
          "Передача контекста между командами",
          "Метрики требований, приемки и выпуска"
        ]
      }
    ],
    publications: [
      {
        title: "Язык TypeSpec для создания API-документации",
        summary:
          "Краткий практический обзор TypeSpec как языка описания API: настройка проекта, работа в VS Code, генерация OpenAPI 3, Protobuf и JSON Schema, а также миграция существующих спецификаций OpenAPI.",
        tags: ["TypeSpec", "OpenAPI", "Проектирование API", "Техническая документация"],
        date: "23 ноя 2024",
        source: "Habr",
        url: "https://habr.com/ru/articles/860742/"
      }
    ]
  },
  en: {
    metadataTitle: "Sergey Gyach - Head of Business & Systems Analysis",
    metadataDescription:
      "Personal site for Sergey Gyach: business and systems analysis leadership, API and integration design, AI-assisted productivity workflows, and publications.",
    displayName: "Sergey Gyach",
    homeLabel: "Home",
    navItems: [
      { label: "Experience", href: "#resume" },
      { label: "Publications", href: "#publications" }
    ],
    role: "Head of Business & Systems Analysis",
    summary:
      "I help product, engineering, and business stakeholders turn complex B2B goals into clear requirements, user journeys, API and integration contracts, and AI-assisted delivery workflows.",
    heroImageAlt: "Portrait of Sergey Gyach against a city at night",
    primaryActionsLabel: "Primary actions",
    contactLinksLabel: "Contact links",
    overviewAriaLabel: "Experience and publications overview",
    actions: {
      resume: "Download CV",
      publications: "View publications",
      allPublications: "All publications",
      read: "Read"
    },
    contactLabels: {
      github: "GitHub",
      email: "Email",
      telegram: "Telegram",
      max: "MAX"
    },
    sections: {
      impact: "How I Help",
      resume: "Experience",
      skills: "Core skills",
      artifacts: "Artifacts",
      expertise: "Public Expertise",
      publications: "Publications"
    },
    benefits: [
      {
        title: "Turn ambiguity into workable decisions",
        summary:
          "Break down business goals, constraints, and conflicting expectations into user flows, requirements, and decisions engineering teams can act on."
      },
      {
        title: "Connect product, engineering, and business",
        summary:
          "Help teams align on scope, API contracts, integrations, readiness criteria, and the tradeoffs behind each decision."
      },
      {
        title: "Accelerate pre-development work",
        summary:
          "Use AI-assisted workflows for requirement drafts, prototypes, documentation, and early checks for missing logic."
      },
      {
        title: "Reduce avoidable rework",
        summary:
          "Surface edge cases, exception paths, and acceptance criteria before implementation so fewer issues are discovered late."
      }
    ],
    experience: [
      {
        period: "2023 - Present",
        role: "Head of Business & Systems Analysis",
        company: "HRlink",
        summary:
          "Lead business and systems analysis for a B2B HR tech platform. Turn product goals into clear requirements, user flows, API and external integration contracts, and delivery processes that reduce rework. Introduce AI-assisted analysis, prototyping, and documentation practices to improve team throughput."
      },
      {
        period: "2020 - 2023",
        role: "Customer Experience Lead, Internal Platforms",
        company: "MTS",
        summary:
          "Led customer experience research and product improvements for internal engineering platforms covering IT investment planning, reliability, monitoring, and observability. Translated research findings into clearer workflows and process changes for technical users."
      },
      {
        period: "Earlier",
        role: "20+ years across business and operations domains",
        company: "Customer service, logistics, human resources, construction",
        summary:
          "Worked with processes, requirements, and change across multiple domains: customer and operational workflows, stakeholder expectations, and translating practical business context into clear work for teams."
      }
    ],
    artifacts: [
      {
        title: "Requirements and acceptance criteria",
        summary:
          "User stories, use cases, acceptance criteria, release readiness notes, and agreements ready for development and QA."
      },
      {
        title: "API and integration contracts",
        summary:
          "External integration descriptions, exchange schemas, errors, statuses, limits, and contracts that analysts and engineers can review together."
      },
      {
        title: "Process and system models",
        summary:
          "BPMN, UML, C4, sequence diagrams, ER models, and other diagrams that align system behavior before implementation."
      },
      {
        title: "User flows and CJM",
        summary:
          "User journeys, customer journey maps, and edge cases for product, support, QA, and engineering alignment."
      },
      {
        title: "Prototypes and hypothesis checks",
        summary:
          "Clickable prototypes and validation scenarios that make a solution visible before the team commits to expensive implementation work."
      },
      {
        title: "Context and knowledge base",
        summary:
          "Structured notes, decision records, and handoff materials for product, analysis, engineering, and support teams."
      }
    ],
    expertise: {
      summary:
        "I share analysis, system design, and documentation practices through public materials, working examples, and open professional links.",
      items: [
        {
          title: "Practical tool write-ups",
          summary:
            "Write about technologies and practices that help analysts and engineers align on contracts, documentation, and delivery work."
        },
        {
          title: "Reproducible examples",
          summary:
            "Structure materials as working guides with setup steps, examples, limitations, and links to primary sources."
        },
        {
          title: "Open professional footprint",
          summary:
            "Publications, GitHub, and contact channels are kept close together so the context is easy to inspect."
        }
      ]
    },
    skillGroups: [
      {
        title: "Leadership and facilitation",
        values: [
          "Team leadership",
          "Business analysis team management",
          "Meeting facilitation",
          "Stakeholder alignment"
        ]
      },
      {
        title: "Business and systems analysis",
        values: [
          "Business analysis",
          "Systems analysis",
          "Requirements lifecycle management",
          "Acceptance criteria and release readiness"
        ]
      },
      {
        title: "Solution and system design",
        values: [
          "Scalable B2B platforms",
          "Distributed application design",
          "API and integration design",
          "Event-driven architecture"
        ]
      },
      {
        title: "User flows and validation",
        values: [
          "Customer journey mapping",
          "Clickable interface prototypes",
          "AI-assisted rapid prototyping",
          "Pre-development hypothesis validation",
          "Stakeholder review and usability testing flows"
        ]
      },
      {
        title: "AI productivity and automation",
        values: [
          "AI-assisted analysis workflows",
          "Prompt design for analysis tasks",
          "Workflow automation",
          "Knowledge management systems"
        ]
      },
      {
        title: "SDLC process optimization",
        values: [
          "Discovery-to-release process design",
          "Delivery bottleneck analysis",
          "Cross-team context handoff",
          "Requirements quality, acceptance, and release metrics"
        ]
      }
    ],
    publications: [
      {
        title: "TypeSpec for API specifications",
        summary:
          "A practical guide to TypeSpec as a contract-first language for API specifications: project setup, VS Code tooling, OpenAPI 3, Protobuf, and JSON Schema generation, plus migration from existing OpenAPI documents.",
        tags: ["TypeSpec", "OpenAPI", "API design", "Technical documentation"],
        date: "Nov 23, 2024",
        source: "Habr",
        url: "https://habr.com/ru/articles/860742/"
      }
    ]
  }
};
