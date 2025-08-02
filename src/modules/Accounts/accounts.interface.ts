// interfaces/accounts.interface.ts
export interface CommissionDetail {
  salesPersonEmail: string; // updated from ID to email
  commissionRate: number;
  commissionAmount?: number;
}

export interface TAccount {
  saleId: string;
  revenue: number;
  receipt: string | null; // assuming URL or file path
  income: number;
  expense: number;
  commission: number;
  commissionDetails: CommissionDetail[];
  accountAdminEmail: string;
  createdAt?: Date;
  updatedAt?: Date;
}
