// transfer.model.ts
import { Schema, model } from 'mongoose';
import { TTransfer } from './transfer.interface';

const transferSchema = new Schema<TTransfer>(
  {
    uId: { type: String, required: true },
    name: { type: String, required: true },
    transferType: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: Date, required: true },
    carType: { type: String, required: true },
    passenger: { type: Number, required: true, min: 1 },
    amount: { type: Number, required: true, min: 0 },
    assignedTo: { type: String, required: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
  },
  { timestamps: true },
);

export const TransferModel = model<TTransfer>('Transfer', transferSchema);
