import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ROUTES from '@/constants/routes';
import PendingAppt from './components/PendingAppt';
import BookedAppt from './components/BookedAppt';

const { title, description } = ROUTES.RECPTS_APOINTMENT;

export const metadata: Metadata = {
  title,
  description
};

export default function QCPage() {
  return (
    <div className="w-full">
      <Tabs defaultValue="pending" className="flex w-full flex-col space-y-2">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="pending">Booked</TabsTrigger>
            <TabsTrigger value="history">Pending</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full" value="pending">
            <BookedAppt />
          </TabsContent>
          <TabsContent className="w-full" value="history">
            <PendingAppt />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
