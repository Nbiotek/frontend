import React from 'react';

export interface TestCardProps {
  test: {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
  };
}

const TestCard = ({ test }: TestCardProps) => {
  return (
    <div className="border-gray-100 flex flex-col rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-blue-800 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium">
          {test.category}
        </span>
        <span className="rounded-lg bg-red-300 px-3 py-1 text-xs font-semibold text-white">
          ₦{test.price}
        </span>
      </div>
      <h3 className="text-gray-900 mb-2 text-lg font-medium">{test.title}</h3>
      <p className="text-gray-700 mb-4 flex-grow text-sm">{test.description}</p>
      <div className="mt-auto flex flex-col gap-2 sm:flex-row">
        <button className="hover:bg-blue-500 rounded bg-blue-400 px-4 py-2 text-sm font-medium text-white transition-colors">
          Add to cart
        </button>
        <button className="rounded bg-green-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-500">
          Request test
        </button>
      </div>
    </div>
  );
};

export default TestCard;
