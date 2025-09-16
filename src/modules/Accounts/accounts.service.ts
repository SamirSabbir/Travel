// services/account.service.ts

import { CommissionChartModel } from '../chart/chart.model';
import { TAccount } from './accounts.interface';
import { AccountModel } from './accounts.model';

export const createAccountData = async (data: TAccount) => {
  const result = await AccountModel.create(data);
  if (data.commission) {
    await CommissionChartModel.create({
      employeeId: result?._id,
      commission: data.commission,
    });
  }
  return result;
};

export const getAllAccountsFromDB = async () => {
  return await AccountModel.find().populate('saleId');
};

export const getMyAccountsFromDB = async (accountAdminEmail: string) => {
  const result = await AccountModel.find({ accountAdminEmail });
  return result;
};

export const getAccountByIdFromDB = async (id: string) => {
  return await AccountModel.findById(id).populate('saleId');
};
