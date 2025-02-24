import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog';

import AvailableTestView from '../../../test/available/AvailableTestView';
import TestTabs from '../../../component/TestTab';
import { individualTests } from '@/api/data/test';

interface DialogProp {
  open: boolean;
  onClose: () => void;
}

const TestModalDialog = ({ open, onClose }: DialogProp) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-[600px] overflow-y-auto bg-neutral-100">
        <div className="pt-4">
          <TestTabs />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestModalDialog;
