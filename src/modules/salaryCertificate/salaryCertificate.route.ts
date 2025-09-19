import { Router } from 'express';
import {
  getAllSalaryCertificatesController,
  getSalaryCertificateByAssignedToController,
  approveSalaryCertificateByIdController,
  createSalaryCertificateController,
  cancelSalaryCertificateByIdController,
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
salaryCertificateRoutes.patch(
  '/approve/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  approveSalaryCertificateByIdController,
);

salaryCertificateRoutes.patch(
  '/cancel/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  cancelSalaryCertificateByIdController,
);

salaryCertificateRoutes.post(
  '/',
  auth('Employee'),
  createSalaryCertificateController,
);
