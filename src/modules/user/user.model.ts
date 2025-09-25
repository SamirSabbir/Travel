// user.model.ts
import { model, Schema } from 'mongoose';
import TUser from './user.interface';

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salary: { type: Number, default: 0 },
    KPI: { type: Number, default: 0 },
    Commission: { type: Number, default: 0 },
    role: {
      type: String,
      enum: [
        'Employee',
        'AccountAdmin',
        'HRAdmin',
        'HR',
        'SuperAdmin',
        'OfficeBoy',
      ],
      required: true,
    },
    isApproved: { type: Boolean, default: false },
    photo: { type: String },
    address: { type: String },
    phoneNo: { type: String },
    emergencyPhoneNo: { type: String },
    passportNo: { type: String },
    passwordExpiryDate: { type: String },
    joiningDate: { type:String,},
    // New fields
    remainingCasualLeaves: { type: Number, default: 0 },
    remainingSickLeaves: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const UserModel = model<TUser>('User', UserSchema);
