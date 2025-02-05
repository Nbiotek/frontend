import { Text } from '@/lib/utils/Text';
import { Title } from '@/atoms/typographys';
import Cards from '@/atoms/Cards';
import Input from '@/atoms/fields/Input';

const BookAppointment = () => {
  return (
    <Cards className="bg-white p-[50px] ">
      <Title text="Book your appointment now" />
      <Text variant="body" className="mb-4">
        So our team can reach out to you on time
      </Text>
      <form action="">
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="text" label="Full Name" />
          <Input type="date" label="Married Status" />
        </div>
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
      </form>
    </Cards>
  );
};

export default BookAppointment;
