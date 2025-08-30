import { Metadata } from 'next';
import CartPage from './CartView';

export const metadata: Metadata = {
  title: 'Shopping Cart | NBiotek',
  description:
    'Review your selected medical tests and laboratory services. Manage your cart, view pricing, and proceed to checkout for your NBiotek appointments and services.'
};

const PatientCart = () => {
  return <CartPage />;
};

export default PatientCart;
