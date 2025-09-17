import { Router } from 'express';
import {
  createOfficeSupplyController,
  getAllOfficeSuppliesController,
  updateOfficeSupplyByIdController,
  deleteOfficeSupplyByIdController,
  getMonthlyOfficeSuppliesTotalController,
} from './officeSupplies.controller';
import { auth } from '../../middlewares/auth';

export const officeSuppliesRoutes = Router();

officeSuppliesRoutes.post('/', auth('Employee'), createOfficeSupplyController);
officeSuppliesRoutes.get(
  '/',
  auth('SuperAdmin', 'AccountAdmin'),
  getAllOfficeSuppliesController,
);
officeSuppliesRoutes.patch(
  '/:id',
  auth('Employee'),
  updateOfficeSupplyByIdController,
);
officeSuppliesRoutes.delete(
  '/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  deleteOfficeSupplyByIdController,
);
officeSuppliesRoutes.get(
  '/monthly/total',
  auth('SuperAdmin', 'AccountAdmin'),
  getMonthlyOfficeSuppliesTotalController,
);
