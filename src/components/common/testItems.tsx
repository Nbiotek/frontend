import { title } from 'process';
import { Checkbox } from '@/components/ui/checkbox';
import { Text } from '@/lib/utils/Text';
import DropDownAction from './dropdownActions';

interface TestItemsProps {
  title: string;
  details: string;
}

const TestItems = () => {
  return (
    <div className="relative mt-[12px] flex w-full items-center space-x-4 rounded-lg bg-white p-[12px]">
      <Checkbox />
      <div className="">
        <Text variant="body" weight="semibold">
          {title}
          <span>$1.5</span>
        </Text>
        <Text variant="body" weight="normal" className="">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio soluta cum, eaque modi
          tempora dolorum, sunt, distinctio sint ex commodi dolore nihil ab libero sapiente?
          Voluptatum rerum in voluptates aliquid!
        </Text>
      </div>
      <div className="absolute right-0 top-2">
        <DropDownAction />
      </div>
    </div>
  );
};

export default TestItems;
