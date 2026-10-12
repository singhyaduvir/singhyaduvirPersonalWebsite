import { sendAlert } from "@/lib/sendAlert";

const maxRequests = 5;
const windowMs = 10 * 60 * 1000;
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const controlCharacters = /[\u0000-\u001f\u007f]/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isRateLimited(ip: string, now: number) {
  const current = rateLimits.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (current.count >= maxRequests) {
    return true;
  }

  current.count += 1;
  return false;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isRecord(body)) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    return Response.json({ ok: true });
  }

  const { name, email, message } = body;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (
    !trimmedName ||
    !trimmedEmail ||
    !trimmedMessage ||
    trimmedName.length > 100 ||
    trimmedEmail.length > 254 ||
    trimmedMessage.length > 2000 ||
    controlCharacters.test(trimmedName) ||
    !emailPattern.test(trimmedEmail)
  ) {
    return Response.json(
      { error: "Please provide a valid name, email, and message." },
      { status: 400 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip, Date.now())) {
    return Response.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  try {
    await sendAlert(
      `New message from ${trimmedName}`,
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`,
      trimmedEmail,
    );
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Could not send the contact form alert.", error);
    return Response.json(
      { error: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
