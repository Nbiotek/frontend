'use client';
import { useEffect, useState } from 'react';
import { Paragraph } from '@/atoms/typographys';
import { Button } from '@/components/ui/button';
import { EnumRole } from '@/constants/mangle';
import ROUTES from '@/constants/routes';
import { useStore } from '@/store';
import { ShieldAlert } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

function DeniedView() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(30);
  const {
    AuthStore: { user }
  } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.replace(ROUTES.getRedirectPathByRole(user?.role as EnumRole));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, user?.role]);

  const handleGoBack = () => {
    router.replace(ROUTES.getRedirectPathByRole(user?.role as EnumRole));
  };

  return (
    <Dialog modal={true} open={true}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} className="w-full max-w-full">
        <DialogHeader className="mx-auto flex h-screen w-full max-w-full flex-col items-center justify-center space-y-3 text-center">
          <ShieldAlert size={80} className="text-error-400" />
          <div className="text-center">
            <DialogTitle>Access Denied</DialogTitle>
            <DialogDescription>You do not have permission to access this page.</DialogDescription>
          </div>

          <div className="space-y-2">
            <Paragraph
              text={`Redirecting in ${countdown} seconds...`}
              className="text-gray-500 text-sm"
            />
            {countdown === 0 && (
              <Button onClick={handleGoBack} variant="secondary" size="lg">
                Go back now
              </Button>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default observer(DeniedView);
