import { FaFacebook } from 'react-icons/fa6';
import Button from '.';

interface ScheduleProp {
  title: string;
  className: string;
}

const ScheduleBtn = ({ title, className }: ScheduleProp) => {
  return (
    <button
      className={`flex w-fit justify-center rounded-full px-[12px] py-[8px] text-sm ${className}`}
    >
      {title}
    </button>
  );
};

export default ScheduleBtn;
