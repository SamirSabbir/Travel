
import { TNonUS, TUSVisaPayment, TUSRetrieveDS } from "./visa.interface";
import { NonUSModel, TUSVisaPaymentModel, TUSRetrieveDSModel } from "./visa.model";


export const createNonUsVisaData = async (data: TNonUS) => {
  const result = await NonUSModel.create(data);
  return result;
};


export const createUSVisaPaymentData = async (data: TUSVisaPayment) => {
  const result = await TUSVisaPaymentModel.create(data);
  return result;
};


export const createUSRetrieveDSData = async (data: TUSRetrieveDS) => {
  const result = await TUSRetrieveDSModel.create(data);
  return result;
};
