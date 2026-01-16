'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useState, useEffect, ReactNode } from 'react';

interface LazyReCaptchaProviderProps {
  children: ReactNode;
}

export default function LazyReCaptchaProvider({
  children,
}: LazyReCaptchaProviderProps) {
  const [shouldLoadRecaptcha, setShouldLoadRecaptcha] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA khi người dùng tương tác với trang
    const handleInteraction = () => {
      setShouldLoadRecaptcha(true);
      // Remove listeners sau khi đã trigger
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    // Listen các sự kiện tương tác
    window.addEventListener('mousemove', handleInteraction, { once: true });
    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  if (!shouldLoadRecaptcha) {
    // Render children without reCAPTCHA provider
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'body',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
