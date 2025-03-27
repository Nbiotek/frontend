import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import Button from '@/atoms/Buttons';
import { PackageTest, SingleTest } from '@/types/test';

import { CartButton, RequestTestButton } from '../cart/CartButton';
import { useRouter } from 'next/navigation';
import { cartStore } from '@/store/Cart';

interface SingleTestDialogProps {
  test: SingleTest | PackageTest | null;
  open: boolean;
  onClose: () => void;
  // onAddToCart: (test: SingleTest) => void;
}

const AllTestsDialog = ({ test, open, onClose }: SingleTestDialogProps) => {
  const router = useRouter();

  if (!test) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-blue-400">{test.name}</DialogTitle>
          <DialogDescription>{test.name} details and requirements</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            {/* <h4 className="font-semibold">Description</h4> */}
            <p className="">
              {test.description}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur magni porro iure
              nulla tenetur pariatur ratione fuga provident nesciunt possimus nostrum iste,
              laudantium, sed laborum placeat qui totam eum. Fuga!
            </p>
          </div>
          {test.requirements && (
            <div>
              <h4 className="text-xl font-semibold text-blue-400">Requirements</h4>
              <ul className="text-gray-600 list-inside list-disc">
                {test.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex w-[450px] gap-4">
            <CartButton item={test} type={'single'} />
            <RequestTestButton item={test} type={'single'} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllTestsDialog;
