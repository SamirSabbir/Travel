import { TWork } from './work.interface';
import { WorkModel } from './work.model';


export const createWorkInDB = async (data: TWork) => {
  return await WorkModel.create(data);
};

export const getAllWorkFromDB = async () => {
  return await WorkModel.find().populate('salesId');
};
