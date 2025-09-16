import { VisaModel } from './visa.model';
import { TVisa } from './visa.interface';

export const getAllVisasFromDB = async () => {
  return await VisaModel.find();
};

export const getVisaByAssignedToFromDB = async (userEmail: string) => {
  return await VisaModel.find({ assignedTo: userEmail }).populate('workId');
};

export const updateVisaByIdInDB = async (
  id: string,
  userEmail: string,
  updateData: Partial<TVisa>,
) => {
  const result = await VisaModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
  ).populate('workId');
  return result;
};
