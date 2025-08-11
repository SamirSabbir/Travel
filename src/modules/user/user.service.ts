import { KPIChartModel } from '../chart/chart.model';
import TUser from './user.interface';
import { UserModel } from './user.model';

export const createUserIntoDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

export const employeeProfileIntoDB = async (email: string) => {
  const result = await UserModel.findOne({ email, role: 'Employee' });
  return result;
};

export const adminProfileIntoDB = async (email: string, role: string) => {
  const result = await UserModel.findOne({ email, role }).select({
    KPI: 0,
    Commission: 0,
    salary: 0,
  });
  return result;
};

export const updateAdminProfileIntoDB = async (
  email: string,
  role: string,
  data: any,
) => {
  const result = await UserModel.updateOne(
    { email, role },
    { name: data.name, photo: data.photo, password: data.password },
  );
  return result;
};

export const employeeProfileUpdateIntoDB = async (
  email: string,
  updatedData: TUser,
) => {
  const result = await UserModel.updateOne(
    { email, role: 'Employee' },
    {
      photo: updatedData.photo,
      password: updatedData.password,
      name: updatedData.name,
    },
  );
  return result;
};

export const employeeAdminUpdateIntoDB = async (
  email: string,
  updatedData: TUser,
) => {
  const result = await UserModel.findOneAndUpdate(
    { email, role: 'Employee' },
    {
      KPI: updatedData.KPI,
      salary: updatedData.salary,
      Commission: updatedData.Commission,
    },
  );
  if (updatedData.KPI) {
    await KPIChartModel.create({
      employeeId: result?._id,
      KPI: updatedData.KPI,
    });
  }
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
    role: { $in: ['Admin', 'HR', 'AccountAdmin', 'Employee', 'HRAdmin'] },
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
