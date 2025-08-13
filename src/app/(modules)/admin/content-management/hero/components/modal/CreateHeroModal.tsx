import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { AdminCreateHeroSchema, TAdminCreateHeroSchema } from '../../validation';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import TextareaField from '@/atoms/fields/TextAreaField';
import { SUPER_ADMIN } from '@/constants/api';
import { useEffect } from 'react';
import { useFetchHeroById } from '@/hooks/admin/useFetchHeroById';

const AdminHeroModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, heroSectionModal },
    AdminStore: { createHeroSection, updateHeroSection, isLoading }
  } = useStore();

  const queryClient = useQueryClient();
  const isEditMode = heroSectionModal.id !== '';

  const { data, status } = useFetchHeroById(heroSectionModal.id);

  const form = useForm<TAdminCreateHeroSchema>({
    defaultValues: {
      heading: '',
      tagline: ''
    },
    mode: 'onSubmit',
    resolver: zodResolver(AdminCreateHeroSchema),
    reValidateMode: 'onSubmit'
  });

  useEffect(() => {
    if (isEditMode && data) {
      form.reset({
        heading: data.heading || '',
        tagline: data.tagline || ''
      });
    } else if (!isEditMode) {
      form.reset({
        heading: '',
        tagline: ''
      });
    }
  }, [isEditMode, data, form]);

  const onSubmit: SubmitHandler<TAdminCreateHeroSchema> = (formData) => {
    const cbFn = () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.STATS
      });
      toggleModals();
    };
    if (isEditMode) {
      updateHeroSection(heroSectionModal.id, formData, cbFn);
      return;
    }
    createHeroSection(formData, cbFn);
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
        isOpen={isOpen.CREATE_HERO_SECTION_MODAL}
        className="!max-w-[350px]"
        title="Hero Section"
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
        isOpen={isOpen.CREATE_HERO_SECTION_MODAL}
        className="!max-w-[350px]"
        title="Hero section"
      >
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="mb-4 text-red-500">Failed to get hero section. Please try again.</p>
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
      isOpen={isOpen.CREATE_HERO_SECTION_MODAL}
      className="!max-w-[350px]"
      title="Hero section"
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <fieldset disabled={isLoading.create_hero} className="w-full">
              <FormField
                control={form.control}
                name="heading"
                render={({ field }) => (
                  <div>
                    <TextareaField
                      label="Heading"
                      placeholder="hero heading..."
                      required
                      {...field}
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <div>
                    <TextareaField
                      label="Tagline"
                      placeholder="hero tagline..."
                      required
                      {...field}
                    />
                  </div>
                )}
              />
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

export default observer(AdminHeroModal);
