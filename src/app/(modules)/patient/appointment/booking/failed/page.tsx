'use client';
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PaymentErrorPage() {
  return (
    <div className="bg-red-50/50 flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
        </div>

        <h1 className="text-red-600 mb-4 text-2xl font-bold">Payment Unsuccessful</h1>

        <p className="text-gray-600 mb-6">
          We apologize, but there was an issue processing your payment. Please try again or contact
          our support team if the problem persists.
        </p>

        <div className="flex flex-col space-y-4">
          <Button variant="destructive" className="w-full" onClick={() => window.location.reload()}>
            Try Again
          </Button>

          <Link href="/patient/appointments" className="w-full">
            <Button variant="outline" className="w-full">
              Back to Appointments
            </Button>
          </Link>

          <Link href="/support" className="w-full">
            <Button variant="secondary" className="w-full">
              Contact Support
            </Button>
          </Link>
        </div>

        <div className="text-gray-500 mt-6 text-sm">
          <p>Having trouble? Call our support at 1-800-HELP-NOW</p>
        </div>
      </div>
    </div>
  );
}
