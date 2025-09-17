'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
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
import { Form, FormField } from '@/components/ui/form';
import InputField from '@/atoms/fields/NewInput';
import InputNumPatternField from '@/atoms/fields/PhoneNumberInput';

function PatientRegView() {
  const router = useRouter();
  const {
    AuthStore: { createAcct, isLoading }
  } = useStore();
  const form = useForm<TCreateAccount>({
    defaultValues: { role: EnumRole.PATIENT },
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            disabled={isLoading.register}
            className="flex flex-col space-y-4 rounded-2xl bg-white px-4 py-8 shadow-lg"
          >
            <div className="">
              <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputField label="first Name" placeholder="John" required {...field} />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <div className="md:mb-0 md:w-[50%]">
                      <InputField label="Last Name" placeholder="Doe" required {...field} />
                    </div>
                  )}
                />
              </div>

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

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <InputNumPatternField
                    label="Phone Number"
                    format="(+234) ### #### ###"
                    allowEmptyFormatting
                    mask=" "
                    onValueChange={(values) => {
                      const unfilteredValue = values.formattedValue
                        .split(' ')
                        .join('')
                        .replace('(+234)', '+234');
                      if (unfilteredValue === '+234') {
                        field.onChange('');
                      } else {
                        field.onChange(unfilteredValue);
                      }
                    }}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div>
                    <InputField type="password" label="Password" required {...field} />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <div>
                    <InputField type="password" label="Confirm Password" required {...field} />
                  </div>
                )}
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
      </Form>
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
