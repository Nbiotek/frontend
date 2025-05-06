'use client';

import { SingleTest } from '@/types/test';
import Button from '@/atoms/Buttons';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

export interface TestCardProps {
  test: SingleTest;
}

const TestCard = ({ test }: TestCardProps) => {
  const {
    CartStore: { addItem, isInCart, removeItem }
  } = useStore();

  return (
    <div className="border-gray-100 flex flex-col rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-blue-800 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium">
          {test.category}
        </span>
        <span className="rounded-lg bg-red-300 px-3 py-1 text-xs font-semibold text-white">
          ₦{test.price}
        </span>
      </div>
      <h3 className="text-gray-900 mb-2 text-lg font-medium">{test.name}</h3>
      <p className="text-gray-700 mb-4 flex-grow text-sm">{test.description}</p>
      <div className="mt-auto flex flex-col gap-2 sm:flex-row">
        {!isInCart(test.id) ? (
          <Button variant="filled" className="text-sm" onClick={() => addItem(test, 'single')}>
            Add to cart
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="border-none bg-red-400 text-sm text-white hover:bg-red-300/80"
            onClick={() => removeItem(test.id)}
          >
            Remove from cart
          </Button>
        )}

        <Button
          variant="outlined"
          className="border-none bg-green-400 text-sm text-white hover:bg-green-300/80"
        >
          View details
        </Button>
      </div>
    </div>
  );
};

export default observer(TestCard);
