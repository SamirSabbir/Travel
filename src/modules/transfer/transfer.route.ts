import { Router } from 'express';
import {
  getAllTransfersController,
  getTransferByAssignedToController,
  updateTransferByIdController,
} from './transfer.controller';
import { auth } from '../../middlewares/auth';

export const transferRoutes = Router();

transferRoutes.get('/', auth('SuperAdmin'), getAllTransfersController);
transferRoutes.get(
  '/user',
  auth('SuperAdmin', 'Employee'),
  getTransferByAssignedToController,
);
transferRoutes.patch(
  '/:id',
  auth('SuperAdmin', 'Employee'),
  updateTransferByIdController,
);
