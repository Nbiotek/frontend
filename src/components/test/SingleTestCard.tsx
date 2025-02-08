import { title } from 'process';
import { Checkbox } from '@/components/ui/checkbox';
import { Text } from '@/lib/utils/Text';
import DropDownAction from '../common/dropdownActions';
import type { SingleTest } from '@/types/test';
import Button from '@/atoms/Buttons';

interface TestCardProps {
  test: SingleTest;
  onViewDetails: (test: SingleTest) => void;
  onAddToCart: (test: SingleTest) => void;
}

const SingleTestCard = ({ test, onViewDetails, onAddToCart }: TestCardProps) => {
  return (
    <div className="relative mt-[12px] flex w-full items-center space-x-4 rounded-lg bg-white p-[12px]">
      <Checkbox />
      <div className="">
        <Text variant="body" weight="semibold">
          {test.name}
        </Text>
        <Text variant="body" weight="normal" className="">
          {test.description}
        </Text>
        {/* <Button variant='outlined' text='add to cart' onClick={() => onAddToCart(test)} />  */}
        <Button variant="outlined" text="View details" onClick={() => onViewDetails(test)} />
      </div>
      <div className="absolute right-0 top-2">
        <DropDownAction />
      </div>
    </div>
  );
};

export default SingleTestCard;
