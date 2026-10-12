import { interests } from "@/content/interests";
import { Container } from "@/components/container";
import { MediaFrame } from "@/components/media-frame";
import { SectionHeading } from "@/components/section-heading";

export function BeyondWork() {
  if (interests.length === 0) {
    return null;
  }

  return (
    <section id="beyond" className="scroll-mt-24 py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="05"
          title="Beyond work"
          description="Things I enjoy outside of work."
        />
        <ul className="grid gap-10 md:grid-cols-2">
          {interests.map((interest) => (
            <li key={interest.id}>
              {interest.video ? (
                <div className="relative aspect-[4/3] overflow-hidden border border-border bg-[#ecece8]">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={`${interest.title} video, playing without audio`}
                  >
                    <source src={interest.video.src} type={interest.video.type} />
                  </video>
                </div>
              ) : interest.image ? (
                <MediaFrame
                  src={interest.image.src}
                  alt={interest.image.alt}
                  title={interest.title}
                  aspect="photo"
                />
              ) : null}
              <h3 className="mt-4 font-serif text-2xl text-ink">{interest.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{interest.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
