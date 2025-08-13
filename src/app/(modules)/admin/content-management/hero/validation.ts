import { mediaFileSchema } from '@/app/(modules)/lab-tech/tests/components/validation';
import { z } from 'zod';

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional()
});

export const AdminCreateHeroSchema = z.object({
  heading: z
    .string({ required_error: 'Hero heading is required.' })
    .trim()
    .min(2, { message: 'Hero heading is required.' }),
  tagline: z
    .string({ required_error: 'Hero tagline is required.' })
    .trim()
    .min(2, { message: 'Hero tagline is required.' })
});

export const AdminHeroCarouselSchema = z.object({
  title: z
    .string({ required_error: 'Title is required.' })
    .trim()
    .min(2, { message: 'Title is required.' }),
  description: z
    .string({ required_error: 'Description is required.' })
    .trim()
    .min(2, { message: 'Description is required.' }),
  linkTitle: z
    .string({ required_error: 'Link text is required.' })
    .trim()
    .min(2, { message: 'Link text is required.' }),
  linkStyle: z
    .string({ required_error: 'Link color is required.' })
    .trim()
    .min(2, { message: 'Link color is required.' }),
  link: z
    .string({ required_error: 'Link is required.' })
    .url({ message: 'Invalid link' })
    .trim()
    .min(2, { message: 'Link is required.' }),
  media: z.array(mediaFileSchema),
  status: z
    .string({ required_error: 'Status is required.' })
    .trim()
    .min(2, { message: 'Status is required.' })
});

export type TAdminCreateHeroSchema = z.infer<typeof AdminCreateHeroSchema>;
export type TAdminHeroCarouselSchema = z.infer<typeof AdminHeroCarouselSchema>;
