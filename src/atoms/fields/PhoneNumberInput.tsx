'use client';
import { forwardRef, type ReactNode } from 'react';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PatternFormatProps, PatternFormat } from 'react-number-format';

interface IInputProps extends PatternFormatProps {
  label: string;
  description?: ReactNode;
}

const InputNumPatternField = forwardRef<HTMLInputElement, IInputProps>(
  ({ description, label, ...props }, ref) => {
    const { className, ...restProps } = props;
    return (
      <FormItem className="w-full">
        <FormLabel>
          {label}
          {props.required && <span className="text-red-300">*</span>}
        </FormLabel>
        <FormControl className="w-full">
          <PatternFormat
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

InputNumPatternField.displayName = 'InputNumPatternField';

export default InputNumPatternField;
