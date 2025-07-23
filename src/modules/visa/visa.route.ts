// routes/visa.route.ts
import express from 'express';
import {
  handleCreateNonUSVisa,
  handleCreateUSVisaPayment,
  handleCreateUSRetrieveDS,
  handleGetAllNonUSVisa,
  handleGetAllUSVisaPayment,
  handleGetAllUSRetrieveDS,
} from './visa.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post('/non-us', auth('SuperAdmin', 'Employee'), handleCreateNonUSVisa);
router.post(
  '/us-payment',
  auth('SuperAdmin', 'Employee'),
  handleCreateUSVisaPayment,
);
router.post(
  '/ds-retrieve',
  auth('SuperAdmin', 'Employee'),
  handleCreateUSRetrieveDS,
);
router.get('/non-us', auth('SuperAdmin', 'Employee'), handleGetAllNonUSVisa);
router.get(
  '/us-payment',
  auth('SuperAdmin', 'Employee'),
  handleGetAllUSVisaPayment,
);
router.get(
  '/ds-retrieve',
  auth('SuperAdmin', 'Employee'),
  handleGetAllUSRetrieveDS,
);

export const visaRoutes = router;
