import { Schema, model } from 'mongoose';
import { TLeadsManage } from './leadsManage.interface';

// 2. Create the Mongoose schema
const LeadSchema = new Schema<TLeadsManage>(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    adminEmail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assigns: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// 3. Create the model
const LeadsManageModel = model<TLeadsManage>('LeadsManage', LeadSchema);

export default LeadsManageModel;
