import { Truck, Headphones, ShieldCheck, RotateCcw } from 'lucide-react';

const features = [
  {
    Icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on all your order'
  },
  {
    Icon: Headphones,
    title: 'Customer Support 24/7',
    description: 'Instant access to Support'
  },
  {
    Icon: ShieldCheck,
    title: '100% Secure Payment',
    description: 'We ensure your money is safe'
  },
  {
    Icon: RotateCcw,
    title: 'Money-Back Guarantee',
    description: '30 Days Money-Back Guarantee'
  }
];

const EcommerceFeatures = () => {
  return (
    <div className="border-gray-200 border-y bg-white px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="divide-gray-100 grid grid-cols-2 divide-x lg:grid-cols-4">
          {features.map(({ Icon, title, description }, idx) => (
            <div key={idx} className="flex items-center space-x-3 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex-shrink-0">
                <Icon className="h-8 w-8 text-blue-400" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-800">{title}</p>
                <p className="text-gray-500 truncate text-xs">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcommerceFeatures;
