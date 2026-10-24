export const navigationSections = [
  {
    id: "experience",
    label: "Professional Experience",
    keywords: [
      "experience",
      "professional",
      "career",
      "work",
      "job",
      "jobs",
      "work history",
      "internship",
      "intern",
      "industry",
      "resume",
      "role",
      "employment",
    ],
  },
  {
    id: "work",
    label: "Research & Projects",
    keywords: [
      "research",
      "projects",
      "project",
      "papers",
      "paper",
      "selected work",
      "technical",
      "coding",
      "software",
      "machine learning",
      "engineering",
      "portfolio",
      "builds",
      "github",
    ],
  },
  {
    id: "reading",
    label: "Books & Reading",
    keywords: [
      "books",
      "book",
      "reading",
      "bookshelf",
      "novel",
      "novels",
      "shelf",
      "author",
      "literature",
    ],
  },
  {
    id: "exploring",
    label: "Topics I'm Interested In",
    keywords: [
      "interests",
      "interest",
      "topics",
      "topic",
      "exploring",
      "explore",
      "learning",
      "currently",
      "curious",
      "studying",
    ],
  },
  {
    id: "beyond",
    label: "Hobbies & Interests",
    keywords: [
      "hobbies",
      "hobby",
      "beyond",
      "fun",
      "personal",
      "outside",
      "photos",
      "video",
      "life",
    ],
  },
] as const;

export type SectionId = (typeof navigationSections)[number]["id"];

export type NavigationSection = (typeof navigationSections)[number];

export const WELCOME_BUBBLE =
  "Welcome to Yaduvir’s world! What would you like to explore?";

export const HINT_BUBBLE =
  "Try asking about my experience, research, books, interests, or hobbies";

export function sectionSummary(label: string) {
  return `Here’s my ${label} section.`;
}

export function getSectionById(id: SectionId) {
  return navigationSections.find((section) => section.id === id) ?? navigationSections[0];
}

export function sectionIndex(id: SectionId) {
  return navigationSections.findIndex((section) => section.id === id);
}

const MAX_EDIT_DISTANCE = 3;

function minimumSubstringEditDistance(query: string, target: string) {
  let previousRow = Array.from({ length: query.length + 1 }, () => 0);

  for (let targetIndex = 1; targetIndex <= target.length; targetIndex += 1) {
    const currentRow = Array.from({ length: query.length + 1 }, () => 0);
    currentRow[0] = targetIndex;

    for (let queryIndex = 1; queryIndex <= query.length; queryIndex += 1) {
      currentRow[queryIndex] = Math.min(
        currentRow[queryIndex - 1] + 1,
        previousRow[queryIndex] + 1,
        previousRow[queryIndex - 1] +
          (target[targetIndex - 1] === query[queryIndex - 1] ? 0 : 1),
      );
    }

    previousRow = currentRow;
  }

  let minimumDistance = Number.POSITIVE_INFINITY;
  for (const distance of previousRow) {
    minimumDistance = Math.min(minimumDistance, distance);
  }
  return minimumDistance;
}

function keywordScore(query: string, keyword: string) {
  const normalized = keyword.toLowerCase().trim();
  if (!normalized) {
    return 0;
  }

  const maxDistance = Math.min(
    MAX_EDIT_DISTANCE,
    Math.floor(normalized.length / 3),
  );
  const distance = minimumSubstringEditDistance(query, normalized);

  return distance <= maxDistance ? normalized.length - distance : 0;
}

export function matchSection(rawQuery: string): NavigationSection | null {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    return null;
  }

  let best: NavigationSection | null = null;
  let bestScore = 0;

  for (const section of navigationSections) {
    const labelScore = keywordScore(query, section.label);
    const keywordBest = section.keywords.reduce(
      (highest, keyword) => Math.max(highest, keywordScore(query, keyword)),
      0,
    );
    const score = Math.max(labelScore, keywordBest);

    if (score > bestScore) {
      best = section;
      bestScore = score;
    }
  }

  return best;
}
