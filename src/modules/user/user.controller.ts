import { Request, Response } from 'express';
import {
  createUserIntoDB,
  findAllUnApprovedUsersFromDB,
  approveHRUserIntoDB,
} from './user.service';

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await createUserIntoDB(userData);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      statusCode: 201,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to create user',
      statusCode: 400,
      error: err.message,
    });
  }
};

// Approve HR User
export const approveHRUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const result = await approveHRUserIntoDB(email);
    res.status(200).json({
      success: true,
      message: 'HR user approved successfully',
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
      message: 'Unapproved users retrieved successfully',
      statusCode: 200,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to get unapproved users',
      statusCode: 400,
      error: err.message,
    });
  }
};
