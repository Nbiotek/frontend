import FieldSet from '@/atoms/fields/FieldSet';
import { Text } from '@/lib/utils/Text';
import ResultField from './ResultField';

const TestResult = () => {
  return (
    <div className="rounded-lg bg-white p-[24px]">
      <Text variant="title" weight="semibold" className="mb-[24px] border-b pb-2">
        Test Result
      </Text>
      <div className="space-y-[24px]">
        <div className="flex space-x-[24px] border-b pb-4">
          <ResultField text="Text Name" head={true} />
          <ResultField text="Text Data" head={true} />
          <ResultField text="Unit" head={true} />
          <ResultField text="References" head={true} />
        </div>
        <div className="flex items-start space-x-[24px] border-b-2 border-dotted border-black pb-4">
          <ResultField text="Glucose" />
          <ResultField text="Negative" />
          <ResultField text="m/mol" />
          <ResultField text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus provident laboriosam itaque at maxime reiciendis. Earum quo corrupti eaque est perspiciatis molestiae similique beatae hic, nisi harum ipsam alias culpa!" />
        </div>
        <div className="flex items-start space-x-[24px] border-b-2 border-dotted border-black pb-4">
          <ResultField text="Glucose" />
          <ResultField text="Negative" />
          <ResultField text="m/mol" />
          <ResultField text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus provident laboriosam itaque at maxime reiciendis. Earum quo corrupti eaque est perspiciatis molestiae similique beatae hic, nisi harum ipsam alias culpa!" />
        </div>
      </div>
    </div>
  );
};

export default TestResult;
