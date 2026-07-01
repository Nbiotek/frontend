import { ShoppingBag } from 'lucide-react';

const EmptyOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ShoppingBag className="text-gray-300 mb-4 h-12 w-12" />
      <p className="text-gray-500 text-sm font-medium">No orders yet</p>
      <p className="text-gray-400 mt-1 text-xs">Orders placed will appear here.</p>
    </div>
  );
};

export default EmptyOrders;
