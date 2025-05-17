'use client';
import Cards from '@/atoms/Cards';
import QuickAction from '@/components/common/quick-links';
import Link from 'next/link';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { PatientQuickLinks } from '@/config/quickActionItems';
import { usePatientDashboard, usePatientRecentResult } from '@/hooks/patient/usePatientDashboard';
import MetricsOverview from './component/MetricOverView';
import RecentAppointment from './component/RecentAppointment';
import RecentResultTable from './component/RecentResultTable';
import { useEffect, useState } from 'react';
import { EnumRole } from '@/constants/mangle';
import ROUTES from '@/constants/routes';

const PatientView = () => {
  const router = useRouter();
  const {
    CartStore: { items, removeItem, total }
  } = useStore();

  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setShowCartModal(true);
    }
  }, [items.length]);

  const handleProceedToBooking = () => {
    router.push(`${ROUTES.PATIENT_BOOK_APPOINTMENTS.path}`);
    setShowCartModal(false);
  };

  const handleCloseModal = () => {
    setShowCartModal(false);
  };

  const { isLoading, data } = usePatientDashboard();
  const recentAppointments = data?.recentAppointments || [];
  const { isLoading: recentDataloading, data: recentResultData } = usePatientRecentResult();

  const [recentResult, setRecentData] = useState<TPatientRecentTest>({
    data: []
  });

  const [OverviewData, setOverviewData] = useState<TPatientDashboard>({
    totalAppointments: 0,
    totalTestResults: 0,
    totalMessages: 0,
    upcomingAppointment: 0,
    recentAppointments: []
  });

  useEffect(() => {
    if (!recentDataloading && recentResultData !== undefined) {
      setRecentData(recentResultData);
    }

    if (!isLoading && data !== undefined) {
      setOverviewData(data);
    }
  }, [recentDataloading, recentResultData, data, isLoading]);

  return (
    <div className="mt-[24px] flex w-full flex-col space-y-[24px]">
      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Items in Your Cart</h2>
            <p className="mb-6">
              You have {items.length} item{items.length !== 1 ? 's' : ''} in your cart. Would you
              like to proceed to checkout?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md border px-4 py-2"
              >
                Continue Browsing
              </button>
              <button
                onClick={handleProceedToBooking}
                className="hover:bg-blue-700 rounded-md bg-blue-400 px-4 py-2 text-white"
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      )}

      <MetricsOverview overviewData={OverviewData} isLoading={isLoading} />
      <div className="flex flex-col-reverse space-y-2 space-y-reverse lg:flex-row lg:space-x-4 lg:space-y-0 ">
        <RecentAppointment isLoading={isLoading} recentAppointments={recentAppointments} />
        <Cards title="Daily insights" className="h-fit overflow-y-auto bg-white p-3 lg:w-[35%]">
          <div className="mt-4 border-t p-2" />
          <p className="text-sm font-normal text-black">
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac,
            vestibulum eu nisl.
          </p>
        </Cards>
      </div>
      <div className="flex flex-col-reverse space-y-2 space-y-reverse lg:flex-row lg:space-x-4 lg:space-y-0  ">
        <Cards className="bg-white p-4 lg:w-[65%] ">
          <div className="mb-3 flex justify-between">
            <h4 className="text-lg font-bold">Recent Test Result</h4>
            <Link
              className="text-sm text-blue-50 hover:text-black/20 hover:underline"
              href="/patient/result"
            >
              View all result
            </Link>
          </div>
          <RecentResultTable loading={recentDataloading} data={recentResult} />
        </Cards>
        <Cards title="Quick Actions" className="w-full bg-white px-[12px] py-[23px] lg:w-[35%]">
          <QuickAction quickLink={PatientQuickLinks} />
        </Cards>
      </div>
    </div>
  );
};

export default PatientView;
