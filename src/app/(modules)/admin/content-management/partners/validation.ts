import { mediaFileSchema } from '@/app/(modules)/lab-tech/tests/components/validation';
import { z } from 'zod';

export const AdminCreatePartnerSchema = z.object({
  status: z
    .string({ required_error: 'Status is required.' })
    .trim()
    .min(2, { message: 'Status is required.' }),
  media: z.array(mediaFileSchema, { required_error: 'Upload a file' })
});

export type TAdminCreatePartnerSchema = z.infer<typeof AdminCreatePartnerSchema>;
