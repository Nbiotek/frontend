import { Metadata } from 'next';
import TransactionHistoryView from './TransactionHistoryView';

export const metadata: Metadata = {
  title: 'Billing History | NBiotek',
  description:
    'View your billing history and transaction records. Track payments, invoices, and financial details for your medical tests and laboratory services with NBiotek.'
};

const TransactionPage = () => {
  return <TransactionHistoryView />;
};

export default TransactionPage;
