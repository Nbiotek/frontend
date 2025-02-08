import { Text } from '@/lib/utils/Text';
import { Title } from '@/atoms/typographys';
import Cards from '@/atoms/Cards';
import Input from '@/atoms/fields/Input';
import { DatePickerDemo } from '@/components/ui/date-picker';
import Button from '@/atoms/Buttons';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const BookAppointment = () => {
  return (
    <Cards className="p-[5px] sm:bg-white sm:p-[10px] md:p-[45px] ">
      <Title text="Book your appointment now" />
      <Text variant="body" className="mb-4">
        So our team can reach out to you on time
      </Text>
      <form action="">
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="text" label="Full Name" />
          <Input type="text" label="Email" />
        </div>
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="text" label="Phone Number" />
        </div>
        <div className="flex flex-col">
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
        <div className="mt-5">
          <Button variant="filled" text="Confirm" />
        </div>
      </form>
    </Cards>
  );
};

export default BookAppointment;
