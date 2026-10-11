/**
 * Selected work.
 *
 * To add a screenshot later:
 * 1. Place the file in `public/images/projects/` (png, jpg, or webp).
 * 2. Set `image.src` to that public path, e.g. "/images/projects/apollo.png".
 * 3. Write a specific `image.alt`.
 *
 * To add a PDF (slides, write-up):
 * 1. Place the file in `public/documents/`.
 * 2. Add an entry to `documents` with `href` set to that public path.
 *
 * Leave copy fields empty rather than inventing details. The UI renders an
 * intentional preview state when description or media is still pending.
 */

export type ProjectDocument = {
  label: string;
  href: string | null;
  note?: string;
};

export type ProjectSection = {
  id: string;
  title: string;
  body: string;
};

export type ProjectExcerpt = {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
};

export type ProjectVideo = {
  src: string;
  type: string;
  poster?: string | null;
  zoom?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  featured: boolean;
  layout: "editorial" | "split" | "image-forward" | "image-offset";
  previewAspect?: "wide" | "photo" | "square" | "landscape";
  tags: string[];
  image: {
    src: string | null;
    alt: string;
    pendingLabel: string;
  };
  video?: ProjectVideo;
  excerpts?: ProjectExcerpt[];
  excerptColumns?: 2 | 3;
  excerptTitle?: string;
  documents: ProjectDocument[];
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "smart-cities",
    title: "Smart Cities",
    kicker: "Research",
    summary:
      "Research project on pavement-condition classification from real-world audio, combining speech transcription, feature engineering, and model evaluation.",
    featured: true,
    layout: "editorial",
    tags: ["Research", "NLP", "Transformer Architecture", "Sentiment Analysis"],
    image: {
      src: "/images/projects/smart-cities/paser-preview.png",
      alt: "Line chart showing model accuracy increasing with degrees of freedom.",
      pendingLabel: "Preview image forthcoming",
    },
    excerpts: [
      {
        src: "/images/projects/smart-cities/paser-conclusion.png",
        alt: "Presentation conclusion slide summarizing the project outcomes and future data collection.",
        caption: "Conclusion and next steps",
      },
      {
        src: "/images/projects/smart-cities/paser-model-results.png",
        alt: "Final model slide describing BERT and showing an accuracy chart by degrees of freedom.",
        caption: "Final model and evaluation",
      },
      {
        src: "/images/projects/smart-cities/paser-system-overview.png",
        alt: "Smart Cities slide explaining PASER road-condition ratings and audio transcription.",
        caption: "PASER and audio-transcription context",
      },
      {
        src: "/images/projects/smart-cities/paser-system-workflow.png",
        alt: "Project workflow slide describing PASER visual inspection and audio-based road annotation.",
        caption: "Road-inspection workflow",
      },
    ],
    documents: [
      {
        label: "Presentation slides",
        href: null,
        note: "Selected presentation excerpts are shown below.",
      },
      {
        label: "Presentation with High Distinction",
        href: null,
        note: "Awarded for this project.",
      },
    ],
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "The project addressed pavement-condition classification using real-world audio, with a focus on whether spoken or transcribed language could serve as a structured signal alongside more traditional condition grading frameworks.",
      },
      {
        id: "approach",
        title: "Approach",
        body: "The work combined speech transcription, feature engineering, and model training. Audio-derived text was transformed into structured representations using TF-IDF, n-gram, and sentiment-oriented signals before classification.",
      },
      {
        id: "methods",
        title: "Methods and tools",
        body: "The pipeline incorporated transcription, preprocessing, model comparison, and evaluation. Logistic regression and BERT were trained and compared to assess which representation produced stronger pavement-condition predictions.",
      },
      {
        id: "findings",
        title: "Findings",
        body: "The project achieved 90% classification accuracy across pavement-condition categories and won the Presentation with High Distinction award. The work also included analysis of model confidence and misclassifications to understand where the system was stronger or weaker.",
      },
      {
        id: "limitations",
        title: "Limitations and future directions",
        body: "This project is best understood as an exploratory research effort rather than a production deployment. Future work would include broader dataset validation, deeper error analysis, and systematic evaluation design for more robust generalization.",
      },
    ],
  },
  {
    slug: "bifrost",
    title: "BiFrost",
    kicker: "Clinical Trials Communications Platform",
    summary:
      "Clinical trial matching application for structured retrieval, data validation, and privacy-sensitive records handling.",
    featured: true,
    layout: "editorial",
    tags: ["Healthcare", "Data Security", "TypeScript", "PostgreSQL"],
    image: {
      src: "/images/projects/cliniq/bifrost-hero-demo-frame-1.jpg",
      alt: "BiFrost landing page preview still from the project demo",
      pendingLabel: "Hero demo video preview",
    },
    video: {
      src: "/videos/projects/cliniq/bifrost-hero-demo.mp4",
      type: "video/mp4",
      poster: "/images/projects/cliniq/bifrost-hero-demo-frame-1.jpg",
      zoom: true,
    },
    excerpts: [
      {
        src: "/images/projects/cliniq/bifrost-landing-ss.png",
        alt: "BiFrost landing page showing the patient and trial onboarding flow.",
        caption: "Landing page",
      },
      {
        src: "/images/projects/cliniq/bifrost-dashboard-ss.png",
        alt: "BiFrost dashboard view summarizing clinical trial match data.",
        caption: "Dashboard view",
      },
      {
        src: "/images/projects/cliniq/bifrost-hero-demo-frame-1.jpg",
        alt: "BiFrost hero demo frame showing the onboarding and workflow experience.",
        caption: "Hero demo still 1",
      },
      {
        src: "/images/projects/cliniq/bifrost-hero-demo-frame-2.jpg",
        alt: "BiFrost hero demo frame showing navigation across the patient-trial match workflow.",
        caption: "Hero demo still 2",
      },
    ],
    documents: [],
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: "CliniQ is a TypeScript and Node.js application designed to match patients or trial records through structured data retrieval, parsing, and validation workflows.",
      },
      {
        id: "data-workflow",
        title: "Data workflow",
        body: "The application ingests inconsistent inputs, normalizes records, and validates the resulting database entries so downstream components can rely on consistent data access patterns.",
      },
      {
        id: "platform",
        title: "Platform and systems",
        body: "The system uses PostgreSQL, Prisma, and REST APIs to manage relational data access and application logic. Data security is addressed with AES-256-GCM encryption and HTTPS/TLS protections for sensitive information in transit and at rest.",
      },
      {
        id: "outcome",
        title: "Outcome",
        body: "This project strengthened the core data platform for clinical matching by combining ingestion, validation, schema design, and secure storage into a single maintainable application flow.",
      },
    ],
  },
  {
    slug: "momentum",
    title: "Momentum",
    kicker: "iOS Application",
    summary:
      "A mobile productivity interface for habit tracking, daily routines, and focused work sessions.",
    featured: true,
    layout: "editorial",
    previewAspect: "landscape",
    tags: ["Interface", "iOS", "SwiftUI", "Asynchronous Programming"],
    image: {
      src: "/images/projects/momentum/momentum-preview.png",
      alt: "Momentum preview featuring three mobile app screens.",
      pendingLabel: "Momentum interface preview",
    },
    excerptColumns: 3,
    excerptTitle: "Overview",
    excerpts: [
      {
        src: "/images/projects/momentum/momentum-focus.png",
        alt: "Momentum focus timer screen showing a 25-minute session.",
        caption: "Focus timer",
        width: 894,
        height: 1638,
      },
      {
        src: "/images/projects/momentum/momentum-habit-edit.png",
        alt: "Momentum form for creating a new habit with schedule and difficulty settings.",
        caption: "Create a habit",
        width: 868,
        height: 1622,
      },
      {
        src: "/images/projects/momentum/momentum-habits.png",
        alt: "Momentum habits screen showing a workout and reading habit.",
        caption: "Habits",
        width: 858,
        height: 1626,
      },
    ],
    documents: [],
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: "Momentum is a mobile productivity interface for building habits, managing daily routines, and tracking focused work sessions.",
      },
    ],
  },
  // {
  //   slug: "apollo",
  //   title: "Apollo",
  //   kicker: "Product",
  //   summary:
  //     "GitHub-driven automation product for repository reconciliation, workflow review, and human-in-the-loop AI execution.",
  //   featured: true,
  //   layout: "editorial",
  //   tags: ["Automation", "FastAPI", "LangGraph"],
  //   image: {
  //     src: null,
  //     alt: "Apollo interface preview",
  //     pendingLabel: "UI screenshot forthcoming",
  //   },
  //   documents: [],
  //   sections: [
  //     {
  //       id: "overview",
  //       title: "Overview",
  //       body: "Apollo is a software engineering project focused on automating repository workflows by retrieving GitHub context, structuring technical information, and routing AI-generated changes through a human review step before execution.",
  //     },
  //     {
  //       id: "workflow",
  //       title: "Workflow",
  //       body: "The system integrates GitHub APIs with backend services to gather repository data, interpret technical context, and create structured outputs for downstream tasks. Review checkpoints are included to minimize silent errors and give operators control over automated actions.",
  //     },
  //     {
  //       id: "stack",
  //       title: "Stack",
  //       body: "This work used Python, FastAPI, and LangGraph to build the automation layer, with a focus on maintainable service boundaries and reliable execution patterns.",
  //     },
  //     {
  //       id: "impact",
  //       title: "Impact",
  //       body: "The workflow reduced manual project reconciliation time by 80%, helping compress repetitive review work while preserving a clear validation layer for AI-assisted changes.",
  //     },
  //   ],
  // },
  // {
  //   slug: "brivida",
  //   title: "Brivida",
  //   kicker: "AI Services Startup",
  //   summary:
  //     "A second image-led product entry with a distinct composition from Momentum, waiting on a real interface view.",
  //   featured: true,
  //   layout: "editorial",
  //   tags: ["Interface"],
  //   image: {
  //     src: null,
  //     alt: "Brivida interface",
  //     pendingLabel: "Interface view forthcoming",
  //   },
  //   documents: [],
  //   sections: [
  //     {
  //       id: "overview",
  //       title: "Overview",
  //       body: "Layout and visual treatment differ from Momentum so the two interface studies do not read as identical cards. Add the screenshot and a concise description here when available.",
  //     },
  //   ],
  // }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
