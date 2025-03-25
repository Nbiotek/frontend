import { z } from 'zod';

export const addInventorySchema = z.object({
  items: z
    .object({
      name: z.string(),
      category: z.string(),
      stockQuantity: z.number(),
      unit: z.string(),
      reorderLevel: z.number(),
      supplierName: z.string(),
      supplierContact: z.string(),
      expiryDate: z.string()
    })
    .array()
});

export type TAddInventorySchema = z.infer<typeof addInventorySchema>;
