import { Suspense } from 'react';
import LabTestView from './LabtestView';

const LabTests = () => {
  return (
    <Suspense>
      <LabTestView />
    </Suspense>
  );
};

export default LabTests;
