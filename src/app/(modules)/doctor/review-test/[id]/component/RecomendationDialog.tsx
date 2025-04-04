import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface RecomendationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
const RecommendationDialog = ({ isOpen, onClose }: RecomendationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Wrire Recommendation base on this test results</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label>Write Recommendation</Label>
          <Textarea placeholder="Enter Text" />
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationDialog;
