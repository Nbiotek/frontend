import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { Card } from '@/components/ui/card';
import { CalendarIcon, MapPinIcon, User2Icon, MailIcon, PhoneIcon } from 'lucide-react';
import Button from '@/atoms/Buttons';
import { CartItem, cartStore } from '@/store/Cart';

interface BookingSummaryDialogProps {
  open: boolean;
  onClose: () => void;
  bookingData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    appointmentDate: Date | undefined;
    selectedTests: CartItem[];
    location: {
      type: 'Lab' | 'Custom';
      address: string;
    };
  };
  onConfirm?: () => void;
}

const BonkingConfirmationDialog = ({
  open,
  onClose,
  bookingData,
  onConfirm
}: BookingSummaryDialogProps) => {
  console.log(bookingData);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>
            <DialogTitle>Booking Summary</DialogTitle>
          </DialogHeader>

          <div className="divide-y">
            {/* Personal Information */}
            <div className="py-4">
              <h2 className="mb-3 text-sm font-medium">Personal Information</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User2Icon className="text-gray-400 h-4 w-4" />
                  <span className="text-sm">{bookingData.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="text-gray-400 h-4 w-4" />
                  <span className="text-sm">{bookingData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="text-gray-400 h-4 w-4" />
                  <span className="text-sm">{bookingData.phoneNumber}</span>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="py-4">
              <h2 className="mb-3 text-sm font-medium">Appointment Details</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-gray-400 h-4 w-4" />
                  <span className="text-sm">
                    {bookingData.appointmentDate
                      ? bookingData.appointmentDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : undefined}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="text-gray-400 h-4 w-4" />
                  <div className="text-sm">
                    <span className="font-medium">{bookingData.location.type}: </span>
                    <span>{bookingData.location.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Tests */}
            <div className="py-4">
              <h2 className="mb-3 text-sm font-medium">Selected Tests</h2>
              <div className="space-y-2">
                {bookingData.selectedTests.map((test) => (
                  <div key={test.id} className="flex justify-between text-sm">
                    <span>{test.item.name}</span>
                    <span>₦{test.item.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="mt-3 border-t pt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total Amount</span>
                    <span>₦{cartStore.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            <Button variant="outlined" className="flex-1" onClick={onClose}>
              Edit
            </Button>
            <Button variant="filled" className="flex-1" onClick={onConfirm}>
              Confirm Booking
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BonkingConfirmationDialog;
