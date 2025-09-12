import { Server } from 'socket.io';
import { NotificationsModel } from './notifications.model';

export class NotificationService {
  private static io: Server;

  static initialize(io: Server) {
    NotificationService.io = io;
  }

  static async createNotification(
    message: string,
    userEmail: string,
    context: any = {},
  ) {
    try {
      // Save notification to database
      const notification = await NotificationsModel.create({
        message,
        userEmail,
        isNew: true,
        ...context,
      });

      // Send real-time notification to specific user
      if (NotificationService.io) {
        NotificationService.io
          .to(userEmail)
          .emit('new-notification', notification);
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
      .limit(20);
  }
}
