'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const chartData = [
  // April 2024
  { date: '2024-04-01', patients: 222, technicians: 150, doctors: 60 },
  { date: '2024-04-02', patients: 97, technicians: 180, doctors: 75 },
  { date: '2024-04-03', patients: 167, technicians: 120, doctors: 50 },
  { date: '2024-04-04', patients: 242, technicians: 260, doctors: 110 },
  { date: '2024-04-05', patients: 210, technicians: 230, doctors: 95 },
  { date: '2024-04-06', patients: 185, technicians: 190, doctors: 80 },
  { date: '2024-04-07', patients: 134, technicians: 140, doctors: 65 },
  { date: '2024-04-08', patients: 176, technicians: 200, doctors: 70 },
  { date: '2024-04-09', patients: 220, technicians: 210, doctors: 90 },
  { date: '2024-04-10', patients: 240, technicians: 250, doctors: 100 },
  { date: '2024-04-11', patients: 198, technicians: 190, doctors: 85 },
  { date: '2024-04-12', patients: 174, technicians: 160, doctors: 70 },
  { date: '2024-04-13', patients: 200, technicians: 180, doctors: 75 },
  { date: '2024-04-14', patients: 215, technicians: 195, doctors: 85 },
  { date: '2024-04-15', patients: 230, technicians: 210, doctors: 92 },
  { date: '2024-04-16', patients: 188, technicians: 170, doctors: 78 },
  { date: '2024-04-17', patients: 172, technicians: 160, doctors: 65 },
  { date: '2024-04-18', patients: 225, technicians: 220, doctors: 88 },
  { date: '2024-04-19', patients: 205, technicians: 200, doctors: 82 },
  { date: '2024-04-20', patients: 191, technicians: 175, doctors: 74 },
  { date: '2024-04-21', patients: 180, technicians: 165, doctors: 70 },
  { date: '2024-04-22', patients: 210, technicians: 190, doctors: 85 },
  { date: '2024-04-23', patients: 199, technicians: 200, doctors: 79 },
  { date: '2024-04-24', patients: 233, technicians: 210, doctors: 91 },
  { date: '2024-04-25', patients: 245, technicians: 230, doctors: 97 },
  { date: '2024-04-26', patients: 227, technicians: 215, doctors: 89 },
  { date: '2024-04-27', patients: 215, technicians: 205, doctors: 84 },
  { date: '2024-04-28', patients: 200, technicians: 190, doctors: 80 },
  { date: '2024-04-29', patients: 218, technicians: 210, doctors: 87 },
  { date: '2024-04-30', patients: 230, technicians: 225, doctors: 93 },

  // May 2024
  { date: '2024-05-01', patients: 240, technicians: 235, doctors: 100 },
  { date: '2024-05-02', patients: 195, technicians: 180, doctors: 85 },
  { date: '2024-05-03', patients: 220, technicians: 210, doctors: 90 },
  { date: '2024-05-04', patients: 210, technicians: 190, doctors: 82 },
  { date: '2024-05-05', patients: 180, technicians: 170, doctors: 75 },
  { date: '2024-05-06', patients: 202, technicians: 185, doctors: 78 },
  { date: '2024-05-07', patients: 215, technicians: 200, doctors: 84 },
  { date: '2024-05-08', patients: 198, technicians: 190, doctors: 79 },
  { date: '2024-05-09', patients: 233, technicians: 220, doctors: 95 },
  { date: '2024-05-10', patients: 247, technicians: 240, doctors: 105 },
  { date: '2024-05-11', patients: 230, technicians: 225, doctors: 97 },
  { date: '2024-05-12', patients: 180, technicians: 170, doctors: 73 },
  { date: '2024-05-13', patients: 200, technicians: 180, doctors: 80 },
  { date: '2024-05-14', patients: 215, technicians: 200, doctors: 88 },
  { date: '2024-05-15', patients: 225, technicians: 210, doctors: 91 },
  { date: '2024-05-16', patients: 205, technicians: 195, doctors: 84 },
  { date: '2024-05-17', patients: 193, technicians: 175, doctors: 77 },
  { date: '2024-05-18', patients: 218, technicians: 200, doctors: 86 },
  { date: '2024-05-19', patients: 227, technicians: 215, doctors: 93 },
  { date: '2024-05-20', patients: 212, technicians: 198, doctors: 88 },
  { date: '2024-05-21', patients: 206, technicians: 190, doctors: 84 },
  { date: '2024-05-22', patients: 210, technicians: 195, doctors: 86 },
  { date: '2024-05-23', patients: 224, technicians: 205, doctors: 92 },
  { date: '2024-05-24', patients: 238, technicians: 225, doctors: 98 },
  { date: '2024-05-25', patients: 250, technicians: 235, doctors: 102 },
  { date: '2024-05-26', patients: 215, technicians: 200, doctors: 87 },
  { date: '2024-05-27', patients: 202, technicians: 190, doctors: 82 },
  { date: '2024-05-28', patients: 218, technicians: 210, doctors: 89 },
  { date: '2024-05-29', patients: 235, technicians: 220, doctors: 94 },
  { date: '2024-05-30', patients: 240, technicians: 230, doctors: 99 },
  { date: '2024-05-31', patients: 250, technicians: 240, doctors: 105 },

  // June 2024
  { date: '2024-06-01', patients: 220, technicians: 200, doctors: 88 },
  { date: '2024-06-02', patients: 190, technicians: 180, doctors: 75 },
  { date: '2024-06-03', patients: 210, technicians: 190, doctors: 83 },
  { date: '2024-06-04', patients: 225, technicians: 210, doctors: 91 },
  { date: '2024-06-05', patients: 205, technicians: 195, doctors: 85 },
  { date: '2024-06-06', patients: 195, technicians: 180, doctors: 80 },
  { date: '2024-06-07', patients: 215, technicians: 200, doctors: 87 },
  { date: '2024-06-08', patients: 230, technicians: 215, doctors: 95 },
  { date: '2024-06-09', patients: 245, technicians: 225, doctors: 101 },
  { date: '2024-06-10', patients: 250, technicians: 230, doctors: 103 },
  { date: '2024-06-11', patients: 240, technicians: 225, doctors: 97 },
  { date: '2024-06-12', patients: 220, technicians: 210, doctors: 90 },
  { date: '2024-06-13', patients: 208, technicians: 195, doctors: 85 },
  { date: '2024-06-14', patients: 198, technicians: 185, doctors: 80 },
  { date: '2024-06-15', patients: 215, technicians: 200, doctors: 88 },
  { date: '2024-06-16', patients: 225, technicians: 210, doctors: 92 },
  { date: '2024-06-17', patients: 235, technicians: 220, doctors: 96 },
  { date: '2024-06-18', patients: 245, technicians: 230, doctors: 100 },
  { date: '2024-06-19', patients: 255, technicians: 240, doctors: 105 },
  { date: '2024-06-20', patients: 260, technicians: 250, doctors: 110 },
  { date: '2024-06-21', patients: 240, technicians: 225, doctors: 98 },
  { date: '2024-06-22', patients: 225, technicians: 210, doctors: 90 },
  { date: '2024-06-23', patients: 210, technicians: 195, doctors: 85 },
  { date: '2024-06-24', patients: 198, technicians: 185, doctors: 80 },
  { date: '2024-06-25', patients: 220, technicians: 200, doctors: 88 },
  { date: '2024-06-26', patients: 235, technicians: 215, doctors: 94 },
  { date: '2024-06-27', patients: 248, technicians: 230, doctors: 102 },
  { date: '2024-06-28', patients: 260, technicians: 240, doctors: 108 },
  { date: '2024-06-29', patients: 275, technicians: 250, doctors: 115 },
  { date: '2024-06-30', patients: 280, technicians: 260, doctors: 120 }
];

const chartConfig = {
  visitors: {
    label: 'Healthcare Staff'
  },
  patients: {
    label: 'Patients',
    color: '#004AAD'
  },
  technicians: {
    label: 'Technicians',
    color: '#3B883E'
  },
  doctors: {
    label: 'Doctors',
    color: '#dd1400'
  }
} satisfies ChartConfig;

export function GrowthChart() {
  const [timeRange, setTimeRange] = React.useState('90d');

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Growth Report</CardTitle>
          <CardDescription>Showing total growth for the last 3 months</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-patients)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-patients)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillTechnicians" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-technicians)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-technicians)" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="fillDoctors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-doctors)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-doctors)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    });
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="patients"
              type="natural"
              fill="url(#fillPatients)"
              stroke="var(--color-patients)"
              stackId="a"
            />
            <Area
              dataKey="technicians"
              type="natural"
              fill="url(#fillTechnicians)"
              stroke="var(--color-technicians)"
              stackId="a"
            />
            <Area
              dataKey="doctors"
              type="natural"
              fill="url(#fillDoctors)"
              stroke="var(--color-doctors)"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
