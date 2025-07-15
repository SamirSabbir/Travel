import { TWork } from './work.interface';
import { WorkModel } from './work.model';


export const createWorkInDB = async (data: TWork) => {
  return await WorkModel.create(data);
};

export const getAllWorkFromDB = async () => {
  return await WorkModel.find().populate('salesId');
};

export const getPipelineDataFromDB = async (employeeEmail:string) => {
  return await WorkModel.find({employeeEmail})
    .populate({
      path: 'salesId',
      populate: {
        path: 'leadId',
        model: 'Lead', 
      },
    });
};
