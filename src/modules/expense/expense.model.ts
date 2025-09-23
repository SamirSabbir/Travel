import { Schema, model } from 'mongoose';
import { TExpense } from './expense.interface';

const expenseSchema = new Schema<TExpense>(
  {
    title: { type: String, },
    category: { type: String},
    amount: { type: Number },
    date: { type: Date },
    paymentMethod: { type: String},
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, },
  },
  { timestamps: true },
);

export const ExpenseModel = model<TExpense>('Expense', expenseSchema);
