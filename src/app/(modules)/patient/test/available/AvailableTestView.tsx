import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestTabs from './components/tabs';
import InputSearch from '@/atoms/fields/InputSearch';
import TestItems from '@/components/common/testItems';

const AvailableTestView = () => {
  return (
    <div className="space-y-4">
      <div className="">
        <Tabs defaultValue="single" className="w-full ">
          <div className="flex items-center justify-between bg-white p-2">
            <TestTabs />
            <InputSearch />
          </div>
          <div className="">
            <TabsContent value="single">
              <TestItems />
              <TestItems />
              <TestItems />
              <TestItems />
            </TabsContent>
            <TabsContent value="package">
              <TestItems />
              <TestItems />
              <TestItems />
              <TestItems />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AvailableTestView;
