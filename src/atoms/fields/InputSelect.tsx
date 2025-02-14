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
  handleSetValue: (key: string, value: string) => void;
}

const InputSelect = forwardRef<HTMLInputElement, IInputSelectProps>(
  (
    { label, hideError, error, note, required, child, items, className, handleSetValue, ...props },
    ref
  ) => {
    return (
      <div className={`flex w-full flex-col space-y-1 ${className}`}>
        {label && (
          <div className="flex items-center justify-start space-x-1">
            <label htmlFor={props.id ?? props.name} className="mb-1 text-sm">
              {label}
            </label>

            {required && <span className="text-red-300">*</span>}
          </div>
        )}
        <Select onValueChange={(value) => handleSetValue(props.name || '', value)}>
          <SelectTrigger className={`w-full ${error ? 'bg-red-100/50 ring-red-200' : ''}`}>
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
