import { Types } from "mongoose";

export interface CommissionDetail {
  salesPersonId: Types.ObjectId;
  commissionRate: number; // % value like 30
  commissionAmount: number; // Always store this
}

export interface TAccount {
  id: string;
  saleId: Types.ObjectId; // <-- new: link to confirmed sale
  revenue: number;
  receipt: string; // URL to uploaded file (PDF/image)
  income: number;
  expense: number; // 40% of revenue
  commission: number; // total from commissionDetails
  commissionDetails: CommissionDetail[];
  accountAdminEmail: string;
  createdAt: Date;
  updatedAt?: Date;
}
