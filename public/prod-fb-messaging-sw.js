importScripts('https://www.gstatic.com/firebasejs/11.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyAFwrZImLqktIZ6Ui44N5Gzbxn4sk6L6AA',
  authDomain: 'nbiotek-5328a.firebaseapp.com',
  projectId: 'nbiotek-5328a',
  storageBucket: 'nbiotek-5328a.firebasestorage.app',
  messagingSenderId: '762574865509',
  appId: '1:762574865509:web:8a6bfba4fb0fb1b2e8b28c'
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const ENotificationsTypes = {
  // ===== PATIENT NOTIFICATIONS =====
  // Appointment related
  APPOINTMENT_CREATED: 'APPOINTMENT_CREATED',
  APPOINTMENT_CONFIRMED: 'APPOINTMENT_CONFIRMED',
  APPOINTMENT_RESCHEDULED: 'APPOINTMENT_RESCHEDULED',
  APPOINTMENT_CANCELLED: 'APPOINTMENT_CANCELLED',
  APPOINTMENT_REMINDER: 'APPOINTMENT_REMINDER',

  // Test related
  TEST_RESULT_READY: 'TEST_RESULT_READY',
  TEST_SAMPLE_COLLECTED: 'TEST_SAMPLE_COLLECTED',
  TEST_IN_PROGRESS: 'TEST_IN_PROGRESS',
  TEST_COMPLETED: 'TEST_COMPLETED',

  // Payment related
  PAYMENT_SUCCESSFUL: 'PAYMENT_SUCCESSFUL',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PAYMENT_REFUNDED: 'PAYMENT_REFUNDED',
  BILLING_REMINDER: 'BILLING_REMINDER',

  // Profile & Account
  PROFILE_UPDATED: 'PROFILE_UPDATED',
  ACCOUNT_VERIFIED: 'ACCOUNT_VERIFIED',
  PASSWORD_CHANGED: 'PASSWORD_CHANGED',

  // ===== LAB COORDINATOR NOTIFICATIONS =====
  // Test Management
  NEW_TEST_REQUEST: 'NEW_TEST_REQUEST',
  TEST_ASSIGNED: 'TEST_ASSIGNED',
  TEST_REASSIGNED: 'TEST_REASSIGNED',
  TEST_QUALITY_CONTROL_PENDING: 'TEST_QUALITY_CONTROL_PENDING',
  TEST_QUALITY_CONTROL_PASSED: 'TEST_QUALITY_CONTROL_PASSED',
  TEST_QUALITY_CONTROL_FAILED: 'TEST_QUALITY_CONTROL_FAILED',

  // Quality Control
  QC_TEST_PENDING: 'QC_TEST_PENDING',
  QC_TEST_COMPLETED: 'QC_TEST_COMPLETED',
  QC_TEST_FAILED: 'QC_TEST_FAILED',

  // ===== LAB TECHNICIAN NOTIFICATIONS =====
  // Test Assignment
  TEST_ASSIGNED_TO_TECHNICIAN: 'TEST_ASSIGNED_TO_TECHNICIAN',
  TEST_REASSIGNED_TO_TECHNICIAN: 'TEST_REASSIGNED_TO_TECHNICIAN',
  URGENT_TEST_ASSIGNED: 'URGENT_TEST_ASSIGNED',

  // Test Processing
  TEST_COMPLETION_REMINDER: 'TEST_COMPLETION_REMINDER',
  TEST_DEADLINE_APPROACHING: 'TEST_DEADLINE_APPROACHING',
  TEST_OVERDUE: 'TEST_OVERDUE',

  // Staff Coordination
  DOCTOR_AVAILABILITY_CHANGED: 'DOCTOR_AVAILABILITY_CHANGED',
  STAFF_ABSENCE_NOTIFIED: 'STAFF_ABSENCE_NOTIFIED'
};

const getActionURL = (type, reference_id) => {
  let path = '/';

  // TODO: build url path based off notification types.

  return new URL(path, self.location.origin).href;
};

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);

  if (!payload.notification && !payload.data) {
    console.warn(
      '[firebase-messaging-sw.js] Received background message with no notification or data.'
    );
    return;
  }

  const clickActionUrl = getActionURL(payload.data?.type, payload.data?.reference_id);

  const notificationTitle = payload.notification?.title || payload.data?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body,
    icon: payload.notification?.image || payload.data?.icon || '/favicon-32x32.png',
    data: {
      url: clickActionUrl,
      ...payload.data
    }
  };

  // Show the notification
  self.registration
    .showNotification(notificationTitle, notificationOptions)
    .then(() => {
      console.log('[firebase-messaging-sw.js] Notification shown.');
    })
    .catch((err) => {
      console.error('[firebase-messaging-sw.js] Error showing notification:', err);
    });
});

self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received.', event.notification);

  const clickedUrl = event.notification.data?.url;

  if (!clickedUrl) {
    console.warn('[firebase-messaging-sw.js] No URL found in notification data to open.');
    return;
  }

  const absoluteUrl = new URL(clickedUrl, self.location.origin).href;

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === absoluteUrl && 'focus' in client) {
            console.log('[firebase-messaging-sw.js] Focusing existing window:', absoluteUrl);
            return client.focus();
          }
        }
        if (clients.openWindow) {
          console.log('[firebase-messaging-sw.js] Opening new window:', absoluteUrl);
          return clients.openWindow(absoluteUrl);
        }
      })
      .catch((err) => {
        console.error('[firebase-messaging-sw.js] Error handling notification click:', err);
      })
  );
});

self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('[firebase-messaging-sw.js] Push subscription changed.');
});

self.addEventListener('install', (event) => {
  console.log('[firebase-messaging-sw.js] Installed.');
});

self.addEventListener('activate', (event) => {
  console.log('[firebase-messaging-sw.js] Activated.');
});
