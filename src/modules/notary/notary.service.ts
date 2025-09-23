import { NotaryModel } from './notary.model';
import { TNotary } from './notary.interface';
import { ExpenseModel } from '../expense/expense.model';

export const createNotaryInDB = async (payload: TNotary) => {
  // Create Notary entry
  const notary = await NotaryModel.create(payload);

  // Also create Expense entry
  if (notary.bill && notary.bill > 0) {
    await ExpenseModel.create({
      category: 'Notary',
      amount: notary.bill,
      date: notary.date || new Date(),
      description: `Notary expense - Client: ${notary.clientName || 'N/A'}`,
    });
  }

  return notary;
};


// Get all notary records
export const getAllNotariesFromDB = async () => {
  return await NotaryModel.find();
};

// Update notary by id
export const updateNotaryByIdInDB = async (
  id: string,
  updateData: Partial<TNotary>,
) => {
  return await NotaryModel.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete notary by id
export const deleteNotaryByIdInDB = async (id: string) => {
  return await NotaryModel.findByIdAndDelete(id);
};

// Get monthly total bill
export const getMonthlyNotaryTotal = async (year: number, month: number) => {
  const result = await NotaryModel.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(year, month - 1, 1),
          $lte: new Date(year, month, 0),
        },
      },
    },
    { $group: { _id: null, totalBill: { $sum: '$bill' } } },
  ]);

  return result[0]?.totalBill || 0;
};
