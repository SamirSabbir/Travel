// routes/visa.route.ts
import express from 'express';
import {
  handleCreateNonUSVisa,
  handleCreateUSVisaPayment,
  handleCreateUSRetrieveDS,
} from './visa.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post('/non-us', auth('Employee'), handleCreateNonUSVisa);
router.post('/us-payment', auth('Employee'), handleCreateUSVisaPayment);
router.post('/ds-retrieve', auth('Employee'), handleCreateUSRetrieveDS);

export const visaRoutes = router;
