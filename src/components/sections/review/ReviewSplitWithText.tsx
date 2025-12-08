'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import useTranslation from '@/src/hooks/use-translation';
import { useMemo, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { fnSendContact, fnSendReview } from '@/src/services/contact';
import { cn } from '@/src/lib/utils';

type Review = {
  rating: number | null;
  name: string;
  phone: string;
  email: string;
  message?: string | null;
};

const initialValue: Review = {
  rating: null,
  name: '',
  phone: '',
  email: '',
  message: '',
};

const reviewOptions = [
  {
    title: '😍 Rất tốt',
    title_en: '😍 Very good',
    rating: 5,
  },
  {
    title: '😊 Tốt',
    title_en: '😊 Good',
    rating: 4,
  },
  {
    title: '🙂 Khá',
    title_en: '🙂 Rather',
    rating: 3,
  },
  {
    title: '😐 Trung bình',
    title_en: '😐 Medium',
    rating: 2,
  },
  {
    title: '😞 Chưa tốt',
    title_en: '😞 Least',
    rating: 1,
  },
];

export default function ReviewSplitWithText({ data }: CommonSection) {
  const trans = useTranslation();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState<boolean>(false);

  const REVIEW_SCHEMA = useMemo(
    () =>
      yup
        .object({
          rating: yup
            .number()
            .nullable()
            .required(
              trans('Vui lòng chọn đánh giá!', 'Please select a rating!'),
            ),
          name: yup
            .string()
            .max(
              50,
              trans(
                'Vui lòng nhập không quá 50 ký tự!',
                'Please enter no more than 50 characters!',
              ),
            )
            .required(
              trans(
                'Vui lòng nhập tên của bạn!',
                'Please enter your fullname!',
              ),
            ),
          phone: yup
            .string()
            .max(
              20,
              trans(
                'Vui lòng nhập không quá 20 ký tự!',
                'Please enter no more than 20 characters!',
              ),
            )
            .required(
              trans(
                'Vui lòng nhập số điện thoại!',
                'Please enter your phone number!',
              ),
            )
            .test(
              'is-valid-phone',
              trans(
                'Vui lòng nhập đúng định dạng số điện thoại!',
                'Please enter correct phone number format!',
              ),
              (value) => {
                if (!value) return false;
                const phoneNot84 = /[0]{1}[35789]{1}[0-9]{8}$/;
                const phone84 = /^[84]{2}[35789]{1}[0-9]{8}$/;
                const phone024 = /^[024]{2}[23456789]{1}[0-9]{8}$/;
                return (
                  phoneNot84.test(value) ||
                  phone84.test(value) ||
                  phone024.test(value)
                );
              },
            ),
          email: yup
            .string()
            .transform((value, originalValue) =>
              originalValue === '' ? null : value,
            )
            .required(trans('Vui lòng nhập email!', 'Please enter your email!'))
            .max(
              50,
              trans(
                'Vui lòng nhập không quá 50 ký tự!',
                'Please enter no more than 50 characters!',
              ),
            )
            .email(
              trans(
                'Vui lòng nhập đúng định dạng email!',
                'Please enter correct email format!',
              ),
            )
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              trans(
                'Vui lòng nhập đúng định dạng email!',
                'Please enter correct email format!',
              ),
            ),
          message: yup
            .string()
            .max(
              1000,
              trans(
                'Vui lòng nhập không quá 1000 ký tự!',
                'Please enter no more than 1000 characters!',
              ),
            )
            .notRequired(),
        })
        .required(),
    [],
  );

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<Review>({
    resolver: yupResolver(REVIEW_SCHEMA as any),
    defaultValues: initialValue,
  });

  const inputs = useMemo(
    () => [
      {
        key: 'name',
        placeholder: trans('Họ và tên', 'Fullname'),
        className: 'col-span-full md:col-span-1',
      },
      {
        key: 'phone',
        placeholder: trans('Số điện thoại', 'Phone number'),
        className: 'col-span-full md:col-span-1',
      },
      {
        key: 'email',
        placeholder: trans('Email', 'Email'),
        className: 'col-span-full',
      },
    ],
    [],
  );

  const onSubmit: SubmitHandler<Review> = async (data) => {
    setLoading(true);

    try {
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA chưa sẵn sàng!');
      }
      const token = await executeRecaptcha('review_form');

      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!verifyRes.ok) {
        toast.error(
          trans(
            'Xác minh Captcha không thành công!',
            'Captcha verification failed!',
          ),
          {
            style: {
              padding: 16,
              borderRadius: 16,
              color: '#80122E',
              backgroundColor: '#FCECF0',
            },
          },
        );
        setLoading(false);
        return;
      }

      const response = await fnSendReview({
        ...data,
        title: 'Đánh giá chất lượng',
      });

      if (!response) {
        throw new Error(
          trans(
            'Xảy ra lỗi, xin vui lòng thử lại!',
            'An error occurred, please try again!',
          ),
        );
      }
      toast.success(
        trans(
          'Cảm ơn bạn đã đánh giá chất lượng!',
          'Thank you for rating the quality!',
        ),
        {
          style: {
            padding: 16,
            borderRadius: 16,
            color: '#136C34',
            backgroundColor: '#F4FCF7',
          },
        },
      );
      reset(initialValue);
    } catch (error) {
      toast.error(
        trans(
          'Xảy ra lỗi, xin vui lòng thử lại!',
          'An error occurred, please try again!',
        ),
        {
          style: {
            padding: 16,
            borderRadius: 16,
            color: '#80122E',
            backgroundColor: '#FCECF0',
          },
        },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-10 lg:py-12 xl:py-14 2xl:py-16 3xl:py-[72px] 4xl:py-[80px]">
      <div className="container grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 xl:grid-cols-12 xl:gap-0">
        <div className="col-span-full text-center xl:col-span-5 xl:text-start">
          <div className="section-sub-title !text-primary-500">
            {data?.subtitle}
          </div>
          {data?.title && (
            <h1 className="section-title mt-1 !text-primary-950">
              {data?.title}
            </h1>
          )}

          <div className="relative mt-8 hidden aspect-[5/4] w-full overflow-hidden xl:mt-10 xl:block 2xl:mt-12 3xl:mt-14 4xl:mt-16">
            <NextImg
              src={getAssetUrlById(data?.cover?.id)}
              objectFit="cover"
              alt="review cover"
            />
          </div>
        </div>
        <div className="col-span-1 hidden xl:block"></div>
        <div className="col-span-full xl:col-span-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-stretch justify-center gap-2 lg:gap-3 xl:h-full 2xl:gap-4"
          >
            <div
              className="section-sub-title font-semibold text-primary-600"
              dangerouslySetInnerHTML={{
                __html: data?.blurb,
              }}
            ></div>

            <div>
              <div className="flex flex-wrap gap-3 py-2 md:py-3 lg:gap-4 2xl:py-4 3xl:gap-5">
                {reviewOptions?.map((option: any) => (
                  <button
                    type="button"
                    key={option?.rating}
                    onClick={() =>
                      setValue('rating', option?.rating, {
                        shouldValidate: true,
                      })
                    }
                    className={`${watch('rating') === option?.rating ? 'border-primary-600 bg-primary-50' : 'border-gray-400 bg-transparent'} flex h-9 items-center justify-center rounded-[4px] border-[2px] px-3 text-sm text-primary-600 transition-all duration-100 hover:bg-primary-50 md:h-10 md:px-3 lg:text-base 2xl:h-11 2xl:px-3 2xl:text-lg 3xl:h-12 3xl:px-4 4xl:px-5`}
                  >
                    {trans(option?.title, option?.title_en)}
                  </button>
                ))}
              </div>
              {errors.rating && isSubmitted && (
                <p
                  id="outlined_error_help"
                  className={`text-xs text-[#FF124F] dark:text-[#FF124F] lg:text-sm ${
                    errors.rating ? 'block' : 'hidden'
                  }`}
                >
                  <span className="font-medium">{errors?.rating?.message}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-y-5 md:gap-x-6 md:gap-y-6 xl:gap-y-8 2xl:gap-y-9 3xl:gap-y-10">
              {inputs?.map((input: any) => (
                <div key={input?.key} className={cn('', input?.className)}>
                  <input
                    {...register(input?.key)}
                    autoComplete="off"
                    aria-describedby="outlined_error_help"
                    type="text"
                    className="w-full border-b-[1px] border-gray-500 bg-transparent p-[8px_12px] text-sm font-medium text-gray-950 outline-none placeholder:font-normal placeholder:text-gray-500 lg:p-[10px_14px] lg:text-base 2xl:p-[10px_16px] 2xl:text-lg"
                    placeholder={input?.placeholder}
                  />

                  {(errors[input.key as keyof Review] || !watch(input?.key)) &&
                    isSubmitted && (
                      <p
                        id="outlined_error_help"
                        className={`mt-[6px] text-xs text-[#FF124F] dark:text-[#FF124F] lg:mt-2 lg:text-sm 2xl:mt-3 ${
                          errors[input.key as keyof Review] ? 'block' : 'hidden'
                        }`}
                      >
                        <span className="font-medium">
                          {errors[input.key as keyof Review]?.message}
                        </span>
                      </p>
                    )}
                </div>
              ))}

              <div className="col-span-full">
                <textarea
                  {...register('message')}
                  rows={3}
                  autoComplete="off"
                  aria-describedby="outlined_error_help"
                  placeholder={trans('Ghi chú', 'Note')}
                  className="w-full border-b-[1px] border-gray-500 bg-transparent p-[8px_12px] text-sm font-medium text-gray-950 outline-none placeholder:font-normal placeholder:text-gray-500 lg:p-[10px_14px] lg:text-base 2xl:p-[10px_16px] 2xl:text-lg"
                />
                {errors.message && isSubmitted && (
                  <p
                    id="outlined_error_help"
                    className={`mt-[6px] text-xs text-[#FF124F] dark:text-[#FF124F] lg:text-sm ${
                      errors.message ? 'block' : 'hidden'
                    }`}
                  >
                    <span className="font-medium">
                      {errors?.message?.message}
                    </span>
                  </p>
                )}
              </div>

              <div className="col-span-full flex justify-end pt-4 md:pt-0">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full overflow-hidden rounded-[6px] bg-[#E50000] p-[8px_20px] text-base text-white md:w-fit lg:p-[10px_24px] lg:text-lg"
                >
                  {trans('Gửi ngay', 'Send now')}

                  <div
                    className={`absolute inset-0 z-[1] flex size-full items-center justify-center bg-[#E50000] ${loading ? 'block' : 'hidden'}`}
                  >
                    <div className="relative size-4 animate-spin">
                      <NextImg
                        src="/assets/icons/loading_spin.svg"
                        alt="loading spin"
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
