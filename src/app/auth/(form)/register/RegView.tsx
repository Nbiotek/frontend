'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import GoogleBtn from '@/atoms/Buttons/GoogleBtn';
import FacebookBtn from '@/atoms/Buttons/FacebookBtn';
import Input from '@/atoms/fields/Input';
import HyperLink from '@/atoms/Hyperlink';
import ROUTES from '@/constants/routes';
import InputCheck from '@/atoms/fields/InputCheck';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateAccountValidationSchema, TCreateAccount } from '@/app/auth/validation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { EnumRole } from '@/constants/mangle';

function PatientRegView() {
  const router = useRouter();
  const {
    AuthStore: { createAcct, isLoading }
  } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TCreateAccount>({
    defaultValues: { firstName: 'patient', lastName: 'patient', role: EnumRole.PATIENT },
    mode: 'onSubmit',
    resolver: zodResolver(CreateAccountValidationSchema),
    reValidateMode: 'onChange'
  });

  const onSubmit: SubmitHandler<TCreateAccount> = async (formData) => {
    createAcct(formData, () => router.replace(ROUTES.OTP.path));
  };

  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle>Create your account</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          disabled={isLoading.register}
          className="flex flex-col space-y-4 rounded-2xl bg-white px-4 py-8 shadow-lg"
        >
          <div className="flex flex-col space-y-2">
            <GoogleBtn />
            <FacebookBtn />
          </div>

          <div className="flex items-center justify-between text-neutral-200">
            <div className="h-[1px] w-[45%] bg-neutral-100"></div>
            <p>or</p>
            <div className="h-[1px] w-[45%] bg-neutral-100"></div>
          </div>

          <div className="">
            {/* <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="fname"
                label="First Name"
                placeholder="Adeolu"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="lname"
                label="Last Name"
                placeholder="John"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div> */}
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
            />
            <Input
              type="password"
              label="Confirm Password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>
          <Button
            type="submit"
            variant="filled"
            isLoading={isLoading.register}
            disabled={isLoading.register}
          >
            Continue
          </Button>
          <div className="flex flex-col items-center justify-center">
            <HyperLink
              className="my-2 !w-full justify-end"
              info="Already have an account ?"
              hrefText="Log in"
              href={ROUTES.LOGIN.path}
            />
          </div>
        </fieldset>
      </form>

      <div className="my-6 flex flex-col items-center justify-center">
        <InputCheck
          showInput={false}
          label="By creating an account you agree with Nbiotek's :Terms - https://google.com; and :Conditions - https://giyf.com;"
        />
      </div>
    </Card>
  );
}

export default observer(PatientRegView);
