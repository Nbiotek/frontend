'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Profile from './Profile';
import Security from './Security';
import Others from './Others';

const SettingsView = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="profile" className="flex w-full flex-col space-y-4">
        <div className=" w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Privacy & Security</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
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
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsView;
