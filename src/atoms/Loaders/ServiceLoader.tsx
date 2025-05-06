'use client';

const ServicesLoadingState = () => {
  return (
    <div className="flex flex-col space-y-6">
      {/* Main test card */}
      <div className="bg-blue-800 w-full animate-pulse rounded-lg p-6 text-white">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-10 w-36 rounded bg-white bg-opacity-30"></div>
          <div className="h-10 w-24 rounded bg-red-500"></div>
        </div>

        <div className="mb-4 h-8 w-64 rounded bg-white bg-opacity-30"></div>

        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-white bg-opacity-30"></div>
          <div className="h-4 w-full rounded bg-white bg-opacity-30"></div>
          <div className="h-4 w-full rounded bg-white bg-opacity-30"></div>
          <div className="h-4 w-3/4 rounded bg-white bg-opacity-30"></div>
          <div className="h-4 w-5/6 rounded bg-white bg-opacity-30"></div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex w-full space-x-4">
        <div className="bg-blue-800 h-12 w-1/2 animate-pulse rounded"></div>
        <div className="bg-green-700 h-12 w-1/2 animate-pulse rounded"></div>
      </div>

      {/* Included Tests section */}
      <div className="border-gray-200 w-full animate-pulse rounded-lg border p-6">
        <div className="bg-gray-200 mb-6 h-7 w-40 rounded"></div>

        {/* First included test */}
        <div className="mb-6">
          <div className="bg-gray-200 mb-3 h-6 w-48 rounded"></div>
          <div className="border-blue-800 space-y-2 border-l-4 py-2 pl-4">
            <div className="bg-gray-200 h-4 w-full rounded"></div>
            <div className="bg-gray-200 h-4 w-full rounded"></div>
            <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
          </div>
        </div>

        {/* Second included test */}
        <div>
          <div className="bg-gray-200 mb-3 h-6 w-48 rounded"></div>
          <div className="border-blue-800 space-y-2 border-l-4 py-2 pl-4">
            <div className="bg-gray-200 h-4 w-full rounded"></div>
            <div className="bg-gray-200 h-4 w-full rounded"></div>
            <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesLoadingState;
