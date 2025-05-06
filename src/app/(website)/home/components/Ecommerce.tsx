import { Title } from '@/atoms/typographys';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';

const products = [
  {
    price: 120.0,
    title: 'Digital Laboratory Weighing Scale',
    image: '/labequip.png',
    isProductAvailable: true,
    category: 'Lab Equipment',
    rating: 4.6
  },
  {
    price: 35.75,
    title: 'PCR Master Mix Reagent',
    image: '/labequip.png',
    isProductAvailable: false,
    category: 'Reagents',
    rating: 4.4
  },
  {
    price: 89.0,
    title: 'Blood Glucose Testing Kit',
    image: '/labequip.png',
    isProductAvailable: false,
    category: 'Diagnostic Tools',
    rating: 4.2
  }
];

const EcommerceSection = () => {
  return (
    <div className="bg-[#D9D9D9] px-4 sm:px-6" id="ecommerce">
      <div className="mx-auto max-w-7xl py-4 sm:py-8">
        <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <span className="text-sm font-thin text-blue-400 sm:text-base">PRODUCTS</span>
            <Title text="e - Commerce" />
          </div>
          <button className="flex items-center space-x-1 text-sm text-blue-400 sm:text-base">
            <span>View All</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative h-[350px] w-full overflow-hidden rounded-lg sm:h-[390px]">
            <Image
              src="/ecom-1.png"
              width={300}
              height={370}
              alt="Ecommerce Section"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 flex h-full w-full flex-col items-center justify-end space-y-2 pb-10 text-white">
              <span className="text-sm font-medium sm:text-base">SUMMER SALE</span>
              <span className="text-xl font-semibold sm:text-2xl">75% off</span>
              <Button className="mt-2 rounded-full bg-white px-4 py-1 text-sm text-blue-400 sm:px-5 sm:py-1.5">
                Shop Now <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          {products.map((product, idx) => (
            <div
              className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm"
              key={idx}
            >
              <div className="relative h-[180px] w-full overflow-hidden sm:h-[200px]">
                <Image src={product.image} width={320} height={180} alt={product.title} />
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <div className="mb-3">
                  <div className="text-gray-500 mb-1 text-xs">{product.category}</div>
                  <h3 className="text-sm font-medium sm:text-base">{product.title}</h3>
                  <div className="mt-1 flex items-center">
                    <span className="text-blue-600 font-medium">${product.price.toFixed(2)}</span>
                    <span
                      className={`ml-3 text-xs ${product.isProductAvailable ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {product.isProductAvailable ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                <Button className="mt-auto w-full bg-blue-400 px-2 py-1.5 text-xs sm:px-3 sm:text-sm">
                  Request quote <ArrowUpRightIcon className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcommerceSection;
