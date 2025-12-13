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
import {
  ContactInfo,
  fnSendContact,
  fnSendReview,
} from '@/src/services/contact';
import { cn } from '@/src/lib/utils';

const initialValue: ContactInfo = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

export default function FormContact({ buttonTitle = 'Send' }: any) {
  const { trans } = useTranslation();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState<boolean>(false);

  const CONTACT_SCHEMA = useMemo(
    () =>
      yup
        .object({
          name: yup
            .string()
            .max(50, trans("validate-name-length"))
            .required(trans("validate-name-required")),
          phone: yup
            .string()
            .max(20, trans("validate-phone-length"))
            .required(
              trans("validate-phone-required"),
            )
            .test(
              'is-valid-phone',
              trans("validate-phone-format"),
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
            .required(trans('validate-email-required'))
            .max(50, trans('validate-email-length'))
            .email(trans("validate-email-format"))
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              trans("validate-email-format"),
            ),
          message: yup
            .string()
            .max(
              1000,
              trans("validate-mess-length"),
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
  } = useForm<ContactInfo>({
    resolver: yupResolver(CONTACT_SCHEMA as any),
    defaultValues: initialValue,
  });

  const inputs = useMemo(
    () => [
      {
        key: 'name',
        placeholder: trans('name-placeholder'),
        className: 'col-span-full md:col-span-1',
      },
      {
        key: 'phone',
        placeholder: trans('phone-placeholder'),
        className: 'col-span-full md:col-span-1',
      },
      {
        key: 'email',
        placeholder: trans('email-placeholder'),
        className: 'col-span-full',
      },
    ],
    [],
  );

  const onSubmit: SubmitHandler<ContactInfo> = async (data) => {
    setLoading(true);

    try {
      if (!executeRecaptcha) {
        throw new Error(trans("recapcha-not-ready"));
      }
      const token = await executeRecaptcha('review_form');

      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!verifyRes.ok) {
        toast.error(
          trans("verify-recapcha-error"),
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

      const response = await fnSendContact({
        ...data,
        title: 'Thông tin liên hệ',
      });

      if (!response) {
        throw new Error(
          trans("noti-error-contact"),
        );
      }
      toast.success(
        trans("noti-success-contact"),
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
        trans("noti-error-contact"),
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full grid-cols-2 gap-y-5 md:gap-x-6 md:gap-y-6 xl:gap-y-8 2xl:gap-y-9 3xl:gap-y-10"
    >
      {inputs?.map((input: any) => (
        <div key={input?.key} className={cn('', input?.className)}>
          <input
            {...register(input?.key)}
            autoComplete="off"
            aria-describedby="outlined_error_help"
            type="text"
            className="w-full border-b-[1px] border-gray-500 bg-transparent p-[8px_12px] text-base font-medium text-gray-950 outline-none placeholder:font-normal placeholder:text-gray-500 lg:p-[10px_14px] lg:text-base 2xl:p-[10px_16px] 2xl:text-lg"
            placeholder={input?.placeholder}
          />

          {(errors[input.key as keyof ContactInfo] || !watch(input?.key)) &&
            isSubmitted && (
              <p
                id="outlined_error_help"
                className={`mt-[6px] text-xs text-[#FF124F] dark:text-[#FF124F] lg:mt-2 lg:text-sm 2xl:mt-3 ${errors[input.key as keyof ContactInfo] ? 'block' : 'hidden'
                  }`}
              >
                <span className="font-medium">
                  {errors[input.key as keyof ContactInfo]?.message}
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
          placeholder={trans('note-placeholder')}
          className="w-full border-b-[1px] border-gray-500 bg-transparent p-[8px_12px] text-base font-medium text-gray-950 outline-none placeholder:font-normal placeholder:text-gray-500 lg:p-[10px_14px] lg:text-base 2xl:p-[10px_16px] 2xl:text-lg"
        />
        {errors.message && isSubmitted && (
          <p
            id="outlined_error_help"
            className={`mt-[6px] text-xs text-[#FF124F] dark:text-[#FF124F] lg:text-sm ${errors.message ? 'block' : 'hidden'
              }`}
          >
            <span className="font-medium">{errors?.message?.message}</span>
          </p>
        )}
      </div>

      <div className="col-span-full pt-4 md:pt-0">
        <button
          type="submit"
          disabled={loading}
          className="relative w-full overflow-hidden rounded-[6px] bg-[#E50000] p-[8px_20px] text-base text-white md:w-fit lg:p-[10px_24px] lg:text-lg"
        >
          {buttonTitle}

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
    </form>
  );
}
