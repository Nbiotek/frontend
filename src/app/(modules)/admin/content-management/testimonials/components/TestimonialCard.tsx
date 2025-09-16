import { EnumTestAvailability } from '@/atoms/Buttons/Status';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Rating, RatingButton } from '@/components/ui/ratings';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { toTitleCase } from '@/utils';
import { format } from 'date-fns';
import { Edit2, Trash } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';

interface ITestimonialCardProps {
  testimonial: TAdminTestimonial;
}

const TestimonialCard = ({ testimonial }: ITestimonialCardProps) => {
  const { id, author, description, rating, status, createdAt } = testimonial;

  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  return (
    <div className="relative top-0 h-full w-full overflow-clip rounded-lg duration-700 ease-in-out">
      <div className="absolute right-2 top-2 z-40 space-x-1">
        <Button
          variant="outline"
          size={'sm'}
          onClick={() =>
            toggleModals({
              name: AppModals.CREATE_TESTIMONIAL_MODAL,
              open: true,
              id: id
            })
          }
        >
          <Edit2 />
        </Button>

        <Button
          variant="destructive"
          size={'sm'}
          onClick={() =>
            toggleModals({
              name: AppModals.DEL_TESTIMONIAL_MODAL,
              open: true,
              id: id
            })
          }
        >
          <Trash size={12} />
        </Button>
      </div>

      <div className="rounded-xl bg-accent px-6 py-8 sm:py-6">
        <div className="flex items-center justify-between gap-20">
          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-between gap-1">
              <div className="hidden items-center gap-4 sm:flex md:hidden">
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarFallback className="bg-primary text-xl font-medium text-primary-foreground">
                    {author.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{author.fullName}</p>
                  <p className="text-gray-500 text-sm">{author.role}</p>
                </div>
              </div>
              <Rating defaultValue={rating} readOnly>
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton key={index} />
                ))}
              </Rating>
            </div>
            <p className="mt-6 text-lg font-semibold leading-normal tracking-tight sm:text-2xl lg:text-[1.75rem] lg:!leading-normal xl:text-3xl">
              &quot;{description}&quot;
            </p>
            <div className="mt-6 flex items-center gap-4 sm:hidden md:flex">
              <Avatar>
                <AvatarFallback className="bg-primary text-xl font-medium text-primary-foreground">
                  {author.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{author.fullName}</p>
                <p className="text-gray-500 text-sm">{author.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-end text-xs text-neutral-500 md:flex-row md:space-x-2">
          <div className="flex justify-start space-x-1">
            <span className="">Created:</span>
            <span className="font-medium">{format(new Date(createdAt), 'dd MMM, yy')}</span>
          </div>
          <Badge variant={status === EnumTestAvailability.ACTIVE ? 'default' : 'destructive'}>
            {toTitleCase(status)}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default observer(TestimonialCard);
