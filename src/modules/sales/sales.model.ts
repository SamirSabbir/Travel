import { model, Schema } from 'mongoose';
import { TSales } from './sales.interface';

const salesSchema = new Schema<TSales>(
  {
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    country: { type: String },
    description: { type: String, required: true },
    lastCallDate: { type: Date },
    followUpCallDate: { type: Date },
    duePayment: { type: Number },
    customerName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    status: {
      type: String,
    },
    employeeEmails: { type: [String], required: true },
    isConfirmed: {
      type: String,
      default: 'New lead',
      enum: [
        'New lead',
        'Confirmed',
        'Follow-up',
        'Follow-up 1',
        'Followed-up 2',
        'Very Interested',
      ],
    },
  },
  {
    timestamps: true,
  },
);

export const SalesModel = model<TSales>('Sales', salesSchema);
