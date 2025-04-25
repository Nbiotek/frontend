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
    <div className="bg-[#D9D9D9]">
      <div className="mx-auto max-w-7xl py-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-base font-thin text-blue-400">PRODUCTS</span>
            <Title text="e - Commerce" />
          </div>
          <p className="flex space-x-2 text-blue-400">
            View All <ArrowRight />
          </p>
        </div>
        <div className="flex justify-between">
          <div className="relative h-[390px] w-[300px] ">
            <Image
              src="/ecom-1.png"
              width={300}
              height={370}
              alt="Ecommerce Section"
              className="h-[390px] w-[300px] object-cover"
            />
            <div className="absolute -bottom-3 top-0 flex h-full   w-full  flex-col items-center justify-end space-y-2 pb-10 text-white">
              <span>SUMMER SALE</span>
              <span className="text-2xl font-semibold">75% off</span>
              <Button className="rounded-full bg-white px-5 py-1.5 text-blue-400">
                Shop Now <ArrowRight />
              </Button>
            </div>
          </div>
          {products.map((product, idx) => (
            <div className=" h-[390px] w-[300px] bg-white" key={idx}>
              <Image src={product.image} width={300} height={100} alt="scale" />
              <div className="mt-3 space-y-3 p-3">
                <p>{product.title}</p>
                <Button className="bg-blue-400 px-5">
                  Request quote <ArrowUpRightIcon />{' '}
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
