import React from 'react';
import TestDetailView from './TestDetailView';

export default async function TestsPage({ params }: INextPage<{ id: string }>) {
  const { id } = await params;
  return <TestDetailView {...{ id }} />;
}
