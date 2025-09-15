import mongoose from 'mongoose';

export interface TTourPackage {
  uId: string; // unique id for package booking
  name: string; // customer name
  country: string; // destination country
  transfer: string; // includes airport transfer or not
  night: number; // number of nights
  hotel: string; // hotel name
  sightSeeing: string[]; // list of sightseeing spots
  flights: string; // includes flights or not
  totalPrice: number; // total package price (set manually)
  assignedTo: string; // user assigned to this service
  workId: mongoose.ObjectId;
}
