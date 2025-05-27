'use client';
import { useEffect, useState } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import PatientsRegTable from '../components/PatientsRegTable';
import IconPod from '@/atoms/Icon/IconPod';
import { ArrowUpDown, User2Icon } from 'lucide-react';
import SearchFilter from '@/components/common/Filter';
import Button from '@/atoms/Buttons';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useFetchPatients } from '@/hooks/user/useFetchPatients';
import { pagination } from '@/constants/data';
import { EnumReceptionistQueryType } from '@/store/ReceptionistStore';

const PatientsView = () => {
  const [patient, setPatient] = useState<TReceptAllPatientRes>({
    patients: [],
    pagination
  });
  const {
    AppConfigStore: { toggleModals, queryLimit },
    ReceptionistStore: { queries, applyQuery, resetQuery }
  } = useStore();
  const { data, isLoading } = useFetchPatients(queries.REG_PATIENTS);

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setPatient(data);
    }
  }, [data, isLoading]);

  return (
    <div className="flex w-full flex-col space-y-4">
      <fieldset className="flex w-full flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="flex items-center justify-start space-x-2">
          <SearchFilter
            type="patient"
            query={queries.PENDING_APPOINTMENTS}
            applyQuery={(_query: Partial<TTestQuery>) =>
              applyQuery(_query, EnumReceptionistQueryType.REG_PATIENTS)
            }
            resetQuery={() => resetQuery(EnumReceptionistQueryType.REG_PATIENTS)}
          />
          <SearchInput className="!w-[calc(100%-40px)]" placeholder="Search for patients..." />
        </div>

        <Button
          className="md:!w-28"
          variant="filled"
          text="Register"
          leftIcon={<User2Icon size={18} />}
          onClick={() => toggleModals({ name: AppModals.RECPTS_PATIENT_REG, open: true })}
        />
      </fieldset>
      <PatientsRegTable {...{ isLoading, patient }} />
    </div>
  );
};

export default observer(PatientsView);
