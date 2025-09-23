import { SpecialRequestModel } from './specialRequest.model';
import { ISpecialRequest } from './specialRequest.interface';
import { UserModel } from '../user/user.model';

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
  adminEmail: string,
) => {
  const request = await SpecialRequestModel.findById(id);
  if (!request) throw new Error('Request not found');

  const user = await UserModel.findOne({ email: request.userEmail });
  if (!user) throw new Error('User not found');

  // Deduct balances only now
  if (request.type === 'CasualLeave' && request.leaveDates) {
    user.remainingCasualLeaves -= request.leaveDates.length;
  }

  if (request.type === 'SickLeave' && request.leaveDates) {
    user.remainingSickLeaves -= request.leaveDates.length;
  }

  if (request.type === 'CommissionWithdrawal') {
    user.Commission -= request.commissionAmount ?? 0;
  }

  await user.save();

  const result = await SpecialRequestModel.findOneAndUpdate(
    { _id: id },
    { approved: true, approvedBy: adminEmail },
    { new: true },
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
  const user = await UserModel.findOne({ email: userEmail });
  if (!user) throw new Error('User not found');

  // Validation only
  if (data.type === 'CasualLeave') {
    if (
      !data.leaveDates ||
      data.leaveDates.length > user.remainingCasualLeaves
    ) {
      throw new Error(
        `You only have ${user.remainingCasualLeaves} casual leaves remaining`,
      );
    }
  }

  if (data.type === 'SickLeave') {
    if (!data.leaveDates || data.leaveDates.length > user.remainingSickLeaves) {
      throw new Error(
        `You only have ${user.remainingSickLeaves} sick leaves remaining`,
      );
    }
  }

  if (data.type === 'CommissionWithdrawal') {
    if ((data.commissionAmount ?? 0) > user.Commission) {
      throw new Error(
        `You only have ${user.Commission} commission balance available`,
      );
    }
  }

  return await SpecialRequestModel.create({
    ...data,
    userName,
    userEmail,
    userRole: user.role,
  });
};
