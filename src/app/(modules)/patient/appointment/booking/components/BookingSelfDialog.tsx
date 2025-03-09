// components/booking/BookingForSelfModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import Button from '@/atoms/Buttons';

interface BookingForSelfModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectOption: (isForSelf: boolean) => void;
}

const BookingForSelfModal = ({ open, onOpenChange, onSelectOption }: BookingForSelfModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Who is this appointment for?</DialogTitle>
          <DialogDescription>
            Please let us know if you're booking this test for yourself or for someone else.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button variant="filled" className="flex-1" onClick={() => onSelectOption(true)}>
            For Myself
          </Button>
          <Button variant="outlined" className="flex-1" onClick={() => onSelectOption(false)}>
            For Someone Else
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForSelfModal;
