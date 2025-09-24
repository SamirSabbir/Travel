// invoice.model.ts
import { Schema, model } from 'mongoose';
import { TInvoice } from './invoice.interface';

const itemSchema = new Schema(
  {
    description: { type: String, },
    quantity: { type: Number,  min: 1 },
    unitPrice: { type: Number, min: 0 },
  },
  { _id: false },
);

const invoiceSchema = new Schema<TInvoice>(
  {
    workId: { type: Schema.Types.ObjectId, ref: 'Work',  },
    submittedOn: { type: Date, default: Date.now },
    invoiceFor: { type: String, },
    payableTo: { type: String, default: 'Trip and Travel' },
    service: { type: String, },
    invoiceNo: { type: String, unique: true },
    dueDate: { type: Date, required: true },
    notes: { type: String },

    items: {
      type: [itemSchema],
      validate: [
        (val: any[]) => val.length > 0,
        'At least one item is required',
      ],
    },

    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// 🔹 Pre-save hook to calculate totalAmount
invoiceSchema.pre('save', function (next) {
  if (this.items && this.items.length > 0) {
    this.totalAmount = this.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );
  }
  next();
});

// 🔹 Pre-update hook for updates via findOneAndUpdate / updateOne
invoiceSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
  const update: any = this.getUpdate();

  if (update.items) {
    const items = update.items;
    if (Array.isArray(items) && items.length > 0) {
      const totalAmount = items.reduce(
        (sum: number, item: any) => sum + item.quantity * item.unitPrice,
        0,
      );
      this.set({ totalAmount });
    }
  }

  next();
});

export const InvoiceModel = model<TInvoice>('Invoice', invoiceSchema);
