import { site } from "@/content/site";

export function hasHref(value: string | null | undefined): value is string {
  return Boolean(value && value.trim().length > 0);
}

export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}

export function getOpenGraphUrl(): string | undefined {
  return hasHref(site.metadata.url) ? site.metadata.url : undefined;
}
