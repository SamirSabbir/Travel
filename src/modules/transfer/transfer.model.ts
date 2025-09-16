import { Schema, model } from 'mongoose';
import { TTransfer } from './transfer.interface';

const transferSchema = new Schema<TTransfer>(
  {
    uId: { type: String },
    name: { type: String },
    transferType: { type: String },
    time: { type: String },
    date: { type: Date },
    carType: { type: String },
    passenger: { type: Number },
    amount: { type: Number },
    assignedTo: { type: String, required: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
  },
  { timestamps: true },
);

export const TransferModel = model<TTransfer>('Transfer', transferSchema);
