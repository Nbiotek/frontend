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
    price: z.number({ required_error: 'Enter an amount.' }),
    discountedPrice: z.number({ required_error: 'Enter an amount.' }).optional()
  })
  .superRefine((data, ctx) => {
    const { price, discountedPrice } = data;

    if (discountedPrice) {
      if (discountedPrice > price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "discounted price can't be more than actual price",
          path: ['discountedPrice']
        });
      }
    }
  });

export const AdminPackageTestSchema = z
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
    testIds: z.array(optionSchema, { required_error: 'Tests is required' }),
    price: z.number({ required_error: 'Enter an amount.' }).optional(),
    discountedPrice: z.number({ required_error: 'Enter an amount.' }).optional()
  })
  .superRefine((data, ctx) => {
    const { price, discountedPrice } = data;

    if (discountedPrice && price) {
      if (discountedPrice > price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "discounted price can't be more than actual price",
          path: ['discountedPrice']
        });
      }
    }
  });

export type TAdminSingleTestSchema = z.infer<typeof AdminSingleTestSchema>;

export type TAdminPackageTestSchema = z.infer<typeof AdminPackageTestSchema>;
