import express from 'express';
import cors from 'cors';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import router from './routes/routes';
import { ActivityService } from './modules/activity/activity.service';

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
  socket.on('join-user-room', async ({ userEmail, userName, userId }) => {
    if (!userEmail) return;

    socket.join(userEmail);
    console.log(`User ${userName} (${userEmail}) joined their room`);

    try {
      await ActivityService.markUserOnline({
        userEmail,
        userName,
        userId,
        socketId: socket.id,
      });
    } catch (err) {
      console.error('Error marking user online:', err);
    }
  });

  socket.on('disconnect', async () => {
    console.log('User disconnected:', socket.id);
    try {
      await ActivityService.markUserOffline(socket.id);
    } catch (err) {
      console.error('Error marking user offline:', err);
    }
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

// import express from 'express';
// import cors from 'cors';
// import { createServer } from 'http';
// import { Server as SocketIOServer } from 'socket.io';
// import router from './routes/routes';

// const app = express();
// const httpServer = createServer(app);

// const io = new SocketIOServer(httpServer, {
//   cors: {
//     origin: process.env.CLIENT_URL || 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/api/v1', router);

// app.get('/', (_req, res) => res.send('Hello world'));

// // Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('join-user-room', ({ userEmail, userId, userName }) => {
//     if (!userEmail) return;
//     socket.join(userEmail);
//     console.log(`User joined room: ${userEmail}`);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// export { app, httpServer, io };
