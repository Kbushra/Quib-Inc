import { emails } from "@/lib/site";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_IPS = 5_000;

type Bucket = { count: number; resetAt: number };

// Best-effort, per-instance limiter. Serverless instances do not share this map.
const buckets = new Map<string, Bucket>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    if (buckets.size >= MAX_TRACKED_IPS) {
      const oldest = buckets.keys().next().value;
      if (oldest) buckets.delete(oldest);
    }
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (bucket.count >= MAX_PER_WINDOW) return true;
  bucket.count += 1;
  return false;
}

function hasValidOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  const expected = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!expected) return false;
  return originHost === expected.split(",")[0].trim();
}

function clean(value: unknown, max: number, keepNewlines = false) {
  const raw = typeof value === "string" ? value : "";
  const stripped = keepNewlines
    ? raw.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "")
    : raw.replace(/[\u0000-\u001F\u007F]/g, "");
  const normalised = keepNewlines ? stripped : stripped.replace(/\s+/g, " ");
  return normalised.trim().slice(0, max);
}

function tokenFor(destination: unknown) {
  if (destination === emails.quib) return process.env.EMAIL_KEY_AAQIB;
  if (destination === emails.mediaocre) return process.env.EMAIL_KEY_MEDIAOCRE;
  return undefined;
}

export async function POST(request: Request) {
  if (!hasValidOrigin(request)) {
    return Response.json({ message: "Invalid request origin." }, { status: 403 });
  }

  if (rateLimited(clientKey(request))) {
    return Response.json(
      { message: "Too many messages. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ message: "Could not read that message." }, { status: 400 });
  }

  const knownRecipient = body.dest === emails.quib || body.dest === emails.mediaocre;
  if (!knownRecipient) {
    return Response.json({ message: "Unknown recipient." }, { status: 400 });
  }

  const token = tokenFor(body.dest);
  if (!token) {
    return Response.json(
      { message: "The form isn't set up to send mail yet. Email us directly instead." },
      { status: 503 },
    );
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const subject = clean(body.subject, 100);
  const content = clean(body.content, 1500, true);

  if (!name || !content) {
    return Response.json({ message: "Name and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ message: "Please enter a valid email." }, { status: 400 });
  }

  try {
    const response = await fetch("https://postmail.invotes.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        access_token: token,
        subject: subject || `Message from ${name}`,
        text: `Message from ${name} <${email}>:\n\n${content}`,
      }),
    });

    if (!response.ok) {
      return Response.json({ message: "The mail service is unavailable. Please try again." }, { status: 502 });
    }

    return Response.json({ message: "Message sent." });
  } catch {
    return Response.json({ message: "Could not reach the mail service. Try again soon." }, { status: 502 });
  }
}
