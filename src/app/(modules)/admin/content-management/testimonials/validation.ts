import { mediaFileSchema } from '@/app/(modules)/lab-tech/tests/components/validation';
import { z } from 'zod';

export const TestimonialAuthorSchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required.' })
    .trim()
    .min(2, { message: 'Full name is required.' }),
  role: z
    .string({ required_error: 'Role is required.' })
    .trim()
    .min(2, { message: 'Role is required.' }),
  media: z.array(mediaFileSchema, { required_error: 'Upload a author image' }).optional()
});

export const AdminTestimonialSchema = z.object({
  description: z
    .string({ required_error: 'Description is required.' })
    .trim()
    .min(2, { message: 'Description is required.' }),
  author: TestimonialAuthorSchema,
  rating: z.string({ required_error: 'Rating is required.' }),
  status: z
    .string({ required_error: 'Status is required.' })
    .trim()
    .min(2, { message: 'Status is required.' })
});

export type TAdminTestimonialSchema = z.infer<typeof AdminTestimonialSchema>;
