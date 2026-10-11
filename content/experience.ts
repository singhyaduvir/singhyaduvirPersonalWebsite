/**
 * Professional experience.
 *
 * These entries reflect the current resume and are intentionally kept at a
 * high level without sharing proprietary client artifacts.
 */

export type Experience = {
  id: string;
  organization: string;
  context: string;
  role: string;
  dates: string | null;
  summary: string;
  points: string[];
  logo: {
    src: string;
    alt: string;
  };
  confidentialityNote?: string;
};

export const experiences: Experience[] = [
  {
    id: "pwc",
    organization: "PwC",
    context: "Consulting",
    role: "Data Engineering Intern",
    dates: "June 2026 - August 2026",
    summary:
      "Worked as a consulting intern building data-processing tools and troubleshooting operational pipeline issues in a client-oriented environment.",
    points: [
      "Developed Python data-processing tools to automate repetitive workflows and improve consistency across downstream systems.",
      "Debugged pipeline failures and data inconsistencies by tracing errors, testing corrective changes, and validating outputs against project requirements.",
      "Collaborated with stakeholders to translate operational requirements into maintainable software solutions under project deadlines.",
    ],
    logo: {
      src: "/images/companies/pwc-logo.png",
      alt: "PwC logo",
    },
    confidentialityNote:
      "Client-oriented work. Proprietary code, internal deliverables, and client materials are not shared here.",
  },
  {
    id: "johnson-johnson",
    organization: "Johnson & Johnson",
    context: "The Data Mine · Project Data Sphere",
    role: "Machine Learning Researcher",
    dates: "August 2025 - December 2025",
    summary:
      "Conducted undergraduate research on making heterogeneous clinical-trial datasets more consistent for machine learning and cross-trial analysis.",
    points: [
      "Built Python and R pipelines to preprocess, integrate, and validate heterogeneous clinical trial datasets.",
      "Developed LLM-assisted data transformation workflows for schema mapping, terminology normalization, and automated processing of inconsistent source data.",
      "Tested AI-generated transformations against source records, debugged discrepancies, and refined validation procedures to improve reliability.",
    ],
    logo: {
      src: "/images/companies/johnson-and-johnson-logo.png",
      alt: "Johnson & Johnson logo",
    },
    confidentialityNote:
      "Research context. Proprietary code, deliverables, and restricted clinical materials are not shared here.",
  },
];
