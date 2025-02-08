import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import Button from '@/atoms/Buttons';
import { SingleTest } from '@/types/test';

interface SingleTestDialogProps {
  test: SingleTest | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (test: SingleTest) => void;
}

const SingleTestDialog = ({ test, open, onClose, onAddToCart }: SingleTestDialogProps) => {
  if (!test) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-blue-400">{test.name}</DialogTitle>
          {/* <DialogDescription>
              Complete test details and requirements
            </DialogDescription> */}
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
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Price</h4>
              <p className="font-bold text-primary">₦{test.price}</p>
            </div>
            <div>
              <h4 className="font-semibold">Duration</h4>
              {/* <p>{test.duration}</p> */}
            </div>
          </div>
          <Button
            className=""
            onClick={() => onAddToCart(test)}
            variant="filled"
            text="Add to cart"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SingleTestDialog;
