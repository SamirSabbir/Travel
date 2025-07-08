import { Request, Response } from 'express';
import { blockAUserInDB, createUserIntoDB } from './user.service';

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
  } catch (err) {
    return {
      success: true,
      message: 'User created successfully',
      statusCode: 400,
      error: 'details',
      stack: 'error stack',
    };
  }
};

export const blockUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await blockAUserInDB(userId);
    res.status(201).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 201,
      data: result,
    });
  } catch (err) {
    return {
      success: true,
      message: 'User created successfully',
      statusCode: 400,
      error: 'details',
      stack: 'error stack',
    };
  }
};
