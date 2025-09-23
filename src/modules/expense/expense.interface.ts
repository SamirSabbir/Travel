import mongoose from 'mongoose';

export interface TExpense {
  title: string;                     // Expense title (e.g., "Office Rent")
  category: string;                  // Expense category (e.g., "Rent", "Travel", "Utility")
  amount: number;                    // Expense amount
  date: Date;                        // Date of expense
  paymentMethod: string;             // e.g., Cash, Bank Transfer, Card
  description?: string;              // Optional details
  createdBy: mongoose.Types.ObjectId; // Reference to User who created the expense
}
