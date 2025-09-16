import React, { forwardRef } from 'react';
import { FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface IInputToggleProps {
  label?: string;
  description?: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

const InputToggle = forwardRef<HTMLInputElement, IInputToggleProps>(
  ({ label, description, checked, ...props }, ref) => {
    return (
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div className="space-y-0.5">
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
        </div>
        <FormControl>
          <Switch checked={checked} onCheckedChange={props.onChange} />
        </FormControl>
      </FormItem>
    );
  }
);

InputToggle.displayName = 'InputToggle';
export default InputToggle;
