'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskCard, { TaskCardComponentProps } from './TaskCard';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FieldTaskFilterParams } from '@/requests/marketer';
import { useQueryClient } from '@tanstack/react-query';
import { useFieldTaskOverview } from '@/hooks/marketer/useFieldTaskOverview';

type TabType = 'today' | 'upcoming' | 'completed';

const FieldTaskOverview = () => {
  const getCurrentDate = () => format(new Date(), 'yyyy-MM-dd');
  const [activeTab, setActiveTab] = useState<TabType>('today');

  const getFilterParams = (tab: TabType): FieldTaskFilterParams => {
    const today = getCurrentDate();

    switch (tab) {
      case 'today':
        return {
          fromDate: today,
          toDate: today,
          status: 'pending'
        };
      case 'upcoming':
        return {
          status: 'pending'
        };
      case 'completed':
        return {
          status: 'completed'
        };
      default:
        return {};
    }
  };

  const [filters, setFilters] = useState<FieldTaskFilterParams & { page?: number; limit?: number }>(
    { ...getFilterParams('today'), page: 1, limit: 10 }
  );

  const queryClient = useQueryClient();

  const { data, isLoading } = useFieldTaskOverview(filters);

  useEffect(() => {
    setFilters((prev) => ({
      ...getFilterParams(activeTab),
      page: 1,
      limit: prev.limit
    }));
  }, [activeTab]);

  const fieldTasks = data?.data.requests || [];

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['fieldTask-overview'] });
  }, [filters, queryClient]);
  return (
    <Tabs
      className="w-full"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabType)}
    >
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
        <TaskCard task={fieldTasks || []} loading={isLoading} />
      </TabsContent>
      <TabsContent value="upcoming">
        <TaskCard task={fieldTasks || []} loading={isLoading} />
      </TabsContent>
      <TabsContent value="completed">
        <TaskCard task={fieldTasks || []} loading={isLoading} />
      </TabsContent>
    </Tabs>
  );
};

export default FieldTaskOverview;
