'use client';
import { useEffect } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OtpInputs from '@/components/OtpInputs';
import Button from '@/atoms/Buttons';
import { TOTP, OTPValidationSchema } from '@/components/OtpInputs/validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import HyperLink from '@/atoms/Hyperlink';
import { useStore } from '@/store';
import { useCountdown } from '@/hooks/useCountdown';
import { EnumResendToken } from '@/store/Auth';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';

function OTPVerificationView() {
  const router = useRouter();
  const {
    AuthStore: {
      otpTimer,
      resendingToken,
      setResendingToken,
      verifyAcctOTP,
      resendAcctOTP,
      isLoading
    }
  } = useStore();

  const { timeToCodeResend, resendCodeActive, setCounter } = useCountdown(otpTimer);

  const handleStartCounter = () => {
    setCounter(otpTimer);
    setResendingToken(EnumResendToken.SENT);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TOTP>({
    mode: 'onBlur',
    resolver: zodResolver(OTPValidationSchema)
  });

  const onSubmit: SubmitHandler<TOTP> = async (formData) => {
    const code = Object.values(formData).join('');
    verifyAcctOTP(code);
  };

  useEffect(() => {
    if (resendCodeActive) {
      setResendingToken(EnumResendToken.IDLE);
    } else {
      setResendingToken(EnumResendToken.SENT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resendCodeActive]);

  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-[24px] font-normal text-neutral-700">Verify with OTP</CardTitle>
        <CardDescription className="text-[20px] font-light text-neutral-700">
          Please enter the One Time Password(OTP) sent to your phone or Email
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          disabled={isLoading.OTP}
          className="flex flex-col items-center gap-3 rounded-2xl bg-white px-4 py-8  shadow-lg"
        >
          <OtpInputs register={register} errors={errors} />

          <div className="mt-4">
            {resendingToken === EnumResendToken.SENT && <small>{timeToCodeResend}</small>}
            {resendingToken !== EnumResendToken.SENT ? (
              <HyperLink
                href=""
                info="Didn’t receive code?"
                hrefText="Resend"
                onClick={() => {
                  resendAcctOTP(() => handleStartCounter());
                }}
              />
            ) : null}
          </div>
          <Button
            variant="filled"
            text="Continue"
            isLoading={isLoading.OTP}
            disabled={isLoading.OTP}
          />
        </fieldset>
      </form>
    </Card>
  );
}

export default observer(OTPVerificationView);
