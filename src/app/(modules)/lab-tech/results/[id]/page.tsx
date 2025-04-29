import React from 'react';
import ResultView from '../../qc/[id]/ResultView';

export default async function ResultIDPage({ params }: INextPage<{ id: string }>) {
  const { id } = await params;
  return <ResultView {...{ id }} />;
}
