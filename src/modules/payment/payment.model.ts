import { Schema, model } from 'mongoose';
import { TPayment } from './payment.interface';

const paymentSchema = new Schema<TPayment>(
  {
    agencyName: { type: String },
    createdBy: { type: String },
    paymentStatus: { type: String, default: 'Draft' },
    reference: { type: String },
    depositDate: { type: Date },

    mode: { type: String },
    type: { type: String },
    depositedFrom: { type: String },
    branch: { type: String },
    depositReferenceIdentifier: { type: String },

    uploadedDocument: [{ type: String }],
    depositedToAccount: { type: String },
    givenAmount: { type: Number },
    serviceCharge: { type: Number },
    amount: { type: Number },

    workId: { type: Schema.Types.ObjectId, ref: 'Work' },
  },
  {
    timestamps: true,
  },
);

export const PaymentModel = model('Payment', paymentSchema);
