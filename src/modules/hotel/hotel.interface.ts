import mongoose from "mongoose";

export interface THotel {
  uId: string; // unique id for booking or user reference
  name: string; // customer name
  hotelName: string; // name of the hotel
  adult: number; // number of adults
  child: number; // number of children
  night: number; // number of nights
  room: number; // number of rooms
  roomType: string; // type of room (single, double, suite, etc.)
  rating: number; // hotel rating (1–5 stars)
  perNightPrice: number; // price per night
  totalPrice: number; // total price for stay
  assignedTo: string;        // user assigned to this service
  workId: mongoose.ObjectId;
}
