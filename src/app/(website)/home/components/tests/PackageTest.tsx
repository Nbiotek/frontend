import Spinner from '@/lib/utils/spinner';
import { PackageTest } from '@/types/test';
import { useRouter } from 'next/navigation';
import Button from '@/atoms/Buttons';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

interface PackageTestCardProps {
  packageTests: PackageTest[];
  loading: boolean;
}

const PackageTestCard = ({ packageTests, loading }: PackageTestCardProps) => {
  const router = useRouter();

  const {
    CartStore: { addItem, clearCart, isInCart, removeItem }
  } = useStore();

  return (
    <>
      {loading ? (
        <div className="flex w-full flex-col items-center justify-center">
          <Spinner />
          <p>Loading Tests</p>
        </div>
      ) : (
        packageTests.length !== 0 && (
          <>
            <div className="mt-8 flex w-full flex-col gap-8">
              {packageTests.map((test, idx) => (
                <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-8" key={idx}>
                  <div className="flex flex-1 flex-col space-y-4">
                    <div className="space-y-3 rounded-lg bg-blue-400 p-4 text-white sm:p-6 md:p-8">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <p className="w-fit rounded-lg bg-neutral-100 px-3 py-1 text-sm font-semibold text-blue-400 sm:px-4 sm:py-1.5">
                          About the test
                        </p>
                        <p className="w-fit rounded-lg bg-red-300 px-3 py-1 text-sm text-white sm:px-4 sm:py-1.5">
                          ₦{test.price}
                        </p>
                      </div>
                      <p className="text-lg font-medium sm:text-xl">{test.name}</p>
                      <p className="text-sm sm:text-base">{test.description}</p>
                    </div>
                    <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                      {!isInCart(test.id) ? (
                        <Button
                          variant="filled"
                          className="text-sm"
                          onClick={() => addItem(test, 'package')}
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
                        className="rounded-sm border-none bg-green-400 text-sm text-white hover:bg-green-300/80"
                      >
                        Request Test
                      </Button>
                    </div>
                  </div>

                  <div className="border-gray-100 flex-1 space-y-4 rounded-lg border p-4 shadow-sm sm:p-6">
                    <h3 className="font-semibold text-blue-400">Included Tests</h3>
                    {test?.tests?.map((singleTest, idxt) => (
                      <div className="space-y-2" key={idxt}>
                        <p className="font-semibold text-black">{singleTest.name}</p>
                        <div className="relative pl-4">
                          <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                          <p className="text-sm">{singleTest.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                variant="filled"
                className="rounded-sm font-semibold"
                onClick={() => router.push('/lab-test')}
              >
                View all Package Tests
              </Button>
            </div>
          </>
        )
      )}
      {!loading && packageTests.length === 0 && (
        <div className="flex h-20 w-full flex-col items-center justify-center">
          <p className="text-lg font-semibold">No tests available</p>
          <p className="text-gray-500 text-sm">Please check back later</p>
        </div>
      )}
    </>
  );
};

export default observer(PackageTestCard);
