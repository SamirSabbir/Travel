import jwt from 'jsonwebtoken';
import config from '../app/config';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.constant';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('You are not authorized');
    }
    jwt.verify(token, config.secret as string, (err, decoded) => {
      if (err) {
        throw new Error('You are not authorized');
      }
      const { userEmail, userRole, photo } = decoded;
      console.log(decoded);

      if (requiredRoles && !requiredRoles.includes(userRole)) {
        throw new Error('You are not authorized');
      }
      req.user = { userEmail, userRole };

      next();
    });
  });
};
