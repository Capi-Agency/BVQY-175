'use client';
import { useTranslate } from '@/src/hooks/useTranslate';
import { useMemo, useState } from 'react';
import NextImg from '../next-img';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ContactInfo, fnSendContact } from '@/src/services/contact';
import useStoreLanguage from '@/src/store/store';

type Contact = {
  email: string;
};

const initialValue: Contact = {
  email: '',
};

export default function RegisterFormFooter() {
  const { trans } = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);
  const language = useStoreLanguage((state: any) => state.language);

  const CONTACT_SCHEMA = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .transform((value, originalValue) =>
              originalValue === '' ? null : value,
            )
            .required(trans('validate-email-required'))
            .max(50, trans('validate-email-length'))
            .email(trans('validate-email-format'))
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              trans('validate-email-format'),
            ),
        })
        .required(),
    [language],
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<Contact>({
    resolver: yupResolver(CONTACT_SCHEMA),
    defaultValues: initialValue,
  });

  const onSubmit: SubmitHandler<Contact> = async (data) => {
    setLoading(true);

    try {
      const response = await fnSendContact({
        ...data,
        title: 'Đăng ký theo dõi tin tức và dịch vụ mới nhất',
        name: '',
        phone: '',
        message: 'Tôi muốn đăng ký theo dõi tin tức và dịch vụ mới nhất',
      });

      if (!response) {
        throw new Error(trans('noti-error-contact'));
      }
      toast.success(trans('noti-success-contact'), {
        style: {
          padding: 16,
          borderRadius: 16,
          color: '#136C34',
          backgroundColor: '#F4FCF7',
        },
      });
      reset(initialValue);
    } catch (error) {
      toast.error(trans('noti-error-contact'), {
        style: {
          padding: 16,
          borderRadius: 16,
          color: '#80122E',
          backgroundColor: '#FCECF0',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 text-xs font-bold tracking-wide text-white xl:text-sm 3xl:mb-4 3xl:text-base">
        {trans('footer-title')}
      </div>

      <div className="h-10 3xl:h-12">
        <div className="flex h-full w-full rounded-[6px] bg-white/20 p-[6px_6px_6px_16px] backdrop-blur-[9.5px] md:w-[300px] xl:w-[336px] xl:p-[6px_6px_6px_20px] 2xl:w-[416px]">
          <input
            {...register('email')}
            autoComplete="off"
            aria-describedby="outlined_error_help"
            type="text"
            className="flex-1 border-none bg-transparent text-xs font-normal text-white outline-none placeholder:text-white/50 xl:text-sm"
            placeholder={trans('register-placeholder')}
          />

          <button
            disabled={loading}
            type="submit"
            className="relative flex items-center gap-[6px] overflow-hidden rounded-[4px] bg-primary-600 p-[4px_12px] xl:p-[8px_16px]"
          >
            <h3 className="text-xs font-medium text-white 3xl:text-sm">
              {trans('register-label')}
            </h3>
            <div className="relative size-4">
              <NextImg
                src="/assets/icons/arrow_right_white.svg"
                alt="arrow right white"
              />
            </div>

            <div
              className={`absolute inset-0 z-[1] flex size-full items-center justify-center bg-primary-600 ${loading ? 'block' : 'hidden'}`}
            >
              <div className="relative size-5 animate-spin">
                <NextImg
                  src="/assets/icons/loading_spin.svg"
                  alt="loading spin"
                />
              </div>
            </div>
          </button>
        </div>
      </div>

      {errors.email && isSubmitted && (
        <p
          id="outlined_error_help"
          className={`mt-[6px] text-xs text-[#FF124F] dark:text-[#FF124F] lg:text-sm ${
            errors.email ? 'block' : 'hidden'
          }`}
        >
          <span className="font-semibold">
            {String(errors?.email?.message || '')}
          </span>
        </p>
      )}
    </form>
  );
}
