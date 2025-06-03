'use client';
import Button from '@/atoms/Buttons';
import { Title } from '@/atoms/typographys';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Eye, Info, Section } from 'lucide-react';

import { useStore } from '@/store';
import { Observer, observer } from 'mobx-react-lite';
import SingleTestCard from './tests/SingleTest';
import PackageTestCard from './tests/PackageTest';

const packageTest = [
  {
    title: 'Basic Health Screening',
    description:
      'loremte libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl',
    price: 1200,
    subtests: [
      {
        title: 'Basic Health screen',
        Description:
          'te libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl'
      },
      {
        title: 'Basic Health screen',
        Description:
          'te libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl'
      }
    ]
  },
  {
    title: 'Basic Health Screening',
    description:
      'loremte libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl',
    price: 1200,
    subtests: [
      {
        title: 'Basic Health screen',
        Description:
          'te libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl'
      },
      {
        title: 'Basic Health screen',
        Description:
          'te libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac, vestibulum eu nisl'
      }
    ]
  }
];

const Services = () => {
  const { TestStore } = useStore();
  const router = useRouter();

  // State to track which tests have their prices revealed
  const [revealedPrices, setRevealedPrices] = useState<{ [key: string]: boolean }>({});

  const togglePriceVisibility = (testId: string) => {
    setRevealedPrices((prev) => ({
      ...prev,
      [testId]: !prev[testId]
    }));
  };

  const handleViewDetails = (testId: string) => {
    // Navigate to test details page or open modal
    router.push(`/tests/${testId}`);
  };

  const handleRequestQuote = () => {
    // Navigate to contact/quote page
    router.push('/contact?request=quote');
  };

  return (
    <div className="space-y-12 px-4 sm:px-6 md:px-8">
      {/* Individual Tests Section */}
      <section
        id="lab-test"
        className="flex min-h-screen flex-col justify-center border-2 px-4 py-16 sm:px-6 md:px-8"
        style={{
          paddingTop: 'calc(var(--header-height, 80px) + 2rem)',
          minHeight: 'calc(100vh - var(--header-height, 80px))'
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-1 flex-col justify-center">
          <div className="mb-12 text-center">
            <Title text="Our Services" className="text-center font-semibold text-blue-400" />
            <p className="mx-auto mt-3 max-w-3xl text-sm sm:text-base">
              Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
              velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra
            </p>
          </div>

          <div className="flex flex-1 items-center">
            <SingleTestCard
              singleTest={TestStore.singleTests || []}
              loading={TestStore.isLoadingSingleTests}
            />
          </div>
        </div>
      </section>

      {/* Special Packages Section */}
      <section
        id="special-package"
        className="flex min-h-screen flex-col justify-center px-4 py-20 sm:px-6 md:px-8"
        style={{
          paddingTop: 'calc(var(--header-height, 80px) + 2rem)',
          minHeight: 'calc(100vh - var(--header-height, 80px))'
        }}
      >
        <Title text="Special Packages" className="text-center font-semibold text-blue-400" />
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm sm:text-base">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>

        <PackageTestCard
          packageTests={TestStore.packageTests || []}
          loading={TestStore.isLoadingPackageTests}
        />
      </section>

      {/* Advanced Imaging Section */}
      <section
        id="advanced-imaging"
        className="flex min-h-screen flex-col justify-center px-4 py-20 sm:px-6 md:px-8"
        style={{
          paddingTop: 'calc(var(--header-height, 80px) + 2rem)',
          minHeight: 'calc(100vh - var(--header-height, 80px))'
        }}
      >
        <Title text="Advanced Imaging" className="text-center font-semibold text-blue-400" />
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm sm:text-base">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>

        <div className="mt-8 flex w-full flex-col gap-8">
          {packageTest.slice(1, 2).map((test, idx) => {
            const testId = `advanced-imaging-${idx}`;
            const isPriceRevealed = revealedPrices[testId];

            return (
              <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-8" key={idx}>
                <div className="flex flex-1 flex-col space-y-4">
                  <div className="space-y-3 rounded-lg bg-blue-400 p-4 text-white sm:p-6 md:p-8">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <p className="w-fit rounded-lg bg-neutral-100 px-3 py-1 text-sm font-semibold text-blue-400 sm:px-4 sm:py-1.5">
                        About the test
                      </p>

                      {/* Price section with toggle */}
                      <div className="flex items-center gap-2">
                        {isPriceRevealed ? (
                          <p className="w-fit rounded-lg bg-red-300 px-3 py-1 text-sm text-white sm:px-4 sm:py-1.5">
                            ₦{test.price}
                          </p>
                        ) : (
                          <button
                            onClick={() => togglePriceVisibility(testId)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 flex w-fit items-center gap-1 rounded-lg px-3 py-1 text-sm transition-colors sm:px-4 sm:py-1.5"
                          >
                            <Eye size={14} />
                            View Price
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-lg font-medium sm:text-xl">{test.title}</p>
                    <p className="text-sm sm:text-base">{test.description}</p>
                  </div>

                  <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                    <Button
                      variant="outlined"
                      className="rounded-sm border border-blue-400 text-sm text-blue-400 hover:bg-blue-50"
                      onClick={() => handleViewDetails(testId)}
                    >
                      <Info size={16} className="mr-1" />
                      View Details
                    </Button>
                    <Button
                      variant="filled"
                      className="rounded-sm text-sm"
                      onClick={handleRequestQuote}
                    >
                      Request Quote
                    </Button>
                    <Button
                      variant="outlined"
                      className="rounded-sm border-none bg-green-400 text-sm text-white hover:bg-green-300/80"
                      onClick={() => router.push('/lab-test')}
                    >
                      Book Test
                    </Button>
                  </div>
                </div>

                <div className="border-gray-100 flex-1 space-y-4 rounded-lg border p-4 shadow-sm sm:p-6">
                  <h3 className="font-semibold text-blue-400">Included Tests</h3>
                  {test?.subtests?.map((singleTest, idxt) => (
                    <div className="space-y-2" key={idxt}>
                      <p className="font-semibold text-black">{singleTest.title}</p>
                      <div className="relative pl-4">
                        <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                        <p className="text-sm">{singleTest.Description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Molecular Diagnostics Section */}
      <section
        id="molecular-diagnostics"
        className="flex min-h-screen flex-col justify-center px-4 py-20 sm:px-6 md:px-8"
        style={{
          paddingTop: 'calc(var(--header-height, 80px) + 2rem)',
          minHeight: 'calc(100vh - var(--header-height, 80px))'
        }}
      >
        <Title text="Molecular Diagnostics" className="text-center font-semibold text-blue-400" />
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm sm:text-base">
          Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum, ac aliquet odio mattis.
        </p>

        <div className="mt-8 flex w-full flex-col gap-8">
          {packageTest.slice(1, 2).map((test, idx) => {
            const testId = `molecular-diagnostics-${idx}`;
            const isPriceRevealed = revealedPrices[testId];

            return (
              <div className="flex w-full flex-col gap-6 lg:flex-row-reverse lg:gap-8" key={idx}>
                {/* Left side (now on right on desktop) */}
                <div className="flex flex-1 flex-col space-y-4">
                  <div className="space-y-3 rounded-lg bg-blue-400 p-4 text-white sm:p-6 md:p-8">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <p className="w-fit rounded-lg bg-neutral-100 px-3 py-1 text-sm font-semibold text-blue-400 sm:px-4 sm:py-1.5">
                        About the test
                      </p>

                      {/* Price section with toggle */}
                      <div className="flex items-center gap-2">
                        {isPriceRevealed ? (
                          <p className="w-fit rounded-lg bg-red-300 px-3 py-1 text-sm text-white sm:px-4 sm:py-1.5">
                            ₦{test.price}
                          </p>
                        ) : (
                          <button
                            onClick={() => togglePriceVisibility(testId)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 flex w-fit items-center gap-1 rounded-lg px-3 py-1 text-sm transition-colors sm:px-4 sm:py-1.5"
                          >
                            <Eye size={14} />
                            View Price
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-lg font-medium sm:text-xl">{test.title}</p>
                    <p className="text-sm sm:text-base">{test.description}</p>
                  </div>

                  <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                    <Button
                      variant="outlined"
                      className="rounded-sm border border-blue-400 text-sm text-blue-400 hover:bg-blue-50"
                      onClick={() => handleViewDetails(testId)}
                    >
                      <Info size={16} className="mr-1" />
                      View Details
                    </Button>
                    <Button
                      variant="filled"
                      className="rounded-sm text-sm"
                      onClick={handleRequestQuote}
                    >
                      Request Quote
                    </Button>
                    <Button
                      variant="outlined"
                      className="rounded-sm border-none bg-green-400 text-sm text-white hover:bg-green-300/80"
                      onClick={() => router.push('/lab-test')}
                    >
                      Book Test
                    </Button>
                  </div>
                </div>

                <div className="border-gray-100 flex-1 space-y-4 rounded-lg border p-4 shadow-sm sm:p-6">
                  <h3 className="font-semibold text-blue-400">Included Tests</h3>
                  {test?.subtests?.map((singleTest, idxt) => (
                    <div className="space-y-2" key={idxt}>
                      <p className="font-semibold text-black">{singleTest.title}</p>
                      <div className="relative pl-4">
                        <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                        <p className="text-sm">{singleTest.Description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default observer(Services);
