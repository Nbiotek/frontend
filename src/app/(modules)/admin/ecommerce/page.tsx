import { Suspense } from 'react';
import EcommerceView from './EcommerceView';

const EcommerceManagementPage = () => {
  return (
    <Suspense>
      <EcommerceView />
    </Suspense>
  );
};

export default EcommerceManagementPage;
