import { Request, Response } from 'express';
import {
  createUserIntoDB,
  createAdminIntoDB,
  findAllUnApprovedUsersFromDB,
  approveUserIntoDB,
  findAllUsersFromDB,
  findAllEmployeesFromDB,
  deleteUserFromDB,
  employeeProfileIntoDB,
  employeeProfileUpdateIntoDB,
  employeeAdminUpdateIntoDB,
  adminProfileIntoDB,
  updateAdminProfileIntoDB,
} from './user.service';

export const createAdminUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    if (req.file) {
      userData.photo = req.file.path;
    }

    const result = await createAdminIntoDB(userData);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create user',
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    if (req.file) {
      userData.photo = req.file.path;
    }

    const result = await createUserIntoDB(userData);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create user',
    });
  }
};

// Approve HR User
export const approveUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const result = await approveUserIntoDB(email);
    res.status(200).json({
      success: true,
      message: 'User approved successfully',
      statusCode: 200,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to approve user',
      statusCode: 400,
      error: err.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const result = await deleteUserFromDB(email);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      statusCode: 200,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to approve HR user',
      statusCode: 400,
      error: err.message,
    });
  }
};

// Get all unapproved users
export const findUnapprovedUsers = async (req: Request, res: Response) => {
  try {
    const result = await findAllUnApprovedUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'All users retrieved successfully',
      statusCode: 200,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to get all users',
      statusCode: 400,
      error: err.message,
    });
  }
};

// Get all unapproved users
export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await findAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'All users retrieved successfully',
      statusCode: 200,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to get all users',
      statusCode: 400,
      error: err.message,
    });
  }
};

export const getEmployeeUser = async (req: Request, res: Response) => {
  try {
    const result = await employeeProfileIntoDB(req?.user.userEmail);
    res.status(200).json({
      success: true,
      message: 'All users retrieved successfully',
      statusCode: 200,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to get all users',
      statusCode: 400,
      error: err.message,
    });
  }
};

export const getAdminProfileUser = async (req: Request, res: Response) => {
  try {
    const result = await adminProfileIntoDB(
      req?.user?.userEmail,
      req?.user?.userRole,
    );
    res.status(200).json({
      success: true,
      message: 'All users retrieved successfully',
      statusCode: 200,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to get all users',
      statusCode: 400,
      error: err.message,
    });
  }
};

export const updateAdminProfileUser = async (req: Request, res: Response) => {
  try {
    const result = await updateAdminProfileIntoDB(
      req?.user?.userEmail,
      req?.user?.userRole,
      req.body,
    );
    res.status(200).json({
      success: true,
      message: 'Usr profile updated successfully',
      statusCode: 200,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'User profile update failed',
      statusCode: 400,
      error: err.message,
    });
  }
};

export const updateEmployeeUser = async (req: Request, res: Response) => {
  try {
    const result = await employeeProfileUpdateIntoDB(
      req?.user.userEmail,
      req.body,
    );
    res.status(200).json({
      success: true,
      message: 'Employee profile updated successfully',
      statusCode: 200,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to update employee profile',
      statusCode: 400,
      error: err.message,
    });
  }
};

export const updateEmployeeUserForAdmin = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await employeeAdminUpdateIntoDB(req.params.email, req.body);
    res.status(200).json({
      success: true,
      message: 'Employee profile updated successfully',
      statusCode: 200,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to update employee profile',
      statusCode: 400,
      error: err.message,
    });
  }
};

// Get all unapproved users
export const findAllEmployeeUsers = async (req: Request, res: Response) => {
  try {
    const result = await findAllEmployeesFromDB();
    res.status(200).json({
      success: true,
      message: 'All users retrieved successfully',
      statusCode: 200,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to get all users',
      statusCode: 400,
      error: err.message,
    });
  }
};
