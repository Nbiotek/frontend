import { FaFacebook } from 'react-icons/fa6';
import Button from '.';

interface ScheduleProp {
  title: string;
  className: string;
  onClick?: () => void;
}

const ScheduleBtn = ({ title, className, onClick }: ScheduleProp) => {
  return (
    <button
      className={`flex w-fit justify-center rounded-full px-[12px] py-[8px] text-sm ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ScheduleBtn;
