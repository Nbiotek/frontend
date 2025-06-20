'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Filter, SortAsc } from 'lucide-react';

import TestCard from './components/TestCard';
import PackageTestCard from './components/PackageTestCard';
import { PackageTestSkeleton, TestCardSkeleton } from './components/TestCardSkeleton';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import Button from '@/atoms/Buttons';
import { useSearchParams } from 'next/navigation';

const LabTestViewFallback = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="bg-gradient-to-br from-blue-400 to-blue-400 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 h-12 w-3/4 animate-pulse rounded-lg bg-blue-300"></div>
            <div className="mx-auto mb-8 h-8 w-2/3 animate-pulse rounded-lg bg-blue-200"></div>
            <div className="mx-auto mb-8 h-16 w-full animate-pulse rounded-full bg-white/20"></div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-gray-200 mb-8 h-12 w-full animate-pulse rounded-lg"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-200 h-64 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LoadingState = ({ type }: { type: 'individual' | 'package' }) => (
  <div
    className={
      type === 'individual' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-8'
    }
  >
    {Array.from({ length: type === 'individual' ? 6 : 3 }, (_, i) =>
      type === 'individual' ? <TestCardSkeleton key={i} /> : <PackageTestSkeleton key={i} />
    )}
  </div>
);

const NoResults = ({ searchQuery, testType }: { searchQuery: string; testType: string }) => (
  <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
    <div className="mb-6 rounded-full bg-blue-100 p-4">
      <Search className="text-blue-500 h-8 w-8" />
    </div>
    <h3 className="text-gray-900 mb-2 text-xl font-semibold">No {testType} found</h3>
    <p className="text-gray-600 mb-6 max-w-md">
      We couldn&apos;t find any {testType} matching {searchQuery}. Try a different search term or
      browse our available tests.
    </p>
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button variant="outlined" onClick={() => window.location.reload()}>
        Clear Search
      </Button>
      <Button variant="filled">Contact Support</Button>
    </div>
  </div>
);

