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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { useFetchBlogs } from '@/hooks/admin/useFetchBlogs';
import { SUPER_ADMIN } from '@/constants/api';
import {
  delBlog,
  delBlogCategory,
  postCreateBlog,
  postCreateBlogCategory,
  putUpdateBlog,
  putUpdateBlogCategory
} from '@/requests/admin';
import * as ToastLib from '@/atoms/Toast';
import { pagination } from '@/constants/data';
import Pagination from '@/atoms/pagination';
import InputToggle from '@/atoms/fields/InputToggle';

const statusOptions = ['ACTIVE', 'INACTIVE'] as const;

const blogCategorySchema = z.object({
  title: z
    .string({ required_error: 'Title is required.' })
    .trim()
    .min(2, { message: 'Title is required.' }),
  status: z.enum(statusOptions, { required_error: 'Status is required.' })
});

type TBlogCategoryForm = z.infer<typeof blogCategorySchema>;

const blogSchema = z.object({
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

type TBlogForm = z.infer<typeof blogSchema>;
type TBlogPayload = Omit<TBlogForm, 'featureImageUrl'> & {
  featureImageUrl?: string | null;
  categoryName?: string;
  reads?: number;
};

const Blog = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetchBlogCategories();
  const [blogLimit, setBlogLimit] = useState(10);
  const [blogPage, setBlogPage] = useState(1);
  const [blogItems, setBlogItems] = useState<Array<TAdminBlogItem>>([]);
  const [blogPagination, setBlogPagination] = useState<TPaginationResponse>(pagination);
  const {
    data: blogData,
    isLoading: isBlogLoading,
    status: blogStatus
  } = useFetchBlogs({ page: blogPage, limit: blogLimit });
  const [editingCategory, setEditingCategory] = useState<TAdminBlogCategoryItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TAdminBlogCategoryItem | null>(null);
  const [editingBlog, setEditingBlog] = useState<TAdminBlogItem | null>(null);
  const [deleteBlogTarget, setDeleteBlogTarget] = useState<TAdminBlogItem | null>(null);

  const form = useForm<TBlogCategoryForm>({
    defaultValues: {
      title: '',
      status: 'ACTIVE'
    },
    mode: 'onSubmit',
    resolver: zodResolver(blogCategorySchema),
    reValidateMode: 'onSubmit'
  });

  const blogForm = useForm<TBlogForm>({
    defaultValues: {
      title: '',
      categoryId: '',
      body: '',
      featureImageUrl: '',
      isFeatured: false,
      status: 'ACTIVE'
    },
    mode: 'onSubmit',
    resolver: zodResolver(blogSchema),
    reValidateMode: 'onSubmit'
  });

  const createMutation = useMutation({
    mutationFn: postCreateBlogCategory,
    onSuccess: () => {
      ToastLib.Toast.success('Category created successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.BLOG_CATEGORIES
      });
      form.reset({ title: '', status: 'ACTIVE' });
    },
    onError: () => {
      ToastLib.Toast.error('Failed to create category');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TBlogCategoryForm }) =>
      putUpdateBlogCategory(id, payload),
    onSuccess: () => {
      ToastLib.Toast.success('Category updated successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.BLOG_CATEGORIES
      });
      setEditingCategory(null);
      form.reset({ title: '', status: 'ACTIVE' });
    },
    onError: () => {
      ToastLib.Toast.error('Failed to update category');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => delBlogCategory(id),
    onSuccess: () => {
      ToastLib.Toast.success('Category deleted successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.BLOG_CATEGORIES
      });
      setDeleteTarget(null);
    },
    onError: () => {
      ToastLib.Toast.error('Failed to delete category');
    }
  });

  const createBlogMutation = useMutation({
    mutationFn: postCreateBlog,
    onSuccess: () => {
      ToastLib.Toast.success('Blog created successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.BLOGS
      });
      blogForm.reset({
        title: '',
        categoryId: '',
        body: '',
        featureImageUrl: '',
        isFeatured: false,
        status: 'ACTIVE'
      });
    },
    onError: () => {
      ToastLib.Toast.error('Failed to create blog');
    }
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TBlogPayload }) =>
      putUpdateBlog(id, payload),
    onSuccess: () => {
      ToastLib.Toast.success('Blog updated successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.BLOGS
      });
      setEditingBlog(null);
      blogForm.reset({
        title: '',
        categoryId: '',
        body: '',
        featureImageUrl: '',
        isFeatured: false,
        status: 'ACTIVE'
      });
    },
    onError: () => {
      ToastLib.Toast.error('Failed to update blog');
    }
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id: string) => delBlog(id),
    onSuccess: () => {
      ToastLib.Toast.success('Blog deleted successfully');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === SUPER_ADMIN.BLOGS
      });
      setDeleteBlogTarget(null);
    },
    onError: () => {
      ToastLib.Toast.error('Failed to delete blog');
    }
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isBlogSubmitting = createBlogMutation.isPending || updateBlogMutation.isPending;
  const categoryCount = useMemo(() => data?.blogCategories?.length ?? 0, [data]);
  const blogCount = useMemo(() => blogItems.length, [blogItems]);

  useEffect(() => {
    if (editingCategory) {
      form.reset({
        title: editingCategory.title,
        status: editingCategory.status as TBlogCategoryForm['status']
      });
      return;
    }

    form.reset({ title: '', status: 'ACTIVE' });
  }, [editingCategory, form]);

  useEffect(() => {
    if (blogData && !isBlogLoading) {
      setBlogItems(blogData.blogs);
      setBlogPagination(blogData.pagination);
    }
  }, [blogData, isBlogLoading]);

  useEffect(() => {
    if (editingBlog) {
      blogForm.reset({
        title: editingBlog.title,
        categoryId:
          data?.blogCategories?.find((category) => category.title === editingBlog.categoryName)
            ?.id ?? '',
        body: editingBlog.body,
        featureImageUrl: editingBlog.featureImageUrl ?? '',
        isFeatured: editingBlog.isFeatured,
        status: editingBlog.status as TBlogForm['status']
      });
      return;
    }

    blogForm.reset({
      title: '',
      categoryId: '',
      body: '',
      featureImageUrl: '',
      isFeatured: false,
      status: 'ACTIVE'
    });
  }, [editingBlog, blogForm, data]);

  const onSubmit = (payload: TBlogCategoryForm) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, payload });
      return;
    }

    createMutation.mutate(payload);
  };

  const handleEdit = (category: TAdminBlogCategoryItem) => {
    setEditingCategory(category);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    form.reset({ title: '', status: 'ACTIVE' });
  };

  const handleBlogSubmit = (payload: TBlogForm) => {
    const selectedCategory = data?.blogCategories?.find(
      (category) => category.id === payload.categoryId
    );
    const normalizedPayload: TBlogPayload = {
      ...payload,
      categoryName: selectedCategory?.title,
      featureImageUrl: payload.featureImageUrl?.trim() ? payload.featureImageUrl.trim() : null
    };

    if (editingBlog) {
      updateBlogMutation.mutate({ id: editingBlog.id, payload: normalizedPayload });
      return;
    }

    createBlogMutation.mutate({ ...normalizedPayload, reads: 0 });
  };

  const handleBlogEdit = (blog: TAdminBlogItem) => {
    setEditingBlog(blog);
  };

  const handleCancelBlogEdit = () => {
    setEditingBlog(null);
    blogForm.reset({
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
      <Tabs defaultValue="posts" className="w-full">
        <div className="flex w-full items-center justify-between rounded-lg bg-white p-2">
          <div>
            <h3 className="text-lg font-semibold">Blog Management</h3>
            <p className="text-sm text-neutral-500">Create posts and organize categories.</p>
          </div>
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="posts" className="space-y-6">
          <Card className="w-full p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1">
                <h4 className="text-base font-semibold">Create Blog Post</h4>
                <p className="text-sm text-neutral-500">Add a new post for the website.</p>
              </div>

              <Form {...blogForm}>
                <form
                  onSubmit={blogForm.handleSubmit(handleBlogSubmit)}
                  className="grid gap-4 md:grid-cols-6"
                >
                  <FormField
                    control={blogForm.control}
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
                      control={blogForm.control}
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
                              {data?.blogCategories?.map((category) => (
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
                      control={blogForm.control}
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
                    control={blogForm.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem className="md:col-span-6">
                        <FormLabel>Body</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write the blog content..."
                            className="min-h-[120px] bg-neutral-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={blogForm.control}
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
                    control={blogForm.control}
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
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status} className="rounded-lg">
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={blogForm.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <InputToggle
                        label="Featured"
                        description="Highlight this blog on the website."
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <div className="flex items-end justify-end gap-2 md:col-span-6">
                    {editingBlog && (
                      <Button type="button" variant="outline" onClick={handleCancelBlogEdit}>
                        Cancel
                      </Button>
                    )}
                    <Button type="submit" className="bg-blue-400" disabled={isBlogSubmitting}>
                      {editingBlog ? 'Update' : 'Create'} Blog
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <h4 className="text-base font-semibold">All Posts</h4>
              <p className="text-sm text-neutral-500">Manage, edit, and remove posts.</p>
            </div>

            {isBlogLoading &&
              Array(3)
                .fill(0)
                .map((_, index) => <Skeleton key={index} className="h-24 w-full" />)}

            {!isBlogLoading && blogCount === 0 && (
              <Card className="w-full p-6 text-center text-sm text-neutral-500">
                No blogs yet. Create a blog post above.
              </Card>
            )}

            {!isBlogLoading &&
              blogItems.map((blog) => (
                <Card key={blog.id} className="w-full p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-semibold">{blog.title}</h4>
                        <Badge
                          variant={blog.status === 'ACTIVE' ? 'default' : 'secondary'}
                          className="uppercase"
                        >
                          {blog.status}
                        </Badge>
                        {blog.isFeatured && <Badge variant="outline">Featured</Badge>}
                      </div>
                      <p className="text-sm text-neutral-500">{blog.categoryName}</p>
                      <p className="text-xs text-neutral-500">Reads {blog.reads}</p>
                      <p className="text-xs text-neutral-500">
                        Created {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleBlogEdit(blog)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setDeleteBlogTarget(blog)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

            {blogStatus === 'success' && blogPagination.totalPages > 1 && (
              <Pagination
                limit={blogLimit ?? Number(blogPagination.limit)}
                setLimit={setBlogLimit}
                currentPage={blogPage ?? Number(blogPagination.page)}
                setPage={setBlogPage}
                total={blogPagination.total}
                totalPages={blogPagination.totalPages}
                siblingCount={1}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card className="w-full p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1">
                <h4 className="text-base font-semibold">Create Category</h4>
                <p className="text-sm text-neutral-500">
                  Group blog posts with clear category labels.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="md:col-span-3">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Genetic Services" {...field} />
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
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status} className="rounded-lg">
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-end justify-end gap-2 md:col-span-5">
                    {editingCategory && (
                      <Button type="button" variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    )}
                    <Button type="submit" className="bg-blue-400" disabled={isSubmitting}>
                      {editingCategory ? 'Update' : 'Create'} Category
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <h4 className="text-base font-semibold">All Categories</h4>
              <p className="text-sm text-neutral-500">Edit or remove categories as needed.</p>
            </div>

            {isLoading &&
              Array(3)
                .fill(0)
                .map((_, index) => <Skeleton key={index} className="h-20 w-full" />)}

            {!isLoading && categoryCount === 0 && (
              <Card className="w-full p-6 text-center text-sm text-neutral-500">
                No categories yet. Create your first blog category above.
              </Card>
            )}

            {!isLoading &&
              data?.blogCategories?.map((category) => (
                <Card key={category.id} className="w-full p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-semibold">{category.title}</h4>
                        <Badge
                          variant={category.status === 'ACTIVE' ? 'default' : 'secondary'}
                          className="uppercase"
                        >
                          {category.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-neutral-500">
                        Created {new Date(category.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(category)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setDeleteTarget(category)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="w-full max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete Blog Category</DialogTitle>
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

      <Dialog open={Boolean(deleteBlogTarget)} onOpenChange={() => setDeleteBlogTarget(null)}>
        <DialogContent className="w-full max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteBlogTarget?.title}&quot;? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteBlogTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deleteBlogMutation.isPending}
              onClick={() => deleteBlogTarget && deleteBlogMutation.mutate(deleteBlogTarget.id)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;
