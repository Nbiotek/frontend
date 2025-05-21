'use client';
import EmptyState from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchPatientAppt } from '@/hooks/user/useFetchPatientAppt';
import AppointmentCard from '../AppointmentCard';

const PatientApptView = ({ id }: { id: string }) => {
  const { data, status } = useFetchPatientAppt(id);
  return (
    <div className="flex h-[80vh] w-full flex-col space-y-4 overflow-y-scroll">
      {status === 'pending' &&
        Array(10)
          .fill(1)
          .map((item) => <Skeleton key={item} className="h-40 w-full" />)}
      {status === 'success' &&
        data &&
        data.appointments.map((datum) => <AppointmentCard key={datum.id} {...{ datum }} />)}

      {status === 'success' && data && data.appointments.length == 0 && (
        <div className="h-3/4 w-full rounded-lg bg-white">
          <EmptyState title="No Appointments for this patient." />
        </div>
      )}
    </div>
  );
};

export default PatientApptView;
