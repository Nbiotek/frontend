import { Layers } from 'lucide-react';

const EmptyCategories = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Layers className="text-gray-300 mb-4 h-12 w-12" />
      <p className="text-gray-500 text-sm font-medium">No categories yet</p>
      <p className="text-gray-400 mt-1 text-xs">
        Click &quot;Add Category&quot; to create the first one.
      </p>
    </div>
  );
};

export default EmptyCategories;
