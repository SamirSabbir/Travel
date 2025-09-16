import { Router } from 'express';
import {
  getAllNOCsController,
  getNOCByAssignedToController,
  updateNOCByIdController,
  createNOCController,
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
nocRoutes.get('/user', auth('Employee'), getNOCByAssignedToController);

// Update only assigned employee can update
nocRoutes.patch('/:id', auth('Employee'), updateNOCByIdController);

// Employee can create request
nocRoutes.post('/', auth('Employee'), createNOCController);
