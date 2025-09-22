import { InvoiceModel } from './invoice.model';
import { TInvoice } from './invoice.interface';

// ✅ Create invoice
export const createInvoiceInDB = async (data: TInvoice) => {
  const invoice = new InvoiceModel(data);
  return await invoice.save();
};

// ✅ Get all invoices (SuperAdmin, Accounts)
export const getAllInvoicesFromDB = async () => {
  return await InvoiceModel.find().populate('workId');
};

// ✅ Get invoice by ID
export const getInvoiceByIdFromDB = async (id: string) => {
  return await InvoiceModel.findById(id).populate('workId');
};

// ✅ Get invoice by workId
export const getInvoiceByWorkIdFromDB = async (workId: string) => {
  return await InvoiceModel.findOne({ workId }).populate('workId');
};

// ✅ Update invoice by ID
export const updateInvoiceByIdInDB = async (
  id: string,
  updateData: Partial<TInvoice>,
) => {
  const result = await InvoiceModel.findByIdAndUpdate(id, updateData, {
    new: true,
  }).populate('workId');
  return result;
};

// ✅ Delete invoice
export const deleteInvoiceByIdInDB = async (id: string) => {
  return await InvoiceModel.findByIdAndDelete(id);
};
