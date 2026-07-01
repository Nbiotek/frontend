import { Skeleton } from '@/components/ui/skeleton';

const OrdersLoader = () => {
  return (
    <div className="flex flex-col space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="border-gray-100 flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersLoader;
