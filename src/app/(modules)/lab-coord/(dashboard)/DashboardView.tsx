import React from 'react';
import CoordAnalytics from './CoordAnalytics';
import { ChevronRight, ShieldAlert, ShieldCheck, TestTube2 } from 'lucide-react';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import Inventory from './Inventory';
import Qc from './Qc';
import Shifts from './Shifts';
import Link from 'next/link';

const actions = [
  {
    icon: TestTube2,
    title: ROUTES.LAB_COORD_TEST_SCHEDULING.title,
    description: 'View all test requests',
    url: ROUTES.LAB_COORD_TEST_SCHEDULING.path
  },
  {
    icon: ShieldCheck,
    title: ROUTES.LAB_COORD_QUALITY_CONTROL.title,
    description: 'Quality control check',
    url: ROUTES.LAB_COORD_QUALITY_CONTROL.path
  },
  {
    icon: ShieldAlert,
    title: ROUTES.LAB_COORD_SUPPORT.title,
    description: 'Request Immediate help',
    url: ROUTES.LAB_COORD_SUPPORT.path
  }
];

const DashboardView = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <CoordAnalytics />

      <div className="flex flex-col-reverse space-y-2 space-y-reverse lg:flex-row lg:space-x-2 lg:space-y-0">
        <div className="w-full rounded-xl bg-white p-4 lg:w-[75%]">
          <Inventory />
        </div>
        <div className="flex h-fit w-full flex-col space-y-2 rounded-xl bg-white p-4 lg:w-[25%]">
          <SubTitle text="Quick Actions" className="border-b pb-2" />

          <div className="flex w-full flex-col divide-y">
            {actions.map((action) => {
              return (
                <Link key={action.url} href={action.url}>
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

      <Qc />
      <Shifts />
    </div>
  );
};

export default DashboardView;
