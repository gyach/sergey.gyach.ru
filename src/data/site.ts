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
    publications: string;
  };
  benefits: DetailItem[];
  experience: ExperienceItem[];
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
        title: "AI-driven hiring: я хотел лучше оценивать кандидатов, а ИИ начал оценивать меня",
        summary:
          "Размышление об использовании ИИ на собеседованиях: как подготовка, транскрипция и последующий разбор помогают меньше опираться на первое впечатление и получать обратную связь о собственной работе.",
        tags: [
          "Искусственный интеллект",
          "Собеседования",
          "Транскрипция",
          "Самооценка",
          "Обратная связь"
        ],
        date: "29 июл 2026",
        source: "Habr",
        url: "https://habr.com/ru/articles/1064206/"
      },
      {
        title: "Контекстное окно человека: чем его теперь заполнять",
        summary:
          "Размышление о том, как ИИ меняет ценность экспертизы в разработке: вместо узкой специализации на первый план выходит широкий контекст по смежным доменам и понимание, где ИИ можно доверять, а где перепроверять. Разбор того, чем теперь стоит заполнять «контекстное окно» специалиста.",
        tags: ["Контекстное окно", "Промпт-инжиниринг", "ИИ", "SDLC"],
        date: "19 июн 2026",
        source: "Habr",
        url: "https://habr.com/ru/articles/1049788/"
      },
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
        title:
          "AI-driven hiring: I wanted to assess candidates better, then AI started assessing me",
        summary:
          "A reflection on using AI in interviews: preparation, transcription, and post-interview review can reduce reliance on first impressions and provide feedback on the interviewer’s own work.",
        tags: [
          "Artificial intelligence",
          "Interviews",
          "Transcription",
          "Self-assessment",
          "Feedback"
        ],
        date: "Jul 29, 2026",
        source: "Habr",
        url: "https://habr.com/ru/articles/1064206/"
      },
      {
        title: "A human's context window: what to fill it with now",
        summary:
          "A reflection on how AI changes the value of expertise in software delivery: instead of narrow specialization, what matters more is broad context across adjacent domains and clear principles about where to trust AI and where to double-check it. A look at what to load into a professional's context window.",
        tags: ["Context window", "Prompt engineering", "AI", "SDLC"],
        date: "Jun 19, 2026",
        source: "Habr",
        url: "https://habr.com/ru/articles/1049788/"
      },
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
