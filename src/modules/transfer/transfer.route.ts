import { Router } from 'express';
import {
  getAllTransfersController,
  getTransferByAssignedToController,
  updateTransferByIdController,
} from './transfer.controller';

export const transferRoutes = Router();

transferRoutes.get('/', getAllTransfersController);
transferRoutes.get('/user', getTransferByAssignedToController);
transferRoutes.patch('/:id', updateTransferByIdController);
