'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OtpInputs from '@/components/OtpInputs';
import Button from '@/atoms/Buttons';
import { TOTP, OTPValidationSchema } from '@/components/OtpInputs/validator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import HyperLink from '@/atoms/Hyperlink';

export default function OTPVerificationView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<TOTP>({
    mode: 'onBlur',
    resolver: zodResolver(OTPValidationSchema)
  });
  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-[24px] font-normal text-neutral-700">Verify with OTP</CardTitle>
        <CardDescription className="text-[20px] font-light text-neutral-700">
          Please enter the One Time Password(OTP) sent to your phone or Email
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3 rounded-2xl bg-white p-8  shadow-lg">
        <OtpInputs register={register} errors={errors} />

        <HyperLink href="" info="Didn’t receive code?" hrefText="Resend" />

        <Button variant="filled" text="Continue" />
      </CardContent>
    </Card>
  );
}
