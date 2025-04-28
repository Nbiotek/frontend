import React from 'react';
import ResultView from './ResultView';

export default async function QualityControlResultPag({ params }: INextPage<{ id: string }>) {
  const { id } = await params;
  return <ResultView {...{ id }} />;
}
