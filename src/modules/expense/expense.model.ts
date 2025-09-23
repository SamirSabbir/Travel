import { Schema, model } from 'mongoose';
import { TExpense } from './expense.interface';

const expenseSchema = new Schema<TExpense>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    paymentMethod: { type: String, required: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const ExpenseModel = model<TExpense>('Expense', expenseSchema);
