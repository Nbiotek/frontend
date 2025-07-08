import Spinner from '@/lib/utils/spinner';
import { useRouter } from 'next/navigation';
import Button from '@/atoms/Buttons';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import PackageTestLoader from '@/atoms/Loaders/PackageTestLoaders';
import TestDetailsDialog from './TestDetailsDialog';
import { useState } from 'react';
import { Eye, Plus, X, Package, MessageCircle, Info, CheckCircle, Star } from 'lucide-react';

interface PackageTestCardProps {
  packageTests: PackageTest[];
  loading: boolean;
}

const PackageTestCard = ({ packageTests, loading }: PackageTestCardProps) => {
  const router = useRouter();
  const [selectedTest, setSelectedTest] = useState<PackageTest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    CartStore: { addItem, clearCart, isInCart, removeItem }
  } = useStore();

  const handleViewDetails = (test: PackageTest) => {
    setSelectedTest(test);
    setIsDialogOpen(true);
  };

  const handleRequestQuote = () => {
    router.push('/contact?request=package-quote');
  };

  const handleAddToCartFromModal = (test: PackageTest | any, type: 'single' | 'package') => {
    addItem(test, type);
  };

  return (
    <>
      {loading ? (
        <PackageTestLoader count={3} />
      ) : (
        packageTests.length !== 0 && (
          <>
            <div className="mt-8 flex w-full flex-col gap-8">
              {packageTests.map((test, idx) => (
                <div className="group flex w-full flex-col gap-6 lg:flex-row lg:gap-8" key={idx}>
                  <div className="flex flex-1 flex-col space-y-4">
                    <div className="group-hover:bg-blue-500 space-y-4 rounded-lg bg-blue-400 p-4 text-white transition-colors duration-200 sm:p-6 md:p-8">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <p className="flex w-fit items-center rounded-lg bg-neutral-100 px-3 py-1 text-sm font-semibold text-blue-400 sm:px-4 sm:py-1.5">
                          <Package size={14} className="mr-1" />
                          Package Test
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-400 flex w-fit items-center rounded-lg px-3 py-1 text-sm font-semibold text-white sm:px-4 sm:py-1.5">
                            <Star size={14} className="mr-1" />
                            Best Value
                          </span>
                        </div>
                      </div>
                      <p className="text-lg font-medium sm:text-xl">{test.name}</p>
                      <p className="text-sm sm:text-base">{test.description}</p>

                      <div className="rounded-md border border-white/20 bg-white/10 p-3">
                        <p className="flex items-center text-sm">
                          <CheckCircle size={14} className="mr-2 text-green-300" />
                          <span className="font-medium">
                            {test?.tests?.length || 0} tests included • Comprehensive analysis •
                            Expert interpretation
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                      <Button
                        variant="filled"
                        className="flex items-center justify-center text-sm transition-transform duration-200 hover:scale-105"
                        onClick={() => handleViewDetails(test)}
                      >
                        <Info size={16} className="mr-1" />
                        View Details & Pricing
                      </Button>

                      <Button
                        variant="outlined"
                        className="text-blue-600 flex items-center justify-center rounded-sm border border-blue-400 text-sm transition-colors hover:bg-blue-50"
                        onClick={handleRequestQuote}
                      >
                        <MessageCircle size={16} className="mr-1" />
                        Get Package Quote
                      </Button>
                    </div>

                    <div className="border-gray-100 border-t pt-2 text-center">
                      <p className="text-gray-500 text-xs">
                        💡 <span className="font-medium">Package benefits:</span> Save money with
                        comprehensive testing
                      </p>
                    </div>

                    {isInCart(test.id) && (
                      <div className="text-green-600 bg-green-50 flex items-center justify-center rounded-md border border-green-200 p-2 text-sm font-medium">
                        <CheckCircle size={14} className="mr-1" />
                        Package added to your cart
                      </div>
                    )}
                  </div>

                  <div className="border-gray-100 flex-1 space-y-4 rounded-lg border bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center font-semibold text-blue-400">
                        <Package size={16} className="mr-2" />
                        Included Tests
                      </h3>
                      <span className="text-blue-800 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium">
                        {test?.tests?.length || 0} tests
                      </span>
                    </div>

                    {test?.tests?.slice(0, 4).map((singleTest, idxt) => (
                      <div className="space-y-2" key={idxt}>
                        <p className="font-semibold text-black">{singleTest.name}</p>
                        <div className="relative pl-4">
                          <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                          <p className="text-gray-600 text-sm">{singleTest.description}</p>
                        </div>
                      </div>
                    ))}

                    {test?.tests && test.tests.length > 4 && (
                      <div className="border-gray-100 border-t pt-3 text-center">
                        <p className="text-blue-600 text-sm font-medium">
                          + {test.tests.length - 4} more tests included
                        </p>
                        <p className="text-gray-500 mt-1 text-xs">
                          View full details to see all included tests
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                variant="filled"
                className="rounded-lg px-6 py-3 font-semibold transition-transform duration-200 hover:scale-105"
                onClick={() => router.push('/lab-test')}
              >
                <Package size={18} className="mr-2" />
                Explore All Package Tests
              </Button>
            </div>
          </>
        )
      )}
      {!loading && packageTests.length === 0 && (
        <div className="flex h-20 w-full flex-col items-center justify-center">
          <p className="text-lg font-semibold">No package tests available</p>
          <p className="text-gray-500 text-sm">
            Please check back later or contact us for custom packages
          </p>
        </div>
      )}

      <TestDetailsDialog
        test={selectedTest}
        testType="package"
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddToCart={handleAddToCartFromModal}
        isInCart={selectedTest ? isInCart(selectedTest.id) : false}
      />
    </>
  );
};

export default observer(PackageTestCard);
