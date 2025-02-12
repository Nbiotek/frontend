'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import Input from '@/atoms/fields/Input';
import HyperLink from '@/atoms/Hyperlink';
import ROUTES from '@/constants/routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NewPwdSchema, TNewPwdSchema } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';

interface IPwdResetViewProps {
  token: string;
}

function PwdResetVew({ token }: IPwdResetViewProps) {
  const router = useRouter();
  const {
    AuthStore: { newPwd, isLoading }
  } = useStore();
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<TNewPwdSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(NewPwdSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TNewPwdSchema> = async (formData) => {
    const newPwdPayload: TNewPwdPayload = {
      ...formData,
      token
    };
    newPwd(newPwdPayload, () => {
      router.replace(ROUTES.LOGIN.path);
    });
  };
  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle>Password Reset</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          disabled={isLoading.newPwd}
          className="flex flex-col space-y-4 rounded-2xl bg-white px-4 py-8 shadow-lg"
        >
          <div className="">
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
              child={
                <HyperLink
                  className="!w-full justify-end"
                  info="Remember password ?"
                  hrefText="Login"
                  href={ROUTES.LOGIN.path}
                />
              }
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

export default observer(PwdResetVew);
