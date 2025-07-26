import mongoose, { Schema, Document, Types } from 'mongoose';

interface CommissionDetail {
  salesPersonId: Types.ObjectId;
  commissionRate: number;
  commissionAmount?: number;
}

export interface IAccounts extends Document {
  revenue: number;
  receipt: string | null; // File path or URL
  income: number;
  expense: number;
  commission: number;
  commissionDetails: CommissionDetail[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}

const CommissionDetailSchema = new Schema<CommissionDetail>({
  salesPersonId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  commissionRate: { type: Number, required: true },
  commissionAmount: { type: Number },
});

const AccountsSchema = new Schema<IAccounts>(
  {
    revenue: { type: Number, required: true },
    receipt: { type: String, default: null }, // e.g., file path or S3 URL
    income: { type: Number, required: true },
    expense: { type: Number, required: true },
    commission: { type: Number, required: true },
    commissionDetails: { type: [CommissionDetailSchema], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

export const AccountsModel = mongoose.model<IAccounts>('Accounts', AccountsSchema);
