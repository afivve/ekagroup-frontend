// @ts-nocheck
import { writable } from "svelte/store";

export const notifications = writable([]); // Store untuk daftar notifikasi
export const notificationsLength = writable(0); // Store untuk jumlah notifikasi belum dibaca

let ws; // Variabel global untuk WebSocket

export function initWebSocket(userId) {
    if (ws) {
        console.log("WebSocket sudah terhubung.");
        return; // Hindari membuat koneksi baru jika sudah ada
    }

    ws = new WebSocket(`ws://localhost:8000/ws/notifications?user_id=${userId}`);

    ws.onopen = () => {
        console.log("WebSocket terhubung.");
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.unread_count !== undefined) {
            // Update jumlah notifikasi belum dibaca
            notificationsLength.set(data.unread_count);
        }

        if (data.notification) {
            // Tambahkan notifikasi baru ke dalam store
            notifications.update((current) => [data.notification, ...current]);
        }
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
        console.log("WebSocket terputus.");
        ws = null; // Reset koneksi agar bisa diinisialisasi ulang
    };
}

export function closeWebSocket() {
    if (ws) {
        ws.close();
        ws = null;
    }
}
