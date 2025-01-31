'use client';
import { CardContent } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import { SubTitle } from '@/atoms/typographys';
import Input from '@/atoms/fields/Input';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';

export default function InsuranceForm() {
  const router = useRouter();
  return (
    <form className="flex flex-col space-y-4">
      <CardContent className="flex flex-col space-y-4 rounded-2xl bg-white py-6 shadow-lg">
        <SubTitle className="!text-center" text="Insurance Information" />

        <fieldset className="">
          <Input
            type="email"
            id="emailAddress"
            label="Primary insurance provider"
            placeholder="United Health"
          />

          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="Insurance plan"
              placeholder="Health"
            />
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="Insurance Phone number"
              placeholder="08123456789"
            />
          </div>
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="Policy No"
              placeholder="0054689"
            />
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="Group No"
              placeholder="97657"
            />
          </div>
          <label className="mb-3 font-medium">Policy Holder</label>

          <div className="mt-3">
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="fname"
                placeholder="First name"
              />
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="lname"
                placeholder="Last Name"
              />
            </div>
            <Input type="text" placeholder="Phone number" />
          </div>
        </fieldset>
      </CardContent>

      <div className="flex items-center justify-between space-x-2">
        <Button
          type="submit"
          variant="transparent"
          text="Prev"
          onClick={() => router.push(ROUTES.PATIENT_REG_CONTACT.path)}
        />
        <Button type="submit" variant="filled" text="Submit" />
      </div>
    </form>
  );
}
