import vi from '../messages/vi.json';
import en from '../messages/en.json';

const messages: Record<string, any> = {
  vi,
  en,
};

export function getMessages(locale: string) {
  return messages[locale] || messages.vi;
}

export function translate(locale: string, key: string, namespace?: string) {
  const msgs = getMessages(locale);
  const fullKey = namespace ? `${namespace}.${key}` : key;

  // Handle nested keys like "Contact.title"
  const value = fullKey.split('.').reduce((obj, k) => obj?.[k], msgs);

  return value || key;
}
