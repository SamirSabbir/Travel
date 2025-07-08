import { model, Schema } from 'mongoose';
import TUser from './user.interface';

const UserSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Employee', 'Admin', 'HR'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<TUser>('User', UserSchema);
