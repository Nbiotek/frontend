'use client';
import { forwardRef, type ReactNode, type InputHTMLAttributes, useState } from 'react';
import { GoCheckCircleFill } from 'react-icons/go';
import { RiErrorWarningFill } from 'react-icons/ri';
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';
import { ClipLoader } from 'react-spinners';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  note?: string;
  loading?: boolean;
  loading_checks?: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      placeholder,
      label,
      error,
      required,
      className,
      type,
      loading,
      loading_checks,
      note,
      ...props
    },
    ref
  ) => {
    const [showPass, setShowPass] = useState(false);

    return (
      <div
        className={`font-grotesk flex flex-col ${props.disabled ? 'text-neutral-300' : 'text-black'} ${className}`}
      >
        {label && (
          <label htmlFor={props.id ?? props.name} className="mb-1 text-sm">
            {label}
          </label>
        )}
        <div className="relative mb-1 flex w-full flex-col">
          <input
            {...{ ref, required, placeholder, id: props.id ?? props.name }}
            type={type === 'password' ? (showPass ? 'text' : 'password') : type}
            placeholder={placeholder}
            className={`border-borderLine h-[45px] rounded-lg border-[1px] pl-4 text-sm outline-none transition-all duration-300 placeholder:text-sm hover:border-black focus:border-black ${
              error ? 'border-error bg-errorBg' : ''
            } disabled:focus:border-neutral-borderLine disabled:hover:border-borderLine disabled:cursor-not-allowed disabled:text-neutral-300`}
            {...props}
          />

          <div className="absolute right-1 -translate-x-1/2 translate-y-1/2">
            {type === 'password' && (
              <div onClick={() => setShowPass(!showPass)} className="cursor-pointer">
                {showPass ? <PiEyeLight className="text-xl" /> : <PiEyeSlash className="text-xl" />}
              </div>
            )}

            {loading ? (
              <ClipLoader
                color="#E83289"
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <>
                {loading_checks === 'available' && (
                  <GoCheckCircleFill className="text-progressGreen rounded-full bg-white text-xl" />
                )}

                {loading_checks === 'unavailable' && (
                  <RiErrorWarningFill className="text-error rounded-full bg-white text-xl" />
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          {error ? (
            <small className="text-error text-xs transition-all duration-300">{error}</small>
          ) : (
            <>
              {note && (
                <small className="text-xs text-typeGray transition-all duration-300">{note}</small>
              )}
              {!note && <div className="invisible text-xs">error</div>}
            </>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
