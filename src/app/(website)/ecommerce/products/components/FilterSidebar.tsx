'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export const ALL_CATEGORY = 'all';

interface FilterSidebarProps {
  categories: TProductCategoryItem[];
  selectedCategoryId: string;
  onCategoryChange: (id: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  priceMin: number;
  priceMax: number;
}

const FilterSidebar = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
  priceRange,
  onPriceChange,
  priceMin,
  priceMax
}: FilterSidebarProps) => {
  return (
    <aside className="flex w-full flex-col space-y-1">
      <Accordion type="multiple" defaultValue={['categories', 'price']} className="w-full">
        {/* Categories */}
        <AccordionItem value="categories" className="border-gray-100 border-b">
          <AccordionTrigger className="text-sm font-semibold text-neutral-800 hover:no-underline">
            All Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2.5 pb-1">
              <label className="flex cursor-pointer items-center space-x-2.5">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategoryId === ALL_CATEGORY}
                  onChange={() => onCategoryChange(ALL_CATEGORY)}
                  className="accent-blue-500 h-3.5 w-3.5"
                />
                <span
                  className={`flex-1 text-xs ${
                    selectedCategoryId === ALL_CATEGORY
                      ? 'text-blue-500 font-medium'
                      : 'text-neutral-600'
                  }`}
                >
                  All
                </span>
              </label>
              {categories.map((cat) => (
                <label key={cat.id} className="flex cursor-pointer items-center space-x-2.5">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategoryId === cat.id}
                    onChange={() => onCategoryChange(cat.id)}
                    className="accent-blue-500 h-3.5 w-3.5"
                  />
                  <span
                    className={`flex-1 text-xs ${
                      selectedCategoryId === cat.id
                        ? 'text-blue-500 font-medium'
                        : 'text-neutral-600'
                    }`}
                  >
                    {cat.name}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold text-neutral-800 hover:no-underline">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pb-1">
              <div className="relative h-5">
                <div className="bg-gray-200 absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full">
                  <div
                    className="absolute h-full rounded-full bg-blue-400"
                    style={{
                      left: `${((priceRange[0] - priceMin) / (priceMax - priceMin)) * 100}%`,
                      right: `${100 - ((priceRange[1] - priceMin) / (priceMax - priceMin)) * 100}%`
                    }}
                  />
                </div>
                <input
                  type="range"
                  min={priceMin}
                  max={priceMax}
                  step={100}
                  value={priceRange[0]}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val < priceRange[1]) onPriceChange([val, priceRange[1]]);
                  }}
                  className="range-input pointer-events-none absolute h-full w-full cursor-pointer appearance-none bg-transparent"
                />
                <input
                  type="range"
                  min={priceMin}
                  max={priceMax}
                  step={100}
                  value={priceRange[1]}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > priceRange[0]) onPriceChange([priceRange[0], val]);
                  }}
                  className="range-input pointer-events-none absolute h-full w-full cursor-pointer appearance-none bg-transparent"
                />
              </div>
              <p className="text-gray-500 text-xs">
                Price: ₦{priceRange[0].toLocaleString()} &ndash; ₦{priceRange[1].toLocaleString()}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Promo Banner */}
      <div className="relative mt-4 h-[160px] overflow-hidden rounded-xl">
        <Image src="/ecom-1.png" fill alt="Discount" className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-3xl font-bold text-white">79%</p>
          <p className="text-sm font-semibold text-white">Discount</p>
          <p className="mt-1 text-[11px] text-white/80">on your first order</p>
          <button className="text-blue-600 mt-3 flex items-center rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold transition-opacity hover:opacity-90">
            Shop now <ArrowRight className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
