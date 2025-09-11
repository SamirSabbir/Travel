import { Types } from 'mongoose';

export type TWork = {
  uuId: string;
  leadId: Types.ObjectId;
  workStatus: 'Completed' | 'Pending';
  employeeEmail: string;
  submissionDate: string;
  deliveryDate: string;
  pax: string;
  payment: number;
  paymentStatus: 'Partial Payment' | 'Full Payment' | 'Pending';
  country: string;
  name: string;
  phone: string;
  paymentDetails?: Types.ObjectId;
  // uniqueName?: string;
  leadsStatus: string;
  isApplied: boolean;
};
