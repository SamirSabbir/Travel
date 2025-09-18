import { Router } from 'express';
import {
  getAllSalaryCertificatesController,
  getSalaryCertificateByAssignedToController,
  updateSalaryCertificateByIdController,
  createSalaryCertificateController,
} from './salaryCertificate.controller';
import { auth } from '../../middlewares/auth';

export const salaryCertificateRoutes = Router();

salaryCertificateRoutes.get('/', getAllSalaryCertificatesController);
salaryCertificateRoutes.get(
  '/user',
  getSalaryCertificateByAssignedToController,
);
salaryCertificateRoutes.patch('/:id', updateSalaryCertificateByIdController);
salaryCertificateRoutes.post('/', auth('Employee'),createSalaryCertificateController);
