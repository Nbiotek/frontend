import Button from '@/atoms/Buttons';
import { Title } from '@/atoms/typographys';
import { ArrowRight } from 'lucide-react';

const Discount = () => {
  return (
    <div className="bg-black/80 px-4 py-8 sm:px-6 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <Title text="Exclusive Discounts Just for You!" className="text-center text-white" />
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-white/90 sm:text-base">
          Take advantage of limited-time offers on our range of healthcare products and services.
        </p>

        <div className="mt-6 flex flex-col space-y-4 sm:mt-8 md:mt-10 md:flex-row md:space-x-5 md:space-y-0">
          <div className="flex-1 space-y-3 rounded-lg bg-white p-4 shadow-lg sm:p-6 md:px-8 md:py-6">
            <p className="text-sm font-medium text-blue-400 sm:text-base">LAB TESTS</p>
            <div className="flex flex-col items-start space-y-3 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0">
              <p className="text-2xl text-blue-400 sm:text-3xl">
                <span className="font-bold text-red-400">20%</span> OFF
              </p>
              <Button
                variant="filled"
                className="flex w-full items-center justify-center space-x-1 px-4 py-2 text-sm sm:w-fit sm:px-6"
              >
                <span>Request a Lab Test</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Save on comprehensive lab tests when you order through NBIOTEK.
            </p>
          </div>

          <div className="flex-1 space-y-3 rounded-lg bg-white p-4 shadow-lg sm:p-6 md:px-8 md:py-6">
            <p className="text-sm font-medium text-blue-400 sm:text-base">EQUIPMENT</p>
            <div className="flex flex-col items-start space-y-3 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0">
              <p className="text-2xl text-blue-400 sm:text-3xl">
                <span className="font-bold text-red-400">$100</span> OFF
              </p>
              <Button
                variant="outlined"
                className="flex w-full items-center justify-center space-x-1 bg-green-400 px-4 py-2 text-sm text-white hover:border-none sm:w-fit sm:px-6"
              >
                <span>Shop Now</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Save on comprehensive lab tests when you order through NBIOTEK.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
