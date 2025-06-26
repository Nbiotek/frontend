import { z } from 'zod';

export const NotificationSchema = z
  .object({
    pushNotification: z.boolean(),
    testCompletionReminder: z.boolean(),
    emailNotification: z.boolean(),
    newTestOrder: z.boolean(),
    urgentResult: z.boolean(),
    tasksAndWorkflow: z.boolean()
  })
  .partial();

export type TNotificationSchema = z.infer<typeof NotificationSchema>;
