import { Schema, model } from 'mongoose';
import { ISpecialRequest } from './specialRequest.interface';

const specialRequestSchema = new Schema<ISpecialRequest>(
  {
    employeeName: { type: String, required: true },
    employeeEmail: { type: String, required: true },
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
  },
  {
    timestamps: true,
  },
);

export const SpecialRequestModel = model<ISpecialRequest>(
  'SpecialRequest',
  specialRequestSchema,
);
