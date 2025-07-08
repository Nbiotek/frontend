'use client';
import { useEffect } from 'react';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { useStore } from '@/store';
import { useForm, useWatch } from 'react-hook-form';
import { NotificationSchema, TNotificationSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import InputToggle from '@/atoms/fields/InputToggle';
import store from 'store2';
import { Mangle } from '@/constants/mangle';
import { useMutation } from '@tanstack/react-query';
import { delNotificationToken } from '@/requests/notifications';
import toast from 'react-hot-toast';
import { setupFCM } from '@/app/fcm';

const NotificationView = () => {
  const {
    AuthStore: { user },
    NotificationStore: { openPrompt, clearFCMToken }
  } = useStore();

  const form = useForm<TNotificationSchema>({
    mode: 'onChange',
    defaultValues: {
      pushNotification: Boolean(store.local.get(Mangle.FCM_TOKEN.replace(':id', user.uuid!)))
    },
    resolver: zodResolver(NotificationSchema),
    reValidateMode: 'onSubmit'
  });
  const watch = useWatch({ control: form.control });

  const { mutate, isPending } = useMutation({
    mutationFn: delNotificationToken,
    onSuccess: () => {
      clearFCMToken();
      toast.success('Notification disabled');
    }
  });

  async function askForNotificationPermission() {
    if ('Notification' in window) {
      return Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setupFCM(user.uuid!);
          return true;
        } else {
          return false;
        }
      });
    } else {
      console.error('This browser does not support notifications.');
      return Promise.resolve(false);
    }
  }

  const handlePushNotificationChange = async (newValue: boolean) => {
    if (
      newValue &&
      Boolean(store.local.get(Mangle.FCM_TOKEN.replace(':id', user.uuid!))) === false
    ) {
      const permissionGranted = await askForNotificationPermission();
      form.setValue('pushNotification', permissionGranted);
    } else if (!newValue) {
      form.setValue('pushNotification', false);
      mutate();
    } else {
      form.setValue('pushNotification', true);
    }
  };

  return (
    <Form {...form}>
      <form className="flex w-full flex-col space-y-8 rounded-lg bg-white p-3">
        <fieldset disabled={isPending} className="flex w-full flex-col space-y-6 divide-y">
          <div className="">
            <SubTitle className="" text="Notifications" />
            <Paragraph text="Select the types of notifications you receive about your activities and recommendations." />
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
                      onChange={() => handlePushNotificationChange(!field.value)}
                    />
                  </div>
                );
              }}
            />
          </div>
        </fieldset>
      </form>
    </Form>
  );
};

export default NotificationView;
