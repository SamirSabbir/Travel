import { Schema, model } from 'mongoose';
import { TExpense } from './expense.interface';

const expenseSchema = new Schema<TExpense>(
  {
    title: { type: String, required:true},
    category: { type: String, required:true},
    amount: { type: Number , required:true},
    date: { type: Date, required:true },
    paymentMethod: { type: String, required: true},
    description: { type: String , required: true},
    createdBy: { type: Schema.Types.ObjectId, },
  },
  { timestamps: true },
);

export const ExpenseModel = model<TExpense>('Expense', expenseSchema);
