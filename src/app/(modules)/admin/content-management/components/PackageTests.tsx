'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchPackageTest } from '@/hooks/admin/useFetchPackageTest';
import TestCard from './TestCard';
import EmptyState from '@/components/EmptyState';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { PlusIcon } from 'lucide-react';

const PackageTests = () => {
  const { data, status } = useFetchPackageTest();
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  return (
    <div className="flex h-[80vh] w-full flex-col space-y-4 overflow-y-scroll">
      <div className="flex justify-end">
        <Button
          className="w-fit bg-blue-400"
          onClick={() =>
            toggleModals({ name: AppModals.ADMIN_PACKAGE_TEST, open: true, testId: '' })
          }
        >
          <PlusIcon /> package
        </Button>
      </div>

      {status === 'pending' &&
        Array(10)
          .fill(1)
          .map((_, id) => <Skeleton key={id} className="h-40 w-full" />)}
      {status === 'success' &&
        data &&
        data.map((datum) => <TestCard key={datum.id} {...{ datum }} />)}

      {status === 'success' && data && data.length == 0 && (
        <div className="h-3/4 w-full rounded-lg bg-white">
          <EmptyState title="No Package Tests." />
        </div>
      )}
    </div>
  );
};

export default PackageTests;
