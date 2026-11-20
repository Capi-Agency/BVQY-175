'use server';
// Server actions: the forms (browser components) call these on the server of this app, which writes
// to the CMS with the website token (anonymous visitors can no longer create items, CMS M21).
// - data is sent as JSON (REST createItem), never pasted into a GraphQL string (a quote in a message
//   broke the request, and could add other fields);
// - ip_address comes from the request headers here, not from the browser.
// The website cannot read tickets back: Directus answers 204 without data, so success = true.
import { createItem } from '@directus/sdk';
import { headers } from 'next/headers';
import { directusClientWithRest } from '@/src/lib/directus';

export interface ContactInfo {
  title?: string | null
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ReviewInfo {
  title?: string | null
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  rating: number | null;
}

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function clientIp(): Promise<string | null> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || h.get('x-real-ip') || null;
}

export const fnSendContact = async ({ title, name, email, phone, message }: ContactInfo): Promise<boolean> => {
  try {
    await directusClientWithRest.request(createItem('contact_tickets', {
      title: text(title, 255) || null,
      full_name: text(name, 255),
      email: text(email, 255),
      phone_number: text(phone, 50),
      message: text(message, 5000),
      ip_address: await clientIp(),
    }));
    return true;
  } catch (error) {
    console.log("Error sending contact: ", error)
    throw new Error('Không gửi được yêu cầu, vui lòng thử lại.');
  }
}

export const fnSendReview = async ({ title, name, email, phone, message, rating }: ReviewInfo): Promise<boolean> => {
  try {
    const r = Math.round(Number(rating));
    await directusClientWithRest.request(createItem('quality_assessment', {
      title: text(title, 255) || null,
      full_name: text(name, 255),
      email: text(email, 255),
      phone_number: text(phone, 50),
      message: text(message, 5000) || null,
      rating: Number.isFinite(r) && r >= 1 && r <= 5 ? r : null,
      ip_address: await clientIp(),
    }));
    return true;
  } catch (error) {
    console.log("Error sending review: ", error)
    throw new Error('Không gửi được đánh giá, vui lòng thử lại.');
  }
}
