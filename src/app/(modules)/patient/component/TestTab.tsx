'use client';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InputSearch from '@/atoms/fields/InputSearch';
import { useTestPackages, useTestsSingle } from '@/hooks/patient/useTest';
import { PackageTest, SingleTest } from '@/types/test';
import Spinner from '@/lib/utils/spinner';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft } from 'lucide-react';
import { Toast } from '@/atoms/Toast';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import TestCard from '../test/available/component/TestCard';
import TestDetailView from '../test/available/component/TestDetailView';
import CartSummary from '../test/available/component/CartSummary';

interface TestSelectionPanelProps {
  onClose: () => void;
  confirmButtonText?: string;
  hideHeader?: boolean;
  hideCartSummary?: boolean;
}

const TestSelectionPanel = observer(
  ({
    onClose,
    confirmButtonText = 'Confirm Selection',
    hideHeader = false,
    hideCartSummary = false
  }: TestSelectionPanelProps) => {
    const {
      CartStore: { isInCart, addItem, removeItem }
    } = useStore();

    const { data, isLoading } = useTestsSingle();
    const { data: packageData, isLoading: pkgLoading } = useTestPackages();

    // States
    const [activeTab, setActiveTab] = useState('single');
    const [detailView, setDetailView] = useState(false);
    const [selectedTest, setSelectedTest] = useState<SingleTest | PackageTest | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSingleTests, setFilteredSingleTests] = useState<SingleTest[]>([]);
    const [filteredPackageTests, setFilteredPackageTests] = useState<PackageTest[]>([]);

    const handleSearch = (term: string) => {
      setSearchTerm(term);
    };

    // Filter tests based on search term
    useEffect(() => {
      if (!data || !packageData) return;

      const term = searchTerm.toLowerCase().trim();

      // Filter single tests
      if (data.data.requests) {
        const filtered = data.data.requests.filter(
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
            pkg.tests?.some(
              (test) =>
                test.name.toLowerCase().includes(term) ||
                test.description?.toLowerCase().includes(term)
            )
        );
        setFilteredPackageTests(filtered);
      }
    }, [searchTerm, data, packageData]);

    const handleViewDetails = (test: SingleTest | PackageTest) => {
      setSelectedTest(test);
      setDetailView(true);
    };

    const handleAddToCart = (test: SingleTest | PackageTest) => {
      const isPackage = 'tests' in test;

      try {
        addItem(test, isPackage ? 'package' : 'single');
        Toast.success(`Added ${test.name} to your selection`);
      } catch (error) {
        Toast.error('Failed to add test to selection');
      }
    };

    const handleRemoveFromCart = (id: string, name: string) => {
      try {
        removeItem(id);
        Toast.success(`Removed ${name} from your selection`);
      } catch (error) {
        Toast.error('Failed to remove test from selection');
      }
    };

    if (isLoading || pkgLoading) {
      return (
        <div className="flex h-full w-full items-center justify-center p-8">
          <Spinner />
        </div>
      );
    }

    if (!data || !packageData) return null;

    if (detailView && selectedTest) {
      return (
        <TestDetailView
          test={selectedTest}
          onBack={() => setDetailView(false)}
          onAddToCart={() => handleAddToCart(selectedTest)}
          onRemoveFromCart={() => handleRemoveFromCart(selectedTest.id, selectedTest.name)}
          hideCartSummary={hideCartSummary}
        />
      );
    }

    return (
      <div className="flex h-full flex-col">
        {hideHeader && (
          <div className="flex items-center justify-between border-b bg-white p-4">
            <h2 className="text-xl font-semibold">Select Tests</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white p-3 shadow-sm">
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

          <div className="flex-1 overflow-y-auto p-2">
            <TabsContent value="single" className="mt-0 space-y-2">
              {searchTerm && filteredSingleTests.length === 0 ? (
                <EmptySearchResults searchTerm={searchTerm} />
              ) : (
                (searchTerm ? filteredSingleTests : data.data.requests).map((test) => (
                  <TestCard
                    key={test.id}
                    test={test}
                    onView={() => handleViewDetails(test)}
                    onAdd={() => handleAddToCart(test)}
                    onRemove={() => handleRemoveFromCart(test.id, test.name)}
                    isInCart={isInCart(test.id)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="package" className="mt-0 space-y-2">
              {searchTerm && filteredPackageTests.length === 0 ? (
                <EmptySearchResults searchTerm={searchTerm} />
              ) : (
                (searchTerm ? filteredPackageTests : packageData.data).map((test) => (
                  <TestCard
                    key={test.id}
                    test={test}
                    isPackage
                    onView={() => handleViewDetails(test)}
                    onAdd={() => handleAddToCart(test)}
                    onRemove={() => handleRemoveFromCart(test.id, test.name)}
                    isInCart={isInCart(test.id)}
                  />
                ))
              )}
            </TabsContent>
          </div>
        </Tabs>

        {!hideCartSummary && (
          <CartSummary
            onClose={onClose}
            onRemoveItem={handleRemoveFromCart}
            confirmButtonText={confirmButtonText}
          />
        )}
      </div>
    );
  }
);

// Empty search results component
const EmptySearchResults = ({ searchTerm }: { searchTerm: string }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <Search className="text-gray-400 mb-2 h-10 w-10" />
    <p className="text-gray-500">No tests found matching &quot;{searchTerm}&quot;</p>
  </div>
);

export default TestSelectionPanel;
