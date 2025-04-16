import { z } from 'zod';

export const testResultsSchema = z.object({
  data: z
    .object({
      parameter: z.string(),
      result: z.string(),
      range: z.string(),
      unit: z.string(),
      reference: z.string()
    })
    .array()
});

export type TTestResultsTypeSchema = z.infer<typeof testResultsSchema>;
