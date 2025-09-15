// ticket.model.ts
import { Schema, model } from 'mongoose';
import { TTicket } from './ticket.interface';

const ticketSchema = new Schema<TTicket>(
  {
    bookId: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    airLine: { type: String, required: true },
    PNR: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    amount: { type: Number, required: true },
    bookedOn: { type: Date, default: Date.now },
    travelDate: { type: Date, required: true },
    assignedTo: { type: String, required: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
  },
  { timestamps: true },
);

export const TicketModel = model<TTicket>('Ticket', ticketSchema);
