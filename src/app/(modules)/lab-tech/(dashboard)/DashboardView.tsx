'use client';
import React, { useEffect, useState } from 'react';
import Recent from './Recent';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { ChevronRight, ShieldAlert, ShieldCheck, TestTube2 } from 'lucide-react';
import ROUTES from '@/constants/routes';
import Link from 'next/link';
import Analytics from './Analytics';
import { useFetchDashboard } from '@/hooks/labTech/useFetchDashboard';

const actions = [
  {
    icon: TestTube2,
    title: 'Test Requests',
    description: 'View all test requests',
    url: ROUTES.LAB_TECH_TEST.path
  },
  {
    icon: ShieldCheck,
    title: 'Quality Check',
    description: 'Quality control check',
    url: ROUTES.LAB_TECH_QUALITY_CONTROL_PENDING.path
  },
  {
    icon: ShieldAlert,
    title: 'Emergency',
    description: 'Request Immediate help',
    url: ROUTES.LAB_TECH_TEST.path
  }
];

const DashboardView = () => {
  const [dashboard, setDashboard] = useState<TLabTechDashboardRes>({
    totalPendingTests: 0,
    totalCompletedTests: 0,
    averageTurnaroundTime: 0,
    totalMessages: 0,
    recentTests: []
  });
  const { data, isLoading } = useFetchDashboard();

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setDashboard(data);
    }
  }, [isLoading, data]);

  return (
    <div className="flex w-full flex-col space-y-4">
      <Analytics isLoading={isLoading} data={dashboard} />

      <div className="flex flex-col-reverse space-y-2 space-y-reverse lg:flex-row lg:space-x-2 lg:space-y-0">
        <div className="w-full rounded-xl bg-white p-4 lg:w-[75%]">
          <Recent isLoading={isLoading} data={dashboard.recentTests} />
        </div>
        <div className="flex h-fit w-full flex-col space-y-2 rounded-xl bg-white p-4 lg:w-[25%]">
          <SubTitle text="Quick Actions" className="border-b pb-2" />

          <div className="flex w-full flex-col divide-y">
            {actions.map((action, id) => {
              return (
                <Link key={id} href={action.url}>
                  <div className="flex w-full cursor-pointer items-center justify-between py-4">
                    <div className="flex items-center justify-start space-x-4">
                      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-neutral-50">
                        <action.icon className="text-sm text-neutral-600" />
                      </div>
                      <div>
                        <Paragraph className="!font-medium" text={action.title} />
                        <Paragraph text={action.description} />
                      </div>
                    </div>

                    <ChevronRight className="text-neutral-500" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
