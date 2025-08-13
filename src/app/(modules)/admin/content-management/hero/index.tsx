'use client';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import HeroContent from './components/HeroContent';
import { useFetchHero } from '@/hooks/admin/useFetchHero';

const Hero = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const { data, isLoading } = useFetchHero();

  return (
    <div className="w-full">
      {isLoading || (
        <div className="flex w-full flex-col space-y-3 rounded-lg bg-white p-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div></div>
          {data && data.heading ? null : (
            <Button
              className="w-fit bg-blue-400"
              onClick={() =>
                toggleModals({ name: AppModals.CREATE_HERO_SECTION_MODAL, open: true, id: '' })
              }
            >
              Create
            </Button>
          )}
        </div>
      )}

      <div>
        <HeroContent {...{ data, isLoading }} />
      </div>
    </div>
  );
};

export default Hero;
