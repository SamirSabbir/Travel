import mongoose from "mongoose";

// ticket.interface.ts
export interface TTicket {
  bookId: string;
  from: string;
  to: string;
  airLine: string;
  PNR: string;
  contactNo: string;
  amount: number;
  bookedOn: Date;
  travelDate: Date;
  assignedTo: string;        // user assigned to this service
  workId: mongoose.ObjectId;
}
