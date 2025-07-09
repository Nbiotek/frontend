import { z } from 'zod';

export const NotificationSchema = z
  .object({
    pushNotification: z.boolean(),
    emailNotification: z.boolean()
  })
  .partial();

export type TNotificationSchema = z.infer<typeof NotificationSchema>;
