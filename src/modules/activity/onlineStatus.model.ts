import mongoose, { Schema } from 'mongoose';

export type TOnlineStatus = {
  userId?: mongoose.Types.ObjectId | string;
  userEmail: string;
  userName?: string;
  isOnline: boolean;
  lastSeen?: Date;
  socketId?: string;
};

const onlineStatusSchema = new Schema<TOnlineStatus>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    userEmail: { type: String, required: true, unique: true },
    userName: { type: String },
    isOnline: { type: Boolean, required: true, default: false },
    lastSeen: { type: Date, default: Date.now },
    socketId: { type: String },
  },
  { timestamps: true },
);

export const OnlineStatusModel = mongoose.model<TOnlineStatus>(
  'OnlineStatus',
  onlineStatusSchema,
);
