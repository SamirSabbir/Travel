import { Schema, model } from 'mongoose';
import { TTourPackage } from './tourPackage.interface';
import { TNight } from '../hotel/hotel.interface';

const nightSchema = new Schema<TNight>({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
});

const tourPackageSchema = new Schema<TTourPackage>(
  {
    uId: { type: String },
    name: { type: String },
    country: { type: String },
    transfer: { type: String },
    night: nightSchema,
    hotel: { type: String },
    sightSeeing: { type: String },
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
