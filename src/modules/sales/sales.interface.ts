import { Types } from "mongoose";

export type TSales = {
  leadId: Types.ObjectId;
  customerName:string,
  phoneNumber:string,
  country: string;
  description: string;
  lastCallDate: Date;
  followUpCallDate: Date;
  status:string,
  duePayment: number;
    employeeEmail: string;
};
