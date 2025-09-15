import { Schema, model } from 'mongoose';
import { TTourPackage } from './tourPackage.interface';

const tourPackageSchema = new Schema<TTourPackage>(
  {
    uId: { type: String, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    transfer: { type: String, required: true },
    night: { type: Number, required: true },
    hotel: { type: String, required: true },
    sightSeeing: { type: [String], default: [] },
    flights: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    assignedTo: { type: String, required: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
  },
  {
    timestamps: true,
  },
);

export const TourPackageModel = model<TTourPackage>(
  'TourPackage',
  tourPackageSchema,
);
