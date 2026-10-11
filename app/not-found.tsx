import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-xs tracking-[0.18em] text-subtle uppercase">404</p>
      <h1 className="mt-4 font-serif text-5xl text-ink">Page not found</h1>
      <p className="mt-4 max-w-md text-muted">
        That URL is not part of this site. Return home or browse selected work.
      </p>
      <div className="mt-8 flex gap-6 text-sm">
        <Link href="/" className="border-b border-ink pb-0.5 text-ink">
          Home
        </Link>
        <Link href="/#work" className="border-b border-ink pb-0.5 text-ink">
          Selected work
        </Link>
      </div>
    </Container>
  );
}
