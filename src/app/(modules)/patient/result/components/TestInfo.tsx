import FieldSet from '@/atoms/fields/FieldSet';
import { Text } from '@/lib/utils/Text';

const TestInfoView = () => {
  return (
    <div className="rounded-lg bg-white p-[24px]">
      <Text variant="title" weight="semibold" className="mb-[24px] border-b pb-2">
        Personal Information
      </Text>
      <div className="flex flex-col space-y-[24px] ">
        <div className="flex gap-[24px]">
          <FieldSet legend=" Name" text="Oladayo Emmanuel Abiodun" />
          <FieldSet legend="Test Ordered" text="CBC" />
          <FieldSet legend="Test Date" text="24 Sept 2024" />
        </div>
        <FieldSet legend="Technician Name" text="Oladayo Emmanuel Abiodun" />
      </div>
    </div>
  );
};

export default TestInfoView;
