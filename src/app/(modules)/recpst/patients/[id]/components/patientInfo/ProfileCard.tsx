import { useState } from 'react';
import { Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SubTitle } from '@/atoms/typographys';
import { TPatientOverviewProfile } from './RecptRegView';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4 flex items-center justify-start space-x-2 border-b pb-4 last:mb-0 last:border-b-0 last:pb-0">
      <div className="w-auto text-sm font-medium text-blue-400">{label}</div>
      <div className="w-full rounded-md bg-neutral-50 p-2 text-sm">{value}</div>
    </div>
  );
}

const ProfileCard = ({ profile }: { profile: TPatientOverviewProfile }) => {
  const {
    PatientStore: { personalInfo }
  } = useStore();
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white">
      <div className="h-20 bg-blue-400"></div>

      <div className="mb-8">
        <div className="relative -mt-10 flex justify-center">
          <div className="relative">
            <Avatar className="h-28 w-28 rounded-full border-4 border-white">
              <AvatarFallback className="bg-neutral-200 text-3xl">
                {profile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>

            <Button
              className="absolute bottom-0 right-0 rounded-full bg-blue-300 p-3 text-white hover:bg-blue-400"
              size="icon"
            >
              <Camera className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="mt-2 text-center text-xs text-neutral-500">
          <p>Allowed *.jpeg, *.jpg, *.png, *.gif</p>
          <p>Max size of 2.00MB</p>
        </div>

        <SubTitle className="!text-center" text={profile.name} />
      </div>

      <Card className="mx-4 mb-6 border-none shadow-none">
        <CardContent className="p-0">
          <InfoField label="ID" value={`${profile.id.slice(0, 3)}...${profile.id.slice(-3)}`} />
          <InfoField label="Gender" value={profile.gender} />
          <InfoField label="Age" value={profile.age} />
          <InfoField label="Mobile" value={profile.mobile} />
          <InfoField label="Address" value={profile.address} />
        </CardContent>
      </Card>
    </div>
  );
};

export default observer(ProfileCard);
