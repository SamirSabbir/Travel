// appointmentDate.model.ts
import { Schema, model } from 'mongoose';
import { TAppointmentDate } from './appointmentDate.interface';

const appointmentDateSchema = new Schema<TAppointmentDate>(
  {
    uniqueNumber: { type: String, required: true, unique: true },
    assignedTo: { type: String, required: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
    name: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    pax: { type: Number, required: true, min: 1 },
    userName: { type: String, required: true },
    password: { type: String, required: true }, // Store hashed password
  },
  { timestamps: true },
);

// If needed, hash password before saving
// appointmentDateSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

export const AppointmentDateModel = model<TAppointmentDate>(
  'AppointmentDate',
  appointmentDateSchema,
);
