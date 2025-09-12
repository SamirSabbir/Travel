import { Server as SocketIOServer } from 'socket.io';

declare module 'http' {
  interface Server {
    io?: SocketIOServer;
  }
}

declare global {
  namespace Express {
    interface Application {
      io?: SocketIOServer;
    }
  }
}