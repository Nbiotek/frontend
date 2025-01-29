// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MdError } from 'react-icons/md';
import { FormInput } from '@/components/ui/form-input';
import { GoogleIcon, FacebookIcon, AppleIcon } from '@/lib/utils/svg';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

// importing ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { FaRegEyeSlash } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

import { Text } from '@/lib/utils/Text';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add your login API call here
      console.log('Login attempt:', formData);
      // On successful login:
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full border-none bg-transparent shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-[24px] font-normal text-neutral-700">
            Verify with OTP
          </CardTitle>
          <CardDescription className="text-[20px] font-light text-neutral-700">
            {' '}
            Please enter the One Time Password(OTP) sent to your phone ot Email
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3 rounded-lg bg-white p-8  shadow-lg">
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              {/* <InputOTPSlot index={2} /> */}
            </InputOTPGroup>
            {/* <InputOTPSeparator /> */}
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              {/* <InputOTPSlot index={5} /> */}
            </InputOTPGroup>
          </InputOTP>
          <Text
            variant="small"
            color="warning_cr"
            weight="light"
            align="center"
            className="mt-5 w-full text-gray_light"
          >
            {' '}
            Didnt receive the otp to sign in yet?{' '}
            <span className="font-semibold text-blue-300">Resend</span>
          </Text>
          <div className="my-[10px] w-full">
            <Button className="mt-[30px] w-full bg-blue-400 py-[16px] font-[700]">Continue</Button>
          </div>
        </CardContent>
        <CardFooter className=" w-full ">
          <Text
            variant="small"
            color="warning_cr"
            weight="light"
            align="center"
            className="mt-5 w-full text-gray_light"
          >
            {' '}
            Don’t want to sign in yet? <span className="font-normal text-blue-300">Explore</span>
          </Text>
        </CardFooter>
      </Card>
    </>
  );
}
