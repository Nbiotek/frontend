'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useUpdatePaymentStatus } from '@/hooks/patient/useAppoitment';
import toast from 'react-hot-toast';

type Params = {
  id: string;
} & Record<string, string | string[]>;

export default function PaymentResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const [progress, setProgress] = useState(0);
  const [navigationPath, setNavigationPath] = useState<string | null>(null);

  const [isUpdatePaymentStatus, setIsUpdatePaymentStatus] = useState<boolean>(false);

  const { mutate: updatePaymentStatus, isPending } = useUpdatePaymentStatus();

  const { id } = useParams<Params>();

  const appointmentId = {
    appointmentId: id
  };

  useEffect(() => {
    // Handle navigation based on state
    if (navigationPath) {
      router.push(navigationPath);
    }
  }, [navigationPath, router]);

  useEffect(() => {
    // Only attempt to update if we have an appointmentId and successful status
    if (status === 'successful' && id) {
      console.log('working.....');
      try {
        updatePaymentStatus(appointmentId, {
          onSuccess: (response) => {
            setIsUpdatePaymentStatus(true);
          },
          onError: (error) => {
            toast.error('Could not verify payment');
            setNavigationPath('/patient/appointment/booking/error');
          }
        });
      } catch (error) {
        toast.error('An unexpected error occurred');
        setNavigationPath('/patient/appointment/booking/error');
      }
    } else if (status === 'failed') {
      setNavigationPath('/patient/appointment/booking/error');
    } else if (status === 'cancelled') {
      setNavigationPath('/appointment/booking/cancelled');
    }
  }, [status, id, updatePaymentStatus]);

  useEffect(() => {
    // Create a loading progress effect when payment status is being updated
    if (isUpdatePaymentStatus) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setNavigationPath('/patient/appointment/booking/success');
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isUpdatePaymentStatus]);

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
