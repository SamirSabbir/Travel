import { LunchModel } from './lunch.model';
import { TLunch } from './lunch.interface';
import { ExpenseModel } from '../expense/expense.model';


export const createLunchInDB = async (payload: TLunch) => {
  
  await ExpenseModel.create({
    title: `Lunch Expense - ${payload.source || 'Unknown Source'}`,
    category: 'Lunch',
    amount: Number(payload.bill) || 0,
    date: payload.date ? new Date(payload.date) : new Date(),
    paymentMethod: 'Cash', // static unless you want it dynamic
    description: `Lunch ordered from ${payload.source || 'unknown source'} (${
      payload.lunchBoxesNo || 0
    } boxes) - Note: ${payload.note || 'N/A'}`,
    createdBy: undefined, // no employee field in TLunch, keep undefined
  });
  const lunch = await LunchModel.create(payload);

  return lunch;
};


// Get all lunches
export const getAllLunchesFromDB = async () => {
  return await LunchModel.find();
};

// Update lunch by id
export const updateLunchByIdInDB = async (
  id: string,
  updateData: Partial<TLunch>,
) => {
  return await LunchModel.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete lunch by id
export const deleteLunchByIdInDB = async (id: string) => {
  return await LunchModel.findByIdAndDelete(id);
};

// Get monthly total bill
export const getMonthlyLunchTotal = async (year: number, month: number) => {
  const result = await LunchModel.aggregate([
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
