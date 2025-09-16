import mongoose from 'mongoose';
import { httpServer } from './app';
import config from './app/config';
import { seedSuperAdmin } from './seeders/superAdminSeeder';
import { NotificationService } from './modules/notifications/notifications.services';

async function main() {
  console.log(config.databaseUri);
  await mongoose.connect(config.databaseUri as string);

  // Initialize notification service with Socket.IO
  // Access io from httpServer with proper type assertion
  const io = (httpServer as any).io;
  if (io) {
    NotificationService.initialize(io);
  } else {
    console.error('Socket.IO server not initialized');
  }

  httpServer.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
}

main();
seedSuperAdmin();
