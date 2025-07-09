import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UnAssignedTests from '../../lab-coord/tests/UnAssignedTests';
import AssignedTests from '../../lab-coord/tests/AssignedTests';

const TestView = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="unassigned" className="flex w-full flex-col space-y-2">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="unassigned">UnAssigned</TabsTrigger>
            <TabsTrigger value="assigned">Assigned</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full" value="unassigned">
            <UnAssignedTests />
          </TabsContent>
          <TabsContent className="w-full" value="assigned">
            <AssignedTests />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TestView;
