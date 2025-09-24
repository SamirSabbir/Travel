import { Router } from 'express';
import {
  getAllNOCsController,
  getNOCByAssignedToController,
  approveNOCByIdController,
  createNOCController,
  cancelNOCByIdController,
} from './noc.controller';
import { auth } from '../../middlewares/auth';

export const nocRoutes = Router();

// Admin/HR can see all
nocRoutes.get(
  '/',
  auth('SuperAdmin', 'AccountAdmin', 'HR'),
  getAllNOCsController,
);

// Employee sees only their own
nocRoutes.get(
  '/user',
  auth('SuperAdmin', 'AccountAdmin','OfficeBoy','Employee'),
  getNOCByAssignedToController,
);

// Update only assigned employee can update
nocRoutes.patch(
  '/approve/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  approveNOCByIdController,
);
nocRoutes.patch(
  '/cancel/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  cancelNOCByIdController,
);

// Employee can create request
nocRoutes.post('/', auth('Employee','AccountAdmin','OfficeBoy'), createNOCController);
