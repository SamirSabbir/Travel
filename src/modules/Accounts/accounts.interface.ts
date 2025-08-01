import { Types } from "mongoose";

export interface CommissionDetail {
  salesPersonId: Types.ObjectId;
  commissionRate: number;
  commissionAmount?: number;
}

export interface TAccount {
  id: string;
  revenue: number;
  receipt: File | null;
  income: number;
  expense: number;
  commission: number;
  commissionDetails: CommissionDetail[];
  accountAdminEmail: string;
  createdAt: Date;
  updatedAt?: Date;
}
