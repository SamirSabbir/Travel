import mongoose from "mongoose";

// transfer.interface.ts
export interface TTransfer {
  uId: string;
  name: string;
  transferType: string; // e.g., "Airport Pickup", "Drop-off"
  time: string; // could be stored as "HH:mm" format
  date: Date; // corrected from 'data' → 'date'
  carType: string; // e.g., "Sedan", "SUV"
  passenger: number; // number of passengers
  amount: number; // cost of the transfer
  assignedTo: string;        // user assigned to this service
  workId: mongoose.ObjectId;
}
