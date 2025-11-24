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
        newIs: true,
        ...context,
      });

      if (NotificationService.io) {
        NotificationService.io
          .to(userEmail)
          .emit('new-notification', notification);
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
      { newIs: false },
      { new: true },
    );
  }

  // Get unread notifications count
  static async getUnreadCount(userEmail: string) {
    return await NotificationsModel.countDocuments({
      userEmail,
      newIs: true,
    });
  }

  // Updated with pagination
  static async getUserNotifications(
    userEmail: string,
    page: number = 1,
    limit: number = 50,
  ) {
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      NotificationsModel.find({ userEmail })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      NotificationsModel.countDocuments({ userEmail }),
    ]);

    return {
      notifications,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalNotifications: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  // Get notifications for dropdown (first 6)
  static async getRecentNotifications(userEmail: string, limit: number = 6) {
    return await NotificationsModel.find({ userEmail })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  static async markAllAsRead(userEmail: string) {
    return await NotificationsModel.updateMany(
      { userEmail, newIs: true },
      { newIs: false },
    );
  }
}
