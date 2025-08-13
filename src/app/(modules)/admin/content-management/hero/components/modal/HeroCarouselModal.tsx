import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { AdminHeroCarouselSchema, TAdminHeroCarouselSchema } from '../../validation';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { SUPER_ADMIN } from '@/constants/api';
import { useEffect } from 'react';
import { useFetchHeroById } from '@/hooks/admin/useFetchHeroById';
import InputField from '@/atoms/fields/InputField';
import { SubTitle } from '@/atoms/typographys';

const AdminHeroCarouselModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, heroSectionModal },
    AdminStore: { updateHeroCarousel, isLoading }
  } = useStore();

  const queryClient = useQueryClient();
  const isEditMode = heroSectionModal.id !== '';

  const { data, status } = useFetchHeroById(heroSectionModal.id);

  const form = useForm<TAdminHeroCarouselSchema>({
    defaultValues: {
      title: '',
      description: ''
    },
    mode: 'onSubmit',
    resolver: zodResolver(AdminHeroCarouselSchema),
    reValidateMode: 'onSubmit'
  });

  useEffect(() => {
    if (isEditMode && data) {
      form.reset({
        title: data.heading || '',
        description: data.tagline || ''
      });
    } else if (!isEditMode) {
      form.reset({
        title: '',
        description: ''
      });
    }
  }, [isEditMode, data, form]);

  const onSubmit: SubmitHandler<TAdminHeroCarouselSchema> = (formData) => {
    const cbFn = () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.STATS
      });
      toggleModals();
    };
    updateHeroCarousel(heroSectionModal.id, formData, cbFn);
  };

  const handleCloseModal = () => {
    form.reset();
    toggleModals();
  };

  if (isEditMode && status === 'pending') {
    return (
      <XModal
        closeModal={handleCloseModal}
        bgClose={false}
        isOpen={isOpen.CREATE_HERO_CAROUSEL_MODAL}
        title="Hero carousel"
      >
        <div className="flex items-center justify-center py-8">
          <Loader className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading Hero...</span>
        </div>
      </XModal>
    );
  }

  if (isEditMode && status === 'error') {
    return (
      <XModal
        closeModal={handleCloseModal}
        bgClose={false}
        isOpen={isOpen.CREATE_HERO_CAROUSEL_MODAL}
        title="Hero carousel"
      >
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="mb-4 text-red-500">Failed to get carousel. Please try again.</p>
          <Button onClick={handleCloseModal} variant="outline">
            Close
          </Button>
        </div>
      </XModal>
    );
  }

  return (
    <XModal
      closeModal={handleCloseModal}
      bgClose={false}
      isOpen={isOpen.CREATE_HERO_CAROUSEL_MODAL}
      title="Hero carousel"
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <fieldset disabled={isLoading.create_hero} className="w-full">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <div>
                    <InputField label="Title" placeholder="" required {...field} />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <div>
                    <InputField label="Description" placeholder="" required {...field} />
                  </div>
                )}
              />

              <div className="flec w-full flex-col space-y-2">
                <SubTitle text={'Link'} />

                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="linkTitle"
                    render={({ field }) => (
                      <div>
                        <InputField label="Text" placeholder="see more" required {...field} />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <div>
                        <InputField
                          label="url"
                          placeholder="https://www.example.com"
                          required
                          {...field}
                        />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkStyle"
                    render={({ field }) => (
                      <div>
                        <InputField label="color" required {...field} type="color" />
                      </div>
                    )}
                  />
                </div>
              </div>
            </fieldset>

            <div className="flex items-center justify-end space-x-2">
              <Button
                disabled={isLoading.create_hero}
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-400" disabled={isLoading.create_hero}>
                {isLoading.create_hero && <Loader className="animate-spin" />}
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(AdminHeroCarouselModal);
