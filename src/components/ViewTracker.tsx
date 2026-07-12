'use client';
import { useEffect } from 'react';

export default function ViewTracker({
  collection,
  slug,
}: {
  collection: string;
  slug: string;
}) {
  useEffect(() => {
    fetch(`/api/views/${collection}/${slug}`, { method: 'POST' }).catch(() => {});
  }, [collection, slug]);

  return null;
}
