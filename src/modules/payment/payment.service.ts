import { TPayment } from './payment.interface';
import { PaymentModel } from './payment.model';

// Create payment
export const createPayment = async (data: TPayment) => {
  return await PaymentModel.create(data);
};

// Get all payments
export const getAllPaymentsFromDB = async () => {
  return await PaymentModel.find();
};

// Get payment by ID
export const getPaymentByIdFromDB = async (id: string) => {
  return await PaymentModel.findById(id);
};

// Get payment by workId
export const getPaymentByWorkIdFromDB = async (workId: string) => {
  return await PaymentModel.findOne({ workId });
};

// Update payment by ID
export const updatePaymentByIdInDB = async (
  id: string,
  updateData: Partial<TPayment>,
) => {
  return await PaymentModel.findByIdAndUpdate(id, updateData, { new: true });
};
