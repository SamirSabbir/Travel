// routes/account.route.ts
import express from 'express';
import { auth } from '../../middlewares/auth';
import {
  handleCreateAccount,
  handleGetAccountById,
  handleGetAllAccounts,
  handleGetMyAccounts,
} from './accounts.controller';

const router = express.Router();

router.post('/', auth('SuperAdmin', 'AccountAdmin'), handleCreateAccount);
router.get(
  '/all-accounts',
  auth('SuperAdmin', 'AccountAdmin'),
  handleGetAllAccounts,
);

router.get(
  '/my-accounts',
  auth('SuperAdmin', 'AccountAdmin'),
  handleGetMyAccounts,
);

router.get('/:id', auth('SuperAdmin', 'AccountAdmin'), handleGetAccountById);

export const accountRoutes = router;
