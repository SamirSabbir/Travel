import { Schema, model } from 'mongoose';
import { TLeads } from './leads.interface';

// 2. Create the Mongoose schema
const LeadSchema = new Schema<TLeads>(
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
  },
  {
    timestamps: true,
  },
);

// 3. Create the model
const LeadModel = model<TLeads>('Lead', LeadSchema);

export default LeadModel;
