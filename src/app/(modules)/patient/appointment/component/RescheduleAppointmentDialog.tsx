'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import Button from '@/atoms/Buttons';
import { Text } from '@/lib/utils/Text';
import { Calendar, Clock } from 'lucide-react';
import { useRescheduleAppointment } from '@/hooks/patient/useAppoitment';
import toast from 'react-hot-toast';

interface RescheduleDialogProps {
  open: boolean;
  onClose: () => void;
  appointmentId: string;
  currentDate?: string;
}

const RescheduleDialog = ({ open, onClose, appointmentId, currentDate }: RescheduleDialogProps) => {
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [dateString, setDateString] = useState<string>('');
  const { mutate: rescheduleAppointment, isPending } = useRescheduleAppointment();

  console.log(appointmentId, currentDate);

  // Reset date when dialog opens
  useEffect(() => {
    if (open && currentDate) {
      try {
        const date = new Date(currentDate);
        if (!isNaN(date.getTime())) {
          setNewDate(date);
          setDateString(date.toISOString().split('T')[0]);
        }
      } catch (error) {
        console.error('Error parsing date:', error);
      }
    }
  }, [open, currentDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateString(value);

    if (value) {
      const date = new Date(value);
      setNewDate(date);
    } else {
      setNewDate(undefined);
    }
  };

  const handleSubmit = () => {
    if (!newDate) {
      toast.error('Please select a new date');
      return;
    }

    rescheduleAppointment(
      {
        appointmentId,
        newDate: newDate.toISOString()
      },
      {
        onSuccess: () => {
          toast.success('Appointment rescheduled successfully');
          onClose();
        },
        onError: (error) => {
          toast.error('Failed to reschedule appointment');
          console.error(error);
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>Please select a new date for your appointment.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {currentDate && (
            <div className="bg-gray-50 rounded-lg border p-4">
              <Text variant="body" weight="semibold" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> Current Appointment
              </Text>
              <div className="text-gray-600 mt-2 flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>
                  {new Date(currentDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Text variant="body" weight="semibold">
              Select New Date
            </Text>
            <input
              type="date"
              className="border-gray-300 focus:border-blue-500 w-full rounded-md border p-2 focus:outline-none"
              value={dateString}
              onChange={handleDateChange}
            />
            {newDate && (
              <div className="text-green-600 mt-2 text-sm">
                Selected:{' '}
                {newDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
          <Button variant="outlined" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="filled"
            onClick={handleSubmit}
            isLoading={isPending}
            disabled={!newDate || isPending}
          >
            Confirm Reschedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleDialog;
