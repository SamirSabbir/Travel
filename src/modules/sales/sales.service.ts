import { TSales } from './sales.interface';
import { SalesModel } from './sales.model';

export const createSalesEntryInDB = async (data: TSales) => {
  const result = await SalesModel.create(data);
  return result
};
