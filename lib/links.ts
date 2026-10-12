import { site } from "@/content/site";

export function hasHref(value: string | null | undefined): value is string {
  return Boolean(value && value.trim().length > 0);
}

export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}

export function getOpenGraphUrl(): string | undefined {
  if (hasHref(site.metadata.url)) {
    return site.metadata.url;
  }

  if (hasHref(process.env.SITE_URL)) {
    return process.env.SITE_URL;
  }

  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return hasHref(vercelUrl) ? `https://${vercelUrl}` : undefined;
}
