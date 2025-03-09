// app/appointment/booking/payment/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function PaymentResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const appointmentId = searchParams.get('appointmentId');
  const [progress, setProgress] = useState(0);

  console.log(status, appointmentId);

  useEffect(() => {
    // Create a loading progress effect
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Check payment status and redirect accordingly
    const redirectTimer = setTimeout(() => {
      if (status === 'successful') {
        router.push('/patient/appointment/booking/success');
      } else if (status === 'failed') {
        router.push('/patient/appointment/booking/error');
      } else if (status === 'cancelled') {
        router.push('/appointment/booking/cancelled');
      }
    }, 2000); // 2 second delay for better UX

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, [status, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50/50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="relative h-24 w-24 animate-pulse rounded-full bg-blue-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-500 h-16 w-16 rounded-full text-white">
                <div className="flex h-full items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mb-2 text-center text-xl font-bold">Verifying Payment</h2>
        <p className="text-gray-600 mb-6 text-center">
          Please wait while we verify your payment...
        </p>

        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-blue-100">
          <div
            className="bg-blue-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-gray-500 text-center text-sm">
          You&apos;ll be redirected automatically once the verification is complete.
        </p>
      </div>
    </div>
  );
}
