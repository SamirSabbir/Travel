import { model, Schema } from 'mongoose';
import { TNotifications } from './notifications.interface';

const NotificationsSchema = new Schema<TNotifications>(
  {
    message: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const NotificationsModel = model<TNotifications>(
  'Notification',
  NotificationsSchema,
);
