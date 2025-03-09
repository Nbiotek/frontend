import React from 'react';
import TestDetailView from './TestDetailView';

const TestsPage = async ({ params }: INextPage<{ id: string }>) => {
  const { id } = await params;
  return <TestDetailView {...{ id }} />;
};

export default TestsPage;
