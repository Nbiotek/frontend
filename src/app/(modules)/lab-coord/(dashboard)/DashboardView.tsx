'use client';
import CoordAnalytics from './CoordAnalytics';
import { ChevronRight, ShieldAlert, ShieldCheck, TestTube2 } from 'lucide-react';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import Link from 'next/link';
import { useFetchDashboard } from '@/hooks/labCoord/useFetchDashboard';
import { EnumOverviewIcon } from '@/components/dashboard/metric/OverviewCard';
import OverviewCardLoader from '@/atoms/Loaders/OverviewCardLoader';
import OverviewContainer from '@/components/dashboard/metric/OverviewContainer';
import { useEffect, useState } from 'react';
import QCTable from '../quality-control/components/QCTable';
import { pagination } from '@/constants/data';
import HyperLink from '@/atoms/Hyperlink';

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

const card = [
  {
    stat: 120,
    title: 'Daily sample volume',
    type: EnumOverviewIcon.TEST,
    tag: 'dailySampleVolume'
  },

  {
    stat: 2,
    title: 'Turnaround Time',
    type: EnumOverviewIcon.TURN,
    tag: 'avgTurnaroundTime'
  },

  {
    stat: 1500,
    title: 'Control Pass rate',
    type: EnumOverviewIcon.SHIELD,
    tag: 'qcPassRate'
  },

  {
    stat: 2040,
    title: 'Utilization Rate',
    type: EnumOverviewIcon.TIMER,
    tag: 'utilizationRate'
  }
];

const DashboardView = () => {
  const [dashboard, setDashboard] = useState<TDashboardData>();
  const { data, isLoading, status } = useFetchDashboard();

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setDashboard(data);
    }
  }, [data, isLoading]);

  return (
    <div className="flex w-full flex-col space-y-4">
      {status === 'pending' && (
        <>
          <OverviewContainer>
            {card.map((el) => (
              <OverviewCardLoader key={el.tag} />
            ))}
          </OverviewContainer>

          <div className="flex animate-pulse flex-col-reverse space-y-2 space-y-reverse lg:flex-row lg:space-x-2 lg:space-y-0">
            <div className="h-60 w-full rounded-xl bg-neutral-75 p-4 lg:w-[75%] "></div>
            <div className="flex h-60 w-full flex-col space-y-2 rounded-xl bg-neutral-75  p-4 lg:w-[25%]"></div>
          </div>

          <div className="flex h-60 w-full animate-pulse flex-col space-y-2 rounded-xl bg-neutral-75  p-4"></div>
          <div className="flex h-60 w-full animate-pulse flex-col space-y-2 rounded-xl bg-neutral-75  p-4"></div>
        </>
      )}
      {status === 'success' && (
        <>
          <CoordAnalytics {...{ card, summary: dashboard?.summary }} />
          <div className="flex flex-col-reverse space-y-2 space-y-reverse lg:flex-row lg:space-x-2 lg:space-y-0">
            <div className="flex w-full flex-col space-y-4 divide-y divide-borderLine rounded-xl bg-white p-4 lg:w-[75%]">
              <div className="flex w-full items-center justify-between">
                <SubTitle text="Pending Quality control" />
                <HyperLink href={ROUTES.LAB_COORD_QUALITY_CONTROL.path} hrefText="See all" />
              </div>

              {dashboard?.pendingQualityControl && (
                <QCTable
                  isLoading={isLoading}
                  resultsData={{ requests: dashboard.pendingQualityControl, pagination }}
                />
              )}
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
        </>
      )}

      {status === 'error' && <>Error getting data now!</>}
    </div>
  );
};

export default DashboardView;
