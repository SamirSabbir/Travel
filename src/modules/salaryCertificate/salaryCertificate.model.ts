import { Schema, model } from 'mongoose';
import { ISalaryCertificate } from './salaryCertificate.interface';

const salaryCertificateSchema = new Schema<ISalaryCertificate>({
  // employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  joiningDate: { type: String, required: true },
  monthlySalary: { type: Number, required: true },
  requestDate: { type: String, required: true },
  approvedBy: { type: String },
  approved: { type: Boolean, default: false },
  assignedTo: { type: String },
});

export const SalaryCertificateModel = model<ISalaryCertificate>(
  'SalaryCertificate',
  salaryCertificateSchema,
);
