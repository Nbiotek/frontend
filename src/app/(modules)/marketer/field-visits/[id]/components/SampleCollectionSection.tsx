import { Text } from '@/lib/utils/Text';
import ResultFieldHeader from '@/atoms/fields/ResultFields';
import SampleRow from './SampleRow';
import LoggedRowData from './loggedData/LoggedRowData';

interface Sample {
  id: string;
  testName: string;
  sampleType: string;
  requiredAmount: string;
  collectionStatus: boolean;
}

interface SampleCollectionProps {
  samples: Sample[];
  fieldVisitData: FieldTaskData | undefined;
  onAddSample: () => void;
  onRemoveSample: (id: string) => void;
  onTestNameChange: (id: string, value: string) => void;
  onSampleTypeChange: (id: string, value: string) => void;
  onRequiredAmountChange: (id: string, value: string) => void;
  onCollectionStatusChange: (id: string, isCollected: boolean) => void;
}

const SampleCollectionSection = ({
  samples,
  fieldVisitData,
  onAddSample,
  onRemoveSample,
  onTestNameChange,
  onSampleTypeChange,
  onRequiredAmountChange,
  onCollectionStatusChange
}: SampleCollectionProps) => {
  console.log(samples);
  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-3 pb-4 font-medium">
        <ResultFieldHeader text="Test Name" head={true} className="w-1/4" />
        <ResultFieldHeader text="Sample Type" head={true} className="w-1/5" />
        <ResultFieldHeader text="Required Amount" head={true} className="w-1/5" />
        <ResultFieldHeader text="Collection Status" head={true} className="w-1/3" />
      </div>

      {fieldVisitData?.logSamples.length === 0 ? (
        <>
          {/* Sample Rows */}
          <div className="space-y-3">
            {samples.map((sample, index) => (
              <SampleRow
                key={sample.id}
                sample={sample}
                index={index}
                onRemove={onRemoveSample}
                onTestNameChange={onTestNameChange}
                onSampleTypeChange={onSampleTypeChange}
                onRequiredAmountChange={onRequiredAmountChange}
                onCollectionStatusChange={onCollectionStatusChange}
              />
            ))}
          </div>

          {/* Add Sample Button */}
          <div className="mt-3">
            <button
              type="button"
              onClick={onAddSample}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Another Sample
            </button>
          </div>
        </>
      ) : (
        <LoggedRowData logSample={fieldVisitData?.logSamples || []} />
      )}
    </div>
  );
};

export default SampleCollectionSection;
