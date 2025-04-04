'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWriteRecommendation } from '@/hooks/doctor/useTestReview';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Toast } from '@/atoms/Toast';

interface RecommendationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  patientName?: string;
  testType?: string;
}

const RecommendationDialog = ({
  isOpen,
  onClose,
  id,
  patientName = 'Patient',
  testType = 'test'
}: RecommendationDialogProps) => {
  const { mutate: writeRecommendation, isPending, isSuccess } = useWriteRecommendation();
  const [notes, setNotes] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const maxChars = 2000; // Set maximum characters

  const handleRecommendationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value);
    setCharCount(value.length);
  };

  const handleRecommendationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!notes.trim()) {
      Toast.info('Please enter your notes before submitting');
      return;
    }

    writeRecommendation(
      { id, notes },
      {
        onSuccess: () => {
          Toast.success('Your recommendation has been saved successfully');
          setTimeout(() => {
            setNotes('');
            onClose();
          }, 1500);
        },
        onError: () => {
          Toast.error('There was an error saving your recommendation. Please try again');
        }
      }
    );
  };

  const getCharCountColor = () => {
    if (charCount > maxChars * 0.9) return 'text-red-500';
    if (charCount > maxChars * 0.7) return 'text-amber-500';
    return 'text-gray-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isPending && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleRecommendationSubmit}>
          <DialogHeader>
            <DialogTitle>Medical Recommendation</DialogTitle>
            <DialogDescription>
              Write your professional recommendation based on {patientName}'s {testType} results.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recommendation" className="font-medium">
                Clinical Recommendation
              </Label>
              <Textarea
                placeholder="Enter your detailed recommendation here..."
                value={notes}
                id="notes"
                name="notes"
                onChange={handleRecommendationChange}
                className="min-h-[150px] resize-y"
                disabled={isPending || isSuccess}
              />
              <div className="flex justify-end">
                <span className={`text-xs ${getCharCountColor()}`}>
                  {charCount}/{maxChars} characters
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending || isSuccess}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || isSuccess || charCount > maxChars || charCount === 0}
              className="min-w-[90px]"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Saved
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationDialog;
