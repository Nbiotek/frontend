import ResultField from '@/app/(modules)/patient/result/components/ResultField';
interface LoggedRowDataProps {
  logSample: testSamples[];
}

const LoggedRowData = ({ logSample }: LoggedRowDataProps) => {
  return (
    <>
      {logSample.map((sample, index) => (
        <div key={index} className="grid grid-cols-4 gap-3 pb-4">
          <ResultField text={sample.testName} className="w-1/4" />
          <ResultField text={sample.sampleType} className="w-1/5" />
          <ResultField text={sample.requiredAmount} className="w-1/5" />
          <ResultField
            text={sample.collectionStatus ? 'Collected' : 'Not Collected'}
            className="w-1/3"
          />
        </div>
      ))}
    </>
  );
};

export default LoggedRowData;
