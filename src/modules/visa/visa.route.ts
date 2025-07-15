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

router.post('/non-us', auth('Employee'), handleCreateNonUSVisa);
router.post('/us-payment', auth('Employee'), handleCreateUSVisaPayment);
router.post('/ds-retrieve', auth('Employee'), handleCreateUSRetrieveDS);
router.get('/non-us', auth('Employee'), handleGetAllNonUSVisa);
router.get('/us-payment', auth('Employee'), handleGetAllUSVisaPayment);
router.get('/ds-retrieve', auth('Employee'), handleGetAllUSRetrieveDS);

export const visaRoutes = router;
