import { model, Schema } from "mongoose";
import { TSales } from "./sales.interface";

const salesSchema = new Schema<TSales>(
  {
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    lastCallDate: { type: Date, required: true },
    followUpCallDate: { type: Date, required: true },
    duePayment: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const SalesModel = model<TSales>('Sales', salesSchema);