import ToggleHeader from '@/components/Header/ToggleHeader';
import HomePageView from './(website)/home/HomepageView';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <div className="flex w-full  flex-col">
        <ToggleHeader />
        <HomePageView />
        <Footer />
      </div>
    </>
  );
}
