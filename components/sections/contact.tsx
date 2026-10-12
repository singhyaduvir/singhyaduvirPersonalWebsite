import { site } from "@/content/site";
import { hasHref, mailtoHref } from "@/lib/links";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { ExternalLink } from "@/components/external-link";
import { SectionHeading } from "@/components/section-heading";

export function Contact() {
  const email = site.links.email;
  const github = site.links.github;
  const resume = site.links.resume;
  const linkedin = site.links.linkedin;

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-12 sm:py-16">
      <Container>
        <SectionHeading eyebrow="06" title="Contact" />
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="font-serif text-3xl leading-snug text-ink sm:text-4xl lg:col-span-6">
            The most reliable way to reach me right now is by email or LinkedIn.
          </p>
          <ul className="space-y-4 text-base lg:col-span-5 lg:col-start-8">
            {hasHref(linkedin) ? (
              <li className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <span className="text-subtle">LinkedIn</span>
                <ExternalLink href={linkedin}>Profile</ExternalLink>
              </li>
            ) : null}
            {hasHref(github) ? (
              <li className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <span className="text-subtle">GitHub</span>
                <ExternalLink href={github}>Repository</ExternalLink>
              </li>
            ) : null}
            {hasHref(email) ? (
              <li className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <span className="text-subtle">Email</span>
                <a href={mailtoHref(email)} className="border-b border-ink pb-0.5">
                  {email}
                </a>
              </li>
            ) : null}
            {hasHref(resume) ? (
              <li className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <span className="text-subtle">Resume</span>
                <a href={resume} className="border-b border-ink pb-0.5">
                  Download PDF
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="mt-12 max-w-2xl">
          <h3 className="mb-5 font-serif text-2xl text-ink">Send me a message</h3>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
