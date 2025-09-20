// visa.model.ts
import { Schema, model } from 'mongoose';
import { TVisa } from './visa.interface';

// 🔹 Sub-schema for USA details
const usaDetailsSchema = new Schema(
  {
    applicationId: { type: String },
    fiveLettersOfSurname: { type: String },
    yearOfBirth: { type: String },
    motherGivenName: { type: String },
    userName: { type: String },
    password: { type: String },
    sq1: { type: String },
    sq2: { type: String },
    sq3: { type: String },
  },
  { _id: false }, // prevents creating _id for subdocument
);

// 🔹 Sub-schema for Schengen details
const schengenDetailsSchema = new Schema(
  {
    userName: { type: String },
    password: { type: String },
  },
  { _id: false },
);

// 🔹 Main Visa schema
const visaSchema = new Schema<TVisa>(
  {
    name: { type: String }, // applicant name
    pax: { type: Number, min: 1 },
    country: { type: String },
    isSubmitted: { type: Boolean, default: false },
    visaType: { type: String, enum: ['USA', 'Schengen'] },

    // Nested objects
    usaDetails: { type: usaDetailsSchema, default: null },
    schengenDetails: { type: schengenDetailsSchema, default: null },

    // General details
    dateOfEntry: { type: Date },
    close: { type: Date },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    details: { type: String },

    // Relations
    assignedTo: { type: String, required: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },

    // Status
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Closed'],
      default: 'Pending',
    },
  },
  { timestamps: true },
);

export const VisaModel = model<TVisa>('Visa', visaSchema);
