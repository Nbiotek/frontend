'use client';
import { forwardRef, type ReactNode } from 'react';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface IInputProps extends NumericFormatProps {
  label: string;
  description?: ReactNode;
}

const InputNumberField = forwardRef<HTMLInputElement, IInputProps>(
  ({ description, label, ...props }, ref) => {
    const { className, ...restProps } = props;
    return (
      <FormItem className="w-full">
        <FormLabel>{label}</FormLabel>
        <FormControl className="w-full">
          <NumericFormat
            className="flex h-11 w-full rounded-lg border border-input bg-neutral-50 px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            {...{ ref }}
            {...restProps}
          />
        </FormControl>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    );
  }
);

InputNumberField.displayName = 'InputNumberField';

export default InputNumberField;
