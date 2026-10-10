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

// Fallback title/body when a push carries no text of its own, in the app's UI
// language. The page posts its language here (src/push.js
// sendLanguageToServiceWorker) and it is kept in Cache Storage, since a worker
// has no localStorage and may be restarted between pushes.
const DEFAULT_TEXT = {
  ko: { title: '말씀 묵상 저널', body: '오늘의 말씀을 묵상할 시간이에요.' },
  en: { title: 'Bible Devotion Journal', body: "It's time to meditate on today's Word." },
  ja: { title: '聖書黙想ジャーナル', body: '今日の御言葉を黙想する時間です。' },
  th: { title: 'สมุดบันทึกเฝ้าเดี่ยวพระคัมภีร์', body: 'ถึงเวลาใคร่ครวญพระวจนะวันนี้แล้ว' },
  zh: { title: '话语灵修笔记', body: '该默想今天的话语了。' },
};
const META_CACHE = 'app-meta';
const LANG_KEY = '/__app-lang';

self.addEventListener('message', (event) => {
  const msg = event.data || {};
  if (msg.type === 'set-lang' && DEFAULT_TEXT[msg.lang]) {
    event.waitUntil(
      caches.open(META_CACHE).then((cache) => cache.put(LANG_KEY, new Response(msg.lang)))
    );
  }
});

function readLang() {
  return caches.open(META_CACHE)
    .then((cache) => cache.match(LANG_KEY))
    .then((res) => (res ? res.text() : 'ko'))
    .catch(() => 'ko');
}

self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (err) {
    payload = {};
  }
  const notification = payload.notification || {};
  const data = payload.data || {};
  event.waitUntil(readLang().then((lang) => {
    const fallback = DEFAULT_TEXT[lang] || DEFAULT_TEXT.ko;
    const title = notification.title || data.title || fallback.title;
    const options = {
      body: notification.body || data.body || fallback.body,
      data: { url: data.url || '/?openToday=1' },
    };
    const icon = notification.icon || data.icon;
    if (icon) options.icon = icon;
    return self.registration.showNotification(title, options);
  }));
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
