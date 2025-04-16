'use client';
import TestSelectionPanel from '../../component/TestTab';
import { useRouter } from 'next/navigation';
import { Toast } from '@/atoms/Toast';
import { cartStore } from '@/store/Cart';

const AvailableTestView = () => {
  const router = useRouter();

  // Add a handler for the onClose prop
  const handleClose = () => {
    const itemCount = cartStore.itemCount;

    if (itemCount > 0) {
      // If tests are selected, show a success message
      Toast.success(`${itemCount} test${itemCount !== 1 ? 's' : ''} selected successfully`);

      // Navigate to the next page in your workflow, for example:
      // For a patient, this might go to a booking page
      router.push('/patient/appointment/booking');

      // Alternatively, if this is part of a multi-step form:
      // moveToNextStep();
    } else {
      // If no tests are selected, perhaps show a note
      Toast.info('No tests were selected');

      // You could either stay on the page or navigate back
      router.push('/patients/dashboard');
    }

    // Additional possible logic:
    // - Save selected tests to user's profile/preferences
    // - Update recent selections in local storage
    // - Send analytics event
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
