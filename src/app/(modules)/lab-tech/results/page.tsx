import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecentView from './components/RecentView';
import ArchivedView from './components/ArchivedView';

export default function ResultPage() {
  return (
    <div className="w-full">
      <Tabs defaultValue="failed" className="flex w-full flex-col space-y-2">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="failed">Failed</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full" value="failed">
            <ArchivedView />
          </TabsContent>
          <TabsContent className="w-full" value="recent">
            <RecentView />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
