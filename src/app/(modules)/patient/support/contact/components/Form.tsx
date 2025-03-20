import Input from '@/atoms/fields/Input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Text } from '@/lib/utils/Text';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/atoms/Buttons';

const ContactForm = () => {
  return (
    <div className="flex flex-col items-center bg-white p-[24px] lg:w-[75%]">
      <div className="mb-10 text-blue-400">
        <Text variant="h3" weight="bold" className="text-center">
          Contact Us{' '}
        </Text>
        <p className="text-center text-sm">You can ask a question or give Feedback</p>
      </div>
      <Input type="text" label="Subject" placeholder="Enter Subject" />
      <Input type="text" label="Name" placeholder="Enter your full name" />
      <Input type="text" label="Phone number" placeholder="Enter your phone number" />
      <div className="w-full">
        <Label className="text-sm">Comment</Label>
        <Textarea placeholder="Write your comment" className="border-none bg-neutral-50" />
      </div>

      <Button variant="filled" type="button" className="mt-[30px]">
        Submit
      </Button>
    </div>
  );
};

export default ContactForm;
