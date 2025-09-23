import { Request, Response } from 'express';
import { ExpenseService } from './expense.service';

const createExpense = async (req: Request, res: Response) => {
  try {
    const result = await ExpenseService.createExpense(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    const result = await ExpenseService.getAllExpenses({
      month: month ? Number(month) : undefined,
      year: year ? Number(year) : undefined,
    });
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const downloadExpenseSheet = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    const csv = await ExpenseService.downloadExpenseSheet({
      month: month ? Number(month) : undefined,
      year: year ? Number(year) : undefined,
    });

    res.header('Content-Type', 'text/csv');
    res.attachment(`expenses_${year || 'all'}_${month || 'all'}.csv`);
    return res.send(csv);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const ExpenseController = {
  createExpense,
  getAllExpenses,
  downloadExpenseSheet,
};
