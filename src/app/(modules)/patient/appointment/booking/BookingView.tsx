'use client';
import { Text } from '@/lib/utils/Text';
import { Title } from '@/atoms/typographys';
import Cards from '@/atoms/Cards';
import Input from '@/atoms/fields/Input';
import { DatePickerDemo } from '@/components/ui/date-picker';
import Button from '@/atoms/Buttons';
import { CircleX } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';

import TestModalDialog from './components/TestModal';

const BookAppointmentView = () => {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const handleTestModal = () => {
    setIsTestModalOpen(true);
  };

  return (
    <>
      <Cards className="p-[5px] sm:bg-white sm:p-[10px] md:p-[45px] ">
        <Title text="Book your appointment now" />
        <Text variant="body" className="mb-4">
          So our team can reach out to you on time
        </Text>
        <form action="">
          <div className="flex flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" label="Full Name" />
            <div className="w-[100%]">
              <Label className="pb-10 font-normal">Available Date</Label>
              <DatePickerDemo />
            </div>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" label="Email" />
            <Input type="text" label="Phone Number" />
          </div>
          <div className="flex flex-col gap-1 sm:flex-row md:gap-4">
            <div className="flex w-full flex-col ">
              <Label className="mb-2">Available Test</Label>
              <Button
                variant="secondary"
                type="button"
                className="bg-blue-50/50"
                onClick={handleTestModal}
              >
                Select Test
              </Button>

              <div className="over-flow-y-scroll mt-3 flex h-[200px] flex-col border-2">
                <div className="flexBetween items-center p-3">
                  <p>
                    Complete Blood Count (CBC) <span className="ml-5 text-red-200"> ₦2000</span>
                  </p>
                  <Button variant="secondary" className="bg h-6 w-6 rounded-full p-0">
                    {' '}
                    <CircleX color="#ff6f61" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col">
              <Label className="mb-3">Location</Label>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Lab</Label>
                  <div className="rounded-md bg-neutral-300/30 p-3">
                    Medicare Hospital, 18 Iwaya Rd, Lagos
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Custom</Label>
                  <div className="rounded-md bg-neutral-300/30 p-3">Select location</div>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="mt-5">
            <Button variant="filled" text="Confirm" />
          </div>
        </form>
      </Cards>
      <TestModalDialog open={isTestModalOpen} onClose={() => setIsTestModalOpen(false)} />
    </>
  );
};

export default BookAppointmentView;
