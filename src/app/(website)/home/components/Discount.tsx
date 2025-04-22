import Button from '@/atoms/Buttons';
import { Title } from '@/atoms/typographys';
import { ArrowRight } from 'lucide-react';

const Discount = () => {
  return (
    <div className="bg-black/80 py-10">
      <div className="mx-auto max-w-7xl">
        <Title text="Exclusive Discounts Just for You!" className="text-center text-white" />
        <p className="text-center text-white">
          Take advantage of limited-time offers on our range of healthcare products and services.
        </p>

        <div className="mt-10 flex space-x-5">
          <div className="flex-1 space-y-3 rounded-lg bg-white px-10 py-6">
            <p className="text-blue-400">LAB TESTS</p>
            <div className="flex items-center space-x-3">
              <p className="text-3xl text-blue-400">
                <span className="font-bold text-red-400">20%</span> OFF
              </p>
              <Button variant="filled" className="w-fit px-6">
                {' '}
                Request a Lab Test <ArrowRight />
              </Button>
            </div>
            <p>Save on comprehensive lab tests when you order through NBIOTEK.</p>
          </div>
          <div className="flex-1 space-y-3 rounded-lg bg-white px-10 py-6">
            <p className="text-blue-400">Equipment</p>
            <div className="flex items-center space-x-3">
              <p className="text-3xl text-blue-400">
                <span className="font-bold text-red-400">$100</span> OFF
              </p>
              <Button
                variant="outlined"
                className="w-fit bg-green-400 px-6 text-white  hover:border-none"
              >
                {' '}
                Shop Nowt <ArrowRight />
              </Button>
            </div>
            <p>Save on comprehensive lab tests when you order through NBIOTEK.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
