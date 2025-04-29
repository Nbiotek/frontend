import { SubTitle } from '@/atoms/typographys';
import ApptTodayTable from '../../components/ApptTodayTable';

export default function PendingAppt() {
  return (
    <div className="flex w-full flex-col space-y-4 rounded-lg bg-white p-2">
      <div className="flex w-full items-center justify-between border-b pb-2">
        <SubTitle text="Pending Appointments" />
      </div>

      <ApptTodayTable />
    </div>
  );
}
