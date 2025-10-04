'use client';
import { forwardRef, InputHTMLAttributes, type ReactNode } from 'react';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PhoneInput, PhoneInputProps } from '@/components/ui/input-phonenumber';

interface IInputProps extends PhoneInputProps {
  label: string;
  description?: ReactNode;
}

const InputPhoneField = forwardRef<HTMLInputElement, IInputProps>(
  ({ description, label, ...props }, ref) => {
    return (
      <FormItem className="w-full">
        {label && (
          <FormLabel className="flex items-center justify-start space-x-1">
            <p>{label}</p>
            {props.required && <small className="text-error">*</small>}
          </FormLabel>
        )}
        <FormControl className="w-full">
          <PhoneInput {...{ ref }} {...props} />
        </FormControl>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    );
  }
);

InputPhoneField.displayName = 'InputPhoneField';

export default InputPhoneField;
