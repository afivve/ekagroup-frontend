importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBAUgpNXxFb3uLGPnLaCX7iKFGJHaQmpZM",
    authDomain: "notif-practice-74169.firebaseapp.com",
    projectId: "notif-practice-74169",
    storageBucket: "notif-practice-74169.firebasestorage.app",
    messagingSenderId: "322885226058",
    appId: "1:322885226058:web:2b3ee6e8ef7c897e73a0b3",
    measurementId: "G-JTL2T221ZJ"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Tangani pesan di background
messaging.onBackgroundMessage((payload) => {
    console.log('Pesan di background:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo.png",
        data: { url: payload.data?.url }, // Tambahkan URL ke data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Tangani klik pada notifikasi
self.addEventListener('notificationclick', (event) => {
    console.log('Notifikasi diklik:', event);
    event.notification.close(); // Tutup notifikasi

    const url = event.notification.data?.url || '/'; // URL tujuan
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Jika sudah ada tab dengan URL yang sama, fokuskan tab tersebut
            for (const client of clientList) {
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // Jika tidak ada tab dengan URL yang sama, buka tab baru
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
