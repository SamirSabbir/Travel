import { Router } from 'express';
import {
  getAllSpecialRequestsController,
  getSpecialRequestByAssignedToController,
  createSpecialRequestController,
  approveSpecialRequestByIdController,
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
  auth('Employee'),
  getSpecialRequestByAssignedToController,
);

// Update only assigned employee can update
specialRequestRoutes.patch(
  '/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  approveSpecialRequestByIdController,
);

// Employee can create request
specialRequestRoutes.post(
  '/',
  auth('Employee'),
  createSpecialRequestController,
);
