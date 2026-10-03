// ---------------- PWA service worker: web push ----------------
// Registered from src/push.js (navigator.serviceWorker.register('/sw.js')) and
// passed explicitly into Firebase's getToken() as the serviceWorkerRegistration,
// so this file doesn't need the firebase-messaging-compat SDK — an FCM web push
// arrives here as a plain Push API event carrying the message's JSON payload,
// which is handled directly below.
//
// This worker only reacts to pushes a server already sent; it does not schedule
// or send anything itself (see src/push.js for what else is still needed for a
// full per-day reminder scheduler).

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (err) {
    payload = {};
  }
  const notification = payload.notification || {};
  const data = payload.data || {};
  const title = notification.title || data.title || '말씀 묵상 저널';
  const options = {
    body: notification.body || data.body || '오늘의 말씀을 묵상할 시간이에요.',
    icon: notification.icon || '/icon-192.png',
    badge: '/icon-192.png',
    data: { url: data.url || '/?openToday=1' },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Clicking the notification focuses an already-open tab (and asks it to
// navigate to today's journal screen via postMessage, since this is a
// client-state SPA with no URL routing) or opens a new one with a query flag
// the app reads once on startup to land on the same screen.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/?openToday=1';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          if ('postMessage' in client) {
            client.postMessage({ type: 'open-today-journal' });
          }
          return;
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
