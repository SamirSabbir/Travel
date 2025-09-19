import { Schema, model } from 'mongoose';
import { ISpecialRequest } from './specialRequest.interface';

const specialRequestSchema = new Schema<ISpecialRequest>({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  type: {
    type: String,
    enum: ['CasualLeave', 'SickLeave', 'CommissionWithdrawal', 'Other'],
    required: true,
  },
  message: { type: String },
  leaveDates: { type: [String] }, // array of dates
  commissionAmount: { type: Number },
  requestDate: { type: String, required: true },
  approvedBy: { type: String },
  cancelledBy: { type: String },
  approved: { type: Boolean, default: false },
  cancelled: { type: Boolean, default: false },
  assignedTo: { type: String },
});

export const SpecialRequestModel = model<ISpecialRequest>(
  'SpecialRequest',
  specialRequestSchema,
);
