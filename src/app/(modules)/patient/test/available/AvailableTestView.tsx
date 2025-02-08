'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestTabs from './components/tabs';
import InputSearch from '@/atoms/fields/InputSearch';
import TestItems from '@/components/common/testItems';
import SingleTestCard from '@/components/test/SingleTestCard';
import { SingleTest } from '@/types/test';
import { individualTests } from '@/api/data/test';
import { useState } from 'react';
import SingleTestDialog from '@/components/test/TestDetailsDialog';

const AvailableTestView = () => {
  const [selectedTest, setSelectedTest] = useState<SingleTest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (test: SingleTest) => {
    console.log(test);
    setSelectedTest(test);
    setIsDetailsOpen(true);
  };

  const handleAddToCart = (test: SingleTest) => {
    console.log(test);
  };

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
              {individualTests.map((test) => (
                <SingleTestCard
                  key={test.id}
                  test={test}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
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
      </div>
      <SingleTestDialog
        test={selectedTest}
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default AvailableTestView;
