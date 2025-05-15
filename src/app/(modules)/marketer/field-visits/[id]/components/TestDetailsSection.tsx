import FieldSet from '@/atoms/fields/FieldSet';
import { Text } from '@/lib/utils/Text';
import { dateTimeUTC } from '@/utils/date';

interface TestDetailsProps {
  fieldVisitData: FieldTaskData | undefined;
}

const TestDetailsSection = ({ fieldVisitData }: TestDetailsProps) => {
  return (
    <div className="bg-white p-6">
      <Text variant="title" weight="semibold" className="mb-6 border-b pb-2">
        Test Details
      </Text>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <FieldSet legend="CBC" text={fieldVisitData?.test.name} />
        <FieldSet legend="Technician" text={fieldVisitData?.technician.name} />
        <FieldSet
          legend="Request Date"
          text={fieldVisitData?.createdAt ? dateTimeUTC(fieldVisitData?.createdAt, false) : 'Nill'}
        />
        <FieldSet
          legend="Due Date"
          text={fieldVisitData?.dateDue ? dateTimeUTC(fieldVisitData?.dateDue, false) : 'Nill'}
        />
      </div>
    </div>
  );
};

export default TestDetailsSection;
