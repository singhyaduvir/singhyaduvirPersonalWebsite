/**
 * Currently exploring.
 *
 * These are configurable topic entries, not a claim that every item is an
 * active research program. Set `active` to true only for topics you want
 * listed. Add a short `note` when you have a specific investigation to name.
 */

export type ExploringTopic = {
  id: string;
  title: string;
  note: string;
  active: boolean;
};

export const exploringTopics: ExploringTopic[] = [
  {
    id: "llms",
    title: "CAD Implementation with LLMs",
    note: "Exploring LLM-assisted CAD softwares for smooth, fast, accurate generation of 3D models applicable in any industry.",
    active: true,
  },
  {
    id: "ml-eval",
    title: "Healthcare data security",
    note: "How to maintain secure platforms for handling sensitive healthcare information.",
    active: true,
  },
];

export function getActiveExploringTopics(): ExploringTopic[] {
  return exploringTopics.filter((topic) => topic.active);
}
