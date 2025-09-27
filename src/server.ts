import mongoose from 'mongoose';
import { httpServer } from './app';
import config from './app/config';
import { seedSuperAdmin } from './seeders/superAdminSeeder';
import { NotificationService } from './modules/notifications/notifications.services';
import { ActivityService } from './modules/activity/activity.service';

async function main() {
  console.log(config.databaseUri);
  await mongoose.connect(config.databaseUri as string);

  // Initialize notification service with Socket.IO
  // Access io from httpServer with proper type assertion
  const io = (httpServer as any).io;
  if (io) {
    NotificationService.initialize(io);
    ActivityService.initialize(io);
  } else {
    console.error('Socket.IO server not initialized');
  }

  httpServer.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
}

main();
seedSuperAdmin();

// import mongoose from 'mongoose';
// import { httpServer, io } from './app';
// import config from './app/config';
// import { seedSuperAdmin } from './seeders/superAdminSeeder';
// import { NotificationService } from './modules/notifications/notifications.services';
// import { ActivityService } from './modules/activity/activity.service';

// async function main() {
//   try {
//     await mongoose.connect(config.databaseUri as string);
//     console.log('Connected to MongoDB');

//     // Initialize services with the same Socket.IO instance
//     NotificationService.initialize(io);
//     ActivityService.initialize(io);

//     httpServer.listen(config.port, () =>
//       console.log(`Server running on http://localhost:${config.port}`),
//     );

//     // Seed super admin if not already present
//     await seedSuperAdmin();
//   } catch (error) {
//     console.error('Error starting server:', error);
//     process.exit(1);
//   }
// }

// main();
