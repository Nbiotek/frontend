'use client';
import { InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { dateTimeUTC } from '@/utils/date';
import { XModal } from '../modal';
import { CalendarDays } from 'lucide-react';

interface IInputDateProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  className?: string;
  showTime?: boolean;
  placeholder?: string;
  minDate?: Date;
  initialValue?: Date;
  handleSetDate: (date: Date) => void;
  callBackFn?: () => void;
  callBackNote?: string;
}

const CustomDate = forwardRef<HTMLInputElement, IInputDateProps>(
  (
    {
      error,
      label,
      showTime,
      placeholder,
      minDate,
      handleSetDate,
      initialValue,
      callBackFn,
      callBackNote,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [val, setVal] = useState<string | undefined>(
      initialValue ? dateTimeUTC(initialValue.toISOString(), showTime) : ''
    );
    const [date, setDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
      if (date) {
        setVal(dateTimeUTC(date.toISOString(), showTime));
        handleSetDate(date);
      }
    }, [date]);

    return (
      <div
        className={`relative ${props.disabled ? ' text-neutral-300' : 'text-black'} font-grotesk left-0 top-0 flex w-full flex-col ${className}`}
      >
        <label htmlFor={props.id || ''} className="mb-1 text-sm">
          {label}
        </label>
        <div
          className={`flex h-fit w-full items-center justify-between overflow-hidden rounded-lg bg-neutral-50 px-2 ring-1 ring-transparent focus-within:ring-blue-400 ${
            error ? 'bg-red-100/50 ring-red-200' : ''
          } ${!props.disabled && 'hover:border-black'}`}
          onClick={() => !props.disabled && setOpen(!open)}
        >
          <input
            ref={ref}
            type="text"
            value={val}
            disabled={props.disabled}
            placeholder={placeholder}
            className={`disabled:focus:border-neutral-borderLine h-[45px] w-[100%] bg-transparent text-sm outline-none transition-all duration-300 placeholder:text-sm disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:border-borderLine`}
            {...props}
          />
          <CalendarDays size={16} />
        </div>

        <XModal
          isOpen={open}
          closeModal={() => setOpen(false)}
          className="!w-[350px] !max-w-[350px]"
        >
          <Calendar
            className="w-full"
            editableDateInputs={true}
            direction="vertical"
            color="#004AAD"
            onChange={(item) => {
              setDate(item);
              setOpen(false);
            }}
            date={date}
            minDate={minDate}
          />
        </XModal>

        <div className="flex h-auto min-h-[18px] items-center justify-between">
          {error ? (
            <small className="text-xs text-red-200 transition-all duration-300">{error}</small>
          ) : (
            <small className="text-xs text-typeGray transition-all duration-300"></small>
          )}
          {callBackNote && (
            <button
              type="button"
              className="text-xs text-primary"
              onClick={callBackFn && callBackFn}
            >
              {callBackNote}
            </button>
          )}
        </div>
      </div>
    );
  }
);

CustomDate.displayName = 'CustomDate';
export default CustomDate;
