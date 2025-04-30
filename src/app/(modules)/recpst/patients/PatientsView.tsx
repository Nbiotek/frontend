import SearchInput from '@/atoms/fields/SearchInput';
import PatientsRegTable from '../components/PatientsRegTable';
import IconPod from '@/atoms/Icon/IconPod';
import { ArrowUpDown, ListFilter, User2Icon } from 'lucide-react';
import Button from '@/atoms/Buttons';

const PatientsView = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <fieldset className="flex w-full flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="flex items-center justify-start space-x-2">
          <IconPod Icon={ListFilter} />
          <SearchInput className="w-full md:w-72" placeholder="Search for patients..." />
          <IconPod Icon={ArrowUpDown} />
        </div>

        <Button
          className="md:!w-28"
          variant="filled"
          text="Register"
          leftIcon={<User2Icon size={18} />}
        />
      </fieldset>
      <PatientsRegTable />
    </div>
  );
};

export default PatientsView;
