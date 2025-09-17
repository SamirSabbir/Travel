import { Schema, model } from 'mongoose';
import { TNotary } from './notary.interface';

const notarySchema = new Schema<TNotary>(
  {
    date: { type: Date },
    clientName: { type: String },
    documents: { type: String },
    employee: { type: String },
    note: { type: String },
    bill: { type: Number },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true },
);

export const NotaryModel = model<TNotary>('Notary', notarySchema);
