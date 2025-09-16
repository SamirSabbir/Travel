import { Schema, model } from 'mongoose';
import { TTourPackage } from './tourPackage.interface';

const tourPackageSchema = new Schema<TTourPackage>(
  {
    uId: { type: String },
    name: { type: String },
    country: { type: String },
    transfer: { type: String },
    night: { type: Number },
    hotel: { type: String },
    sightSeeing: { type: [String], default: [] },
    flights: { type: String },
    totalPrice: { type: Number },
    assignedTo: { type: String, required: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
  },
  { timestamps: true },
);

export const TourPackageModel = model<TTourPackage>(
  'TourPackage',
  tourPackageSchema,
);
