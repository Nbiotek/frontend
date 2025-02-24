'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InputSearch from '@/atoms/fields/InputSearch';
import TestItems from '@/components/common/testItems';
import SingleTestCard from '@/components/test/SingleTestCard';
import { SingleTest } from '@/types/test';
import { individualTests } from '@/api/data/test';
import { useState } from 'react';
import SingleTestDialog from '@/components/test/TestDetailsDialog';
import TestTabs from '../../component/TestTab';

import { useTestsSingle } from '@/hooks/patient/useTest';

const AvailableTestView = () => {
  return (
    <div className="space-y-4">
      <div className="">
        <TestTabs />
      </div>
    </div>
  );
};

export default AvailableTestView;
