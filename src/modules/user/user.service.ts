import TUser from './user.interface';
import { UserModel } from './user.model';

export const createUserIntoDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

export const createAdminIntoDB = async (userData: TUser) => {
  const result = await UserModel.create({ ...userData, isApproved: true });
  return result;
};

export const findAllUnApprovedUsersFromDB = async () => {
  const result = await UserModel.find({ isApproved: false });
  return result;
};

export const findAllUsersFromDB = async () => {
  const result = await UserModel.find({ isApproved: true });
  return result;
};

export const findAllEmployeesFromDB = async () => {
  const result = await UserModel.find({ isApproved: true, role: 'Employee' });
  return result;
};

export const approveUserIntoDB = async (email: string) => {
  const user = await UserModel.findOne({
    email,
    role: { $in: ['Admin', 'HR', 'AccountAdmin'] },
  });

  if (!user) {
    throw new Error('User approve request not found');
  }

  if (user.isApproved) {
    throw new Error('User is already approved');
  }

  const result = await UserModel.updateOne(
    { email, isApproved: false },
    { isApproved: true },
  );

  return result;
};

export const deleteUserFromDB = async (email: string) => {
  const result = await UserModel.deleteOne({ email });
  return result;
};
