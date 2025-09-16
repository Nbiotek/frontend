'use client';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Plus } from 'lucide-react';
import { useFetchTestimonial } from '@/hooks/admin/useFetchTestimonials';
import AllTestimonial from './components/AllTestimonials';
import { observer } from 'mobx-react-lite';

const Testimonials = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const { data, isLoading } = useFetchTestimonial();

  return (
    <div className="w-full">
      {isLoading || (
        <div className="flex w-full flex-col space-y-3 rounded-lg bg-white p-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div></div>
          {data && data.testimonials && (
            <Button
              className="w-fit bg-blue-400"
              onClick={() =>
                toggleModals({ name: AppModals.CREATE_TESTIMONIAL_MODAL, open: true, id: '' })
              }
            >
              <Plus />
              Add Testimonial
            </Button>
          )}
        </div>
      )}

      <AllTestimonial isLoading={isLoading} data={data} />
    </div>
  );
};

export default observer(Testimonials);
