import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { books } from "@/content/reading";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Full Collection",
  description: "My current and past reads.",
};

export default function BookshelfPage() {
  if (books.length === 0) {
    notFound();
  }

  return (
    <article className="pb-24">
      <header className="border-b border-border py-12 sm:py-16">
        <Container>
          <div className="flex items-start gap-5">
            <Link
              href="/#reading"
              aria-label="Back to bookshelf"
              className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center text-ink transition-transform hover:-translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <ArrowLeft aria-hidden="true" className="size-7" />
            </Link>
            <div>
              <p className="text-xs tracking-[0.18em] text-subtle uppercase">Bookshelf</p>
              <h1 className="mt-3 font-serif text-5xl text-ink sm:text-6xl">
                Full Collection
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                My current and past reads.
              </p>
            </div>
          </div>
        </Container>
      </header>

      <Container className="mt-8 sm:mt-12">
        <ul className="divide-y divide-border">
          {books.map((book, index) => (
            <li
              key={book.id}
              className="grid gap-7 py-8 first:pt-0 sm:gap-10 md:grid-cols-12 md:py-10"
            >
              <div className="flex gap-5 md:col-span-5">
                <div className="relative h-52 w-36 shrink-0 overflow-hidden border border-border bg-[#ecece8] sm:h-60 sm:w-40">
                  <Image
                    src={book.cover.src}
                    alt={book.cover.alt}
                    fill
                    sizes="(max-width: 640px) 144px, 160px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 self-center">
                  <p className="text-xs tracking-[0.16em] text-subtle uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  {book.status ? (
                    <p className="mt-3 text-xs tracking-[0.16em] text-subtle uppercase">
                      {book.status}
                    </p>
                  ) : null}
                  <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
                    {book.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{book.author}</p>
                </div>
              </div>
              <section
                aria-labelledby={`review-${book.id}`}
                className="md:col-span-6 md:col-start-7 md:border-l md:border-border md:pl-8"
              >
                <h3
                  id={`review-${book.id}`}
                  className="text-xs tracking-[0.16em] text-subtle uppercase"
                >
                  My review
                </h3>
                {book.review || book.note ? (
                  <p className="mt-4 text-sm leading-7 text-muted">
                    {book.review ?? book.note}
                  </p>
                ) : null}
              </section>
            </li>
          ))}
        </ul>
      </Container>
    </article>
  );
}
