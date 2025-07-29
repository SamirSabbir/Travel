import { Types } from 'mongoose';

export type TWork = {
  salesId: Types.ObjectId;
  status: 'draft' | 'complete' | 'pending';
  employeeEmail: string;
  submissionDate: string;
  deliveryDate: string;
  pax: string;
  payment: string;
  country: string;
  name: string;
  phone:string,
};
