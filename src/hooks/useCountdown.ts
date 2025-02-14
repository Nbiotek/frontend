'use client';
import { useEffect, useState } from 'react';

export const useCountdown = (countNumber: number) => {
  const [counter, setCounter] = useState(countNumber);

  const minutesLeft = Math.floor(counter / 60);
  const secondsLeft = counter - minutesLeft * 60;
  const timeToCodeResend = `${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`;
  const resendCodeActive = timeToCodeResend === '0:00';

  useEffect(() => {
    setTimeout(() => {
      if (counter > 0) setCounter(counter - 1);
    }, 1000);
  }, [counter]);

  return { timeToCodeResend, resendCodeActive, setCounter };
};
