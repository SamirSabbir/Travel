import { ExpenseModel } from './expense.model';
import { TExpense } from './expense.interface';
import { Parser } from 'json2csv';

const createExpense = async (payload: TExpense) => {
  return await ExpenseModel.create(payload);
};

const getAllExpenses = async (filters: { month?: number; year?: number }) => {
  const query: any = {};
  if (filters.month && filters.year) {
    query.date = {
      $gte: new Date(filters.year, filters.month - 1, 1),
      $lt: new Date(filters.year, filters.month, 1),
    };
  } else if (filters.year) {
    query.date = {
      $gte: new Date(filters.year, 0, 1),
      $lt: new Date(filters.year + 1, 0, 1),
    };
  }
  return await ExpenseModel.find(query).sort({ date: -1 });
};

const downloadExpenseSheet = async (filters: { month?: number; year?: number }) => {
  const expenses = await getAllExpenses(filters);

  const parser = new Parser({
    fields: ['title', 'category', 'amount', 'date', 'paymentMethod', 'description'],
  });

  return parser.parse(expenses);
};

export const ExpenseService = {
  createExpense,
  getAllExpenses,
  downloadExpenseSheet,
};
