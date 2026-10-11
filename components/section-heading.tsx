export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-6 bg-ink px-5 py-6 text-center text-background sm:mb-8 sm:px-8 sm:py-8">
      <p className="text-xs tracking-[0.2em] text-background uppercase">{eyebrow}</p>
      <div className="mx-auto max-w-4xl">
        <h2 className="mt-2 font-serif text-3xl tracking-tight text-background sm:mt-3 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-background/80 sm:mt-4 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
