// lib/websocket.js
// @ts-ignore
export function connectToWebSocket(url, callback) {
    const ws = new WebSocket(url);

    ws.onopen = () => {
        console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        callback(data);
    };

    ws.onclose = () => {
        console.log("WebSocket disconnected, attempting to reconnect...");
        setTimeout(() => connectToWebSocket(url, callback), 5000);
    };

    ws.onerror = (error) => {
        console.error("WebSocket error", error);
        ws.close();
    };

    return ws;
}
