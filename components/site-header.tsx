"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/content/site";
import { hasHref } from "@/lib/links";
import { Container } from "@/components/container";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border bg-background ${
        pathname === "/" ? "home-entry-header" : ""
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          {hasHref(site.links.resume) ? (
            <a
              href={site.links.resume}
              className="border border-ink px-3 py-1.5 text-ink transition-colors hover:bg-ink hover:text-background"
            >
              Resume
            </a>
          ) : (
            <Link
              href="/#contact"
              className="border border-ink px-3 py-1.5 text-ink transition-colors hover:bg-ink hover:text-background"
            >
              Resume
            </Link>
          )}
        </nav>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center border border-border text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </Container>
      {open ? (
        <div id="mobile-navigation" className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-base text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {hasHref(site.links.resume) ? (
              <a href={site.links.resume} className="py-2 text-base text-ink">
                Resume
              </a>
            ) : (
              <Link
                href="/#contact"
                className="py-2 text-base text-ink"
                onClick={() => setOpen(false)}
              >
                Resume
              </Link>
            )}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
