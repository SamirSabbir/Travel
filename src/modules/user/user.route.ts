import express from 'express';
import { createUser, blockUser } from './user.controller';
import { auth } from '../../middlewares/auth';

const userRoutes = express.Router();

userRoutes.post('/', createUser);
userRoutes.patch('/block/:userId', auth(USER_ROLE.admin), blockUser);

export default userRoutes;
