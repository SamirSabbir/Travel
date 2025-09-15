import { Schema, model } from 'mongoose';
import { TWork } from './work.interface';

const workSchema = new Schema<TWork>(
  {
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    uuId: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: String,
    },
    serviceAssignedTo: {
      type: String,
    },
    // uniqueName: {
    //   type: String,
    // },
    submissionDate: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    workStatus: {
      type: String,
      enum: ['Completed', 'Pending'],
      default: 'Pending',
    },
    leadsStatus: {
      type: String,
      required: true,
    },
    employeeEmail: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    pax: {
      type: String,
      enum: ['1 Person', 'Family'],
    },
    paymentStatus: {
      type: String,
      enum: ['Partial Payment', 'Full Payment', 'Pending'],
    },
    payment: {
      type: Number,
      default: 0,
    },
    paymentDetails: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      required: false,
    },
    isApplied: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const WorkModel = model<TWork>('Work', workSchema);
