interface ResultFieldProp {
  text: string;
  className?: string;
  head?: boolean;
}

const ResultFieldHeader = ({ text, className, head }: ResultFieldProp) => {
  return (
    <div
      className={`w-full rounded-lg border px-4 py-3 ${className} ${head ? 'bg-blue-400 text-white' : ''}`}
    >
      {text}
    </div>
  );
};

export default ResultFieldHeader;
