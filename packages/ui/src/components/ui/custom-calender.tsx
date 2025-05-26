'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

import { cn } from '@repo/ui/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover';
import { Button } from '@repo/ui/components/ui/button';
import { CalendarIcon } from 'lucide-react';

type CalendarPopoverProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
};

export function CustomCalendar({
  value,
  onChange,
  placeholder = 'Pick a date',
  disabled = false,
  minDate,
  maxDate,
}: CalendarPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value instanceof Date && !isNaN(value.getTime()) ? format(value, 'PPP') : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-background">
        <Calendar
          onChange={(date) => {
            onChange(date as Date);
            setOpen(false);
          }}
          value={value || new Date()}
          minDate={minDate}
          maxDate={maxDate}
          className="rounded-md p-2 text-sm dark:bg-popover dark:text-white"
          calendarType="gregory"
          tileClassName={() => 'dark:bg-background dark:text-white'}
        />
      </PopoverContent>
    </Popover>
  );
}
