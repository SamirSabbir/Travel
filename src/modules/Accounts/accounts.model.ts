import mongoose, { Schema} from 'mongoose';
import { CommissionDetail, TAccount } from './accounts.interface';

const CommissionDetailSchema = new Schema<CommissionDetail>({
  salesPersonId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  commissionRate: { type: Number, required: true },
  commissionAmount: { type: Number },
});

const AccountsSchema = new Schema<TAccount>(
  {
    revenue: { type: Number, required: true },
    receipt: { type: String, default: null }, // e.g., file path or S3 URL
    income: { type: Number, required: true },
    expense: { type: Number, required: true },
    commission: { type: Number, required: true },
    commissionDetails: { type: [CommissionDetailSchema], default: [] },
    accountAdminEmail: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);

export const AccountModel = mongoose.model<TAccount>(
  'Accounts',
  AccountsSchema,
);
