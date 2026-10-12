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
    src: string;
    alt: string;
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
