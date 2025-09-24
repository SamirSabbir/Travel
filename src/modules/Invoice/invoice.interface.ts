// invoice.interface.ts
import mongoose from 'mongoose';

export interface TInvoice {
  workId: mongoose.Types.ObjectId; // Reference to Work (info will be taken from Work)
  submittedOn: Date; // Submitted date
  invoiceFor: string; // Invoice for (e.g. client/project name)
  payableTo: string; // Default: "Trip and Travel"
  service: string; // Dropdown of services (Visa, Hotel, Ticket, etc.)
  invoiceNo: string; // Unique number from Leads Management
  dueDate: Date; // Due date
  notes?: string; // Optional notes

  // Multiple items inside one invoice
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalAmount: number;
}
