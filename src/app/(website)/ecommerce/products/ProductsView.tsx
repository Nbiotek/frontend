'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ShoppingCart } from 'lucide-react';
import FilterSidebar, { ALL_CATEGORY } from './components/FilterSidebar';
import ProductGridCard from './components/ProductGridCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useFetchProducts } from '@/hooks/admin/useFetchProducts';
import { useFetchCategories } from '@/hooks/admin/useFetchCategories';
import { useAddToCart } from '@/hooks/admin/useAddToCart';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductDetailModal from '../components/ProductDetailModal';

const PRICE_MIN = 0;
const PRICE_MAX = 500000;

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }
];

const ProductsView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    searchParams.get('categoryId') ?? ALL_CATEGORY
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [sortBy, setSortBy] = useState('latest');

  const sortParams = useMemo(() => {
    if (sortBy === 'price-asc') return { sortBy: 'price', sortOrder: 'ASC' as const };
    if (sortBy === 'price-desc') return { sortBy: 'price', sortOrder: 'DESC' as const };
    return { sortBy: 'createdAt', sortOrder: 'DESC' as const };
  }, [sortBy]);

  const { data: productsData, isLoading: productsLoading } = useFetchProducts({
    limit: 100,
    categoryId: selectedCategoryId !== ALL_CATEGORY ? selectedCategoryId : undefined,
    ...sortParams
  });

  const { data: categories, isLoading: categoriesLoading } = useFetchCategories();
  const { addToCart } = useAddToCart();

  const filteredProducts = useMemo(() => {
    const items = productsData?.items ?? [];
    return items.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
  }, [productsData, priceRange]);

  const handleCategoryChange = (id: string) => {
    setSelectedCategoryId(id);
  };

  const activeFilterCount = selectedCategoryId !== ALL_CATEGORY ? 1 : 0;

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Mobile filter toggle */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-blue-500 flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="text-blue-500 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
          <p className="text-gray-500 text-sm">
            <span className="font-semibold text-neutral-800">{filteredProducts.length}</span>{' '}
            Results Found
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar — desktop always visible, mobile drawer */}
          <div
            className={`fixed inset-0 z-40 lg:relative lg:inset-auto lg:z-auto lg:block ${
              sidebarOpen ? 'block' : 'hidden'
            }`}
          >
            <div
              className="absolute inset-0 bg-black/40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative h-full w-72 overflow-y-auto bg-white p-5 shadow-xl lg:h-auto lg:w-60 lg:overflow-y-auto lg:p-0 lg:shadow-none xl:w-64">
              <div className="mb-4 flex items-center justify-between lg:hidden">
                <span className="font-semibold text-neutral-800">Filters</span>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="text-gray-500 h-5 w-5" />
                </button>
              </div>
              <div className="mb-4 hidden lg:flex">
                <button className="bg-blue-500 flex items-center space-x-2 rounded-full px-4 py-1.5 text-sm font-medium text-white">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filter</span>
                  {activeFilterCount > 0 && (
                    <span className="text-blue-500 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
              <FilterSidebar
                categories={categories ?? []}
                selectedCategoryId={selectedCategoryId}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                priceMin={PRICE_MIN}
                priceMax={PRICE_MAX}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* Sort bar */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 text-sm">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-gray-200 h-8 w-[160px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-sm">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-gray-500 hidden text-sm lg:block">
                  <span className="font-semibold text-neutral-800">{filteredProducts.length}</span>{' '}
                  Results Found
                </p>
                <Link
                  href="/ecommerce/cart"
                  className="bg-blue-500 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  My Cart
                </Link>
              </div>
            </div>

            {/* Grid */}
            {productsLoading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-[240px] rounded-xl" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {filteredProducts.map((product) => (
                  <ProductGridCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    price={product.price}
                    image={product.images?.[0]}
                    outOfStock={product.stock === 0}
                    onAddToCart={addToCart}
                    onProductClick={setSelectedProductId}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl bg-white py-20 text-center shadow-sm">
                <p className="text-lg font-medium text-neutral-700">No products found</p>
                <p className="text-gray-500 mt-1 text-sm">Try adjusting your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategoryId(ALL_CATEGORY);
                    setPriceRange([PRICE_MIN, PRICE_MAX]);
                  }}
                  className="text-blue-500 mt-4 rounded-full border border-blue-400 px-5 py-2 text-sm hover:bg-blue-50"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductDetailModal
        productId={selectedProductId}
        onClose={() => setSelectedProductId(null)}
      />
    </div>
  );
};

export default ProductsView;
