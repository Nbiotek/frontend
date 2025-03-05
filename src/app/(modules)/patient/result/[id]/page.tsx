import TestResult from '../components/Results';
import TestInfoView from '../components/TestInfo';

const ResultDetailsView = () => {
  return (
    <div className="flex w-full flex-col space-y-[24px] pb-[30px]">
      <TestInfoView />
      <TestResult />
    </div>
  );
};

export default ResultDetailsView;
