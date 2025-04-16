// components/appointments/PaymentDialog.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import Button from '@/atoms/Buttons';
import { Text } from '@/lib/utils/Text';
import { CreditCard, Check, AlertCircle } from 'lucide-react';
import { useProcessPayment } from '@/hooks/patient/useAppoitment';
import toast from 'react-hot-toast';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  appointmentId: string;
  appointmentDetails: {
    title: string;
    price: number;
  };
}

const PaymentDialog = ({
  open,
  onClose,
  appointmentId,
  appointmentDetails
}: PaymentDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { mutate: processPayment, isPending } = useProcessPayment();

  const handlePayment = () => {
    setIsProcessing(true);

    processPayment(
      { appointmentId },
      {
        onSuccess: (response) => {
          setIsProcessing(false);
          toast.success('Payment initiated ....');

          // If the API returns a payment link, redirect to it
          if (response?.data?.paymentLink) {
            window.location.href = response.data.paymentLink;
          } else {
            onClose();
          }
        },
        onError: (error) => {
          setIsProcessing(false);
          toast.error('Payment processing failed');
          console.error(error);
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>Process payment for your pending appointment</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-gray-50 rounded-lg border p-4">
            <Text variant="body" weight="semibold" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" /> Appointment Details
            </Text>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Appointment:</span>
                <span className="font-medium">{appointmentDetails.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Due:</span>
                <span className="font-semibold text-primary">
                  ₦{appointmentDetails.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-start">
              <AlertCircle className="text-blue-500 mr-2 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="text-blue-700 text-sm">
                <p className="mb-1 font-medium">Payment Information</p>
                <p>
                  You will be redirected to our secure payment gateway to complete this transaction.
                  Your appointment will be confirmed once payment is successful.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
          <Button variant="outlined" onClick={onClose} disabled={isPending || isProcessing}>
            Cancel
          </Button>
          <Button
            variant="filled"
            onClick={handlePayment}
            isLoading={isPending || isProcessing}
            disabled={isPending || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
