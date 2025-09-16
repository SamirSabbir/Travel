import mongoose from "mongoose";

// appointmentDate.interface.ts
export interface TAppointmentDate {
  uniqueNumber: string; // Unique ID for each appointment
  name: string; // Person's name
  appointmentDate: Date; // Date & time of the appointment
  phoneNumber: string; // Contact number
  pax: number; // Number of people
  userName: string; // Login or system username
  password: string; // Password (should be hashed before saving)
  assignedTo: string;        // user assigned to this service
  workId: mongoose.ObjectId;
}
