import { Router } from 'express';
import {
  getAllTourPackagesController,
  getTourPackageByAssignedToController,
  updateTourPackageByIdController,
} from './tourPackage.controller';
import { auth } from '../../middlewares/auth';

export const tourPackageRoutes = Router();

tourPackageRoutes.get('/', auth('SuperAdmin'), getAllTourPackagesController);
tourPackageRoutes.get(
  '/user',
  auth('SuperAdmin', 'Employee'),
  getTourPackageByAssignedToController,
);
tourPackageRoutes.patch(
  '/:id',
  auth('SuperAdmin', 'Employee'),
  updateTourPackageByIdController,
);
