import { Schema, model } from 'mongoose';
import { TLunch } from './lunch.interface';

const lunchSchema = new Schema<TLunch>(
  {
    date: { type: Date },
    lunchBoxesNo: { type: Number },
    source: { type: String },
    note: { type: String },
    bill: { type: Number },
  },
  { timestamps: true },
);

export const LunchModel = model<TLunch>('Lunch', lunchSchema);
