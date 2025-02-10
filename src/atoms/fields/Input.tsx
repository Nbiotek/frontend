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
  child?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ placeholder, label, error, required, className, type, child, note, ...props }, ref) => {
    const [showPass, setShowPass] = useState(false);

    return (
      <div
        className={`flex w-full flex-col font-roboto ${props.disabled ? 'text-neutral-300' : 'text-black'} ${className}`}
      >
        {label && (
          <label htmlFor={props.id ?? props.name} className="mb-1 text-sm">
            {label}
          </label>
        )}
        <div className="relative flex w-full flex-col">
          <input
            {...{ ref, required, placeholder, id: props.id ?? props.name }}
            type={type === 'password' ? (showPass ? 'text' : 'password') : type}
            placeholder={placeholder}
            className={`peer h-[45px] rounded-lg bg-neutral-50 pl-4 text-sm outline-none ring-1 ring-transparent transition-all duration-300 placeholder:text-sm focus:ring-blue-400 ${
              error ? 'bg-red-100/50 ring-red-200' : ''
            } disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:ring-borderLine disabled:focus:ring-borderLine`}
            {...props}
          />

          <div className="absolute right-1 -translate-x-1/2 translate-y-1/2 text-neutral-200 peer-focus:text-black">
            {type === 'password' && (
              <div onClick={() => setShowPass(!showPass)} className="cursor-pointer">
                {showPass ? <PiEyeLight className="text-xl" /> : <PiEyeSlash className="text-xl" />}
              </div>
            )}
          </div>
        </div>

        <div className="flex h-auto min-h-[10px] items-center justify-between">
          {error ? (
            <small className="text-xs text-red-200 transition-all duration-300">{error}</small>
          ) : (
            <>
              {note && (
                <small className="text-xs text-typeGray transition-all duration-300">{note}</small>
              )}
              {!note && <div className="invisible text-xs">error</div>}
              {child && child}
            </>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
