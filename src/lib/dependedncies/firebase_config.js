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

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Messaging
const messaging = getMessaging(app);

export { app, messaging, getToken, onMessage };
