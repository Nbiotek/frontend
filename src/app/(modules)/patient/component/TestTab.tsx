import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InputSearch from '@/atoms/fields/InputSearch';
import SingleTestCard from '@/components/test/SingleTestCard';
import SingleTestDialog from '@/components/test/TestDetailsDialog';
import { useState } from 'react';

import { PackageTest, SingleTest } from '@/types/test';
import { useTestPackages, useTestsSingle } from '@/hooks/patient/useTest';
import PackageTestCard from '@/components/test/packageTestCard';

const TestTabs = () => {
  const { data, isLoading, error } = useTestsSingle();
  const { data: packageData, isLoading: pkgLoading, error: pkgError } = useTestPackages();

  // Combined state for selected test (either single or package)
  const [selectedTest, setSelectedTest] = useState<SingleTest | PackageTest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Handle single test selection
  const handleViewDetails = (test: SingleTest) => {
    setSelectedTest(test);
    setIsDetailsOpen(true);
  };

  // Handle package test selection
  const handlePackageViewTest = (test: PackageTest) => {
    setSelectedTest(test);
    setIsDetailsOpen(true);
  };

  console.log(data);

  if (isLoading || pkgLoading) return <div>Loading...</div>;
  if (error || pkgError) return <div>Error loading tests</div>;
  if (!data || !packageData) return null;

  return (
    <>
      <Tabs defaultValue="single" className="w-full">
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
              <SingleTestCard
                key={test.id}
                test={test}
                onViewDetails={() => handleViewDetails(test)}
              />
            ))}
          </TabsContent>
          <TabsContent value="package">
            {packageData.data.map((test) => (
              <PackageTestCard
                key={test.id}
                test={test}
                onViewDetails={() => handlePackageViewTest(test)}
              />
            ))}
          </TabsContent>
        </div>
      </Tabs>

      {/* Use the same dialog for both test types */}
      <SingleTestDialog
        test={selectedTest}
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  );
};

export default TestTabs;
