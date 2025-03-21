interface IQCProps {
  pendingQualityControl?: Array<TPendingQualityControl>;
}

const Qc = ({ pendingQualityControl }: IQCProps) => {
  return <div className="w-full rounded-xl bg-white p-4">Qc</div>;
};

export default Qc;
