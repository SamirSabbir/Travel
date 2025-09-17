import { LunchModel } from './lunch.model';
import { TLunch } from './lunch.interface';

// Create lunch entry
export const createLunchInDB = async (payload: TLunch) => {
  return await LunchModel.create(payload);
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
