import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PaymentSuccessPage() {
  return (
    <div className="bg-green-50/50 flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="animate-bounce rounded-full bg-green-100 p-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </div>

        <h1 className="text-green-600 mb-4 text-2xl font-bold">Payment Successful</h1>

        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. Thank you for your booking!
        </p>

        <div className="space-y-4">
          <Link href="/doctor" className="block">
            <Button variant="default" className="w-full">
              Go to Dashboard
            </Button>
          </Link>

          <Link href="/doctor/appointments" className="block">
            <Button variant="outline" className="w-full">
              View Appointments
            </Button>
          </Link>
        </div>

        <div className="text-gray-500 mt-6 space-y-2 text-sm">
          <p>Confirmation sent to your registered email</p>
          <p className="text-green-700 font-semibold">
            Booking Reference: #APT-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

// Metadata for the success page
export const metadata = {
  title: 'Payment Successful | Booking Confirmation',
  description: 'Your payment has been processed successfully.'
};
