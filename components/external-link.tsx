import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 border-b border-transparent transition-colors hover:border-ink ${className}`}
    >
      {children}
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
    </a>
  );
}
