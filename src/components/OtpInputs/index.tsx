'use client';
import React, { HTMLAttributes, forwardRef } from 'react';
import { TOTP } from './validator';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface IOtpInputsProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  register: UseFormRegister<TOTP>;
  errors: FieldErrors<TOTP>;
}

const OtpInputs = forwardRef<HTMLDivElement, IOtpInputsProps>(
  ({ size, register, errors, ...props }, ref) => {
    const handleOtpKeyup = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const currentEl = event.currentTarget;
      const code = parseInt(currentEl.value);
      if (code >= 0 && code <= 9) {
        const next = currentEl.nextElementSibling;
        if (next) {
          const nextInput = next as HTMLInputElement;
          nextInput.disabled = false;
          nextInput.focus();
        }
      } else {
        currentEl.value = '';
      }

      const { key } = event;
      if (key === 'Backspace' || key === 'Delete') {
        const prev = currentEl.previousElementSibling;
        if (prev) {
          const prevInput = prev as HTMLInputElement;
          currentEl.disabled = true;
          prevInput.focus();
        }
      }
    };

    return (
      <div
        ref={ref}
        className="flex w-full flex-row items-center justify-center space-x-2"
        {...props}
      >
        {Array(4)
          .fill('otp_input')
          .map((_, index) => {
            return (
              <input
                key={index}
                type="text"
                maxLength={1}
                onKeyUp={handleOtpKeyup}
                disabled={index === 0 ? false : true}
                className={`h-[50px] w-[50px] rounded-lg bg-bgGray text-center text-2xl focus:outline focus:outline-blue-400  ${
                  size
                    ? `md:h-[${size}px] md:w-[${size}px] `
                    : 'md:h-[70px] md:w-[70px] md:text-4xl lg:text-5xl'
                } ${
                  errors[`otp_${index}` as keyof TOTP]?.message &&
                  'border-error border focus:border-none'
                }`}
                {...register(`otp_${index}` as keyof TOTP)}
              />
            );
          })}
      </div>
    );
  }
);

OtpInputs.displayName = 'OtpInputs';
export default OtpInputs;
