import { title } from 'process';
import { Checkbox } from '@/components/ui/checkbox';
import { Text } from '@/lib/utils/Text';
import DropDownAction from '../common/dropdownActions';
import type { PackageTest, SingleTest } from '@/types/test';
import Button from '@/atoms/Buttons';
import { Item } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

interface TestCardProps {
  test: PackageTest;
  onViewDetails?: (test: PackageTest) => void;
}

const PackageTestCard = observer(({ test, onViewDetails }: TestCardProps) => {
  const {
    CartStore: { isInCart, addItem, removeItem }
  } = useStore();

  const handleCheckboxChange = (checked: boolean) => {
    console.log(checked);
    if (checked) {
      addItem(test, 'package');
    } else {
      removeItem(test.id);
    }
  };
  return (
    <div className="relative mt-[12px] flex w-full items-center space-x-4 rounded-lg bg-white p-[16px]">
      <Checkbox
        checked={isInCart(test.id)}
        onCheckedChange={handleCheckboxChange}
        id={`test-${test.id}`}
      />
      <div className="">
        <p
          className="cursor-pointer text-lg font-semibold hover:text-blue-400"
          onClick={onViewDetails ? () => onViewDetails(test) : undefined}
        >
          {test.name}{' '}
          <span className="ml-5 text-sm text-red-500">₦{test.price.toLocaleString()}</span>
        </p>
        <Text variant="body" weight="normal" className="">
          {test.description}
        </Text>
      </div>
      <div className="absolute right-0 top-2">
        <DropDownAction />
      </div>
    </div>
  );
});

export default PackageTestCard;
