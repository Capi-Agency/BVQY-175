'use client';
import { useState } from 'react';
import Image from 'next/image';

interface NextImgProps {
  id?: string;
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'none';
  quality?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'auto' | 'high' | 'low';
  sizes?: string;
  [key: string]: any;
}

const srcDefault = '/assets/images/unavailable.png';

const NextImg = ({
  id,
  src,
  alt,
  className,
  width,
  height,
  objectFit = 'contain',
  loading = 'lazy',
  quality = 80,
  fetchPriority = 'low',
  sizes = '100vw',
  ...props
}: NextImgProps) => {
  const [error, setError] = useState(false);
  const handleError = () => {
    setError(true);
  };

  const imageSrc = error ? srcDefault : (src || srcDefault);

  const containerClass = className ? `${className} h-full w-full object-${objectFit}` : `h-full w-full object-${objectFit}`;

  return (
    <Image
      id={id}
      src={imageSrc}
      alt={alt}
      className={containerClass}
      onError={handleError}
      loading={loading}
      quality={quality}
      fill={true}
      sizes={sizes}
      fetchPriority={fetchPriority}
      {...props}
    />
  );
};

export default NextImg;
