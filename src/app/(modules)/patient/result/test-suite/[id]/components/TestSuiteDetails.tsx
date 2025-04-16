// TestResult.tsx
import FieldSet from '@/atoms/fields/FieldSet';
import { Text } from '@/lib/utils/Text';
import ResultField from '../../../components/ResultField';

interface TestSuiteProp {
  tests: TestSuiteSingle[];
}

const TestSuiteDetails = ({ tests }: TestSuiteProp) => {
  return (
    <div className="bg-white">
      {tests.map((test) => (
        <div className="p-[24px]" key={test.id}>
          <Text variant="title" weight="semibold" className="mb-[24px] border-b pb-2">
            {test.name}
          </Text>
          <div className="space-y-[24px]">
            <div className="flex space-x-[24px] border-b pb-4 font-medium">
              <ResultField text="Test Parameter" head={true} />
              <ResultField text="Result" head={true} />
              <ResultField text="Unit" head={true} />
              <ResultField text="Reference" head={true} />
            </div>
            {test.results.map((result, index) => {
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
      ))}
    </div>
  );
};

export default TestSuiteDetails;
