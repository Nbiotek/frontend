import { Metadata } from 'next';
import ReviewTestDetailsView from './ReviewTestDetailsView';

export const metadata: Metadata = {
  title: 'Test Result Details | NBiotek',
  description:
    'Review detailed test result information. Analyze specific patient test data, provide clinical interpretations, add medical notes, and approve individual test results for patient care.'
};

const ReviewTestDetailsPage = () => {
  return <ReviewTestDetailsView />;
};

export default ReviewTestDetailsPage;
