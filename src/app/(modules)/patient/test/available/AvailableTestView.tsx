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

import { useTestsSingle } from '@/hooks/patient/useTest';

const AvailableTestView = () => {
  const [selectedTest, setSelectedTest] = useState<SingleTest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { data, isLoading, error } = useTestsSingle();

  console.log(data);

  const handleViewDetails = (test: SingleTest) => {
    setSelectedTest(test);
    setIsDetailsOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tests</div>;
  if (!data) return null;

  return (
    <div className="space-y-4">
      <div className="">
        <TestTabs
          Test={data.data.availableTests}
          viewTestDetails={(test) => handleViewDetails(test)}
        />
      </div>
      <SingleTestDialog
        test={selectedTest}
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default AvailableTestView;
