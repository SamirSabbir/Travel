import { Types } from "mongoose";

export type TSales = {
  leadId: Types.ObjectId;
  country: string;
  description: string;
  lastCallDate: Date;
  followUpCallDate: Date;
  duePayment: number;
};
