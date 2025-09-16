import { Schema, model } from 'mongoose';
import { TInvoice } from './invoice.interface';

const invoiceSchema = new Schema<TInvoice>(
  {
    saleId: { type: Schema.Types.ObjectId, ref: 'Sale', required: true },
    airTicket: { type: Number, required: true },
    visaProcessing: { type: Number, required: true },
    hotel: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    package: { type: String, required: true },
    attachments: [{ type: String }],
    accountAdminEmail: { type: String, required: false },
  },
  {
    timestamps: true, 
  }
);

export const InvoiceModel = model('Invoice', invoiceSchema);
