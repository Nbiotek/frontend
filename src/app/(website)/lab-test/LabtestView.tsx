'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

import TestCard from './components/TestCard';
import PackageTestCard from './components/PackageTestCard';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const imagingTests = [
  {
    id: 1,
    title: 'Diagnostic Ultrasound',
    description:
      'Non-invasive imaging using sound waves to visualize internal organs, tissues, and blood flow without radiation exposure.',
    price: 180,
    tests: [
      {
        title: 'Abdominal Ultrasound',
        description:
          'Examines organs in the abdomen including liver, gallbladder, spleen, pancreas, and kidneys.'
      },
      {
        title: 'Pelvic Ultrasound',
        description:
          'Evaluates the reproductive and urinary organs including the uterus, ovaries, and bladder.'
      }
    ]
  },
  {
    id: 2,
    title: 'Advanced MRI Scan',
    description:
      'High-resolution magnetic resonance imaging for detailed visualization of organs, soft tissues, bones, and internal structures.',
    price: 450,
    subtests: [
      {
        title: 'Brain MRI',
        description:
          'Detailed imaging of the brain structure to evaluate neurological conditions and abnormalities.'
      },
      {
        title: 'Spine MRI',
        description:
          'Comprehensive evaluation of the spinal cord, discs, nerves, and surrounding structures.'
      }
    ]
  }
];

const molecularTests = [
  {
    id: 1,
    title: 'DNA Sequencing Panel',
    description:
      'Advanced genetic testing that examines specific genes to identify mutations associated with inherited conditions and disease risks.',
    price: 350,
    subtests: [
      {
        title: 'Cancer Predisposition Panel',
        description:
          'Analyzes genes associated with increased risk of developing various types of cancer.'
      },
      {
        title: 'Cardiovascular Genetics Panel',
        description:
          'Examines genes linked to inherited heart conditions and cardiovascular disease risk.'
      }
    ]
  },
  {
    id: 2,
    title: 'PCR Pathogen Detection',
    description:
      'Highly sensitive molecular testing for the detection and identification of bacterial, viral, and fungal pathogens.',
    price: 200,
    subtests: [
      {
        title: 'Respiratory Pathogen Panel',
        description:
          'Detects multiple viral and bacterial respiratory pathogens from a single sample.'
      },
      {
        title: 'Gastrointestinal Pathogen Panel',
        description: 'Identifies pathogens causing gastrointestinal infections and food poisoning.'
      }
    ]
  }
];

const NoResults = ({ searchQuery, testType }: { searchQuery: string; testType: string }) => (
  <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center">
    <div className="mb-4 rounded-full bg-blue-100 p-3">
      <Search className="text-blue-500 h-6 w-6" />
    </div>
    <h3 className="text-gray-900 text-lg font-medium">No {testType} found</h3>
    <p className="text-gray-600 mt-2">
      We couldnt find any {testType} matching {searchQuery}. Try a different search term.
    </p>
  </div>
);

