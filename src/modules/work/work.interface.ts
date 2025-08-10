import { Types } from 'mongoose';

export type TWork = {
  salesId: Types.ObjectId;
  status: 'draft' | 'complete' | 'pending';
  employeeEmail: string;
  submissionDate: string;
  deliveryDate: string;
  pax: string;
  payment: number;
  paymentStatus: 'Partial Payment' | 'Full Payment' | 'Pending';
  country: string;
  name: string;
  phone: string;
};
