import { sendAlert } from "@/lib/sendAlert";
import {
  getClientIp,
  isRateLimited,
  isSameOriginRequest,
} from "@/lib/rate-limit";

const pathnamePattern = /^\/(?!\/)[^\r\n]{0,2047}$/;
const maxRequests = 1;
const windowMs = 10 * 60 * 1000;

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
    await sendAlert(
      "New website visit",
      `A visitor opened ${pathname}\nTime: ${new Date().toISOString()}`,
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
