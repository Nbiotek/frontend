import { Suspense } from 'react';
import ProductsView from './ProductsView';

const ProductsPage = () => {
  return (
    <Suspense>
      <ProductsView />
    </Suspense>
  );
};

export default ProductsPage;
