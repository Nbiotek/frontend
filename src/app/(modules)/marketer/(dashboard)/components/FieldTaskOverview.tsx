import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskCard, { TaskCardComponentProps, TaskCardProps } from './TaskCard';

const Today: TaskCardProps[] = [
  {
    title: 'Blood Pressure Test',
    status: 'PENDING',
    date: '2023-10-01',
    description: 'Follow up with patient 1 regarding their test results.'
  },
  {
    title: 'Blood Sugar Test',
    status: 'PENDING',
    date: '2023-10-01',
    description: 'Follow up with patient 2 regarding their test results.'
  },
  {
    title: 'Blood Pressure Test',
    status: 'PENDING',
    date: '2023-10-01',
    description: 'Follow up with patient 1 regarding their test results.'
  }
];

const Upcoming: TaskCardProps[] = [
  {
    title: 'Blood Pressure Test',
    status: 'PENDING',
    date: '2023-10-01',
    description: 'Follow up with patient 1 regarding their test results.'
  },
  {
    title: 'Blood Sugar Test',
    status: 'PENDING',
    date: '2023-10-01',
    description: 'Follow up with patient 2 regarding their test results.'
  }
];
const Completed: TaskCardProps[] = [
  {
    title: 'Blood Pressure Test',
    status: 'COMPLETED',
    date: '2023-10-01',
    description: 'Follow up with patient 1 regarding their test results.'
  },

  {
    title: 'Blood Sugar Test',
    status: 'COMPLETED',
    date: '2023-10-01',
    description: 'Follow up with patient 2 regarding their test results.'
  },

  {
    title: 'Blood Pressure Test',
    status: 'COMPLETED',
    date: '2023-10-01',
    description: 'Follow up with patient 1 regarding their test results.'
  }
];

const FieldTaskOverview = () => {
  return (
    <Tabs defaultValue="today" className="w-full">
      <TabsList className="flex w-full justify-between rounded-none border-b-2 bg-transparent pb-4">
        <div className="flex space-x-2">
          <h3 className="text-lg font-semibold">Field Task Overview</h3>
        </div>
        <div>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="today">
        <TaskCard task={Today} />
      </TabsContent>
      <TabsContent value="upcoming">
        <TaskCard task={Upcoming} />
      </TabsContent>
      <TabsContent value="completed">
        <TaskCard task={Completed} />
      </TabsContent>
    </Tabs>
  );
};

export default FieldTaskOverview;
