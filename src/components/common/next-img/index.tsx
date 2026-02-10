'use client';
import { useEffect, useState } from 'react';
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
  ...props
}: NextImgProps) => {
  const [mounted, setMounted] = useState(false);
  const [fallback, setFallback] = useState('');

  const handleError = () => {
    setFallback(srcDefault);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Add webp format for CMS images automatically
  const imageSrc = (src || fallback || srcDefault).includes('?')
    ? src || fallback || srcDefault
    : (src || fallback || srcDefault) + '?format=webp';

  return (
    <img
      id={id}
      src={imageSrc}
      alt={alt}
      className={className ? `${className} h-full w-full` : `h-full w-full`}
      onError={handleError}
      loading={loading}
      style={{
        objectFit,
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
      }}
      {...props}
    />
  );
};

export default NextImg;
