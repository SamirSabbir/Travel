import { model, Schema } from 'mongoose';
import { TLeads } from './leads.interface';

const LeadsSchema = new Schema<TLeads>(
  {
    leadManageId: {
      type: Schema.Types.ObjectId,
      ref: 'LeadsManage',
      required: true,
    },
    uuId:{
      type:String,
    },
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

export const LeadsModel = model<TLeads>('Lead', LeadsSchema);
