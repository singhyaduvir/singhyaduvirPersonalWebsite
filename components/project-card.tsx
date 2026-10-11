import Link from "next/link";
import type { Project } from "@/content/projects";
import { MediaFrame } from "@/components/media-frame";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");
  const numberLabelClass =
    "absolute left-4 top-4 z-10 text-[10px] tracking-[0.18em] text-subtle uppercase sm:left-5 sm:top-5";

  if (project.layout === "image-forward") {
    return (
      <article className="group relative transition-colors">
        <p className={numberLabelClass}>{number}</p>
        <div className="pt-8">
          <ProjectPreview project={project} aspect={project.previewAspect ?? "wide"} />
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.16em] text-subtle uppercase">
                {project.kicker}
              </p>
              <h3 className="mt-1 font-serif text-3xl text-ink">{project.title}</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted">{project.summary}</p>
          </div>
        </div>
      </article>
    );
  }

  if (project.layout === "image-offset") {
    return (
      <article className="group relative grid items-end gap-8 lg:grid-cols-12">
        <p className={numberLabelClass}>{number}</p>
        <div className="pt-8 lg:col-span-4 lg:col-start-2 lg:pt-10">
          <p className="text-xs tracking-[0.16em] text-subtle uppercase">{project.kicker}</p>
          <h3 className="mt-3 font-serif text-4xl text-ink">{project.title}</h3>
          <p className="mt-4 text-sm leading-6 text-muted">{project.summary}</p>
        </div>
        <div className="lg:col-span-14 lg:col-start-6">
          <ProjectPreview project={project} aspect={project.previewAspect ?? "photo"} />
        </div>
      </article>
    );
  }

  if (project.layout === "editorial") {
    return (
      <article className="relative grid gap-6 border border-border bg-surface p-5 sm:gap-8 sm:p-7 lg:grid-cols-12 lg:p-8">
        <p className={numberLabelClass}>{number}</p>
        <div className="pt-8 lg:col-span-5 lg:pt-9">
          <p className="text-xs tracking-[0.16em] text-subtle uppercase">{project.kicker}</p>
          <h3 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{project.title}</h3>
          <p className="mt-4 text-base leading-7 text-muted">{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
            {project.tags.map((tag) => (
              <li key={tag} className="border border-border px-2 py-1">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ProjectPreview project={project} aspect={project.previewAspect ?? "photo"} />
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col border border-border bg-surface">
      <p className={numberLabelClass}>{number}</p>
      <div className="pt-8">
        <ProjectPreview project={project} aspect="photo" />
      </div>
      <div className="flex flex-1 flex-col p-5 pt-6">
        <p className="text-xs tracking-[0.16em] text-subtle uppercase">{project.kicker}</p>
        <h3 className="mt-2 font-serif text-2xl text-ink">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">{project.summary}</p>
      </div>
    </article>
  );
}

function ProjectPreview({
  project,
  aspect,
}: {
  project: Project;
  aspect: "wide" | "photo" | "square" | "landscape";
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group/preview relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      aria-label={`View ${project.title} project`}
    >
      <MediaFrame
        src={project.image.src}
        alt={project.image.alt}
        pendingLabel={project.image.pendingLabel}
        title={project.title}
        aspect={aspect}
        video={project.video}
        className="transition-transform duration-300 group-hover/preview:scale-[1.02] group-focus-visible/preview:scale-[1.02]"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-ink/35 text-sm font-medium text-background opacity-0 transition-opacity duration-200 group-hover/preview:opacity-100 group-focus-visible/preview:opacity-100">
        Explore project <span aria-hidden="true" className="ml-2">↗</span>
      </span>
    </Link>
  );
}
