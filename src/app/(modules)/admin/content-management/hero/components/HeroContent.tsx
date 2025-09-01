'use client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HeroLoader from './HeroLoader';
import HeroCarousel from './HeroCarousel';
import EmptyCarousel from './EmptyCarousel';
import { Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';

interface IHeroContentProps {
  data: TAdminHeroSection | undefined;
  isLoading: boolean;
}
const HeroContent = ({ isLoading, data }: IHeroContentProps) => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <div className="w-full">
      {isLoading && <HeroLoader />}

      {data && (
        <div className="flex flex-col space-y-6">
          <Card className="relative top-0 w-full">
            <CardHeader>
              <CardTitle>{data.heading}</CardTitle>
              <CardDescription>{data.tagline}</CardDescription>
            </CardHeader>

            <div className="absolute right-2 top-2">
              <Button
                variant="outline"
                onClick={() =>
                  toggleModals({
                    name: AppModals.CREATE_HERO_SECTION_MODAL,
                    open: true,
                    id: 'edit'
                  })
                }
              >
                <Edit2 />
              </Button>
            </div>
          </Card>
          {data.carousel.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {data.carousel.map((el) => (
                <HeroCarousel key={el.id} carousel={el} />
              ))}
            </div>
          ) : (
            <EmptyCarousel />
          )}
        </div>
      )}
    </div>
  );
};

export default HeroContent;
