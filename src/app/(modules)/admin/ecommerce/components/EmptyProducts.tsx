import { Package } from 'lucide-react';

const EmptyProducts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Package className="text-gray-300 mb-4 h-12 w-12" />
      <p className="text-gray-500 text-sm font-medium">No products yet</p>
      <p className="text-gray-400 mt-1 text-xs">
        Click &quot;Add Product&quot; to create the first listing.
      </p>
    </div>
  );
};

export default EmptyProducts;
