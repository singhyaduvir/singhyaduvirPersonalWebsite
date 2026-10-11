export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="border border-dashed border-border bg-surface px-6 py-12 sm:px-10">
      <p className="font-serif text-2xl text-ink">{title}</p>
      <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}
