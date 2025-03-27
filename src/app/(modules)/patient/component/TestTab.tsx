import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InputSearch from '@/atoms/fields/InputSearch';
import SingleTestCard from '@/components/test/SingleTestCard';
import AllTestsDialog from '@/components/test/TestDetailsDialog';
import { useState, useEffect } from 'react';

import { PackageTest, SingleTest } from '@/types/test';
import { useTestPackages, useTestsSingle } from '@/hooks/patient/useTest';
import PackageTestCard from '@/components/test/packageTestCard';

const TestTabs = () => {
  const { data, isLoading, error } = useTestsSingle();
  const { data: packageData, isLoading: pkgLoading, error: pkgError } = useTestPackages();

  // Combined state for selected test (either single or package)
  const [selectedTest, setSelectedTest] = useState<SingleTest | PackageTest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSingleTests, setFilteredSingleTests] = useState<SingleTest[]>([]);
  const [filteredPackageTests, setFilteredPackageTests] = useState<PackageTest[]>([]);

  // Handle search from InputSearch component
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Filter tests based on search term
  useEffect(() => {
    if (!data || !packageData) return;

    const term = searchTerm.toLowerCase().trim();

    // Filter single tests
    if (data.data.availableTests) {
      const filtered = data.data.availableTests.filter(
        (test) =>
          test.name.toLowerCase().includes(term) ||
          test.description?.toLowerCase().includes(term) ||
          test.category?.toLowerCase().includes(term)
      );
      setFilteredSingleTests(filtered);
    }

    // Filter package tests
    if (packageData.data) {
      const filtered = packageData.data.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(term) ||
          pkg.description?.toLowerCase().includes(term) ||
          // Also search within included tests
          pkg.tests?.some(
            (test) =>
              test.name.toLowerCase().includes(term) ||
              test.description?.toLowerCase().includes(term)
          )
      );
      setFilteredPackageTests(filtered);
    }
  }, [searchTerm, data, packageData]);

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
          <InputSearch
            className="!w-[calc(70%-80px)]"
            placeholder="Search for tests..."
            onSearch={handleSearch}
          />
        </div>
        <div className="">
          <TabsContent value="single">
            {searchTerm && filteredSingleTests.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No tests found matching &quot;{searchTerm}&quot;</p>
              </div>
            ) : (
              (searchTerm ? filteredSingleTests : data.data.availableTests).map((test) => (
                <SingleTestCard
                  key={test.id}
                  test={test}
                  onViewDetails={() => handleViewDetails(test)}
                />
              ))
            )}
          </TabsContent>
          <TabsContent value="package">
            {searchTerm && filteredPackageTests.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No packages found matching &quot;{searchTerm}&quot;</p>
              </div>
            ) : (
              (searchTerm ? filteredPackageTests : packageData.data).map((test) => (
                <PackageTestCard
                  key={test.id}
                  test={test}
                  onViewDetails={() => handlePackageViewTest(test)}
                />
              ))
            )}
          </TabsContent>
        </div>
      </Tabs>

      {/* Use the same dialog for both test types */}
      <AllTestsDialog
        test={selectedTest}
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  );
};

export default TestTabs;
