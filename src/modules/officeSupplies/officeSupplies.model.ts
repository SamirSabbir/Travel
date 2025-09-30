import { Schema, model } from 'mongoose';
import { TOfficeSupplies } from './officeSupplies.interface';

const officeSuppliesSchema = new Schema<TOfficeSupplies>(
  {
    date: { type: Date },
    productDescription: { type: String },
    item: { type: String },
    quantity: { type: Number },
    unitPrice: { type: Number },
    total: { type: Number },
  },
  { timestamps: true },
);

export const OfficeSuppliesModel = model<TOfficeSupplies>(
  'OfficeSupplies',
  officeSuppliesSchema,
);
