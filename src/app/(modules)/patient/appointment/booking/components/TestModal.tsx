'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Toast } from '@/atoms/Toast';
import { observer } from 'mobx-react-lite';
import { ShoppingCart, X } from 'lucide-react';
import TestSelectionPanel from '../../../component/TestTab';

import { useStore } from '@/store';

interface TestModalDialogProps {
  open: boolean;
  onClose: () => void;
}

const TestModalDialog = observer(({ open, onClose }: TestModalDialogProps) => {
  const {
    CartStore: { items, total, itemCount, clearCart }
  } = useStore();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmSelection = () => {
    if (itemCount === 0) {
      Toast.info('Please select at least one test');
      return;
    }

    setIsConfirming(true);

    setTimeout(() => {
      Toast.success(`${itemCount} test${itemCount !== 1 ? 's' : ''} added to your appointment`);
      setIsConfirming(false);
      onClose();
    }, 800);
  };

  const handleClearSelection = () => {
    if (itemCount > 0) {
      clearCart();
      Toast.info('Selection cleared');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-[600px] max-w-3xl overflow-hidden p-0">
        <DialogHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <DialogTitle>Select Tests</DialogTitle>
          </div>
        </DialogHeader>

        <div
          className="flex-1 overflow-y-auto bg-neutral-100"
          style={{ height: 'calc(100% - 20px)' }}
        >
          <TestSelectionPanel
            onClose={handleConfirmSelection}
            confirmButtonText="Add to Appointment"
          />
        </div>

        {itemCount > 0 && (
          <DialogFooter className="flex items-center justify-between border-t bg-white p-4">
            <div className="flex items-center">
              <ShoppingCart className="text-blue-600 mr-2 h-5 w-5" />
              <div>
                <div className="text-sm font-medium">
                  {itemCount} {itemCount === 1 ? 'test' : 'tests'} selected
                </div>
                <div className="text-lg font-semibold">₦{total.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearSelection}
                disabled={isConfirming}
              >
                Clear
              </Button>
              <Button
                onClick={handleConfirmSelection}
                disabled={itemCount === 0 || isConfirming}
                className="min-w-[120px]"
              >
                {isConfirming ? 'Processing...' : 'Confirm Selection'}
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
});

export default TestModalDialog;