const LabTestContent = () => {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'lab-tests');
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  const { TestStore } = useStore();

  useEffect(() => {
    if (!dataFetched) {
      TestStore.fetchPackageTests();
      TestStore.fetchSingleTests();
      setDataFetched(true);
    }
  }, [TestStore, dataFetched]);

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const { singleTests, packageTests, isLoadingSingleTests, isLoadingPackageTests } = TestStore;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredLabTests = singleTests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test?.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(singleTests);

  const filteredPackageTests = packageTests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTabLoadingState = (tab: string) => {
    switch (tab) {
      case 'lab-tests':
        return isLoadingSingleTests || isLoading;
      case 'package-tests':
        return isLoadingPackageTests || isLoading;
      default:
        return isLoading;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="bg-gradient-to-br from-blue-400 to-blue-400 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Laboratory & Diagnostic Tests
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-blue-100">
              Discover our comprehensive range of medical tests and diagnostic services for accurate
              health assessment and early disease detection.
            </p>

            <div className="relative mx-auto mb-8 max-w-2xl">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="text-gray-400 h-6 w-6" />
                </div>
                <input
                  type="text"
                  className="text-gray-900 placeholder:text-gray-500 block w-full rounded-full border-none bg-white/95 py-4 pl-12 pr-4 text-lg shadow-lg backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/30"
                  placeholder="Search for tests, conditions, or symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-sm text-blue-100">Individual Tests</div>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-blue-100">Test Packages</div>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-blue-100">Support</div>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">Fast</div>
                <div className="text-sm text-blue-100">Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8 flex w-full flex-col shadow-blue-400/30 lg:flex-row lg:items-center lg:justify-between">
            <TabsList className="mb-4  hidden h-fit w-full flex-wrap gap-2 rounded-xl border bg-white p-4 shadow-sm lg:mb-0">
              <TabsTrigger
                value="lab-tests"
                className="text-md rounded-lg px-6 py-3 font-semibold transition-all data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Individual Tests
              </TabsTrigger>
              <TabsTrigger
                value="package-tests"
                className="text-md rounded-lg px-6 py-3 font-semibold transition-all data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Test Packages
              </TabsTrigger>
              <TabsTrigger
                value="imaging-tests"
                className="text-md rounded-lg px-6 py-3 font-semibold transition-all data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Advanced Imaging
              </TabsTrigger>
              <TabsTrigger
                value="molecular-tests"
                className="text-md rounded-lg px-6 py-3 font-semibold transition-all data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Molecular Diagnostics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="lab-tests" className="mt-0">
            {/* Lab tests content */}
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-gray-900 mb-3 text-2xl font-bold sm:text-3xl">
                Individual Laboratory Tests
              </h2>
              <p className="text-gray-600 max-w-3xl text-lg">
                Choose from our comprehensive range of individual diagnostic tests. Each test
                includes professional analysis and detailed results interpretation.
              </p>
            </div>

            {getTabLoadingState('lab-tests') ? (
              <LoadingState type="individual" />
            ) : searchQuery && filteredLabTests.length === 0 ? (
              <NoResults searchQuery={searchQuery} testType="lab tests" />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredLabTests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="package-tests" className="mt-0">
            {/* Package tests content */}
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-gray-900 mb-3 text-2xl font-bold sm:text-3xl">
                Comprehensive Test Packages
              </h2>
              <p className="text-gray-600 max-w-3xl text-lg">
                Our specially curated test packages offer comprehensive health assessment with
                multiple tests at exceptional value for complete health insights.
              </p>
            </div>

            {getTabLoadingState('package-tests') ? (
              <LoadingState type="package" />
            ) : searchQuery && filteredPackageTests.length === 0 ? (
              <NoResults searchQuery={searchQuery} testType="package tests" />
            ) : (
              <div className="space-y-8">
                {filteredPackageTests.map((test) => (
                  <PackageTestCard key={test.id} test={test} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="imaging-tests" className="mt-0">
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
              <div className="mb-6 rounded-full bg-blue-100 p-4">
                <Search className="text-blue-500 h-8 w-8" />
              </div>
              <h3 className="text-gray-900 mb-2 text-xl font-semibold">
                Advanced Imaging Services
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Our advanced imaging services are currently being set up. Contact us for immediate
                imaging needs.
              </p>
              <Button variant="filled">Contact for Imaging Services</Button>
            </div>
          </TabsContent>

          <TabsContent value="molecular-tests" className="mt-0">
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
              <div className="mb-6 rounded-full bg-green-100 p-4">
                <Search className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-gray-900 mb-2 text-xl font-semibold">Molecular Diagnostics</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Advanced molecular testing services coming soon. Get notified when they&apos;re
                available.
              </p>
              <Button variant="filled">Get Notified</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="to-indigo-50 bg-gradient-to-r from-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-gray-900 mb-6 text-3xl font-bold sm:text-4xl">
              Need Help Choosing the Right Test?
            </h2>
            <p className="text-gray-600 mb-8 text-xl leading-relaxed">
              Our team of medical experts and certified laboratory professionals are ready to assist
              you in selecting the most appropriate tests for your specific health concerns and
              medical history.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:mb-8 lg:gap-6">
              <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                <div className="text-blue-600 mb-1.5 text-2xl font-bold sm:mb-2 lg:text-3xl">
                  24/7
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Expert Support Available</div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                <div className="text-green-600 mb-1.5 text-2xl font-bold sm:mb-2 lg:text-3xl">
                  Free
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Initial Consultation</div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm sm:col-span-2 sm:p-5 md:col-span-1 lg:p-6">
                <div className="text-purple-600 mb-1.5 text-2xl font-bold sm:mb-2 lg:text-3xl">
                  Fast
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Test Results</div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 md:space-x-6">
              <Button
                variant="filled"
                className="w-full rounded-md px-4 py-3 text-base font-semibold sm:w-auto md:px-6 md:py-3.5 lg:px-8 lg:py-4 lg:text-lg"
              >
                Book Free Consultation
              </Button>
              <Button
                variant="outlined"
                className="text-blue-600 w-full rounded-md border-blue-400 px-4 py-3 text-base font-semibold hover:bg-blue-50 sm:w-auto md:px-6 md:py-3.5 lg:px-8 lg:py-4 lg:text-lg"
              >
                Contact Our Experts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LabTestView = () => {
  return (
    <Suspense fallback={<LabTestViewFallback />}>
      <LabTestContent />
    </Suspense>
  );
};

export default observer(LabTestView);
