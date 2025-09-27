import express from 'express';
import { auth } from '../../middlewares/auth';
import { upload } from '../../app/multer.config';
import {
  approveWork,
  applyForWorkApproval,
  createWorkEntry,
  directApproveWork,
  getAdminPipelineData,
  getAllEmployeeWorkEntries,
  getAllUnapprovedWorks,
  getAllWorkEntries,
  getMyPipelineData,
  getMyWorkData,
  getPipelineData,
  updateWorkWithAccountAdmin,
  updateWorkWithEmployee,
  updateWorkWithSuperAdmin,
  assignWorkWithEmployeeController,
  cancelWorkController,
  assignServiceController,
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
workRoutes.get('/admin-pipeline', auth('SuperAdmin'), getAdminPipelineData);
workRoutes.get('/my-admin-pipeline', auth('SuperAdmin'), getAdminPipelineData);
workRoutes.get(
  '/my-pipeline/:employeeEmail',
  auth('SuperAdmin'),
  getMyPipelineData,
);
workRoutes.get('/my-works', auth('Employee', 'SuperAdmin'), getMyWorkData);

workRoutes.get(
  '/employee-works',
  auth('SuperAdmin', 'AccountAdmin', 'HRAdmin', 'Employee'),
  getAllEmployeeWorkEntries,
);

// Work approval routes
workRoutes.get(
  '/unapproved-works',
  auth('SuperAdmin', 'AccountAdmin'),
  getAllUnapprovedWorks,
);

workRoutes.patch(
  '/approve-work/:workId',
  auth('SuperAdmin', 'AccountAdmin'),
  approveWork,
);

workRoutes.patch(
  '/cancel-work/:workId',
  auth('SuperAdmin', 'AccountAdmin'),
  cancelWorkController,
);

workRoutes.patch(
  '/direct-approve-work/:workId',
  auth('SuperAdmin', 'AccountAdmin'),
  directApproveWork,
);

workRoutes.patch(
  '/apply-approval/:workId',
  auth('Employee'),
  applyForWorkApproval,
);

// Work assignment route
workRoutes.patch(
  '/assign-work/:workId',
  auth('Employee', 'SuperAdmin', 'AccountAdmin'),
  assignWorkWithEmployeeController,
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
workRoutes.patch(
  '/assign-services/:workId',
  auth('SuperAdmin', 'AccountAdmin', 'HRAdmin'),
  assignServiceController,
);

export default workRoutes;
