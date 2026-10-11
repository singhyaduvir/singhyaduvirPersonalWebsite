import Link from "next/link";
import { site } from "@/content/site";
import { hasHref } from "@/lib/links";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name}
          <span className="mx-2 text-border">/</span>
          Purdue University
        </p>
        <div className="flex flex-wrap gap-5">
          <Link href="/#work" className="hover:text-ink">
            Work
          </Link>
          {hasHref(site.links.linkedin) ? (
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              LinkedIn
            </a>
          ) : null}
          {hasHref(site.links.github) ? (
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              GitHub
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
