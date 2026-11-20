'use client';
// useSearchParams() on a static (ISR) page makes Next drop everything up to the nearest <Suspense>
// to client rendering: here the boundary of the whole page in [locale]/layout.tsx, so the HTML sent
// had a spinner instead of the page (bad for SEO). The components that read the query string are
// wrapped with withSearchParams(): the server renders them with empty search params (the same HTML
// as a URL without a query string), the browser then renders them with the real ones.
//   const searchParams = usePageSearchParams();      // instead of useSearchParams()
//   export default withSearchParams(MyComponent);
import { useSearchParams } from 'next/navigation';
import { ComponentType, createContext, ReactNode, Suspense, useContext } from 'react';

const EMPTY = new URLSearchParams();
const Ctx = createContext<URLSearchParams | null>(null);

export function usePageSearchParams(): URLSearchParams {
  return useContext(Ctx) ?? EMPTY;
}

function Live({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  return <Ctx.Provider value={searchParams as unknown as URLSearchParams}>{children}</Ctx.Provider>;
}

export function withSearchParams<P extends object>(Component: ComponentType<P>) {
  function WithSearchParams(props: P) {
    return (
      <Suspense
        fallback={
          <Ctx.Provider value={EMPTY}>
            <Component {...props} />
          </Ctx.Provider>
        }
      >
        <Live>
          <Component {...props} />
        </Live>
      </Suspense>
    );
  }
  WithSearchParams.displayName = `withSearchParams(${Component.displayName || Component.name || 'Component'})`;
  return WithSearchParams;
}
