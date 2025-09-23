import { Router } from 'express';
import { ExpenseController } from './expense.controller';
import { auth } from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth('SuperAdmin', 'AccountAdmin'),
  ExpenseController.createExpense,
);
router.get(
  '/',
  auth('SuperAdmin', 'AccountAdmin'),
  ExpenseController.getAllExpenses,
);
router.get(
  '/download',
  auth('SuperAdmin', 'AccountAdmin'),
  ExpenseController.downloadExpenseSheet,
);

export const ExpenseRoutes = router;
