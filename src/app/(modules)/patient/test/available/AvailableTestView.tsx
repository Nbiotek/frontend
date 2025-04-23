'use client';

import TestSelectionPanel from '../../component/TestTab';
import { useRouter } from 'next/navigation';
import { Toast } from '@/atoms/Toast';
import { useStore } from '@/store';
const AvailableTestView = () => {
  const {
    CartStore: { itemCount }
  } = useStore();

  const router = useRouter();

  const handleClose = () => {
    if (itemCount > 0) {
      Toast.success(`${itemCount} test${itemCount !== 1 ? 's' : ''} selected successfully`);
      router.push('/patient/appointment/booking');
    } else {
      Toast.info('No tests were selected');
      router.push('/patients/dashboard');
    }
  };

  return (
    <div className="space-y-4">
      <div className="">
        <TestSelectionPanel onClose={handleClose} />
      </div>
    </div>
  );
};

export default AvailableTestView;
