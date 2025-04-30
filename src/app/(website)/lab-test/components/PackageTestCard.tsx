import React from 'react';

interface Subtest {
  title: string;
  description: string;
}

export interface PackageTestCardProps {
  test: {
    id: number;
    title: string;
    description: string;
    price: number;
    subtests?: Subtest[];
  };
}

const PackageTestCard = ({ test }: PackageTestCardProps) => {
  return (
    <div className="border-gray-100 flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md lg:flex-row">
      <div className="flex flex-1 flex-col">
        <div className="space-y-3 bg-blue-400 p-4 text-white sm:p-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span className="text-blue-500 w-fit rounded-lg bg-white px-3 py-1 text-xs font-semibold">
              About the test
            </span>
            <span className="w-fit rounded-lg bg-red-300 px-3 py-1 text-xs font-semibold text-white">
              ₦{test.price}
            </span>
          </div>
          <h3 className="text-lg font-medium sm:text-xl">{test.title}</h3>
          <p className="text-sm sm:text-base">{test.description}</p>
        </div>
        <div className="flex flex-col gap-2 p-4 sm:flex-row sm:p-5">
          <button className="hover:bg-blue-500 rounded bg-blue-400 px-4 py-2 text-sm font-medium text-white transition-colors">
            Add to cart
          </button>
          <button className="rounded bg-green-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-500">
            Request test
          </button>
        </div>
      </div>

      {test.subtests && test.subtests.length > 0 && (
        <div className="border-gray-100 bg-gray-50 flex-1 space-y-4 border-t p-4 sm:p-6 lg:border-l lg:border-t-0">
          <h4 className="text-blue-500 font-medium">Included Tests</h4>
          <div className="space-y-4">
            {test.subtests.map((subtest, index) => (
              <div key={index} className="space-y-1">
                <h5 className="text-gray-900 font-medium">{subtest.title}</h5>
                <div className="relative pl-3">
                  <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-blue-400 via-blue-200 to-transparent"></div>
                  <p className="text-gray-700 text-sm">{subtest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageTestCard;
