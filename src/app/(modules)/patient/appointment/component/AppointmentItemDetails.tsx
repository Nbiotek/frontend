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

import toast from 'react-hot-toast';

import { useState } from 'react';

interface AppointmentItemProps {
  open: boolean;
  onClose: () => void;
  // bookingData: BookingForm;
  onConfirm?: () => void;
}

const AppointmentItemDetails = ({
  open,
  onClose,
  // bookingData,
  onConfirm
}: AppointmentItemProps) => {
  console.log(open);

  // const handleBookingSubmission = async () => {
  //   try {
  //     bookAppointment(bookingData, {
  //       onSuccess: (response) => {
  //         toast.success('Booking confirmed');
  //         if (response?.data?.paymentLink) {
  //           setPaymentLink(response.data.paymentLink);
  //         }
  //       },
  //       onError: (error) => {
  //         toast.error('Booking failed');
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error during booking submission:', error);
  //   }
  // };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>

            <div className="divide-y">
              {/* Personal Information */}
              <div className="py-4">
                <h2 className="mb-3 text-sm font-medium">Personal Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User2Icon className="text-gray-400 h-4 w-4" />
                    <span className="text-sm">FullName</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MailIcon className="text-gray-400 h-4 w-4" />
                    <span className="text-sm">Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="text-gray-400 h-4 w-4" />
                    <span className="text-sm">Phone</span>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              {/* <div className="py-4">
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
                </div> */}

              {/* Selected Tests */}
              {/* <div className="py-4">
                  <h2 className="mb-3 text-sm font-medium">Selected Tests</h2>
                  <div className="space-y-2">
                    {cartStore.items.map((test) => (
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
                </div> */}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentItemDetails;
