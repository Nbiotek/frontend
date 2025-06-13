import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { forwardRef, ReactNode } from 'react';
import { SelectProps } from '@radix-ui/react-select';

interface ISelectFormProps extends SelectProps {
  name: string;
  label: string;
  items: Array<Option<string, string>>;
  placeholder: string;
  description?: ReactNode;
}

const InputSelect = forwardRef<HTMLInputElement, ISelectFormProps>(
  ({ description, label, items, placeholder, ...props }, ref) => {
    return (
      <FormItem className="w-full">
        <FormLabel>
          {label}
          {props.required && label != '' && <span className="text-red-300">*</span>}
        </FormLabel>
        <Select {...{ ref }} {...props}>
          <FormControl className="w-full">
            <SelectTrigger className="h-11 bg-neutral-50">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="w-full">
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormDescription className="w-full">{description}</FormDescription>
        <FormMessage />
      </FormItem>
    );
  }
);

InputSelect.displayName = 'InputSelect';
export default InputSelect;
