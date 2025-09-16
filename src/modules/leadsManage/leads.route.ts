import express from 'express';
import { auth } from '../../middlewares/auth';
import {
  assignEmailToLeadsManage,
  createLeadsManage,
  getAllLeadsManage,
  getMyAssignedLeadsManage,
} from './leadsManage.controller';

const leadsManageRoutes = express.Router();

leadsManageRoutes.post(
  '/create-lead',
  auth('SuperAdmin', 'HRAdmin'),
  createLeadsManage,
);
leadsManageRoutes.get('/', auth('SuperAdmin', 'HRAdmin'), getAllLeadsManage);
leadsManageRoutes.patch(
  '/assign/:leadId',
  auth('SuperAdmin', 'HRAdmin'),
  assignEmailToLeadsManage,
);
leadsManageRoutes.get(
  '/my-leads',
  auth('Employee', 'SuperAdmin'), // Allowed for these roles
  getMyAssignedLeadsManage,
);

export default leadsManageRoutes;
