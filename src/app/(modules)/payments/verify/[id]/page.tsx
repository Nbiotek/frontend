'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useVerifyPayment } from '@/hooks/patient/useAppoitment';
import { Toast } from '@/atoms/Toast';

type Params = {
  id: string;
} & Record<string, string | string[]>;

export default function PaymentResultPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);

  // Use refs to prevent multiple interval creation
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { id: tx_Ref } = useParams<Params>();

  const { data, isLoading, isError, error } = useVerifyPayment(tx_Ref);

  console.log('Payment verification status:', {
    isLoading,
    isError,
    status: data?.data?.status,
    tx_Ref,
    userRole,
    hasProcessed
  });

  // Get user role from session storage (only once)
  useEffect(() => {
    const storedUser = sessionStorage.getItem('auth.user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserRole(parsedUser.role || 'PATIENT');
        console.log('User role extracted:', parsedUser.role);
      } catch (error) {
        console.error('Error parsing user from session storage', error);
        setUserRole('PATIENT'); // Default fallback
      }
    } else {
      setUserRole('PATIENT'); // Default fallback
    }
  }, []); // Empty dependency array - only run once

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle payment verification results
  useEffect(() => {
    // Don't process if already processed or still loading user role
    if (hasProcessed || !userRole || isLoading) return;

    console.log('Processing payment result:', {
      status: data?.data?.status,
      isError,
      error
    });

    // Handle successful payment
    if (data?.data?.status === 'COMPLETED') {
      setHasProcessed(true);
      setIsProcessing(true);

      Toast.success('Payment verification successful');

      // Determine navigation path based on user role
      let successPath = '/patient/appointment/booking/success';
      switch (userRole) {
        case 'DOCTOR':
          successPath = '/doctor/appointments/success';
          break;
        case 'PATIENT':
        default:
          successPath = '/patient/appointment/booking/success';
      }

      console.log('Navigating to success path:', successPath);

      // Start progress animation
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            // Clear interval and navigate
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
              progressIntervalRef.current = null;
            }

            // Navigate after a short delay
            setTimeout(() => {
              router.push(successPath);
            }, 500);

            return 100;
          }
          return newProgress;
        });
      }, 200);
    }
    // Handle failed payment or error
    else if (isError || data?.data?.status === 'FAILED') {
      setHasProcessed(true);

      Toast.error('Payment verification failed');

      // Determine failed path based on user role
      let failedPath = '/patient/appointment/booking/failed';
      switch (userRole) {
        case 'DOCTOR':
          failedPath = '/doctor/appointments/failed';
          break;
        case 'PATIENT':
        default:
          failedPath = '/patient/appointment/booking/failed';
      }

      console.log('Navigating to failed path:', failedPath);

      // Navigate immediately for failures
      setTimeout(() => {
        router.push(failedPath);
      }, 1000);
    }
    // Handle pending/processing status
    else if (data?.data?.status === 'PENDING' || data?.data?.status === 'PROCESSING') {
      console.log('Payment still processing...');
      // Don't set hasProcessed, let it keep checking
    }
  }, [data?.data?.status, isError, userRole, hasProcessed, isLoading, router]);

  // Add timeout to prevent infinite loading (after 60 seconds)
  useEffect(() => {
    if (!hasProcessed && userRole) {
      timeoutRef.current = setTimeout(() => {
        if (!hasProcessed) {
          console.log('Payment verification timeout');
          Toast.error('Payment verification timeout. Please try again.');

          const timeoutPath = `/patient/appointment/booking/failed?reason=timeout`;
          router.push(timeoutPath);
        }
      }, 60000); // 60 seconds timeout
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [userRole, hasProcessed, router]);

  // Show different states based on loading/processing
  const getStatusText = () => {
    if (isLoading) return 'Verifying payment...';
    if (isProcessing) return 'Payment successful! Redirecting...';
    if (data?.data?.status === 'PENDING') return 'Payment is being processed...';
  };

  const getSubText = () => {
    if (isProcessing) return 'You will be redirected to the confirmation page shortly.';
    if (data?.data?.status === 'PENDING') return 'This may take a few moments. Please wait...';
    return 'Please wait while we verify your payment...';
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50/50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="relative h-24 w-24 animate-pulse rounded-full bg-blue-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-500 h-16 w-16 rounded-full text-white">
                <div className="flex h-full items-center justify-center">
                  {isProcessing ? (
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mb-2 text-center text-xl font-bold">
          {isProcessing ? 'Payment Successful!' : 'Verifying Payment'}
        </h2>

        <p className="text-gray-600 mb-6 text-center">{getSubText()}</p>

        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-blue-100">
          <div
            className={`h-full transition-all duration-300 ease-out ${
              isProcessing ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-gray-500 text-center text-sm">{getStatusText()}</p>
      </div>
    </div>
  );
}
