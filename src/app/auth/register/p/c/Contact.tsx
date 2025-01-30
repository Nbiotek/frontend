'use client';
import { CardContent } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import { SubTitle } from '@/atoms/typographys';
import Input from '@/atoms/fields/Input';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';

export default function ContactForm() {
  const router = useRouter();
  return (
    <form className="flex flex-col space-y-4">
      <CardContent className="flex flex-col space-y-4 rounded-2xl bg-white py-6 shadow-lg">
        <SubTitle className="!text-center" text="Contact Information" />

        <fieldset className="">
          <Input
            type="email"
            id="emailAddress"
            label="Home address"
            placeholder="No 65 Block B1 Westros Est."
          />
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="City"
              placeholder="Akure"
            />
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="State"
              placeholder="Ondo"
            />
          </div>
          <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="fname"
              label="Landmark"
              placeholder="behind C.B.N Office"
            />
            <Input
              className="md:mb-0 md:w-[50%]"
              type="text"
              id="lname"
              label="Zip code"
              placeholder="0000"
            />
          </div>

          <label className="mb-3 font-medium">Emergency Contact</label>

          <div className="mt-3">
            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="fname"
                placeholder="First Name"
              />
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="lname"
                placeholder="Last Name"
              />
            </div>

            <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <Input className="md:mb-0 md:w-[50%]" type="text" id="fname" placeholder="Address" />
              <Input
                className="md:mb-0 md:w-[50%]"
                type="text"
                id="lname"
                placeholder="Phone Number"
              />
            </div>
          </div>
        </fieldset>
      </CardContent>
      <div className="flex items-center justify-between space-x-2">
        <Button
          type="submit"
          variant="transparent"
          text="Prev"
          onClick={() => router.push(ROUTES.PATIENT_REG_INFO.path)}
        />
        <Button
          type="submit"
          variant="filled"
          text="Next"
          onClick={() => router.push(ROUTES.PATIENT_REG_INSURANCE.path)}
        />
      </div>
    </form>
  );
}
