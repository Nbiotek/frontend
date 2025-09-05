'use client';
import Button from '@/atoms/Buttons';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { labCoord } from '@/hooks/labCoord/FetchKeyFactory';
import { useFetchAvailableDoctors } from '@/hooks/labCoord/useFetchAvailableDoctors';
import { qualityControl } from '@/hooks/qualityControl/FetchkeyFactory';
import { postAssignDoctor, putReassignDoctor } from '@/requests/lab-coord';
import { useStore } from '@/store';
import { getInitials } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AvailableDoctors = () => {
  const { data, status } = useFetchAvailableDoctors();
  const [doctorId, setDoctorId] = useState('');
  const {
    AppConfigStore: { availableDoctors, toggleModals }
  } = useStore();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: availableDoctors.isReassign ? putReassignDoctor : postAssignDoctor,

    onError: () => {
      toast.error('Unable to assign test now.');
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: labCoord.getDashboard().keys() });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === qualityControl.getHistory({}).keys()[0]
      });
      toast.success('Test successfully assigned!');
      toggleModals({});
    },

    onSettled: () => {
      setDoctorId('');
    }
  });

  return (
    <div className="flex h-fit w-full flex-col">
      <div className="h-fit max-h-[600px] w-full overflow-y-scroll bg-white pt-2">
        {status === 'pending' && (
          <div className="flex flex-col space-y-2">
            {Array(5)
              .fill('1')
              .map((_, idx) => (
                <div
                  key={idx}
                  className="flex animate-pulse items-center justify-between space-x-2"
                >
                  <div className="flex items-center justify-start space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100"></div>

                    <div className="flex flex-col space-y-1">
                      <div className="h-2 w-36 rounded bg-neutral-100 !font-medium"></div>
                      <div className="h-2 w-24 rounded bg-neutral-100 !font-medium"></div>
                    </div>
                  </div>

                  <div className="h-2 w-10 rounded bg-neutral-100"></div>
                </div>
              ))}
          </div>
        )}
        {status === 'success' && data?.doctors && (
          <div className="flex flex-col divide-y">
            {data.doctors.map((doctor) => {
              return (
                <div key={doctor.id} className="flex items-start justify-between py-3">
                  <div className="flex items-start justify-start space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                      <SubTitle className="text-blue-400" text={getInitials(doctor.name)} />
                    </div>

                    <div className="flex flex-col space-y-0">
                      <Paragraph className="!m-0 !font-medium" text={doctor.name} />
                      <small className="text-neutral-500">{doctor.email}</small>
                    </div>
                  </div>

                  <div className="w-20">
                    <Button
                      className="!p-2"
                      variant="light"
                      onClick={() => {
                        setDoctorId(doctor.id);
                        mutate({
                          testRequestId: availableDoctors.testId,
                          doctorId: doctor.id
                        });
                      }}
                      disabled={isPending}
                      isLoading={doctorId === doctor.id && isPending}
                    >
                      Assign
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {status === 'success' && data?.total === 0 && (
          <div className="flex h-56 w-full flex-col items-center justify-center">
            <SubTitle text="No available Doctors." />
            <Paragraph text="Available Doctors will display here real time." />
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(AvailableDoctors);
