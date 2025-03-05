import { Text } from '@/lib/utils/Text';
import Input from '@/atoms/fields/Input';
import { Label } from '@radix-ui/react-dropdown-menu';

const Profile = () => {
  return (
    <div>
      <div className="relative h-[94px] rounded-lg bg-blue-400 ">
        <div className="absolute left-1/2 top-[6rem] h-[163px] w-[163px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-neutral-100 " />
      </div>
      <div className="mt-[7rem] bg-transparent sm:bg-white sm:p-[10px]  md:p-[16px] lg:p-[24px]">
        <Text variant="title" weight="semibold" align="center" className="mb-4">
          {' '}
          Personal Information{' '}
        </Text>
        <div className="flex flex-col ">
          <Label className="mb-1 text-sm">Full Name</Label>
          <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" placeholder="First name" />
            <Input type="text" placeholder="Last name" />
          </div>
        </div>
        <Input type="email" label="Email" />
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="text" label="Phone Number" />
          <Input type="text" label="Married Status" />
        </div>
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="text" label="Gender" />
          <Input type="date" label="Date of birth" />
        </div>
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="number" label="Weight" />
          <Input type="number" label="Height" />
        </div>
        <Input type="text" label="Primary Care Physician" />
      </div>

      <div className="mt-[24px] flex justify-between gap-[24px]">
        <div className="mb-8 flex-1 bg-transparent bg-white sm:bg-white sm:p-[10px]  md:p-[16px] lg:p-[24px]">
          <Text variant="title" weight="semibold" align="center" className="mb-4">
            {' '}
            Insurance Information{' '}
          </Text>

          <Input type="email" label="Primary Insurance Provider" />
          <Input type="email" label="Insurance Plan Name" />
          <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" label="Policy Number" value={''} />
            <Input type="text" label="Group Number" />
          </div>
          <Input type="email" label="Policy Holder Name" />
          <Input type="email" label="Insurance Phone Number" />
          <Input type="email" label="Policy Holder Phone number" />
        </div>
        <div className="mb-8 flex-1 bg-transparent bg-white sm:bg-white sm:p-[10px]  md:p-[16px] lg:p-[24px]">
          <Text variant="title" weight="semibold" align="center" className="mb-4">
            {' '}
            Contact Information{' '}
          </Text>

          <Input type="email" label="Home Address" />
          <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" label="City" />
            <Input type="text" label="State" />
          </div>
          <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" label="Landark" />
            <Input type="text" label="Postal Code" />
          </div>
          <Input type="email" label="Emergency Contact Information" />

          <Input type="email" label="Emergency Contact Information Address" />
          <Input type="email" label="Emergency Contact Information Phone" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
