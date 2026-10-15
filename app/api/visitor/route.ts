import { sendAlert } from "@/lib/sendAlert";
import {
  getClientIp,
  isRateLimited,
  isSameOriginRequest,
} from "@/lib/rate-limit";

const pathnamePattern = /^\/(?!\/)[^\r\n]{0,2047}$/;
const maxRequests = 1;
const windowMs = 10 * 60 * 1000;
const controlCharacters = /[\u0000-\u001f\u007f]/;

function readLocationHeader(
  request: Request,
  name: string,
  maxLength: number,
): string | null {
  const value = request.headers.get(name)?.trim();
  if (!value || value.length > maxLength || controlCharacters.test(value)) {
    return null;
  }

  return value;
}

function getPublicIpLocation(request: Request): string | null {
  if (process.env.VERCEL !== "1") {
    return null;
  }

  const fields: string[] = [];
  const encodedCity = readLocationHeader(request, "x-vercel-ip-city", 300);
  if (encodedCity) {
    try {
      const city = decodeURIComponent(encodedCity);
      if (city && city.length <= 100 && !controlCharacters.test(city)) {
        fields.push(`City: ${city}`);
      }
    } catch {
      // Ignore a malformed city header rather than putting encoded input in the email.
    }
  }

  const region = readLocationHeader(
    request,
    "x-vercel-ip-country-region",
    3,
  );
  if (region && /^[a-z0-9-]+$/i.test(region)) {
    fields.push(`Region: ${region}`);
  }

  const postalCode = readLocationHeader(
    request,
    "x-vercel-ip-postal-code",
    32,
  );
  if (postalCode && /^[a-z0-9 -]+$/i.test(postalCode)) {
    fields.push(`Postal code: ${postalCode}`);
  }

  const country = readLocationHeader(request, "x-vercel-ip-country", 2);
  if (country && /^[a-z]{2}$/i.test(country)) {
    fields.push(`Country: ${country.toUpperCase()}`);
  }

  const latitude = readLocationHeader(request, "x-vercel-ip-latitude", 16);
  const longitude = readLocationHeader(request, "x-vercel-ip-longitude", 16);
  if (latitude && /^-?\d{1,2}(?:\.\d+)?$/.test(latitude)) {
    const value = Number(latitude);
    if (value >= -90 && value <= 90) {
      fields.push(`Latitude: ${latitude}`);
    }
  }
  if (longitude && /^-?\d{1,3}(?:\.\d+)?$/.test(longitude)) {
    const value = Number(longitude);
    if (value >= -180 && value <= 180) {
      fields.push(`Longitude: ${longitude}`);
    }
  }

  const timezone = readLocationHeader(request, "x-vercel-ip-timezone", 64);
  if (timezone && /^[a-z0-9_+/-]+$/i.test(timezone)) {
    fields.push(`Time zone: ${timezone}`);
  }

  return fields.length
    ? `Approximate location (based on public IP, not GPS): ${fields.join("; ")}`
    : null;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const pathname =
    typeof body === "object" &&
    body !== null &&
    "pathname" in body &&
    typeof body.pathname === "string"
      ? body.pathname
      : null;

  if (pathname === null || !pathnamePattern.test(pathname)) {
    return Response.json({ error: "Invalid page path" }, { status: 400 });
  }

  if (isRateLimited(`visitor:${getClientIp(request)}`, maxRequests, windowMs)) {
    return Response.json(
      { error: "Too many visitor alerts. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const location = getPublicIpLocation(request);
    await sendAlert(
      "New website visit",
      [
        `A visitor opened ${pathname}`,
        `Time: ${new Date().toISOString()}`,
        ...(location ? [location] : []),
      ].join("\n"),
    );
    return Response.json({ sent: true });
  } catch (error) {
    console.error("Could not send the visitor email alert.", error);
    return Response.json(
      { error: "Could not send the visitor alert" },
      { status: 500 },
    );
  }
}
