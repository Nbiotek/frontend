interface IShiftsProps {
  currentStaffShifts?: Array<TCurrentStaffShifts>;
}

const Shifts = ({ currentStaffShifts }: IShiftsProps) => {
  return <div className="w-full rounded-xl bg-white p-4">Shifts</div>;
};

export default Shifts;
