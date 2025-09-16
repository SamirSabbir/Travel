import { Request, Response } from 'express';
import authService from './auth.service';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const authData = req.body;
    const result = await authService.loginUser(authData);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: {
        token: result,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Authentication Failed',
    });
  }
};
