'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SingleTests from './SingleTests';
import PackageTests from './PackageTests';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';

const TestContents = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <div className="w-full">
      <Tabs defaultValue="individual" className="flex w-full flex-col space-y-2">
        <div className="flex w-full flex-col space-y-3 rounded-lg bg-white p-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <TabsList className="w-fit">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="package">Special Package</TabsTrigger>
          </TabsList>

          <Button
            className="w-fit bg-blue-400"
            onClick={() =>
              toggleModals({ name: AppModals.ADMIN_SINGLE_TEST, open: true, testId: '' })
            }
          >
            <PlusIcon /> Single
          </Button>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full" value="individual">
            <SingleTests />
          </TabsContent>
          <TabsContent className="w-full" value="package">
            <PackageTests />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default observer(TestContents);
