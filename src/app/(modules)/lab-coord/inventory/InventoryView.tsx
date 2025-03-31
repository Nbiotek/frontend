'use client';
import { observer } from 'mobx-react-lite';
import InventoryTable from './components/InventoryTable';
import Button from '@/atoms/Buttons';
import { ListFilter, Plus } from 'lucide-react';
import SearchInput from '@/atoms/fields/SearchInput';
import IconPod from '@/atoms/Icon/IconPod';
import { useFetchInventory } from '@/hooks/labCoord/useFetchInventory';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';

const InventoryView = () => {
  const { data, isLoading } = useFetchInventory({});
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center justify-start space-x-2">
          <IconPod Icon={ListFilter} />
          <SearchInput placeholder="Search items..." />
        </div>

        <button onClick={() => toggleModals({ open: true, name: AppModals.ADD_INVENTORY })}>
          <IconPod className="md:hidden" Icon={Plus} text="Add" />
          <div className="hidden md:block md:w-[150px]">
            <Button variant="filled" leftIcon={<Plus />} text="Add Inventory" />
          </div>
        </button>
      </div>
      <InventoryTable isLoading={isLoading} inventory={data} />
    </div>
  );
};

export default observer(InventoryView);
