import { Router } from 'express';
import {
  createNotaryController,
  getAllNotariesController,
  updateNotaryByIdController,
  deleteNotaryByIdController,
  getMonthlyNotaryTotalController,
} from './notary.controller';
import { auth } from '../../middlewares/auth';

export const notaryRoutes = Router();

notaryRoutes.post('/', auth('Employee'), createNotaryController);
notaryRoutes.get('/', auth('SuperAdmin', 'AccountAdmin'), getAllNotariesController);
notaryRoutes.patch('/:id', auth('Employee'), updateNotaryByIdController);
notaryRoutes.delete(
  '/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  deleteNotaryByIdController,
);
notaryRoutes.get(
  '/monthly/total',
  auth('SuperAdmin', 'AccountAdmin'),
  getMonthlyNotaryTotalController,
);
