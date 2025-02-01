import { Text } from '@/lib/utils/Text';
import Input from '@/atoms/fields/Input';
import { Label } from '@radix-ui/react-dropdown-menu';

const Profile = () => {
  return (
    <div>
      <div className="relative h-[94px] rounded-lg bg-blue-400">
        <div className="absolute left-1/2 top-[6rem] h-[163px] w-[163px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-neutral-100" />
      </div>
      <div className="mt-[7rem] bg-white p-[24px]">
        <Text variant="title" weight="semibold" align="center">
          {' '}
          Personal Information{' '}
        </Text>
        <form action="">
          <div className="flex flex-col ">
            <Label className="mb-1 text-sm">Full Name</Label>
            <div className="flexBetween gap-4">
              <Input type="text" />
              <Input type="text" />
            </div>
          </div>
          <Input type="email" label="Email" />
          <div className="flexBetween gap-4">
            <Input type="text" label="Phone Number" />
            <Input type="text" label="Married Status" />
          </div>
          <div className="flexBetween gap-4">
            <Input type="text" label="Gender" />
            <Input type="date" label="Date of birth" />
          </div>
          <div className="flexBetween gap-4">
            <Input type="number" label="Weight" />
            <Input type="number" label="Height" />
          </div>
          <Input type="text" label="Primary Care Physician" />
        </form>
      </div>
    </div>
  );
};

export default Profile;
