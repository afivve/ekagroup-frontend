import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBAUgpNXxFb3uLGPnLaCX7iKFGJHaQmpZM",
    authDomain: "notif-practice-74169.firebaseapp.com",
    projectId: "notif-practice-74169",
    storageBucket: "notif-practice-74169.firebasestorage.app",
    messagingSenderId: "322885226058",
    appId: "1:322885226058:web:2b3ee6e8ef7c897e73a0b3",
    measurementId: "G-JTL2T221ZJ",
};

// Cek apakah environment adalah browser
// @ts-ignore
let messaging;

if (typeof window !== "undefined") {
    const app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
}

// Fungsi untuk meminta token
export const requestNotificationPermission = async () => {
    // @ts-ignore
    if (!messaging) {
        console.warn("Messaging is not available in this environment.");
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered:', registration);

        const token = await getToken(messaging, {
            vapidKey: "BHz4tMV540elfZLaA7iKlExnfes7WQ3J_sw2uK_KTMtsO7FqwIBNFng33__-bmiQ-QTT1n9h5kfPXMjULrZPJTE",
            serviceWorkerRegistration: registration,
        });
        console.log("FCM Token:", token);
        return token;
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
};

// Tangani pesan saat aplikasi di foreground
// if (messaging) {
//     onMessage(messaging, (payload) => {
//         console.log("Foreground message received:", payload);
//     });
// }
