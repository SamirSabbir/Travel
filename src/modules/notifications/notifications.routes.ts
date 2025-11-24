import express from 'express';
import { NotificationService } from './notifications.services';

const router = express.Router();

// GET /notifications/:userEmail/unread-count - Get unread notifications count
router.get('/:userEmail/unread-count', async (req: any, res: any) => {
  try {
    const { userEmail } = req.params;

    const unreadCount = await NotificationService.getUnreadCount(userEmail);

    res.status(200).json({
      success: true,
      message: 'Unread count fetched successfully',
      data: { unreadCount },
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch unread count',
    });
  }
});

// GET /notifications/:userEmail - Get user notifications with pagination
router.get('/:userEmail', async (req: any, res: any) => {
  try {
    const { userEmail } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    // Validate pagination parameters
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page and limit must be positive numbers',
      });
    }

    const result = await NotificationService.getUserNotifications(
      userEmail,
      page,
      limit,
    );

    res.status(200).json({
      success: true,
      message: 'Notifications fetched successfully',
      data: {
        items: result.notifications,
        pagination: result.pagination,
      },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
    });
  }
});

// ... rest of your existing routes remain the same

// GET /notifications/:userEmail - Get user notifications with pagination
router.get('/:userEmail', async (req: any, res: any) => {
  try {
    const { userEmail } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    // Validate pagination parameters
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page and limit must be positive numbers',
      });
    }

    const result = await NotificationService.getUserNotifications(
      userEmail,
      page,
      limit,
    );

    res.status(200).json({
      success: true,
      message: 'Notifications fetched successfully',
      data: {
        items: result.notifications,
        pagination: result.pagination,
      },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
    });
  }
});

// GET /notifications/:userEmail/recent - Get recent notifications for dropdown
router.get('/:userEmail/recent', async (req: any, res: any) => {
  try {
    const { userEmail } = req.params;
    const limit = parseInt(req.query.limit) || 6;

    const notifications = await NotificationService.getRecentNotifications(
      userEmail,
      limit,
    );

    res.status(200).json({
      success: true,
      message: 'Recent notifications fetched successfully',
      data: notifications,
    });
  } catch (error) {
    console.error('Error fetching recent notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent notifications',
    });
  }
});

// PATCH /notifications/:notificationId/:userEmail/read - Mark as read
router.patch('/:notificationId/:userEmail/read', async (req: any, res: any) => {
  try {
    const { notificationId, userEmail } = req.params;

    const notification = await NotificationService.markAsRead(
      notificationId,
      userEmail,
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      data: notification,
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
    });
  }
});

// PATCH /notifications/mark-all-read - Mark all as read
router.patch('/mark-all-read', async (req: any, res: any) => {
  try {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: 'User email is required',
      });
    }

    const result = await NotificationService.markAllAsRead(userEmail);

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
      data: { modifiedCount: result.modifiedCount },
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all notifications as read',
    });
  }
});

// POST /notifications/test - Test notification endpoint
router.post('/test', async (req: any, res: any) => {
  try {
    const { userEmail, message } = req.body;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: 'User email is required',
      });
    }

    const notification = await NotificationService.createNotification(
      message || 'Test notification from API',
      userEmail,
      { type: 'test' },
    );

    res.status(201).json({
      success: true,
      message: 'Test notification created',
      data: notification,
    });
  } catch (error) {
    console.error('Error creating test notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create test notification',
    });
  }
});

export const notificationRoutes = router;
