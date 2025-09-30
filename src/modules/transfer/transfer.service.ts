import { TransferModel } from './transfer.model';
import { TTransfer } from './transfer.interface';
import { ActivityService } from '../activity/activity.service';

export const getAllTransfersFromDB = async () => {
  return await TransferModel.find();
};

export const getTransferByAssignedToFromDB = async (userEmail: string) => {
  return await TransferModel.find({ assignedTo: userEmail }).populate('workId');
};

export const updateTransferByIdInDB = async (
  id: string,
  userEmail: string,
  userName: string,
  updateData: Partial<TTransfer>,
) => {
  const result = await TransferModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
    { new: true },
  ).populate('workId');

  if (result) {
    await ActivityService.recordActivity({
      userEmail,
      userName,
      workId: updateData?.workId as any,
      action: 'Transfer Updated',
      message: `Updated Transfer details for work "${result.workId}".`,
      meta: updateData,
    });
  }

  return result;
};
