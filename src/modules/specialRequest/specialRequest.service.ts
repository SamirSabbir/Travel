import { SpecialRequestModel } from './specialRequest.model';
import { ISpecialRequest } from './specialRequest.interface';

export const getAllSpecialRequestsFromDB = async () => {
  return await SpecialRequestModel.find({ approved: false, cancelled: false });
};

export const getSpecialRequestByAssignedToFromDB = async (
  userEmail: string,
) => {
  return await SpecialRequestModel.findOne({ assignedTo: userEmail });
};

export const approveSpecialRequestByIdInDB = async (
  id: string,
  userEmail: string,
) => {
  const result = await SpecialRequestModel.findOneAndUpdate(
    { _id: id },
    { approved: true, approvedBy: userEmail },
  );
  return result;
};

export const cancelSpecialRequestByIdInDB = async (
  id: string,
  userEmail: string,
) => {
  const result = await SpecialRequestModel.findOneAndUpdate(
    { _id: id },
    { cancelled: true, cancelledBy: userEmail },
  );
  return result;
};

export const createSpecialRequestInDB = async (
  userName: string,
  userEmail: string,
  data: ISpecialRequest,
) => {
  // Enforce casual leave max 2 days
  if (
    data.type === 'CasualLeave' &&
    data.leaveDates &&
    data.leaveDates.length > 2
  ) {
    throw new Error('Cannot select more than 2 days for casual leave');
  }
  return await SpecialRequestModel.create({
    ...data,
    employeeName: userName,
    employeeEmail: userEmail,
  });
};
