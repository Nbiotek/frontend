import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Button from '@/atoms/Buttons';

const EcommerceHero = () => {
  return (
    <section className="bg-gray-100 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl py-4 sm:py-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Main banner */}
          <div className="relative h-[280px] overflow-hidden rounded-xl sm:h-[360px] lg:col-span-2 lg:h-[420px]">
            <Image src="/labequip.png" fill alt="Shop Health Products" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
              <h1 className="max-w-md text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
                Shop the Best Health Products, Lab Tests, and Supplements
              </h1>
              <div className="mt-4 flex items-center space-x-2">
                <span className="rounded bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                  Sale up to 30% OFF
                </span>
              </div>
              <p className="mt-2 text-sm text-white/70">Free shipping on all your order.</p>
              <Button
                variant="outlined"
                className="text-blue-600 mt-5 w-fit border-white bg-white px-5 py-2 text-sm font-semibold hover:bg-white/90"
              >
                Shop now <ArrowRight className="ml-1 inline h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Two stacked promo cards */}
          <div className="flex flex-row gap-4 lg:flex-col">
            {/* Summer Sale card */}
            <div className="relative h-[140px] flex-1 overflow-hidden rounded-xl sm:h-[170px] lg:h-[200px]">
              <Image src="/hero1.png" fill alt="Summer Sale" className="object-cover" />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/80">
                  Summer Sale
                </span>
                <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">75% OFF</p>
                <p className="mt-0.5 text-[11px] text-white/70">Only Laboratory Equipments</p>
                <button className="mt-3 flex w-fit items-center rounded-full border border-white/60 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/10">
                  Shop now <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Best Deal card */}
            <div className="relative h-[140px] flex-1 overflow-hidden rounded-xl sm:h-[170px] lg:h-[200px]">
              <Image src="/ecom-1.png" fill alt="Best Deal" className="object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-end px-5 pb-5">
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/80">
                  Best Deal
                </span>
                <p className="mt-1 text-lg font-bold leading-snug text-white sm:text-xl">
                  Special Products Deal of the Month
                </p>
                <button className="mt-3 flex w-fit items-center rounded-full border border-white/60 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/10">
                  Shop now <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcommerceHero;
