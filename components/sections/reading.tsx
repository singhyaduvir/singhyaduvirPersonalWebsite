import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { books } from "@/content/reading";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";

const statusLabel = {
  reading: "Reading",
  finished: "Finished",
  queued: "Queued",
} as const;

export function Reading() {
  if (books.length === 0) {
    return null;
  }

  return (
    <section id="reading" className="scroll-mt-24 border-y border-border py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="04"
          title="Reading"
          description="A few books from my shelf."
        />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <li key={book.id} className="flex min-w-0 gap-4">
              <div className="relative h-[14rem] w-[10rem] shrink-0 overflow-hidden border border-border bg-[#ecece8]">
                <Image
                  src={book.cover.src}
                  alt={book.cover.alt}
                  fill
                  sizes="110px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                {book.status ? (
                  <p className="text-xs tracking-[0.16em] text-subtle uppercase">
                    {statusLabel[book.status]}
                  </p>
                ) : null}
                <h3 className="mt-1 font-serif text-xl text-ink">{book.title}</h3>
                <p className="mt-1 text-sm text-muted">{book.author}</p>
                {book.note ? (
                  <p className="mt-3 text-sm leading-6 text-muted">{book.note}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-end">
          <Link
            href="/bookshelf"
            className="inline-flex items-center gap-2 border border-ink px-4 py-2 text-sm text-ink transition-colors hover:bg-ink hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            Full Collection
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
