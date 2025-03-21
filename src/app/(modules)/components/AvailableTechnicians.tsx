'use client';
import { Paragraph, SubTitle, Title } from '@/atoms/typographys';
import { useFetchAvailableLabTechs } from '@/hooks/labCoord/useFetchAvailableLabTech';

const AvailableTechnicians = () => {
  const { data, status } = useFetchAvailableLabTechs();
  return (
    <div className="h-fit w-full">
      <div className="w-full bg-blue-400 p-3">
        <SubTitle className="!text-white" text="Available Technicians" />
      </div>

      <div className="h-fit max-h-[600px] w-full bg-white">
        {status === 'pending' && <div>loading...</div>}
        {status === 'success' &&
          data?.technicians &&
          data.technicians.map((technician) => {
            return (
              <div key={technician.id}>
                <Paragraph text={technician.name} />
              </div>
            );
          })}

        {status === 'success' && data?.total === 0 && (
          <div className="flex h-56 w-full flex-col items-center justify-center">
            <SubTitle text="No available technicians." />
            <Paragraph text="Available technicians will display here real time." />
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableTechnicians;
