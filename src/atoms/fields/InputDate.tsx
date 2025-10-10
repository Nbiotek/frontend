'use client';
import { forwardRef, type ReactNode } from 'react';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  DateTimePicker,
  DateTimePickerProps,
  DateTimePickerRef
} from '@/components/ui/DateTimePicker';

interface IInputProps extends DateTimePickerProps {
  label: string;
  description?: ReactNode;
  required?: boolean;
}

const InputDate = forwardRef<DateTimePickerRef, IInputProps>(
  ({ description, label, required, ...props }, ref) => {
    return (
      <FormItem>
        <FormLabel>
          {label}
          {required && <span className="text-red-300">*</span>}
        </FormLabel>
        <FormControl>
          <DateTimePicker {...{ ref }} {...props} className="h-12" />
        </FormControl>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    );
  }
);

InputDate.displayName = 'InputDate';

export default InputDate;
