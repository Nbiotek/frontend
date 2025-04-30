'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PatientApptView from './components/patientAppts/PatientApptView';
import PatientInfoView from './components/patientInfo/PatientInfoView';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Paragraph } from '@/atoms/typographys';

export default function PatientIDView({ id }: { id: string }) {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col space-y-2">
      <button onClick={() => router.back()} className="flex items-center justify-start space-x-2">
        <ChevronLeft />
        <Paragraph text="Back" />
      </button>

      <Tabs defaultValue="info" className="flex w-full flex-col space-y-2">
        <div className="mx-auto w-full rounded-lg bg-white p-2">
          <TabsList>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="appt">Appointments</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-full rounded-lg">
          <TabsContent className="w-full" value="info">
            <PatientInfoView />
          </TabsContent>
          <TabsContent className="w-full" value="appt">
            <PatientApptView />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
