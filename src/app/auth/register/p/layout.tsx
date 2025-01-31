import { Card, CardHeader } from '@/components/ui/card';
import { SubTitle, Title } from '@/atoms/typographys';

export default function PatientRegLayout({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <Title className="!-mb-2" text="Patient Registration" />
        <SubTitle className="!font-light" text="Please fill in the details below" />
      </CardHeader>
      {children}
    </Card>
  );
}
