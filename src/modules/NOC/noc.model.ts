import { Schema, model } from 'mongoose';
import { INOC } from './noc.interface';

const nocSchema = new Schema<INOC>({
  // employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  name: { type: String, required: true },
  passportNumber: { type: String, required: true },
  joiningDate: { type: String, required: true },
  position: { type: String, required: true },
  country: { type: String, required: true },
  purpose: {
    type: String,
    enum: ['Business', 'Tourism', 'Medical'],
    required: true,
  },
  requestDate: { type: String, required: true },
  approvedBy: { type: String },
  cancelledBy: { type: String },
  approved: { type: Boolean, default: false },
  cancelled: { type: Boolean, default: false },
  email: { type: String },
});

export const NOCModel = model<INOC>('NOC', nocSchema);
