'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function PaymentsPage() {
  const router = useRouter();

  // Redirect to dashboard if user navigates directly to /payments
  useEffect(() => {
    // Short delay to avoid immediate redirect
    const timer = setTimeout(() => {
      // If no action taken, redirect to patient dashboard
      router.replace('/patient');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50/50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <Loader2 className="text-blue-500 h-12 w-12 animate-spin" />
        </div>
        <h2 className="mb-2 text-xl font-bold">Payment Processing</h2>
        <p className="text-gray-600">Please wait while we process your request...</p>
      </div>
    </div>
  );
}
