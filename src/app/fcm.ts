import app from './firebaseInit';
import { env } from '@/env';
import { postNotificationToken } from '@/requests/notifications';
import {
  getMessaging,
  onMessage,
  isSupported,
  getToken,
  Messaging,
  MessagePayload
} from 'firebase/messaging';
import { FirebaseApp } from 'firebase/app';
import { Mangle } from '@/constants/mangle';

class FCM {
  FCM_TOKEN_PREFIX = Mangle.FCM_TOKEN as const;
  app: FirebaseApp;
  messaging: Messaging | null = null;

  constructor(_app: FirebaseApp) {
    this.app = _app;
    isSupported().then((supported) => {
      if (supported) {
        this.messaging = getMessaging(this.app);
      } else {
        console.warn('Firebase Cloud Messaging is not supported in this browser environment.');
      }
    });
  }

  private registerServiceWorker = async (): Promise<ServiceWorkerRegistration | void> => {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Workers are not supported by this browser.');
      return;
    }
    try {
      const swOptions = {
        scope: '/'
      };

      const swFileName =
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
          ? '/prod-fb-messaging-sw.js'
          : '/firebase-messaging-sw.js';

      const registration = await window.navigator.serviceWorker.register(swFileName, swOptions);
      console.info('Service Worker registered successfully with scope:', registration.scope);

      await registration.update();
      console.info('Service Worker update attempted.');
      return registration;
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  };

  private getActionURL = (type: string | undefined, reference_id: string | undefined): string => {
    if (!type || !reference_id) return '';

    return '/';
  };

  private showForegroundNotification = (payload: MessagePayload) => {
    if (!payload.notification) {
      console.warn('Foreground message received without notification payload:', payload);
      return;
    }

    const { title, body, image } = payload.notification;
    const notificationTitle = title ?? 'New Notification';

    const notificationOptions: NotificationOptions = {
      body: body,
      icon: image,
      data: payload.data
    };

    const notification = new window.Notification(notificationTitle, notificationOptions);

    notification.onclick = (event) => {
      event.preventDefault();
      const type = payload.data?.type as string | undefined;
      const referenceId = payload.data?.reference_id as string | undefined;

      const actionUrl = this.getActionURL(type, referenceId);

      if (actionUrl) {
        const absoluteUrl = new URL(actionUrl, window.location.origin).href;
        window.open(absoluteUrl, '_blank')?.focus();
      }
      notification.close();
    };
  };

  private initializePermissionsAndToken = async (tokenKey: string): Promise<string | null> => {
    if (!this.messaging) {
      console.warn('FCM Messaging is not initialized.');
      return null;
    }

    let permission = window.Notification.permission;

    if (permission === 'denied') {
      console.warn(
        'Notification permissions are blocked by the user. Please enable them in browser settings.'
      );
      return null;
    }

    if (permission === 'default') {
      console.info('Requesting notification permission from user...');
      permission = await window.Notification.requestPermission();
    }

    if (permission === 'granted') {
      console.info('Notification permission granted.');
      const serviceWorkerRegistration = await this.registerServiceWorker();
      if (!serviceWorkerRegistration) {
        console.warn('Failed to register Service Worker, cannot get FCM token.');
        return null;
      }

      try {
        console.log('Attempting to get FCM token...');
        const currentToken = await getToken(this.messaging, {
          vapidKey: env.NEXT_PUBLIC_FIREBASE_VAPID,
          serviceWorkerRegistration
        });

        if (currentToken) {
          console.info('FCM token retrieved:', currentToken);
          const storedToken = window.localStorage.getItem(tokenKey);

          if (currentToken !== storedToken) {
            console.info('New or updated FCM token. Sending to backend...');
            await postNotificationToken({ token: currentToken });
            window.localStorage.setItem(tokenKey, currentToken);
            console.info('FCM token sent to backend and stored locally.');
          } else {
            console.info('FCM token is current and already stored.');
          }
          return currentToken;
        } else {
          console.warn('Failed to get FCM token even with granted permission and SW registration.');
          return null;
        }
      } catch (err) {
        console.warn('Error retrieving FCM token:', err);
        return null;
      }
    } else {
      console.warn('Notification permission not granted by user:', permission);
      return null;
    }
  };

  public setupFCM = async (user_uuid: string | null | undefined) => {
    if (!user_uuid) {
      console.log('User not authenticated. FCM setup skipped.');
      return;
    }

    const fcmSupported = await isSupported();
    if (!fcmSupported) {
      console.log('Firebase Cloud Messaging is not supported by this browser.');
      return;
    }

    if (!this.messaging) {
      console.info('FCM Messaging not available. Setup aborted.');
      return;
    }

    const tokenKey = this.FCM_TOKEN_PREFIX.replace(':id', user_uuid);

    await this.initializePermissionsAndToken(tokenKey);

    onMessage(this.messaging, (payload) => {
      console.log('Foreground FCM message received:', payload);
      this.showForegroundNotification(payload);
    });
  };
}

const fcmInstance = new FCM(app);
export const setupFCM = fcmInstance.setupFCM;
