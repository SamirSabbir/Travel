import { NOCModel } from './noc.model';
import { INOC } from './noc.interface';

export const getAllNOCsFromDB = async () => {
  return await NOCModel.find();
};

export const getNOCByAssignedToFromDB = async (userEmail: string) => {
  return await NOCModel.findOne({ assignedTo: userEmail });
};

export const updateNOCByIdInDB = async (
  id: string,
  userEmail: string,
  updateData: Partial<INOC>,
) => {
  const result = await NOCModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
    { new: true },
  );
  return result;
};

export const createNOCInDB = async (data: INOC) => {
  return await NOCModel.create(data);
};
