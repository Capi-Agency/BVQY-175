// Astro API endpoint for reCAPTCHA verification
// Migrated from Next.js API route

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: 'Token is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Verify reCAPTCHA token with Google
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const secretKey = import.meta.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not configured');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Server configuration error',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const res = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await res.json();

    // Check if verification was successful and score is acceptable
    if (!data.success || data.score < 0.5) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'reCAPTCHA verification failed',
          score: data.score,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Verified successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Verification failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
