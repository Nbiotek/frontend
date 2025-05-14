interface Sample {
  id: string;
  testName: string;
  sampleType: string;
  requiredAmount: string;
  collectionStatus: boolean;
}

interface SampleRowProps {
  sample: Sample;
  index: number;
  onRemove: (id: string) => void;
  onTestNameChange: (id: string, value: string) => void;
  onSampleTypeChange: (id: string, value: string) => void;
  onRequiredAmountChange: (id: string, value: string) => void;
  onCollectionStatusChange: (id: string, isCollected: boolean) => void;
}

const SampleRow = ({
  sample,
  index,
  onRemove,
  onTestNameChange,
  onSampleTypeChange,
  onRequiredAmountChange,
  onCollectionStatusChange
}: SampleRowProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 border-b pb-2">
      <div className="">
        {index === 0 ? (
          <div className="text-gray-700 rounded border p-2 font-medium">{sample.testName}</div>
        ) : (
          <input
            type="text"
            className="border-gray-300 w-full rounded border p-2"
            value={sample.testName}
            onChange={(e) => onTestNameChange(sample.id, e.target.value)}
            placeholder="Enter test name"
          />
        )}
      </div>

      <div className="">
        <select
          className="border-gray-300 w-full rounded border p-2"
          value={sample.sampleType}
          onChange={(e) => onSampleTypeChange(sample.id, e.target.value)}
        >
          <option value="blood">Blood</option>
          <option value="urine">Urine</option>
          <option value="stool">Stool</option>
          <option value="saliva">Saliva</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="">
        <select
          className="border-gray-300 w-full rounded border p-2"
          value={sample.requiredAmount}
          onChange={(e) => onRequiredAmountChange(sample.id, e.target.value)}
        >
          <option value="3ml">3ml</option>
          <option value="4ml">4ml</option>
          <option value="not-required">Not Required</option>
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={sample.collectionStatus}
            onChange={(e) => onCollectionStatusChange(sample.id, e.target.checked)}
            id={`sample-collected-${sample.id}`}
          />
          <label htmlFor={`sample-collected-${sample.id}`} className="ml-2">
            Sample Collected
          </label>
        </div>

        {index > 0 && (
          <button
            type="button"
            onClick={() => onRemove(sample.id)}
            className="hover:text-red-700 text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SampleRow;
