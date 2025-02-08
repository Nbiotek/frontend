import { forwardRef, InputHTMLAttributes } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface IInputSelectProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hideError?: boolean;
  note?: string;
  child?: React.ReactNode;
  items: Array<{ label: string; value: string }>;
}

const InputSelect = forwardRef<HTMLInputElement, IInputSelectProps>(
  ({ label, hideError, error, note, child, items, className, ...props }, ref) => {
    return (
      <div className={`flex w-full flex-col space-y-1 ${className}`}>
        {label && (
          <label htmlFor={props.id ?? props.name} className="text-sm">
            {label}
          </label>
        )}
        <Select>
          <SelectTrigger className="w-full">
            <input ref={ref} {...props} className="hidden" />
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item, id) => {
                return (
                  <SelectItem key={id} value={item.value}>
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
          {hideError ? null : (
            <div className="flex h-auto min-h-[10px] items-center justify-between">
              {error ? (
                <small className="text-xs text-red-200 transition-all duration-300">{error}</small>
              ) : (
                <>
                  {note && (
                    <small className="text-xs text-typeGray transition-all duration-300">
                      {note}
                    </small>
                  )}
                  {!note && <div className="invisible text-xs">error</div>}
                  {child && child}
                </>
              )}
            </div>
          )}
        </Select>
      </div>
    );
  }
);

InputSelect.displayName = 'InputSelect';
export default InputSelect;
