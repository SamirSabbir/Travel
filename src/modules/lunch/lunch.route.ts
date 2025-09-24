import { Router } from 'express';
import {
  createLunchController,
  getAllLunchesController,
  updateLunchByIdController,
  deleteLunchByIdController,
  getMonthlyLunchTotalController,
} from './lunch.controller';
import { auth } from '../../middlewares/auth';

export const lunchRoutes = Router();

lunchRoutes.post('/', auth('OfficeBoy'), createLunchController);
lunchRoutes.get(
  '/',
  auth('SuperAdmin', 'AccountAdmin','OfficeBoy'),
  getAllLunchesController,
);
lunchRoutes.patch('/:id', auth('Employee'), updateLunchByIdController);
lunchRoutes.delete(
  '/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  deleteLunchByIdController,
);
lunchRoutes.get(
  '/monthly/total',
  auth('SuperAdmin', 'AccountAdmin'),
  getMonthlyLunchTotalController,
);
