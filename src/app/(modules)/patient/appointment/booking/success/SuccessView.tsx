'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';
import Button from '@/atoms/Buttons';
import confetti from 'canvas-confetti';

const SuccessView = () => {
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
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>

      <h1 className="text-gray-900 mb-2 text-center text-3xl font-bold">Booking Successful!</h1>
      <p className="text-gray-600 mb-8 text-center text-lg">
        Your appointment has been confirmed and payment was successful.
      </p>

      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button variant="filled" onClick={() => router.push('/patient/appointment/upcoming')}>
          View Appointments
        </Button>

        <Button variant="outlined" onClick={() => router.push('/patient')}>
          Go to Dashboard
        </Button>
      </div>

      <p className="text-gray-500 mt-8 text-center text-sm">
        A confirmation email has been sent to your registered email address.
      </p>
    </div>
  );
};

export default SuccessView;
