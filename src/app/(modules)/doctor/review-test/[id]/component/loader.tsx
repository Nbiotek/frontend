export const TestResultLoadingSkeleton = () => {
  return (
    <div className="flex w-full flex-col space-y-[24px] pb-[30px]">
      <div className="rounded-lg bg-white p-[24px]">
        <div className="mb-[24px] h-6 w-48 animate-pulse rounded bg-neutral-200 pb-2"></div>
        <div className="flex flex-col space-y-[24px]">
          <div className="flex gap-[24px]">
            <div className="w-full">
              <div className="mb-1 h-4 w-16 animate-pulse rounded bg-neutral-100"></div>
              <div className="h-6 w-full animate-pulse rounded bg-neutral-200"></div>
            </div>
            <div className="w-full">
              <div className="mb-1 h-4 w-24 animate-pulse rounded bg-neutral-100"></div>
              <div className="h-6 w-full animate-pulse rounded bg-neutral-200"></div>
            </div>
          </div>
          <div className="flex gap-[24px]">
            <div className="w-full">
              <div className="mb-1 h-4 w-28 animate-pulse rounded bg-neutral-100"></div>
              <div className="h-6 w-full animate-pulse rounded bg-neutral-200"></div>
            </div>
            <div className="w-full">
              <div className="mb-1 h-4 w-24 animate-pulse rounded bg-neutral-100"></div>
              <div className="h-6 w-full animate-pulse rounded bg-neutral-200"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-[24px]">
        <div className="mb-[24px] h-6 w-32 animate-pulse rounded bg-neutral-200 pb-2"></div>

        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-6 flex flex-col space-y-2 border-b pb-6 last:border-0">
            <div className="flex justify-between">
              <div className="h-5 w-40 animate-pulse rounded bg-neutral-200"></div>
              <div className="h-5 w-24 animate-pulse rounded bg-neutral-200"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-5 w-32 animate-pulse rounded bg-neutral-200"></div>
              <div className="h-5 w-20 animate-pulse rounded bg-neutral-200"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white p-[24px]">
        <div className="mb-[24px] h-6 w-40 animate-pulse rounded bg-neutral-200 pb-2"></div>
        <div className="w-full">
          <div className="mb-1 h-4 w-16 animate-pulse rounded bg-neutral-100"></div>
          <div className="mb-6 h-20 w-full animate-pulse rounded bg-neutral-200"></div>
        </div>
        <div className="mt-5 h-10 w-40 animate-pulse rounded bg-neutral-200"></div>
      </div>
    </div>
  );
};
