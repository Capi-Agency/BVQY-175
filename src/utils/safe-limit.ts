// Page size for queries reachable from the browser (server actions in src/services): any caller can
// send any argument, so never more than MAX items per request and never "-1" (= all items).
const MAX = 100;
export function safeLimit(limit: unknown, fallback = 12): number {
  const n = Math.trunc(Number(limit));
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(n, MAX);
}
