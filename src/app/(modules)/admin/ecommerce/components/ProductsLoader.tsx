import { Skeleton } from '@/components/ui/skeleton';

const ProductsLoader = () => {
  return (
    <div className="flex flex-col space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border-gray-100 flex gap-4 rounded-lg border p-4">
          <Skeleton className="h-16 w-16 rounded-lg" />
          <div className="flex flex-1 flex-col space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsLoader;
