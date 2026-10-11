import { getFeaturedProjects } from "@/content/projects";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";

export function SelectedWork() {
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="scroll-mt-24 py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="02"
          title="Selected work"
          description="My technical pursuits."
        />
        <div className="flex flex-col gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
