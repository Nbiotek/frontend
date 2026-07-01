import { Suspense } from 'react';
import EcommerceOrdersView from './EcommerceOrdersView';

export default function EcommerceOrdersPage() {
  return (
    <Suspense>
      <EcommerceOrdersView />
    </Suspense>
  );
}
