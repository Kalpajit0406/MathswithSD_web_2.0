/**
 * In-memory sliding window rate limiter for spam mitigation.
 * Limits submissions per IP address within a configurable time window.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const ipMap = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically (every 10 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipMap.entries()) {
      const recent = record.timestamps.filter((ts) => now - ts < 15 * 60 * 1000);
      if (recent.length === 0) {
        ipMap.delete(ip);
      } else {
        record.timestamps = recent;
      }
    }
  }, 10 * 60 * 1000);
}

export interface RateLimitOptions {
  limit?: number; // max requests allowed in window (default 5)
  windowMs?: number; // window duration in ms (default 10 minutes)
}

export function checkRateLimit(
  ip: string,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const limit = options.limit ?? 5;
  const windowMs = options.windowMs ?? 10 * 60 * 1000;
  const now = Date.now();

  const record = ipMap.get(ip) || { timestamps: [] };
  // Filter out timestamps outside current window
  const activeTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (activeTimestamps.length >= limit) {
    const oldest = activeTimestamps[0];
    const retryAfterMs = windowMs - (now - oldest);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  activeTimestamps.push(now);
  ipMap.set(ip, { timestamps: activeTimestamps });

  return {
    allowed: true,
    remaining: limit - activeTimestamps.length,
    retryAfterSeconds: 0,
  };
}
