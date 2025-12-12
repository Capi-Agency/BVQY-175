'use client';
import { useMemo, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { fnSendContact } from '@/src/services/contact';
import useStoreLanguage from '@/src/store/store';
import NextImg from '../../common/next-img';
import useTranslation from '@/src/hooks/use-translation';

type Contact = {
  email: string;
};

const initialValue: Contact = {
  email: '',
};

export default function RegisterFollowNews() {
  const { trans } = useTranslation();
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
      toast.success(trans('noti-success-register'), {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4 rounded-[6px] border border-primary-700 bg-primary-100 p-4 xl:rounded-xl"
    >
      <div className="space-y-2">
        <p className="text-base font-semibold text-black">
          {trans('register-form-title')}
        </p>
        <p className="text-sm font-normal text-black">
          {trans('register-form-des')}
        </p>
      </div>

      <div>
        <input
          {...register('email')}
          autoComplete="off"
          aria-describedby="outlined_error_help"
          type="text"
          className="w-full rounded-[6px] border-none px-2.5 py-3 text-sm text-black outline-none placeholder:text-gray-600"
          placeholder="email@example.com"
        />

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
      </div>

      <button
        disabled={loading}
        type="submit"
        className="relative flex w-fit items-center gap-2 overflow-hidden rounded-[6px] bg-primary-600 px-4 py-2 text-sm text-white"
      >
        {trans('register-label')}
        <div className="relative size-4">
          <NextImg
            src="/assets/icons/arrow_right_white.svg"
            alt="arrow white"
          />
        </div>

        <div
          className={`absolute inset-0 z-[1] flex size-full items-center justify-center bg-primary-600 ${loading ? 'block' : 'hidden'}`}
        >
          <div className="relative size-4 animate-spin">
            <NextImg src="/assets/icons/loading_spin.svg" alt="loading spin" />
          </div>
        </div>
      </button>
    </form>
  );
}
