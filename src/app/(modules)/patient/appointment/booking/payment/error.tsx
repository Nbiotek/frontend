'use client';

// components/status/SuccessPage.tsx
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import Button from '@/atoms/Buttons';
import { useRouter } from 'next/navigation';

interface SuccessPageProps {
  title?: string;
  message?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonAction?: () => void;
  showImage?: boolean;
}

const SuccessPage = ({
  title = 'Operation Successful!',
  message = 'Your request has been processed successfully.',
  primaryButtonText = 'Go to Dashboard',
  secondaryButtonText = 'View Details',
  primaryButtonAction,
  secondaryButtonAction,
  showImage = true
}: SuccessPageProps) => {
  const router = useRouter();

  const handlePrimaryAction = () => {
    if (primaryButtonAction) {
      primaryButtonAction();
    } else {
      router.push('/patient/dashboard');
    }
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6">
      {showImage ? (
        <div className="mb-8">
          <Image src="/success.jpg" width={200} height={200} alt="Success" />
        </div>
      ) : (
        <CheckCircle className="mb-8 h-24 w-24 text-green-500" />
      )}

      <h1 className="mb-4 text-center text-3xl font-bold">{title}</h1>
      <p className="text-gray-600 mb-8 max-w-md text-center">{message}</p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button variant="filled" onClick={handlePrimaryAction}>
          {primaryButtonText}
        </Button>

        {secondaryButtonText && (
          <Button variant="outlined" onClick={secondaryButtonAction}>
            {secondaryButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
