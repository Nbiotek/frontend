import Image from 'next/image';
import { Text } from '@/lib/utils/Text';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Edit2 } from 'lucide-react';

interface IHeroCarouselProps {
  carousel: TAdminCarouselItem;
}

const HeroCarousel = ({ carousel }: IHeroCarouselProps) => {
  const { id, title, description, linkTitle, media, linkStyle } = carousel;
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <div className="relative top-0 h-full w-full overflow-clip rounded-lg duration-700 ease-in-out">
      <div className="absolute right-2 top-2 z-40">
        <Button
          variant="outline"
          onClick={() =>
            toggleModals({
              name: AppModals.CREATE_HERO_CAROUSEL_MODAL,
              open: true,
              id
            })
          }
        >
          <Edit2 />
        </Button>
      </div>
      <figure className="aspect-landscape w-full">
        <Image
          src={media[0].file_url}
          priority
          quality={100}
          fill
          sizes="100vw"
          className="h-full w-full object-cover"
          alt={''}
        />
      </figure>

      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end">
        <div className="w-full space-y-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-6 pb-6 pt-16 text-white lg:space-y-4 lg:px-8 lg:pb-8 lg:pt-20">
          <Text variant="title" className="text-xl font-bold lg:text-2xl xl:text-3xl">
            {title}
          </Text>
          <p className="text-sm leading-relaxed lg:text-base xl:text-lg">{description}</p>
          <Button
            className={`w-32 border-none text-sm font-semibold lg:w-36 lg:text-base bg-[${linkStyle}]`}
          >
            {linkTitle}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
