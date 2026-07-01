'use client';

import Image from 'next/image';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Title } from '@/atoms/typographys';
import EcommerceHero from './components/EcommerceHero';
import EcommerceFeatures from './components/EcommerceFeatures';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import ProductMiniCard from './components/ProductMiniCard';
import { useState } from 'react';
import { useFetchCategories } from '@/hooks/admin/useFetchCategories';
import { useFetchProducts } from '@/hooks/admin/useFetchProducts';
import { useAddToCart } from '@/hooks/admin/useAddToCart';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import ProductDetailModal from './components/ProductDetailModal';

const SectionHeader = ({
  label,
  title,
  viewAllHref = '/ecommerce/products'
}: {
  label: string;
  title: string;
  viewAllHref?: string;
}) => (
  <div className="mb-6 flex items-end justify-between">
    <div>
      <span className="text-sm font-thin text-blue-400">{label}</span>
      <Title text={title} />
    </div>
    <Link
      href={viewAllHref}
      className="flex items-center space-x-1 text-sm text-blue-400 hover:underline"
    >
      <span>View All</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
);

const EcommerceView = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { data: categoriesData, isLoading: categoriesLoading } = useFetchCategories();
  const { data: productsData, isLoading: productsLoading } = useFetchProducts({ limit: 8 });
  const { addToCart } = useAddToCart();

  const categories = categoriesData ?? [];
  const allProducts = productsData?.items ?? [];
  const featuredProducts = allProducts.slice(0, 3);
  const hotDeals = allProducts.slice(0, 3);
  const newArrivals = allProducts.slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <EcommerceHero />
      <EcommerceFeatures />

      {/* Popular Categories */}
      <section className="bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label="CATEGORIES" title="Popular Categories" />
          {categoriesLoading ? (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <Skeleton className="h-[90px] w-full rounded-lg sm:h-[110px]" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/ecommerce/products?categoryId=${cat.id}`}>
                  <CategoryCard name={cat.name} image={cat.image} />
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label="PRODUCTS" title="Our Featured Products" />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {/* Promo card */}
            <div className="relative col-span-1 h-[220px] overflow-hidden rounded-xl sm:h-[260px]">
              <Image src="/ecom-1.png" fill alt="Summer Sale" className="object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                <span className="text-[11px] font-medium uppercase tracking-widest text-white/80">
                  Summer Sale
                </span>
                <p className="mt-1 text-3xl font-bold text-white">75% off</p>
                <Link
                  href="/ecommerce/products"
                  className="text-blue-600 mt-4 flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90"
                >
                  Shop Now <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>

            {productsLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-[220px] rounded-xl sm:h-[260px]" />
                ))
              : featuredProducts.map((product) => (
                  <ProductCard
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

          {/* Hot Deals / Best Seller / Top Rated + promo banner */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-800">Hot Deals</h3>
              {productsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 rounded-lg" />
                  ))
                : hotDeals.map((product) => (
                    <ProductMiniCard
                      key={product.id}
                      id={product.id}
                      title={product.name}
                      image={product.images?.[0]}
                      onAddToCart={addToCart}
                      onProductClick={setSelectedProductId}
                    />
                  ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-800">Best Seller</h3>
              {productsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 rounded-lg" />
                  ))
                : hotDeals.map((product) => (
                    <ProductMiniCard
                      key={`bs-${product.id}`}
                      id={product.id}
                      title={product.name}
                      image={product.images?.[0]}
                      onAddToCart={addToCart}
                      onProductClick={setSelectedProductId}
                    />
                  ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-800">Top Rated</h3>
              {productsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 rounded-lg" />
                  ))
                : hotDeals.map((product) => (
                    <ProductMiniCard
                      key={`tr-${product.id}`}
                      id={product.id}
                      title={product.name}
                      image={product.images?.[0]}
                      onAddToCart={addToCart}
                      onProductClick={setSelectedProductId}
                    />
                  ))}
            </div>

            <div className="relative overflow-hidden rounded-xl">
              <Image src="/hero2.png" fill alt="Hot Sale" className="object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/80">
                  Hot Sale
                </span>
                <p className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Save 37% on Every Order
                </p>
                <Link
                  href="/ecommerce/products"
                  className="text-blue-600 mt-4 flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90"
                >
                  Shop Now <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label="NEW IN" title="New Arrivals & Product Updates" />
          {productsLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[240px] rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {newArrivals.map((product) => (
                <ProductCard
                  key={`na-${product.id}`}
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
          )}
        </div>
      </section>

      <ProductDetailModal
        productId={selectedProductId}
        onClose={() => setSelectedProductId(null)}
      />

      {/* Floating shortcuts */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <Link
          href="/ecommerce/orders"
          className="text-blue-500 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium shadow-lg ring-1 ring-blue-100 transition-opacity hover:opacity-90"
        >
          <ArrowRight className="h-4 w-4" />
          My Orders
        </Link>
        <Link
          href="/ecommerce/cart"
          className="flex items-center gap-2 rounded-full bg-blue-400 px-4 py-3 text-white shadow-lg transition-opacity hover:opacity-90"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-sm font-medium">My Cart</span>
        </Link>
      </div>
    </div>
  );
};

export default EcommerceView;
