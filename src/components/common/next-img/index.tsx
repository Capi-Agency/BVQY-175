'use client';
import { useState } from 'react';
import Image from 'next/image';
import { SETTINGS } from '@/src/utils/const';

interface NextImgProps {
  id?: string;
  src: string;
  alt: string;
  wrapperClassName?: string;
  imageClassName?: string;
  quality?: number;
  fill?: boolean;
  loading?: 'lazy' | 'eager' | undefined;
  priority?: boolean;
  [key: string]: any;
}

const NextImg = ({
  id,
  src,
  alt,
  wrapperClassName,
  imageClassName,
  fill = true,
  quality = 80,
  loading = 'lazy',
  priority = false,
  ...props
}: NextImgProps) => {
  const [fallbackSrc, setFallbackSrc] = useState('');
  const handleError = () => {
    setFallbackSrc(SETTINGS.DEFAULT_UNAVAILABLE_IMAGE_URL);
  };

  return (
    <div className={`relative ${wrapperClassName}`}>
      <Image
        id={id}
        src={src || fallbackSrc}
        blurDataURL={src || fallbackSrc}
        alt={alt}
        className={imageClassName}
        onError={handleError}
        loading={loading}
        priority={priority}
        quality={quality}
        placeholder="blur"
        fill={fill}
        {...props}
      />
    </div>
  );
};

export default NextImg;
