import { TNonUS, TUSVisaPayment, TUSRetrieveDS } from './visa.interface';
import {
  NonUSModel,
  USVisaPaymentModel,
  USRetrieveDSModel,
} from './visa.model';

export const createNonUsVisaData = async (data: TNonUS) => {
  const result = await NonUSModel.create(data);
  return result;
};

export const createUSVisaPaymentData = async (data: TUSVisaPayment) => {
  const result = await USVisaPaymentModel.create(data);
  return result;
};

export const createUSRetrieveDSData = async (data: TUSRetrieveDS) => {
  const result = await USRetrieveDSModel.create(data);
  return result;
};

export const getAllNonUSVisaDataFromDB = async (employeeEmail: string) => {
  return await NonUSModel.find({ employeeEmail });
};

export const getAllUSVisaPaymentDataFromDB = async (employeeEmail: string) => {
  return await USVisaPaymentModel.find({ employeeEmail });
};

export const getAllUSRetrieveDSDataFromDB = async (employeeEmail: string) => {
  return await USRetrieveDSModel.find({ employeeEmail });
};
