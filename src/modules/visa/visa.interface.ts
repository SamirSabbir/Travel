import mongoose from 'mongoose';

// visa.interface.ts
export interface TVisa {
  name: string; // Applicant name
  pax: number; // Number of people
  country: string; // Country for visa
  isSubmitted: boolean;
  visaType: 'USA' | 'Schengen';
  usaDetails: {
    applicationId: string;
    fiveLettersOfSurname: string;
    yearOfBirth: string;
    motherGivenName: string;
    userName: string;
    password: string;
    sq1: string;
    sq2: string;
    sq3: string;
  } | null;
  schengenDetails: {
    userName: string;
    password: string;
  } | null;
  dateOfEntry: Date; // Date of entry
  close: string; // Closing/expiry date
  details: string; // Additional details
  status: string; // e.g. "Pending", "Approved", "Rejected"
  assignedTo: string; // user assigned to this service
  workId: mongoose.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  visaStatus: string;
}
