import { NotaryModel } from './notary.model';
import { TNotary } from './notary.interface';

// Create notary entry
export const createNotaryInDB = async (payload: TNotary) => {
  return await NotaryModel.create(payload);
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
