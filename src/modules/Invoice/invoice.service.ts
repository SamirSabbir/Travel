import { TInvoice } from './invoice.interface';
import { InvoiceModel } from './invoice.model';

export const createInvoice = async (
  data: TInvoice,
  accountAdminEmail: string,
) => {
  const result = await InvoiceModel.create({ ...data, accountAdminEmail });
  return result;
};

export const getAllInvoicesFromDB = async (accountAdminEmail: string) => {
  return await InvoiceModel.find({ accountAdminEmail });
};

export const getInvoiceByIdFromDB = async (id: string) => {
  return await InvoiceModel.findById(id);
};
