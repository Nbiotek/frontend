import React from 'react';

interface IOverviewContainerProps {
  children: React.ReactNode;
  className?: string;
}

const OverviewContainer = ({ children, className }: IOverviewContainerProps) => {
  return <div className={`grid w-full grid-cols-response gap-2 ${className}`}>{children}</div>;
};

export default OverviewContainer;
