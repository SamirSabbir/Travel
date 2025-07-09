import express from 'express';
import {
  createUser,
  approveHRUser,
  findUnapprovedUsers,
} from './user.controller';
import { auth } from '../../middlewares/auth';
import { upload } from '../../app/multer.config';

const userRoutes = express.Router();

userRoutes.post('/register',upload.single('photo'), createUser);
userRoutes.patch('/approve/:email', auth('Admin'), approveHRUser);
userRoutes.get('/findUnapprovedUsers', auth('Admin'), findUnapprovedUsers);

export default userRoutes;
