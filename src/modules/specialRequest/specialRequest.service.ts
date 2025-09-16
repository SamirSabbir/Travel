import { SpecialRequestModel } from './specialRequest.model';
import { ISpecialRequest } from './specialRequest.interface';

export const getAllSpecialRequestsFromDB = async () => {
  return await SpecialRequestModel.find();
};

export const getSpecialRequestByAssignedToFromDB = async (
  userEmail: string,
) => {
  return await SpecialRequestModel.findOne({ assignedTo: userEmail });
};

export const updateSpecialRequestByIdInDB = async (
  id: string,
  userEmail: string,
  updateData: Partial<ISpecialRequest>,
) => {
  const result = await SpecialRequestModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
    { new: true },
  );
  return result;
};

export const createSpecialRequestInDB = async (data: ISpecialRequest) => {
  // Enforce casual leave max 2 days
  if (
    data.type === 'CasualLeave' &&
    data.leaveDates &&
    data.leaveDates.length > 2
  ) {
    throw new Error('Cannot select more than 2 days for casual leave');
  }
  return await SpecialRequestModel.create(data);
};
