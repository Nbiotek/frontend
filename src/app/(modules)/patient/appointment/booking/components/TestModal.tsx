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
import { cartStore } from '@/store/CartStore';
import { Toast } from '@/atoms/Toast';
import { observer } from 'mobx-react-lite';
import { ShoppingCart, X } from 'lucide-react';
import TestSelectionPanel from '../../../component/TestTab';

interface TestModalDialogProps {
  open: boolean;
  onClose: () => void;
}

const TestModalDialog = observer(({ open, onClose }: TestModalDialogProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const itemCount = cartStore.itemCount;
  const totalPrice = cartStore.total;

  const handleConfirmSelection = () => {
    if (itemCount === 0) {
      Toast.info('Please select at least one test');
      return;
    }

    setIsConfirming(true);

    // Simulate API call or processing
    setTimeout(() => {
      Toast.success(`${itemCount} test${itemCount !== 1 ? 's' : ''} added to your appointment`);
      setIsConfirming(false);
      onClose();
    }, 800);
  };

  const handleClearSelection = () => {
    if (itemCount > 0) {
      cartStore.clearCart();
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
                <div className="text-lg font-semibold">₦{totalPrice.toLocaleString()}</div>
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
