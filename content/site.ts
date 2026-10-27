/**
 * Personal site configuration.
 *
 * Fill in the null fields when you have the real values. Navigation, metadata,
 * and the contact section read from this file only — you should not need to
 * edit page components to add a resume, GitHub URL, or email.
 *
 * Resume: place a PDF in `public/documents/` and set `links.resume` to that
 * public path, e.g. "/documents/Yaduvir_Singh_Resume.pdf".
 * GitHub: set `links.github` to a full https URL.
 * Email: set `links.email` to a mailto-ready address (no "mailto:" prefix).
 */

export const site = {
  name: "Yaduvir Singh",
  shortName: "Yaduvir",
  headline:
    "Undergraduate at Purdue University studying Computer Science, Data Science, and Mathematics.",
  roleFocus:
    "Interested in machine learning engineering, software engineering, AI engineering, and applied AI.",
  location: "Purdue University",
  bio: "I am an undergraduate at Purdue University studying Computer Science, Data Science, and Mathematics. My work spans data engineering, machine learning, software development, and applied research, with a focus on building careful, practical systems at the intersection of data and AI.",
  links: {
    linkedin: "https://linkedin.com/in/yaduvir-singh-938759328/",
    github: null as string | null,
    email: "singhyaduvir2006@gmail.com",
    resume: "/documents/Singh_Yaduvir_Official_Resume.pdf",
  },
  metadata: {
    title: "Yaduvir Singh",
    description:
      "Personal site of Yaduvir Singh, an undergraduate at Purdue University working across machine learning, software, and applied AI.",
    url: null as string | null,
  },
} as const;

export type SiteConfig = typeof site;

export const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#exploring", label: "Exploring" },
  { href: "/#reading", label: "Reading" },
  { href: "/#beyond", label: "Beyond" },
  { href: "/#contact", label: "Contact" },
] as const;
