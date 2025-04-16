import { type Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ROUTES from '@/constants/routes';
import DailySchedule from './components/DailySchedule';
import WeeklySchedule from './components/WeeklySchedule';

const { title, description } = ROUTES.LAB_COORD_QUALITY_CONTROL;

export const metadata: Metadata = {
  title,
  description
};

const StaffPage = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="daily" className="flex w-full flex-col space-y-2">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg bg-white p-2">
          <TabsContent className="w-full" value="daily">
            <DailySchedule />
          </TabsContent>
          <TabsContent className="w-full" value="weekly">
            <WeeklySchedule />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default StaffPage;
