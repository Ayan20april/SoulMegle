import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { setupSocketIO } from './controllers/chat.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Minimal API (optional)
app.get('/', (req, res) => res.send('SoulMegle Backend'));

// WebSocket chat and matching
setupSocketIO(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));