'use client';
import { InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { Calendar } from 'react-date-range';
import { dateTimeUTC } from '@/utils/date';
import { CalendarDays } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface IInputDateProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  className?: string;
  showTime?: boolean;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  initialValue?: string;
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
      maxDate,
      required,
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
      initialValue ? dateTimeUTC(initialValue, showTime) : ''
    );
    const [date, setDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
      if (date) {
        setVal(dateTimeUTC(date.toISOString(), showTime));
        handleSetDate(date);
      }
    }, [date]);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          {label && (
            <div className="flex items-center justify-start space-x-1">
              <label htmlFor={props.id ?? props.name} className="mb-1 text-sm">
                {label}
              </label>

              {required && <span className="text-red-300">*</span>}
            </div>
          )}
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
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
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
            maxDate={maxDate}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

CustomDate.displayName = 'CustomDate';
export default CustomDate;
