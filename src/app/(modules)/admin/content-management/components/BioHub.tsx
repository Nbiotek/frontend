'use client';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Edit2, Trash } from 'lucide-react';
import { useFetchBlogCategories } from '@/hooks/admin/useFetchBlogCategories';
import { useFetchBiohubs } from '@/hooks/admin/useFetchBiohubs';
import { SUPER_ADMIN } from '@/constants/api';
import { delBiohub, postCreateBiohub, putUpdateBiohub } from '@/requests/admin';
import * as ToastLib from '@/atoms/Toast';
import { pagination } from '@/constants/data';
import Pagination from '@/atoms/pagination';
import InputToggle from '@/atoms/fields/InputToggle';

const statusOptions = ['ACTIVE', 'INACTIVE'] as const;

const biohubSchema = z.object({
  title: z
    .string({ required_error: 'Title is required.' })
    .trim()
    .min(2, { message: 'Title is required.' }),
  categoryId: z
    .string({ required_error: 'Category is required.' })
    .trim()
    .min(2, { message: 'Category is required.' }),
  body: z
    .string({ required_error: 'Body is required.' })
    .trim()
    .min(2, { message: 'Body is required.' }),
  featureImageUrl: z.string().trim().optional(),
  isFeatured: z.boolean(),
  status: z.enum(statusOptions, { required_error: 'Status is required.' })
});

type TBiohubForm = z.infer<typeof biohubSchema>;

type TBiohubPayload = Omit<TBiohubForm, 'featureImageUrl'> & {
  featureImageUrl?: string | null;
  categoryName?: string;
};

