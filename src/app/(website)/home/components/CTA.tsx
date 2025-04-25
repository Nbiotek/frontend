import { Title } from '@/atoms/typographys';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
  return (
    <div className="w-full bg-white py-12">
      <div
        className="mx-auto w-full max-w-7xl overflow-hidden rounded-lg py-10"
        style={{
          backgroundImage: "url('/bg-cta.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex w-full flex-col items-center justify-between px-6 py-16 md:flex-row md:px-10">
          <div className="mb-6 md:mb-0">
            <Title text="Start Your Healthcare Journey Today" className="font-bold text-white" />
            <p className="mt-3 text-white">
              Sign up for the best healthcare management experience.
            </p>
          </div>
          <Link
            href=""
            className="flex w-full items-center rounded-xl bg-white pb-4 pl-4 pt-8 font-bold text-blue-400 transition ease-in-out md:w-[250px]"
          >
            <span className="flex-grow">Get Started</span>
            <ArrowUpRight className="inline" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
