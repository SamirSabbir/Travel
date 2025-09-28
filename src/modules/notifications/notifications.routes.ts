import express from 'express';
import { NotificationService } from './notifications.services';

const router = express.Router();

// GET /notifications/:userEmail - Get user notifications
router.get('/:userEmail', async (req, res) => {
  try {
    const { userEmail } = req.params;

    const notifications =
      await NotificationService.getUserNotifications(userEmail);

    res.status(200).json({
      success: true,
      message: 'Notifications fetched successfully',
      data: notifications,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
    });
  }
});

// PATCH /notifications/:notificationId/:userEmail/read - Mark as read
router.patch('/:notificationId/:userEmail/read', async (req, res) => {
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
router.patch('/mark-all-read', async (req, res) => {
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

// POST /notifications/test - Test notification endpoint (optional, for debugging)
router.post('/test', async (req, res) => {
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
