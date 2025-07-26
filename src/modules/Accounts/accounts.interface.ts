interface CommissionDetail {
  salesPersonId: string;
  commissionRate: number;
  commissionAmount?: number;
}

interface Accounts {
  id: string;
  revenue: number;
  receipt: File | null;
  income: number;
  expense: number;
  commission: number;
  commissionDetails: CommissionDetail[];
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
}
