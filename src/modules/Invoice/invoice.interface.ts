import mongoose from 'mongoose';

export interface TInvoice {
  saleId: mongoose.Types.ObjectId;
  airTicket: number;
  visaProcessing: number;
  hotel: string;
  appointmentDate: Date;
  package: string;
  attachments: string[];
  accountAdminEmail?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
