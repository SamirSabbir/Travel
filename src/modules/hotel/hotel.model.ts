import { Schema, model } from 'mongoose';
import { THotel } from './hotel.interface'; // adjust path

const hotelSchema = new Schema<THotel>(
  {
    uId: { type: String, required: true },
    name: { type: String, required: true },
    hotelName: { type: String, required: true },
    adult: { type: Number, required: true },
    child: { type: Number, required: true },
    night: { type: Number, required: true },
    room: { type: Number, required: true },
    roomType: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    perNightPrice: { type: Number, required: true },
    totalPrice: { type: Number },
    assignedTo: { type: String, required: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
  },
  {
    timestamps: true,
  },
);

// 🔹 Pre-save (for .save())
hotelSchema.pre('save', function (next) {
  this.totalPrice = this.night * this.perNightPrice * this.room;
  next();
});

// 🔹 Pre-update (for findOneAndUpdate, updateOne, etc.)
hotelSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
  const update = this.getUpdate() as Partial<THotel>;

  if (update.night || update.perNightPrice || update.room) {
    const night = update.night ?? (this as any)._update.$set?.night;
    const perNightPrice =
      update.perNightPrice ?? (this as any)._update.$set?.perNightPrice;
    const room = update.room ?? (this as any)._update.$set?.room;

    if (night && perNightPrice && room) {
      const totalPrice = night * perNightPrice * room;
      this.set({ totalPrice });
    }
  }

  next();
});

export const HotelModel = model<THotel>('Hotel', hotelSchema);
