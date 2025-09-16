import { Router } from 'express';
import {
  getAllTourPackagesController,
  getTourPackageByAssignedToController,
  updateTourPackageByIdController,
} from './tourPackage.controller';

export const tourPackageRoutes = Router();

tourPackageRoutes.get('/', getAllTourPackagesController);
tourPackageRoutes.get('/user', getTourPackageByAssignedToController);
tourPackageRoutes.patch('/:id', updateTourPackageByIdController);
