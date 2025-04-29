import PatientIDView from './PatientIDView';

export default async function PatientIDPage({ params }: INextPage<{ id: string }>) {
  const { id } = await params;
  return <PatientIDView {...{ id }} />;
}
