import PwdResetView from '../PwdResetView';

const PwdResetPage = async ({ params }: INextPage<{ token: string }>) => {
  const { token } = await params;
  return <PwdResetView token={token} />;
};

export default PwdResetPage;
