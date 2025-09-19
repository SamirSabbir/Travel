import { NOCModel } from './noc.model';
import { INOC } from './noc.interface';

export const getAllNOCsFromDB = async () => {
  return await NOCModel.find();
};

export const getNOCByAssignedToFromDB = async (userEmail: string) => {
  return await NOCModel.findOne({ assignedTo: userEmail });
};

export const ApproveNOCByIdInDB = async (id: string, userEmail: string) => {
  const result = await NOCModel.findOneAndUpdate(
    { _id: id },
    { approved: true, approvedBy: userEmail },
  );
  return result;
};

export const createNOCInDB = async (data: INOC) => {
  return await NOCModel.create(data);
};