const BioHub = () => {
  const queryClient = useQueryClient();
  const { data: categoryData } = useFetchBlogCategories();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [biohubItems, setBiohubItems] = useState<Array<TAdminBiohubItem>>([]);
  const [biohubPagination, setBiohubPagination] = useState<TPaginationResponse>(pagination);
  const { data: biohubData, isLoading, status } = useFetchBiohubs({ page, limit });

  const [editingBiohub, setEditingBiohub] = useState<TAdminBiohubItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TAdminBiohubItem | null>(null);

  const form = useForm<TBiohubForm>({
    defaultValues: {
      title: '',
      categoryId: '',
      body: '',
      featureImageUrl: '',
      isFeatured: false,
      status: 'ACTIVE'
    },
    mode: 'onSubmit',
    resolver: zodResolver(biohubSchema),
    reValidateMode: 'onSubmit'
  });

  const createMutation = useMutation({
    mutationFn: postCreateBiohub,
    onSuccess: () => {
      ToastLib.Toast.success('Biohub created successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.BIOHUB
      });
      form.reset({
        title: '',
        categoryId: '',
        body: '',
        featureImageUrl: '',
        isFeatured: false,
        status: 'ACTIVE'
      });
    },
    onError: () => {
      ToastLib.Toast.error('Failed to create biohub');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TBiohubPayload }) =>
      putUpdateBiohub(id, payload),
    onSuccess: () => {
      ToastLib.Toast.success('Biohub updated successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.BIOHUB
      });
      setEditingBiohub(null);
      form.reset({
        title: '',
        categoryId: '',
        body: '',
        featureImageUrl: '',
        isFeatured: false,
        status: 'ACTIVE'
      });
    },
    onError: () => {
      ToastLib.Toast.error('Failed to update biohub');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => delBiohub(id),
    onSuccess: () => {
      ToastLib.Toast.success('Biohub deleted successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.BIOHUB
      });
      setDeleteTarget(null);
    },
    onError: () => {
      ToastLib.Toast.error('Failed to delete biohub');
    }
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const categoryCount = useMemo(() => categoryData?.blogCategories?.length ?? 0, [categoryData]);

  useEffect(() => {
    if (biohubData && !isLoading) {
      setBiohubItems(biohubData.biohubs);
      setBiohubPagination(biohubData.pagination);
    }
  }, [biohubData, isLoading]);

  useEffect(() => {
    if (editingBiohub) {
      form.reset({
        title: editingBiohub.title,
        categoryId:
          categoryData?.blogCategories?.find(
            (category) => category.title === editingBiohub.categoryName
          )?.id ?? '',
        body: editingBiohub.body,
        featureImageUrl: editingBiohub.featureImageUrl ?? '',
        isFeatured: editingBiohub.isFeatured,
        status: editingBiohub.status as TBiohubForm['status']
      });
      return;
    }

    form.reset({
      title: '',
      categoryId: '',
      body: '',
      featureImageUrl: '',
      isFeatured: false,
      status: 'ACTIVE'
    });
  }, [editingBiohub, form, categoryData]);

  const handleSubmit = (payload: TBiohubForm) => {
    const selectedCategory = categoryData?.blogCategories?.find(
      (category) => category.id === payload.categoryId
    );
    const normalizedPayload: TBiohubPayload = {
      ...payload,
      categoryName: selectedCategory?.title,
      featureImageUrl: payload.featureImageUrl?.trim() ? payload.featureImageUrl.trim() : null
    };

    if (editingBiohub) {
      updateMutation.mutate({ id: editingBiohub.id, payload: normalizedPayload });
      return;
    }

    createMutation.mutate(normalizedPayload);
  };

  const handleEdit = (biohub: TAdminBiohubItem) => {
    setEditingBiohub(biohub);
  };

  const handleCancelEdit = () => {
    setEditingBiohub(null);
    form.reset({
      title: '',
      categoryId: '',
      body: '',
      featureImageUrl: '',
      isFeatured: false,
      status: 'ACTIVE'
    });
  };

  return (
    <div className="w-full space-y-6">
      <Card className="w-full p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <h3 className="text-lg font-semibold">Biohub</h3>
            <p className="text-sm text-neutral-500">Create and manage Biohub content.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 md:grid-cols-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-4">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Advanced Genetic Testing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {categoryCount > 0 ? (
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Category</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full rounded-lg">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          {categoryData?.blogCategories?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                              className="rounded-lg"
                            >
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Category ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="md:col-span-6">
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write the biohub content..."
                        className="min-h-[120px] bg-neutral-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featureImageUrl"
                render={({ field }) => (
                  <FormItem className="md:col-span-4">
                    <FormLabel>Feature Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full rounded-lg">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        {statusOptions.map((statusItem) => (
                          <SelectItem key={statusItem} value={statusItem} className="rounded-lg">
                            {statusItem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <InputToggle
                    label="Featured"
                    description="Highlight this biohub on the website."
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <div className="flex items-end justify-end gap-2 md:col-span-6">
                {editingBiohub && (
                  <Button type="button" variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                )}
                <Button type="submit" className="bg-blue-400" disabled={isSubmitting}>
                  {editingBiohub ? 'Update' : 'Create'} Biohub
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h4 className="text-base font-semibold">All Biohub Posts</h4>
          <p className="text-sm text-neutral-500">Edit or remove Biohub entries.</p>
        </div>

        {isLoading &&
          Array(3)
            .fill(0)
            .map((_, index) => <Skeleton key={index} className="h-24 w-full" />)}

        {!isLoading && biohubItems.length === 0 && (
          <Card className="w-full p-6 text-center text-sm text-neutral-500">
            No Biohub posts yet. Create one above.
          </Card>
        )}

        {!isLoading &&
          biohubItems.map((biohub) => (
            <Card key={biohub.id} className="w-full p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-semibold">{biohub.title}</h4>
                    <Badge
                      variant={biohub.status === 'ACTIVE' ? 'default' : 'secondary'}
                      className="uppercase"
                    >
                      {biohub.status}
                    </Badge>
                    {biohub.isFeatured && <Badge variant="outline">Featured</Badge>}
                  </div>
                  <p className="text-sm text-neutral-500">{biohub.categoryName}</p>
                  <p className="text-xs text-neutral-500">Reads {biohub.reads}</p>
                  <p className="text-xs text-neutral-500">
                    Created {new Date(biohub.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(biohub)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => setDeleteTarget(biohub)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

        {status === 'success' && biohubPagination.totalPages > 1 && (
          <Pagination
            limit={limit ?? Number(biohubPagination.limit)}
            setLimit={setLimit}
            currentPage={page ?? Number(biohubPagination.page)}
            setPage={setPage}
            total={biohubPagination.total}
            totalPages={biohubPagination.totalPages}
            siblingCount={1}
          />
        )}
      </div>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="w-full max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete Biohub</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteTarget?.title}&quot;? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BioHub;
