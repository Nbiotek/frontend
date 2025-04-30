'use client';
import { useState } from 'react';
import Status from '@/atoms/Buttons/Status';
export interface TaskCardProps {
  title: string;
  description: string;
  date: string;
  status: string;
  onClick?: () => void;
  className?: string;
}
export interface TaskCardComponentProps {
  task: Array<TaskCardProps>;
}

const TaskCard = ({ task }: TaskCardComponentProps) => {
  // Track which card is active (null means no card is active)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  // Toggle active state for a specific card
  const handleCardClick = (index: number) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null); // Clicking active card again closes it
    } else {
      setActiveCardIndex(index); // Set this card as active
    }
  };

  // Handle button clicks without triggering the card click
  const handleButtonClick = (e: React.MouseEvent, action: string, taskIndex: number) => {
    e.stopPropagation(); // Prevent the card's onClick from firing

    // Implement your button action logic here
    console.log(`${action} clicked for task: ${task[taskIndex].title}`);

    if (action === 'complete') {
      // Mark task as completed logic
      console.log('Marking task as completed');
    } else if (action === 'reschedule') {
      // Reschedule task logic
      console.log('Rescheduling task');
    }
  };

  return (
    <div className="relative mt-4 flex flex-col space-y-4">
      {/* Overlay for background */}
      {activeCardIndex !== null && (
        <div
          className="fixed inset-0 z-10 bg-black/30"
          onClick={() => setActiveCardIndex(null)}
        ></div>
      )}

      {/* Task cards */}
      {task.map((taskItem, idx) => (
        <div
          className={`relative cursor-pointer rounded-lg bg-white p-4 shadow-md transition-all duration-200 ease-in-out hover:shadow-lg ${
            activeCardIndex === idx ? 'z-50 scale-[1.02] shadow-xl' : 'z-0'
          }`}
          onClick={() => handleCardClick(idx)}
          key={idx}
        >
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold">{taskItem.title}</h3>
            <p className="text-gray-400 text-sm">{taskItem.date}</p>
            <Status variant={taskItem.status} className="mt-2" />
          </div>
          <p className="text-gray-500 text-sm">{taskItem.description}</p>

          {/* Show action buttons only for the active card */}
          {activeCardIndex === idx && (
            <div className="mt-2 flex items-center space-x-2">
              <button
                className="text-sm font-semibold text-red-500 hover:underline"
                onClick={(e) => handleButtonClick(e, 'complete', idx)}
              >
                Start Task
              </button>
              <button
                className="text-sm font-semibold text-blue-400 hover:underline"
                onClick={(e) => handleButtonClick(e, 'view', idx)}
              >
                Upload Result
              </button>

              <button
                className="text-sm font-semibold text-green-400 hover:underline"
                onClick={(e) => handleButtonClick(e, 'reschedule', idx)}
              >
                Mark as Completed
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
