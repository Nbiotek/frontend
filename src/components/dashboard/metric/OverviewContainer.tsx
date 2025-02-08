import React from 'react';

const OverviewContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid w-full grid-cols-response gap-2">{children}</div>;
};

export default OverviewContainer;
