import React from 'react';
import { MoreVertical } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  date: string;
  type: string;
  status: 'Completed' | 'Processing' | 'Rejected' | 'On Hold' | 'In Transit';
}

interface StatusBadgeProps {
  status: Activity['status'];
}

interface ActivityTableProps {
  activities?: Activity[];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    Completed: 'bg-[#3B883E]/30 text-[#3B883E]',
    Processing: 'bg-[#004AAD]/30 text-[#004AAD]',
    Rejected: 'bg-[#DD1400]/30 text-[#DD1400]',
    'On Hold': 'bg-[#FF6F61]/30 text-[#FF6F61]',
    'In Transit': 'bg-[#358BFF]/30 text-[#358BFF]'
  };

  return (
    <span className={`w-[93px] rounded-md px-8 py-2 text-sm font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

const ActivityTable: React.FC<ActivityTableProps> = ({
  activities = [
    {
      id: '00001',
      name: 'Urinalysis',
      date: '04 Sep 2019',
      type: 'Single Test',
      status: 'Completed'
    },
    {
      id: '00001',
      name: 'Stool MCS',
      date: '04 Sep 2019',
      type: 'Group Test',
      status: 'Processing'
    },
    {
      id: '00001',
      name: 'Blood MCS',
      date: '04 Sep 2019',
      type: 'Single Test',
      status: 'Rejected'
    },
    { id: '00001', name: 'Wound MCS', date: '04 Sep 2019', type: 'Group Test', status: 'On Hold' },
    { id: '00001', name: 'Dengue', date: '04 Sep 2019', type: 'Group Test', status: 'In Transit' }
  ]
}) => {
  return (
    <div className="rounded-lg bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="custom-table">
            <tr className="border-b">
              <th className="text-gray-600 px-4 py-4 text-left font-medium">ID</th>
              <th className="text-gray-600 px-4 py-4 text-left font-medium">NAME</th>
              <th className="text-gray-600 px-4 py-4 text-left font-medium">DATE</th>
              <th className="text-gray-600 px-4 py-4 text-left font-medium">TYPE</th>
              <th className="text-gray-600 px-4 py-4 text-left font-medium">STATUS</th>
              <th className="px-4 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="px-4 py-4">{activity.id}</td>
                <td className="px-4 py-4">{activity.name}</td>
                <td className="px-4 py-4">{activity.date}</td>
                <td className="px-4 py-4">{activity.type}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={activity.status} />
                </td>
                <td className="px-4 py-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
