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
  auth('SuperAdmin', 'AccountAdmin'),
  createLeadsManage,
);
leadsManageRoutes.get('/', auth('SuperAdmin', 'AccountAdmin'), getAllLeadsManage);
leadsManageRoutes.patch(
  '/assign/:leadId',
  auth('SuperAdmin', 'AccountAdmin'),
  assignEmailToLeadsManage,
);
leadsManageRoutes.get(
  '/my-leads',
  auth('Employee', 'SuperAdmin', 'AccountAdmin'), // Allowed for these roles
  getMyAssignedLeadsManage,
);

export default leadsManageRoutes;
