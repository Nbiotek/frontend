'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import Input from '@/atoms/fields/Input';
import HyperLink from '@/atoms/Hyperlink';
import ROUTES from '@/constants/routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ForgotPwdSchema, TForgotPwd } from '../../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';

function ForgotPwdView() {
  const router = useRouter();
  const {
    AuthStore: { forgotPwd, isLoading }
  } = useStore();
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<TForgotPwd>({
    mode: 'onSubmit',
    resolver: zodResolver(ForgotPwdSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TForgotPwd> = async (formData) => {
    forgotPwd(formData);
  };
  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle>Forgot Password</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          disabled={isLoading.newPwd}
          className="flex flex-col space-y-4 rounded-2xl bg-white px-4 py-8 shadow-lg"
        >
          <div className="">
            <Input
              type="email"
              label="Email"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>
          <Button
            type="submit"
            variant="filled"
            isLoading={isLoading.newPwd}
            disabled={isLoading.newPwd}
          >
            Continue
          </Button>
          <div className="flex flex-col items-center justify-center">
            <HyperLink
              className="my-2 !w-full justify-end"
              info="Don't have an account ?"
              hrefText="Register"
              href={ROUTES.REGISTER.path}
            />
          </div>
        </fieldset>
      </form>
    </Card>
  );
}

export default observer(ForgotPwdView);
