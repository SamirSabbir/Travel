import { Router } from 'express';
import { ExpenseController } from './expense.controller';

const router = Router();

router.post('/', ExpenseController.createExpense);
router.get('/', ExpenseController.getAllExpenses);
router.get('/download', ExpenseController.downloadExpenseSheet);

export const ExpenseRoutes = router;
