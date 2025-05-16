'use client';

import { useState } from 'react';
import Status from '@/atoms/Buttons/Status';
import { dateTimeUTC } from '@/utils/date';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';

export interface TaskCardComponentProps {
  task: Array<TFieldTestRequest>;
  loading?: boolean;
}

const TaskCard = ({ task, loading }: TaskCardComponentProps) => {
  const router = useRouter();

  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null);
    } else {
      setActiveCardIndex(index);
    }
  };

  return (
    <>
      {loading && (
        <>
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="animate-pulse rounded-lg bg-neutral-200 p-6 shadow-sm"></div>
            ))}
        </>
      )}
      <div className="relative mt-4 flex flex-col space-y-4">
        {activeCardIndex !== null && (
          <div
            className="fixed inset-0 z-10 bg-black/30"
            onClick={() => setActiveCardIndex(null)}
          ></div>
        )}

        {task.map((taskItem, idx) => (
          <div
            className={`relative cursor-pointer rounded-lg bg-white p-4 shadow-md transition-all duration-200 ease-in-out hover:shadow-lg ${
              activeCardIndex === idx ? 'z-50 scale-[1.02] shadow-xl' : 'z-0'
            }`}
            onClick={() => handleCardClick(idx)}
            key={idx}
          >
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold">{taskItem.testName}</h3>
              <p className="text-gray-400 text-sm">{dateTimeUTC(taskItem.createdAt)}</p>
              <Status variant={taskItem.status} />
            </div>
            <p className="text-lg font-semibold">{taskItem.patientName}</p>
            <p className="text-gray-500 text-sm">{taskItem.location.address}</p>

            {activeCardIndex === idx && (
              <div className="mt-2 flex items-center space-x-2">
                <button className="text-sm font-semibold text-red-500 hover:underline">
                  Start Task
                </button>
                <button
                  className="text-sm font-semibold text-blue-400 hover:underline"
                  onClick={() => router.push(`${ROUTES.MARKETER_FIELD_VISIT.path}/${taskItem.id}`)}
                >
                  Upload Result
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {task.length === 0 && !loading && (
        <div className="border-gray-100 animate-pulse rounded-lg border bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">No field tasks found</p>
        </div>
      )}
    </>
  );
};

export default TaskCard;
