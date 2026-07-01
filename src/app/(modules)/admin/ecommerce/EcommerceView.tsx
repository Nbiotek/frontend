'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProductsTab from './components/ProductsTab';
import OrdersTab from './components/OrdersTab';
import CartTab from './components/CartTab';
import CategoriesTab from './components/CategoriesTab';

enum EcommerceTab {
  PRODUCTS = 'products',
  ORDERS = 'orders',
  CART = 'cart',
  CATEGORIES = 'categories'
}

const EcommerceView = () => {
  const params = useSearchParams();
  const tab = params.get('tab');

  return (
    <div className="w-full">
      <Tabs value={tab ?? EcommerceTab.PRODUCTS} className="flex w-full flex-col space-y-2">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value={EcommerceTab.PRODUCTS}>
              <Link href={`?tab=${EcommerceTab.PRODUCTS}`} shallow prefetch>
                Products
              </Link>
            </TabsTrigger>
            <TabsTrigger value={EcommerceTab.ORDERS}>
              <Link href={`?tab=${EcommerceTab.ORDERS}`} shallow prefetch>
                Orders
              </Link>
            </TabsTrigger>
            <TabsTrigger value={EcommerceTab.CART}>
              <Link href={`?tab=${EcommerceTab.CART}`} shallow prefetch>
                Cart
              </Link>
            </TabsTrigger>
            <TabsTrigger value={EcommerceTab.CATEGORIES}>
              <Link href={`?tab=${EcommerceTab.CATEGORIES}`} shallow prefetch>
                Categories
              </Link>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-4">
          <TabsContent className="w-full" value={EcommerceTab.PRODUCTS}>
            <ProductsTab />
          </TabsContent>
          <TabsContent className="w-full" value={EcommerceTab.ORDERS}>
            <OrdersTab />
          </TabsContent>
          <TabsContent className="w-full" value={EcommerceTab.CART}>
            <CartTab />
          </TabsContent>
          <TabsContent className="w-full" value={EcommerceTab.CATEGORIES}>
            <CategoriesTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default EcommerceView;
