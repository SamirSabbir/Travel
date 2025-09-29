import { NotaryModel } from './notary.model';
import { TNotary } from './notary.interface';
import { ExpenseModel } from '../expense/expense.model';
import { ActivityService } from '../activity/activity.service'; // Import activity service

export const createNotaryInDB = async (payload: TNotary) => {
  // 1. Create expense entry
  await ExpenseModel.create({
    title: `Notary Service - ${payload.clientName || 'Unknown Client'}`,
    category: 'Notary',
    amount: payload.bill,
    date: payload.date || new Date(),
    paymentMethod: 'Cash', // or dynamic from payload
    description: `Notary expense for ${payload.documents || 'documents'}`,
  });

  // 2. Create notary record
  const notary = await NotaryModel.create(payload);

  // 3. Create big notification (Activity)
  await ActivityService.recordActivity({
    userEmail: payload?.employeeEmail, // employee responsible
    userName: payload.clientName || 'Unknown Client',
    workId: null, // optional, if you have a related workId
    action: 'Notary Created',
    message: `New Notary created for ${payload.clientName || 'Unknown Client'}.`,
    meta: {
      notaryId: notary._id,
      documents: payload.documents,
      bill: payload.bill,
      date: payload.date,
    },
  });

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
