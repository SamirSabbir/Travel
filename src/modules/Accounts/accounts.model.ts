// models/accounts.model.ts
import { Schema, model } from 'mongoose';

const commissionDetailSchema = new Schema(
  {
    salesPersonEmail: { type: String, required: true },
    commissionRate: { type: Number, required: true },
    commissionAmount: { type: Number, required: false }, // can be auto-calculated
  },
  { _id: false },
);

const accountSchema = new Schema(
  {
    accountName: { type: String, required: true },
    saleId: { type: Schema.Types.ObjectId, ref: 'Sales', required: true },
    revenue: { type: Number, required: true },
    expense: { type: Number, required: true },
    commission: { type: Number, required: true },
    income: { type: Number, required: true },
    commissionDetails: { type: [commissionDetailSchema], required: true },
    receipt: { type: String },
    accountAdminEmail: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const AccountModel = model('Account', accountSchema);
