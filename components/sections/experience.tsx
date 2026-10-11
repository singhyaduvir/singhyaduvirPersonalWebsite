import Image from "next/image";
import { experiences } from "@/content/experience";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-y border-border py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="01"
          title="Professional experience"
          description="My time in industry."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {experiences.map((item) => (
            <article key={item.id} className="relative flex flex-col border border-border bg-surface p-5 pr-24 sm:p-6 sm:pr-28">
              <Image
                src={item.logo.src}
                alt={item.logo.alt}
                width={72}
                height={56}
                className="absolute right-5 top-5 h-14 w-16 object-contain sm:right-6 sm:top-6 sm:h-14 sm:w-[4.5rem]"
              />
              <p className="text-xs tracking-[0.16em] text-subtle uppercase">{item.context}</p>
              <h3 className="mt-2 font-serif text-3xl text-ink">{item.organization}</h3>
              <p className="mt-2 text-sm text-muted">{item.role}</p>
              {item.dates ? <p className="mt-1 text-sm text-subtle">{item.dates}</p> : null}
              <p className="mt-4 text-sm leading-6 text-foreground">{item.summary}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
                {item.points.map((point) => (
                  <li key={point} className="border-l border-border pl-3">
                    {point}
                  </li>
                ))}
              </ul>
              {item.confidentialityNote ? (
                <p className="mt-5 text-xs leading-5 text-subtle">{item.confidentialityNote}</p>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
