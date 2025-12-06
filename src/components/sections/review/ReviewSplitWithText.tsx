'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const reviewOptions = [
  {
    title: '😍 Rất tốt',
    title_en: '😍 Very good',
  },
  {
    title: '🙂 Tốt',
    title_en: '🙂 Good',
  },
  {
    title: '😞 Khá',
    title_en: '😞 Rather',
  },
  {
    title: '😞 Trung bình',
    title_en: '😞 Medium',
  },
  {
    title: '😞 Kém',
    title_en: '😞 Least',
  },
];

export default function ReviewSplitWithText({ data }: CommonSection) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async () => {
    if (!executeRecaptcha) return;
    const token = await executeRecaptcha('contact_form');

    const verifyRes = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    await verifyRes.json();

    if (!verifyRes.ok) {
      alert('Captcha failed');
      return;
    }
  };

  return (
    <div className="bg-[#155628] py-[80px]">
      <div className="container grid grid-cols-12">
        <div className="col-span-5">
          <div className="section-sub-title !text-primary-200">
            {data?.subtitle}
          </div>
          {data?.title && (
            <h1 className="section-title mt-1 !text-primary-50">
              {data?.title}
            </h1>
          )}

          <div className="relative mt-16 aspect-[5/4] w-full overflow-hidden">
            <NextImg
              src={getAssetUrlById(data?.cover?.id)}
              objectFit="cover"
              alt="review cover"
            />
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-6">
          <form action="" className="space-y-4">
            <div
              className="text-base font-semibold text-primary-200"
              dangerouslySetInnerHTML={{
                __html: data?.blurb,
              }}
            ></div>

            <div className="flex">😞 Khá</div>
          </form>
        </div>
      </div>
    </div>
  );
}
