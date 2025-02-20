import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InputSearch from '@/atoms/fields/InputSearch';
import TestItems from '@/components/common/testItems';
import SingleTestCard from '@/components/test/SingleTestCard';
import { SingleTest } from '@/types/test';
import { cartStore } from '@/store/Cart';

interface TestProps {
  Test: SingleTest[];
  viewTestDetails?: (test: SingleTest) => void;
}

const TestTabs = ({ Test, viewTestDetails }: TestProps) => {
  return (
    <Tabs defaultValue="single" className="w-full ">
      <div className="flex items-center justify-between bg-white p-2">
        <TabsList>
          <TabsTrigger value="single">Single Tests</TabsTrigger>
          <TabsTrigger value="package">Package Tests</TabsTrigger>
        </TabsList>
        <InputSearch />
      </div>
      <div className="">
        <TabsContent value="single">
          {Test.map((test) => (
            <SingleTestCard
              key={test.id}
              test={test}
              onViewDetails={viewTestDetails ? () => viewTestDetails(test) : undefined}
            />
          ))}
        </TabsContent>
        <TabsContent value="package">
          <TestItems />
          <TestItems />
          <TestItems />
          <TestItems />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TestTabs;
