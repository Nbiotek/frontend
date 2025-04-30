import ToggleHeader from '@/components/Header/ToggleHeader';
import Footer from '@/components/Footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-full  flex-col">
        <ToggleHeader />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
