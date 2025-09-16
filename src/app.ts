import express from 'express';
import cors from 'cors';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import router from './routes/routes';

const app = express();
const httpServer: HTTPServer = createServer(app);

// Initialize Socket.IO
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Add io to httpServer for access in server.ts
(httpServer as any).io = io;

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room based on user email for targeted notifications
  socket.on('join-user-room', (userEmail) => {
    socket.join(userEmail);
    console.log(`User ${userEmail} joined their room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io accessible to other parts of your app
app.set('socketio', io);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/v1', router);

// Export both app and httpServer
export { app, httpServer, io };
