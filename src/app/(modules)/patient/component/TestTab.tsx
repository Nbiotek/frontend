import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InputSearch from '@/atoms/fields/InputSearch';
import TestItems from '@/components/common/testItems';
import SingleTestCard from '@/components/test/SingleTestCard';
import SingleTestDialog from '@/components/test/TestDetailsDialog';
import { useState } from 'react';

import { SingleTest } from '@/types/test';
import { cartStore } from '@/store/Cart';
import { useTestsSingle } from '@/hooks/patient/useTest';

const TestTabs = () => {
  const { data, isLoading, error } = useTestsSingle();

  console.log(data);

  const [selectedTest, setSelectedTest] = useState<SingleTest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (test: SingleTest) => {
    setSelectedTest(test);
    setIsDetailsOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tests</div>;
  if (!data) return null;
  return (
    <>
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
            {data.data.availableTests.map((test) => (
              <SingleTestCard key={test.id} test={test} onViewDetails={handleViewDetails} />
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
      <SingleTestDialog
        test={selectedTest}
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  );
};

export default TestTabs;
