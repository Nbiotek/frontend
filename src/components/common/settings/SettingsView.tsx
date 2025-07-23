'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Profile from './Profile';
import Security from './Security';
import Others from './Others';
import Notifications from './Notifications';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { EnumRole } from '@/constants/mangle';

const SettingsView = () => {
  const {
    AuthStore: { user }
  } = useStore();
  const isPatient = user.role === EnumRole.PATIENT;
  return (
    <div className="w-full">
      <Tabs
        defaultValue={isPatient ? 'profile' : 'security'}
        className="flex w-full flex-col space-y-4"
      >
        <div className=" w-full rounded-lg bg-white p-2">
          <TabsList>
            {isPatient && <TabsTrigger value="profile">Profile</TabsTrigger>}
            <TabsTrigger value="security">Privacy & Security</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full max-w-[650px]" value="profile">
            <Profile />
          </TabsContent>
          <TabsContent className="w-full max-w-[650px]" value="security">
            <Security />
          </TabsContent>
          <TabsContent className="w-full max-w-[650px]" value="others">
            <Others />
          </TabsContent>
          <TabsContent className="w-full max-w-[650px]" value="notifications">
            <Notifications />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default observer(SettingsView);
