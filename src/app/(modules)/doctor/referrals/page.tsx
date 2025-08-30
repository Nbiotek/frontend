import { Metadata } from 'next';
import ReferralsView from './ReferralsView';

export const metadata: Metadata = {
  title: 'Patient Referrals | NBiotek',
  description:
    'Manage patient referrals and medical consultations. Send referrals to specialists, track referral status, and coordinate care between healthcare providers for optimal patient outcomes.'
};

export default function ReviewPage() {
  return <ReferralsView />;
}
