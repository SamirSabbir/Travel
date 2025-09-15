import mongoose from 'mongoose';

export interface ISpecialRequest {
  employeeId: mongoose.Types.ObjectId;
  type: 'CasualLeave' | 'SickLeave' | 'CommissionWithdrawal' | 'Other';
  message?: string; // for other requests
  leaveDates?: string[]; // for casual or sick leave
  commissionAmount?: number; // for commission withdrawal
  requestDate: string;
  approvedBy?: string;
  approved: boolean;
  assignedTo?: string;
}
