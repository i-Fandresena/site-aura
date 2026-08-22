/**
 * Canonical dictionary. Its shape (via `typeof en`) is the contract every
 * other locale must satisfy — add a key here first, then in every other
 * locale file, and TypeScript will flag anything left untranslated.
 */
export const en = {
  meta: {
    title: "AURA++ — Elite Dev Collective from ENI Fianarantsoa",
    description:
      "AURA++ is a 7-member squad of ENI Fianarantsoa CS students and industry engineers building web, mobile, and applied AI systems.",
  },

  nav: {
    hero: "The Dock",
    vision: "Observatory",
    universe: "Home World",
    sanctuary: "Sanctuary",
    projects: "The Forge",
    technology: "The Codex",
    process: "Mission Control",
    team: "The Core",
    timeline: "The Outpost",
    contact: "The Signal",
    systemOnline: "System Online — ENI Campus",
    dayJourney: "☀ Day crossing — ENI Campus",
    nightJourney: "☾ Night crossing — ENI Campus",
  },

  theme: {
    light: "Day",
    dark: "Night",
    switchToLight: "Switch to day",
    switchToDark: "Switch to night",
  },

  language: {
    label: "Language",
  },

  hero: {
    eyebrow: "ENI Fianarantsoa — Madagascar",
    guideIntro: "AURA-1 online. Ready to embark?",
    titlePre: "Building the next",
    titleHighlight: "core",
    titlePost: "of software engineers",
    subtitle:
      "An elite 7-member squad from ENI Fianarantsoa uniting Computer Science students and active industry developers.",
    ctaPrimary: "Board the Odyssey",
    ctaSecondary: "Reach the Signal",
    scroll: "Scroll",
  },

  vision: {
    index: "00",
    label: "THE OBSERVATORY",
    heading: "We build like the mission depends on it.",
    body: "AURA++ exists to prove that a small, focused team from Madagascar can ship software with the same rigor as any international engineering org — no shortcuts, no excuses, just disciplined execution.",
    pillars: [
      {
        title: "Discipline",
        body: "Every commit is reviewed. Every deploy is monitored. Standards don't bend under deadline pressure.",
      },
      {
        title: "Curiosity",
        body: "We chase the technology that solves the problem, not the one that looks good on a slide.",
      },
      {
        title: "Impact",
        body: "Code that never ships is worth nothing. We measure ourselves by what's actually running in production.",
      },
    ],
  },

  universe: {
    index: "01",
    label: "THE HOME WORLD",
    heading: "A single core, seven signals in orbit.",
    body: "AURA++ operates as one persistent system — every member is a node feeding the same core, from campus coursework to production deployments.",
    metrics: [
      { value: "07", label: "Core Operators" },
      { value: "ENI", label: "Origin (Fianarantsoa)" },
      { value: "100%", label: "Computer Science & Software Eng" },
      { value: "FULLSTACK", label: "DevOps & AI Ready" },
    ],
  },

  sanctuary: {
    index: "02",
    label: "THE SANCTUARY",
    heading: "A refuge where ideas get room to breathe.",
    body: "Between sprints, the collective regroups here — away from the dashboards, long enough for an unlikely idea to become a working prototype.",
    rituals: [
      {
        title: "Hack Friday",
        copy: "One afternoon a week with no ticket, no backlog — just whatever someone's been dying to try.",
      },
      {
        title: "Coffee Review",
        copy: "Code review that happens over coffee, out loud, so junior operators hear the reasoning, not just the verdict.",
      },
      {
        title: "Off-Stack Week",
        copy: "Once a quarter, everyone builds something in a language or framework they've never shipped before.",
      },
    ],
  },

  projects: {
    index: "03",
    label: "THE FORGE",
    heading: "Systems shipped by the collective",
    items: [
      {
        id: "PRJ_001",
        name: "Nexus Grid",
        category: "Distributed Systems",
        copy: "Realtime orchestration layer routing workloads across community-owned compute nodes.",
      },
      {
        id: "PRJ_002",
        name: "Sentinel AI",
        category: "Applied Machine Learning",
        copy: "Anomaly detection pipeline for production logs with self-tuning inference thresholds.",
      },
      {
        id: "PRJ_003",
        name: "Helix Studio",
        category: "Web Platform",
        copy: "Collaborative build environment where student squads pair on shared repositories.",
      },
      {
        id: "PRJ_004",
        name: "Vector Relay",
        category: "Developer Tooling",
        copy: "Embedding gateway giving every AURA++ project instant semantic search over its docs.",
      },
      {
        id: "PRJ_005",
        name: "Orbit CI",
        category: "Developer Tooling",
        copy: "Zero-config CI/CD pipelines that adapt their steps to whatever stack a repo actually uses.",
      },
      {
        id: "PRJ_006",
        name: "Lumen Docs",
        category: "Applied AI",
        copy: "Documentation assistant that answers engineering questions by reading the codebase itself.",
      },
    ],
  },

  technology: {
    index: "04",
    label: "THE CODEX",
    heading: "The collective's grimoire of algorithms.",
    body: "No magic — just tools mastered until they start looking like it.",
    stacks: [
      { title: "Frontend", items: ["React", "TypeScript", "Tailwind", "Three.js"] },
      { title: "Backend", items: ["Node", "Postgres", "Redis", "gRPC"] },
      { title: "DevOps", items: ["Docker", "GitHub Actions", "Cloudflare", "Terraform"] },
      { title: "Applied AI", items: ["PyTorch", "OpenAI API", "Kafka", "Vector DBs"] },
    ],
  },

  process: {
    index: "05",
    label: "MISSION CONTROL",
    heading: "Ship weekly, review daily, never guess.",
    body: "No hero engineering, no all-nighters before a demo. Just a rhythm the whole squad can sustain — from a first-year student's first pull request to a production hotfix.",
    steps: [
      {
        title: "Scope",
        copy: "Every mission starts with a clear brief and a realistic timeline — nobody builds against a moving target.",
      },
      {
        title: "Build",
        copy: "Operators pair across tiers: students learn the codebase, working engineers keep it production-grade.",
      },
      {
        title: "Review",
        copy: "Code review is non-negotiable. Every merge gets a second set of eyes before it ships.",
      },
      {
        title: "Ship",
        copy: "Continuous deployment, monitored in real time, rolled back in seconds if something looks wrong.",
      },
    ],
  },

  team: {
    index: "06",
    label: "THE CORE",
    heading: "One squad. Three operating tiers.",
    body: "Seven operators, routed into tiers, matched to missions, and measured by what ships.",
    tiers: [
      {
        id: "T-01",
        title: "Academic Core",
        role: "ENI Master's & CS Students",
        copy: "ENI students mastering core software engineering, algorithms, and databases.",
        status: "Intake Open",
        stack: ["C++", "Java", "SQL"],
        stat: "04",
        statLabel: "Students",
      },
      {
        id: "T-02",
        title: "Industry Operators",
        role: "Working Engineers & DevOps",
        copy: "Active developers & DevOps engineers shipping production-grade code daily.",
        status: "Active Duty",
        stack: ["Node", "Docker", "Cloud"],
        stat: "03",
        statLabel: "Operators",
      },
      {
        id: "T-03",
        title: "AURA++ Labs",
        role: "Cross-Functional Strike Team",
        copy: "Agile strike team for web platforms, mobile apps, and applied AI.",
        status: "Deploying",
        stack: ["React", "Flutter", "PyTorch"],
        stat: "07",
        statLabel: "Core Squad",
      },
    ],
    stats: [
      { value: "07", label: "Engineers" },
      { value: "ENI", label: "Fianarantsoa" },
      { value: "12", label: "Shipped Builds" },
      { value: "24/7", label: "Uptime Mindset" },
    ],
  },

  timeline: {
    index: "07",
    label: "THE OUTPOST",
    heading: "From classroom to production.",
    milestones: [
      {
        date: "2024",
        title: "Founded at ENI Fianarantsoa",
        copy: "Four students, one shared repository, and a rule: everything we ship has to actually run.",
      },
      {
        date: "2025",
        title: "First production deployment",
        copy: "Nexus Grid goes live — the collective's first system running outside a classroom.",
      },
      {
        date: "2025",
        title: "Team reaches 7 operators",
        copy: "Industry engineers join the academic core, forming the three-tier structure AURA++ runs on today.",
      },
      {
        date: "2026",
        title: "AURA++ Labs launches",
        copy: "A dedicated cross-functional track for applied AI and mobile — the collective's fastest-moving unit.",
      },
    ],
  },

  contact: {
    index: "08",
    label: "THE SIGNAL",
    heading: "Ready to accelerate your projects with",
    channelOpen: "Channel Open",
    promptUser: "aura@eni-campus:~$",
    emailPlaceholder: "enter_your_email",
    send: "Send",
    note: "Encrypted transmission — no spam protocols",
    toastInvalid: "INVALID_ADDRESS — transmission aborted",
    toastSuccess: "REQUEST TRANSMITTED — the collective will respond shortly",
    footerNote: "© 2026 — All systems nominal",
  },
};

export type Dictionary = typeof en;
