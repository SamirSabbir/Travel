import { Router } from 'express';
import {
  getAllVisasController,
  getVisaByAssignedToController,
  updateVisaByIdController,
} from './visa.controller';

export const visaRoutes = Router();

visaRoutes.get('/', getAllVisasController);
visaRoutes.get('/user', getVisaByAssignedToController);
visaRoutes.patch('/:id', updateVisaByIdController);
