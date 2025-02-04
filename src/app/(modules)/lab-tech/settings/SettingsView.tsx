import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Profile from './components/Profile';
import Security from './components/Security';
import Others from './components/Others';

const SettingsView = () => {
  return (
    <div className="w-full rounded-lg bg-white p-4">
      <Tabs defaultValue="profile" className="flex w-full flex-col space-y-4 divide-y">
        <div className="mx-auto w-full max-w-fit">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Privacy & Security</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full py-8">
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
