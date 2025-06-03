import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TestContents = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="individual" className="flex w-full flex-col space-y-2">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="package">Special Package</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full" value="individual">
            Individual Tests
          </TabsContent>
          <TabsContent className="w-full" value="package">
            Package Tests
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TestContents;
