'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
// import GoogleBtn from '@/atoms/Buttons/GoogleBtn';
// import FacebookBtn from '@/atoms/Buttons/FacebookBtn';
import HyperLink from '@/atoms/Hyperlink';
import ROUTES from '@/constants/routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginValidationSchema, TLogin } from '@/app/auth/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/atoms/fields/NewInput';
import InputNumPatternField from '@/atoms/fields/PhoneNumberInput';
import { FaEnvelope, FaPhone } from 'react-icons/fa6';
import { useState } from 'react';

function LoginView() {
  const router = useRouter();
  const {
    AuthStore: { login, isLoading }
  } = useStore();
  const queryClient = useQueryClient();
  const [loginMethod, setLoginMethod] = useState('');

  const form = useForm<TLogin>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginValidationSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TLogin> = async (formData) => {
    login(formData, (url) => {
      queryClient.resetQueries().then(() => router.replace(url));
    });
  };

  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            disabled={isLoading.login}
            className="flex flex-col space-y-4 rounded-2xl bg-white px-4 py-8 shadow-lg"
          >
            <div className="flex flex-col space-y-2">
              {loginMethod !== 'mail' && (
                <Button
                  className="font-medium"
                  type="button"
                  variant="outlined"
                  leftIcon={<FaEnvelope className="text-blue-400" />}
                  onClick={() => setLoginMethod('mail')}
                  text="Continue with Email"
                />
              )}

              {loginMethod !== 'phone' && (
                <Button
                  className="font-medium"
                  type="button"
                  variant="outlined"
                  leftIcon={<FaPhone className="text-blue-400" />}
                  onClick={() => setLoginMethod('phone')}
                  text="Continue with Phone number"
                />
              )}
            </div>

            <div className="">
              {loginMethod === 'mail' && (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div>
                      <InputField
                        type="email"
                        label="Email Address"
                        placeholder="adeolu@gmail.com"
                        {...field}
                      />
                    </div>
                  )}
                />
              )}

              {loginMethod === 'phone' && (
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <div>
                      <InputNumPatternField
                        label="Phone Number"
                        format="(+234) ### #### ###"
                        allowEmptyFormatting
                        mask=" "
                        {...field}
                      />
                    </div>
                  )}
                />
              )}
              {loginMethod !== '' && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div>
                      <InputField type="password" label="Password" {...field} />
                    </div>
                  )}
                />
              )}

              <div className="flex w-full items-center justify-between">
                <div></div>
                <HyperLink
                  className="!w-full justify-end"
                  info=""
                  hrefText="Forgot password."
                  href={ROUTES.REGISTER.path}
                />
              </div>
            </div>

            {loginMethod !== '' && (
              <Button
                type="submit"
                variant="filled"
                isLoading={isLoading.login}
                disabled={isLoading.login}
              >
                Continue
              </Button>
            )}
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
      </Form>
    </Card>
  );
}

export default observer(LoginView);
