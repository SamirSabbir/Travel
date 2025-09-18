import mongoose from 'mongoose';

export interface ISalaryCertificate {
  // employeeId: mongoose.Types.ObjectId; // reference to Employee
  name: string;
  position: string;
  joiningDate: string;
  monthlySalary: number;
  requestDate: string; // when employee requested
  approvedBy?: string; // superadmin or HR who approved
  approved: boolean;
  assignedTo?: string; // assigned HR/Admin email
}
