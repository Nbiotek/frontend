'use client';
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
import { forwardRef, ReactNode, useState } from 'react';
import { SelectProps } from '@radix-ui/react-select';

interface ISelectFormProps extends SelectProps {
  name: string;
  label: string;
  items: Array<Option<string, string>>;
  placeholder: string;
  description?: ReactNode;
  onChange?: (value: string) => void;
}

const InputSelect = forwardRef<HTMLInputElement, ISelectFormProps>(
  (
    {
      description,
      label,
      items,
      onChange,
      placeholder,
      onValueChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [controlledValue, setControlledValue] = useState(value ?? '');

    const handleValueChange = (newValue: string) => {
      if (onChange) {
        onChange(newValue);
      }

      if (onValueChange) {
        onValueChange(newValue);
      }

      setControlledValue(newValue);
    };

    return (
      <FormItem className="w-full">
        <FormLabel>
          {label}
          {props.required && label != '' && <span className="text-red-300">*</span>}
        </FormLabel>
        <Select {...props} value={controlledValue} onValueChange={handleValueChange}>
          <FormControl className="w-full">
            <SelectTrigger className="h-12">
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
