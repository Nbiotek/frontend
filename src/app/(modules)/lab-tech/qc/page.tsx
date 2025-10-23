import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ROUTES from '@/constants/routes';
import QCHistoryView from './components/QCHistoryView';
import QCPendingView from './components/QCPendingView';

const { title, description } = ROUTES.LAB_TECH_QUALITY_CONTROL_PENDING;

export const metadata: Metadata = {
  title,
  description
};

export default function QCPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Tabs defaultValue="pending" className="flex w-full flex-col space-y-2">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent value="pending" className="w-full overflow-x-auto">
            <div className="min-w-full">
              <QCPendingView />
            </div>
          </TabsContent>

          <TabsContent value="history" className="w-full overflow-x-auto">
            <div className="min-w-full">
              <QCHistoryView />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
