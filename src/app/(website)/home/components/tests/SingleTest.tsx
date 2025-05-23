'use client';

import { AllTestResponse, SingleTest } from '@/types/test';
import Button from '@/atoms/Buttons';
import ServicesLoadingState from '@/atoms/Loaders/ServiceLoader';
import Spinner from '@/lib/utils/spinner';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { Toast } from '@/atoms/Toast';
import { observer } from 'mobx-react-lite';

interface SingleTestProps {
  singleTest: SingleTest[];
  loading: boolean;
}

const SingleTestCard = ({ singleTest, loading }: SingleTestProps) => {
  const {
    CartStore: { addItem, clearCart, isInCart, removeItem }
  } = useStore();

  const router = useRouter();

  return (
    <>
      {loading ? (
        <div className="flex w-full flex-col items-center justify-center">
          <Spinner />
          <p>Loading Tests</p>
        </div>
      ) : (
        singleTest.length !== 0 && (
          <>
            <div className="mt-4 flex flex-wrap justify-between gap-4 sm:gap-5" id="lab-test">
              {singleTest?.map((test, idx) => (
                <div className="flex w-full flex-col space-y-2 md:w-[300px] lg:w-[450px]" key={idx}>
                  <p className="ml-auto w-fit rounded-lg bg-red-300 px-4 py-1.5 text-white">
                    ₦
                    {test?.discountedPrice === 0 || test.discountedPrice === undefined
                      ? test.price
                      : test.discountedPrice}
                  </p>

                  <p className="text-lg font-medium sm:text-xl">{test.name}</p>
                  <p className="text-sm sm:text-base">{test.description}</p>
                  <div className="flex w-full space-x-3 sm:!w-[calc(100%-100px)] md:!w-[calc(100%-200px)]">
                    {!isInCart(test.id) ? (
                      <Button
                        variant="filled"
                        className="text-sm"
                        onClick={() => addItem(test, 'single')}
                      >
                        Add to cart
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        className="border-none bg-red-400 text-sm text-white hover:bg-red-300/80"
                        onClick={() => removeItem(test.id)}
                      >
                        Remove from cart
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      className="border-none bg-green-400 text-sm text-white hover:bg-green-300/80"
                    >
                      View details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 sm:mt-8">
              <Button
                variant="filled"
                className="rounded-sm font-semibold"
                onClick={() => router.push('/lab-test')}
              >
                View all Individual Test
              </Button>
            </div>
          </>
        )
      )}

      {!loading && singleTest.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-lg font-semibold">No tests available</p>
          <p className="text-gray-500 text-sm">Please check back later</p>
        </div>
      )}
    </>
  );
};

export default observer(SingleTestCard);
