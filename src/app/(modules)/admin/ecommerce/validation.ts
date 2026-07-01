import { z } from 'zod';
import { mediaFileSchema } from '@/app/(modules)/lab-tech/tests/components/validation';

export const CreateProductSchema = z.object({
  name: z
    .string({ required_error: 'Product name is required.' })
    .trim()
    .min(2, { message: 'Product name must be at least 2 characters.' }),
  description: z
    .string({ required_error: 'Description is required.' })
    .trim()
    .min(5, { message: 'Description must be at least 5 characters.' }),
  price: z
    .number({ required_error: 'Price is required.', invalid_type_error: 'Price must be a number.' })
    .positive({ message: 'Price must be greater than 0.' }),
  stock: z
    .number({ required_error: 'Stock is required.', invalid_type_error: 'Stock must be a number.' })
    .int({ message: 'Stock must be a whole number.' })
    .min(0, { message: 'Stock cannot be negative.' }),
  categoryId: z.string().uuid({ message: 'Invalid category.' }).optional().or(z.literal('')),
  // Each entry is { file: File } during upload and { file: TRemoteFile } after upload completes
  imageFiles: z.array(mediaFileSchema).optional()
});

export type TCreateProductSchema = z.infer<typeof CreateProductSchema>;

export const CreateOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid({ message: 'Invalid product.' }),
        quantity: z
          .number({ invalid_type_error: 'Quantity must be a number.' })
          .int()
          .positive({ message: 'Quantity must be at least 1.' })
      })
    )
    .min(1, { message: 'At least one item is required.' }),
  shippingAddress: z.object({
    street: z.string().min(2, { message: 'Street is required.' }),
    city: z.string().min(2, { message: 'City is required.' }),
    state: z.string().min(2, { message: 'State is required.' }),
    zipCode: z.string().min(2, { message: 'Zip code is required.' })
  })
});

export type TCreateOrderSchema = z.infer<typeof CreateOrderSchema>;

export const CreateCategorySchema = z.object({
  name: z
    .string({ required_error: 'Category name is required.' })
    .trim()
    .min(2, { message: 'Category name must be at least 2 characters.' }),
  description: z
    .string({ required_error: 'Description is required.' })
    .trim()
    .min(5, { message: 'Description must be at least 5 characters.' })
});

export type TCreateCategorySchema = z.infer<typeof CreateCategorySchema>;
