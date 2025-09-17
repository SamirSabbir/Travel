import { OfficeSuppliesModel } from './officeSupplies.model';
import { TOfficeSupplies } from './officeSupplies.interface';

// Create office supply entry
export const createOfficeSupplyInDB = async (payload: TOfficeSupplies) => {
  return await OfficeSuppliesModel.create(payload);
};

// Get all office supplies
export const getAllOfficeSuppliesFromDB = async () => {
  return await OfficeSuppliesModel.find();
};

// Update office supply by id
export const updateOfficeSupplyByIdInDB = async (
  id: string,
  updateData: Partial<TOfficeSupplies>,
) => {
  return await OfficeSuppliesModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

// Delete office supply by id
export const deleteOfficeSupplyByIdInDB = async (id: string) => {
  return await OfficeSuppliesModel.findByIdAndDelete(id);
};

// Get monthly total bill
export const getMonthlyOfficeSuppliesTotal = async (
  year: number,
  month: number,
) => {
  const result = await OfficeSuppliesModel.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(year, month - 1, 1),
          $lte: new Date(year, month, 0),
        },
      },
    },
    { $group: { _id: null, totalBill: { $sum: '$total' } } },
  ]);

  return result[0]?.totalBill || 0;
};
