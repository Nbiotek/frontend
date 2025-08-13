'use client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HeroLoader from './HeroLoader';
import HeroCarousel from './HeroCarousel';
import EmptyCarousel from './EmptyCarousel';

interface IHeroContentProps {
  data: TAdminHeroSection | undefined;
  isLoading: boolean;
}
const HeroContent = ({ isLoading, data }: IHeroContentProps) => {
  console.log(isLoading, data);
  return (
    <div className="w-full">
      {isLoading && <HeroLoader />}

      {data && (
        <div className="flex flex-col space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{data.heading}</CardTitle>
              <CardDescription>{data.tagline}</CardDescription>
            </CardHeader>
          </Card>

          {data.carousel.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {data.carousel.map((el) => (
                <HeroCarousel key={el.id} />
              ))}
            </div>
          ) : (
            <EmptyCarousel id={data?.id ?? ''} />
          )}
        </div>
      )}
    </div>
  );
};

export default HeroContent;
