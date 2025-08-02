import { Request, Response } from 'express';
import {
  createUserIntoDB,
  createAdminIntoDB,
  findAllUnApprovedUsersFromDB,
  approveUserIntoDB,
  findAllUsersFromDB,
  findAllEmployeesFromDB,
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
      message: 'Failed to approve HR user',
      statusCode: 400,
      error: err.message,
    });
  }
};

// Get all unapproved users
export const findUnapprovedUsers = async (req: Request, res: Response) => {
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
