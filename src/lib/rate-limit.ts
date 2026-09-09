import { createHash } from "crypto";

const windows = new Map<string, { count: number; expires: number }>();
// Atomic, shared counters in production; local counters for development only.
export async function allowRequest(scope: string, identity: string, limit: number, seconds: number) {
  const bucket = Math.floor(Date.now() / (seconds * 1000));
  const hash = createHash("sha256").update(identity).digest("hex");
  const key = `portfolio:${scope}:${hash}:${bucket}`;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["EVAL", "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; return n", "1", key, String(seconds)]),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Rate limiter unavailable");
    const data = await response.json();
    if (typeof data.result !== "number") throw new Error("Invalid rate limiter response");
    return data.result <= limit;
  }
  if (process.env.NODE_ENV === "production") throw new Error("Rate limiter is not configured");
  windows.forEach((value, key) => { if (value.expires <= Date.now()) windows.delete(key); });
  const current = windows.get(key) ?? { count: 0, expires: (bucket + 1) * seconds * 1000 };
  current.count++;
  windows.set(key, current);
  return current.count <= limit;
}

export function requestIdentity(headers: Headers) {
  // Vercel overwrites this header. Other deployments share a conservative global limit.
  return process.env.VERCEL ? headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "global" : "global";
}
