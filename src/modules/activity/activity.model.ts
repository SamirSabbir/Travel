import mongoose, { Schema } from 'mongoose';
import { TActivity } from './activity.interface';

const activitySchema = new Schema<TActivity>(
  {
    userEmail: { type: String, required: true, index: true },
    userName: { type: String },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: false },
    action: { type: String, required: true },
    message: { type: String },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const ActivityModel = mongoose.model<TActivity>(
  'Activity',
  activitySchema,
);
