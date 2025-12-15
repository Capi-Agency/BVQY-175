import React from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewsDetailPage({ params }: Props) {
  return <div className="relative"></div>;
}
