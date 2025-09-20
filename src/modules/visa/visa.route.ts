import { Router } from 'express';
import {
  getAllVisasController,
  getVisaByAssignedToController,
  updateVisaByIdController,
} from './visa.controller';
import { auth } from '../../middlewares/auth';

export const visaRoutes = Router();

visaRoutes.get('/', auth('SuperAdmin'), getAllVisasController);
visaRoutes.get('/user', auth('Employee','SuperAdmin'), getVisaByAssignedToController);
visaRoutes.patch('/:id', auth('Employee'), updateVisaByIdController);
visaRoutes.patch('/update-customer-details/:id', auth('Employee'), updateVisaByIdController);
visaRoutes.patch('/update-customer-details-usa/:id', auth('Employee'), updateVisaByIdController);
visaRoutes.patch('/update-customer-details-schengen/:id', auth('Employee'), updateVisaByIdController);