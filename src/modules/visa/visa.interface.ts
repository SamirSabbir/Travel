import mongoose from 'mongoose';

// visa.interface.ts
export interface TVisa {
  name: string; // Applicant name
  pax: number; // Number of people
  country: string; // Country for visa
  dateOfEntry: Date; // Date of entry
  close: Date; // Closing/expiry date
  details: string; // Additional details
  status: string; // e.g. "Pending", "Approved", "Rejected"
  assignedTo: string; // user assigned to this service
  workId: mongoose.ObjectId;
  fullName: string;
  email: string;
  phone: string;
}
