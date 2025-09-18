import { Schema, model } from 'mongoose';
import { THotel, TNight } from './hotel.interface'; // adjust path

const nightSchema = new Schema<TNight>({
  from: { type: String }, // could also use Date type if you want strict date handling
  to: { type: String },
});

const hotelSchema = new Schema<THotel>(
  {
    uId: { type: String },
    name: { type: String },
    hotelName: { type: String },
    adult: { type: Number },
    child: { type: Number },
    night: nightSchema,
    room: { type: Number },
    roomType: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    perNightPrice: { type: Number },
    totalPrice: { type: Number },
    assignedTo: { type: String, required: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
  },
  { timestamps: true },
);

// 🔹 Helper function to calculate nights between two dates
function calculateNights(from?: string, to?: string): number {
  if (!from || !to) return 0;
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const diffTime = toDate.getTime() - fromDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms → days
}

// 🔹 Pre-save (for .save())
hotelSchema.pre('save', function (next) {
  const nights = calculateNights(this.night?.from, this.night?.to);
  this.totalPrice = nights * (this.perNightPrice ?? 0) * (this.room ?? 0);
  next();
});

// 🔹 Pre-update (for findOneAndUpdate, updateOne, etc.)
hotelSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
  const update = this.getUpdate() as Partial<THotel>;

  const night =
    update.night ??
    (this as any)._update.$set?.night ??
    (this as any)._update.night;

  const perNightPrice =
    update.perNightPrice ??
    (this as any)._update.$set?.perNightPrice ??
    (this as any)._update.perNightPrice;

  const room =
    update.room ??
    (this as any)._update.$set?.room ??
    (this as any)._update.room;

  if (night?.from && night?.to && perNightPrice && room) {
    const nights = calculateNights(night.from, night.to);
    const totalPrice = nights * perNightPrice * room;
    this.set({ totalPrice });
  }

  next();
});

export const HotelModel = model<THotel>('Hotel', hotelSchema);
