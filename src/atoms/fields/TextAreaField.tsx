import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface ITextareaFieldProps extends HTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  placeholder: string;
  description?: ReactNode;
  required?: boolean;
}

const TextareaField = forwardRef<HTMLTextAreaElement, ITextareaFieldProps>(
  ({ description, label, ...props }, ref) => {
    return (
      <FormItem className="w-full">
        <FormLabel>{label}</FormLabel>
        <FormControl className="w-full">
          <Textarea className=" bg-neutral-50" {...{ ref }} {...props} />
        </FormControl>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    );
  }
);

TextareaField.displayName = 'TextareaField';
export default TextareaField;
