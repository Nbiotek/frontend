'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import GoogleBtn from '@/atoms/Buttons/GoogleBtn';
import FacebookBtn from '@/atoms/Buttons/FacebookBtn';
import Input from '@/atoms/fields/Input';
import HyperLink from '@/atoms/Hyperlink';
import ROUTES from '@/constants/routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginValidationSchema, TLogin } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';

function LoginView() {
  const {
    AuthStore: { login, isLoading }
  } = useStore();
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<TLogin>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginValidationSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TLogin> = async (formData) => {
    login(formData);
  };
  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          disabled={isLoading.login}
          className="flex flex-col space-y-4 rounded-2xl bg-white px-4 py-8 shadow-lg"
        >
          {/* <div className="flex flex-col space-y-2">
          <GoogleBtn />
          <FacebookBtn />
        </div>

        <div className="flex items-center justify-between text-neutral-200">
          <div className="h-[1px] w-[45%] bg-neutral-100"></div>
          <p>or</p>
          <div className="h-[1px] w-[45%] bg-neutral-100"></div>
        </div> */}

          <div className="">
            <Input
              type="email"
              label="Email Address"
              placeholder="adeolu@gmail.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              type="password"
              label="Password"
              {...register('password')}
              error={errors.password?.message}
              child={
                <HyperLink
                  className="!w-full justify-end"
                  info="Forgot password ?"
                  hrefText="Reset"
                  href="/"
                />
              }
            />
          </div>
          <Button
            type="submit"
            variant="filled"
            isLoading={isLoading.login}
            disabled={isLoading.login}
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

export default observer(LoginView);
