import { sendAlert } from "@/lib/sendAlert";

const pathnamePattern = /^\/(?!\/)[^\r\n]{0,2047}$/;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
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
