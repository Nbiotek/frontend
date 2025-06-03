'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

interface SimpleDatePickerProps {
  onChange?: (date: Date | undefined) => void;
  value?: Date;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DatePickerDemo({
  onChange,
  value,
  placeholder = 'Pick a date',
  className,
  disabled = false
}: SimpleDatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);

  // Update internal state when value prop changes
  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (onChange) {
      onChange(newDate);
    }
    // Close the popover when a date is selected
    if (newDate) {
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={handleSelect}
            showOutsideDays
            className="rdp"
            styles={{
              caption: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0.5rem 0'
              },
              nav: {
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              },
              table: {
                width: '100%',
                borderCollapse: 'collapse'
              },
              head_cell: {
                width: '2.25rem',
                height: '2.25rem',
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: 'normal',
                color: 'hsl(var(--muted-foreground))'
              },
              cell: {
                width: '2.25rem',
                height: '2.25rem',
                textAlign: 'center',
                padding: 0,
                position: 'relative'
              },
              day: {
                width: '2.25rem',
                height: '2.25rem',
                padding: 0,
                fontSize: '0.875rem',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                borderRadius: '0.375rem',
                transition: 'colors 0.2s'
              },
              day_today: {
                backgroundColor: 'hsl(var(--accent))',
                color: 'hsl(var(--accent-foreground))'
              },
              day_selected: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))'
              },
              day_outside: {
                color: 'hsl(var(--muted-foreground))',
                opacity: 0.5
              },
              day_disabled: {
                color: 'hsl(var(--muted-foreground))',
                opacity: 0.5,
                cursor: 'not-allowed'
              }
            }}
            modifiersStyles={{
              selected: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))'
              },
              today: {
                backgroundColor: 'hsl(var(--accent))',
                color: 'hsl(var(--accent-foreground))'
              }
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
