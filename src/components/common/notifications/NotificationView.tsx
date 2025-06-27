'use client';
import Button from '@/atoms/Buttons';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { Switch } from '@/components/ui/switch';
import { useStore } from '@/store';
import { useForm } from 'react-hook-form';
import { NotificationSchema, TNotificationSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import InputToggle from '@/atoms/fields/InputToggle';

const NotificationView = () => {
  const {
    AuthStore: { user }
  } = useStore();

  const form = useForm<TNotificationSchema>({
    mode: 'onChange',
    resolver: zodResolver(NotificationSchema),
    reValidateMode: 'onSubmit'
  });

  return (
    <Form {...form}>
      <form className="flex w-full flex-col space-y-8 rounded-lg bg-white p-3">
        <fieldset className="flex w-full flex-col space-y-6 divide-y">
          <div className="">
            <SubTitle className="" text="Notifications" />
            <Paragraph text="Select the types of notifications you receive about your activities and recommendations." />
          </div>

          <div className="flex flex-col space-y-4 py-3">
            <SubTitle className="!mb-0" text="Test Alerts" />
            {
              <FormField
                control={form.control}
                name="newTestOrder"
                render={({ field }) => {
                  return (
                    <div className="w-full max-w-xl">
                      <InputToggle
                        label="New test order"
                        description="Alert when new tests are assigned."
                        checked={field.value}
                        onChange={() => form.setValue('newTestOrder', !field.value)}
                      />
                    </div>
                  );
                }}
              />
            }

            <FormField
              control={form.control}
              name="urgentResult"
              render={({ field }) => {
                return (
                  <div className="w-full max-w-xl">
                    <InputToggle
                      label="Urgent result request"
                      description="Notifications for high-priority tests or abnormal results."
                      checked={field.value}
                      onChange={() => form.setValue('urgentResult', !field.value)}
                    />
                  </div>
                );
              }}
            />

            <FormField
              control={form.control}
              name="testCompletionReminder"
              render={({ field }) => {
                return (
                  <div className="w-full max-w-xl">
                    <InputToggle
                      label="Test completion reminder"
                      description="Reminders for pending or delayed tests."
                      checked={field.value}
                      onChange={() => form.setValue('testCompletionReminder', !field.value)}
                    />
                  </div>
                );
              }}
            />
          </div>

          <div className="flex flex-col space-y-4 py-3">
            <SubTitle className="!mb-0" text="Task Management" />
            {
              <FormField
                control={form.control}
                name="tasksAndWorkflow"
                render={({ field }) => {
                  return (
                    <div className="w-full max-w-xl">
                      <InputToggle
                        label="Tasks and workflow"
                        description="Notify when tasks are assigned."
                        checked={field.value}
                        onChange={() => form.setValue('tasksAndWorkflow', !field.value)}
                      />
                    </div>
                  );
                }}
              />
            }
          </div>

          <div className="flex flex-col space-y-4 py-3">
            <SubTitle className="!mb-0" text="Communication Preferences" />
            <FormField
              control={form.control}
              name="emailNotification"
              render={({ field }) => {
                return (
                  <div className="w-full max-w-xl">
                    <InputToggle
                      label="Email Notification"
                      description="Get emails to find out what is going on when you are not online."
                      checked={field.value}
                      onChange={() => form.setValue('emailNotification', !field.value)}
                    />
                  </div>
                );
              }}
            />

            <FormField
              control={form.control}
              name="pushNotification"
              render={({ field }) => {
                return (
                  <div className="w-full max-w-xl">
                    <InputToggle
                      label="Push Notification"
                      description="Get push notification in-app to find out what is going on when you are online."
                      checked={field.value}
                      onChange={() => form.setValue('pushNotification', !field.value)}
                    />
                  </div>
                );
              }}
            />
          </div>
        </fieldset>
        <div className="flex w-full max-w-[450px] flex-col space-y-3 sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0">
          <Button variant="outlined" text="Cancel" />
          <Button variant="filled" text="update changes" />
        </div>
      </form>
    </Form>
  );
};

export default NotificationView;
