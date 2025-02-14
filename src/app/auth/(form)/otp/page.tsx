import React from 'react';
import OTPVerificationView from './Verify';
import type { Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.OTP;

export const metadata: Metadata = { title, description };

function VerifyPage() {
  return <OTPVerificationView />;
}

export default VerifyPage;
