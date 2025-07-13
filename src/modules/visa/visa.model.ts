
import mongoose, { Schema } from 'mongoose';
import { TNonUS, TUSRetrieveDS, TUSVisaPayment } from './visa.interface';

const TUSVisaPaymentSchema = new Schema<TUSVisaPayment>({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  securityQuestion1: { type: String, required: true },
  securityQuestion2: { type: String, required: true },
  securityQuestion3: { type: String, required: true },
});

export const TUSVisaPaymentModel = mongoose.model<TUSVisaPayment>(
  'TUSVisaPayment',
  TUSVisaPaymentSchema,
);

const TUSRetrieveDSSchema = new Schema<TUSRetrieveDS>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  applicationId: { type: String, required: true },
  sureNameFirst5Letters: { type: String, required: true },
  yearOfBirth: { type: Number, required: true },
  mothersGivenName: { type: String, required: true },
});

export const TUSRetrieveDSModel = mongoose.model<TUSRetrieveDS>(
  'TUSRetrieveDS',
  TUSRetrieveDSSchema,
);

const NonUSSchema = new Schema<TNonUS>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

export const NonUSModel = mongoose.model<TNonUS>('NonUS', NonUSSchema);
