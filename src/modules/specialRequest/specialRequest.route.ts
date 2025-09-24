import { Router } from 'express';
import {
  getAllSpecialRequestsController,
  getSpecialRequestByAssignedToController,
  createSpecialRequestController,
  approveSpecialRequestByIdController,
  cancelSpecialRequestByIdController,
} from './specialRequest.controller';
import { auth } from '../../middlewares/auth';

export const specialRequestRoutes = Router();

// Admin/HR can see all
specialRequestRoutes.get(
  '/',
  auth('SuperAdmin', 'AccountAdmin', 'HR'),
  getAllSpecialRequestsController,
);

// Employee sees only their own
specialRequestRoutes.get(
  '/user',
  auth('Employee', 'AccountAdmin', 'OfficeBoy'),
  getSpecialRequestByAssignedToController,
);

// Update only assigned employee can update
specialRequestRoutes.patch(
  '/approve/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  approveSpecialRequestByIdController,
);

specialRequestRoutes.patch(
  '/cancel/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  cancelSpecialRequestByIdController,
);

// Employee can create request
specialRequestRoutes.post(
  '/',
  auth('Employee', 'AccountAdmin', 'OfficeBoy'),
  createSpecialRequestController,
);
