import { CommissionChartModel, KPIChartModel } from '../chart/chart.model';
import TUser from './user.interface';
import { UserModel } from './user.model';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// Create a new user (Employee or other roles)
export const createUserIntoDB = async (userData: TUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  const result = await UserModel.create({
    ...userData,
    password: hashedPassword,
  });
  return result;
};

// Employee profile fetch
export const employeeProfileIntoDB = async (email: string) => {
  const result = await UserModel.findOne({
    email,
    role: { $in: ['Employee', 'OfficeBoy'] },
  });
  return result;
};

// Admin profile fetch (excluding sensitive fields)
export const adminProfileIntoDB = async (email: string, role: string) => {
  const result = await UserModel.findOne({ email, role }).select({
    KPI: 0,
    Commission: 0,
    salary: 0,
    password: 0, // never expose password
  });
  return result;
};

// Update admin profile (with hashed password if provided)
export const updateAdminProfileIntoDB = async (
  email: string,
  role: string,
  data: any,
) => {
  const updateData: any = {
    name: data.name,
    photo: data.photo,
  };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }

  const result = await UserModel.updateOne({ email, role }, updateData);
  return result;
};

// Employee profile update (with hashed password if provided)
export const employeeProfileUpdateIntoDB = async (
  email: string,
  updatedData: TUser,
) => {
  const updateData: any = {
    photo: updatedData.photo,
    name: updatedData.name,
  };

  if (updatedData.password) {
    updateData.password = await bcrypt.hash(updatedData.password, SALT_ROUNDS);
  }

  const result = await UserModel.updateOne(
    { email, role: 'Employee' },
    updateData,
  );
  return result;
};

// Admin updates employee (KPI, salary, commission)
export const employeeAdminUpdateIntoDB = async (
  email: string,
  updatedData: TUser,
) => {
  const result = await UserModel.findOneAndUpdate(
    { email, role: { $in: ['Employee', 'AccountAdmin'] } },
    {
      KPI: updatedData.KPI,
      salary: updatedData.salary,
      commission: updatedData.commission,
      remainingCasualLeaves: updatedData.remainingCasualLeaves,
      remainingSickLeaves: updatedData.remainingSickLeaves,
      joiningDate: updatedData.joiningDate,
    },
    { new: true },
  );

  if (updatedData.KPI) {
    await KPIChartModel.create({
      employeeId: result?._id,
      KPI: updatedData.KPI,
    });
  }
  if (updatedData.commission) {
    await CommissionChartModel.create({
      employeeId: result?._id,
      commission: updatedData.commission,
    });
  }
  return result;
};

// Create Admin (auto-approved with hashed password)
export const createAdminIntoDB = async (userData: TUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  const result = await UserModel.create({
    ...userData,
    password: hashedPassword,
    isApproved: true,
  });
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

// Approve a user
export const approveUserIntoDB = async (email: string) => {
  const user = await UserModel.findOne({
    email,
    role: { $in: ['OfficeBoy', 'AccountAdmin', 'Employee', 'HRAdmin'] },
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

// Delete user
export const deleteUserFromDB = async (email: string) => {
  const result = await UserModel.deleteOne({ email });
  return result;
};
