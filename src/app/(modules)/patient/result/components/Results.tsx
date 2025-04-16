// TestResult.tsx
import FieldSet from '@/atoms/fields/FieldSet';
import { Text } from '@/lib/utils/Text';
import ResultField from './ResultField';

interface TestResultProp {
  data: TestResult[];
}

const TestResult = ({ data }: TestResultProp) => {
  return (
    <div className="rounded-lg bg-white p-[24px]">
      <Text variant="title" weight="semibold" className="mb-[24px] border-b pb-2">
        Test Result
      </Text>
      <div className="space-y-[24px]">
        <div className="flex space-x-[24px] border-b pb-4 font-medium">
          <ResultField text="Test Parameter" head={true} />
          <ResultField text="Result" head={true} />
          <ResultField text="Unit" head={true} />
          <ResultField text="Reference" head={true} />
        </div>
        {data.map((result, index) => {
          return (
            <div
              key={index}
              className="border-gray-200 flex items-start space-x-[24px] border-b-2 border-dotted pb-4"
            >
              <ResultField text={result.parameter ? result.parameter : 'N/A'} />
              <ResultField text={result.result ? result.result : 'N/A'} />
              <ResultField text={result.unit ? result.unit : 'N/A'} />
              <ResultField text={result.reference ? result.reference : 'N/A'} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestResult;
