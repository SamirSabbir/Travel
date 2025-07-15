import { Types } from "mongoose";


export type TWork = {
  salesId: Types.ObjectId;
  files: string[];
  status: 'draft' | 'complete' | 'pending';
    employeeEmail: string;
};
