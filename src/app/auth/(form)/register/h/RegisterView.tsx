'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import Input from '@/atoms/fields/Input';
import HyperLink from '@/atoms/Hyperlink';
import ROUTES from '@/constants/routes';
import InputCheck from '@/atoms/fields/InputCheck';
import InputSelect from '@/atoms/fields/InputSelect';
import { role } from '@/constants/data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateAccountValidationSchema, TCreateAccount } from '@/app/auth/validation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';

function RegisterView() {
  const router = useRouter();
  const {
    AuthStore: { createAcct, isLoading }
  } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm<TCreateAccount>({
    mode: 'onSubmit',
    resolver: zodResolver(CreateAccountValidationSchema),
    reValidateMode: 'onChange'
  });

  const onSubmit: SubmitHandler<TCreateAccount> = async (formData) => {
    createAcct(formData, () => router.replace(ROUTES.OTP.path));
  };

  const handleSetValue = (key: string, value: string) => {
    const _typeKey = key as keyof TCreateAccount;
    setValue(_typeKey, value);
    clearErrors(_typeKey);
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
          <div className="">
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
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
            </div>

            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input
                className="md:mb-0 md:w-[50%]"
                type="email"
                label="Email Address"
                placeholder="adeolu@gmail.com"
                {...register('email')}
                error={errors.email?.message}
              />
              <InputSelect
                className="md:w-[50%]"
                id="role"
                label="Role"
                name="role"
                items={role}
                placeholder="Select a role"
                handleSetValue={handleSetValue}
                error={errors.role?.message}
              />
            </div>
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

export default observer(RegisterView);
