import { getActiveExploringTopics } from "@/content/exploring";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";

export function Exploring() {
  const topics = getActiveExploringTopics();

  if (topics.length === 0) {
    return null;
  }

  return (
    <section id="exploring" className="scroll-mt-24 py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="03"
          title="Currently exploring"
          description="A short index of technical topics."
        />
        <ol className="divide-y divide-border border-y border-border">
          {topics.map((topic, index) => (
            <li
              key={topic.id}
              className="grid gap-2 py-5 sm:grid-cols-[4rem_minmax(0,16rem)_1fr] sm:items-baseline"
            >
              <span className="text-xs tracking-[0.16em] text-subtle">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl text-ink">{topic.title}</h3>
              <p className="text-sm leading-6 text-muted">{topic.note}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
