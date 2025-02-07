import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestTabs from '../available/components/tabs';
import InputSearch from '@/atoms/fields/InputSearch';
import PendingTestItem from './components/TestItemCard';

const PendingTest = () => {
  return (
    <div className="space-y-4">
      <div className="">
        <Tabs defaultValue="single" className="w-full ">
          <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-xl">
            <TestTabs />
            <InputSearch />
          </div>
          <div className="">
            <TabsContent value="single">
              <PendingTestItem />
              <PendingTestItem />
              <PendingTestItem />
              <PendingTestItem />
            </TabsContent>
            <TabsContent value="package">
              <PendingTestItem />
              <PendingTestItem />
              <PendingTestItem />
              <PendingTestItem />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default PendingTest;
