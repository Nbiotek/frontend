import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { CalendarIcon, MapPinIcon, User2Icon, MailIcon, PhoneIcon } from 'lucide-react';
import Button from '@/atoms/Buttons';
import { useStore } from '@/store';
import { useBookAppointment } from '@/hooks/patient/useAppoitment';
import toast from 'react-hot-toast';

import { useState } from 'react';
import PaymentProcessingDialog from './PaymentProcessingDialog';
import { useRouter } from 'next/navigation';

interface BookingSummaryDialogProps {
  open: boolean;
  onClose: () => void;
  bookingData: BookingForm;
  onConfirm?: () => void;
}

const BonkingConfirmationDialog = ({
  open,
  onClose,
  bookingData,
  onConfirm
}: BookingSummaryDialogProps) => {
  const {
    CartStore: { items, total, itemCount, clearCart }
  } = useStore();

  const router = useRouter();
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const { mutate: bookAppointment, isPending } = useBookAppointment();

  const handleBookingSubmission = async () => {
    try {
      bookAppointment(bookingData, {
        onSuccess: (response) => {
          toast.success('Booking confirmed');
          if (bookingData.paymentMethod === 'location') {
            router.push('/patient/appointment/pending');
          }
          if (response?.data?.paymentLink) {
            setPaymentLink(response.data.paymentLink);
          }
        },
        onError: (error) => {
          toast.error('Booking failed');
        }
      });
    } catch (error) {
      console.error('Error during booking submission:', error);
    }
  };

  return (
    <>
      <Dialog
        open={open && !paymentLink}
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogHeader>
              <DialogTitle>Booking Summary</DialogTitle>
            </DialogHeader>
            <DialogDescription>Make sure your appointment details is correct</DialogDescription>

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
                      {bookingData.availableDate
                        ? new Date(bookingData.availableDate).toLocaleDateString('en-US', {
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
                  {items.map((test) => (
                    <div key={test.id} className="flex justify-between text-sm">
                      <span>{test.item.name}</span>
                      <span>
                        ₦{test.item.discountedPrice ? test.item.discountedPrice : test.item.price}
                      </span>
                    </div>
                  ))}

                  <div className="mt-3 border-t pt-3">
                    <div className="mb-3">
                      <div className="flex justify-between font-medium">
                        <span>Payment Method</span>
                        <span>
                          {bookingData.paymentMethod === 'via_card'
                            ? 'Via Card'
                            : 'Pay at Location'}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Amount</span>
                      <span>₦{total.toLocaleString()}</span>
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
              <Button
                variant="filled"
                type="button"
                className="flex-1"
                onClick={handleBookingSubmission}
                isLoading={isPending}
                disabled={isPending}
              >
                Confirm Booking
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {bookingData.paymentMethod === 'via_card' && paymentLink && (
        <PaymentProcessingDialog
          paymentLink={paymentLink}
          onComplete={() => {
            setPaymentLink(null);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default BonkingConfirmationDialog;
