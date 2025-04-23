// components/appointments/PaymentProcessingDialog.tsx
'use client';
import { useEffect } from 'react';

interface PaymentProcessingDialogProps {
  paymentLink: string;
  onComplete?: () => void;
}

const PaymentProcessingDialog = ({ paymentLink, onComplete }: PaymentProcessingDialogProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = paymentLink;
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [paymentLink, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center rounded-lg bg-white p-8">
        <div className="border-blue-500 mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2"></div>
        <h3 className="text-xl font-medium">Proceeding to checkout...</h3>
        <p className="text-gray-500 mt-2">Please wait, you will be redirected shortly.</p>
      </div>
    </div>
  );
};

export default PaymentProcessingDialog;
