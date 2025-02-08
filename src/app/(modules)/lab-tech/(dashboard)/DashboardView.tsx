import OverviewCard, { EnumOverviewIcon } from '@/components/dashboard/metric/OverviewCard';
import OverviewContainer from '@/components/dashboard/metric/OverviewContainer';
import React from 'react';
import Recent from './Recent';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { ChevronRight, File, ShieldAlert, ShieldCheck, TestTube2 } from 'lucide-react';
import ROUTES from '@/constants/routes';
import Link from 'next/link';

const card = [
  {
    stat: '120',
    title: 'Pending Tests',
    type: EnumOverviewIcon.PEOPLE
  },

  {
    stat: '1,500',
    title: 'Tests Completed',
    type: EnumOverviewIcon.CUBE
  },

  {
    stat: '2hrs/test',
    title: 'Turnaround Time',
    type: EnumOverviewIcon.CHART
  },

  {
    stat: '2040',
    title: 'Messages',
    type: EnumOverviewIcon.TIMER
  }
];

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
  return (
    <div className="flex w-full flex-col space-y-4">
      <OverviewContainer>
        {card.map((el, idx) => (
          <OverviewCard key={idx} type={el.type} stat={el.stat} title={el.title} />
        ))}
      </OverviewContainer>

      <div className="flex flex-col-reverse space-y-2 space-y-reverse lg:flex-row lg:space-x-2 lg:space-y-0">
        <div className="w-full rounded-xl bg-white p-4 lg:w-[75%]">
          <Recent />
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
    </div>
  );
};

export default DashboardView;
