'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'A bar chart with a label';

interface IUsersBarchartProps {
  data: TAdminDashboardStats | undefined;
  isLoading: boolean;
}

export function UsersBarchart({ data, isLoading }: IUsersBarchartProps) {
  const chartData = [
    { staff: 'Patients', count: data?.patient || 0 },
    { staff: 'Doctors', count: data?.doctor || 0 },
    { staff: 'Ref. Doctors', count: data?.referralDoctor || 0 },
    { staff: 'Lab Tech.', count: data?.labTechnician || 0 },
    { staff: 'Lab Coord.', count: data?.labCoordinator || 0 },
    { staff: 'Receptionist', count: data?.receptionist },
    { staff: 'Marketer', count: data?.marketer },
    { staff: 'Tech. Coord.', count: data?.technicalCoordinator || 0 },
    { staff: 'Super Admin', count: data?.superAdmin || 0 }
  ];

  const chartConfig = {
    count: {
      label: 'Count',
      color: '#004AAD'
    }
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users Graph</CardTitle>
        <CardDescription>Graph of all users.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="staff" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
