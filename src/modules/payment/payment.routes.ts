import express from 'express';
import { auth } from '../../middlewares/auth';
import { handleCreatePayment, handleGetAllPayments, handleGetPaymentById, handleGetPaymentByWorkId, handleUpdatePaymentById } from './payment.controller';

const router = express.Router();

router.post('/', auth('SuperAdmin', 'AccountAdmin'), handleCreatePayment);
router.get('/', auth('SuperAdmin', 'AccountAdmin'), handleGetAllPayments);
router.get('/:id', auth('SuperAdmin', 'AccountAdmin'), handleGetPaymentById);
router.get(
  '/:workId',
  auth('SuperAdmin', 'AccountAdmin'),
  handleGetPaymentByWorkId,
);
router.patch(
  '/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  handleUpdatePaymentById,
);

export const paymentRoutes = router;
