// TigerFit Service Worker - 푸시 알림 처리
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyCvVJLfkir1jjcdlELRRCuSos5OTv7wt-o",
  authDomain:        "ironlog-pro.firebaseapp.com",
  projectId:         "ironlog-pro",
  storageBucket:     "ironlog-pro.firebasestorage.app",
  messagingSenderId: "945747917181",
  appId:             "1:945747917181:web:456d119c8a57a70af73414"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || '🐯 TigerFit', {
    body: body || '새 알림이 있어요!',
    icon: '/ironlog-pro/icon.png',
    badge: '/ironlog-pro/icon.png',
    vibrate: [200, 100, 200],
    tag: 'tigerfit-notification',
    renotify: true,
    data: payload.data || {}
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('ironlog-pro') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('https://yuchang20310-ui.github.io/ironlog-pro');
    })
  );
});
