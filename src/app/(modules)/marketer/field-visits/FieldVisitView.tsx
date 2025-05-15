'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useEffect, useState } from 'react';
import FieldVisitPending from './components/FieldVisitPending';
import FieldVisitHistory from './components/FieldVisitHistory';

const FiedVisitView = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <Tabs defaultValue="pending" className="space-y-4">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </div>
        <div className="w-full rounded-lg bg-white p-2 ">
          <TabsContent value="pending">
            <FieldVisitPending />
          </TabsContent>
          <TabsContent value="history">
            <FieldVisitHistory />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default FiedVisitView;
