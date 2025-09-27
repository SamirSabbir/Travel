import mongoose from "mongoose";

export type TActivity = {
  userId?: mongoose.Types.ObjectId | string;
  userEmail: string;
  userName?: string;
  workId?: mongoose.Types.ObjectId | string;
  action: string; // e.g. "created task", "updated work", "completed work"
  message?: string; // more details
  meta?: Record<string, any>;
  createdAt?: Date;
};