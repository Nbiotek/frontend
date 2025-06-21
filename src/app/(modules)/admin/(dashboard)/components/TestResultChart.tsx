'use client';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
import { useFetchResultChart } from '@/hooks/admin/useFetchResultChart';
import { filteredData } from '@/utils/chart';

const chartConfig = {
  total: {
    label: 'total',
    color: '#004AAD'
  }
} satisfies ChartConfig;

const TestResultChart = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [resultData, setResultData] = useState<TAdminChartRes['data']>([]);

  const { data, isLoading } = useFetchResultChart({ period: timeRange });

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setResultData(data.data);
    }
  }, [data, isLoading]);

  return (
    <Card>
      <CardHeader>
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Test Results Graph</CardTitle>
          <CardDescription>Graph of all test results.</CardDescription>
        </div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <AreaChart data={filteredData(resultData, timeRange)}>
            <defs>
              <linearGradient id="fillPatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
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
              dataKey="total"
              type="step"
              fill="url(#fillPatients)"
              stroke="var(--color-total)"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TestResultChart;
