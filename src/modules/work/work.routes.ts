import express from 'express';

import { auth } from '../../middlewares/auth';
import { upload } from '../../app/multer.config';
import {
  createWorkEntry,
  getAdminPipelineData,
  getAllEmployeeWorkEntries,
  getAllWorkEntries,
  getMyPipelineData,
  getMyWorkData,
  getPipelineData,
  updateWorkWithAccountAdmin,
  updateWorkWithEmployee,
  updateWorkWithSuperAdmin,
} from './work.controller';

const workRoutes = express.Router();

workRoutes.post(
  '/',
  auth('Employee', 'SuperAdmin'),
  upload.array('files'),
  createWorkEntry,
);

workRoutes.get('/', auth('Employee', 'SuperAdmin'), getAllWorkEntries);
workRoutes.get('/pipeline', auth('Employee'), getPipelineData);
// workRoutes.get('/pipeline', auth('Employee'), getPipelineData);
workRoutes.get('/admin-pipeline', auth('SuperAdmin'), getAdminPipelineData);
workRoutes.get('/my-admin-pipeline', auth('SuperAdmin'), getAdminPipelineData);
workRoutes.get(
  '/my-pipeline/:employeeEmail',
  auth('SuperAdmin'),
  getMyPipelineData,
);
workRoutes.get(
  '/my-works',
  auth('Employee', 'SuperAdmin'),
  getMyWorkData,
);

workRoutes.get(
  '/employee-works',
  auth('SuperAdmin', 'AccountAdmin', 'HRAdmin', 'Employee'),
  getAllEmployeeWorkEntries,
);
workRoutes.patch(
  '/update-work-employee/:workId',
  auth('Employee', 'SuperAdmin'),
  updateWorkWithEmployee,
);

workRoutes.patch(
  '/update-work-super-admin/:workId',
  auth('SuperAdmin'),
  updateWorkWithSuperAdmin,
);

workRoutes.patch(
  '/update-work-account-admin/:workId',
  auth('AccountAdmin', 'SuperAdmin'),
  updateWorkWithAccountAdmin,
);

export default workRoutes;
