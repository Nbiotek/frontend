import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { UserRoundPlusIcon } from 'lucide-react';

export default function AddUser() {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button
        className="h-12 w-12 rounded-full bg-blue-400"
        onClick={() => toggleModals({ name: AppModals.ADMIN_ADD_USER, open: true })}
      >
        <UserRoundPlusIcon />
        <span className="sr-only">Add user</span>
      </Button>
    </div>
  );
}
