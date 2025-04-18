'use client';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ModalsMap = {
  [AppModals.RESULT_UPLOAD_MODAL]: dynamic(
    () => import('@/app/(modules)/lab-tech/tests/components/ResultUploadModal')
  ),
  [AppModals.LOG_OUT_MODAL]: dynamic(() => import('@/components/dashboard/Sidebar/LogoutModal')),
  [AppModals.AVAILABLE_TECHNICIANS]: dynamic(
    () => import('@/app/(modules)/lab-coord/components/modals/LabTechModal')
  ),
  [AppModals.ADD_INVENTORY]: dynamic(
    () => import('@/app/(modules)/lab-coord/inventory/components/AddInventoryModal')
  ),
  [AppModals.QC_STATUS_UPDATE]: dynamic(
    () => import('@/app/(modules)/lab-coord/components/modals/QCStatusModal')
  )
};

const ModalsBank = () => {
  const {
    AppConfigStore: { isOpen, nonce }
  } = useStore();

  const OpenedModalsComponent = useMemo(() => {
    return Object.entries(ModalsMap).reduce(
      (acc: { Render: React.ReactNode; name: string }[], [keyName, Component]) => {
        if (isOpen[keyName as keyof typeof AppModals]) {
          acc.push({ Render: <Component key={keyName} />, name: keyName });
        }
        return acc;
      },
      []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, nonce]);

  return <>{OpenedModalsComponent.map((Modal) => Modal.Render)}</>;
};

export default observer(ModalsBank);
