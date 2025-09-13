import { Server } from 'socket.io';
import { NotificationsModel } from './notifications.model';

export class NotificationService {
  private static io: Server;

  static initialize(io: Server) {
    NotificationService.io = io;
    console.log('NotificationService initialized with Socket.IO');
  }

  static async createNotification(
    message: string,
    userEmail: string,
    context: any = {},
  ) {
    try {
      const notification = await NotificationsModel.create({
        message,
        userEmail,
        isNew: true,
        ...context,
      });

      if (NotificationService.io) {
        NotificationService.io.to(userEmail).emit('new-notification', notification);
        console.log(`Real-time notification sent to ${userEmail}`);
      }

      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  static async markAsRead(notificationId: string, userEmail: string) {
    return await NotificationsModel.findOneAndUpdate(
      { _id: notificationId, userEmail },
      { isNew: false },
      { new: true },
    );
  }

  static async getUserNotifications(userEmail: string) {
    return await NotificationsModel.find({ userEmail })
      .sort({ createdAt: -1 })
      .limit(50);
  }

  static async markAllAsRead(userEmail: string) {
    return await NotificationsModel.updateMany(
      { userEmail, isNew: true },
      { isNew: false }
    );
  }
}