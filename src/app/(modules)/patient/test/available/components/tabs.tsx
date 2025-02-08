import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const TestTabs = () => {
  return (
    <>
      <TabsList>
        <TabsTrigger value="single">Single Tests</TabsTrigger>
        <TabsTrigger value="package">Package Tests</TabsTrigger>
      </TabsList>
    </>
  );
};

export default TestTabs;
