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
    title: "Large language models",
    note: "Exploring LLM-assisted workflows for schema mapping and terminology normalization.",
    active: true,
  },
  {
    id: "ml-eval",
    title: "Machine learning evaluation",
    note: "Analyzing model accuracy, confidence, and misclassification patterns.",
    active: true,
  },
];

export function getActiveExploringTopics(): ExploringTopic[] {
  return exploringTopics.filter((topic) => topic.active);
}
