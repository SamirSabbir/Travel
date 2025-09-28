import { Schema, model } from 'mongoose';
import { TAppointmentDate } from './appointmentDate.interface';

const appointmentDateSchema = new Schema<TAppointmentDate>(
  {
    uniqueNumber: { type: String }, // optional
    assignedTo: { type: String, required: true }, // ✅ required
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true }, // ✅ required
    name: { type: String }, // optional
    appointmentDate: { type: Date }, // optional
    phoneNumber: { type: String }, // optional
    pax: { type: Number, min: 1 }, // optional
    userName: { type: String }, // optional
    password: { type: String }, // optional (still recommended to hash if stored)
  },
  { timestamps: true },
);

export const AppointmentDateModel = model<TAppointmentDate>(
  'AppointmentDate',
  appointmentDateSchema,
);
