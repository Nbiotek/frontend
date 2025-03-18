import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecentView from './components/RecentView';
import ArchivedView from './components/ArchivedView';

const ResultPage = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="recent" className="flex w-full flex-col space-y-2">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full" value="recent">
            <RecentView />
          </TabsContent>
          <TabsContent className="w-full" value="archived">
            <ArchivedView />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ResultPage;
