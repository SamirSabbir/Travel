import config from '../../app/config';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await UserModel.findOne({ email: payload.email });

  if (!isUserExist) {
    throw new Error('Invalid credentials');
  }

  if (isUserExist.isApproved === false) {
    throw new Error('User is not approved');
  }

  // ✅ Compare hashed password with user input
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid credentials');
  }

  let tokenPayload = {};

  if (isUserExist.role === 'Employee' || isUserExist.role === 'AccountAdmin') {
    tokenPayload = {
      userEmail: isUserExist.email,
      userRole: isUserExist.role,
      userName: isUserExist.name,
      photo: isUserExist.photo,
      commission: isUserExist?.commission as any,
      sickLeaves: isUserExist.remainingCasualLeaves,
      casualLeaves: isUserExist.remainingSickLeaves,
    };

    const accessToken = jwt.sign(tokenPayload, config.secret as string, {
      expiresIn: 60 * 60 * 24, // 1 day
    });

    return accessToken;
  }

  tokenPayload = {
    userEmail: isUserExist.email,
    userRole: isUserExist.role,
    userName: isUserExist.name,
    photo: isUserExist.photo,
  };

  const accessToken = jwt.sign(tokenPayload, config.secret as string, {
    expiresIn: 60 * 60 * 24, // 1 day
  });

  return accessToken;
};

export default {
  loginUser,
};
