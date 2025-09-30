import { OfficeSuppliesModel } from './officeSupplies.model';
import { TOfficeSupplies } from './officeSupplies.interface';
import { ExpenseModel } from '../expense/expense.model';

// Create office supply entry
export const createOfficeSupplyInDB = async (payload: TOfficeSupplies) => {
  // 1️⃣ Create office supply record
  const supply = await OfficeSuppliesModel.create(payload);

  // 2️⃣ Create corresponding expense entry
  await ExpenseModel.create({
    title: `Office Supply - ${payload.item || 'Unknown Item'}`,
    category: 'Office Supplies',
    amount: Number(payload.total) || 0,
    date: payload.date ? new Date(payload.date) : new Date(),
    paymentMethod: 'Cash', // adjust if needed
    description: `Purchased ${payload.quantity || 0} x ${
      payload.item || 'item'
    } @ ${payload.unitPrice || 0} each. Note: ${
      payload.productDescription || 'N/A'
    }`,
    createdBy: undefined, // not included in TOfficeSupplies
  });

  return supply;
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
