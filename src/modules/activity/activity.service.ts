import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { ActivityModel } from './activity.model';
import { OnlineStatusModel } from './onlineStatus.model';
import { WorkModel } from '../work/work.model'; // optional - for completed works count

export class ActivityService {
  private static io: Server;

  // Initialize with Socket.IO instance
  static initialize(ioInstance: Server) {
    ActivityService.io = ioInstance;
    console.log('ActivityService initialized with Socket.IO');
  }

  private static checkIo() {
    if (!ActivityService.io) {
      throw new Error('Socket.IO not initialized in ActivityService');
    }
  }

  // Mark user online
  static async markUserOnline(payload: {
    userEmail: string;
    userId?: string;
    userName?: string;
    socketId?: string;
  }) {
    const { userEmail, userId, userName, socketId } = payload;
    const update = {
      userId: userId ? new mongoose.Types.ObjectId(userId) : undefined,
      userName,
      isOnline: true,
      socketId,
      lastSeen: new Date(),
    } as any;

    const opts = { upsert: true, new: true, setDefaultsOnInsert: true };
    const result = await OnlineStatusModel.findOneAndUpdate(
      { userEmail },
      { $set: update },
      opts,
    );

    ActivityService.broadcastOnlineStatus().catch(console.error);
    return result;
  }

  // Mark user offline
  static async markUserOffline(socketId?: string) {
    const result = await OnlineStatusModel.findOneAndUpdate(
      { socketId },
      { $set: { isOnline: false, lastSeen: new Date(), socketId: null } },
      { new: true },
    );

    ActivityService.broadcastOnlineStatus().catch(console.error);
    return result;
  }

  // Record a new activity
  static async recordActivity(data: {
    userId?: string;
    userEmail: string;
    userName?: string;
    workId?: string | null;
    action: string;
    message?: string;
    meta?: Record<string, any>;
  }) {
    const doc = await ActivityModel.create({
      userId: data.userId,
      userEmail: data.userEmail,
      userName: data.userName,
      workId: data.workId,
      action: data.action,
      message: data.message,
      meta: data.meta,
    });

    if (ActivityService.io) {
      ActivityService.io.emit('activity:new', doc); // global
      ActivityService.io.to(data.userEmail).emit('activity:own', doc); // user-specific
      ActivityService.io.emit('notifications:update'); // update notifications
      ActivityService.broadcastOnlineStatus().catch(console.error);
    }

    return doc;
  }

  // Fetch activities with filters
  static async getActivities(filters: {
    page?: number;
    limit?: number;
    userEmail?: string;
    from?: string;
    to?: string;
  }) {
    const page = Math.max(1, filters.page ?? 1);
    const limit = Math.max(1, filters.limit ?? 20);
    const skip = (page - 1) * limit;

    const query: any = {};
    if (filters.userEmail) query.userEmail = filters.userEmail;
    if (filters.from || filters.to) {
      query.createdAt = {};
      if (filters.from) query.createdAt.$gte = new Date(filters.from);
      if (filters.to) query.createdAt.$lte = new Date(filters.to);
    }

    const [items, total] = await Promise.all([
      ActivityModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('workId'),
      ActivityModel.countDocuments(query),
    ]);

    return {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  // List online users
  static async getOnlineUsers() {
    return await OnlineStatusModel.find({ isOnline: true }).select({
      userEmail: 1,
      userName: 1,
      socketId: 1,
      lastSeen: 1,
      isOnline: 1,
    });
  }

  // Stats: online count + completed works
  static async getStats() {
    const onlineCount = await OnlineStatusModel.countDocuments({
      isOnline: true,
    });
    let completedWorks = 0;
    try {
      if (WorkModel) {
        completedWorks = await WorkModel.countDocuments({
          workStatus: 'Completed',
        });
      }
    } catch {
      completedWorks = 0;
    }
    return { onlineCount, completedWorks };
  }

  static async broadcastOnlineStatus() {
    if (!ActivityService.io) return;
    const [onlineUsers, stats] = await Promise.all([
      ActivityService.getOnlineUsers(),
      ActivityService.getStats(),
    ]);
    console.log(
      'Broadcasting online users:',
      onlineUsers.map((u) => u.userEmail),
    );
    ActivityService.io.emit('activity:online-updated', { onlineUsers, stats });
  }
}
