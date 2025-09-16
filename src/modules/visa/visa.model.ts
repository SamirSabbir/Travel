// visa.model.ts
import { Schema, model } from 'mongoose';
import { TVisa } from './visa.interface';

const visaSchema = new Schema<TVisa>(
  {
    name: { type: String, },
    pax: { type: Number,  min: 1 },
    country: { type: String },
    dateOfEntry: { type: Date },
    close: { type: Date },
    details: { type: String },
    assignedTo: { type: String, required: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Closed'],
      default: 'Pending',
    },
  },
  { timestamps: true },
);

export const VisaModel = model<TVisa>('Visa', visaSchema);
