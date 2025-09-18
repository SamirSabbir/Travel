import mongoose from 'mongoose';

export interface INOC {
  // employeeId: mongoose.Types.ObjectId;
  name: string;
  passportNumber: string;
  joiningDate: string;
  position: string;
  country: string;
  purpose: 'Business' | 'Tourism' | 'Medical';
  requestDate: string;
  approvedBy?: string;
  approved: boolean;
  email?: string;
}
