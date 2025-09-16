import { Router } from 'express';
import {
  getAllSalaryCertificatesController,
  getSalaryCertificateByAssignedToController,
  updateSalaryCertificateByIdController,
  createSalaryCertificateController,
} from './salaryCertificate.controller';

export const salaryCertificateRoutes = Router();

salaryCertificateRoutes.get('/', getAllSalaryCertificatesController);
salaryCertificateRoutes.get(
  '/user',
  getSalaryCertificateByAssignedToController,
);
salaryCertificateRoutes.patch('/:id', updateSalaryCertificateByIdController);
salaryCertificateRoutes.post('/', createSalaryCertificateController);
