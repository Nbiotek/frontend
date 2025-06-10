import { z } from 'zod';

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional()
});

export const AdminSingleTestSchema = z
  .object({
    name: z
      .string({ required_error: 'Test name is required.' })
      .trim()
      .min(2, { message: 'Test name is required.' }),
    description: z
      .string({ required_error: 'Test description is required.' })
      .trim()
      .min(2, { message: 'Test description is required.' }),
    requirements: z.string().trim().optional(),
    category: z
      .string({ required_error: 'Test category is required.' })
      .trim()
      .min(2, { message: 'Test category is required.' }),
    price: z
      .string({ required_error: 'Enter an amount.' })
      .trim()
      .min(0, { message: "Price amount can't be 0." })
      .transform((val) => val.replace(/[^0-9]/g, ''))
      .refine((val) => val !== '', { message: 'Enter price.' })
      .refine((val) => !val.startsWith('0'), { message: "Price can't start with 0." }),
    discountedPrice: z
      .string({ required_error: 'Enter an amount.' })
      .trim()
      .transform((val) => val.replace(/[^0-9]/g, ''))
      .optional()
  })
  .superRefine((data, ctx) => {
    const { price, discountedPrice } = data;

    if (discountedPrice) {
      if (parseInt(discountedPrice) > parseInt(price)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "discounted price can't be more than actual price",
          path: ['discountedPrice']
        });
      }
    }
  });

export const AdminPackageTestSchema = z.object({
  name: z
    .string({ required_error: 'Test name is required.' })
    .trim()
    .min(2, { message: 'Test name is required.' }),
  description: z
    .string({ required_error: 'Test description is required.' })
    .trim()
    .min(2, { message: 'Test description is required.' }),
  requirements: z.string().trim().optional(),
  testIds: z.array(optionSchema, { required_error: 'Tests is required' })
});

export type TAdminSingleTestSchema = z.infer<typeof AdminSingleTestSchema>;

export type TAdminPackageTestSchema = z.infer<typeof AdminPackageTestSchema>;
