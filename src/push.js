// ---------------- client-side push notification registration ----------------
// Wires the existing day-by-day reminder toggle UI (legacyApp.js) to:
//   1) the browser Notification permission prompt, and
//   2) an FCM registration token for this browser (saved to users/{uid}.fcmToken
//      by the caller via firestore/users.js's updateFcmToken).
//
// What this file intentionally does NOT do: send any push notification. FCM
// tokens only let a server push TO this browser later — actually firing a
// notification at each user's chosen per-day time requires a server-side
// scheduler (e.g. a Cloud Function on a Pub/Sub schedule) calling
// admin.messaging().send() with that token, which isn't set up in this repo.
// Once VITE_FIREBASE_VAPID_KEY is added to .env.local (Firebase Console >
// Project settings > Cloud Messaging > Web Push certificates) and a scheduler
// is deployed, the pieces here are what the scheduler needs to target this
// browser: a saved fcmToken plus users/{uid}.notificationSettings.
import { getMessaging, getToken, isSupported } from 'firebase/messaging';
import { app } from './firebase.js';

let swRegistrationPromise = null;

/** Registers (or reuses) public/sw.js. Resolves to null if unsupported or it fails. */
export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return Promise.resolve(null);
  if (!swRegistrationPromise) {
    swRegistrationPromise = navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.error('[push] service worker registration failed:', err);
      return null;
    });
  }
  return swRegistrationPromise;
}

/**
 * Requests Notification permission (no-ops if the user already answered that
 * prompt before — the browser just returns the stored decision) and, if
 * granted and a VAPID key is configured, fetches an FCM token for this browser.
 * @returns {Promise<{permission:string, token:string|null}>}
 */
export async function ensurePushRegistration() {
  if (typeof Notification === 'undefined') {
    return { permission: 'unsupported', token: null };
  }
  let permission = Notification.permission;
  if (permission === 'default') {
    try {
      permission = await Notification.requestPermission();
    } catch (err) {
      console.error('[push] permission request failed:', err);
    }
  }
  if (permission !== 'granted') return { permission, token: null };

  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
  if (!vapidKey) {
    console.warn(
      '[push] VITE_FIREBASE_VAPID_KEY is not set — skipping FCM token registration. ' +
      'Generate one in Firebase Console > Project settings > Cloud Messaging > Web Push ' +
      'certificates and add it to .env.local to enable push tokens.'
    );
    return { permission, token: null };
  }

  try {
    const supported = await isSupported().catch(() => false);
    if (!supported) return { permission, token: null };
    const registration = await registerServiceWorker();
    if (!registration) return { permission, token: null };
    const messaging = getMessaging(app);
    const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration });
    return { permission, token: token || null };
  } catch (err) {
    console.error('[push] getToken failed:', err);
    return { permission, token: null };
  }
}
