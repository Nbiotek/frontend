'use client';
import { useOptimistic, useState, startTransition } from 'react';
import { Paragraph } from '@/atoms/typographys';
import { Switch } from '../ui/switch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEY } from '@/constants/data';
import { putUpdateVisibility } from '@/requests/file-manager';
import { EnumMediaVisibilityStatus } from '@/constants/mangle';

interface IToggleMediaVisibilityProps {
  uuid: string;
  visibilityStatus: EnumMediaVisibilityStatus;
}

const ToggleMediaVisibility = ({ uuid, visibilityStatus }: IToggleMediaVisibilityProps) => {
  const [status, setStatus] = useState(visibilityStatus);
  const [optimisticCheck, addOptimisticCheck] = useOptimistic(
    status === EnumMediaVisibilityStatus.PUBLIC ? 'checked' : 'unchecked',
    (_, action: { type: 'start' | 'complete'; status?: string }) => {
      if (action.type === 'start') {
        return 'checking';
      }
      return action.status === EnumMediaVisibilityStatus.PUBLIC ? 'checked' : 'unchecked';
    }
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: putUpdateVisibility,
    onError: (error) => {
      toast.error(error.message);
      startTransition(() => {
        addOptimisticCheck({ type: 'complete', status });
      });
    },
    onSuccess: (data) => {
      const newVisibiltyStatus = data.data.data.visibiltyStatus as EnumMediaVisibilityStatus;
      startTransition(() => {
        setStatus(newVisibiltyStatus);
        addOptimisticCheck({ type: 'complete', status: newVisibiltyStatus });
      });
      toast.success(data.data.message);
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === QUERY_KEY.LAB_DASHBOARD
      });
    }
  });

  const handleToggle = () => {
    startTransition(() => {
      addOptimisticCheck({ type: 'start' });
      mutate(uuid);
    });
  };

  return (
    <div className="flex items-center justify-start space-x-1">
      <Switch
        data-state={optimisticCheck}
        checked={optimisticCheck === 'checked'}
        disabled={isPending}
        onClick={handleToggle}
      />
      <Paragraph className="!font-medium !text-white" text="Visible" />
    </div>
  );
};

export default ToggleMediaVisibility;
