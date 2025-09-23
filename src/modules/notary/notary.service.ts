import { NotaryModel } from './notary.model';
import { TNotary } from './notary.interface';
import { ExpenseModel } from '../expense/expense.model';

export const createNotaryInDB = async (payload: TNotary) => {
  const notary = await NotaryModel.create(payload);

  // Also create expense entry
  if (payload.bill && payload.bill > 0) {
    await ExpenseModel.create({
      title: `Notary Service - ${payload.clientName || 'Unknown Client'}`,
      category: 'Notary',
      amount: payload.bill,
      date: payload.date || new Date(),
      paymentMethod: 'Cash', // or dynamic from payload
      description: `Notary expense for ${payload.documents || 'documents'}`,
      createdBy: notary.employee, // employee id if available
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
