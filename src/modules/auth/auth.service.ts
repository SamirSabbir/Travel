import config from '../../app/config';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await UserModel.findOne({ email: payload.email });

  if (!isUserExist) {
    throw new Error('Invalid credentials');
  }

  const isPasswordMatched = payload.password === isUserExist?.password;

  if (!isPasswordMatched) {
    throw new Error('Invalid credentials');
  }

  const tokenPayload = {
    userEmail: isUserExist.email,
    userRole: isUserExist.role,
  };
  const accessToken = jwt.sign(tokenPayload, config.secret as string, {
    expiresIn: 60 * 60,
  });
  console.log(accessToken);
  return accessToken;
};

export default {
  loginUser,
};
