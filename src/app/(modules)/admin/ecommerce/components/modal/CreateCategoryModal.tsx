'use client';
import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { CreateCategorySchema, TCreateCategorySchema } from '../../validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ECOMMERCE } from '@/constants/api';
import { useEffect } from 'react';
import { postCreateCategory, putUpdateCategory } from '@/requests/ecommerce';
import * as ToastLib from '@/atoms/Toast';

const CreateCategoryModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, categoryModal }
  } = useStore();

  const queryClient = useQueryClient();
  const isEditMode = categoryModal.id !== '';

  const form = useForm<TCreateCategorySchema>({
    defaultValues: {
      name: '',
      description: ''
    },
    mode: 'onSubmit',
    resolver: zodResolver(CreateCategorySchema),
    reValidateMode: 'onSubmit'
  });

  const invalidateCategories = () =>
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === ECOMMERCE.CATEGORIES
    });

  const createMutation = useMutation({
    mutationFn: postCreateCategory,
    onSuccess: () => {
      ToastLib.Toast.success('Category created successfully');
      invalidateCategories();
      handleCloseModal();
    },
    onError: () => {
      ToastLib.Toast.error('Failed to create category');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload
    }: {
      id: string;
      payload: Parameters<typeof putUpdateCategory>[1];
    }) => putUpdateCategory(id, payload),
    onSuccess: () => {
      ToastLib.Toast.success('Category updated successfully');
      invalidateCategories();
      handleCloseModal();
    },
    onError: () => {
      ToastLib.Toast.error('Failed to update category');
    }
  });

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const onSubmit: SubmitHandler<TCreateCategorySchema> = (formData) => {
    const payload = {
      name: formData.name,
      description: formData.description
    };

    if (isEditMode) {
      updateMutation.mutate({ id: categoryModal.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleCloseModal = () => {
    form.reset();
    toggleModals();
  };

  useEffect(() => {
    if (isEditMode && categoryModal.category) {
      form.reset({
        name: categoryModal.category.name,
        description: categoryModal.category.description
      });
    } else {
      form.reset({ name: '', description: '' });
    }
  }, [isEditMode, categoryModal, form]);

  return (
    <XModal
      closeModal={handleCloseModal}
      bgClose={false}
      isOpen={isOpen.ADMIN_CREATE_CATEGORY}
      title={isEditMode ? 'Edit Category' : 'Add Category'}
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Supplements & Vitamins" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the category..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end space-x-2 pt-2">
              <Button
                disabled={isLoading}
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-400" disabled={isLoading}>
                {isLoading && <Loader className="animate-spin" />}
                {isEditMode ? 'Update' : 'Add'} Category
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(CreateCategoryModal);
