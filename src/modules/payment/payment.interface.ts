import mongoose from 'mongoose';

export interface TPayment {
  agencyName: string;
  createdBy: string; // Could be employee ID or name
  paymentStatus: string; // e.g., 'Pending', 'Completed'
  reference: string;
  depositDate: Date;

  mode: string; // e.g., 'Offline Payment'
  type: string; // e.g., 'Online Transfer'
  depositedFrom: string;
  branch: string;
  depositReferenceIdentifier: string;

  uploadedDocument?: string[]; // file URLs
  depositedToAccount: string;
  givenAmount: number;
  dueAmount: number;
  amount: number;

  workId: mongoose.Types.ObjectId; // Reference to Work
}
