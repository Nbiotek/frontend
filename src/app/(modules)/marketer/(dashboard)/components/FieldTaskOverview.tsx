'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskCard, { TaskCardComponentProps } from './TaskCard';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FieldTaskFilterParams } from '@/requests/marketer';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useFieldTaskOverview } from '@/hooks/marketer/useFieldTaskOverview';
import { Switch } from '@/components/ui/switch';
import { Paragraph } from '@/atoms/typographys';
import { MapPin, CheckCircle, Clock } from 'lucide-react';
import { fieldTaskServices } from '@/requests/marketer';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';
import toast from 'react-hot-toast';
import { AUTH } from '@/constants/api';

type TabType = 'today' | 'upcoming' | 'completed';

const FieldTaskOverview = () => {
  const getCurrentDate = () => format(new Date(), 'yyyy-MM-dd');
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const { data: userProfile } = useFetchProfile();

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

  // Switch Availability Mutation

  const { mutate, isPending } = useMutation({
    mutationFn: fieldTaskServices.updateMarketerAvailability,

    onError: () => {
      toast.error('Unable to update availability now.');
    },
    onMutate: () => {},
    onSuccess: (data) => {
      const status = data.status;

      if (status === 'Available') {
        toast.success('You are checked in!');
      } else {
        toast.success('You are checked out!');
      }

      queryClient.invalidateQueries({ queryKey: [AUTH.GET_PROFILE] });
    }
  });

  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-gray-900 text-lg font-semibold">Field Task Overview</h3>
            <div className="text-gray-500 text-sm">{format(new Date(), 'EEEE, MMMM d, yyyy')}</div>
          </div>

          <div
            className={`flex items-center space-x-3 rounded-lg border-2 px-4 py-2 transition-all duration-200 ${
              isCheckedIn
                ? 'bg-green-50 text-green-800 border-green-200'
                : 'bg-orange-50 border-orange-200 text-orange-800'
            }`}
          >
            <div className="flex items-center space-x-2">
              {isCheckedIn ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <MapPin size={18} className="text-orange-600" />
              )}
              <span className="font-medium">{isCheckedIn ? 'Checked In' : 'Check In'}</span>
            </div>
            <Switch
              checked={userProfile?.status === 'Available'}
              onCheckedChange={setIsCheckedIn}
              disabled={isPending}
              onClick={() =>
                mutate({
                  status: userProfile?.status === 'Available' ? 'Unavailable' : 'Available'
                })
              }
            />
          </div>
        </div>
      </div>

      <Tabs
        className="w-full"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabType)}
      >
        <TabsList className="flex w-full justify-center rounded-lg bg-neutral-100 p-1">
          <TabsTrigger
            value="today"
            className="flex flex-1 items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-neutral-400"
          >
            <Clock size={16} />
            <span>Today</span>
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="flex flex-1 items-center space-x-2  data-[state=active]:bg-white data-[state=active]:text-neutral-400"
          >
            <span>Upcoming</span>
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex flex-1 items-center space-x-2  data-[state=active]:bg-white data-[state=active]:text-neutral-400"
          >
            <CheckCircle size={16} />
            <span>Completed</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-4">
          <TaskCard task={fieldTasks || []} loading={isLoading} />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          <TaskCard task={fieldTasks || []} loading={isLoading} />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <TaskCard task={fieldTasks || []} loading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FieldTaskOverview;
