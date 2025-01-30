import { AppSidebar } from '@/components/dashboard/Sidebar/app-sidebar';

const PatientDash = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-4 mt-5 flex flex-col bg-[#EEF5FF]">{children}</div>;
};

export default PatientDash;
