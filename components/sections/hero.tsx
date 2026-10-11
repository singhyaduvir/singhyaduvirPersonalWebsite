import { site } from "@/content/site";
import { hasHref, mailtoHref } from "@/lib/links";
import { Container } from "@/components/container";
import { ExternalLink } from "@/components/external-link";

export function Hero() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-border py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.2em] text-subtle uppercase">Portfolio</p>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
              {site.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{site.headline}</p>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="text-base leading-7 text-foreground">{site.bio}</p>
            <p className="mt-4 text-sm leading-6 text-muted">{site.roleFocus}</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink">
              <li>
                <a href="#work" className="border-b border-ink pb-0.5">
                  Selected work
                </a>
              </li>
              {hasHref(site.links.resume) ? (
                <li>
                  <a href={site.links.resume} className="border-b border-ink pb-0.5">
                    Resume
                  </a>
                </li>
              ) : null}
              {hasHref(site.links.linkedin) ? (
                <li>
                  <ExternalLink href={site.links.linkedin}>LinkedIn</ExternalLink>
                </li>
              ) : null}
              {hasHref(site.links.github) ? (
                <li>
                  <ExternalLink href={site.links.github}>GitHub</ExternalLink>
                </li>
              ) : null}
              {hasHref(site.links.email) ? (
                <li>
                  <a href={mailtoHref(site.links.email)} className="border-b border-ink pb-0.5">
                    Email
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
