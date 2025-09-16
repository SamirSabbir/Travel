import { Types } from 'mongoose';

export type TLeads = {
  leadManageId: Types.ObjectId;
  uuId: string;
  customerName: string;
  phoneNumber: string;
  country: string;
  description: string;
  lastCallDate: Date;
  followUpCallDate: Date;
  status: string;
  duePayment: number;
  employeeEmails: string[];
  isConfirmed:
    | 'New lead'
    | 'Confirmed'
    | 'Follow-up'
    | 'Follow-up 1'
    | 'Followed-up 2'
    | 'Very Interested';
};
