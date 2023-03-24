import WebSocket from 'ws'

let webSocketInstance = null;

function createWebSocket(name) {
  if (!webSocketInstance) {
    webSocketInstance = new WebSocket(`wss://chat-konb.up.railway.app/chat?name=${name}`);
  }
  return webSocketInstance;
}

export function subscribeToChat(onMessageReceived, name) {
  const ws = createWebSocket(name);
  ws.on('message', data => onMessageReceived(data));
  ws.on('error', err => console.error(err));
  ws.on('close', () => console.log("WebSocket closed"));
  return ws;
}
