// PatientInfoSection.tsx
import FieldSet from '@/atoms/fields/FieldSet';
import { Text } from '@/lib/utils/Text';
import { dateTimeUTC } from '@/utils/date';

interface PatientInfoProps {
  fieldVisitData: FieldTaskData | undefined;
}

const PatientInfoSection = ({ fieldVisitData }: PatientInfoProps) => {
  return (
    <div className="bg-white p-6">
      <Text variant="title" weight="semibold" className="mb-6 border-b pb-2">
        Patient Information
      </Text>
      <div className="grid grid-cols-3 gap-4 lg:grid-cols-3">
        <FieldSet legend="Patient Name" text={fieldVisitData?.patient.name} />
        <FieldSet legend="Test Ordered" text={fieldVisitData?.test.name} />
        <FieldSet legend="Test Description" text={fieldVisitData?.test?.description} />
        <FieldSet
          legend="Collection Date"
          text={dateTimeUTC(fieldVisitData?.collectionDate || '')}
        />
      </div>
    </div>
  );
};

export default PatientInfoSection;
