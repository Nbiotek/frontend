import FieldSet from '@/atoms/fields/FieldSet';
import { Text } from '@/lib/utils/Text';
import ResultFieldHeader from '@/atoms/fields/ResultFields';

interface TestReviewDetailsResultProp {
  data: TResultRev[];
}

const TestReviewDetailsResult = ({ data }: TestReviewDetailsResultProp) => {
  return (
    <div className="rounded-lg bg-white p-[24px]">
      <Text variant="title" weight="semibold" className="mb-[24px] border-b pb-2">
        Test Result
      </Text>
      <div className="space-y-[24px]">
        <div className="flex space-x-[24px] border-b pb-4 font-medium">
          <ResultFieldHeader text="Test Parameter" head={true} />
          <ResultFieldHeader text="Result" head={true} />
          <ResultFieldHeader text="Unit" head={true} />
          <ResultFieldHeader text="Reference" head={true} />
        </div>
        {data.map((result, index) => {
          return (
            <div
              key={index}
              className="border-gray-200 flex items-start space-x-[24px] border-b-2 border-dotted pb-4"
            >
              <ResultFieldHeader text={result.parameter ? result.parameter : 'N/A'} />
              <ResultFieldHeader text={result.result ? result.result : 'N/A'} />
              <ResultFieldHeader text={result.unit ? result.unit : 'N/A'} />
              <ResultFieldHeader text={result.reference ? result.reference : 'N/A'} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestReviewDetailsResult;
