// app/patient/appointment/booking/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';
import Button from '@/atoms/Buttons';
import confetti from 'canvas-confetti';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Trigger confetti animation
    if (showConfetti) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(confettiInterval);
          setShowConfetti(false);
          return;
        }

        confetti({
          particleCount: 2,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { y: 0.6 },
          colors: ['#1e40af', '#3b82f6', '#93c5fd', '#4ade80', '#14b8a6']
        });
      }, 50);

      return () => clearInterval(confettiInterval);
    }
  }, [showConfetti]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50/30 p-4">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>

      <h1 className="text-gray-900 mb-2 text-center text-3xl font-bold">Booking Successful!</h1>
      <p className="text-gray-600 mb-8 text-center text-lg">
        Your appointment has been confirmed and payment was successful.
      </p>

      <div className="mb-8 w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        <h2 className="text-gray-800 mb-4 text-xl font-semibold">Appointment Details</h2>

        <div className="space-y-4">
          <div className="flex items-center">
            <Calendar className="text-blue-500 mr-3 h-5 w-5" />
            <div>
              <p className="text-gray-500 text-sm font-medium">Date</p>
              <p className="font-medium">February 24, 2025</p>
            </div>
          </div>

          <div className="flex items-center">
            <Clock className="text-blue-500 mr-3 h-5 w-5" />
            <div>
              <p className="text-gray-500 text-sm font-medium">Time</p>
              <p className="font-medium">10:30 AM</p>
            </div>
          </div>

          <div className="flex items-center">
            <MapPin className="text-blue-500 mr-3 h-5 w-5" />
            <div>
              <p className="text-gray-500 text-sm font-medium">Location</p>
              <p className="font-medium">Medicare Hospital, 18 Iwaya Rd, Lagos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button variant="filled" onClick={() => router.push('/patient/appointments')}>
          View Appointments
        </Button>

        <Button variant="outlined" onClick={() => router.push('/patient/dashboard')}>
          Go to Dashboard
        </Button>
      </div>

      <p className="text-gray-500 mt-8 text-center text-sm">
        A confirmation email has been sent to your registered email address.
      </p>
    </div>
  );
}
