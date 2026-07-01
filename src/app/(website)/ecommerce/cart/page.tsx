import { Suspense } from 'react';
import EcommerceCartView from './EcommerceCartView';

export default function EcommerceCartPage() {
  return (
    <Suspense>
      <EcommerceCartView />
    </Suspense>
  );
}
