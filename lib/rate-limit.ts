const requests = new Map<string, { count: number; resetAt: number }>();
const maxTrackedKeys = 10_000;

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host");

  if (!origin || !host) {
    return false;
  }

  try {
    const originUrl = new URL(origin);
    const forwardedProtocol = request.headers
      .get("x-forwarded-proto")
      ?.split(",")[0]
      ?.trim();
    const protocol = forwardedProtocol
      ? `${forwardedProtocol.replace(/:$/, "")}:`
      : new URL(request.url).protocol;

    return (
      (protocol === "http:" || protocol === "https:") &&
      originUrl.origin === `${protocol}//${host.toLowerCase()}`
    );
  } catch {
    return false;
  }
}

export function isRateLimited(
  key: string,
  maxRequests: number,
  windowMs: number,
  now = Date.now(),
): boolean {
  const current = requests.get(key);

  if (current && current.resetAt > now) {
    if (current.count >= maxRequests) {
      return true;
    }

    current.count += 1;
    return false;
  }

  if (requests.size >= maxTrackedKeys) {
    const oldestKey = requests.keys().next().value;
    if (oldestKey !== undefined) {
      requests.delete(oldestKey);
    }
  }

  requests.set(key, { count: 1, resetAt: now + windowMs });
  return false;
}

export function getClientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",").at(-1)?.trim();
  return forwardedIp || "unknown";
}
