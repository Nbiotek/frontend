'use client';
import { CardContent } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import { SubTitle } from '@/atoms/typographys';
import Input from '@/atoms/fields/Input';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import InputSelect from '@/atoms/fields/InputSelect';
import { gender, maritalStatus } from '@/constants/data';

export default function PersonalForm() {
  const router = useRouter();
  return (
    <form className="flex flex-col space-y-4">
      <CardContent className="flex flex-col space-y-4 rounded-2xl bg-white py-6 shadow-lg">
        <SubTitle className="!text-center" text="Personal Information" />

        <fieldset className="">
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="First Name"
              placeholder="Adeolu"
            />
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="Last Name"
              placeholder="John"
            />
          </div>
          <Input
            className="mb-1"
            type="email"
            id="emailAddress"
            label="Email Address"
            placeholder="adeolujohn@gmail.com"
          />
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="phone_number"
              label="Phone Number"
              placeholder="08123456789"
            />
            {/* <InputSelect
              className="md:w-[50%]"
              id="marital_status"
              label="Marital status"
              items={maritalStatus}
            /> */}
          </div>

          <div className="">
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              {/* <InputSelect className="md:w-[50%]" id="gender" label="Gender" items={gender} /> */}
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="dob"
                label="Date of Birth"
                placeholder="01/01/1990"
              />
            </div>

            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="weight"
                label="Weight (kg)"
                placeholder="120"
              />
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="height"
                label="Height (cm)"
                placeholder="178"
              />
            </div>
          </div>
        </fieldset>
      </CardContent>
      <Button
        type="submit"
        variant="filled"
        onClick={() => router.push(ROUTES.PATIENT_REG_CONTACT.path)}
      >
        Next
      </Button>
    </form>
  );
}
