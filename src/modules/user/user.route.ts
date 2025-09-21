import express from 'express';
import {
  createUser,
  approveUser,
  findUnapprovedUsers,
  createAdminUser,
  findAllUsers,
  findAllEmployeeUsers,
  deleteUser,
  getEmployeeUser,
  updateEmployeeUserForAdmin,
  updateEmployeeUser,
  getAdminProfileUser,
  updateAdminProfileUser,
} from './user.controller';
import { auth } from '../../middlewares/auth';
import { upload } from '../../app/multer.config';

const userRoutes = express.Router();

userRoutes.post('/register', upload.single('photo'), createUser);
userRoutes.post(
  '/create-admin',
  auth('SuperAdmin', 'Admin'),
  upload.single('photo'),
  createAdminUser,
);
userRoutes.patch('/approve/:email', auth('SuperAdmin'), approveUser);
userRoutes.delete('/delete/:email', auth('SuperAdmin'), deleteUser);
userRoutes.get('/findUnapprovedUsers', auth('SuperAdmin'), findUnapprovedUsers);
userRoutes.get(
  '/findAllUsers',
  auth('SuperAdmin', 'Employee', 'OfficeBoy', 'AccountAdmin'),
  findAllUsers,
);
userRoutes.get(
  '/findEmployeeUsers',
  auth('SuperAdmin', 'HRAdmin', 'AccountAdmin', 'Employee'),
  findAllEmployeeUsers,
);
userRoutes.get('/employeeProfile', auth('Employee'), getEmployeeUser);
userRoutes.get(
  '/admin-profile',
  auth('AccountAdmin', 'SuperAdmin', 'HRAdmin'),
  getAdminProfileUser,
);
userRoutes.patch(
  '/admin-profile-update',
  auth('AccountAdmin', 'SuperAdmin', 'HRAdmin'),
  updateAdminProfileUser,
);
userRoutes.patch(
  '/employeeProfileUpdate',
  auth('Employee'),
  updateEmployeeUser,
);
userRoutes.patch(
  '/employeeProfileUpdateForAdmin/:email',
  auth('SuperAdmin', 'AccountAdmin', 'HRAdmin'),
  updateEmployeeUserForAdmin,
);

export default userRoutes;
