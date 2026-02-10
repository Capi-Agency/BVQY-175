'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useState, ReactNode, useCallback } from 'react';

interface OnDemandReCaptchaProviderProps {
  children: (loadRecaptcha: () => void) => ReactNode;
}

/**
 * Chỉ load script reCAPTCHA khi được gọi thông qua callback loadRecaptcha()
 */
export default function OnDemandReCaptchaProvider({
  children,
}: OnDemandReCaptchaProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadRecaptcha = useCallback(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <>{children(loadRecaptcha)}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={
        import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY ||
        import.meta.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
        ''
      }
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'body',
      }}
    >
      {children(loadRecaptcha)}
    </GoogleReCaptchaProvider>
  );
}
