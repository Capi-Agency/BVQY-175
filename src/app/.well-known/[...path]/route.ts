// /.well-known/* has nothing on this site. Without this route the request fell through to
// [locale]/[slug] and answered 200 with an HTML page, which Lighthouse reads as an invalid
// ARD manifest (/.well-known/ard.json) instead of "no manifest" (Not Applicable).
const notFound = () =>
  new Response('Not Found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });

export const GET = notFound;
export const HEAD = notFound;
