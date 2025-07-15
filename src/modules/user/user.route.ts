import express from 'express';
import {
  createUser,
  approveUser,
  findUnapprovedUsers,
  createAdminUser,
} from './user.controller';
import { auth } from '../../middlewares/auth';
import { upload } from '../../app/multer.config';

const userRoutes = express.Router();

userRoutes.post('/register', upload.single('photo'), createUser);
userRoutes.post('/create-admin', auth('SuperAdmin','Admin'), upload.single('photo'), createAdminUser);
userRoutes.patch('/approve/:email', auth('SuperAdmin'), approveUser);
userRoutes.get('/findUnapprovedUsers', auth('SuperAdmin'), findUnapprovedUsers);

export default userRoutes;