const LabTestView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    TestStore: { singleTests, packageTests }
  } = useStore();

  // Filter functions for each test type
  const filteredLabTests = singleTests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test?.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPackageTests = packageTests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredImagingTests = imagingTests.filter(
    (test) =>
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMolecularTests = molecularTests.filter(
    (test) =>
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="border bg-blue-400/10 py-8 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-gray-900 text-3xl font-bold sm:text-4xl md:text-5xl">
              Laboratory & Diagnostic Tests
            </h1>
            <p className="text-gray-600 mt-4 text-lg">
              Discover our comprehensive range of medical tests and diagnostic services for accurate
              health assessment and early disease detection.
            </p>

            <div className="relative mx-auto mt-8 max-w-xl">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="text-gray-400 h-5 w-5" />
                </div>
                <input
                  type="text"
                  className="border-gray-300 text-gray-900 focus:border-blue-500 block w-full rounded-lg border bg-white py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Search for tests, categories, or conditions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with tabs */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Tabs defaultValue="lab-tests" className="w-full">
          <TabsList className="mb-8 flex w-full flex-wrap justify-center gap-2 rounded-lg bg-white p-1 shadow-sm">
            <TabsTrigger
              value="lab-tests"
              className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-blue-400 data-[state=active]:text-white"
            >
              Individual Lab Tests
            </TabsTrigger>
            <TabsTrigger
              value="package-tests"
              className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-blue-400 data-[state=active]:text-white"
            >
              Special Package Tests
            </TabsTrigger>
            <TabsTrigger
              value="imaging-tests"
              className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-blue-400 data-[state=active]:text-white"
            >
              Advanced Imaging
            </TabsTrigger>
            <TabsTrigger
              value="molecular-tests"
              className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-blue-400 data-[state=active]:text-white"
            >
              Molecular Diagnostics
            </TabsTrigger>
          </TabsList>

          {/* Individual Lab Tests Tab */}
          <TabsContent value="lab-tests" className="mt-2 ">
            <div className="mb-6">
              <h2 className="text-gray-900 text-xl font-semibold sm:text-2xl">
                Individual Lab Tests
              </h2>
              <p className="text-gray-600 mt-2">
                Our comprehensive range of laboratory tests provides accurate insights into your
                health status.
              </p>
            </div>

            {searchQuery && filteredLabTests.length === 0 ? (
              <NoResults searchQuery={searchQuery} testType="lab tests" />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredLabTests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Package Tests Tab */}
          <TabsContent value="package-tests" className="mt-2">
            <div className="mb-6">
              <h2 className="text-gray-900 text-xl font-semibold sm:text-2xl">
                Special Package Tests
              </h2>
              <p className="text-gray-600 mt-2">
                Our specially curated test packages offer comprehensive health assessment at
                cost-effective prices.
              </p>
            </div>

            {searchQuery && filteredPackageTests.length === 0 ? (
              <NoResults searchQuery={searchQuery} testType="package tests" />
            ) : (
              <div className="space-y-8">
                {filteredPackageTests.map((test) => (
                  <PackageTestCard key={test.id} test={test} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Imaging Tests Tab */}
          <TabsContent value="imaging-tests" className="mt-2">
            {/* <div className="mb-6">
              <h2 className="text-gray-900 text-xl font-semibold sm:text-2xl">Advanced Imaging</h2>
              <p className="text-gray-600 mt-2">
                State-of-the-art imaging services for accurate diagnosis and detailed visualization
                of internal structures.
              </p>
            </div>

            {searchQuery && filteredImagingTests.length === 0 ? (
              <NoResults searchQuery={searchQuery} testType="imaging tests" />
            ) : (
              <div className="space-y-8">
                {filteredImagingTests.map((test) => (
                  <PackageTestCard key={test.id} test={test} />
                ))}
              </div>
            )} */}
          </TabsContent>

          {/* Molecular Tests Tab */}
          <TabsContent value="molecular-tests" className="mt-2">
            {/* <div className="mb-6">
                <h2 className="text-gray-900 text-xl font-semibold sm:text-2xl">
                  Molecular Diagnostics
                </h2>
                <p className="text-gray-600 mt-2">
                  Advanced genetic and molecular testing for precise diagnosis and personalized
                  treatment planning.
                </p>
              </div>

              {searchQuery && filteredMolecularTests.length === 0 ? (
                <NoResults searchQuery={searchQuery} testType="molecular diagnostic tests" />
              ) : (
                <div className="space-y-8">
                  {filteredMolecularTests.map((test) => (
                    <PackageTestCard key={test.id} test={test} />
                  ))}
                </div>
              )} */}
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-8 bg-blue-400/5 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-gray-900 text-2xl font-bold sm:text-3xl">
              Need help choosing the right test?
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Our team of medical experts is ready to assist you in selecting the most appropriate
              tests for your health concerns.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button className="hover:bg-blue-500 w-full rounded-lg bg-blue-400 px-6 py-3 font-medium text-white transition-colors sm:w-auto">
                Book a Consultation
              </button>
              <button className="w-full rounded-lg border border-blue-400 bg-white px-6 py-3 font-medium text-blue-400 transition-colors hover:bg-blue-50 sm:w-auto">
                Contact Customer Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(LabTestView);
