import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ROUTES from '@/constants/routes';
import QCHistoryView from './components/QCHistoryView';
import QCPendingView from './components/QCPendingView';

const { title, description } = ROUTES.LAB_COORD_QUALITY_CONTROL;

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
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full" value="pending">
            <QCPendingView />
          </TabsContent>
          <TabsContent className="w-full" value="history">
            <QCHistoryView />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
