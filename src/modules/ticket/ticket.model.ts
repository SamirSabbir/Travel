import { Schema, model } from 'mongoose';
import { TTicket } from './ticket.interface';

const ticketSchema = new Schema<TTicket>(
  {
    bookId: { type: String },
    from: { type: String },
    to: { type: String },
    airLine: { type: String },
    PNR: { type: String },
    contactNo: { type: String },
    amount: { type: Number },
    bookedOn: { type: Date },
    travelDate: { type: Date },
    assignedTo: { type: String, required: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
  },
  { timestamps: true },
);

export const TicketModel = model<TTicket>('Ticket', ticketSchema);
