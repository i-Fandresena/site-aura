import type { Dictionary } from "./en";

export const fr: Dictionary = {
  meta: {
    title: "AURA++ — Collectif dev d'élite de l'ENI Fianarantsoa",
    description:
      "AURA++ est un collectif de 7 membres, étudiants en informatique et ingénieurs en activité de l'ENI Fianarantsoa, qui conçoit des systèmes web, mobiles et d'IA appliquée.",
  },

  nav: {
    hero: "Le Quai",
    vision: "Observatoire",
    universe: "Monde-Berceau",
    sanctuary: "Sanctuaire",
    projects: "La Forge",
    technology: "Le Codex",
    process: "Mission Control",
    team: "Le Noyau",
    timeline: "L'Avant-Poste",
    contact: "Le Signal",
    systemOnline: "Système en ligne — Campus ENI",
    dayJourney: "☀ Traversée de jour — Campus ENI",
    nightJourney: "☾ Traversée de nuit — Campus ENI",
  },

  theme: {
    light: "Jour",
    dark: "Nuit",
    switchToLight: "Passer au jour",
    switchToDark: "Passer à la nuit",
  },

  language: {
    label: "Langue",
  },

  hero: {
    eyebrow: "ENI Fianarantsoa — Madagascar",
    guideIntro: "AURA-1 en ligne. Prêt à embarquer ?",
    titlePre: "Construire le prochain",
    titleHighlight: "cœur",
    titlePost: "du génie logiciel",
    subtitle:
      "Un collectif d'élite de 7 membres, à l'ENI Fianarantsoa, réunissant étudiants en informatique et développeurs en activité.",
    ctaPrimary: "Embarquer sur l'Odyssée",
    ctaSecondary: "Rejoindre le Signal",
    scroll: "Défiler",
  },

  vision: {
    index: "00",
    label: "L'OBSERVATOIRE",
    heading: "Nous construisons comme si la mission en dépendait.",
    body: "AURA++ existe pour prouver qu'une petite équipe soudée, basée à Madagascar, peut livrer des logiciels avec la même rigueur que n'importe quelle organisation d'ingénierie internationale — sans raccourcis, sans excuses, juste une exécution disciplinée.",
    pillars: [
      {
        title: "Discipline",
        body: "Chaque commit est relu. Chaque déploiement est surveillé. Les standards ne plient pas sous la pression d'une deadline.",
      },
      {
        title: "Curiosité",
        body: "Nous choisissons la technologie qui résout le problème, pas celle qui fait bien sur une slide.",
      },
      {
        title: "Impact",
        body: "Un code qui n'est jamais livré ne vaut rien. Nous nous mesurons à ce qui tourne réellement en production.",
      },
    ],
  },

  universe: {
    index: "01",
    label: "LE MONDE-BERCEAU",
    heading: "Un cœur unique, sept signaux en orbite.",
    body: "AURA++ fonctionne comme un système unique et persistant — chaque membre est un nœud qui nourrit le même cœur, des travaux de campus aux déploiements en production.",
    metrics: [
      { value: "07", label: "Opérateurs Core" },
      { value: "ENI", label: "Origine (Fianarantsoa)" },
      { value: "100%", label: "Info & Génie Logiciel" },
      { value: "FULLSTACK", label: "DevOps & IA Prêts" },
    ],
  },

  sanctuary: {
    index: "02",
    label: "LE SANCTUAIRE",
    heading: "Un refuge où les idées ont le temps de respirer.",
    body: "Entre deux sprints, le collectif se retrouve ici — loin des dashboards, le temps qu'il faut pour qu'une idée improbable devienne un prototype qui tourne.",
    rituals: [
      {
        title: "Hack Friday",
        copy: "Un après-midi par semaine sans ticket, sans backlog — juste ce que quelqu'un mourait d'envie d'essayer.",
      },
      {
        title: "Revue Café",
        copy: "Une revue de code qui se fait autour d'un café, à voix haute, pour que les opérateurs juniors entendent le raisonnement, pas juste le verdict.",
      },
      {
        title: "Semaine Hors-Stack",
        copy: "Une fois par trimestre, chacun construit quelque chose dans un langage ou un framework qu'il n'a jamais utilisé en production.",
      },
    ],
  },

  projects: {
    index: "03",
    label: "LA FORGE",
    heading: "Systèmes livrés par le collectif",
    items: [
      {
        id: "PRJ_001",
        name: "Nexus Grid",
        category: "Systèmes distribués",
        copy: "Couche d'orchestration temps réel qui route les charges de travail sur des nœuds de calcul communautaires.",
      },
      {
        id: "PRJ_002",
        name: "Sentinel AI",
        category: "Machine Learning appliqué",
        copy: "Pipeline de détection d'anomalies pour logs de production, avec seuils d'inférence auto-ajustés.",
      },
      {
        id: "PRJ_003",
        name: "Helix Studio",
        category: "Plateforme web",
        copy: "Environnement de développement collaboratif où les escouades étudiantes travaillent en binôme sur des dépôts partagés.",
      },
      {
        id: "PRJ_004",
        name: "Vector Relay",
        category: "Outillage développeur",
        copy: "Passerelle d'embeddings offrant à chaque projet AURA++ une recherche sémantique instantanée dans sa documentation.",
      },
      {
        id: "PRJ_005",
        name: "Orbit CI",
        category: "Outillage développeur",
        copy: "Pipelines CI/CD zéro-config qui adaptent leurs étapes à la stack réellement utilisée par chaque dépôt.",
      },
      {
        id: "PRJ_006",
        name: "Lumen Docs",
        category: "IA appliquée",
        copy: "Assistant de documentation qui répond aux questions techniques en lisant directement la base de code.",
      },
    ],
  },

  technology: {
    index: "04",
    label: "LE CODEX",
    heading: "Le grimoire d'algorithmes du collectif.",
    body: "Pas de magie — juste des outils maîtrisés au point d'en avoir l'air.",
    stacks: [
      { title: "Frontend", items: ["React", "TypeScript", "Tailwind", "Three.js"] },
      { title: "Backend", items: ["Node", "Postgres", "Redis", "gRPC"] },
      { title: "DevOps", items: ["Docker", "GitHub Actions", "Cloudflare", "Terraform"] },
      { title: "IA appliquée", items: ["PyTorch", "OpenAI API", "Kafka", "Vector DBs"] },
    ],
  },

  process: {
    index: "05",
    label: "MISSION CONTROL",
    heading: "Livrer chaque semaine, relire chaque jour, ne jamais deviner.",
    body: "Pas d'héroïsme de dernière minute, pas de nuit blanche avant une démo. Juste un rythme que tout le collectif peut tenir — de la première pull request d'un étudiant de première année à un hotfix en production.",
    steps: [
      {
        title: "Cadrage",
        copy: "Chaque mission démarre avec un brief clair et un calendrier réaliste — personne ne construit sur une cible mouvante.",
      },
      {
        title: "Construction",
        copy: "Les opérateurs binôment à travers les tiers : les étudiants apprennent la base de code, les ingénieurs en activité la maintiennent au niveau production.",
      },
      {
        title: "Revue",
        copy: "La revue de code n'est pas négociable. Chaque merge passe sous un second regard avant d'être livré.",
      },
      {
        title: "Livraison",
        copy: "Déploiement continu, supervisé en temps réel, retour arrière en quelques secondes en cas de doute.",
      },
    ],
  },

  team: {
    index: "06",
    label: "LE NOYAU",
    heading: "Un seul escadron. Trois tiers opérationnels.",
    body: "Sept opérateurs, répartis en tiers, affectés selon les missions, et évalués sur ce qui est livré.",
    tiers: [
      {
        id: "T-01",
        title: "Cœur Académique",
        role: "Étudiants Master & Info à l'ENI",
        copy: "Étudiants de l'ENI qui maîtrisent le génie logiciel, les algorithmes et les bases de données.",
        status: "Recrutement ouvert",
        stack: ["C++", "Java", "SQL"],
        stat: "04",
        statLabel: "Étudiants",
      },
      {
        id: "T-02",
        title: "Opérateurs Industrie",
        role: "Ingénieurs en activité & DevOps",
        copy: "Développeurs et ingénieurs DevOps en activité, qui livrent du code niveau production au quotidien.",
        status: "En mission",
        stack: ["Node", "Docker", "Cloud"],
        stat: "03",
        statLabel: "Opérateurs",
      },
      {
        id: "T-03",
        title: "AURA++ Labs",
        role: "Équipe d'intervention transverse",
        copy: "Escouade agile pour plateformes web, applications mobiles et IA appliquée.",
        status: "Déploiement",
        stack: ["React", "Flutter", "PyTorch"],
        stat: "07",
        statLabel: "Escouade Core",
      },
    ],
    stats: [
      { value: "07", label: "Ingénieurs" },
      { value: "ENI", label: "Fianarantsoa" },
      { value: "12", label: "Versions livrées" },
      { value: "24/7", label: "Esprit disponibilité" },
    ],
  },

  timeline: {
    index: "07",
    label: "L'AVANT-POSTE",
    heading: "De la salle de classe à la production.",
    milestones: [
      {
        date: "2024",
        title: "Fondation à l'ENI Fianarantsoa",
        copy: "Quatre étudiants, un dépôt partagé, et une règle : tout ce qu'on livre doit vraiment tourner.",
      },
      {
        date: "2025",
        title: "Premier déploiement en production",
        copy: "Nexus Grid passe en ligne — le premier système du collectif à tourner hors d'une salle de classe.",
      },
      {
        date: "2025",
        title: "L'équipe atteint 7 opérateurs",
        copy: "Des ingénieurs en activité rejoignent le cœur académique, formant la structure à trois tiers qui fait tourner AURA++ aujourd'hui.",
      },
      {
        date: "2026",
        title: "Lancement d'AURA++ Labs",
        copy: "Un pôle transverse dédié à l'IA appliquée et au mobile — l'unité la plus rapide du collectif.",
      },
    ],
  },

  contact: {
    index: "08",
    label: "LE SIGNAL",
    heading: "Prêt à accélérer vos projets avec",
    channelOpen: "Canal ouvert",
    promptUser: "aura@eni-campus:~$",
    emailPlaceholder: "entrez_votre_email",
    send: "Envoyer",
    note: "Transmission chiffrée — zéro spam",
    toastInvalid: "ADRESSE_INVALIDE — transmission annulée",
    toastSuccess: "REQUÊTE TRANSMISE — le collectif répondra sous peu",
    footerNote: "© 2026 — Tous les systèmes sont nominaux",
  },
};
