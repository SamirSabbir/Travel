import express from 'express';

import { auth } from '../../middlewares/auth';
import { upload } from '../../app/multer.config';
import {
  createWorkEntry,
  getAllEmployeeWorkEntries,
  getAllWorkEntries,
  getPipelineData,
  updateWorkWithAccountAdmin,
  updateWorkWithEmployee,
} from './work.controller';

const workRoutes = express.Router();

workRoutes.post(
  '/',
  auth('Employee', 'SuperAdmin'),
  upload.array('files'),
  createWorkEntry,
);

workRoutes.get('/', auth('Employee', 'SuperAdmin'), getAllWorkEntries);
workRoutes.get('/pipeline', auth('Employee', 'SuperAdmin'), getPipelineData);
workRoutes.get('/admin-pipeline', auth('SuperAdmin'), getPipelineData);
workRoutes.get(
  '/my-works',
  auth('Employee', 'SuperAdmin'),
  getAllEmployeeWorkEntries,
);
workRoutes.patch(
  '/update-work-employee/:workId',
  auth('Employee', 'SuperAdmin'),
  updateWorkWithEmployee,
);
workRoutes.patch(
  '/update-work-account-admin/:workId',
  auth('AccountAdmin', 'SuperAdmin'),
  updateWorkWithAccountAdmin,
);

export default workRoutes;
