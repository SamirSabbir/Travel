import { Router } from 'express';
import {
  getAllSalaryCertificatesController,
  getSalaryCertificateByAssignedToController,
  approveSalaryCertificateByIdController,
  createSalaryCertificateController,
} from './salaryCertificate.controller';
import { auth } from '../../middlewares/auth';

export const salaryCertificateRoutes = Router();

salaryCertificateRoutes.get(
  '/',
  auth('AccountAdmin', 'SuperAdmin'),
  getAllSalaryCertificatesController,
);
salaryCertificateRoutes.get(
  '/user',
  auth('SuperAdmin', 'AccountAdmin'),
  getSalaryCertificateByAssignedToController,
);
salaryCertificateRoutes.patch('/:id', approveSalaryCertificateByIdController);
salaryCertificateRoutes.post(
  '/',
  auth('Employee'),
  createSalaryCertificateController,
);
