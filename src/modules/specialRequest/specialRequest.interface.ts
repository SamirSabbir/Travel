import mongoose from 'mongoose';

export interface ISpecialRequest {
  employeeEmail: string;
  employeeName: string;
  type: 'CasualLeave' | 'SickLeave' | 'CommissionWithdrawal' | 'Other';
  message?: string; // for other requests
  leaveDates?: string[]; // for casual or sick leave
  commissionAmount?: number; // for commission withdrawal
  approvedBy?: string;
  cancelledBy?: string;
  approved: boolean;
  cancelled: boolean;
}
