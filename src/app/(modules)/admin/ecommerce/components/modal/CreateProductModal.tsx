'use client';
import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { CreateProductSchema, TCreateProductSchema } from '../../validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Upload } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ECOMMERCE } from '@/constants/api';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import FilePreview from '@/components/common/FileUpload/FilePreview';
import { TRemoteFile } from '@/app/(modules)/lab-tech/tests/components/validation';
import { postCreateProduct, putUpdateProduct } from '@/requests/ecommerce';
import { useFetchCategories } from '@/hooks/admin/useFetchCategories';
import * as ToastLib from '@/atoms/Toast';

const CreateProductModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, productModal, setMediaMultiple }
  } = useStore();

  const queryClient = useQueryClient();
  const isEditMode = productModal.id !== '';
  const { data: categories } = useFetchCategories();

  const form = useForm<TCreateProductSchema>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: '',
      imageFiles: []
    },
    mode: 'onSubmit',
    resolver: zodResolver(CreateProductSchema),
    reValidateMode: 'onSubmit'
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'imageFiles'
  });

  const imageFiles = useWatch({ control: form.control, name: 'imageFiles' });

  // ── Stable refs so handleUpdate/handleRemove never change reference ─────────
  // FilePreview's useEffect lists `update` and `remove` as deps. If their
  // references change after an upload, the effect re-runs and triggers a
  // second upload. Using refs keeps those references rock-solid.
  const fieldsRef = useRef(fields);
  useLayoutEffect(() => {
    fieldsRef.current = fields;
  }, [fields]);

  const removeRef = useRef(remove);
  useLayoutEffect(() => {
    removeRef.current = remove;
  }, [remove]);

  // Upload results keyed by stable field ID (not index, which shifts on removal)
  const uploadedRef = useRef<Record<string, TRemoteFile>>({});
  const [uploadedMap, setUploadedMap] = useState<Record<string, TRemoteFile>>({});

  // Called by FilePreview when S3 upload completes.
  // We do NOT call useFieldArray.update() here — that would change the `file`
  // prop and cause FilePreview's useEffect to re-run (infinite re-upload).
  const handleUpdate = useCallback((index: number, remoteFile: TRemoteFile) => {
    const id = fieldsRef.current[index]?.id;
    if (!id) return;
    uploadedRef.current[id] = remoteFile;
    setUploadedMap({ ...uploadedRef.current });
  }, []);

  const handleRemove = useCallback((idx: number) => {
    const id = fieldsRef.current[idx]?.id;
    if (id) {
      delete uploadedRef.current[id];
      setUploadedMap({ ...uploadedRef.current });
    }
    removeRef.current(idx);
  }, []);

  // Auto-populate uploadedMap for remote files already in the form (edit mode)
  useEffect(() => {
    let changed = false;
    fields.forEach(({ id }, idx) => {
      const fileVal = imageFiles?.[idx]?.file;
      if (fileVal && !(fileVal instanceof File) && !uploadedRef.current[id]) {
        uploadedRef.current[id] = fileVal as TRemoteFile;
        changed = true;
      }
    });
    if (changed) setUploadedMap({ ...uploadedRef.current });
  }, [fields, imageFiles]);

  // Block submit while any field still lacks an uploaded remote file
  const hasUnprocessedImages = fields.some(({ id }) => !uploadedMap[id]);

  const handlerFn = (_files: File[]) => {
    append(_files.map((file) => ({ file })));
    toggleModals({ name: AppModals.FILE_UPLOAD_MODAL, open: false });
  };

  const invalidateProducts = () =>
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === ECOMMERCE.PRODUCTS
    });

  const createMutation = useMutation({
    mutationFn: postCreateProduct,
    onSuccess: () => {
      ToastLib.Toast.success('Product created successfully');
      invalidateProducts();
      handleCloseModal();
    },
    onError: () => {
      ToastLib.Toast.error('Failed to create product');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload
    }: {
      id: string;
      payload: Parameters<typeof putUpdateProduct>[1];
    }) => putUpdateProduct(id, payload),
    onSuccess: () => {
      ToastLib.Toast.success('Product updated successfully');
      invalidateProducts();
      handleCloseModal();
    },
    onError: () => {
      ToastLib.Toast.error('Failed to update product');
    }
  });

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const onSubmit: SubmitHandler<TCreateProductSchema> = (formData) => {
    const imageUrls = fields
      .map(({ id }) => uploadedMap[id]?.file)
      .filter((url): url is string => Boolean(url));

    const payload = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      categoryId: formData.categoryId || undefined,
      images: imageUrls.length ? imageUrls : undefined
    };

    if (isEditMode) {
      updateMutation.mutate({ id: productModal.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleCloseModal = () => {
    form.reset();
    uploadedRef.current = {};
    setUploadedMap({});
    toggleModals();
  };

  useEffect(() => {
    if (isEditMode && productModal.product) {
      const existingImages = (productModal.product.images ?? []).map((url) => ({
        file: { file: url, mime_type: 'image/jpeg', bucket: 'cloudinary', uuid: url } as TRemoteFile
      }));
      form.reset({
        name: productModal.product.name,
        description: productModal.product.description,
        price: productModal.product.price,
        stock: productModal.product.stock,
        categoryId: productModal.product.categoryId ?? '',
        imageFiles: existingImages
      });
    } else {
      form.reset({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        categoryId: '',
        imageFiles: []
      });
    }
    uploadedRef.current = {};
    setUploadedMap({});
  }, [isEditMode, productModal, form]);

  return (
    <XModal
      closeModal={handleCloseModal}
      bgClose={false}
      isOpen={isOpen.ADMIN_CREATE_PRODUCT}
      title={isEditMode ? 'Edit Product' : 'Add Product'}
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Vitamin C Supplement" {...field} />
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
                    <Textarea placeholder="Describe the product..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 2500"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 100"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full rounded-lg">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id} className="rounded-lg">
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Images */}
            <div className="flex flex-col space-y-2">
              <FormLabel>Product Images</FormLabel>

              <Button
                type="button"
                variant="outline"
                className="!h-[35px] w-fit !text-xs"
                onClick={() => {
                  setMediaMultiple(true);
                  toggleModals({
                    open: true,
                    name: AppModals.FILE_UPLOAD_MODAL,
                    handlerFn
                  });
                }}
              >
                <Upload size={15} className="mr-1" />
                Upload Images
              </Button>

              {fields.length > 0 && (
                <div className="mt-2 flex w-full flex-wrap gap-3">
                  {fields.map(({ id }, idx) => {
                    const fileValue = imageFiles?.[idx]?.file;
                    if (fileValue == null) return null;
                    return (
                      <FilePreview
                        key={id}
                        file={fileValue as any}
                        id={id}
                        idx={idx}
                        bucket="cloudinary"
                        remove={handleRemove}
                        update={handleUpdate}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <Button
                disabled={isLoading}
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-400"
                disabled={isLoading || hasUnprocessedImages}
              >
                {isLoading && <Loader className="animate-spin" />}
                {isEditMode ? 'Update' : 'Add'} Product
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(CreateProductModal);
