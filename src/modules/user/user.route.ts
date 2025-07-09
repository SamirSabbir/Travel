import express from 'express';
import {
  createUser,
  approveHRUser,
  findUnapprovedUsers,
} from './user.controller';
import { auth } from '../../middlewares/auth';

const userRoutes = express.Router();

userRoutes.post('/register', createUser);
userRoutes.patch('/approve/:email', auth('Admin'), approveHRUser);
userRoutes.get('/findUnapprovedUsers', auth('Admin'), findUnapprovedUsers);

export default userRoutes;
