'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useVerifyPayment } from '@/hooks/patient/useAppoitment';
import { Toast } from '@/atoms/Toast';

type Params = {
  id: string;
} & Record<string, string | string[]>;

export default function PaymentResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const [progress, setProgress] = useState(0);
  const [navigationPath, setNavigationPath] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const { id: tx_Ref } = useParams<Params>();

  const { data, isLoading, isError } = useVerifyPayment(tx_Ref);

  // Get user role from session storage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('auth.user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserRole(parsedUser.role);
      } catch (error) {
        console.error('Error parsing user from session storage', error);
      }
    }
  }, []);

  // Handle navigation
  useEffect(() => {
    if (navigationPath) {
      router.push(navigationPath);
    }
  }, [navigationPath, router]);

  // Handle payment verification
  useEffect(() => {
    if (!userRole) return; // Wait until user role is loaded

    if (data?.data.status === 'COMPLETED') {
      Toast.success('Payment verification successful');

      // Determine navigation path based on user role
      let successPath = '/patient/appointment/booking/success';

      switch (userRole) {
        case 'DOCTOR':
          successPath = '/doctor/booking/success';
          break;
        case 'PATIENT':
        default:
          successPath = '/patient/appointment/booking/success';
      }

      // Start progress and set navigation path
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setNavigationPath(successPath);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => {
        clearInterval(interval);
      };
    } else if (isError || data?.data.status === 'FAILED') {
      Toast.error('Payment verification Failed');

      // Determine failed path based on user role
      let failedPath = '/patient/appointment/booking/failed';

      switch (userRole) {
        case 'DOCTOR':
          failedPath = '/doctor/booking/failed';
          break;
        case 'ADMIN':
          failedPath = '/admin/booking/failed';
          break;
        case 'PATIENT':
        default:
          failedPath = '/patient/appointment/booking/failed';
      }

      setNavigationPath(failedPath);
    }
  }, [data, isError, tx_Ref, userRole]);

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
