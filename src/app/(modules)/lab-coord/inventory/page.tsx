import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';
import InventoryView from './InventoryView';

const { title, description } = ROUTES.LAB_COORD_INVENTORY_MANAGEMENT;

export const metadata: Metadata = {
  title,
  description
};

export default function InventoryPage() {
  return <InventoryView />;
}
