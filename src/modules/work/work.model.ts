import { Schema, model } from 'mongoose';
import { TWork } from './work.interface';

const workSchema = new Schema<TWork>(
  {
    salesId: { type: Schema.Types.ObjectId, ref: 'Sales', required: true },

    deliveryDate: {
      type: String,
    },
    submissionDate: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'complete', 'pending'],
      default: 'pending',
    },
    employeeEmail: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    pax: {
      type: String,
      enum: ['1 Person', 'Family'],
    },
    payment: {
      type: String,
      enum: ['Full', 'Partial'],
    },
  },
  {
    timestamps: true,
  },
);

export const WorkModel = model<TWork>('Work', workSchema);
