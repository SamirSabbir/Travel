// services/account.service.ts

import { TAccount } from "./accounts.interface";
import { AccountModel } from "./accounts.model";

export const createAccountData = async (data: TAccount) => {
  const result = await AccountModel.create(data);
  return result;
};

export const getAllAccountsFromDB = async () => {
  return await AccountModel.find();
};

export const getAccountByIdFromDB = async (id: string) => {
  return await AccountModel.findById(id);
};
