import { timingSafeEqual } from 'node:crypto';

/** Constant-time comparison; false when the expected secret is not configured. */
export function secretMatches(given: string | null | undefined, expected: string | undefined): boolean {
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function bearer(req: Request): string | null {
  const h = req.headers.get('authorization') || '';
  return h.startsWith('Bearer ') ? h.slice(7) : req.headers.get('x-revalidate-secret');
}
