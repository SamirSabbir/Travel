import { TransferModel } from './transfer.model';
import { TTransfer } from './transfer.interface';

export const getAllTransfersFromDB = async () => {
  return await TransferModel.find();
};

export const getTransferByAssignedToFromDB = async (userEmail: string) => {
  return await TransferModel.findOne({ assignedTo: userEmail });
};

export const updateTransferByIdInDB = async (
  id: string,
  userEmail: string,
  updateData: Partial<TTransfer>,
) => {
  const result = await TransferModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
  ).populate('workId');
  return result;
};
