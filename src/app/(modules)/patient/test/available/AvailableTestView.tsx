'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InputSearch from '@/atoms/fields/InputSearch';
import TestItems from '@/components/common/testItems';
import SingleTestCard from '@/components/test/SingleTestCard';
import { SingleTest } from '@/types/test';
import { individualTests } from '@/api/data/test';
import { useState } from 'react';
import SingleTestDialog from '@/components/test/TestDetailsDialog';
import TestTabs from '../../component/TestTab';

const AvailableTestView = () => {
  const [selectedTest, setSelectedTest] = useState<SingleTest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (test: SingleTest) => {
    setSelectedTest(test);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="">
        <TestTabs Test={individualTests} viewTestDetails={(test) => handleViewDetails(test)} />
      </div>
      <SingleTestDialog
        test={selectedTest}
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        // onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default AvailableTestView;
