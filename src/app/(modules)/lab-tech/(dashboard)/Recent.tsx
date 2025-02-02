import HyperLink from '@/atoms/Hyperlink';
import { SubTitle } from '@/atoms/typographys';
import ROUTES from '@/constants/routes';
import { SlidersHorizontal } from 'lucide-react';
import TestsTable from '../tests/TestsTable';

const Recent = () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between border-b pb-2">
        <SubTitle text="Recent Activity" />
        <SlidersHorizontal className="cursor-pointer text-neutral-500" />
      </div>

      <TestsTable />

      <div className="flex w-full items-center justify-end pt-6">
        <HyperLink href={ROUTES.LAB_TECH_TEST.path} hrefText="See tests pool" />
      </div>
    </div>
  );
};

export default Recent;
