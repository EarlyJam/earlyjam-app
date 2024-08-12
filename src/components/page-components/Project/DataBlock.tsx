import { ReactNode } from "react";

type DataBlockProps = {
  title: string;
  value: ReactNode;
};

function DataBlock(props: DataBlockProps) {
  const { title, value } = props;

  return (
    <div className="space-y-1">
      <p className="text-sm font-semibold text-blue-secondary-dark">{title}</p>
      <p className="text-sm font-normal text-gray-700">{value}</p>
    </div>
  );
}

export default DataBlock;
