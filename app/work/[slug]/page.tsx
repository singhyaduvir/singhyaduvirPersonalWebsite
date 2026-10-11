import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/content/projects";
import { Container } from "@/components/container";
import { MediaFrame } from "@/components/media-frame";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const leadImageAspect =
    project.previewAspect ??
    (project.layout === "image-forward" ? "wide" : "photo");

  return (
    <article className="pb-24">
      <header className="border-b border-border py-12 sm:py-16">
        <Container>
          <div className="flex items-start gap-5">
            <Link
              href="/#work"
              aria-label="Back to selected work"
              className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center text-ink transition-transform hover:-translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
              >
                <path
                  d="M16 4 7 12l9 8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <div>
              <p className="text-xs tracking-[0.18em] text-subtle uppercase">{project.kicker}</p>
              <h1 className="mt-3 font-serif text-5xl text-ink sm:text-6xl">{project.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{project.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2 text-xs text-muted">
                {project.tags.map((tag) => (
                  <li key={tag} className="border border-border px-2 py-1">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </header>

      {project.excerpts?.length ? (
        <Container className="mt-10">
          <section aria-labelledby="presentation-excerpts-heading">
            <h2
              id="presentation-excerpts-heading"
              className="mb-5 font-serif text-2xl text-ink sm:text-3xl"
            >
              {project.excerptTitle ?? "Presentation excerpts"}
            </h2>
            <div
              className={`grid gap-5 sm:gap-6 ${project.excerptColumns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
            >
              {project.excerpts.map((excerpt) => (
                <figure key={excerpt.src} className="space-y-3">
                  <Image
                    src={excerpt.src}
                    alt={excerpt.alt}
                    width={excerpt.width ?? 2464}
                    height={excerpt.height ?? 1374}
                    sizes={
                      project.excerptColumns === 3
                        ? "(max-width: 640px) 100vw, 33vw"
                        : "(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 576px"
                    }
                    className="h-auto w-full border border-border bg-white"
                  />
                  <figcaption className="text-sm text-muted">{excerpt.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </Container>
      ) : (
        <Container className="mt-10">
          <MediaFrame
            src={project.image.src}
            alt={project.image.alt}
            pendingLabel={project.image.pendingLabel}
            title={project.title}
            aspect={leadImageAspect}
            priority
            className={project.layout === "image-offset" ? "lg:ml-[16.66%] lg:w-2/3" : ""}
          />
        </Container>
      )}

      <Container className="mt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            {project.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="font-serif text-2xl text-ink sm:text-3xl">{section.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{section.body}</p>
              </section>
            ))}
          </div>
          <aside className="lg:col-span-4">
            <div className="border border-border bg-surface p-6">
              <h2 className="text-xs tracking-[0.16em] text-subtle uppercase">
                Presentation and artifacts
              </h2>
              {project.documents.length > 0 ? (
                <ul className="mt-5 space-y-4">
                  {project.documents.map((document) => (
                    <li key={document.label} className="text-sm">
                      {document.href ? (
                        <a
                          href={document.href}
                          className="border-b border-ink pb-0.5 text-ink"
                        >
                          {document.label}
                        </a>
                      ) : (
                        <p className="text-foreground">{document.label}</p>
                      )}
                      {document.note ? (
                        <p className="mt-1 text-xs leading-5 text-subtle">{document.note}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-6 text-muted">
                  No files are attached yet. PDFs can be added in public/documents/ and linked from this project’s data entry.
                </p>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
