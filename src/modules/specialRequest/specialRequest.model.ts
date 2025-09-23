import { Schema, model } from 'mongoose';
import { ISpecialRequest } from './specialRequest.interface';

const specialRequestSchema = new Schema<ISpecialRequest>(
  {
    userName: { type: String },
    userEmail: { type: String, required: true },
    type: {
      type: String,
      enum: ['CasualLeave', 'SickLeave', 'CommissionWithdrawal', 'Other'],
      required: true,
    },
    message: { type: String },
    leaveDates: { type: [String] }, // array of dates
    commissionAmount: { type: Number },
    approvedBy: { type: String },
    cancelledBy: { type: String },
    approved: { type: Boolean, default: false },
    cancelled: { type: Boolean, default: false },
    userRole: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const SpecialRequestModel = model<ISpecialRequest>(
  'SpecialRequest',
  specialRequestSchema,
);
