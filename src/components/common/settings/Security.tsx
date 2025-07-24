'use client';
import Button from '@/atoms/Buttons';
import Status from '@/atoms/Buttons/Status';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { useFetchProfileSettings } from '@/hooks/settings/useFetchProfileSettings';
import RecoveryEmailForm from './components/RecoveryEmailForm';
import PwdChangeForm from './components/PwdChangeForm';
import RecoveryPhoneForm from './components/RecoveryNumberForm';
import { Skeleton } from '@/components/ui/skeleton';

const Security = () => {
  const { data, status } = useFetchProfileSettings();
  return (
    <div className="flex w-full flex-col space-y-4">
      {status === 'pending' && (
        <>
          <Skeleton className="h-40" />
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </>
      )}

      {status === 'success' && data && (
        <>
          <div className="pb-4">
            <SubTitle
              className=""
              text="Manage security and privacy settings to protect your account"
            />
            <Paragraph text="Select the types of notifications you receive about your activities and recommendations." />
          </div>

          <div className="flex flex-col justify-start space-y-4 rounded-lg border p-2">
            <SubTitle className="border-b pb-2" text="Account Details" />

            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between space-x-6">
                <div className="w-full max-w-[450px]">
                  <Paragraph className="!font-medium" text="Verify Email Address" />
                  <Paragraph text="Verify your email address to confirm the credentials" />
                </div>

                {data.isEmailVerified ? (
                  <Status variant="VERIFIED" />
                ) : (
                  <Button className="!w-16" size="sm" variant="filled">
                    Verify
                  </Button>
                )}
              </div>

              <PwdChangeForm />
            </div>
          </div>

          <div className="flex flex-col justify-start space-y-4 rounded-lg border p-2">
            <SubTitle className="border-b pb-2" text="Recovery Settings" />

            <div className="flex flex-col space-y-4">
              <RecoveryEmailForm />
              <RecoveryPhoneForm />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Security;
