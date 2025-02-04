import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Profile from './components/Profile';
import Security from './components/Security';
import Others from './components/Others';

const SettingsView = () => {
  return (
    <div className="w-full rounded-lg bg-white p-2">
      <Tabs defaultValue="profile" className="w-full max-w-[750px]">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Privacy & Security</TabsTrigger>
          <TabsTrigger value="others">Others</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
        <TabsContent value="security">
          <Security />
        </TabsContent>
        <TabsContent value="others">
          <Others />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsView;
